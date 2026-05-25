"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { removeFamilyMember } from "../../../_actions/familles";
import type { ActionState } from "../../../_actions/familles";

export function RemoveMemberButton({
  famille_id,
  profile_id,
}: {
  famille_id: string;
  profile_id: string;
}) {
  const [, formAction] = useActionState<ActionState, FormData>(
    removeFamilyMember,
    { status: "idle" },
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Retirer ce membre de la famille ?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="famille_id" value={famille_id} />
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
