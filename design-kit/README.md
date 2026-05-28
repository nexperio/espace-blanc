# Espace Blanc — Design System

**Espace Blanc** accompagne les particuliers d'Île-de-France à travers trois situations difficiles : **la succession** d'un proche, le **départ d'un sénior** en résidence, et le **déménagement**. Le service trie, valorise et transmet le patrimoine sans pression, avec un seul interlocuteur, et restitue les sommes ligne par ligne.

Ce dépôt contient les fondations visuelles, les tokens, les composants UI et un kit prêt à brancher pour générer des écrans, slides, ou production code aux couleurs de la marque.

---

## Sources

- **Site live** — https://espace-blanc-cyan.vercel.app (référence visuelle et contenu)
- **Diagnostic** — `Diagnostic.html` (audit + plan de rectification, à lire avant)
- **Prototypes existants** — `eb/` (direction éditoriale crème), `ek/` (direction crépuscule, dépréciée)
- **Stack cible** — Next.js + Vercel, livraison handoff Claude Code

---

## Index

```
README.md                  ← ce fichier
SKILL.md                   ← entrypoint Claude Code / Agent Skills
colors_and_type.css        ← tokens couleur + typographie + spacing
Diagnostic.html            ← audit du site live (référence)
assets/                    ← logos, photos, illustrations
fonts/                     ← polices auto-hébergées (vide — Google Fonts pour l'instant)
preview/                   ← cards affichées dans l'onglet Design System
ui_kits/
  website/                 ← composants React pour la marketing-site
    README.md
    index.html             ← démo cliquable
    Button.jsx, ...
```

---

## CONTENT FUNDAMENTALS

Le ton est **éditorial, sobre, jamais larmoyant**. Espace Blanc s'adresse à des personnes en deuil, en transition, en stress administratif — la voix doit *rassurer sans surjouer*. Aucune emphase commerciale. Aucun emoji. Aucun superlatif gratuit.

### Voix

- **« Nous »** côté marque (pas « je »), **« vous »** côté client (jamais « tu »).
- Phrases courtes, souvent en deux temps avec une virgule : *« On vide. Vous respirez. »* / *« Trier sans se trahir, valoriser sans se précipiter. »*
- Verbes d'action concrets : *trier, fiches, valoriser, restituer, transmettre*.
- Pas d'adjectifs vagues (« unique », « innovant », « premium »). Préférer le chiffre, la photo, la preuve.
- Italiques pour le souffle, pas pour souligner : un mot italique par titre, qui porte l'émotion.

### Casing

- **Titres serif** : sentence case, **sans ponctuation finale** — pas de point en fin de titre, jamais. (*« Le passage, en de bonnes mains »* — pas de « . » à la fin.)
- **Labels mono / éditoriaux** : casse normale en italique serif (*« Cahier I · Les trois portes »*) — **pas** d'all-caps lourd.
- Les chiffres-clés s'écrivent en serif romain : *412 missions · 1,8 M€ restitués · 84 t détournées*.
- Numérotation romaine (I, II, III) ou décimale zéro-paddée (01, 02, 03) — jamais d'icônes-puces.

### Vocabulaire — les mots que nous tenons

**À utiliser** — ce sont les verbes et noms qui décrivent ce que fait vraiment Espace Blanc :

> passage · allègement · valoriser · transmettre · soigner · mesurer · respecter · soulager · restituer

**À bannir** — les mots du débarrasseur au lot, qui trahissent la promesse :

> ~~débarras~~ · ~~vide-grenier~~ · ~~ramassage~~ · ~~lot~~ · ~~encombrant~~ · ~~enlèvement~~

Règle : un seul mot interdit dans un copy = relecture immédiate. La promesse d'Espace Blanc tient dans son vocabulaire — *on ne « débarrasse » pas un proche, on traverse un passage.*

### Formules récurrentes (à utiliser sans en abuser)

| Formule | Quand |
|---|---|
| « Le passage » | Métonymie pour les missions (succession, départ, déménagement) |
| « Sans engagement, sous 24h » | Promesse de diagnostic |
| « Vous gardez la main, nous portons le reste » | Promesse pivot |
| « Mesurer plutôt que jeter » | Engagement éco |
| Cahier I, II, III… | Section labels (sommaire éditorial) |

