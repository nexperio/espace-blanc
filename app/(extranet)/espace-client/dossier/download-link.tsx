"use client";

import { useState } from "react";
import { Icon } from "@/components/marketing/icon";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export function DownloadLink({ path }: { path: string }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase.storage
        .from("dossier-documents")
        .createSignedUrl(path, 60);
      if (error || !data?.signedUrl) {
        throw error ?? new Error("URL signée indisponible");
      }
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error(e);
      alert("Téléchargement impossible. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="btn btn-ghost"
      style={{ padding: "8px 14px", fontSize: 13 }}
    >
      {loading ? "…" : "Télécharger"} <Icon name="arrow-right" size={12} />
    </button>
  );
}
