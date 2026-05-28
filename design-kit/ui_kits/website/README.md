# UI Kit · Espace Blanc — Marketing Website

Composants React (JSX inline + Babel) qui montent une homepage de démo aux couleurs du DS.

## Fichiers

```
README.md       ← ce fichier
index.html      ← démo cliquable (hero, méthode, stats, témoignage, faq, footer)
Icon.jsx        ← sprite SVG inline (10 glyphes)
Primitives.jsx  ← Button, BtnLink, SectionHead, Eyebrow, Label, Mono
Nav.jsx         ← masthead + bandeau date + nav + CTA
Hero.jsx        ← hero éditorial avec figure et légende
Doors.jsx       ← 3 portes d'entrée (succession / sénior / déménagement)
Method.jsx      ← liste ordonnée 01-04 (méthode)
Stats.jsx       ← bilan d'impact (4 chiffres)
Quote.jsx       ← carousel témoignage (portrait + verbatim + chiffre)
Faq.jsx         ← accordéon 5 questions
Footer.jsx      ← pied de page complet avec légal
App.jsx         ← assemblage homepage
```

## Lancer

Ouvrir `index.html` dans un navigateur (ou via la prévisualisation). Aucun build, aucun npm — React + Babel via CDN.

## Pour la production (Claude Code)

1. Lire `../../colors_and_type.css` — tokens canoniques.
2. Lire chaque composant de ce dossier — la **structure visuelle** y est figée. La structure d'implémentation (props, factorisation) est libre.
3. Réécrire en composants typés du framework cible (Next.js + React server components recommandé), en gardant :
   - Les classes et structures HTML
   - Les CSS custom properties pour tout couleur/spacing/font-size
   - Les transitions et hovers à l'identique
4. Migrer les `<button onClick>` vers le routing du framework.
5. Remplacer les photos Unsplash placeholder par les vraies images de la marque.

## Caveats

- Le routing est en `useState` local (pas de vraie navigation). En prod : Next.js App Router.
- Le carousel témoignage et l'accordéon sont en `useState` simple — OK pour le démo, à reconstruire avec Radix ou Headless UI en prod si accessibilité requise.
- Le Tweaks panel des prototypes existants (`eb/app.jsx`) n'est **pas** repris ici — c'était un outil exploratoire, pas un composant produit.
