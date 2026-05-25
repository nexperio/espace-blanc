"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./icon";
import { MegaMenu } from "./mega-menu";
import { ROUTES, BRAND, MONOGRAM } from "@/lib/routes";

const NAV_ITEMS: Array<{ href: string; label: string; hide?: string }> = [
  { href: ROUTES.methode, label: "La méthode", hide: "nav-hide-md" },
  { href: ROUTES.temoignages, label: "Témoignages", hide: "nav-hide-md" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({
    href,
    label,
    hide = "",
  }: {
    href: string;
    label: string;
    hide?: string;
  }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`nav-link ${active ? "active" : ""} ${hide}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: scrolled
            ? "rgba(245, 240, 229, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--line)"
            : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease",
          color: "var(--ink)",
        }}
      >
        <div
          className="page"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "18px 56px",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <button
              onClick={() => setMegaOpen(true)}
              className="nav-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Icon name="menu" size={16} /> Accompagnements
            </button>
            {NAV_ITEMS.map((it) => (
              <NavLink key={it.href} {...it} />
            ))}
          </div>

          <Link
            href={ROUTES.home}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: 26,
                letterSpacing: "-0.005em",
              }}
            >
              {BRAND}
            </span>
            <span
              className="monogram"
              style={{ width: 30, height: 30, fontSize: 12 }}
            >
              {MONOGRAM}
            </span>
          </Link>

          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <NavLink href={ROUTES.concept} label="Le concept" hide="nav-hide-md" />
            <Link
              href={ROUTES.espaceClient}
              className="nav-link nav-hide-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="user" size={13} /> Espace client
            </Link>
            <Link
              href={ROUTES.contact}
              className="btn"
              style={{ padding: "11px 18px" }}
            >
              Diagnostic gratuit <Icon name="arrow-right" size={13} />
            </Link>
          </div>
        </div>
      </header>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
    </>
  );
}
