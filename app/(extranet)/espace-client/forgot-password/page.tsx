import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "../_components/auth-shell";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Mot de passe oublié"
      title={
        <>
          Récupérer <em>votre accès</em>
        </>
      }
      intro="Indiquez votre adresse e-mail. Nous vous enverrons un lien pour définir un nouveau mot de passe."
      footer={
        <Link
          href="/espace-client/login"
          style={{ borderBottom: "1px solid currentColor" }}
        >
          Retour à la connexion
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
