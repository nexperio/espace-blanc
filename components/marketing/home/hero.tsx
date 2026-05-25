import Link from "next/link";
import { Icon } from "../icon";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES, PHONE, PHONE_TEL } from "@/lib/routes";

const REASSURANCES: ReadonlyArray<readonly [string, string]> = [
  ["Devis 24h", "Sans engagement"],
  ["RC pro + transport", "Assurance vérifiable"],
  ["Tarification claire", "Pas de frais cachés"],
  ["Données chiffrées", "RGPD respecté"],
] as const;

export function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingTop: 160,
        paddingBottom: 80,
        background: "var(--ivory)",
        color: "var(--ink)",
        overflow: "hidden",
      }}
    >
      <div className="page" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span className="eyebrow">Espace Blanc — Direction 01</span>
          <span className="eyebrow">Île-de-France · Sur rendez-vous</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(56px, 9vw, 148px)",
                lineHeight: 0.96,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              Lumière
              <br />
              &amp; <em>sérénité</em>
            </h1>
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.55,
                color: "var(--ink-soft)",
                maxWidth: "52ch",
                marginTop: 36,
              }}
            >
              Succession, départ en résidence, déménagement. Nous orchestrons
              le tri, la valorisation et la transmission de votre patrimoine.
              Vous gardez la main, nous portons le reste.
            </p>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 14,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href={ROUTES.contact} className="btn">
                Demander un diagnostic <Icon name="arrow-right" size={14} />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-ghost">
                <Icon name="phone" size={13} /> {PHONE}
              </a>
            </div>
          </div>

          <div className="photo" style={{ aspectRatio: "3/4", height: "auto" }}>
            <div
              className="img"
              style={{ backgroundImage: `url(${EB_PHOTOS.hero})` }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            paddingTop: 28,
            borderTop: "1px solid var(--line)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {REASSURANCES.map(([t, s]) => (
            <div key={t}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--ink)",
                }}
              >
                <Icon name="check" size={16} />
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t}</span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  color: "var(--ink-mute)",
                  fontSize: 13.5,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
