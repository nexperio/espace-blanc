import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/marketing/icon";
import { getSupabaseServer } from "@/lib/supabase/server";
import { ROUTES, BRAND, MONOGRAM } from "@/lib/routes";
import { signOut } from "../login/actions";
import { DownloadLink } from "./download-link";

export const metadata: Metadata = {
  title: "Votre dossier",
  robots: { index: false, follow: false },
};

const TYPE_LABELS = {
  photo: "Photo",
  devis: "Devis",
  facture: "Facture",
  certif_don: "Certificat de don",
  fiche_objet: "Fiche objet",
  bilan_impact: "Bilan d'impact",
} as const;

type DocType = keyof typeof TYPE_LABELS;

type DossierRow = {
  id: string;
  ref: string;
  nom: string;
  statut: string;
  documents: Array<{
    id: string;
    type: DocType;
    label: string;
    storage_path: string;
    montant_eur: number | null;
    created_at: string;
  }>;
};

export default async function DossierPage() {
  const supabase = await getSupabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) redirect("/espace-client/login");

  const { data: dossiers } = await supabase
    .from("dossiers")
    .select(
      "id, ref, nom, statut, documents(id, type, label, storage_path, montant_eur, created_at)",
    )
    .order("created_at", { ascending: false })
    .returns<DossierRow[]>();

  const list = dossiers ?? [];
  const totalDocs = list.reduce((n, d) => n + d.documents.length, 0);
  const totalVentes = list
    .flatMap((d) => d.documents)
    .filter((doc) => doc.type === "facture")
    .reduce((sum, doc) => sum + (doc.montant_eur ?? 0), 0);

  const firstName = user.email?.split("@")[0] ?? "vous";

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <header
        style={{
          padding: "22px 56px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          background: "var(--ivory)",
        }}
      >
        <Link
          href={ROUTES.home}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: "-0.005em",
            }}
          >
            {BRAND}
          </span>
          <span
            className="monogram"
            style={{ width: 28, height: 28, fontSize: 11 }}
          >
            {MONOGRAM}
          </span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span className="eyebrow">Connecté · {user.email}</span>
          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>

      <section style={{ padding: "72px 56px 24px" }}>
        <div className="page" style={{ padding: 0 }}>
          <span className="eyebrow">Extranet privé</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 6vw, 88px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.02,
              marginTop: 12,
              color: "var(--ink)",
            }}
          >
            Bienvenue, <em>{firstName}</em>
          </h1>
          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 32,
              maxWidth: 720,
            }}
          >
            <Stat n={list.length} l="dossiers actifs" />
            <Stat n={totalDocs} l="documents fichés" />
            <Stat
              n={totalVentes.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              })}
              l="valeur restituée"
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 56px 120px" }}>
        <div className="page" style={{ padding: 0 }}>
          {list.length === 0 ? (
            <EmptyState />
          ) : (
            list.map((d) => <DossierCard key={d.id} dossier={d} />)
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ n, l }: { n: number | string; l: string }) {
  return (
    <div
      style={{
        paddingTop: 20,
        borderTop: "1px solid var(--sable)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: 48,
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

function DossierCard({ dossier }: { dossier: DossierRow }) {
  return (
    <article
      style={{
        marginTop: 40,
        border: "1px solid var(--line)",
        borderRadius: 4,
        padding: 32,
        background: "var(--lin)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <span className="eyebrow">Dossier · {dossier.ref}</span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 36,
              letterSpacing: "-0.005em",
              lineHeight: 1.1,
              marginTop: 6,
              color: "var(--ink)",
            }}
          >
            {dossier.nom}
          </h2>
        </div>
        <span className="chip">{dossier.statut}</span>
      </header>

      {dossier.documents.length === 0 ? (
        <p style={{ color: "var(--ink-soft)" }}>
          Aucun document pour l&apos;instant. Votre conseillère vous tient
          informé(e) dès qu&apos;une nouvelle pièce est versée.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            borderTop: "1px solid var(--sable)",
          }}
        >
          {dossier.documents.map((doc) => (
            <li
              key={doc.id}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr auto auto",
                gap: 24,
                alignItems: "center",
                padding: "18px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span className="eyebrow">{TYPE_LABELS[doc.type]}</span>
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 19,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                {doc.label}
              </span>
              <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>
                {doc.montant_eur != null
                  ? doc.montant_eur.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : "—"}
              </span>
              <DownloadLink path={doc.storage_path} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        marginTop: 40,
        padding: 56,
        border: "1px dashed var(--line)",
        borderRadius: 4,
        textAlign: "center",
        color: "var(--ink-soft)",
      }}
    >
      <Icon name="leaf" size={32} />
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: 24,
          marginTop: 18,
          color: "var(--ink)",
        }}
      >
        Pas encore de dossier ouvert à votre nom.
      </p>
      <p style={{ marginTop: 10, maxWidth: "52ch", margin: "10px auto 0" }}>
        Si vous attendiez l&apos;ouverture d&apos;un dossier, contactez-nous —
        nous le créons côté équipe avant qu&apos;il apparaisse ici.
      </p>
    </div>
  );
}
