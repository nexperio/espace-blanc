import { SectionHeading } from "../section-heading";

const PAINS: ReadonlyArray<readonly [string, string]> = [
  [
    "Débarrasseurs au lot",
    "On vous estime à la louche, on paie d'un trait, on repart avec ce que vous n'aurez pas vu partir. Vous ne saurez jamais le prix exact de ce qui a été revendu.",
  ],
  [
    "Déménageurs au volume",
    "Tout est transporté, y compris ce qui aurait dû partir avant. La facture grossit. Le surplus finit en cave ou en garde-meuble.",
  ],
  [
    "Vos week-ends",
    "Brocanteurs, associations, dépôts-vente, recyclage : trois mois d'arbitrage. La plupart renoncent en cours de route.",
  ],
] as const;

const RESPONSES: ReadonlyArray<{ n: string; t: string; d: string }> = [
  {
    n: "01",
    t: "Un seul interlocuteur",
    d: "Une conseillère orchestre tous les prestataires, du diagnostic à la remise des clés. Vous n'avez qu'un numéro à appeler.",
  },
  {
    n: "02",
    t: "Pas de prise sur l'existant",
    d: "Vous payez notre temps et notre méthode, pas un pourcentage caché sur vos objets. Les ventes nettes vous reviennent intégralement.",
  },
  {
    n: "03",
    t: "Chaque ligne tracée",
    d: "Photo, estimation, destination, prix de vente. Vous voyez où chaque objet est parti et combien il a rapporté.",
  },
  {
    n: "04",
    t: "Extranet client",
    d: "Photos, devis, factures, certificats de don. Tout est consultable à distance, à votre rythme.",
  },
] as const;

export function Pillars() {
  return (
    <section style={{ padding: "140px 0", background: "var(--ivory)" }}>
      <div className="page">
        <SectionHeading
          eyebrow="Pourquoi nous, plutôt qu'un débarrasseur"
          title={
            <>
              Le marché tel qu&apos;il est, <em>ce que nous changeons</em>
            </>
          }
          aside="Face aux débarrasseurs, brocanteurs, sociétés de déménagement."
        />

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "start",
          }}
        >
          {/* L'offre actuelle */}
          <div>
            <span className="eyebrow">L&apos;offre actuelle</span>
            <blockquote
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(24px, 2.6vw, 34px)",
                lineHeight: 1.32,
                color: "var(--ink)",
                marginTop: 18,
                paddingLeft: 22,
                borderLeft: "2px solid var(--ember)",
              }}
            >
              « L&apos;offre actuelle vous impose d&apos;organiser le tri, le
              déménagement des objets que vous souhaitez garder puis de vider le
              logement en faisant éventuellement appel à des entreprises
              payantes ou qui se rémunèrent sur l&apos;existant. »
            </blockquote>
            <ul
              style={{
                listStyle: "none",
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {PAINS.map(([t, d], i) => (
                <li
                  key={t}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 20,
                    padding: "22px 0",
                    borderTop:
                      i === 0
                        ? "1px solid var(--sable)"
                        : "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 24,
                      color: "var(--taupe)",
                      lineHeight: 1,
                    }}
                  >
                    —
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.2,
                        color: "var(--ink)",
                      }}
                    >
                      {t}
                    </h4>
                    <p
                      style={{
                        color: "var(--ink-soft)",
                        marginTop: 6,
                        fontSize: 15.5,
                        lineHeight: 1.55,
                      }}
                    >
                      {d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chez Espace Blanc */}
          <div>
            <span className="eyebrow">Chez Espace Blanc</span>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.005em",
                marginTop: 18,
                color: "var(--ink)",
              }}
            >
              Un pivot unique. <em>Une rémunération propre.</em>
            </h3>
            <p
              style={{
                color: "var(--ink-soft)",
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.6,
                maxWidth: "44ch",
              }}
            >
              Nous nous rémunérons sur notre travail, jamais sur ce que vous
              possédez. Vous reprenez la main sur le calendrier, sur les
              destinations et sur les montants.
            </p>
            <ul
              style={{
                listStyle: "none",
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {RESPONSES.map((r, i) => (
                <li
                  key={r.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 20,
                    padding: "22px 0",
                    borderTop:
                      i === 0
                        ? "1px solid var(--sable)"
                        : "1px solid var(--line)",
                  }}
                >
                  <span
                    className="warm-gradient"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 26,
                      lineHeight: 1,
                    }}
                  >
                    {r.n}
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.2,
                        color: "var(--ink)",
                      }}
                    >
                      {r.t}
                    </h4>
                    <p
                      style={{
                        color: "var(--ink-soft)",
                        marginTop: 6,
                        fontSize: 15.5,
                        lineHeight: 1.55,
                      }}
                    >
                      {r.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
