export type FaqItem = { q: string; a: string };
export type FaqSection = { eyebrow: string; title: string; items: FaqItem[] };

export const FAQ: FaqSection[] = [
  {
    eyebrow: "L'approche",
    title: "Différence, coût, délais",
    items: [
      {
        q: "Quelle est la différence avec une entreprise de débarras ? Pourquoi payer alors qu'un débarras peut être gratuit ?",
        a: "Une entreprise de débarras passe, charge tout, et repart — sans tri, sans estimation, sans restitution. Espace Blanc est un interlocuteur unique qui coordonne plusieurs prestataires (commissaire-priseur, déménageurs, associations) dans votre intérêt. Le but n'est pas de vider vite : c'est de préserver ce qui compte, valoriser ce qui peut l'être, et vous restituer les sommes.",
      },
      {
        q: "Comment faites-vous un devis ? Est-il gratuit ?",
        a: "Les devis d'Espace Blanc sont gratuits. L'équipe se déplace, évalue pièce par pièce, et établit un contrat qui définit la mission, son périmètre, et son coût — ligne par ligne, sans frais cachés.",
      },
      {
        q: "Quel est le coût d'une mission ?",
        a: "Chaque prestation est unique. Le tarif dépend du volume, des lieux à traiter, et des services demandés (tri, valorisation, déménagement partiel, dons, recyclage). Le devis est gratuit et engage Espace Blanc.",
      },
      {
        q: "Quel est le délai d'intervention ?",
        a: "Espace Blanc dispose de plusieurs équipes et peut intervenir rapidement — souvent sous une semaine pour démarrer, parfois en quelques jours en cas d'urgence (succession, EHPAD, déménagement contraint).",
      },
      {
        q: "Combien de temps dure une mission ?",
        a: "Cela dépend du volume et de la complexité. Une grande maison entièrement à trier peut demander plusieurs jours ; un petit appartement, quelques heures. Le devis précise toujours la durée estimée.",
      },
    ],
  },
  {
    eyebrow: "Le déroulé",
    title: "Présence, périmètre, accompagnement",
    items: [
      {
        q: "Ai-je besoin d'être présent pendant votre intervention ?",
        a: "Après nous avoir indiqué les biens à conserver, votre présence n'est pas indispensable. Vous validez à distance, depuis l'extranet, à votre rythme. Elle redevient utile si vous souhaitez être accompagné(e) dans le tri ou prendre des décisions au fil de l'eau.",
      },
      {
        q: "Ma maison ou mon appartement peut-il être totalement vidé par vos soins ?",
        a: "Oui. Nous intervenons exactement selon vos besoins : pour tout le logement, pour une partie, ou pour une seule pièce.",
      },
      {
        q: "Je souhaite seulement faire un grand tri d'une partie de mon logement. Est-ce possible ?",
        a: "Oui. Espace Blanc s'adapte à votre demande et peut aussi vous aider au réaménagement après le tri.",
      },
      {
        q: "J'ai besoin d'aide après le déménagement pour l'emménagement. Est-ce possible ?",
        a: "Oui — nous intervenons en amont comme en aval : tri, déménagement, puis aménagement du nouveau logement si vous le souhaitez.",
      },
    ],
  },
  {
    eyebrow: "Le devenir de vos biens",
    title: "Valorisation, vente, dons",
    items: [
      {
        q: "Qui perçoit le produit de la vente de mes objets ?",
        a: "Vous. Le montant de la revente auprès du commissaire-priseur vous revient intégralement et directement, déduction faite de sa commission. Espace Blanc ne prend aucune commission sur les ventes.",
      },
      {
        q: "Que se passe-t-il si le bien n'est pas vendu ?",
        a: "Vous décidez seul(e). Le commissaire-priseur peut proposer un réajustement tarifaire, vous récupérez l'objet, ou nous l'orientons vers une association.",
      },
      {
        q: "Mes biens devront partir vers différentes destinations. Pouvez-vous gérer cela ?",
        a: "Oui. Espace Blanc supervise les déménagements vers plusieurs destinations, ou vers chaque membre de la famille en cas de succession à répartir.",
      },
      {
        q: "Que faites-vous des affaires que je ne souhaite pas garder ?",
        a: "Ce qui n'a pas de valeur commerciale et dont vous souhaitez vous séparer est donné à des associations partenaires (Emmaüs notamment). La démarche est solidaire et éco-responsable ; un certificat de don peut être émis sur demande.",
      },
      {
        q: "Comment savoir si mes objets ont de la valeur ?",
        a: "Il faut distinguer la valeur sentimentale de la valeur marchande. Cette dernière est évaluée par un commissaire-priseur, partenaire d'Espace Blanc — son expertise est neutre et chiffrée.",
      },
    ],
  },
  {
    eyebrow: "Périmètre & partenaires",
    title: "Territoires et collaborations",
    items: [
      {
        q: "Intervenez-vous dans toute la France ?",
        a: "Espace Blanc intervient essentiellement en Île-de-France. Nous accompagnons aussi nos clients pour des biens situés en province, au cas par cas, avec un déplacement chiffré dans le devis.",
      },
      {
        q: "Avec qui travaillez-vous ?",
        a: "Espace Blanc collabore avec un commissaire-priseur, une entreprise de déménagement professionnelle, et des associations comme Emmaüs. Chaque intervenant est sélectionné pour la qualité de son travail et la transparence de sa tarification.",
      },
    ],
  },
];

// Sous-ensemble curé pour la home (FaqShort) — 5 questions à fort impact.
export const FAQ_HOME: FaqItem[] = [
  FAQ[0].items[0], // Différence vs débarras
  FAQ[0].items[1], // Devis gratuit
  FAQ[2].items[0], // Qui perçoit le produit de la vente
  FAQ[2].items[3], // Que devient ce qui n'a pas de valeur
  FAQ[1].items[0], // Présence pendant intervention
];
