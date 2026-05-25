import type { Metadata } from "next";
import { AccompagnementPage } from "@/components/marketing/accompagnement-page";
import { ACCOMP_CONTENT } from "@/content/accompagnements";

export const metadata: Metadata = {
  title: ACCOMP_CONTENT.succession.meta.title,
  description: ACCOMP_CONTENT.succession.meta.description,
};

export default function SuccessionPage() {
  return <AccompagnementPage which="succession" />;
}
