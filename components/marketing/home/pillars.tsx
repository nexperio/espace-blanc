import { SectionHeading } from "../section-heading";

const PILLARS = [
  {
    n: "01",
    t: "Un pivot unique",
    d: "Une interlocutrice orchestre tous les prestataires. Vous n'avez qu'un numéro à appeler.",
  },
  {
    n: "02",
    t: "Valorisation tracée",
    d: "Chaque objet chiffré, photographié, justifié. L'argent retourne à la famille.",
  },
  {
    n: "03",
    t: "Éco et solidaire",
    d: "Certificats de don, kilos évités à la décharge, partenaires associatifs identifiés.",
  },
  {
    n: "04",
    t: "Extranet client",
    d: "Photos, devis, factures, dons. Tout est consultable. Aucune contestation possible.",
  },
] as const;

export function Pillars() {
  return (
    <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
      <div className="page">
        <SectionHeading
          eyebrow="Pourquoi nous, plutôt qu'un débarrasseur"
          title={
            <>
              Quatre <em>piliers</em> tenus
            </>
          }
          aside="Face aux débarrasseurs, brocanteurs, sociétés de déménagement."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            marginTop: 64,
          }}
        >
          {PILLARS.map((p) => (
            <div
              key={p.n}
              style={{
                paddingTop: 28,
                borderTop: "1px solid var(--sable)",
              }}
            >
              <span className="eyebrow">{p.n}</span>
              <h4
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 30,
                  letterSpacing: "-0.005em",
                  lineHeight: 1.1,
                  marginTop: 12,
                  color: "var(--ink)",
                }}
              >
                {p.t}
              </h4>
              <p
                style={{
                  color: "var(--ink-soft)",
                  marginTop: 12,
                  fontSize: 15.5,
                  lineHeight: 1.55,
                }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
