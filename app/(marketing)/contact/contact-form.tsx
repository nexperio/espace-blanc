"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/marketing/icon";
import { submitDiagnostic, type DiagnosticState } from "./actions";

const STEPS = ["Situation", "Logement", "Délai", "Vous", "Récapitulatif"] as const;

type Form = {
  situation: string;
  surface: string;
  localisation: string;
  delai: string;
  message: string;
  nom: string;
  email: string;
  tel: string;
};

const EMPTY: Form = {
  situation: "",
  surface: "",
  localisation: "",
  delai: "",
  message: "",
  nom: "",
  email: "",
  tel: "",
};

const emph = (s: string) => <em>{s}</em>;

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Form>(EMPTY);
  const [state, formAction] = useActionState<DiagnosticState, FormData>(
    submitDiagnostic,
    { status: "idle" },
  );

  if (state.status === "success") {
    return <SuccessPanel nom={state.nom} tel={state.tel} reference={state.ref} />;
  }

  const set =
    <K extends keyof Form>(k: K) =>
    (v: string) =>
      setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <div className="progress">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={i < step ? "done" : i === step ? "current" : ""}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span className="eyebrow">
          Étape {step + 1}/{STEPS.length} · {STEPS[step]}
        </span>
        <span className="eyebrow">
          Aucune donnée enregistrée tant que vous n&apos;envoyez pas
        </span>
      </div>

      <form action={formAction}>
        <input type="hidden" name="situation" value={data.situation} />
        <input type="hidden" name="surface" value={data.surface} />
        <input type="hidden" name="localisation" value={data.localisation} />
        <input type="hidden" name="delai" value={data.delai} />
        <input type="hidden" name="message" value={data.message} />
        <input type="hidden" name="nom" value={data.nom} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="tel" value={data.tel} />

        {step === 0 && (
          <Step title={<>Quelle est votre {emph("situation ?")}</>}>
            <Radios
              value={data.situation}
              onChange={set("situation")}
              options={[
                { v: "succession", l: "Une succession à organiser" },
                { v: "senior", l: "Un proche part en résidence senior" },
                { v: "demenagement", l: "Je déménage et je veux alléger" },
                { v: "autre", l: "Une autre situation, je vous explique" },
              ]}
            />
          </Step>
        )}

        {step === 1 && (
          <Step title={<>Le logement {emph("à traiter")}</>}>
            <div className="field">
              <label>Surface approximative</label>
              <select
                value={data.surface}
                onChange={(e) => set("surface")(e.target.value)}
              >
                <option value="">— Choisir —</option>
                <option>Moins de 40 m²</option>
                <option>40 à 70 m²</option>
                <option>70 à 100 m²</option>
                <option>100 à 150 m²</option>
                <option>Plus de 150 m²</option>
              </select>
            </div>
            <div className="field">
              <label>Localisation (ville ou arrondissement)</label>
              <input
                value={data.localisation}
                onChange={(e) => set("localisation")(e.target.value)}
                placeholder="Ex. Paris 14ᵉ, Versailles…"
              />
            </div>
            <div className="field">
              <label>Quelque chose à savoir ?</label>
              <textarea
                rows={3}
                value={data.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder="Étage sans ascenseur, accès, contraintes émotionnelles…"
              />
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title={<>Votre {emph("échéance")}</>}>
            <Radios
              value={data.delai}
              onChange={set("delai")}
              options={[
                { v: "urgent", l: "Dans les deux prochaines semaines" },
                { v: "mois", l: "Dans le mois qui vient" },
                { v: "trimestre", l: "Sur le prochain trimestre" },
                { v: "flou", l: "Je n'ai pas encore de date précise" },
              ]}
            />
          </Step>
        )}

        {step === 3 && (
          <Step title={<>Comment {emph("vous joindre ?")}</>}>
            <div className="field">
              <label>Nom et prénom</label>
              <input
                value={data.nom}
                onChange={(e) => set("nom")(e.target.value)}
                placeholder="Sophie Lefèvre"
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <div className="field">
                <label>Adresse e-mail</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="vous@exemple.fr"
                />
              </div>
              <div className="field">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={data.tel}
                  onChange={(e) => set("tel")(e.target.value)}
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title={<>Tout est {emph("noté")}</>}>
            <Recap data={data} />
            <p
              style={{
                color: "var(--ink-soft)",
                fontSize: 14,
                marginTop: 24,
              }}
            >
              En envoyant, vous acceptez que nous vous rappelions sous 24h.
              Aucune autre donnée ne sera collectée.
            </p>
          </Step>
        )}

        {state.status === "error" && (
          <p
            role="alert"
            style={{
              color: "var(--ember)",
              fontSize: 14,
              marginTop: 16,
            }}
          >
            {state.message}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 48,
            gap: 16,
          }}
        >
          <button
            type="button"
            onClick={prev}
            className="btn btn-ghost"
            style={{
              opacity: step === 0 ? 0.3 : 1,
              pointerEvents: step === 0 ? "none" : "auto",
            }}
          >
            <Icon name="arrow-left" size={13} /> Retour
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn">
              Continuer <Icon name="arrow-right" size={13} />
            </button>
          ) : (
            <SubmitButton />
          )}
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn">
      {pending ? "Envoi…" : "Envoyer le diagnostic"}{" "}
      <Icon name="arrow-right" size={13} />
    </button>
  );
}

