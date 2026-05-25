import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { AppHeader } from "../../_components/app-header";
import { CreateFamilleForm } from "./create-famille-form";

export const metadata: Metadata = {
  title: "Familles — Espace Blanc",
  robots: { index: false, follow: false },
};

type FamilleRow = {
  id: string;
  ref: string;
  nom: string;
  created_at: string;
  members: { count: number }[];
  projets: { count: number }[];
};

export default async function FamillesListPage() {
  const user = await requireUser({ roles: ["admin"] });
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from("familles")
    .select("id, ref, nom, created_at, members:famille_members(count), projets(count)")
    .order("created_at", { ascending: false })
    .returns<FamilleRow[]>();

  const familles = data ?? [];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{
          padding: "clamp(32px, 5vw, 56px) clamp(16px, 4vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Link
            href="/espace-client/admin"
            className="eyebrow"
            style={{ color: "var(--ink-soft)" }}
          >
            ← Tableau de bord
          </Link>
          <div
            className="flex flex-wrap items-end justify-between gap-4"
            style={{ marginTop: 8, marginBottom: 32 }}
          >
            <div>
              <span className="eyebrow">Familles</span>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                  marginTop: 8,
                  color: "var(--ink)",
                }}
              >
                Toutes les familles
              </h1>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div style={{ minWidth: 0 }}>
              {familles.length === 0 ? (
                <p
                  style={{
                    padding: "32px 24px",
                    border: "1px dashed var(--line)",
                    borderRadius: 6,
                    color: "var(--ink-soft)",
                    textAlign: "center",
                  }}
                >
                  Aucune famille pour l&apos;instant. Créez la première à droite.
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
                  {familles.map((f) => (
                    <li key={f.id}>
                      <Link
                        href={`/espace-client/admin/familles/${f.id}`}
                        style={{
                          display: "block",
                          padding: "18px 22px",
                          background: "var(--lin)",
                          border: "1px solid var(--line)",
                          borderRadius: 6,
                          textDecoration: "none",
                          color: "var(--ink)",
                        }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <div>
                            <span className="eyebrow">{f.ref}</span>
                            <h2
                              style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontWeight: 500,
                                fontSize: 24,
                                lineHeight: 1.1,
                                marginTop: 4,
                              }}
                            >
                              {f.nom}
                            </h2>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 16,
                              fontSize: 13,
                              color: "var(--ink-soft)",
                            }}
                          >
                            <span>
                              {f.members?.[0]?.count ?? 0} membre
                              {(f.members?.[0]?.count ?? 0) > 1 ? "s" : ""}
                            </span>
                            <span>
                              {f.projets?.[0]?.count ?? 0} projet
                              {(f.projets?.[0]?.count ?? 0) > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside
              style={{
                padding: "24px",
                border: "1px solid var(--line)",
                borderRadius: 6,
                background: "var(--ivory)",
                alignSelf: "start",
              }}
            >
              <span className="eyebrow">Nouvelle famille</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 22,
                  marginTop: 6,
                  marginBottom: 14,
                  color: "var(--ink)",
                }}
              >
                Créer un dossier
              </h2>
              <CreateFamilleForm />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
