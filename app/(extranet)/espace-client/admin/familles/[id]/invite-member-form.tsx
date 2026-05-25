"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { inviteFamilyMember } from "../../../_actions/familles";
import type { ActionState } from "../../../_actions/familles";

export function InviteMemberForm({ famille_id }: { famille_id: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    inviteFamilyMember,
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
        <label htmlFor={`invite-email-${famille_id}`}>
          Inviter un membre par e-mail
        </label>
        <input
          id={`invite-email-${famille_id}`}
          name="email"
          type="email"
          required
          placeholder="parent@exemple.fr"
        />
      </div>
      <div className="field">
        <label htmlFor={`invite-nom-${famille_id}`}>Nom (optionnel)</label>
        <input
          id={`invite-nom-${famille_id}`}
          name="nom"
          type="text"
          placeholder="Marie Dupont"
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
      {pending ? "Envoi…" : "Envoyer l'invitation"}
    </button>
  );
}
