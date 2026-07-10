# Wenlan Site Design System

## 1. Atmosphere & Identity

Wenlan feels like a quiet, source-backed workspace for agent memory. The signature is a paper-like wiki artifact with restrained depth: soft borders, warm citations, and compact index controls that make stored context feel inspectable rather than decorative.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|---|---|---|---|---|
| Background | `--o-bg` | `#fbfbf8` | `#1a1a2e` | Page background |
| Surface | `--o-bg-alt` | `#ffffff` | `#16213e` | Elevated sections and cards |
| Soft surface | `--o-surface` | `#f7f7f3` | `#1e2140` | Interior panels |
| Text primary | `--o-text` | `#1a1a2e` | `#e8e8f0` | Headings and primary copy |
| Text secondary | `--o-text-secondary` | `#5a5a6e` | `#a0a0be` | Body and supporting copy |
| Text muted | `--o-text-muted` | `#8a8a9a` | `#6a6a8a` | Labels and metadata |
| Border | `--o-border` | `#d8d9d2` | `#2a2a4a` | Card and sheet borders |
| Subtle border | `--o-border-subtle` | `rgba(128,132,122,0.28)` | `rgba(42,42,74,0.5)` | Dividers |
| Warm accent | `--o-warm` | `#b96842` | `#d4884a` | Code/dev and citations |
| Sage accent | `--o-sage` | `#7a9b7e` | `#8ab892` | Product/customer |
| Indigo accent | `--o-indigo` | `#5e58c8` | `#7b7be8` | Research/writing |
| Amber accent | `--o-amber` | `#b88938` | `#e0a850` | Secondary action metadata |

### Rules

- Use runtime `--o-*` tokens for themed surfaces; do not add section-local hex values.
- Accent color identifies a use-case family and should appear in labels, focus rings, selected states, and citation metadata.
- Entity colors are semantic and fixed: person = indigo, project = warm, page = sage, review/contradiction = amber. Retrieval routes reuse them: FTS5 exact term = warm, vectors paraphrase = sage, graph entity link = indigo; fusion glows warm.
- Tint borders and fills with `color-mix(in srgb, var(--o-*) N%, ...)` instead of introducing new hex values.
- Light mode should remain slightly warm, but not yellow-dominant.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|
| Display | `clamp(2.5rem, 6vw, 4.8rem)` | 500 | 0.96-1.05 | 0 | Hero and large section headlines |
| Section title | `2.5rem-3.5rem` | 500 | 1.05 | 0 | Homepage section headers |
| Card title | `1.15rem-1.6rem` | 550-650 | 1.12 | 0 | Use-case cards and sheet rows |
| Body | `1rem-1.125rem` | 400 | 1.65 | 0 | Explanatory copy |
| Metadata | `0.625rem-0.75rem` | 500-700 | 1.2-1.5 | `0.12em-0.3em` | Overlines, counts, commands |

### Font Stack

- Sans: `var(--font-instrument)`, with CJK fallbacks from `globals.css`.
- Serif: `var(--font-fraunces)`, with CJK serif fallbacks from `globals.css`.
- Mono: `var(--font-mono)`, then JetBrains Mono.

### Rules

- Letter spacing stays `0` for CJK and prose.
- Display text may wrap, but avoid orphaned single words or one-character CJK endings.
- Use mono only for labels, counts, commands, and source metadata.
- 100% zoom floor (set in design-preview): section intros `text-xl`, card bodies and FAQ answers `text-base`, content mono 12-13px. Micro-labels (uppercase, tracked) may go 9-11px but never carry content a reader must parse.

## 4. Spacing & Layout

### Base Unit

All spacing should be a multiple of 4px. Existing Tailwind spacing maps directly to this unit.

| Token | Value | Usage |
|---|---|---|
| Compact | `0.5rem-0.75rem` | Icon-label gaps, row metadata |
| Card | `1rem-1.5rem` | Card and row padding |
| Section inner | `2rem-3rem` | Between local clusters |
| Section outer | `3rem-6rem` | Homepage vertical rhythm |

### Grid

- Homepage content max width: `max-w-7xl`.
- Use-case section uses a left explanation column and a wider artifact column on desktop.
- Mobile stacks explanation, active summary, and artifact in that order.

