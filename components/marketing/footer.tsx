import Link from "next/link";
import { Icon } from "./icon";
import { LogoMark } from "./logo-mark";
import { ROUTES, PHONE, PHONE_TEL, EMAIL, BRAND } from "@/lib/routes";

type ColItem = readonly [label: string, href: string];

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly ColItem[];
}) {
  return (
    <div>
      <span className="eyebrow on-dark">{title}</span>
      <ul
        style={{
          listStyle: "none",
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          color: "var(--on-dark-mute)",
        }}
      >
        {items.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              style={{
                textAlign: "left",
                fontSize: 15,
                transition: "color .2s ease",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const NAVIGATE: readonly ColItem[] = [
  ["Le concept", ROUTES.concept],
  ["La méthode", ROUTES.methode],
  ["Témoignages", ROUTES.temoignages],
  ["Contact", ROUTES.contact],
] as const;

const ACCOMP: readonly ColItem[] = [
  ["Succession", ROUTES.succession],
  ["Sénior en résidence", ROUTES.senior],
  ["Déménagement", ROUTES.demenagement],
  ["Autre situation", ROUTES.contact],
] as const;

export function Footer() {
  return (
    <footer className="footer-dark">
      <div className="page">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 64,
            marginBottom: 72,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <LogoMark size={48} tone="gold" />
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.005em",
                }}
              >
                {BRAND}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(34px, 3.6vw, 52px)",
                lineHeight: 1.05,
                maxWidth: "18ch",
                color: "var(--on-dark)",
              }}
            >
              Lumière, <em>sérénité</em>,
              <br />
              le passage en de bonnes mains.
            </h3>
            <Link
              href={ROUTES.contact}
              className="btn btn-ivory"
              style={{ marginTop: 32 }}
            >
              Diagnostic gratuit <Icon name="arrow-right" size={13} />
            </Link>
          </div>

          <FooterCol title="Naviguer" items={NAVIGATE} />
          <FooterCol title="Accompagnements" items={ACCOMP} />

          <div>
            <span className="eyebrow on-dark">Joindre {BRAND}</span>
            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                color: "var(--on-dark-mute)",
                fontSize: 15,
              }}
            >
              <a
                href={`tel:${PHONE_TEL}`}
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Icon name="phone" size={14} /> {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Icon name="mail" size={14} /> {EMAIL}
              </a>
              <span
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Icon name="globe" size={14} /> Île-de-France
              </span>
              <span style={{ fontSize: 13.5, opacity: 0.7 }}>
                Lundi → samedi, 9h–19h
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--line-on-dark)",
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            color: "var(--on-dark-mute)",
            fontSize: 13,
          }}
        >
          <span className="eyebrow on-dark">
            © {BRAND} · {new Date().getFullYear()}
          </span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
