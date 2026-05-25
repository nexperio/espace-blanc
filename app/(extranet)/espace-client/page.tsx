import { redirect } from "next/navigation";
import { dashboardPathForRole, getSessionUser } from "@/lib/auth";

export default async function EspaceClientIndex() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/espace-client/login");
  }
  redirect(dashboardPathForRole(user.role));
}
