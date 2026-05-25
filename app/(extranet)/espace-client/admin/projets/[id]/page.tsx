import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  DOCUMENT_CATEGORIES,
  CATEGORY_LABELS,
  isVersionedCategory,
  type DocumentCategory,
} from "@/lib/documents";
import { AppHeader } from "../../../_components/app-header";
import { UploadForm } from "../../../_components/upload-form";
import { MessagesPanel } from "../../../_components/messages-panel";
import { AssignCommissaireForm } from "./assign-commissaire-form";
import { UnassignCommissaireButton } from "./unassign-commissaire-button";
import { DocumentRow } from "./document-row";
import { DownloadLink } from "../../../_components/download-link";

export const metadata: Metadata = {
  title: "Projet — Espace Blanc",
  robots: { index: false, follow: false },
};

type ProjetDetail = {
  id: string;
  ref: string;
  nom: string;
  statut: string;
  famille: { id: string; ref: string; nom: string };
};

type DocRow = {
  id: string;
  category: DocumentCategory;
  storage_path: string;
  filename: string;
  size_bytes: number | null;
  is_current: boolean;
  created_at: string;
  uploaded_by: string | null;
  uploader: { nom: string | null; email: string; role: string } | null;
};

type MessageRow = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  author: { nom: string | null; email: string; role: string } | null;
};

type CommissaireRow = {
  profile_id: string;
  profile: { nom: string | null; email: string } | null;
};

export default async function AdminProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser({ roles: ["admin"] });
  const admin = getSupabaseAdmin();

  const [projetRes, docsRes, messagesRes, commissairesRes] = await Promise.all([
    admin
      .from("projets")
      .select("id, ref, nom, statut, famille:familles!inner(id, ref, nom)")
      .eq("id", id)
      .single<ProjetDetail>(),
    admin
      .from("documents")
      .select(
        "id, category, storage_path, filename, size_bytes, is_current, created_at, uploaded_by, uploader:profiles!documents_uploaded_by_fkey(nom, email, role)",
      )
      .eq("projet_id", id)
      .order("created_at", { ascending: false })
      .returns<DocRow[]>(),
    admin
      .from("messages")
      .select(
        "id, body, created_at, author_id, author:profiles!messages_author_id_fkey(nom, email, role)",
      )
      .eq("projet_id", id)
      .order("created_at", { ascending: true })
      .returns<MessageRow[]>(),
    admin
      .from("commissaire_assignments")
      .select("profile_id, profile:profiles(nom, email)")
      .eq("projet_id", id)
      .returns<CommissaireRow[]>(),
  ]);

  const projet = projetRes.data;
  if (!projet) notFound();
  const documents = docsRes.data ?? [];
  const messages = (messagesRes.data ?? []).map((m) => ({
    id: m.id,
    body: m.body,
    created_at: m.created_at,
    author: m.author,
    isMine: m.author_id === user.id,
  }));
  const commissaires = commissairesRes.data ?? [];

  const docsByCategory = groupBy(documents, (d) => d.category);

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{ padding: "clamp(32px, 5vw, 56px) clamp(16px, 4vw, 56px)" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div>
            <Link
              href={`/espace-client/admin/familles/${projet.famille.id}`}
              className="eyebrow"
              style={{ color: "var(--ink-soft)" }}
            >
              ← {projet.famille.nom}
            </Link>
            <div
              className="flex flex-wrap items-end justify-between gap-3"
              style={{ marginTop: 8 }}
            >
              <div>
                <span className="eyebrow">Projet · {projet.ref}</span>
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

          {/* COMMISSAIRES */}
          <section
            style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              background: "var(--ivory)",
              padding: "clamp(20px, 3vw, 28px)",
            }}
          >
            <span className="eyebrow">Commissaire-priseur</span>
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
              Assignation
            </h2>
            {commissaires.length === 0 ? (
              <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>
                Aucun commissaire-priseur assigné à ce projet.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {commissaires.map((c) => (
                  <li
                    key={c.profile_id}
                    className="flex flex-wrap items-center justify-between gap-3"
                    style={{
                      padding: "10px 14px",
                      background: "var(--lin)",
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>
                      {c.profile?.nom ?? c.profile?.email}
                    </span>
                    <UnassignCommissaireButton
                      projet_id={projet.id}
                      profile_id={c.profile_id}
                    />
                  </li>
                ))}
              </ul>
            )}
            <AssignCommissaireForm projet_id={projet.id} />
          </section>

          {/* DOCUMENTS — 5 sections */}
          {DOCUMENT_CATEGORIES.map((cat) => {
            const docs = docsByCategory.get(cat) ?? [];
            const current = docs.find((d) => d.is_current);
            const archived = docs.filter((d) => !d.is_current);
            const versioned = isVersionedCategory(cat);

            return (
              <section
                key={cat}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  background: "var(--ivory)",
                  padding: "clamp(20px, 3vw, 28px)",
                }}
              >
                <header
                  className="flex flex-wrap items-baseline justify-between gap-3"
                  style={{ marginBottom: 16 }}
                >
                  <div>
                    <span className="eyebrow">{CATEGORY_LABELS[cat]}</span>
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 24,
                        marginTop: 6,
                        color: "var(--ink)",
                      }}
                    >
                      {versioned ? "Versions successives" : "Document courant"}
                    </h2>
                  </div>
                  <span
                    className="eyebrow"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {docs.length} fichier{docs.length > 1 ? "s" : ""}
                  </span>
                </header>

                {current ? (
                  <div
                    style={{
                      padding: "14px 16px",
                      background: "var(--lin)",
                      borderRadius: 4,
                      marginBottom: 16,
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div style={{ minWidth: 0, flex: "1 1 200px" }}>
                        <div className="eyebrow" style={{ color: "var(--laiton)" }}>
                          Version courante
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: 18,
                            marginTop: 2,
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
                          {formatBytes(current.size_bytes)} · déposé le{" "}
                          {formatDate(current.created_at)}{" "}
                          {current.uploader?.nom &&
                            `· par ${current.uploader.nom}`}
                        </div>
                      </div>
                      <DownloadLink path={current.storage_path} />
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: 14,
                      marginBottom: 16,
                    }}
                  >
                    Aucun document courant.
                  </p>
                )}

                <UploadForm projet_id={projet.id} category={cat} />

                {archived.length > 0 && (
                  <details style={{ marginTop: 18 }}>
                    <summary
                      className="eyebrow"
                      style={{
                        cursor: "pointer",
                        color: "var(--ink-soft)",
                      }}
                    >
                      Historique ({archived.length})
                    </summary>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "12px 0 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {archived.map((d) => (
                        <DocumentRow
                          key={d.id}
                          doc={d}
                          showMarkFinal={versioned}
                        />
                      ))}
                    </ul>
                  </details>
                )}
              </section>
            );
          })}

          {/* MESSAGERIE */}
          <MessagesPanel
            projet_id={projet.id}
            messages={messages}
            canPost={true}
          />
        </div>
      </section>
    </main>
  );
}

function groupBy<T, K>(arr: T[], fn: (x: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const x of arr) {
    const k = fn(x);
    const list = m.get(k);
    if (list) list.push(x);
    else m.set(k, [x]);
  }
  return m;
}

function formatBytes(b: number | null): string {
  if (!b) return "—";
  if (b < 1024) return `${b} o`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} Ko`;
  return `${(b / 1024 / 1024).toFixed(1)} Mo`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
