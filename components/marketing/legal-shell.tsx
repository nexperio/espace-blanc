import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  updatedAt?: string;
  children: ReactNode;
};

export function LegalShell({ eyebrow, title, intro, updatedAt, children }: Props) {
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
          <span className="eyebrow">{eyebrow}</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 7vw, 112px)",
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginTop: 18,
            }}
          >
            {title}
          </h1>
          {intro ? (
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-soft)",
                marginTop: 32,
                maxWidth: "56ch",
                lineHeight: 1.65,
              }}
            >
              {intro}
            </p>
          ) : null}
          {updatedAt ? (
            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
              }}
            >
              Mise à jour — {updatedAt}
            </p>
          ) : null}
        </div>
      </section>

      <section style={{ padding: "80px 0 140px", background: "var(--ivory)" }}>
        <div className="page">
          <div className="legal-content">{children}</div>
        </div>
      </section>
    </div>
  );
}
