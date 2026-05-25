"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "./icon";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

type Door = {
  href: string;
  no: string;
  t: string;
  hook: string;
  img: string;
};

const DOORS: Door[] = [
  {
    href: ROUTES.succession,
    no: "01",
    t: "Succession",
    hook: "Trier sans se trahir.",
    img: EB_PHOTOS.succession,
  },
  {
    href: ROUTES.senior,
    no: "02",
    t: "Sénior",
    hook: "Honorer ce qui reste.",
    img: EB_PHOTOS.senior,
  },
  {
    href: ROUTES.demenagement,
    no: "03",
    t: "Déménagement",
    hook: "En un tour de main.",
    img: EB_PHOTOS.demenagement,
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MegaMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`mega ${open ? "open" : ""}`}>
      <div style={{ padding: "32px 0" }}>
        <div
          className="page"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="eyebrow">Choisir une porte d&apos;entrée</span>
          <button
            onClick={onClose}
            className="nav-link"
            style={{ display: "inline-flex", gap: 10, alignItems: "center" }}
          >
            Fermer <Icon name="close" size={16} />
          </button>
        </div>
      </div>

      <div
        className="page"
        style={{
          padding: "32px 56px 80px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: "clamp(48px, 6vw, 92px)",
            lineHeight: 1.02,
            color: "var(--ink)",
            maxWidth: "14ch",
            marginBottom: 56,
          }}
        >
          Trois portes,
          <br />
          <em>une seule main</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {DOORS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              onClick={onClose}
              style={{
                textAlign: "left",
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                aspectRatio: "4/5",
                background: "var(--lin)",
                display: "block",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${d.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform .8s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(27, 26, 20, 0.78) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "var(--on-dark)",
                }}
              >
                <div className="chip on-dark" style={{ alignSelf: "flex-start" }}>
                  Accompagnement {d.no}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 48,
                      lineHeight: 1.05,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {d.t}
                  </h3>
                  <p
                    style={{
                      marginTop: 8,
                      color: "var(--on-dark-mute)",
                      fontSize: 16,
                    }}
                  >
                    {d.hook}
                  </p>
                  <span
                    className="btn-link"
                    style={{
                      marginTop: 18,
                      color: "var(--on-dark)",
                    }}
                  >
                    Lire l&apos;accompagnement <Icon name="arrow-right" size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            color: "var(--ink-soft)",
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <Link
              href={ROUTES.methode}
              onClick={onClose}
              className="nav-link"
            >
              La méthode complète
            </Link>
            <Link
              href={ROUTES.temoignages}
              onClick={onClose}
              className="nav-link"
            >
              Témoignages
            </Link>
            <Link
              href={ROUTES.concept}
              onClick={onClose}
              className="nav-link"
            >
              Le concept
            </Link>
            <Link
              href={ROUTES.contact}
              onClick={onClose}
              className="nav-link"
            >
              Contact
            </Link>
          </div>
          <Link href={ROUTES.contact} onClick={onClose} className="btn">
            Diagnostic gratuit <Icon name="arrow-right" size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
