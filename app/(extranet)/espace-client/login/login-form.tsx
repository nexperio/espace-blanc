"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMagicLink, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    sendMagicLink,
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
        <span className="eyebrow">Lien envoyé</span>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 22,
            marginTop: 10,
            lineHeight: 1.3,
            color: "var(--ink)",
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
          Nous avons envoyé un lien de connexion à <strong>{state.email}</strong>.
          Cliquez dessus pour ouvrir votre dossier. Le lien expire dans une
          heure.
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
          placeholder="vous@exemple.fr"
        />
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          style={{
            color: "var(--laiton)",
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          {state.message}
        </p>
      )}
      <SubmitButton />
      <p
        style={{
          textAlign: "center",
          marginTop: 14,
          fontSize: 12.5,
          color: "var(--ink-mute)",
          lineHeight: 1.5,
        }}
      >
        Pas de mot de passe : nous vous envoyons un lien à usage unique.
      </p>
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
      {pending ? "Envoi…" : "Recevoir le lien de connexion"}
    </button>
  );
}
