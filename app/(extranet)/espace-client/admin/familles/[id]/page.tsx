import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { AppHeader } from "../../../_components/app-header";
import { InviteMemberForm } from "./invite-member-form";
import { RemoveMemberButton } from "./remove-member-button";
import { CreateProjetForm } from "./create-projet-form";

export const metadata: Metadata = {
  title: "Famille — Espace Blanc",
  robots: { index: false, follow: false },
};

type FamilleDetail = {
  id: string;
  ref: string;
  nom: string;
  members: Array<{
    profile_id: string;
    profile: { email: string; nom: string | null } | null;
  }>;
  projets: Array<{ id: string; ref: string; nom: string; statut: string }>;
};

export default async function FamilleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser({ roles: ["admin"] });
  const admin = getSupabaseAdmin();
  const { data: famille } = await admin
    .from("familles")
    .select(
      `id, ref, nom,
       members:famille_members(profile_id, profile:profiles(email, nom)),
       projets(id, ref, nom, statut)`,
    )
    .eq("id", id)
    .single<FamilleDetail>();

  if (!famille) notFound();

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <AppHeader user={user} />
      <section
        style={{ padding: "clamp(32px, 5vw, 56px) clamp(16px, 4vw, 56px)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Link
            href="/espace-client/admin/familles"
            className="eyebrow"
            style={{ color: "var(--ink-soft)" }}
          >
            ← Toutes les familles
          </Link>
          <div style={{ marginTop: 8, marginBottom: 32 }}>
            <span className="eyebrow">{famille.ref}</span>
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
              {famille.nom}
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* MEMBRES */}
            <section
              style={{
                border: "1px solid var(--line)",
                borderRadius: 6,
                background: "var(--ivory)",
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <span className="eyebrow">Membres</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 24,
                  marginTop: 6,
                  marginBottom: 16,
                  color: "var(--ink)",
                }}
              >
                Parents de la famille
              </h2>
              {famille.members.length === 0 ? (
                <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
                  Aucun membre invité.
                </p>
              ) : (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {famille.members.map((m) => (
                    <li
                      key={m.profile_id}
                      className="flex flex-wrap items-center justify-between gap-3"
                      style={{
                        padding: "10px 14px",
                        background: "var(--lin)",
                        borderRadius: 4,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 14.5,
                            color: "var(--ink)",
                            fontWeight: 500,
                          }}
                        >
                          {m.profile?.nom ?? m.profile?.email}
                        </div>
                        {m.profile?.nom && (
                          <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                            {m.profile?.email}
                          </div>
                        )}
                      </div>
                      <RemoveMemberButton
                        famille_id={famille.id}
                        profile_id={m.profile_id}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: 20 }}>
                <InviteMemberForm famille_id={famille.id} />
              </div>
            </section>

            {/* PROJETS */}
            <section
              style={{
                border: "1px solid var(--line)",
                borderRadius: 6,
                background: "var(--ivory)",
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <span className="eyebrow">Projets</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 24,
                  marginTop: 6,
                  marginBottom: 16,
                  color: "var(--ink)",
                }}
              >
                Projets de la famille
              </h2>
              {famille.projets.length === 0 ? (
                <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
                  Aucun projet ouvert.
                </p>
              ) : (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {famille.projets.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/espace-client/admin/projets/${p.id}`}
                        className="flex flex-wrap items-center justify-between gap-3"
                        style={{
                          padding: "12px 16px",
                          background: "var(--lin)",
                          borderRadius: 4,
                          textDecoration: "none",
                          color: "var(--ink)",
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <span className="eyebrow">{p.ref}</span>
                          <div
                            style={{
                              fontFamily: "var(--font-cormorant), serif",
                              fontWeight: 500,
                              fontSize: 18,
                              marginTop: 2,
                            }}
                          >
                            {p.nom}
                          </div>
                        </div>
                        <span className="chip">{p.statut}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: 20 }}>
                <CreateProjetForm famille_id={famille.id} />
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
