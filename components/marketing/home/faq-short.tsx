"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";
import { FAQ_HOME } from "@/content/faq";

export function FaqShort() {
  const [open, setOpen] = useState(0);

  return (
    <section
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(16px, 4vw, 56px)",
        background: "var(--ivory)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="Questions reçues"
          title={
            <>
              Cinq <em>réponses</em>
            </>
          }
          aside={
            <Link href="/faq" style={{ borderBottom: "1px solid currentColor" }}>
              Voir toutes les questions →
            </Link>
          }
        />
        <div style={{ marginTop: 56, borderTop: "1px solid var(--sable)" }}>
          {FAQ_HOME.map((it, i) => (
            <div
              key={it.q}
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex flex-wrap items-baseline justify-between gap-4"
                style={{
                  width: "100%",
                  padding: "clamp(20px, 3vw, 28px) 0",
                  textAlign: "left",
                }}
              >
                <span
                  className="flex flex-wrap items-baseline gap-4 sm:gap-7"
                  style={{ flex: "1 1 auto", minWidth: 0 }}
                >
                  <span className="eyebrow" style={{ minWidth: 30 }}>
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 2.4vw, 30px)",
                      letterSpacing: "-0.005em",
                      lineHeight: 1.25,
                      color: "var(--ink)",
                    }}
                  >
                    {it.q}
                  </span>
                </span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: open === i ? "var(--ink)" : "transparent",
                    color: open === i ? "var(--on-dark)" : "var(--ink)",
                    border: `1px solid ${
                      open === i ? "var(--ink)" : "var(--line-strong)"
                    }`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .25s ease",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={open === i ? "minus" : "plus"} size={16} />
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    paddingLeft: "clamp(0px, 4vw, 58px)",
                    paddingBottom: "clamp(20px, 3vw, 28px)",
                    paddingRight: "clamp(0px, 2vw, 60px)",
                    maxWidth: "72ch",
                  }}
                >
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "clamp(15px, 1.6vw, 16.5px)",
                      lineHeight: 1.6,
                    }}
                  >
                    {it.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
