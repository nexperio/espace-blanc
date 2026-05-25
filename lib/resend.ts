import { Resend } from "resend";
import { env } from "@/lib/env";

let cached: Resend | null = null;

export function getResend() {
  if (cached) return cached;
  cached = new Resend(env.resendApiKey());
  return cached;
}
