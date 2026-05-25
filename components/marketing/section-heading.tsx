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
      className="grid gap-6 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8 lg:items-baseline"
    >
      <span className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</span>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(32px, 4.5vw, 64px)",
          lineHeight: 1.05,
          letterSpacing: "-0.005em",
          color: dark ? "var(--on-dark)" : "var(--ink)",
        }}
      >
        {title}
      </h2>
      <span
        className="lg:text-right"
        style={{
          fontSize: 14,
          color: dark ? "var(--on-dark-mute)" : "var(--ink-mute)",
          lineHeight: 1.5,
        }}
      >
        {aside}
      </span>
    </div>
  );
}
