import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/marketing/icon";
import { SectionHeading } from "@/components/marketing/section-heading";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Témoignages & presse — vos lettres, nos preuves",
  description:
    "Six lettres reçues de familles accompagnées. Quatre retombées presse. Le bilan, sans posture.",
};

const CASES = [
  {
    who: "Sophie L.",
    role: "Héritière, succession",
    city: "Paris 12ᵉ",
    img: EB_PHOTOS.portrait,
    q: "Ma mère partait en EHPAD. J'étais à 800 km. Espace Blanc a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.",
    chiffre: "4 200 € restitués",
  },
  {
    who: "Jean P.",
    role: "Fils unique, succession",
    city: "Versailles",
    img: EB_PHOTOS.detail,
    q: "J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi.",
    chiffre: "6 mois d'accompagnement",
  },
  {
    who: "Famille D.",
    role: "Succession ouverte",
    city: "Boulogne",
    img: EB_PHOTOS.window,
    q: "Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €.",
    chiffre: "+5 600 € vs débarras",
  },
  {
    who: "Béatrice M.",
    role: "Déménagement",
    city: "Nogent",
    img: EB_PHOTOS.archive,
    q: "On m'avait dit débarras. On a eu une rédactrice. La différence est tout.",
    chiffre: "92 m² traités",
  },
  {
    who: "Marc T.",
    role: "Maman en EHPAD",
    city: "Neuilly",
    img: EB_PHOTOS.hands,
    q: "Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée avec sa lampe, son fauteuil, ses photos. Elle s'est dit chez elle.",
    chiffre: "Installation J-1",
  },
  {
    who: "Yann B.",
    role: "Expat. Lisbonne",
    city: "Paris 11ᵉ",
    img: EB_PHOTOS.livingroom,
    q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.",
    chiffre: "−42% transport",
  },
] as const;

const MEDIA = ["Le Monde", "Télérama", "France Inter", "Stratégies"] as const;

export default function TemoignagesPage() {
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
            <span className="eyebrow">Témoignages &amp; presse</span>
            <span className="eyebrow">Vingt-trois lettres</span>
            <span className="eyebrow">Quatre retombées presse</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(60px, 9vw, 156px)",
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
            }}
          >
            Vos lettres,
            <br />
            <em>nos preuves</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 0 120px", background: "var(--ivory)" }}>
        <div className="page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 40,
            }}
          >
            {CASES.map((c) => (
              <article
                key={c.who}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div className="photo" style={{ aspectRatio: "4/5" }}>
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${c.img})` }}
                  />
                </div>
                <div>
                  <span className="eyebrow">{c.role}</span>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontStyle: "italic",
                      fontSize: 22,
                      lineHeight: 1.35,
                      marginTop: 10,
                      letterSpacing: "-0.005em",
                      color: "var(--ink)",
                    }}
                  >
                    « {c.q} »
                  </p>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 17,
                        color: "var(--ink)",
                      }}
                    >
                      {c.who} · {c.city}
                    </span>
                    <span className="chip">{c.chiffre}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "120px 0", background: "var(--lin)" }}>
        <div className="page">
          <SectionHeading
            eyebrow="Ils en parlent"
            title={
              <>
                Dans <em>la presse</em>
              </>
            }
            aside="Quatre retombées identifiées depuis 2023."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
              marginTop: 56,
            }}
          >
            {MEDIA.map((m) => (
              <div
                key={m}
                style={{
                  paddingTop: 32,
                  paddingBottom: 32,
                  textAlign: "center",
                  borderTop: "1px solid var(--sable)",
                  borderBottom: "1px solid var(--sable)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 32,
                    letterSpacing: "-0.005em",
                    color: "var(--ink)",
                  }}
                >
                  {m}
                </div>
                <div className="eyebrow" style={{ marginTop: 10 }}>
                  Article 2024
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "120px 0",
          background: "var(--ivory)",
          textAlign: "center",
        }}
      >
        <div className="page">
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.005em",
              color: "var(--ink)",
            }}
          >
            Devenir notre 24<sup>e</sup> <em>témoignage</em>
          </h2>
          <Link
            href={ROUTES.contact}
            className="btn"
            style={{ marginTop: 32 }}
          >
            Demander un diagnostic <Icon name="arrow-right" size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
