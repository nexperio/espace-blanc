"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { markDocumentFinal, deleteDocument } from "../../../_actions/documents";
import { DownloadLink } from "../../../_components/download-link";
import type { ActionState } from "../../../_actions/familles";

export function DocumentRow({
  doc,
  showMarkFinal,
}: {
  doc: {
    id: string;
    filename: string;
    size_bytes: number | null;
    created_at: string;
    storage_path: string;
    uploader: { nom: string | null; email: string } | null;
  };
  showMarkFinal: boolean;
}) {
  return (
    <li
      className="flex flex-wrap items-center justify-between gap-3"
      style={{
        padding: "10px 14px",
        background: "var(--cream, #fbf8f1)",
        border: "1px solid var(--line)",
        borderRadius: 4,
      }}
    >
      <div style={{ minWidth: 0, flex: "1 1 200px" }}>
        <div
          style={{
            fontSize: 14,
            color: "var(--ink)",
            wordBreak: "break-word",
          }}
        >
          {doc.filename}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "var(--ink-mute)",
            marginTop: 2,
          }}
        >
          {formatBytes(doc.size_bytes)} ·{" "}
          {new Date(doc.created_at).toLocaleDateString("fr-FR")}{" "}
          {doc.uploader?.nom && `· ${doc.uploader.nom}`}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <DownloadLink path={doc.storage_path} compact />
        {showMarkFinal && <MarkFinalButton document_id={doc.id} />}
        <DeleteButton document_id={doc.id} />
      </div>
    </li>
  );
}

function MarkFinalButton({ document_id }: { document_id: string }) {
  const [, formAction] = useActionState<ActionState, FormData>(
    markDocumentFinal,
    { status: "idle" },
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="document_id" value={document_id} />
      <SubmitTiny label="Marquer comme finale" pending="…" />
    </form>
  );
}

function DeleteButton({ document_id }: { document_id: string }) {
  const [, formAction] = useActionState<ActionState, FormData>(
    deleteDocument,
    { status: "idle" },
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Supprimer ce document ?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="document_id" value={document_id} />
      <SubmitTiny label="Supprimer" pending="…" />
    </form>
  );
}

function SubmitTiny({ label, pending: pLabel }: { label: string; pending: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-ghost"
      style={{ fontSize: 11.5, padding: "5px 10px" }}
    >
      {pending ? pLabel : label}
    </button>
  );
}

function formatBytes(b: number | null): string {
  if (!b) return "—";
  if (b < 1024) return `${b} o`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} Ko`;
  return `${(b / 1024 / 1024).toFixed(1)} Mo`;
}
