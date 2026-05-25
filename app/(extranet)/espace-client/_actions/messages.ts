"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { ActionState } from "./familles";

const postSchema = z.object({
  projet_id: z.uuid(),
  body: z.string().min(1).max(8000),
});

export async function postMessage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser({ roles: ["admin", "famille"] });
  const parsed = postSchema.safeParse({
    projet_id: formData.get("projet_id"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { status: "error", message: "Message vide ou trop long." };
  }

  const admin = getSupabaseAdmin();

  // Vérifie l'autorisation côté serveur (RLS messages applique déjà,
  // mais on insert via service role donc on doit refaire le check).
  if (user.role === "famille") {
    const { data: projet } = await admin
      .from("projets")
      .select("famille_id")
      .eq("id", parsed.data.projet_id)
      .single();
    if (!projet) return { status: "error", message: "Projet introuvable." };
    const { data: member } = await admin
      .from("famille_members")
      .select("id")
      .eq("famille_id", projet.famille_id)
      .eq("profile_id", user.id)
      .maybeSingle();
    if (!member) return { status: "error", message: "Accès refusé." };
  }

  const { error } = await admin.from("messages").insert({
    projet_id: parsed.data.projet_id,
    author_id: user.id,
    body: parsed.data.body,
  });
  if (error) return { status: "error", message: error.message };

  revalidatePath(`/espace-client/admin/projets/${parsed.data.projet_id}`);
  revalidatePath(`/espace-client/famille/projets/${parsed.data.projet_id}`);
  return { status: "ok" };
}
