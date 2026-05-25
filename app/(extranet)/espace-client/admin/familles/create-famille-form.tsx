"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createFamille } from "../../_actions/familles";
import type { ActionState } from "../../_actions/familles";

export function CreateFamilleForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    createFamille,
    { status: "idle" },
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={formAction}>
      <div className="field">
        <label htmlFor="famille-nom">Nom de la famille</label>
        <input id="famille-nom" name="nom" type="text" required minLength={2} />
      </div>
      <div className="field">
        <label htmlFor="famille-ref">Référence (optionnel)</label>
        <input
          id="famille-ref"
          name="ref"
          type="text"
          placeholder="EB-26-0001"
        />
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          style={{ color: "var(--ember)", fontSize: 13, marginBottom: 10 }}
        >
          {state.message}
        </p>
      )}
      {state.status === "ok" && state.message && (
        <p style={{ color: "var(--laiton)", fontSize: 13, marginBottom: 10 }}>
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
      {pending ? "Création…" : "Créer la famille"}
    </button>
  );
}
