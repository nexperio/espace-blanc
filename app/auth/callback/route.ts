import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

// Échange code Supabase (magic-link, invite, recovery, email) contre une session.
// Le param `type` indique le contexte pour rediriger vers la bonne page.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/espace-client/login?error=callback`,
    );
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      `${origin}/espace-client/login?error=callback`,
    );
  }

  // Priorité au `next` explicite si fourni.
  if (next) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  switch (type) {
    case "invite":
      return NextResponse.redirect(`${origin}/espace-client/bienvenue`);
    case "recovery":
      return NextResponse.redirect(`${origin}/espace-client/reset-password`);
    case "magiclink":
    case "email":
    default:
      return NextResponse.redirect(`${origin}/espace-client`);
  }
}
