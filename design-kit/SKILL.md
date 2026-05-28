---
name: espace-blanc-design
description: Use this skill to generate well-branded interfaces and assets for Espace Blanc, a French service that helps families with succession, senior relocation, and moving. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Tone is editorial, sober, never sentimental.
user-invocable: true
---

# Espace Blanc — Design Skill

Espace Blanc is a French personal-services brand. The voice is **editorial, calm, sober** (« sans pression »). The visual identity is a cream-paper editorial journal with a dark-mode "crépuscule" navy variant.

## When invoked

1. **Read `README.md`** in full — it contains content fundamentals (voice, casing, anti-patterns) and visual foundations (colors, type, spacing, photography, hover states, iconography).
2. **Import or replicate `colors_and_type.css`** — it defines all tokens. Both modes share the same token names; switch via `<html data-mode="crepuscule">`.
3. **Reference `ui_kits/website/`** for componentry. The components are JSX prototypes — copy the visual rules, rebuild cleanly in your target stack.
4. **Reference `Diagnostic.html`** for known weaknesses on the live site that should NOT be reintroduced (duplication, 8-badge trust strips, repeated CTAs, etc).

## When generating copy

- Use « nous » / « vous » (never tu, never je).
- One italic word per title carries the emotion. The italic is colored `--accent`.
- Cite the date with any stat. Cite a verifiable proof with any claim.
- Forbidden: emoji, exclamation marks, generic CTAs like « Cliquez ici » or « Découvrez ».
- See `README.md → CONTENT FUNDAMENTALS` for the full rules.

## When generating visuals

- Bouton primaire = `--ink` background, jamais `--accent`.
- L'accent est réservé aux liens, italiques d'emphase, et hovers.
- Une seule couleur d'accent. Pas de gradient. Pas de seconde teinte.
- Hairline `1px solid var(--rule)` au lieu d'ombres.
- Photos recadrées portrait, légende mono ou serif italique systématique.
- 1 H1, 4 H2 max par homepage.

## If creating mock / prototype HTML artifacts

Generate static HTML with `colors_and_type.css` imported via CDN or copied inline. Use Cormorant Garamond + Manrope from Google Fonts. Reference components in `ui_kits/website/` for patterns. Output HTML files for the user to view; copy assets out of this skill folder rather than linking back.

## If working in production code (Claude Code handoff)

- Drop `colors_and_type.css` into the project's global stylesheet pipeline.
- Replace inline `style={…}` props in existing code with token classes (`.eb-h1`, `.eb-lede`, etc) or pull token values via CSS vars (`var(--accent)`).
- The brand has **no Tailwind config** — tokens are CSS variables, framework-agnostic.
- For any new component, follow the patterns in `ui_kits/website/*.jsx` — they encode the visual rules.

## If the user invokes this skill without other guidance

Ask:
1. What surface — homepage section, full page, slide, email, social post?
2. Mode — crème (jour, défaut) or crépuscule (nuit) ?
3. Content — do they have copy ready, or should you draft per the voice rules?
4. Output — throwaway HTML mock, or production-ready code?

Then build. Be a designer, not a templater. Surprise the user inside the rules.
