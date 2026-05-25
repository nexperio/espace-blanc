import Link from "next/link";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

const DOORS = [
  {
    href: ROUTES.succession,
    no: "01",
    t: "Succession",
    lede: "Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
    img: EB_PHOTOS.succession,
  },
  {
    href: ROUTES.senior,
    no: "02",
    t: "Sénior",
    lede: "Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
    img: EB_PHOTOS.senior,
  },
  {
    href: ROUTES.demenagement,
    no: "03",
    t: "Déménagement",
    lede: "Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
    img: EB_PHOTOS.demenagement,
  },
] as const;

export function ThreeDoors() {
  return (
    <section style={{ padding: "120px 0", background: "var(--lin)" }}>
      <div className="page">
        <SectionHeading
          eyebrow="Trois portes d'entrée"
          title={
            <>
              Trois récits, <em>une seule main</em>
            </>
          }
          aside="Une méthode unique, déclinée selon votre situation."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            marginTop: 64,
          }}
        >
          {DOORS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <div className="photo" style={{ aspectRatio: "4/5" }}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${d.img})` }}
                />
              </div>
              <div>
                <span
                  className="eyebrow"
                  style={{ display: "block", marginBottom: 10 }}
                >
                  Accompagnement {d.no}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: "clamp(32px, 3.2vw, 42px)",
                    letterSpacing: "-0.005em",
                    lineHeight: 1.05,
                    marginBottom: 14,
                    color: "var(--ink)",
                  }}
                >
                  {d.t}
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 16.5,
                    lineHeight: 1.5,
                  }}
                >
                  {d.lede}
                </p>
                <div
                  style={{
                    marginTop: 18,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--laiton)",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Découvrir l&apos;accompagnement{" "}
                  <Icon name="arrow-right" size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
