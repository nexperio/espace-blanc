"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { env } from "@/lib/env";

const createFamilleSchema = z.object({
  nom: z.string().min(2).max(120),
  ref: z.string().min(2).max(40).optional(),
});

const inviteMemberSchema = z.object({
  famille_id: z.uuid(),
  email: z.email(),
  nom: z.string().max(120).optional(),
});

const removeMemberSchema = z.object({
  famille_id: z.uuid(),
  profile_id: z.uuid(),
});

export type ActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ok"; message?: string };

export async function createFamille(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser({ roles: ["admin"] });
  const parsed = createFamilleSchema.safeParse({
    nom: formData.get("nom"),
    ref: formData.get("ref") || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Champs invalides.",
    };
  }
  const admin = getSupabaseAdmin();
  const ref = parsed.data.ref ?? autoRef("EB");
  const { error } = await admin.from("familles").insert({
    nom: parsed.data.nom,
    ref,
    created_by: user.id,
  });
  if (error) {
    return { status: "error", message: error.message };
  }
  revalidatePath("/espace-client/admin/familles");
  revalidatePath("/espace-client/admin");
  return { status: "ok", message: `Famille « ${parsed.data.nom} » créée.` };
}

export async function inviteFamilyMember(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = inviteMemberSchema.safeParse({
    famille_id: formData.get("famille_id"),
    email: formData.get("email"),
    nom: formData.get("nom") || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Champs invalides.",
    };
  }
  return inviteUserToRole({
    email: parsed.data.email,
    nom: parsed.data.nom,
    role: "famille",
    famille_id: parsed.data.famille_id,
  });
}

export async function removeFamilyMember(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = removeMemberSchema.safeParse({
    famille_id: formData.get("famille_id"),
    profile_id: formData.get("profile_id"),
  });
  if (!parsed.success) {
    return { status: "error", message: "Champs invalides." };
  }
  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("famille_members")
    .delete()
    .eq("famille_id", parsed.data.famille_id)
    .eq("profile_id", parsed.data.profile_id);
  if (error) {
    return { status: "error", message: error.message };
  }
  revalidatePath(`/espace-client/admin/familles/${parsed.data.famille_id}`);
  return { status: "ok", message: "Membre retiré." };
}

// Invite partagée (famille / commissaire) — exposée aussi pour inviteCommissaire.
export async function inviteUserToRole({
  email,
  nom,
  role,
  famille_id,
}: {
  email: string;
  nom?: string;
  role: "famille" | "commissaire";
  famille_id?: string;
}): Promise<ActionState> {
  const admin = getSupabaseAdmin();

  // 1) Cherche un user existant
  const { data: existing } = await admin
    .from("profiles")
    .select("id, role")
    .eq("email", email)
    .maybeSingle();

  let profileId = existing?.id;

  if (!profileId) {
    // 2) Pas d'utilisateur → invitation Supabase (email envoyé via SMTP Resend)
    const { data: invited, error: inviteErr } =
      await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${env.siteUrl()}/auth/callback?type=invite`,
        data: { role, nom },
      });
    if (inviteErr || !invited?.user) {
      return {
        status: "error",
        message: `Invitation impossible : ${inviteErr?.message ?? "erreur"}.`,
      };
    }
    profileId = invited.user.id;
    // Le trigger SQL crée déjà la ligne profiles avec le bon rôle.
  } else if (existing?.role !== role) {
    // Promotion : on aligne le rôle s'il est différent.
    await admin
      .from("profiles")
      .update({ role })
      .eq("id", profileId);
  }

  if (role === "famille" && famille_id) {
    const { error: linkErr } = await admin
      .from("famille_members")
      .insert({ famille_id, profile_id: profileId })
      .select()
      .maybeSingle();
    if (linkErr && linkErr.code !== "23505") {
      // 23505 = unique_violation, déjà membre → on ignore
      return { status: "error", message: linkErr.message };
    }
    revalidatePath(`/espace-client/admin/familles/${famille_id}`);
  }

  return { status: "ok", message: `Invitation envoyée à ${email}.` };
}

function autoRef(prefix: string): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${yy}-${rnd}`;
}
