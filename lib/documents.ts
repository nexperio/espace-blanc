export const DOCUMENT_CATEGORIES = [
  "contrat",
  "cgv",
  "inventaire_eugenia",
  "inventaire_commissaire",
  "resultat_vente",
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  contrat: "Contrat",
  cgv: "CGV",
  inventaire_eugenia: "Inventaire Espace Blanc",
  inventaire_commissaire: "Inventaire commissaire-priseur",
  resultat_vente: "Résultat de la vente",
};

// Catégories qu'un commissaire-priseur peut téléverser.
export const COMMISSAIRE_CATEGORIES: ReadonlyArray<DocumentCategory> = [
  "inventaire_commissaire",
  "resultat_vente",
];

// Catégories visibles pour le commissaire (lecture).
export const COMMISSAIRE_READABLE_CATEGORIES: ReadonlyArray<DocumentCategory> =
  ["contrat", "cgv", "inventaire_commissaire", "resultat_vente"];

// Catégories visibles pour la famille (lecture).
export const FAMILLE_READABLE_CATEGORIES: ReadonlyArray<DocumentCategory> = [
  "contrat",
  "cgv",
  "inventaire_eugenia",
  "inventaire_commissaire",
  "resultat_vente",
];

// Catégorie versionnée (la seule où Eugénia choisit "version finale" à la coche).
export const VERSIONED_CATEGORIES: ReadonlyArray<DocumentCategory> = [
  "inventaire_eugenia",
];

export function isVersionedCategory(c: DocumentCategory): boolean {
  return VERSIONED_CATEGORIES.includes(c);
}

export function slugifyFilename(name: string): string {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const base = name.slice(0, name.length - ext.length);
  const clean = base
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${clean || "fichier"}${ext.toLowerCase()}`;
}
