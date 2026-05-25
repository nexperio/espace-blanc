"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createProjet } from "../../../_actions/projets";
import type { ActionState } from "../../../_actions/familles";

export function CreateProjetForm({ famille_id }: { famille_id: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    createProjet,
    { status: "idle" },
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={formAction}>
      <input type="hidden" name="famille_id" value={famille_id} />
      <div className="field">
        <label htmlFor={`projet-nom-${famille_id}`}>
          Nouveau projet
        </label>
        <input
          id={`projet-nom-${famille_id}`}
          name="nom"
          type="text"
          required
          minLength={2}
          placeholder="Appartement Mme Dupont"
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
      {pending ? "Création…" : "Créer le projet"}
    </button>
  );
}
