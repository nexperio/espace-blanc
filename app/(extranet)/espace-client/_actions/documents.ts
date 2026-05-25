"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  DOCUMENT_CATEGORIES,
  COMMISSAIRE_CATEGORIES,
  isVersionedCategory,
  slugifyFilename,
  type DocumentCategory,
} from "@/lib/documents";
import { notifyFamilleNewDocument } from "@/lib/notifications/document-notification";
import type { ActionState } from "./familles";

const BUCKET = "projet-files";
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

const uploadSchema = z.object({
  projet_id: z.uuid(),
  category: z.enum(DOCUMENT_CATEGORIES),
  is_final: z.boolean().optional(),
});

const idSchema = z.object({ document_id: z.uuid() });

export async function uploadDocument(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser({ roles: ["admin", "commissaire"] });
  const parsed = uploadSchema.safeParse({
    projet_id: formData.get("projet_id"),
    category: formData.get("category"),
    is_final: formData.get("is_final") === "on",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Champs invalides.",
    };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Aucun fichier fourni." };
  }
  if (file.size > MAX_BYTES) {
    return {
      status: "error",
      message: `Fichier trop volumineux (max ${Math.round(MAX_BYTES / 1024 / 1024)} Mo).`,
    };
  }

  const { projet_id, category } = parsed.data;
  const admin = getSupabaseAdmin();

  // Autorisation commissaire : catégorie limitée + assignation requise.
  if (user.role === "commissaire") {
    if (!COMMISSAIRE_CATEGORIES.includes(category)) {
      return {
        status: "error",
        message: "Catégorie non autorisée pour un commissaire-priseur.",
      };
    }
    const { data: assign } = await admin
      .from("commissaire_assignments")
      .select("id")
      .eq("projet_id", projet_id)
      .eq("profile_id", user.id)
      .maybeSingle();
    if (!assign) {
      return { status: "error", message: "Projet non assigné." };
    }
  }

  // Upload storage
  const slug = slugifyFilename(file.name);
  const path = `${projet_id}/${category}/${Date.now()}-${slug}`;
  const { error: upErr } = await admin.storage
    .from(BUCKET)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (upErr) {
    return { status: "error", message: `Téléversement échoué : ${upErr.message}` };
  }

  // Décide is_current
  const willBeCurrent = isVersionedCategory(category)
    ? Boolean(parsed.data.is_final)
    : true;

  // Si on devient courant : flip l'ancien courant en false (index unique partiel garantit unicité).
  if (willBeCurrent) {
    await admin
      .from("documents")
      .update({ is_current: false })
      .eq("projet_id", projet_id)
      .eq("category", category)
      .eq("is_current", true);
  }

  const { error: insErr } = await admin.from("documents").insert({
    projet_id,
    category,
    storage_path: path,
    filename: file.name,
    size_bytes: file.size,
    is_current: willBeCurrent,
    uploaded_by: user.id,
  });

  if (insErr) {
    // rollback storage
    await admin.storage.from(BUCKET).remove([path]);
    return { status: "error", message: insErr.message };
  }

  if (willBeCurrent) {
    // Fire-and-forget — on n'attend pas pour ne pas bloquer l'utilisateur si Resend rame.
    notifyFamilleNewDocument({ projet_id, category }).catch((e) =>
      console.error("notif failed", e),
    );
  }

  revalidateAll(projet_id);
  return { status: "ok", message: "Document déposé." };
}

export async function markDocumentFinal(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = idSchema.safeParse({ document_id: formData.get("document_id") });
  if (!parsed.success) {
    return { status: "error", message: "Identifiant invalide." };
  }
  const admin = getSupabaseAdmin();
  const { data: doc } = await admin
    .from("documents")
    .select("id, projet_id, category, is_current")
    .eq("id", parsed.data.document_id)
    .single();
  if (!doc) return { status: "error", message: "Document introuvable." };
  if (doc.is_current) return { status: "ok", message: "Déjà version courante." };

  await admin
    .from("documents")
    .update({ is_current: false })
    .eq("projet_id", doc.projet_id)
    .eq("category", doc.category)
    .eq("is_current", true);

  const { error } = await admin
    .from("documents")
    .update({ is_current: true })
    .eq("id", doc.id);
  if (error) return { status: "error", message: error.message };

  notifyFamilleNewDocument({
    projet_id: doc.projet_id,
    category: doc.category as DocumentCategory,
  }).catch((e) => console.error("notif failed", e));

  revalidateAll(doc.projet_id);
  return { status: "ok", message: "Version courante mise à jour." };
}

export async function deleteDocument(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser({ roles: ["admin"] });
  const parsed = idSchema.safeParse({ document_id: formData.get("document_id") });
  if (!parsed.success) {
    return { status: "error", message: "Identifiant invalide." };
  }
  const admin = getSupabaseAdmin();
  const { data: doc } = await admin
    .from("documents")
    .select("id, projet_id, storage_path")
    .eq("id", parsed.data.document_id)
    .single();
  if (!doc) return { status: "error", message: "Document introuvable." };

  await admin.storage.from(BUCKET).remove([doc.storage_path]);
  const { error } = await admin.from("documents").delete().eq("id", doc.id);
  if (error) return { status: "error", message: error.message };

  revalidateAll(doc.projet_id);
  return { status: "ok", message: "Document supprimé." };
}

// Génère une URL signée courte durée pour téléchargement.
export async function getSignedDownloadUrl(
  storage_path: string,
): Promise<string | null> {
  // Pas de role check ici : utilisé par les pages elles-mêmes qui ont déjà
  // filtré les documents via RLS (l'utilisateur ne voit que ses docs).
  // Mais on revérifie qu'il a accès au document via la RLS.
  const { getSupabaseServer } = await import("@/lib/supabase/server");
  const supabase = await getSupabaseServer();
  const { data: doc } = await supabase
    .from("documents")
    .select("id")
    .eq("storage_path", storage_path)
    .maybeSingle();
  if (!doc) return null;

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(storage_path, 60 * 5);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}

function revalidateAll(projet_id: string) {
  revalidatePath(`/espace-client/admin/projets/${projet_id}`);
  revalidatePath(`/espace-client/famille/projets/${projet_id}`);
  revalidatePath(`/espace-client/commissaire/projets/${projet_id}`);
}
