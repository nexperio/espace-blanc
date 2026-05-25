type Tone = "gold" | "navy" | "cream";

type Props = {
  size?: number;
  tone?: Tone;
  className?: string;
};

const COLORS: Record<Tone, { bg: string; ink: string; ring: string; shadow: string }> = {
  gold: {
    bg: "var(--gradient-warm)",
    ink: "var(--encre)",
    ring: "var(--cream)",
    shadow: "0 2px 14px -4px rgba(216, 112, 42, 0.55)",
  },
  navy: {
    bg: "var(--encre)",
    ink: "var(--cream)",
    ring: "var(--laiton)",
    shadow: "0 2px 14px -4px rgba(28, 39, 66, 0.55)",
  },
  cream: {
    bg: "var(--cream)",
    ink: "var(--encre)",
    ring: "var(--laiton)",
    shadow: "0 2px 12px -6px rgba(58, 40, 32, 0.4)",
  },
};

// Monogramme Espace Blanc — médaillon italique EB serré, contour intérieur fin.
// Le « gold » utilise le dégradé chaud du site (cohérent avec les emphases
// "une conversation", numéros, etc.) ; il sert de pastille de marque.
export function LogoMark({ size = 44, tone = "gold", className }: Props) {
  const c = COLORS[tone];
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: c.bg,
        color: c.ink,
        flexShrink: 0,
        boxShadow: c.shadow,
      }}
      aria-label="Espace Blanc"
      role="img"
    >
      <span
        style={{
          position: "absolute",
          inset: Math.max(2, size * 0.08),
          borderRadius: "50%",
          border: `1px solid ${c.ring}`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: size * 0.52,
          lineHeight: 1,
          letterSpacing: "-0.08em",
          display: "inline-flex",
          alignItems: "baseline",
          transform: "translateY(3%)",
        }}
      >
        <span style={{ marginRight: "-0.16em" }}>E</span>
        <span>B</span>
      </span>
    </span>
  );
}
