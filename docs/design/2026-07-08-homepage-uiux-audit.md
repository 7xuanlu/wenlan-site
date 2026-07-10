# Homepage UI/UX audit and upgrade plan (2026-07-08)

Read as: redesign-preserve of a B2B/dev-tool landing page for AI-native developers.
Brand stays (cream base, serif display, warm/sage/indigo accents). Differentiation
comes from a signature artifact and one orchestrated motion moment, not a palette swap.

Evidence: rendered at 1440x1000 and 390x844 from the prod build on :3000.
Screenshots in `/private/tmp/claude-501/ucqa/` (hero-*, full-*, mid-*.png) and
`.omo/evidence/index-list-ledger-qa/` (use-cases section).

## Page map with verdicts

| # | Section | Verdict |
|---|---------|---------|
| 1 | Hero (centered "Wenlan" + blob) | Weakest section. Brand name as headline says nothing; blob is decoration; mono strip under CTAs is clutter. |
| 2 | Demo video panel (dark) | Fine as media object. "v0.9" label is a devtool fixture on a marketing page. |
| 3 | Use cases (switcher + index artifact) | Strong after today's polish. This is the page's best visual grammar. |
| 4-9 | ~6 feature splits (eyebrow + serif headline + body + quote + illustration) | One layout family repeated 6x; illustrations render near-invisible (~4% ink); ~400px dead space per band; eyebrow on every section. |
| 10 | "96% fewer tokens" + table | Strong claim, weak presentation (plain table). |
| 11 | FAQ accordion | Generic pattern. |
| 12 | Final CTA + email form, footer | Serviceable. |

## Ranked upgrades (impact / risk)

### 1. Make the product the hero (highest impact)
The hero answers "who are you" but not "what do I get". Replace the centered
name + blob with a split hero: left, a value-stating headline ("Your agents'
memory, as a wiki you can read" territory) + one CTA pair; right, the real
artifact: a citable page assembling itself from source slips. This reuses the
exact grammar shipped in the use-cases artifact today (sources -> index ->
cited page), making it the site-wide signature. Cut the mono strip under the
CTAs (move "Claude Code plugin / MCP server / Local daemon" into a proper
integrations row under the hero).

### 2. Rescue the six feature illustrations
They are hand-drawn skeleton cards at near-zero contrast; at a glance they read
as unloaded content. Either (a) raise ink to readable contrast and accent-code
each per section (same palette discipline as the use-cases artifact), or
(b) replace half of them with real product stills from the demo. Also compress
6 sections to 4 and break the zigzag: one full-width moment, one 2-3 cell bento,
max two splits. Drop eyebrows to ~1 per 3 sections.

### 3. One orchestrated scroll moment (sticky-stack pipeline)
Instead of six equal fade-ins, pin the core story once: capture -> distill ->
cited page as a 3-step sticky stack (cards stack as you scroll). Everything
else stays quiet. Honor prefers-reduced-motion (collapse to static stack).

### 4. Turn the metrics section into the proof moment
"96% fewer tokens. Honest retrieval metrics." deserves a chart, not a table:
one horizontal bar pair (Wenlan vs raw transcript context) with tabular-nums
mono figures, plus the table folded behind "full methodology". This is the
section skeptical developers screenshot.

### 5. Page-wide label-soup cleanup
Mono uppercase micro-labels appear above nearly every section plus inside
artifacts. Keep ~3 across the page; the serif headlines carry hierarchy alone.

### 6. Smaller wins
- FAQ: replace accordion with a two-column question/answer list (scannable, no clicks).
- Dark mode parity: nav has a theme toggle; verify the pale illustrations and cream
  surfaces have real dark tokens (the near-invisible ink will vanish entirely on dark).
- `text-wrap: balance` on serif display headlines; visible focus rings on tabs/CTAs;
  `:active` scale feedback on buttons; one radius scale audit.
- Remove "Wenlan Demo v0.9" version label from the video frame.

## What NOT to change
- The brand palette and serif display. It is executed consistently; a swap is
  churn, not taste. (Noting honestly: cream + serif + terracotta is also the
  most common AI-generated look right now. The signature artifact + motion is
  how the page escapes that association without a rebrand.)
- Information architecture, slugs, nav labels (SEO).
- The use-cases section as of commit c7b1fe1.
