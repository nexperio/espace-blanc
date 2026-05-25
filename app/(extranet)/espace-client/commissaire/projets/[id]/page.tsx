import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  COMMISSAIRE_READABLE_CATEGORIES,
  COMMISSAIRE_CATEGORIES,
  CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/documents";
import { AppHeader } from "../../../_components/app-header";
import { UploadForm } from "../../../_components/upload-form";
import { DownloadLink } from "../../../_components/download-link";

export const metadata: Metadata = {
  title: "Projet — Commissaire — Espace Blanc",
  robots: { index: false, follow: false },
};

type Projet = {
  id: string;
  ref: string;
  nom: string;
  statut: string;
  famille: { nom: string };
};

type DocRow = {
  id: string;
  category: DocumentCategory;
  storage_path: string;
  filename: string;
  size_bytes: number | null;
  created_at: string;
};

export default async function CommissaireProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser({ roles: ["commissaire"] });
  const supabase = await getSupabaseServer();

  const [projetRes, docsRes] = await Promise.all([
    supabase
      .from("projets")
      .select("id, ref, nom, statut, famille:familles!inner(nom)")
      .eq("id", id)
      .single<Projet>(),
    // RLS filtre déjà is_current=true + catégories autorisées côté commissaire.
    supabase
      .from("documents")
      .select("id, category, storage_path, filename, size_bytes, created_at")
      .eq("projet_id", id)
      .returns<DocRow[]>(),
  ]);

  const projet = projetRes.data;
  if (!projet) notFound();
  const documents = docsRes.data ?? [];
  const byCat = new Map<DocumentCategory, DocRow>();
  for (const d of documents) byCat.set(d.category, d);

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{ padding: "clamp(32px, 5vw, 56px) clamp(16px, 4vw, 56px)" }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div>
            <Link
              href="/espace-client/commissaire"
              className="eyebrow"
              style={{ color: "var(--ink-soft)" }}
            >
              ← Vos projets
            </Link>
            <div
              className="flex flex-wrap items-end justify-between gap-3"
              style={{ marginTop: 8 }}
            >
              <div>
                <span className="eyebrow">
                  Projet · {projet.ref} · {projet.famille.nom}
                </span>
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
                  {projet.nom}
                </h1>
              </div>
              <span className="chip">{projet.statut}</span>
            </div>
          </div>

          {/* DOCUMENTS EN LECTURE (contrat + cgv) */}
          <section
            style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              background: "var(--ivory)",
              padding: "clamp(20px, 3vw, 32px)",
            }}
          >
            <span className="eyebrow">Référence</span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(22px, 3vw, 28px)",
                marginTop: 6,
                marginBottom: 16,
                color: "var(--ink)",
              }}
            >
              Documents de référence
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {COMMISSAIRE_READABLE_CATEGORIES.filter(
                (c) => !COMMISSAIRE_CATEGORIES.includes(c),
              ).map((cat) => {
                const doc = byCat.get(cat);
                return (
                  <li
                    key={cat}
                    className="flex flex-wrap items-center justify-between gap-3"
                    style={{
                      padding: "14px 16px",
                      background: doc ? "var(--lin)" : "var(--cream, #fbf8f1)",
                      border: "1px solid var(--line)",
                      borderRadius: 4,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: "1 1 220px" }}>
                      <span className="eyebrow">{CATEGORY_LABELS[cat]}</span>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: 17,
                          marginTop: 2,
                          color: "var(--ink)",
                          wordBreak: "break-word",
                        }}
                      >
                        {doc?.filename ?? "—"}
                      </div>
                    </div>
                    {doc ? (
                      <DownloadLink path={doc.storage_path} compact />
                    ) : (
                      <span
                        style={{ fontSize: 12, color: "var(--ink-mute)" }}
                      >
                        Non fourni
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ZONES D'UPLOAD COMMISSAIRE */}
          {COMMISSAIRE_CATEGORIES.map((cat) => {
            const current = byCat.get(cat);
            return (
              <section
                key={cat}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  background: "var(--ivory)",
                  padding: "clamp(20px, 3vw, 32px)",
                }}
              >
                <span className="eyebrow">{CATEGORY_LABELS[cat]}</span>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: "clamp(22px, 3vw, 28px)",
                    marginTop: 6,
                    marginBottom: 12,
                    color: "var(--ink)",
                  }}
                >
                  Déposer / remplacer
                </h2>
                {current ? (
                  <div
                    className="flex flex-wrap items-center justify-between gap-3"
                    style={{
                      padding: "14px 16px",
                      background: "var(--lin)",
                      borderRadius: 4,
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: "1 1 200px" }}>
                      <div className="eyebrow" style={{ color: "var(--laiton)" }}>
                        Version courante
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: 17,
                          marginTop: 2,
                          color: "var(--ink)",
                          wordBreak: "break-word",
                        }}
                      >
                        {current.filename}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--ink-soft)",
                          marginTop: 4,
                        }}
                      >
                        Déposé le{" "}
                        {new Date(current.created_at).toLocaleDateString(
                          "fr-FR",
                        )}
                      </div>
                    </div>
                    <DownloadLink path={current.storage_path} compact />
                  </div>
                ) : (
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: 14,
                      marginBottom: 14,
                    }}
                  >
                    Aucun fichier déposé.
                  </p>
                )}
                <UploadForm
                  projet_id={projet.id}
                  category={cat}
                  buttonLabel={current ? "Remplacer le fichier" : "Téléverser"}
                />
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "var(--ink-mute)",
                  }}
                >
                  Le nouveau dépôt remplace la version courante. L&apos;ancienne
                  reste archivée côté Espace&nbsp;Blanc.
                </p>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
