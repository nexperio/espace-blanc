import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { AppHeader } from "../_components/app-header";

export const metadata: Metadata = {
  title: "Tableau de bord — Espace Blanc",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const user = await requireUser({ roles: ["admin"] });
  const admin = getSupabaseAdmin();

  const [famillesRes, projetsRes, docsRes] = await Promise.all([
    admin.from("familles").select("id", { count: "exact", head: true }),
    admin.from("projets").select("id, statut", { count: "exact" }),
    admin.from("documents").select("id", { count: "exact", head: true }),
  ]);

  const nbFamilles = famillesRes.count ?? 0;
  const nbProjets = projetsRes.count ?? 0;
  const nbDocs = docsRes.count ?? 0;
  const nbActifs =
    projetsRes.data?.filter((p) => p.statut !== "cloture").length ?? 0;

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />

      <section
        style={{ padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 56px) 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="eyebrow">Tableau de bord</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(36px, 6vw, 64px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              marginTop: 10,
              color: "var(--ink)",
            }}
          >
            Bonjour, <em>{user.nom ?? "Eugénia"}</em>
          </h1>
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            style={{ marginTop: 36 }}
          >
            <Stat n={nbFamilles} l="familles" />
            <Stat n={nbProjets} l="projets" />
            <Stat n={nbActifs} l="projets actifs" />
            <Stat n={nbDocs} l="documents" />
          </div>
        </div>
      </section>

      <section
        style={{ padding: "32px clamp(16px, 4vw, 56px) 80px" }}
      >
        <div
          className="grid gap-6 md:grid-cols-2"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <ActionCard
            href="/espace-client/admin/familles"
            eyebrow="Familles"
            title="Gérer les familles & membres"
            desc="Créer une famille, inviter ses parents, créer les projets associés."
          />
          <ActionCard
            href="/espace-client/admin/familles"
            eyebrow="Documents"
            title="Téléverser & versionner"
            desc="Déposer contrats, CGV, inventaires, marquer la version finale."
          />
        </div>
      </section>
    </main>
  );
}

function Stat({ n, l }: { n: number | string; l: string }) {
  return (
    <div style={{ paddingTop: 18, borderTop: "1px solid var(--sable)" }}>
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(40px, 5vw, 56px)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}
      >
        {n}
      </div>
      <div className="eyebrow" style={{ marginTop: 8 }}>
        {l}
      </div>
    </div>
  );
}

function ActionCard({
  href,
  eyebrow,
  title,
  desc,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "clamp(20px, 3vw, 32px)",
        background: "var(--lin)",
        border: "1px solid var(--line)",
        borderRadius: 6,
        color: "var(--ink)",
        textDecoration: "none",
        transition: "background 160ms ease",
      }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(22px, 3vw, 28px)",
          marginTop: 6,
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      <p style={{ marginTop: 10, color: "var(--ink-soft)", fontSize: 14.5 }}>
        {desc}
      </p>
    </Link>
  );
}
