-- Espace Blanc — schéma initial (vitrine leads + extranet client).
-- À appliquer via Supabase Studio (SQL editor) ou la CLI.

------------------------------------------------------------
-- LEADS (formulaire diagnostic du site public)
------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  ref           text not null unique,
  nom           text not null,
  email         text not null,
  telephone     text not null,
  situation     text not null check (situation in ('succession','senior','demenagement','autre')),
  surface       text,
  localisation  text,
  delai         text check (delai in ('urgent','mois','trimestre','flou')),
  message       text,
  source        text default 'site',
  status        text not null default 'new' check (status in ('new','contacted','qualified','closed','lost')),
  created_at    timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Aucun accès anonyme. Inserts faits uniquement via service role (Server Action).
-- Lecture : interface admin Supabase Studio uniquement.
drop policy if exists "leads no public access" on public.leads;
create policy "leads no public access" on public.leads for select using (false);

------------------------------------------------------------
-- EXTRANET CLIENT (dossiers + documents)
------------------------------------------------------------
create table if not exists public.dossiers (
  id          uuid primary key default gen_random_uuid(),
  ref         text not null unique,
  owner_id    uuid not null references auth.users(id) on delete cascade,
  nom         text not null,
  statut      text not null default 'actif' check (statut in ('actif','en_cours','cloture','archive')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists dossiers_owner_idx on public.dossiers(owner_id);

alter table public.dossiers enable row level security;

drop policy if exists "dossiers select own" on public.dossiers;
create policy "dossiers select own" on public.dossiers for select using (auth.uid() = owner_id);

create type public.document_type as enum
  ('photo','devis','facture','certif_don','fiche_objet','bilan_impact');

create table if not exists public.documents (
  id           uuid primary key default gen_random_uuid(),
  dossier_id   uuid not null references public.dossiers(id) on delete cascade,
  type         public.document_type not null,
  label        text not null,
  storage_path text not null,
  montant_eur  numeric(10,2),
  created_at   timestamptz not null default now()
);

create index if not exists documents_dossier_idx on public.documents(dossier_id);

alter table public.documents enable row level security;

drop policy if exists "documents select own" on public.documents;
create policy "documents select own" on public.documents for select using (
  exists (
    select 1 from public.dossiers d
    where d.id = documents.dossier_id and d.owner_id = auth.uid()
  )
);

------------------------------------------------------------
-- STORAGE (bucket privé pour les pièces des dossiers)
------------------------------------------------------------
-- Créer manuellement le bucket "dossier-documents" en privé dans Supabase Studio.
-- Puis activer la policy ci-dessous pour limiter les lectures aux propriétaires.
-- (Le service role bypass déjà ces policies pour les uploads admin.)

-- Lecture : autorisée si le path commence par "<owner_id>/..."
drop policy if exists "dossier-documents own read" on storage.objects;
create policy "dossier-documents own read" on storage.objects for select
  to authenticated
  using (
    bucket_id = 'dossier-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
