import Link from "next/link";
import { LogoMark } from "@/components/marketing/logo-mark";
import { ROUTES, BRAND } from "@/lib/routes";
import { signOut } from "../login/actions";
import type { Role } from "@/lib/auth";

const ROLE_BADGE: Record<Role, string> = {
  admin: "Eugénia",
  famille: "Famille",
  commissaire: "Commissaire-priseur",
};

export function AppHeader({
  user,
}: {
  user: { email: string; role: Role; nom: string | null };
}) {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-4"
      style={{
        padding: "20px clamp(16px, 4vw, 56px)",
        borderBottom: "1px solid var(--line)",
        background: "var(--ivory)",
      }}
    >
      <Link
        href={ROUTES.home}
        style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
      >
        <LogoMark size={36} tone="gold" />
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "-0.005em",
            color: "var(--ink)",
          }}
        >
          {BRAND}
        </span>
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <span
          className="eyebrow"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "var(--laiton)" }}>·</span>
          {ROLE_BADGE[user.role]} · {user.nom ?? user.email}
        </span>
        <form action={signOut}>
          <button type="submit" className="btn btn-ghost">
            Se déconnecter
          </button>
        </form>
      </div>
    </header>
  );
}
