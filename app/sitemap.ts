import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://espace-blanc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "",
    "/concept",
    "/methode",
    "/temoignages",
    "/contact",
    "/accompagnements/succession",
    "/accompagnements/senior",
    "/accompagnements/demenagement",
  ];
  return pages.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
}
