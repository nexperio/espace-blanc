"use client";

import { useState } from "react";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";

const QS = [
  {
    q: "Combien coûte une intervention ?",
    a: "Le diagnostic est gratuit. La mission est devisée en fonction du volume, du contexte et de la part valorisable. Nous reversons systématiquement la valeur nette des ventes.",
  },
  {
    q: "Intervenez-vous hors Île-de-France ?",
    a: "Notre cœur d'activité reste l'Île-de-France. Pour le reste, nous étudions au cas par cas avec un déplacement facturé.",
  },
  {
    q: "Comment fonctionne la valorisation ?",
    a: "Brocanteurs, dépôts-vente, ventes en ligne, ou associations bénéficiaires. Vous validez chaque destination, nous restituons les sommes.",
  },
  {
    q: "Que devient ce qui n'a pas de valeur marchande ?",
    a: "Soit un don à une association partenaire (avec certificat), soit un recyclage filière. La décharge reste l'exception.",
  },
  {
    q: "Le client peut-il être absent ?",
    a: "Oui. Vous validez à distance via l'extranet, à votre rythme. Photos, fiches, prix proposés, dons : tout vous est soumis avant exécution.",
  },
] as const;

export function FaqShort() {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ padding: "140px 0", background: "var(--ivory)" }}>
      <div className="page" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="Questions reçues"
          title={
            <>
              Cinq <em>réponses</em>
            </>
          }
          aside="Pour la FAQ complète, voir le pied de page."
        />
        <div style={{ marginTop: 56, borderTop: "1px solid var(--sable)" }}>
          {QS.map((it, i) => (
            <div
              key={it.q}
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "28px 0",
                  textAlign: "left",
                  gap: 24,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    gap: 28,
                    alignItems: "baseline",
                  }}
                >
                  <span className="eyebrow" style={{ minWidth: 30 }}>
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      letterSpacing: "-0.005em",
                      lineHeight: 1.25,
                      color: "var(--ink)",
                    }}
                  >
                    {it.q}
                  </span>
                </span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: open === i ? "var(--ink)" : "transparent",
                    color: open === i ? "var(--on-dark)" : "var(--ink)",
                    border: `1px solid ${
                      open === i ? "var(--ink)" : "var(--line-strong)"
                    }`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .25s ease",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={open === i ? "minus" : "plus"} size={16} />
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    paddingLeft: 58,
                    paddingBottom: 28,
                    paddingRight: 60,
                    maxWidth: "70ch",
                  }}
                >
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: 16.5,
                      lineHeight: 1.6,
                    }}
                  >
                    {it.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
