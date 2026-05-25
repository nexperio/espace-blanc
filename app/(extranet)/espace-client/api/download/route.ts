import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer, getSupabaseAdmin } from "@/lib/supabase/server";

const BUCKET = "projet-files";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return new NextResponse("Missing path", { status: 400 });
  }

  // 1) Vérifie via l'utilisateur (RLS documents) qu'il a accès à ce fichier.
  const supabase = await getSupabaseServer();
  const { data: doc, error: docErr } = await supabase
    .from("documents")
    .select("id")
    .eq("storage_path", path)
    .maybeSingle();

  if (docErr || !doc) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2) Génère une URL signée courte durée via service role.
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 60); // 60 s, on redirige immédiatement

  if (error || !data?.signedUrl) {
    return new NextResponse("Signed URL failed", { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
