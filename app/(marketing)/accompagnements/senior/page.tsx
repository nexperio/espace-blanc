import type { Metadata } from "next";
import { AccompagnementPage } from "@/components/marketing/accompagnement-page";
import { ACCOMP_CONTENT } from "@/content/accompagnements";

export const metadata: Metadata = {
  title: ACCOMP_CONTENT.senior.meta.title,
  description: ACCOMP_CONTENT.senior.meta.description,
};

export default function SeniorPage() {
  return <AccompagnementPage which="senior" />;
}
