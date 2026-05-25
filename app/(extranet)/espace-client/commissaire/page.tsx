import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AppHeader } from "../_components/app-header";

export const metadata: Metadata = {
  title: "Vos projets assignés — Espace Blanc",
  robots: { index: false, follow: false },
};

type ProjetRow = {
  id: string;
  ref: string;
  nom: string;
  statut: string;
  famille: { nom: string };
};

export default async function CommissaireHomePage() {
  const user = await requireUser({ roles: ["commissaire"] });
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("projets")
    .select("id, ref, nom, statut, famille:familles!inner(nom)")
    .order("created_at", { ascending: false })
    .returns<ProjetRow[]>();

  const projets = data ?? [];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{ padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 56px) 24px" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <span className="eyebrow">Espace commissaire-priseur</span>
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
            Vos <em>projets assignés</em>
          </h1>
          <p
            style={{
              marginTop: 14,
              color: "var(--ink-soft)",
              fontSize: 15.5,
              maxWidth: "60ch",
            }}
          >
            Pour chaque projet, vous pouvez consulter le contrat et les CGV, puis
            déposer votre inventaire et le résultat de la vente. Chaque nouveau
            dépôt remplace le précédent (l&apos;ancien reste archivé côté
            Espace&nbsp;Blanc).
          </p>
        </div>
      </section>

      <section style={{ padding: "32px clamp(16px, 4vw, 56px) 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {projets.length === 0 ? (
            <p
              style={{
                padding: "32px 24px",
                border: "1px dashed var(--line)",
                borderRadius: 6,
                color: "var(--ink-soft)",
                textAlign: "center",
              }}
            >
              Aucun projet ne vous est assigné pour le moment.
            </p>
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
                    href={`/espace-client/commissaire/projets/${p.id}`}
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
                      <span className="eyebrow">
                        Projet · {p.ref} · {p.famille.nom}
                      </span>
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
