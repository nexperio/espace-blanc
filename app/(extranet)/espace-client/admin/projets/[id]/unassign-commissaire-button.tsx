"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { unassignCommissaire } from "../../../_actions/projets";
import type { ActionState } from "../../../_actions/familles";

export function UnassignCommissaireButton({
  projet_id,
  profile_id,
}: {
  projet_id: string;
  profile_id: string;
}) {
  const [, formAction] = useActionState<ActionState, FormData>(
    unassignCommissaire,
    { status: "idle" },
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Retirer ce commissaire-priseur du projet ?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="projet_id" value={projet_id} />
      <input type="hidden" name="profile_id" value={profile_id} />
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
      className="btn btn-ghost"
      style={{ fontSize: 12, padding: "6px 12px" }}
    >
      {pending ? "…" : "Retirer"}
    </button>
  );
}
