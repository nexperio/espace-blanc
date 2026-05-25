import Link from "next/link";
import { Icon } from "../icon";
import { ROUTES, PHONE, PHONE_TEL } from "@/lib/routes";

export function FinalCta() {
  return (
    <section
      style={{
        padding: "160px 0",
        background: "var(--encre)",
        color: "var(--on-dark)",
      }}
    >
      <div className="page" style={{ textAlign: "center" }}>
        <span className="chip on-dark">
          Diagnostic gratuit, 24h, sans engagement
        </span>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: "clamp(56px, 8vw, 140px)",
            lineHeight: 0.98,
            letterSpacing: "-0.015em",
            marginTop: 32,
            color: "var(--on-dark)",
          }}
        >
          Le passage commence
          <br />
          par <em style={{ color: "var(--amber)" }}>une conversation</em>
        </h2>
        <p
          style={{
            fontSize: 19,
            color: "var(--on-dark-mute)",
            maxWidth: "58ch",
            margin: "32px auto 0",
            lineHeight: 1.6,
          }}
        >
          Nous nous déplaçons, nous écoutons, nous vous écrivons. Vous décidez
          à tête reposée.
        </p>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href={ROUTES.contact} className="btn btn-ivory">
            Demander un diagnostic <Icon name="arrow-right" size={14} />
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-outline-light">
            <Icon name="phone" size={13} /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
