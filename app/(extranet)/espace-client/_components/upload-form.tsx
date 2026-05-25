"use client";

import { useActionState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { uploadDocument } from "../_actions/documents";
import type { ActionState } from "../_actions/familles";
import type { DocumentCategory } from "@/lib/documents";
import { isVersionedCategory } from "@/lib/documents";

export function UploadForm({
  projet_id,
  category,
  buttonLabel = "Téléverser",
  compact = false,
}: {
  projet_id: string;
  category: DocumentCategory;
  buttonLabel?: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    uploadDocument,
    { status: "idle" },
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") ref.current?.reset();
  }, [state]);

  const versioned = isVersionedCategory(category);

  return (
    <form
      ref={ref}
      action={formAction}
      style={{
        display: "flex",
        flexDirection: compact ? "row" : "column",
        flexWrap: "wrap",
        gap: 10,
        alignItems: compact ? "center" : "stretch",
      }}
    >
      <input type="hidden" name="projet_id" value={projet_id} />
      <input type="hidden" name="category" value={category} />
      <input
        type="file"
        name="file"
        required
        style={{
          padding: 8,
          border: "1px solid var(--line)",
          borderRadius: 4,
          background: "var(--ivory)",
          fontSize: 13,
          flex: compact ? "1 1 200px" : "1 1 auto",
          minWidth: 0,
          maxWidth: "100%",
        }}
      />
      {versioned && (
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13.5,
            color: "var(--ink)",
            background: "var(--lin)",
            padding: "8px 12px",
            borderRadius: 4,
          }}
        >
          <input type="checkbox" name="is_final" />
          Marquer comme version finale
        </label>
      )}
      <SubmitButton label={buttonLabel} />
      {state.status === "error" && (
        <p
          role="alert"
          style={{
            color: "var(--ember)",
            fontSize: 13,
            flex: "1 0 100%",
            margin: 0,
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
            flex: "1 0 100%",
            margin: 0,
          }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn">
      {pending ? "Envoi…" : label}
    </button>
  );
}
