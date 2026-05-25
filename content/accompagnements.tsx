import type { ReactNode } from "react";
import { EB_PHOTOS } from "@/lib/photos";

export type AccompKey = "succession" | "senior" | "demenagement";

type ContentItem = {
  label: string;
  title: ReactNode;
  strap: string;
  img: string;
  pour: readonly string[];
  pourquoi: string;
  comment: ReadonlyArray<readonly [string, string]>;
  chiffres: ReadonlyArray<readonly [string, string]>;
  temoignage: {
    q: string;
    who: string;
    role: string;
    city: string;
    img: string;
  };
  prix: { from: string; inclus: readonly string[] };
  meta: { title: string; description: string };
};

export const ACCOMP_CONTENT: Record<AccompKey, ContentItem> = {
  succession: {
    label: "Accompagnement 01",
    title: <>Une succession <em>à traverser</em></>,
    strap:
      "Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
    img: EB_PHOTOS.succession,
    pour: [
      "L'héritier unique surchargé qui n'a ni le temps, ni les nerfs.",
      "La fratrie éloignée qui doit décider sans se déchirer.",
      "Le notaire qui cherche un opérateur de confiance, traçable, assuré.",
    ],
    pourquoi:
      "Une maison de famille n'est jamais qu'un patrimoine financier. C'est un livre intime, des lettres oubliées, des bibelots qui ne disent leur prix qu'à ceux qui les ont touchés. Un débarras classique ne fait pas la différence. Nous, oui.",
    comment: [
      [
        "Visite à blanc",
        "Vous nous laissez les clés ou nous vous accompagnons. Inventaire émotionnel et estimatif, sans jugement.",
      ],
      [
        "Tri photographié",
        "Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, à votre rythme.",
      ],
      [
        "Restitution privée",
        "Avant toute vente, nous vous proposons d'isoler ce qui doit revenir à la famille. Vous décidez.",
      ],
      [
        "Valorisation",
        "Brocanteurs, dépôts-vente, ventes en ligne, dons certifiés. Vous voyez la destination de chaque ligne.",
      ],
      [
        "Restitution finale",
        "Logement rendu vide et nettoyé. Sommes valorisées reversées. Bilan d'impact remis au notaire.",
      ],
    ],
    chiffres: [
      ["86 m²", "Surface moyenne traitée"],
      ["4 200 €", "Restitué en moyenne"],
      ["18 j", "Délai moyen porte à porte"],
    ],
    temoignage: {
      q: "Mon père a vécu 51 ans dans le même appartement. J'avais peur du moment où il faudrait vider. Espace Blanc l'a fait avec une délicatesse qui m'a bouleversée.",
      who: "Claire R.",
      role: "Fille unique, succession",
      city: "Paris 14ᵉ",
      img: EB_PHOTOS.archive,
    },
    prix: {
      from: "À partir de 2 400 €",
      inclus: [
        "Diagnostic + devis 24h",
        "Tri photographié, extranet client",
        "Mise en vente et dons certifiés",
        "Logement rendu nu et propre",
        "Bilan d'impact détaillé",
      ],
    },
    meta: {
      title: "Succession — vider une maison de famille",
      description:
        "Tri photographié, valorisation transparente, restitution chiffrée. Espace Blanc accompagne les héritiers et les notaires en Île-de-France.",
    },
  },
  senior: {
    label: "Accompagnement 02",
    title: <>Un proche part <em>en résidence</em></>,
    strap:
      "Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
    img: EB_PHOTOS.senior,
    pour: [
      "Le sénior qui prépare sereinement son entrée en résidence.",
      "Les enfants qui veulent aider sans imposer.",
      "L'établissement qui demande une logistique douce et tracée.",
    ],
    pourquoi:
      "Ce qui suit en chambre tient en huit mètres carrés. Ce qui reste à la maison parle d'une vie entière. La benne en bas de l'immeuble est une violence. Notre travail est de l'éviter.",
    comment: [
      [
        "Conversation",
        "Ensemble, à la maison, autour d'un thé. Pas de cases à cocher.",
      ],
      [
        "Ce qui part en chambre",
        "Mesure, mise en boîte, transport, installation. Sur place avant l'arrivée.",
      ],
      [
        "Ce qui reste à la famille",
        "Photos, vidéo de présentation, partage simple aux proches.",
      ],
      [
        "Ce qui s'en va ailleurs",
        "Dons aux associations choisies, ventes au profit du foyer.",
      ],
      [
        "Le logement",
        "Rendu, restitué à la propriété ou aux héritiers. Net et clair.",
      ],
    ],
    chiffres: [
      ["68 m²", "Surface moyenne traitée"],
      ["8 m²", "Chambre en résidence installée"],
      ["3 mois", "Accompagnement post-installation"],
    ],
    temoignage: {
      q: "Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée en résidence avec sa lampe, son fauteuil, ses photos sur la commode. Elle s'est dit chez elle.",
      who: "Marc T.",
      role: "Fils, accompagnement EHPAD",
      city: "Neuilly",
      img: EB_PHOTOS.detail,
    },
    prix: {
      from: "À partir de 1 800 €",
      inclus: [
        "Diagnostic + écoute approfondie",
        "Sélection chambre + installation",
        "Tri du reste, dons, ventes",
        "Visite post-installation à 1 mois",
        "Accompagnement administratif",
      ],
    },
    meta: {
      title: "Départ en résidence senior — préparer le passage",
      description:
        "Installation en résidence, tri du logement quitté, partage familial : Espace Blanc orchestre le passage en douceur, sans benne ni précipitation.",
    },
  },
  demenagement: {
    label: "Accompagnement 03",
    title: <>Un déménagement <em>à alléger</em></>,
    strap:
      "Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
    img: EB_PHOTOS.demenagement,
    pour: [
      "L'expatrié pressé qui ne peut pas stocker quinze ans de meubles.",
      "Le couple qui se sépare et trie en commun, dans le calme.",
      "La famille qui veut alléger avant un saut de surface significatif.",
    ],
    pourquoi:
      "Un déménagement révèle ce qu'on porte sans plus le voir. Tout déplacer coûte cher, trois fois sur quatre c'est trop. Vendre ce qui peut l'être finance le reste. C'est mathématique et c'est humain.",
    comment: [
      [
        "Audit avant carton",
        "En 90 minutes, nous repérons ce qui mérite déplacement, vente, ou don.",
      ],
      [
        "Mise en vente express",
        "Vingt jours pour valoriser. Brocanteurs, dépôts-vente, en ligne.",
      ],
      [
        "Don aux associations",
        "Ce qui ne se vend pas mais reste utile : associations partenaires.",
      ],
      [
        "Coordination déménageur",
        "Nous nous parlons avec votre transporteur. Vous n'arbitrez plus.",
      ],
      [
        "Restitution financière",
        "Le produit net des ventes diminue votre facture de déménagement.",
      ],
    ],
    chiffres: [
      ["−42%", "Volume moyen évité au déménageur"],
      ["3 100 €", "Restitué en moyenne"],
      ["20 j", "Délai de mise en vente"],
    ],
    temoignage: {
      q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.",
      who: "Yann B.",
      role: "Expat. Lisbonne",
      city: "Paris 11ᵉ",
      img: EB_PHOTOS.window,
    },
    prix: {
      from: "À partir de 1 200 €",
      inclus: [
        "Audit avant carton (90 min)",
        "Mise en vente sur 20 jours",
        "Dons certifiés",
        "Coordination déménageur",
        "Bilan financier transparent",
      ],
    },
    meta: {
      title: "Déménagement allégé — vendre, donner, transporter moins",
      description:
        "Audit, mise en vente sur 20 jours, dons, coordination déménageur. Espace Blanc transforme votre déménagement en opération nette.",
    },
  },
};
