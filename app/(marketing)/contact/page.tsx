import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Diagnostic gratuit — on commence par vous écouter",
  description:
    "Cinq minutes pour cadrer votre situation. Une conseillère vous rappelle sous 24h, avec un premier devis indicatif. Aucune obligation.",
};

export default function ContactPage() {
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
            <span className="eyebrow">Diagnostic gratuit</span>
            <span className="eyebrow">5 minutes</span>
            <span className="eyebrow">Rappel sous 24h</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
              alignItems: "end",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(54px, 8vw, 124px)",
                lineHeight: 0.98,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              On commence par <em>vous écouter</em>
            </h1>
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-soft)",
                maxWidth: "42ch",
                lineHeight: 1.6,
              }}
            >
              Cinq minutes pour cadrer votre situation. Une conseillère vous
              rappelle sous 24h, avec un premier devis indicatif. Aucune
              obligation.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0 140px", background: "var(--ivory)" }}>
        <div className="page" style={{ maxWidth: 880, margin: "0 auto" }}>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
