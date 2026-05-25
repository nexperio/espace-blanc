import type { ReactNode } from "react";

type Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
};

export function SectionHeading({ eyebrow, title, aside, dark }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: 32,
        alignItems: "baseline",
      }}
    >
      <span className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</span>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(36px, 4.5vw, 64px)",
          lineHeight: 1.05,
          letterSpacing: "-0.005em",
          color: dark ? "var(--on-dark)" : "var(--ink)",
        }}
      >
        {title}
      </h2>
      <span
        style={{
          fontSize: 14,
          color: dark ? "var(--on-dark-mute)" : "var(--ink-mute)",
          textAlign: "right",
          lineHeight: 1.5,
        }}
      >
        {aside}
      </span>
    </div>
  );
}
