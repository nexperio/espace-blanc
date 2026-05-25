import Link from "next/link";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

const STEPS = [
  {
    t: "Le diagnostic",
    sub: "Sans engagement, sous 24h.",
    d: "Un appel d'abord, une visite ensuite. Nous écoutons davantage que nous parlons. Au sortir : un devis détaillé, ligne par ligne.",
    img: EB_PHOTOS.window,
  },
  {
    t: "Le tri",
    sub: "Pièce par pièce, à votre rythme.",
    d: "Avec ou sans vous. Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, depuis l'extranet.",
    img: EB_PHOTOS.archive,
  },
  {
    t: "La valorisation",
    sub: "Brocanteurs, dépôts-vente, en ligne, dons.",
    d: "Pour chaque ligne, nous proposons la meilleure destination. Vous voyez le prix, vous validez, nous exécutons.",
    img: EB_PHOTOS.detail,
  },
  {
    t: "La restitution",
    sub: "Logement vide, propre, rendu.",
    d: "Le dernier jour, nous remettons les clés. Un bilan d'impact accompagne la facture : argent restitué, kilos sauvés, dons effectués.",
    img: EB_PHOTOS.empty,
  },
] as const;

export function Method() {
  return (
    <section style={{ padding: "140px 0 80px", background: "var(--ivory)" }}>
      <div className="page">
        <SectionHeading
          eyebrow="Notre méthode"
          title={
            <>
              Quatre temps, <em>une cadence</em>
            </>
          }
          aside="Le passage, écrit pas à pas."
        />

        <div style={{ marginTop: 72 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.t}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 ? "1fr 1.1fr" : "1.1fr 1fr",
                gap: 72,
                alignItems: "center",
                padding: "56px 0",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 22,
                    marginBottom: 22,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: 88,
                      lineHeight: 1,
                      fontWeight: 500,
                      color: "var(--laiton)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        letterSpacing: "-0.005em",
                        lineHeight: 1.05,
                        fontSize: "clamp(36px, 4.4vw, 56px)",
                        color: "var(--ink)",
                      }}
                    >
                      {s.t}
                    </h3>
                    <p
                      style={{
                        color: "var(--ink-mute)",
                        fontSize: 17,
                        marginTop: 6,
                      }}
                    >
                      {s.sub}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 17.5,
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    maxWidth: "48ch",
                  }}
                >
                  {s.d}
                </p>
              </div>
              <div
                className="photo"
                style={{ order: i % 2 ? 1 : 2, aspectRatio: "5/4" }}
              >
                <div
                  className="img"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: "center" }}>
          <Link href={ROUTES.methode} className="btn btn-ghost">
            Lire la méthode en détail <Icon name="arrow-right" size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
