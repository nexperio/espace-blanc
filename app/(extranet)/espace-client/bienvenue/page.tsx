import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "../_components/auth-shell";
import { SetPasswordForm } from "./set-password-form";
import { getSupabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Bienvenue — création de votre mot de passe",
  robots: { index: false, follow: false },
};

export default async function BienvenuePage() {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/espace-client/login");
  }

  return (
    <AuthShell
      eyebrow="Première connexion"
      title={
        <>
          Bienvenue dans <em>votre espace</em>
        </>
      }
      intro="Choisissez un mot de passe pour vos prochaines connexions. Il vous servira à accéder à votre dossier à tout moment."
    >
      <SetPasswordForm />
    </AuthShell>
  );
}