### Anti-patterns

- ❌ Emoji, exclamations, gradients dans le copy
- ❌ « Cliquez ici », « Découvrez nos services »
- ❌ Plus de 3 « X, Y » avec virgule-italique par page (cf. Diagnostic §08)
- ❌ Tous les CTAs identiques (« Diagnostic gratuit » répété 5×)
- ❌ Stats sans date de mesure (« 412 missions » → « 412 missions, au 31 mars 2026 »)

---

## VISUAL FOUNDATIONS

### Identité

Papier crème, encre brun-noir, accent bronze chaud. La marque vit dans un univers de **journal d'éditions limitées**, façon revue mensuelle imprimée — avec règles fines, lettrines, légendes mono, et photographies recadrées comme dans un magazine.

### Couleurs

**Mode Crème (défaut)** — *« papier et encre »*

| Token | Hex | Rôle |
|---|---|---|
| `--paper` | `#efe9dc` | Fond de page principal |
| `--paper-2` | `#fbf8f1` | Cartes, surfaces surélevées |
| `--paper-3` | `#e8e0cf` | Hover, sidebars |
| `--paper-inv` | `#1f1a14` | Fond noir (footer, hero inversé) |
| `--ink` | `#1f1a14` | Texte principal |
| `--ink-soft` | `#4a4236` | Corps secondaire |
| `--ink-mute` | `#7a7165` | Labels, légendes |
| `--accent` | `#a78060` | Liens, italique en emphase |
| `--accent-deep` | `#8a6647` | Hover / pressé |

**Mode Crépuscule (bascule)** — *« velours, la nuit calme »*

| Token | Hex | Rôle |
|---|---|---|
| `--paper` | `#0f1626` | Fond de page (navy nuit) |
| `--paper-2` | `#1a2540` | Cartes |
| `--ink` | `#f3ecdd` | Texte principal (blanc chaud) |
| `--ink-soft` | `#d6c9a8` | Corps secondaire |
| `--accent` | `#caa07a` | Terre cuite veloutée |

**Règles couleur**

- **Une seule** couleur d'accent à la fois. Pas de gradient. Pas de seconde teinte d'appui.
- Les couleurs sémantiques (`--ok`, `--warn`, `--info`) sont **réservées au state UI** (form errors, success badge) — jamais en décoration.
- Le bouton primaire est **noir-ink, pas accent** — l'accent est réservé aux liens et aux italiques d'emphase éditoriale.
- Activation Crépuscule : `<html data-mode="crepuscule">` ou `<body data-mode="crepuscule">`.

### Typographie

Deux familles + une mono d'accent.

| Famille | Usage |
|---|---|
| **Cormorant Garamond** (serif) | Titres, italiques éditoriaux, citations, chiffres-clés |
| **Manrope** (sans-serif) | Corps, UI, formulaires, navigation, boutons |
| **JetBrains Mono** (mono) | Métadonnées rares : pagination, références de figure, codes |

**Échelle (variable CSS)**

```
--text-xs       12   labels mono, captions
--text-sm       14   body small, small caps mono
--text-base     16   body
--text-lg       19   lede, intro
--text-xl       24   H3
--text-2xl      32   H2 small
--text-3xl      48   H2
--text-4xl      72   H1
--text-display  clamp(56px, 7vw, 120px)   hero display
```

**Règles**

