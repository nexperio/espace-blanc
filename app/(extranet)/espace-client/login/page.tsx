import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { LogoMark } from "@/components/marketing/logo-mark";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { ROUTES, BRAND } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Espace client — connexion",
  description:
    "Accédez à votre dossier Espace Blanc : photos, devis, certificats de don, factures de vente.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const configured = isSupabaseConfigured();
  if (configured) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      redirect("/espace-client");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(48px, 8vw, 80px) clamp(12px, 4vw, 24px)",
        background: "var(--ivory)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--ivory)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: "clamp(22px, 5vw, 40px)",
        }}
      >
        <Link
          href={ROUTES.home}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <LogoMark size={40} tone="gold" />
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: "-0.005em",
              color: "var(--ink)",
            }}
          >
            {BRAND}
          </span>
        </Link>
        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow">Extranet privé</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 38,
              letterSpacing: "-0.005em",
              lineHeight: 1.05,
              marginTop: 10,
              color: "var(--ink)",
            }}
          >
            Votre <em>dossier</em>
          </h1>
          <p
            style={{
              color: "var(--ink-soft)",
              marginTop: 14,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            Photos des objets, estimations, factures de vente, certificats de
            don. Tout est ici.
          </p>
        </div>

        {configured ? (
          <LoginForm />
        ) : (
          <p
            style={{
              padding: "16px 18px",
              border: "1px dashed var(--line)",
              borderRadius: 4,
              color: "var(--ink-soft)",
              fontSize: 14,
            }}
          >
            L&apos;extranet est en cours de configuration. Renseignez les clés
            Supabase dans <code>.env.local</code> pour activer la connexion.
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 13,
            color: "var(--ink-soft)",
          }}
        >
          Pas encore de dossier ?{" "}
          <Link
            href={ROUTES.contact}
            style={{ borderBottom: "1px solid currentColor" }}
          >
            Demander un diagnostic
          </Link>
        </p>
      </div>
    </main>
  );
}
