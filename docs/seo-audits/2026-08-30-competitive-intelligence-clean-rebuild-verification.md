# Competitive Intelligence Knowledge Base Clean-Rebuild Verification

Date: 2026-08-30
Observed at: 2026-08-30T17:47:52Z

## Scope and base

The trilingual candidate was reconstructed in the isolated worktree
`/tmp/wenlan-competitive-intelligence` from current `origin/main`
`d94b807cc83f66ac5be85500682066fdb68d0d05`.

Only candidate-owned source, locale, scenario, experiment, test, and evidence
changes were transferred. The unrelated zh-CN SRE indentation hunk and the
weekly, authority, README-star, RFP, and other scenario artifacts in the dirty
readout worktree were excluded.

No commit, push, pull request, merge, deployment, indexing request, GSC
validation, analytics mutation, maintainer contact, OSS contribution, paid
action, or other external-state change was made.

## Deterministic verification

- `pnpm seo:goal:check`: pass.
- `pnpm seo:scenario:check`: pass with 14 trilingual families and 156 sitemap
  owners.
- `pnpm test:goal`: 50/50 pass.
- `pnpm test:i18n`: 76/76 pass after the CJK phrase guard below.
- `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan WENLAN_APP_REPO_ROOT=/Users/lucian/Repos/wenlan-app pnpm test:seo`:
  252/252 pass.
- `pnpm lint`: pass.
- `pnpm build`: pass, 271/271 static pages. The first sandboxed build could
  not fetch Google Fonts and was not counted; the rerun with network access
  produced the valid build.
- `pnpm seo:technical:built`: pass with 156 sitemap locations, 24 required
  locations and checked HTML pages, no `FAQPage` in 160 built HTML files, 26
  redirects, seven noindex headers, valid robots, and no old sitemap URLs.
- `git diff --check`: pass.

The first clean-worktree SEO run was also not counted because the new worktree
derived nonexistent sibling paths under `/private/tmp`. The same complete
suite passed after both authoritative sibling checkout paths were supplied
explicitly.

## Rendered evidence

Fresh screenshots and machine-readable observations are under
`/tmp/wenlan-competitive-intelligence-visual`:

- `en-desktop.png`, `zh-TW-desktop.png`, and `zh-CN-desktop.png` at
  1280 by 900.
- `en-mobile-393.png`, `zh-TW-mobile-393.png`, and
  `zh-CN-mobile-393.png` at an exact 393 by 852 viewport.
- `qa-results.json` records the actual viewport width, exact canonical,
  reciprocal hreflang, schema types, document width, product image state, FAQ
  interaction, and console observations for all six captures.
- `sections/*-postfix-h2-*.png` and `phrase-wrap-results.json` record the
  corrected Mandarin heading wraps without full-page stitching.

All six final observations have one H1, one article, one product-evidence
panel, the expected Article and BreadcrumbList schema, no `FAQPage`, a loaded
product image, two expandable FAQ rows, no document overflow, and no console
warning or error.

The Browser full-page stitching path duplicated some distant regions in its
long PNG output. This was a capture artifact: the source-native DOM contained
one article and one instance of every H2, and the fixed-viewport screenshots
showed the live layout without duplication.

## CJK correction

The first valid 393px Mandarin screenshots exposed three split semantic terms:

- `競品檔案` / `竞品档案`;
- `證據` / `证据`;
- `追溯`.

The existing localized renderer seam now wraps these terms with the same
`whitespace-nowrap max-[360px]:whitespace-normal` treatment used by the
other protected phrases. The i18n contract was extended to fail if the terms
leave that renderer.

In the final 393px DOM evidence, every protected term has
`white-space: nowrap`, exactly one client rectangle, and a width below its
container. The fresh viewport captures show natural complete phrases in
English, Taiwan Traditional Chinese, and Simplified Chinese.

## Inline visual QA pass A

Verdict: PASS. Confidence: high.

- The page uses the existing Learn article renderer, typography, tokens,
  ProductEvidencePanel, CTA, related-article, reference, and FAQ primitives.
- The UI is a live DOM tree. The Wenlan screenshot is labeled product evidence,
  not a raster substitute for article content or controls.
- Canonical, hreflang, schema, navigation, FAQ expansion, product-image load,
  responsive width, and console checks all passed on the current build.
- No blocking design-system, interaction, resize, transparency, or fake-UI
  finding remains.

## Inline visual QA pass B

Verdict: PASS. Confidence: high.

- All six current-build captures were inspected.
- The 393px Mandarin phrase splits found in the first pass were corrected and
  recaptured.
- Final screenshots have no clipped heading, orphaned protected term,
  horizontal document overflow, tofu glyph, missing image, or broken FAQ
  state.
- The code block keeps its own bounded horizontal scroller for the long local
  path; the document itself remains within the viewport.

## Publication boundary

The clean local candidate is ready for one exact approval covering commit,
push, pull request, merge, automatic Vercel deployment, and read-only
production verification. Request indexing, GSC validation, analytics mutation,
the planned OSS authority proposal, maintainer messaging, paid actions, and
all other external publication remain separate decisions.
