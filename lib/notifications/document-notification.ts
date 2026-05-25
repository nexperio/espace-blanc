import { getResend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import {
  CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/documents";

type Args = {
  projet_id: string;
  category: DocumentCategory;
};

export async function notifyFamilleNewDocument({
  projet_id,
  category,
}: Args): Promise<void> {
  const admin = getSupabaseAdmin();
  const { data: projet, error } = await admin
    .from("projets")
    .select(
      `id, nom,
       famille:familles!inner(
         nom,
         members:famille_members(
           profile:profiles(email, nom)
         )
       )`,
    )
    .eq("id", projet_id)
    .single();

  if (error || !projet) {
    console.error("notifyFamilleNewDocument: projet introuvable", error);
    return;
  }

  const familleObj = Array.isArray(projet.famille)
    ? projet.famille[0]
    : projet.famille;
  type MemberRow = {
    profile:
      | { email: string; nom: string | null }
      | { email: string; nom: string | null }[]
      | null;
  };
  const membersRows = (familleObj?.members ?? []) as unknown as MemberRow[];

  const recipients = membersRows
    .flatMap((m) => {
      if (!m.profile) return [];
      return Array.isArray(m.profile) ? m.profile : [m.profile];
    })
    .map((p) => p.email)
    .filter((e): e is string => Boolean(e));

  if (recipients.length === 0) return;

  const link = `${env.siteUrl()}/espace-client/famille/projets/${projet_id}`;
  const subject = `Nouveau document — ${projet.nom}`;
  const html = renderDocEmail({
    projetNom: projet.nom,
    familleNom: familleObj?.nom ?? "",
    categoryLabel: CATEGORY_LABELS[category],
    link,
  });

  const resend = getResend();
  await Promise.all(
    recipients.map((to) =>
      resend.emails.send({
        from: env.contactFromEmail(),
        to,
        subject,
        html,
      }),
    ),
  );
}

function renderDocEmail({
  projetNom,
  familleNom,
  categoryLabel,
  link,
}: {
  projetNom: string;
  familleNom: string;
  categoryLabel: string;
  link: string;
}): string {
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8" /><title>Nouveau document</title></head>
<body style="margin:0;padding:0;background:#f5f0e5;font-family:'Manrope',-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1c2742;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border:1px solid #ece4d0;border-radius:6px;padding:40px 32px;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a88454;">Espace Blanc · ${escapeHtml(familleNom)}</p>
          <h1 style="margin:0 0 20px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:30px;line-height:1.15;color:#1c2742;">
            Un nouveau document est disponible
          </h1>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:#3a4360;">
            Le document <strong>${escapeHtml(categoryLabel)}</strong> du projet <em>${escapeHtml(projetNom)}</em> vient d'être déposé dans votre espace client.
          </p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.55;color:#3a4360;">
            Vous pouvez le consulter dès maintenant en vous connectant à votre dossier.
          </p>
          <p style="margin:0;">
            <a href="${link}" style="display:inline-block;background:#1c2742;color:#f5f0e5;text-decoration:none;padding:14px 22px;border-radius:4px;font-size:14px;letter-spacing:0.02em;">Ouvrir mon espace</a>
          </p>
          <p style="margin:32px 0 0;font-size:12px;color:#7b8197;line-height:1.6;">
            Vous recevez ce message car vous êtes rattaché à un dossier suivi par Espace Blanc. Si vous pensez recevoir ce message par erreur, répondez simplement à cet e-mail.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
