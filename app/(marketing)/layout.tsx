import type { ReactNode } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { MainPadding } from "@/components/marketing/main-padding";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <MainPadding>{children}</MainPadding>
      <Footer />
    </>
  );
}