### Rules

- Do not nest cards inside cards unless the inner surface has a functional role.
- Fixed-format artifacts need stable dimensions via min-height, grid tracks, or aspect ratio.

## 5. Components

### Use Case Context Lens

- **Structure**: left copy with the only scenario selector; right artifact shows the active scenario as a visual workbench: source documents flow into a Wenlan wiki lens and become the next citeable working page.
- **Variants**: code/dev warm with a codebase map, product/customer sage with client notes and proposal constraints, research/writing indigo with papers, quotes, and a citation trail.
- **Responsive selector**: desktop uses vertical index rows with summaries; mobile compresses into a three-column segmented index and keeps the visual workbench directly below it.
- **Spacing**: compact workbench padding, 8px radius, no oversized hero treatment inside the artifact.
- **States**: selected scenario, hover and focus-visible only on the left scenario selector; the right artifact is static explanatory evidence, not another selector.
- **Accessibility**: one scenario `tablist`, keyboard arrows cycle scenarios, each panel is labelled by its tab; artifact evidence tiles are semantic examples and do not expose `aria-pressed`.
- **Motion**: color and transform transitions only, 150-200ms.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---|---|---|
| Micro | 150ms | ease-out | Hover and selected tab feedback |
| Standard | 200ms | ease-out | Artifact color and row state shifts |

Animations must communicate state or affordance. Respect `prefers-reduced-motion` by keeping motion minimal and non-essential.

### Scroll-armed choreography contract

Client sections that animate on scroll-in (lineage, pipeline, bento, storage) follow one contract:

- Render the final state by default, so no-JS, reduced-motion, and already-visible sections all see finished UI.
- After mount, arm the intro (`stage = "pre"`) only when reduced motion is off and the section top sits below `0.8 * innerHeight`.
- One IntersectionObserver plays the section once; staggers run through `transitionDelay`, so a single state flip drives the whole sequence.

### Loops

Continuous animation is allowed only when it depicts a continuous process. Current vocabulary (keyframes live un-layered in `globals.css`): `arrow-nudge` (flow direction), `arc-flow` (the /handoff return arc keeps flowing), `route-flash` and `fuse-pulse` (the retrieval cycle), `marquee-x` (long-tail pills). Every looping class has an `animation: none` opt-out in the `prefers-reduced-motion` block; new loops must add theirs there.

### Hover

Cards lift `-translate-y-0.5`, brighten their border via `color-mix` with the cell accent, and carry a cursor spotlight (a radial gradient overlay tracking `--mx`/`--my`). SVG scenes may transition `stroke` and `fill` with per-element delays to walk a sequence outward.

## 7. Depth & Surface

Strategy: mixed soft borders and low-opacity shadows.

| Level | Value | Usage |
|---|---|---|
| Sheet | `0 18px 46px rgba(26,26,46,0.075)` | Main homepage artifacts |
| Row | `0 8px 22px rgba(26,26,46,0.055)` | Small elevated rows/cards |
| Media | `var(--o-shadow-media)` (per-theme, ink-tinted) | Demo video and other large media objects |
| Inset line | `border var(--o-border-subtle)` | Dividers and index rails |

Shadows are always tinted to the ink hue (`rgba(26,26,46,…)` light, `rgba(13,13,26,…)` dark); never pure black.

Radii stay restrained at 8px or below unless an existing component already uses a larger radius.

## 8. Copy

- No em-dashes anywhere in page copy.
- Sentence case; short declarative sentences. Cut any words the visual already carries.
- Mock data must look real: `mem_0231`-style ids, short git shas, believable page names and counts.
- Slash commands (`/distill`, `/handoff`) render in mono with an accent color.

## 9. Preview QA loop

For `/design-preview` rounds and their application to the homepage:

1. `tsc --noEmit` and `next build` must pass.
2. Playwright shots at 1440 and 390 wide with `reducedMotion: "reduce"` for deterministic frames; document `overflow-x` must be false at both widths.
3. Loops verified separately with `reducedMotion: "no-preference"`: computed `animationName` wired, frame pairs taken seconds apart differ.
4. Evidence lands in `.omo/evidence/design-preview/`.
