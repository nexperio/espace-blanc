import { Hero } from "@/components/marketing/home/hero";
import { ThreeDoors } from "@/components/marketing/home/three-doors";
import { Manifesto } from "@/components/marketing/home/manifesto";
import { Method } from "@/components/marketing/home/method";
import { Metrics } from "@/components/marketing/home/metrics";
import { Testimonials } from "@/components/marketing/home/testimonials";
import { Pillars } from "@/components/marketing/home/pillars";
import { Eco } from "@/components/marketing/home/eco";
import { FaqShort } from "@/components/marketing/home/faq-short";
import { FinalCta } from "@/components/marketing/home/final-cta";
import { EMAIL, PHONE_TEL, BRAND } from "@/lib/routes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://espace-blanc.com";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND,
  url: SITE_URL,
  email: EMAIL,
  telephone: PHONE_TEL,
  description:
    "Espace Blanc accompagne les familles dans le tri, la valorisation et la transmission de patrimoine lors d'une succession, d'un départ en résidence senior ou d'un déménagement.",
  areaServed: { "@type": "AdministrativeArea", name: "Île-de-France" },
  priceRange: "€€",
  openingHours: "Mo-Sa 09:00-19:00",
};

export default function HomePage() {
  return (
    <div className="view">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <Hero />
      <ThreeDoors />
      <Manifesto />
      <Method />
      <Metrics />
      <Testimonials />
      <Pillars />
      <Eco />
      <FaqShort />
      <FinalCta />
    </div>
  );
}
