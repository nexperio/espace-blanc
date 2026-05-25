"use client";

import { useEffect, useState } from "react";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";
import { EB_PHOTOS } from "@/lib/photos";

const ITEMS = [
  {
    q: "Ma mère partait en EHPAD. J'étais à 800 km. Espace Blanc a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.",
    who: "Sophie L.",
    role: "Héritière, succession",
    city: "Paris 12ᵉ",
    img: EB_PHOTOS.portrait,
    chiffre: "4 200 € restitués",
  },
  {
    q: "J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi, le piano est parti chez un jeune couple.",
    who: "Jean P.",
    role: "Fils unique, succession",
    city: "Versailles",
    img: EB_PHOTOS.detail,
    chiffre: "6 mois d'accompagnement",
  },
  {
    q: "Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €. Et l'appartement a été rendu impeccable.",
    who: "Famille D.",
    role: "Succession ouverte",
    city: "Boulogne",
    img: EB_PHOTOS.window,
    chiffre: "+5 600 € vs débarras",
  },
  {
    q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.",
    who: "Yann B.",
    role: "Expat. Lisbonne",
    city: "Paris 11ᵉ",
    img: EB_PHOTOS.livingroom,
    chiffre: "−42% transport",
  },
] as const;

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % ITEMS.length);
  const prev = () => setI((p) => (p - 1 + ITEMS.length) % ITEMS.length);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ITEMS.length), 8000);
    return () => clearInterval(t);
  }, []);

  const cur = ITEMS[i];

  return (
    <section style={{ padding: "140px 0", background: "var(--lin)" }}>
      <div className="page">
        <SectionHeading
          eyebrow={`Témoignage ${String(i + 1).padStart(2, "0")} / ${String(
            ITEMS.length,
          ).padStart(2, "0")}`}
          title={
            <>
              Vos lettres, <em>nos preuves</em>
            </>
          }
          aside="Tous nos clients nous écrivent après. C'est notre meilleur indicateur."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 72,
            marginTop: 64,
            alignItems: "center",
          }}
        >
          <div className="photo" style={{ aspectRatio: "4/5" }}>
            <div
              className="img"
              key={cur.img}
              style={{ backgroundImage: `url(${cur.img})` }}
            />
          </div>

          <div>
            <div style={{ position: "relative" }} key={i}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 3vw, 42px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                « {cur.q} »
              </div>
            </div>
            <div
              style={{
                marginTop: 36,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--ink)",
                  }}
                >
                  {cur.who}
                </div>
                <div className="eyebrow" style={{ marginTop: 4 }}>
                  {cur.role} · {cur.city}
                </div>
                <div className="chip" style={{ marginTop: 14 }}>
                  {cur.chiffre}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {ITEMS.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      aria-label={`Témoignage ${k + 1}`}
                      style={{
                        width: k === i ? 28 : 8,
                        height: 2,
                        borderRadius: 99,
                        background:
                          k === i ? "var(--laiton)" : "var(--line-strong)",
                        transition: "all .3s ease",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={prev}
                  className="btn btn-ghost"
                  style={{ padding: "10px 14px" }}
                  aria-label="Précédent"
                >
                  <Icon name="arrow-left" size={14} />
                </button>
                <button
                  onClick={next}
                  className="btn btn-ghost"
                  style={{ padding: "10px 14px" }}
                  aria-label="Suivant"
                >
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
