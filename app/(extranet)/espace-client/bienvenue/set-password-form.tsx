"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { setPassword, type SetPasswordState } from "./actions";

export function SetPasswordForm() {
  const [state, formAction] = useActionState<SetPasswordState, FormData>(
    setPassword,
    { status: "idle" },
  );

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="password">Nouveau mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirmation</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
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
      {pending ? "Enregistrement…" : "Enregistrer mon mot de passe"}
    </button>
  );
}
