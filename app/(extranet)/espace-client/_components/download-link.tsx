import Link from "next/link";

export function DownloadLink({
  path,
  compact = false,
  label = "Télécharger",
}: {
  path: string;
  compact?: boolean;
  label?: string;
}) {
  return (
    <Link
      href={`/espace-client/api/download?path=${encodeURIComponent(path)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost"
      style={
        compact
          ? { fontSize: 11.5, padding: "5px 12px" }
          : { fontSize: 13, padding: "8px 14px" }
      }
    >
      {label}
    </Link>
  );
}
