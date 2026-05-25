const PILLARS = [
  [
    "Mesurer plutôt que jeter",
    "Aucun objet ne quitte le logement sans avoir été photographié, fiché, estimé.",
  ],
  [
    "Restituer ce qui a de la valeur",
    "Brocanteurs, dépôts-vente, ventes en ligne. L'argent retourne aux familles, ligne par ligne.",
  ],
  [
    "Offrir le reste à qui en a l'usage",
    "Associations partenaires identifiées, certificats de don remis. La décharge reste l'exception.",
  ],
  [
    "Préférer la lenteur quand elle protège",
    "Aucune pression. Nous travaillons au rythme de chacun.",
  ],
] as const;

export function Manifesto() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--ivory)",
      }}
    >
      <div className="page">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <span className="eyebrow">Notre conviction</span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(44px, 5vw, 76px)",
                lineHeight: 1.02,
                marginTop: 18,
                letterSpacing: "-0.005em",
                color: "var(--ink)",
              }}
            >
              On peut tout faire
              <br />
              <em>avec douceur</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PILLARS.map(([t, d], i) => (
              <div
                key={t}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 24,
                  padding: "26px 0",
                  borderTop: i === 0 ? "1px solid var(--sable)" : "none",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  className="warm-gradient"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 32,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 26,
                      letterSpacing: "-0.005em",
                      lineHeight: 1.15,
                      color: "var(--ink)",
                    }}
                  >
                    {t}
                  </h3>
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      marginTop: 6,
                      fontSize: 16,
                      maxWidth: "62ch",
                      lineHeight: 1.55,
                    }}
                  >
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
