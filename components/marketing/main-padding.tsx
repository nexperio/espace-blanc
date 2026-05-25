"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ROUTES } from "@/lib/routes";

export function MainPadding({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;
  return <main style={{ paddingTop: isHome ? 0 : 80 }}>{children}</main>;
}
