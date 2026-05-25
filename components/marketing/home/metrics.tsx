const METRICS = [
  { v: "412", l: "missions accompagnées", s: "depuis 2021" },
  { v: "1,8 M€", l: "restitués aux familles", s: "valeur nette des ventes" },
  { v: "84 t", l: "détournées de la décharge", s: "dons et recyclage" },
  { v: "23", l: "associations partenaires", s: "identifiées et certifiées" },
] as const;

export function Metrics() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--encre)",
        color: "var(--on-dark)",
      }}
    >
      <div className="page">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 64,
            alignItems: "baseline",
            marginBottom: 64,
          }}
        >
          <span className="eyebrow on-dark">
            Bilan d&apos;impact · au 31 mars 2026
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.005em",
              color: "var(--on-dark)",
            }}
          >
            Ce que nous <em style={{ color: "var(--laiton)" }}>mesurons</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {METRICS.map((m) => (
            <div
              key={m.v}
              style={{
                paddingTop: 28,
                borderTop: "1px solid var(--line-on-dark)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(48px, 5vw, 80px)",
                  lineHeight: 1,
                  letterSpacing: "-0.015em",
                }}
              >
                {m.v}
              </div>
              <div style={{ marginTop: 14, fontSize: 16, fontWeight: 500 }}>
                {m.l}
              </div>
              <div
                className="eyebrow on-dark"
                style={{ marginTop: 6 }}
              >
                {m.s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
