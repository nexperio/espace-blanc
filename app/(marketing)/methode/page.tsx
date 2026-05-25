import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/marketing/icon";
import { SectionHeading } from "@/components/marketing/section-heading";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "La méthode — quatre temps, une cadence",
  description:
    "Diagnostic, tri photographié, valorisation tracée, restitution chiffrée. Quatre engagements écrits et opposables.",
};

const STEPS = [
  {
    t: "Le diagnostic",
    sub: "Sans engagement, sous 24h.",
    d: "Un appel d'abord, une visite ensuite. Nous écoutons davantage que nous parlons. Au sortir, un devis détaillé, ligne par ligne, qui n'engage que nous.",
    img: EB_PHOTOS.window,
    gar: "Devis garanti tenu, signé par nos soins.",
  },
  {
    t: "Le tri",
    sub: "Pièce par pièce, à votre rythme.",
    d: "Avec ou sans vous. Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, depuis l'extranet, à n'importe quelle heure.",
    img: EB_PHOTOS.archive,
    gar: "100% photographié. Rien ne part sans accord.",
  },
  {
    t: "La valorisation",
    sub: "Brocanteurs, dépôts-vente, en ligne, dons.",
    d: "Pour chaque ligne, nous proposons la meilleure destination. Vous voyez le prix proposé, vous validez, nous exécutons. Les sommes vous reviennent.",
    img: EB_PHOTOS.detail,
    gar: "Prix de réserve respecté. Aucune commission cachée.",
  },
  {
    t: "La restitution",
    sub: "Logement vide, propre, rendu.",
    d: "Le dernier jour, nous remettons les clés. Un bilan d'impact accompagne la facture : argent restitué, kilos sauvés, dons effectués, recyclage et résiduel.",
    img: EB_PHOTOS.empty,
    gar: "Logement nu et propre, photographié à la remise.",
  },
] as const;

const GARANTIES: ReadonlyArray<readonly [string, string]> = [
  ["Devis 24h", "Sans engagement. Avant toute visite payante."],
  ["RC pro", "Assurance professionnelle et transport, vérifiable."],
  ["RGPD", "Vos données chiffrées. Aucun usage commercial."],
  ["Tarif clair", "Pas de frais cachés. Pas de commission masquée."],
] as const;

export default function MethodePage() {
  return (
    <div className="view">
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 60,
          background: "var(--ivory)",
        }}
      >
        <div className="page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span className="eyebrow">La méthode</span>
            <span className="eyebrow">Quatre temps</span>
            <span className="eyebrow">Une cadence</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(60px, 9vw, 156px)",
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
            }}
          >
            Quatre temps,
            <br />
            une <em>cadence</em>
          </h1>
          <p
            style={{
              fontSize: 21,
              color: "var(--ink-soft)",
              marginTop: 36,
              maxWidth: "50ch",
              lineHeight: 1.6,
            }}
          >
            Le passage, écrit pas à pas. Aucun lot, aucune précipitation. Tout
            est noté, vérifiable, restituable.
          </p>
        </div>
      </section>

      {STEPS.map((s, i) => (
        <section
          key={s.t}
          style={{
            padding: "80px 0",
            background: i % 2 ? "var(--lin)" : "var(--ivory)",
          }}
        >
          <div className="page">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 72,
                alignItems: "center",
              }}
            >
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 22,
                  }}
                >
                  <span
                    className="warm-gradient"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 112,
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: "clamp(40px, 5vw, 64px)",
                        letterSpacing: "-0.005em",
                        lineHeight: 1.05,
                        color: "var(--ink)",
                      }}
                    >
                      {s.t}
                    </h2>
                    <p
                      style={{
                        color: "var(--ink-mute)",
                        fontSize: 18,
                        marginTop: 6,
                      }}
                    >
                      {s.sub}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 18,
                    lineHeight: 1.65,
                    marginTop: 32,
                    maxWidth: "48ch",
                    color: "var(--ink-soft)",
                  }}
                >
                  {s.d}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 18px",
                    border: "1px solid var(--ember)",
                    borderRadius: 4,
                    color: "var(--ember)",
                  }}
                >
                  <Icon name="shield" size={16} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{s.gar}</span>
                </div>
              </div>
              <div
                className="photo"
                style={{ order: i % 2 ? 1 : 2, aspectRatio: "4/5" }}
              >
                <div
                  className="img"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="page">
          <SectionHeading
            eyebrow="Garanties"
            title={
              <>
                Ce que nous <em>vous devons</em>
              </>
            }
            aside="Quatre engagements écrits, opposables."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
              marginTop: 56,
            }}
          >
            {GARANTIES.map(([t, d], i) => (
              <div
                key={t}
                style={{
                  paddingTop: 28,
                  borderTop: "1px solid var(--sable)",
                }}
              >
                <span className="eyebrow">Garantie 0{i + 1}</span>
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 26,
                    marginTop: 10,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.1,
                    color: "var(--ink)",
                  }}
                >
                  {t}
                </h4>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    marginTop: 10,
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "140px 0",
          background: "var(--encre)",
          color: "var(--on-dark)",
        }}
      >
        <div className="page" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 6.5vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              color: "var(--on-dark)",
              maxWidth: "20ch",
              margin: "0 auto",
            }}
          >
            Voir si la méthode <em style={{ color: "var(--amber)" }}>s&apos;applique à vous</em>
          </h2>
          <Link
            href={ROUTES.contact}
            className="btn btn-ivory"
            style={{ marginTop: 40 }}
          >
            Diagnostic gratuit <Icon name="arrow-right" size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
