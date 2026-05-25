import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-down"
  | "close"
  | "user"
  | "menu"
  | "plus"
  | "minus"
  | "check"
  | "phone"
  | "mail"
  | "leaf"
  | "shield"
  | "star"
  | "eclipse"
  | "globe"
  | "play";

type IconProps = Omit<SVGProps<SVGSVGElement>, "stroke"> & {
  name: IconName;
  size?: number;
  stroke?: number;
};

export function Icon({ name, size = 16, stroke = 1.6, ...rest }: IconProps) {
  const p: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg {...p}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...p}>
          <path d="M19 12H5M11 5l-7 7 7 7" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 13l7 7 7-7" />
        </svg>
      );
    case "close":
      return (
        <svg {...p}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      );
    case "menu":
      return (
        <svg {...p}>
          <path d="M3 8h18M3 16h18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "minus":
      return (
        <svg {...p}>
          <path d="M5 12h14" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...p}>
          <path d="M11 20A7 7 0 014 13c0-6 8-9 16-9 0 8-3 16-9 16zM2 22s4-1 9-6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "star":
      return (
        <svg {...p}>
          <path d="M12 2l3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9z" />
        </svg>
      );
    case "eclipse":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 000 18" fill="currentColor" />
        </svg>
      );
    case "globe":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
    case "play":
      return (
        <svg {...p}>
          <path d="M6 4l14 8-14 8z" />
        </svg>
      );
    default:
      return null;
  }
}
