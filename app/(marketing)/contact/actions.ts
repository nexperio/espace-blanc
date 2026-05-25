"use server";

import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getResend } from "@/lib/resend";
import { env } from "@/lib/env";
import { BRAND } from "@/lib/routes";

const SITUATIONS = ["succession", "senior", "demenagement", "autre"] as const;
const DELAIS = ["urgent", "mois", "trimestre", "flou"] as const;

const SITUATION_LABELS: Record<(typeof SITUATIONS)[number], string> = {
  succession: "Une succession à organiser",
  senior: "Un proche part en résidence senior",
  demenagement: "Je déménage et je veux alléger",
  autre: "Une autre situation",
};

const DELAI_LABELS: Record<(typeof DELAIS)[number], string> = {
  urgent: "Dans les deux prochaines semaines",
  mois: "Dans le mois qui vient",
  trimestre: "Sur le prochain trimestre",
  flou: "Pas de date précise",
};

const schema = z.object({
  situation: z.enum(SITUATIONS),
  surface: z.string().max(200).optional().default(""),
  localisation: z.string().max(200).optional().default(""),
  delai: z.enum(DELAIS),
  message: z.string().max(2000).optional().default(""),
  nom: z.string().min(2).max(200),
  email: z.email(),
  tel: z.string().min(6).max(40),
});

export type DiagnosticState =
  | { status: "idle" }
  | { status: "error"; message: string; ref?: undefined }
  | { status: "success"; ref: string; nom: string; tel: string };

export async function submitDiagnostic(
  _prev: DiagnosticState,
  formData: FormData,
): Promise<DiagnosticState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message:
        "Certains champs sont incomplets ou invalides. Vérifiez le récapitulatif et renvoyez.",
    };
  }

  const data = parsed.data;
  const ref = `EB-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 899) + 100,
  )}`;

  try {
    const supabase = getSupabaseAdmin();
    const { error: insertError } = await supabase.from("leads").insert({
      ref,
      situation: data.situation,
      surface: data.surface,
      localisation: data.localisation,
      delai: data.delai,
      message: data.message,
      nom: data.nom,
      email: data.email,
      telephone: data.tel,
      source: "site",
      status: "new",
    });
    if (insertError) {
      console.error("supabase insert leads failed", insertError);
    }

    const resend = getResend();
    const lines = [
      `Référence : ${ref}`,
      `Situation : ${SITUATION_LABELS[data.situation]}`,
      `Surface : ${data.surface || "—"}`,
      `Localisation : ${data.localisation || "—"}`,
      `Délai : ${DELAI_LABELS[data.delai]}`,
      `Nom : ${data.nom}`,
      `Email : ${data.email}`,
      `Téléphone : ${data.tel}`,
      "",
      `Note : ${data.message || "—"}`,
    ];

    await Promise.all([
      resend.emails.send({
        from: env.contactFromEmail(),
        to: [env.contactToEmail()],
        replyTo: data.email,
        subject: `Diagnostic demandé · ${ref} · ${data.nom}`,
        text: lines.join("\n"),
      }),
      resend.emails.send({
        from: env.contactFromEmail(),
        to: [data.email],
        subject: `Votre demande de diagnostic ${BRAND}`,
        text: `Bonjour ${data.nom.split(" ")[0] || data.nom},

Nous avons bien reçu votre demande (référence ${ref}). Une conseillère vous rappellera sous 24h ouvrées au ${data.tel}.

À très vite,
L'équipe ${BRAND}
${env.contactToEmail()}`,
      }),
    ]);

    return { status: "success", ref, nom: data.nom, tel: data.tel };
  } catch (e) {
    console.error("submitDiagnostic failed", e);
    return {
      status: "error",
      message:
        "Envoi impossible pour le moment. Réessayez dans un instant ou appelez-nous directement.",
    };
  }
}
