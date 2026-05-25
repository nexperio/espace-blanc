"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  sendMagicLink,
  signInWithPassword,
  type LoginState,
  type PasswordLoginState,
} from "./actions";

type Tab = "password" | "magic";

export function LoginForm() {
  const [tab, setTab] = useState<Tab>("password");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Mode de connexion"
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "var(--lin)",
          borderRadius: 6,
          marginBottom: 22,
        }}
      >
        <TabButton
          active={tab === "password"}
          onClick={() => setTab("password")}
        >
          Mot de passe
        </TabButton>
        <TabButton active={tab === "magic"} onClick={() => setTab("magic")}>
          Lien magique
        </TabButton>
      </div>

      {tab === "password" ? <PasswordForm /> : <MagicLinkForm />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 14px",
        background: active ? "var(--ivory)" : "transparent",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontFamily: "var(--font-manrope), sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: active ? "var(--ink)" : "var(--ink-soft)",
        letterSpacing: "0.02em",
        transition: "background 160ms ease",
      }}
    >
      {children}
    </button>
  );
}

function PasswordForm() {
  const [state, formAction] = useActionState<PasswordLoginState, FormData>(
    signInWithPassword,
    { status: "idle" },
  );

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.fr"
        />
      </div>
      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={8}
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
      <SubmitButton label="Se connecter" pendingLabel="Connexion…" />
      <p
        style={{
          textAlign: "center",
          marginTop: 14,
          fontSize: 12.5,
          color: "var(--ink-mute)",
        }}
      >
        <Link
          href="/espace-client/forgot-password"
          style={{ color: "var(--ink-soft)", textDecoration: "underline" }}
        >
          Mot de passe oublié ?
        </Link>
      </p>
    </form>
  );
}

function MagicLinkForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    sendMagicLink,
    { status: "idle" },
  );

  if (state.status === "sent") {
    return (
      <div
        style={{
          padding: "20px 22px",
          background: "var(--lin)",
          borderRadius: 4,
          color: "var(--ink)",
        }}
      >
        <span className="eyebrow">Lien envoyé</span>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 22,
            marginTop: 10,
            lineHeight: 1.3,
            color: "var(--ink)",
          }}
        >
          Vérifiez votre boîte mail.
        </p>
        <p
          style={{
            color: "var(--ink-soft)",
            fontSize: 14,
            marginTop: 8,
            lineHeight: 1.55,
          }}
        >
          Nous avons envoyé un lien de connexion à <strong>{state.email}</strong>.
          Cliquez dessus pour ouvrir votre espace. Le lien expire dans une heure.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="email-magic">Adresse e-mail</label>
        <input
          id="email-magic"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.fr"
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
      <SubmitButton
        label="Recevoir le lien de connexion"
        pendingLabel="Envoi…"
      />
      <p
        style={{
          textAlign: "center",
          marginTop: 14,
          fontSize: 12.5,
          color: "var(--ink-mute)",
          lineHeight: 1.5,
        }}
      >
        Pratique si vous avez oublié votre mot de passe — lien à usage unique.
      </p>
    </form>
  );
}

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn"
      style={{ width: "100%", justifyContent: "center" }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
