"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase/server";
import { dashboardPathForRole, type Role } from "@/lib/auth";

const emailSchema = z.object({ email: z.email() });

const passwordSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Mot de passe trop court (8 caractères min)."),
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; email: string };

export type PasswordLoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

export type ForgotPasswordState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "sent"; email: string };

export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { status: "error", message: "Adresse e-mail invalide." };
  }

  const origin = await resolveOrigin();
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?type=magiclink`,
      shouldCreateUser: false,
    },
  });

  if (error) {
    // Confidentialité : on ne révèle pas si l'email est connu.
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

export async function signInWithPassword(
  _prev: PasswordLoginState,
  formData: FormData,
): Promise<PasswordLoginState> {
  const parsed = passwordSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Identifiants invalides.",
    };
  }

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { status: "error", message: "Identifiants invalides." };
  }

  // Lit le rôle pour rediriger vers le bon dashboard.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  redirect(dashboardPathForRole((profile?.role as Role) ?? "famille"));
}

export async function sendPasswordReset(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsed = emailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: "Adresse e-mail invalide." };
  }

  const origin = await resolveOrigin();
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: `${origin}/auth/callback?type=recovery` },
  );

  // Toujours répondre "sent" pour ne pas leaker l'existence de l'email.
  if (error && !/not.*found|invalid.*user/i.test(error.message)) {
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
