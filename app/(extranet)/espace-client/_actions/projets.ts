"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { inviteUserToRole, type ActionState } from "./familles";

const createProjetSchema = z.object({
  famille_id: z.uuid(),
  nom: z.string().min(2).max(160),
  ref: z.string().min(2).max(40).optional(),
});

const assignSchema = z.object({
  projet_id: z.uuid(),
  email: z.email(),
  nom: z.string().max(120).optional(),
});

const unassignSchema = z.object({
  projet_id: z.uuid(),
  profile_id: z.uuid(),
});

export async function createProjet(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = createProjetSchema.safeParse({
    famille_id: formData.get("famille_id"),
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
  const ref = parsed.data.ref ?? autoRef("PRJ");
  const { error } = await admin.from("projets").insert({
    famille_id: parsed.data.famille_id,
    nom: parsed.data.nom,
    ref,
  });
  if (error) {
    return { status: "error", message: error.message };
  }
  revalidatePath(`/espace-client/admin/familles/${parsed.data.famille_id}`);
  revalidatePath("/espace-client/admin");
  return { status: "ok", message: `Projet « ${parsed.data.nom} » créé.` };
}

export async function assignCommissaire(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = assignSchema.safeParse({
    projet_id: formData.get("projet_id"),
    email: formData.get("email"),
    nom: formData.get("nom") || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Champs invalides.",
    };
  }

  // 1) Invite ou retrouve le commissaire
  const inviteResult = await inviteUserToRole({
    email: parsed.data.email,
    nom: parsed.data.nom,
    role: "commissaire",
  });
  if (inviteResult.status === "error") return inviteResult;

  // 2) Récupère le profile id
  const admin = getSupabaseAdmin();
  const { data: profile, error: pErr } = await admin
    .from("profiles")
    .select("id")
    .eq("email", parsed.data.email)
    .single();
  if (pErr || !profile) {
    return {
      status: "error",
      message: "Compte commissaire introuvable après invitation.",
    };
  }

  // 3) Crée l'assignment
  const { error } = await admin
    .from("commissaire_assignments")
    .insert({ projet_id: parsed.data.projet_id, profile_id: profile.id });
  if (error && error.code !== "23505") {
    return { status: "error", message: error.message };
  }

  revalidatePath(`/espace-client/admin/projets/${parsed.data.projet_id}`);
  return {
    status: "ok",
    message: `Commissaire ${parsed.data.email} assigné.`,
  };
}

export async function unassignCommissaire(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = unassignSchema.safeParse({
    projet_id: formData.get("projet_id"),
    profile_id: formData.get("profile_id"),
  });
  if (!parsed.success) {
    return { status: "error", message: "Champs invalides." };
  }
  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("commissaire_assignments")
    .delete()
    .eq("projet_id", parsed.data.projet_id)
    .eq("profile_id", parsed.data.profile_id);
  if (error) {
    return { status: "error", message: error.message };
  }
  revalidatePath(`/espace-client/admin/projets/${parsed.data.projet_id}`);
  return { status: "ok", message: "Assignation retirée." };
}

function autoRef(prefix: string): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${yy}-${rnd}`;
}
