import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  FAMILLE_READABLE_CATEGORIES,
  CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/documents";
import { AppHeader } from "../../../_components/app-header";
import { MessagesPanel } from "../../../_components/messages-panel";
import { DownloadLink } from "../../../_components/download-link";

export const metadata: Metadata = {
  title: "Votre projet — Espace Blanc",
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

type MessageRow = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  author: { nom: string | null; email: string; role: string } | null;
};

export default async function FamilleProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser({ roles: ["famille"] });
  const supabase = await getSupabaseServer();

  const [projetRes, docsRes, messagesRes] = await Promise.all([
    supabase
      .from("projets")
      .select("id, ref, nom, statut, famille:familles!inner(nom)")
      .eq("id", id)
      .single<Projet>(),
    // RLS filtre déjà is_current=true côté famille.
    supabase
      .from("documents")
      .select("id, category, storage_path, filename, size_bytes, created_at")
      .eq("projet_id", id)
      .returns<DocRow[]>(),
    supabase
      .from("messages")
      .select(
        "id, body, created_at, author_id, author:profiles!messages_author_id_fkey(nom, email, role)",
      )
      .eq("projet_id", id)
      .order("created_at", { ascending: true })
      .returns<MessageRow[]>(),
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
              href="/espace-client/famille"
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

          <section
            style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              background: "var(--ivory)",
              padding: "clamp(20px, 3vw, 32px)",
            }}
          >
            <span className="eyebrow">Documents</span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(24px, 3vw, 30px)",
                marginTop: 6,
                marginBottom: 18,
                color: "var(--ink)",
              }}
            >
              Toutes les pièces de votre dossier
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
              {FAMILLE_READABLE_CATEGORIES.map((cat) => {
                const doc = byCat.get(cat);
                return (
                  <li
                    key={cat}
                    className="flex flex-wrap items-center justify-between gap-3"
                    style={{
                      padding: "16px 18px",
                      background: doc ? "var(--lin)" : "var(--cream, #fbf8f1)",
                      border: "1px solid var(--line)",
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: "1 1 220px" }}>
                      <span className="eyebrow">{CATEGORY_LABELS[cat]}</span>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500,
                          fontSize: 18,
                          marginTop: 4,
                          color: "var(--ink)",
                          wordBreak: "break-word",
                        }}
                      >
                        {doc?.filename ?? "—"}
                      </div>
                      {doc && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--ink-soft)",
                            marginTop: 4,
                          }}
                        >
                          Déposé le{" "}
                          {new Date(doc.created_at).toLocaleDateString(
                            "fr-FR",
                            { day: "2-digit", month: "long", year: "numeric" },
                          )}
                        </div>
                      )}
                    </div>
                    {doc ? (
                      <DownloadLink path={doc.storage_path} />
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--ink-mute)",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        En attente
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

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