- 1 H1 par page. 4 H2 max sur la homepage.
- L'italique du serif est **toujours coloré accent** (`--accent`) quand il marque l'emphase éditoriale.
- Letter-spacing : `-0.03em` sur le display, `-0.015em` sur les H2/H3, `0` sur le body.
- Labels éditoriaux (« Cahier I · Bilan d'impact ») = serif italique en `--ink-mute`, **pas** caps mono.

### Espacements

Grille **multiple de 8** (4 toléré pour les détails fins).

```
--space-1  4    --space-2  8    --space-3  16
--space-4  24   --space-5  32   --space-6  48
--space-7  64   --space-8  96   --space-9  128
```

- **Container** : max 1240px, padding latéral 64px (desk) / 24px (mob).
- **Section vertical padding** : 80–120 px desktop, 48–72 mob.
- Gouttière de grille standard : 32px (4 cols), 24px (3 cols).

### Bordures, rayons, ombres

- **Arrondis très conservateurs** : 2px sur les cartes/champs, 6px max sur les blocs proéminents, 999px pour les CTAs pill.
- **Bordures hairline** au lieu d'ombres : `1px solid rgba(31,26,20,.18)` — c'est la signature « papier ».
- Ombres : portées **très subtiles**, jamais marquées. `0 20px 40px -24px rgba(31,26,20,.22)`.

### Photographie

- **Recadrage éditorial** : portrait 3/4 ou 4/5, jamais carré.
- **Saturation désaturée** (saturate 0.85, contrast 0.95) — registre journal, pas Instagram.
- **Légende mono ou serif italique** systématique sous chaque image : *« Fig. 02 — Bibliothèque, succession Dr. R., Paris 6ᵉ. »*
- Bordure hairline ou aucune. **Pas** de bord arrondi sur les photos (≤2 px max).

### Animation, hover, états

- **Transitions discrètes** : `.25s cubic-bezier(.2,.7,.2,1)` par défaut.
- **Hover boutons** : la couleur de fond passe à l'`--accent`, pas de translateY (sauf cards : `-3px` léger).
- **Hover cards** : `transform: translateY(-2px)` + ombre légère, jamais de scale.
- **Hover liens** : couleur passe à l'`--accent`, soulignement reste.
- **Active/pressé** : baisse de luminosité (`--accent-deep`), pas de scale.
- **Focus clavier** : outline 2px `--accent` à 2px d'offset — visible, soigné.
- **Aucune animation décorative** (pas de fade-in au scroll, pas de parallax). Le calme est volontaire.

### Layout & rythme

- **Règles horizontales** (`1px solid var(--ink)`) pour séparer les sections — c'est la grammaire éditoriale.
- **Pas de cards à ombre lourde**. Une carte est délimitée par sa bordure hairline ou son fond `--paper-2`, pas par son ombre.
- **Section heading pattern** : eyebrow (label italique) + H2 + aside (italique fine à droite), 3 colonnes alignées sur baseline.

---

## ICONOGRAPHY

**Approche** : iconographie line, minimaliste, 1.4px stroke. Pas d'icônes pleines, pas d'icônes colorées. Les icônes héritent de `currentColor`.

**Set utilisé** : sprite SVG inline maison (voir `ui_kits/website/Icon.jsx`). 14 glyphes seulement — l'éditorial préfère le texte à l'icône.

| Nom | Usage |
|---|---|
| `arrow-right`, `arrow-left`, `arrow-down` | Navigation, CTAs |
| `close`, `menu` | Modaux, mega-menu |
| `plus`, `minus` | Accordéons FAQ |
| `check` | Validations, certificats |
| `user`, `phone`, `mail` | Espace client, contact |
| `leaf`, `shield`, `star`, `circle` | Engagement éco, RC pro, témoignages |

**Substitution** : si un glyphe manque, prendre l'équivalent **Lucide** (https://lucide.dev) — même stroke weight (1.4px), même style line. **Ne jamais** mélanger avec Heroicons, Material, ou Feather (épaisseurs différentes).

**Pas d'emoji**, jamais. **Pas de logo coloré** : la marque n'a qu'un wordmark *« Espace Blanc »* en serif Cormorant Garamond, avec « Blanc » en italique accent.

---

## TODO / Caveats

- ✅ Tokens (colors_and_type.css)
- ✅ README + content + visual foundations
- ✅ Iconography spec
- ⏳ Preview cards (en cours)
- ⏳ UI kit website (en cours)
- ⏳ Polices auto-hébergées dans `fonts/` (pour l'instant Google Fonts CDN)
- ⏳ Photos & illustrations dans `assets/` (à fournir par l'équipe — actuellement Unsplash en placeholder)
- ⏳ Logo SVG (à dessiner avec une typographe — pour l'instant wordmark CSS)

---

## Pour Claude Code

Voir `SKILL.md` pour l'entrypoint Agent Skills. En substance :

1. Lire `README.md` + `colors_and_type.css`
2. Importer `colors_and_type.css` dans le projet cible
3. Utiliser les composants de `ui_kits/website/` comme références (les copier, pas les exécuter — production code doit être propre)
4. Respecter les règles de voix dans `CONTENT FUNDAMENTALS` quand on génère du copy
