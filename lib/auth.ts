import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

export type Role = "admin" | "famille" | "commissaire";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  nom: string | null;
};

type RequireOptions = {
  roles?: Role[];
  redirectTo?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await getSupabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nom, email")
    .eq("id", user.id)
    .single();

  if (!profile) return null;
  return {
    id: user.id,
    email: profile.email ?? user.email ?? "",
    role: profile.role as Role,
    nom: profile.nom,
  };
}

export async function requireUser(
  options: RequireOptions = {},
): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    redirect(options.redirectTo ?? "/espace-client/login");
  }
  if (options.roles && !options.roles.includes(user.role)) {
    redirect("/espace-client");
  }
  return user;
}

export function dashboardPathForRole(role: Role): string {
  switch (role) {
    case "admin":
      return "/espace-client/admin";
    case "commissaire":
      return "/espace-client/commissaire";
    case "famille":
    default:
      return "/espace-client/famille";
  }
}
