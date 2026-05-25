// Banque photo provisoire (Unsplash curated). À remplacer par les visuels
// Espace Blanc en V2 — intérieurs lumineux, lin, bois clair, laiton.
export const EB_PHOTOS = {
  hero: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop&q=78",
  succession:
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=78",
  senior:
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=78",
  demenagement:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=78",
  detail:
    "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&auto=format&fit=crop&q=78",
  livingroom:
    "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1600&auto=format&fit=crop&q=78",
  hands:
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&auto=format&fit=crop&q=78",
  window:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=78",
  portrait:
    "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1000&auto=format&fit=crop&q=78",
  archive:
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=78",
  empty:
    "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&auto=format&fit=crop&q=78",
  interior:
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop&q=78",
} as const;

export type PhotoKey = keyof typeof EB_PHOTOS;
