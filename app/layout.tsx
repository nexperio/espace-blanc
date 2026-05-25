import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://espace-blanc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Espace Blanc — Lumière & sérénité",
    template: "%s · Espace Blanc",
  },
  description:
    "Succession, départ en résidence, déménagement. Espace Blanc orchestre le tri, la valorisation et la transmission de votre patrimoine. Île-de-France.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Espace Blanc",
    title: "Espace Blanc — Lumière & sérénité",
    description:
      "Succession, départ en résidence, déménagement. Nous orchestrons le tri, la valorisation et la transmission de votre patrimoine.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
