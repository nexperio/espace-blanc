import type { Metadata } from "next";
import { AccompagnementPage } from "@/components/marketing/accompagnement-page";
import { ACCOMP_CONTENT } from "@/content/accompagnements";

export const metadata: Metadata = {
  title: ACCOMP_CONTENT.demenagement.meta.title,
  description: ACCOMP_CONTENT.demenagement.meta.description,
};

export default function DemenagementPage() {
  return <AccompagnementPage which="demenagement" />;
}
