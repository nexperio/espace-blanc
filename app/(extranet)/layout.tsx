import type { ReactNode } from "react";

export default function ExtranetLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", color: "var(--ink)" }}>
      {children}
    </div>
  );
}
