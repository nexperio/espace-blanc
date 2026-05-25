-- Espace Blanc — refonte extranet : rôles, familles, projets, documents versionnés, messagerie.
-- Aucune donnée en production sur les anciennes tables `dossiers` / `documents` → drop & recreate.
-- À appliquer dans l'éditeur SQL Supabase. APRÈS application :
--   1) Dans Storage, supprimer manuellement le bucket "dossier-documents" (s'il existe).
--   2) Créer manuellement le bucket "projet-files" (privé).
--   3) Configurer Auth → SMTP avec les creds Resend (les invites & resets passent par là).
--   4) Créer Eugénia dans Auth → Users, puis :
--        update public.profiles set role = 'admin' where email = 'eugenia@espace-blanc.com';

------------------------------------------------------------
-- Drop ancien schéma extranet
------------------------------------------------------------
drop policy if exists "dossier-documents own read" on storage.objects;
drop policy if exists "documents select own" on public.documents;
drop policy if exists "dossiers select own" on public.dossiers;
drop table if exists public.documents cascade;
drop table if exists public.dossiers cascade;
drop type if exists public.document_type;

------------------------------------------------------------
-- PROFILES (miroir de auth.users avec rôle)
------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'famille' check (role in ('admin','famille','commissaire')),
  email       text not null,
  nom         text,
  created_at  timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

-- Helper SECURITY DEFINER pour lire le rôle sans déclencher la RLS récursive sur profiles.
create or replace function public.current_role()
  returns text
  language sql
  stable
  security definer
  set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Trigger : à chaque création d'utilisateur dans auth.users, insérer une ligne profiles.
