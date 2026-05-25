import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AppHeader } from "../_components/app-header";

export const metadata: Metadata = {
  title: "Votre espace — Espace Blanc",
  robots: { index: false, follow: false },
};

type ProjetRow = {
  id: string;
  ref: string;
  nom: string;
  statut: string;
  famille: { nom: string };
};

export default async function FamilleHomePage() {
  const user = await requireUser({ roles: ["famille"] });
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("projets")
    .select("id, ref, nom, statut, famille:familles!inner(nom)")
    .order("created_at", { ascending: false })
    .returns<ProjetRow[]>();

  const projets = data ?? [];
  const familleNom = projets[0]?.famille?.nom ?? "";

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{ padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 56px) 24px" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <span className="eyebrow">Votre espace</span>
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
            Bonjour, <em>{user.nom ?? "bienvenue"}</em>
          </h1>
          {familleNom && (
            <p
              style={{
                marginTop: 14,
                color: "var(--ink-soft)",
                fontSize: 16,
              }}
            >
              Famille <strong>{familleNom}</strong>
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: "32px clamp(16px, 4vw, 56px) 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {projets.length === 0 ? (
            <EmptyState />
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {projets.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/espace-client/famille/projets/${p.id}`}
                    className="flex flex-wrap items-center justify-between gap-4"
                    style={{
                      padding: "clamp(18px, 3vw, 28px)",
                      background: "var(--lin)",
                      border: "1px solid var(--line)",
                      borderRadius: 6,
                      textDecoration: "none",
                      color: "var(--ink)",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span className="eyebrow">Projet · {p.ref}</span>
                      <h2
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500,
                          fontSize: "clamp(22px, 3vw, 28px)",
                          marginTop: 4,
                          lineHeight: 1.15,
                        }}
                      >
                        {p.nom}
                      </h2>
                    </div>
                    <span className="chip">{p.statut}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        padding: "48px 24px",
        border: "1px dashed var(--line)",
        borderRadius: 6,
        textAlign: "center",
        color: "var(--ink-soft)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: 24,
          color: "var(--ink)",
          marginBottom: 8,
        }}
      >
        Pas encore de projet ouvert à votre nom.
      </p>
      <p style={{ maxWidth: "52ch", margin: "0 auto", fontSize: 14.5 }}>
        Votre conseillère ouvrira un dossier prochainement. Vous serez prévenu(e)
        par e-mail au dépôt de chaque document.
      </p>
    </div>
  );
}