function Step({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(36px, 4.5vw, 56px)",
          letterSpacing: "-0.005em",
          lineHeight: 1.05,
          marginBottom: 40,
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function Radios({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: ReadonlyArray<{ v: string; l: string }>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {options.map((o, i) => {
        const active = value === o.v;
        return (
          <label
            key={o.v}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 28px",
              gap: 18,
              padding: "22px 8px",
              borderTop:
                i === 0 ? "1px solid var(--sable)" : "1px solid var(--line)",
              borderBottom:
                i === options.length - 1 ? "1px solid var(--sable)" : "none",
              cursor: "pointer",
              background: active ? "rgba(168, 132, 84, 0.08)" : "transparent",
              transition: "background .2s ease",
            }}
          >
            <span
              className="eyebrow"
              style={{ color: active ? "var(--amber)" : "var(--taupe)" }}
            >
              0{i + 1}
            </span>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: "-0.005em",
                color: "var(--ink)",
              }}
            >
              {o.l}
            </span>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: `1px solid ${
                  active ? "var(--amber)" : "var(--line-strong)"
                }`,
                background: active ? "var(--amber)" : "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {active && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--ivory)",
                  }}
                />
              )}
            </span>
            <input
              type="radio"
              checked={active}
              onChange={() => onChange(o.v)}
              style={{ display: "none" }}
            />
          </label>
        );
      })}
    </div>
  );
}

function Recap({ data }: { data: Form }) {
  const rows: ReadonlyArray<readonly [string, string]> = [
    ["Situation", data.situation || "—"],
    ["Surface", data.surface || "—"],
    ["Localisation", data.localisation || "—"],
    ["Délai", data.delai || "—"],
    [
      "Joindre",
      `${data.nom || "—"} · ${data.email || "—"} · ${data.tel || "—"}`,
    ],
    ["Note", data.message || "—"],
  ];
  return (
    <div
      style={{
        borderTop: "1px solid var(--sable)",
        borderBottom: "1px solid var(--sable)",
      }}
    >
      {rows.map(([k, v], i) => (
        <div
          key={k}
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: 16,
            padding: "18px 0",
            borderBottom:
              i < rows.length - 1 ? "1px solid var(--line)" : "none",
          }}
        >
          <span className="eyebrow">{k}</span>
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: 19,
              letterSpacing: "-0.005em",
              color: "var(--ink)",
            }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

function SuccessPanel({
  nom,
  tel,
  reference,
}: {
  nom: string;
  tel: string;
  reference: string;
}) {
  return (
    <div
      style={{
        padding: "100px 32px",
        textAlign: "center",
        background: "var(--lin)",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--ink)",
          color: "var(--on-dark)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <Icon name="check" size={32} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(40px, 5vw, 60px)",
          letterSpacing: "-0.005em",
          color: "var(--ink)",
        }}
      >
        Reçu, {nom.split(" ")[0] || nom}
      </h3>
      <p
        style={{
          color: "var(--ink-soft)",
          fontSize: 17,
          marginTop: 14,
          maxWidth: "48ch",
          margin: "14px auto 0",
          lineHeight: 1.6,
        }}
      >
        Une conseillère vous rappelle sous 24h ouvrées au {tel} ou par courriel.
      </p>
      <p className="eyebrow" style={{ marginTop: 32 }}>
        Référence dossier · {reference}
      </p>
    </div>
  );
}
