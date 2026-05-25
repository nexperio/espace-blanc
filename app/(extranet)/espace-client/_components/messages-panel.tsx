"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { postMessage } from "../_actions/messages";
import type { ActionState } from "../_actions/familles";

export type MessageItem = {
  id: string;
  body: string;
  created_at: string;
  author: { nom: string | null; email: string; role: string } | null;
  isMine: boolean;
};

export function MessagesPanel({
  projet_id,
  messages,
  canPost,
}: {
  projet_id: string;
  messages: MessageItem[];
  canPost: boolean;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    postMessage,
    { status: "idle" },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section
      style={{
        border: "1px solid var(--line)",
        borderRadius: 6,
        background: "var(--ivory)",
        padding: "clamp(20px, 4vw, 32px)",
      }}
    >
      <header style={{ marginBottom: 18 }}>
        <span className="eyebrow">Messagerie</span>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: "clamp(24px, 3vw, 30px)",
            letterSpacing: "-0.005em",
            marginTop: 6,
            color: "var(--ink)",
          }}
        >
          Échanges du projet
        </h2>
      </header>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.length === 0 && (
          <li style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            Aucun message pour l&apos;instant.
          </li>
        )}
        {messages.map((m) => (
          <li
            key={m.id}
            style={{
              padding: "14px 16px",
              background: m.isMine ? "var(--lin)" : "var(--cream, #fbf8f1)",
              border: "1px solid var(--line)",
              borderRadius: 6,
            }}
          >
            <div
              className="flex flex-wrap items-baseline gap-2"
              style={{ marginBottom: 6 }}
            >
              <strong style={{ fontSize: 14, color: "var(--ink)" }}>
                {m.author?.nom ?? m.author?.email ?? "—"}
              </strong>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {m.author?.role === "admin" ? "Espace Blanc" : "Famille"} ·{" "}
                {formatDate(m.created_at)}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--ink)",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.body}
            </p>
          </li>
        ))}
      </ul>

      {canPost && (
        <form
          ref={formRef}
          action={formAction}
          style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input type="hidden" name="projet_id" value={projet_id} />
          <label
            htmlFor="message-body"
            className="eyebrow"
            style={{ display: "block" }}
          >
            Écrire un message
          </label>
          <textarea
            id="message-body"
            name="body"
            required
            minLength={1}
            maxLength={8000}
            rows={3}
            placeholder="Votre message…"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid var(--line)",
              borderRadius: 4,
              background: "var(--ivory)",
              color: "var(--ink)",
              fontFamily: "inherit",
              fontSize: 14.5,
              lineHeight: 1.5,
              resize: "vertical",
            }}
          />
          {state.status === "error" && (
            <p role="alert" style={{ color: "var(--ember)", fontSize: 13 }}>
              {state.message}
            </p>
          )}
          <SubmitButton />
        </form>
      )}
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn"
      style={{ alignSelf: "flex-start" }}
    >
      {pending ? "Envoi…" : "Envoyer"}
    </button>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
