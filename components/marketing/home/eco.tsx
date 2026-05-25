import { Icon } from "../icon";

const ROWS: ReadonlyArray<readonly [string, string]> = [
  ["92%", "détourné de la décharge en moyenne"],
  ["23", "associations partenaires certifiées"],
  ["1×", "certificat remis par destination"],
  ["0", "objet jeté sans avoir cherché preneur"],
] as const;

export function Eco() {
  return (
    <section
      style={{
        padding: "140px 0",
        background: "var(--lin)",
        color: "var(--ink)",
      }}
    >
      <div className="page">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <span className="chip">
              <Icon name="leaf" size={12} /> Engagement éco-solidaire
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(48px, 6.5vw, 96px)",
                lineHeight: 1.02,
                letterSpacing: "-0.005em",
                marginTop: 24,
                color: "var(--ink)",
              }}
            >
              Rien ne se jette,
              <br />
              <em>tant qu&apos;on prend le temps</em>
            </h2>
            <p
              style={{
                fontSize: 18.5,
                color: "var(--ink-soft)",
                maxWidth: "58ch",
                marginTop: 32,
                lineHeight: 1.6,
              }}
            >
              Pour chaque mission, nous remettons un bilan d&apos;impact. Poids
              des dons certifiés. Poids recyclé. Poids résiduel envoyé en
              déchèterie. Aucune ligne n&apos;est cachée. Aucun objet n&apos;est
              jeté sans avoir cherché preneur.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {ROWS.map(([n, l], i) => (
              <div
                key={l}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 24,
                  padding: "24px 0",
                  alignItems: "baseline",
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
                    fontSize: 54,
                    color: "var(--laiton)",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </span>
                <span
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 16.5,
                    lineHeight: 1.5,
                  }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
