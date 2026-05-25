import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "../_components/auth-shell";
import { SetPasswordForm } from "../bienvenue/set-password-form";
import { getSupabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Réinitialisation du mot de passe",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage() {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/espace-client/login");
  }

  return (
    <AuthShell
      eyebrow="Nouveau mot de passe"
      title={
        <>
          Choisissez un <em>nouveau mot de passe</em>
        </>
      }
      intro="Ce mot de passe remplacera l'ancien. Conservez-le précieusement."
    >
      <SetPasswordForm />
    </AuthShell>
  );
}
