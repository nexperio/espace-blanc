"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icon";
import { LogoMark } from "./logo-mark";
import { MegaMenu } from "./mega-menu";
import { ROUTES, BRAND } from "@/lib/routes";

const NAV_ITEMS: Array<{ href: string; label: string; hide?: string }> = [
  { href: ROUTES.methode, label: "La méthode", hide: "nav-hide-md" },
  { href: ROUTES.temoignages, label: "Témoignages", hide: "nav-hide-md" },
];

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);

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
        className={`nav-link nav-link-dark ${active ? "active" : ""} ${hide}`}
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
          background: "var(--encre)",
          borderBottom: "1px solid var(--line-on-dark)",
          color: "var(--on-dark)",
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
              className="nav-link nav-link-dark"
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
              gap: 14,
              padding: "0 16px",
              color: "var(--on-dark)",
            }}
          >
            <LogoMark size={40} tone="gold" />
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: "-0.005em",
              }}
            >
              {BRAND}
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
              className="nav-link nav-link-dark nav-hide-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="user" size={13} /> Espace client
            </Link>
            <Link
              href={ROUTES.contact}
              className="btn btn-ivory"
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
