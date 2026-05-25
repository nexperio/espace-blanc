"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { assignCommissaire } from "../../../_actions/projets";
import type { ActionState } from "../../../_actions/familles";

export function AssignCommissaireForm({ projet_id }: { projet_id: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    assignCommissaire,
    { status: "idle" },
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") ref.current?.reset();
  }, [state]);

  return (
    <form
      ref={ref}
      action={formAction}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <input type="hidden" name="projet_id" value={projet_id} />
      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor={`comm-email-${projet_id}`}>E-mail du commissaire</label>
        <input
          id={`comm-email-${projet_id}`}
          name="email"
          type="email"
          required
          placeholder="commissaire@etude.fr"
        />
      </div>
      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor={`comm-nom-${projet_id}`}>Nom (optionnel)</label>
        <input
          id={`comm-nom-${projet_id}`}
          name="nom"
          type="text"
          placeholder="Me Martin"
        />
      </div>
      <div style={{ alignSelf: "end" }}>
        <SubmitButton />
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          style={{
            color: "var(--ember)",
            fontSize: 13,
            margin: 0,
            gridColumn: "1 / -1",
          }}
        >
          {state.message}
        </p>
      )}
      {state.status === "ok" && state.message && (
        <p
          style={{
            color: "var(--laiton)",
            fontSize: 13,
            margin: 0,
            gridColumn: "1 / -1",
          }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn">
      {pending ? "Invitation…" : "Inviter & assigner"}
    </button>
  );
}