-- Lit raw_user_meta_data->>'role' (positionné par l'invite admin via inviteUserByEmail).
create or replace function public.handle_new_auth_user()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
declare
  v_role text;
  v_nom  text;
begin
  v_role := coalesce(new.raw_user_meta_data->>'role', 'famille');
  if v_role not in ('admin','famille','commissaire') then
    v_role := 'famille';
  end if;
  v_nom := new.raw_user_meta_data->>'nom';
  insert into public.profiles (id, role, email, nom)
  values (new.id, v_role, new.email, v_nom)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

alter table public.profiles enable row level security;
drop policy if exists "profiles select self or admin" on public.profiles;
create policy "profiles select self or admin" on public.profiles for select
  using (id = auth.uid() or public.current_role() = 'admin');
-- Pas d'insert/update/delete côté client : tout passe par le trigger ou le service role.

------------------------------------------------------------
-- FAMILLES
------------------------------------------------------------
create table if not exists public.familles (
  id          uuid primary key default gen_random_uuid(),
  ref         text not null unique,
  nom         text not null,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

alter table public.familles enable row level security;

create table if not exists public.famille_members (
  id           uuid primary key default gen_random_uuid(),
  famille_id   uuid not null references public.familles(id) on delete cascade,
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  created_at   timestamptz not null default now(),
  unique (famille_id, profile_id)
);

create index if not exists famille_members_profile_idx on public.famille_members(profile_id);

alter table public.famille_members enable row level security;

-- Helper : un user est-il membre d'une famille donnée ?
create or replace function public.is_famille_member(p_famille_id uuid)
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from public.famille_members
    where famille_id = p_famille_id and profile_id = auth.uid()
  );
$$;

drop policy if exists "familles select" on public.familles;
create policy "familles select" on public.familles for select
  using (public.current_role() = 'admin' or public.is_famille_member(id));

drop policy if exists "famille_members select" on public.famille_members;
create policy "famille_members select" on public.famille_members for select
  using (
    public.current_role() = 'admin'
    or profile_id = auth.uid()
    or public.is_famille_member(famille_id)
  );

------------------------------------------------------------
-- PROJETS
------------------------------------------------------------
create table if not exists public.projets (
  id          uuid primary key default gen_random_uuid(),
  famille_id  uuid not null references public.familles(id) on delete cascade,
  ref         text not null unique,
  nom         text not null,
  statut      text not null default 'ouvert' check (statut in ('ouvert','en_cours','cloture')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projets_famille_idx on public.projets(famille_id);

alter table public.projets enable row level security;

create table if not exists public.commissaire_assignments (
  id           uuid primary key default gen_random_uuid(),
  projet_id    uuid not null references public.projets(id) on delete cascade,
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  created_at   timestamptz not null default now(),
  unique (projet_id, profile_id)
);

create index if not exists commissaire_assignments_profile_idx
  on public.commissaire_assignments(profile_id);

alter table public.commissaire_assignments enable row level security;

create or replace function public.is_commissaire_assigned(p_projet_id uuid)
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from public.commissaire_assignments
    where projet_id = p_projet_id and profile_id = auth.uid()
  );
$$;

drop policy if exists "projets select" on public.projets;
create policy "projets select" on public.projets for select
  using (
    public.current_role() = 'admin'
    or public.is_famille_member(famille_id)
    or public.is_commissaire_assigned(id)
  );

drop policy if exists "commissaire_assignments select" on public.commissaire_assignments;
create policy "commissaire_assignments select" on public.commissaire_assignments for select
  using (
    public.current_role() = 'admin'
    or profile_id = auth.uid()
  );

------------------------------------------------------------
-- DOCUMENTS (versionnés, is_current = visible côté famille/commissaire)
------------------------------------------------------------
create type public.document_category as enum
  ('contrat','cgv','inventaire_eugenia','inventaire_commissaire','resultat_vente');

create table if not exists public.documents (
  id            uuid primary key default gen_random_uuid(),
  projet_id     uuid not null references public.projets(id) on delete cascade,
  category      public.document_category not null,
  storage_path  text not null unique,
  filename      text not null,
  size_bytes    bigint,
  is_current    boolean not null default false,
  uploaded_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now()
);

create index if not exists documents_projet_cat_idx
  on public.documents(projet_id, category, created_at desc);

-- Au plus UNE version courante par (projet, catégorie).
create unique index if not exists documents_one_current_per_cat
  on public.documents(projet_id, category)
  where is_current;

alter table public.documents enable row level security;

drop policy if exists "documents select" on public.documents;
create policy "documents select" on public.documents for select
  using (
    public.current_role() = 'admin'
    or (
      is_current
      and (
        (
          public.is_famille_member((select famille_id from public.projets where id = documents.projet_id))
        )
        or (
          public.is_commissaire_assigned(documents.projet_id)
          and category in ('contrat','cgv','inventaire_commissaire','resultat_vente')
        )
      )
    )
  );

------------------------------------------------------------
-- MESSAGES (par projet, famille + admin seulement)
------------------------------------------------------------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  projet_id   uuid not null references public.projets(id) on delete cascade,
  author_id   uuid not null references public.profiles(id),
  body        text not null check (length(body) between 1 and 8000),
  created_at  timestamptz not null default now()
);

create index if not exists messages_projet_idx on public.messages(projet_id, created_at desc);

alter table public.messages enable row level security;

drop policy if exists "messages select" on public.messages;
create policy "messages select" on public.messages for select
  using (
    public.current_role() = 'admin'
    or public.is_famille_member((select famille_id from public.projets where id = messages.projet_id))
  );

drop policy if exists "messages insert" on public.messages;
create policy "messages insert" on public.messages for insert
  with check (
    author_id = auth.uid()
    and (
      public.current_role() = 'admin'
      or public.is_famille_member((select famille_id from public.projets where id = messages.projet_id))
    )
  );

------------------------------------------------------------
-- STORAGE : bucket "projet-files" (à créer manuellement, privé)
------------------------------------------------------------
-- Lecture autorisée à un utilisateur authentifié si la ligne documents correspondante
-- est visible pour lui (la RLS de documents filtre déjà).
drop policy if exists "projet-files read" on storage.objects;
create policy "projet-files read" on storage.objects for select
  to authenticated
  using (
    bucket_id = 'projet-files'
    and exists (
      select 1 from public.documents d
      where d.storage_path = storage.objects.name
    )
  );
-- Pas de policy insert/update/delete : tout upload/suppression passe par le service role.
