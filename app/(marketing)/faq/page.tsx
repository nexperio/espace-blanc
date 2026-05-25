import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FAQ } from "@/content/faq";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Questions & réponses — Espace Blanc",
  description:
    "Les questions reçues : différence avec un débarras, coût, présence du client, devenir de vos biens, périmètre d'intervention.",
};

export default function FaqPage() {
  // Schema.org FAQPage pour le SEO
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((s) =>
      s.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    ),
  };

  return (
    <div className="view">
      <section
        style={{
          paddingTop: "clamp(120px, 16vw, 160px)",
          paddingBottom: "clamp(48px, 7vw, 80px)",
          background: "var(--ivory)",
        }}
      >
        <div
          className="page"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 56px)",
          }}
        >
          <span className="eyebrow">FAQ</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 7vw, 88px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.02,
              marginTop: 12,
              color: "var(--ink)",
            }}
          >
            Questions <em>reçues</em>
          </h1>
          <p
            style={{
              marginTop: 22,
              color: "var(--ink-soft)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              lineHeight: 1.6,
              maxWidth: "60ch",
            }}
          >
            Les réponses aux questions qui reviennent le plus souvent. Si la
            vôtre manque, écrivez-nous — nous l&apos;ajouterons.
          </p>
        </div>
      </section>

      {FAQ.map((section, idx) => (
        <section
          key={section.eyebrow}
          style={{
            padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 56px)",
            background: idx % 2 === 0 ? "var(--ivory)" : "var(--lin)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionHeading
              eyebrow={section.eyebrow}
              title={
                <>
                  {section.title.split(",").map((part, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1 ? <em>{part.trim()}</em> : part}
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </>
              }
            />
            <div style={{ marginTop: 48 }}>
              {section.items.map((it, i) => (
                <details
                  key={it.q}
                  style={{
                    borderTop: i === 0 ? "1px solid var(--sable)" : "none",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <summary
                    className="flex flex-wrap items-baseline justify-between gap-4"
                    style={{
                      padding: "clamp(20px, 3vw, 28px) 0",
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    <span
                      className="flex flex-wrap items-baseline gap-4 sm:gap-7"
                      style={{ flex: "1 1 auto", minWidth: 0 }}
                    >
                      <span
                        className="eyebrow"
                        style={{ minWidth: 30, color: "var(--ink-mute)" }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500,
                          fontSize: "clamp(20px, 2.4vw, 28px)",
                          letterSpacing: "-0.005em",
                          lineHeight: 1.25,
                          color: "var(--ink)",
                        }}
                      >
                        {it.q}
                      </span>
                    </span>
                  </summary>
                  <div
                    style={{
                      padding: "0 0 clamp(20px, 3vw, 28px) 0",
                      paddingLeft: "clamp(0px, 4vw, 60px)",
                      paddingRight: "clamp(0px, 2vw, 30px)",
                      maxWidth: "72ch",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--ink-soft)",
                        fontSize: "clamp(15px, 1.6vw, 17px)",
                        lineHeight: 1.65,
                      }}
                    >
                      {it.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section
        style={{
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 56px)",
          background: "var(--ivory)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span className="eyebrow">Votre question n&apos;est pas là ?</span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 4vw, 40px)",
              marginTop: 12,
              color: "var(--ink)",
              lineHeight: 1.15,
            }}
          >
            Posez-la nous <em>directement</em>.
          </h2>
          <p
            style={{
              marginTop: 16,
              color: "var(--ink-soft)",
              fontSize: 16,
              lineHeight: 1.55,
              maxWidth: "52ch",
              margin: "16px auto 0",
            }}
          >
            Une réponse personnalisée vaut mieux qu&apos;un paragraphe générique.
            Le diagnostic, par téléphone ou en visite, est toujours gratuit.
          </p>
          <Link
            href={ROUTES.contact}
            className="btn"
            style={{ marginTop: 28, display: "inline-flex" }}
          >
            Demander un diagnostic
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </div>
  );
}
