"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "eb-cookie-consent";

type Choice = "accepted" | "refused";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== "accepted" && stored !== "refused") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function persist(choice: Choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // localStorage unavailable — degrade silently
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
    >
      <p>
        Nous utilisons uniquement les cookies indispensables au site et, avec
        votre accord, une mesure d&apos;audience anonyme pour l&apos;améliorer.
        Aucun cookie publicitaire.{" "}
        <Link href="/confidentialite#cookies">En savoir plus</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="btn-refuse"
          onClick={() => persist("refused")}
        >
          Refuser
        </button>
        <button
          type="button"
          className="btn-accept"
          onClick={() => persist("accepted")}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
