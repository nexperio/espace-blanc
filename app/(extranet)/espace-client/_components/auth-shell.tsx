import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/marketing/logo-mark";
import { ROUTES, BRAND } from "@/lib/routes";

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(48px, 8vw, 80px) clamp(12px, 4vw, 24px)",
        background: "var(--ivory)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--ivory)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: "clamp(22px, 5vw, 40px)",
        }}
      >
        <Link
          href={ROUTES.home}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <LogoMark size={40} tone="gold" />
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 26,
              letterSpacing: "-0.005em",
              color: "var(--ink)",
            }}
          >
            {BRAND}
          </span>
        </Link>
        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 38,
              letterSpacing: "-0.005em",
              lineHeight: 1.05,
              marginTop: 10,
              color: "var(--ink)",
            }}
          >
            {title}
          </h1>
          {intro && (
            <p
              style={{
                color: "var(--ink-soft)",
                marginTop: 14,
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              {intro}
            </p>
          )}
        </div>
        {children}
        {footer && (
          <p
            style={{
              textAlign: "center",
              marginTop: 28,
              fontSize: 13,
              color: "var(--ink-soft)",
            }}
          >
            {footer}
          </p>
        )}
      </div>
    </main>
  );
}
