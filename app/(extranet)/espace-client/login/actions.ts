"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase/server";

const schema = z.object({
  email: z.email(),
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; email: string };

export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Adresse e-mail invalide.",
    };
  }

  const origin = await resolveOrigin();
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/espace-client/dossier`,
      shouldCreateUser: false,
    },
  });

  if (error) {
    // Pour la confidentialité, on ne révèle pas si l'email est connu ou non.
    if (/not.*found|invalid.*user/i.test(error.message)) {
      return { status: "sent", email: parsed.data.email };
    }
    return {
      status: "error",
      message: "Envoi impossible pour le moment. Réessayez dans un instant.",
    };
  }

  return { status: "sent", email: parsed.data.email };
}

async function resolveOrigin(): Promise<string> {
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (envOrigin) return envOrigin.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function signOut() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  redirect("/espace-client/login");
}
