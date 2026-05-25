"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  sendPasswordReset,
  type ForgotPasswordState,
} from "../login/actions";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<ForgotPasswordState, FormData>(
    sendPasswordReset,
    { status: "idle" },
  );

  if (state.status === "sent") {
    return (
      <div
        style={{
          padding: "20px 22px",
          background: "var(--lin)",
          borderRadius: 4,
          color: "var(--ink)",
        }}
      >
        <span className="eyebrow">E-mail envoyé</span>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 22,
            marginTop: 10,
            lineHeight: 1.3,
          }}
        >
          Vérifiez votre boîte mail.
        </p>
        <p
          style={{
            color: "var(--ink-soft)",
            fontSize: 14,
            marginTop: 8,
            lineHeight: 1.55,
          }}
        >
          Si <strong>{state.email}</strong> correspond à un compte, vous recevrez
          un lien pour définir un nouveau mot de passe. Il expire dans une heure.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.fr"
        />
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          style={{ color: "var(--ember)", fontSize: 13, marginBottom: 14 }}
        >
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn"
      style={{ width: "100%", justifyContent: "center" }}
    >
      {pending ? "Envoi…" : "Envoyer le lien"}
    </button>
  );
}
