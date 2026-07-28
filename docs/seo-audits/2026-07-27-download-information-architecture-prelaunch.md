# Download information architecture prelaunch

## Decision

Prepare one bounded conversion-surface change:

- Keep the homepage `#download` anchor, but replace the complete release matrix
  with one compact browser-recommended platform surface.
- Add English, Traditional Chinese, and Simplified Chinese `/download` routes
  for the complete release matrix, setup guidance, and verification path.
- Keep every download target sourced from `WENLAN_RELEASE`.
- Keep the existing `github_outbound`, `get_started_click`, and bounded
  analytics-property contract.

The user approved this local preserve-redesign direction at
`2026-07-27T06:06:34Z`. Commit, push, PR, merge, deployment, request indexing,
GSC validation, synthetic production events, and other external actions remain
separately gated.

## Design read

This is a preserve-redesign of a technical open-source product acquisition
surface for developers. The page keeps Wenlan's dark editorial identity and
existing semantic tokens, with these design dials:

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 3`
- `VISUAL_DENSITY: 5`

The homepage has one job: get a visitor to the right next action quickly. The
download hub has the detail job: expose every published archive and the setup
contract without turning the homepage into release documentation.

## Inspectable baseline

Captured from the live `https://wenlan.app/#download` surface on
`2026-07-27`:

- Inspected desktop viewport: the section measured about `960.45` CSS pixels
  high.
- Inspected English mobile viewport: the section measured about `1,833.74`
  CSS pixels high.
- Inspected Traditional Chinese mobile viewport: the section measured about
  `1,738.99` CSS pixels high.
- The first mobile anchor viewport contained the heading, description, release
  metadata, and the beginning of the Windows card, but no download action.
- The server component destructures Windows as the leading platform and renders
  all other platforms as secondary rows before any browser-system evidence is
  available.
- The macOS, Linux x64, and Linux ARM64 actions use the same visible
  `Download` or `下載` label even though their accessible names differ.

These are rendered-layout and code observations. They are not traffic,
conversion, or causal evidence.

## Source-native measurement baseline

Authenticated complete-day evidence for `2026-06-27..2026-07-24` remains:

- GSC property totals: 7 clicks and 329 impressions.
- GSC visible-query totals: 1 click and 81 impressions.
- GSC visibility gap: 6 clicks and 248 impressions.
- Vercel: 1,406 visitors and 1,612 pageviews.
- GitHub: 47 total Wenlan stars.
- Authenticated Umami homepage CTA baseline: unavailable.
- Vercel source-to-page sessions: unavailable.

No metric is converted into another source's unit. No CTA lift or star effect
is inferred.

## Scope

### Homepage

- Preserve `id="download"`.
- Show one compact recommendation after browser-side OS detection.
- Render a stable no-JavaScript fallback linking to the complete download hub.
- Make the platform name and architecture explicit.
- Keep the primary action and the complete-download link visible in the first
  mobile anchor viewport.
- Do not hide or auto-download an archive without a user click.

### Download hub

- Add `/download`, `/zh-TW/download`, and `/zh-CN/download`.
- Emit reciprocal canonical and hreflang metadata.
- Add all three routes to the sitemap.
- Expose Windows x64, macOS Apple silicon, Linux x64, and Linux ARM64 using the
  immutable `WENLAN_RELEASE.assets` URLs.
- Show package format and size.
- Show platform-specific setup guidance and maintained links.
- Show `wenlan doctor` as the final verification path.
- Add visible breadcrumbs and `BreadcrumbList` JSON-LD.
- Add no `FAQPage` JSON-LD.

## Recommendation safety

Browser detection is a hint, not a compatibility proof:

- Android and iOS never receive a native-runtime recommendation.
- A recognized desktop OS selects its matching published platform family.
- Every recommendation prints the exact architecture.
- Unknown or ambiguous environments use the complete download hub rather than
  a silent archive choice.
- All four assets remain accessible on the download hub.

## Acceptance criteria

- Homepage anchor and hero CTA remain functional.
- Homepage recommendation and complete-download link fit inside the first
  mobile anchor viewport at 393 by 852 CSS pixels.
- Download hub renders all four exact release URLs.
- English, zh-TW, and zh-CN routes return 200 and use exact self-canonicals.
- Reciprocal hreflang and sitemap entries exist for all three locales.
- No document or heading overflow at desktop and mobile widths.
- Visible CTA labels name their platform and architecture.
- No new canonical, robots, noindex, redirect, structured-data, locale, or
  `FAQPage` regression.
- The existing release-source contract remains the only source for version,
  date, format, size, and asset URL.

## Predeclared readouts

- Minimum exposure: 100 Vercel pageviews summed in native units across the
  localized homepage and download-hub paths during the first 28 complete
  post-deploy days. This sum is not a deduplicated visitor count.
- Success: after minimum exposure, at least 10 authenticated Umami
  `github_outbound` events across `home-download` and `download-page`, with
  the technical and locale gates still passing.
- Failure: after 28 complete post-deploy days and minimum exposure, zero
  authenticated Umami `github_outbound` events across both placements while
  tracker coverage is verified.
- Inconclusive: minimum exposure is not reached, Umami is unavailable, tracker
  coverage is unverified, or the result falls between success and failure.
- Stop: stop or repair if platform recommendation is wrong for the detected OS
  family, the full matrix loses an asset, a release fact drifts from
  `WENLAN_RELEASE`, or any technical, locale, accessibility, or rendered-layout
  regression appears.

The 24-hour readout is technical only. The 7-day, W2, W4, and W8 readouts keep
Vercel pageviews, Umami events, GSC, GitHub stars, and technical evidence in
their original units without claiming causality.

## Local preflight result

Observed at `2026-07-27T06:22:51Z`:

- `pnpm seo:goal:check`: pass.
- `pnpm lint`: pass.
- `pnpm test:i18n`: 53 tests passed.
- `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan
  WENLAN_APP_REPO_ROOT=/Users/lucian/Repos/wenlan-app pnpm test:seo`:
  193 tests passed.
- `pnpm build`: pass; English, zh-TW, and zh-CN download routes were
  statically generated among 214 pages. The production-only IndexNow hook
  remained skipped because `VERCEL_ENV` was unset.
- `pnpm seo:technical:built`: pass; 17 required sitemap URLs and 17 checked
  HTML pages passed, all 117 built HTML pages were free of `FAQPage`, and old
  URLs remained absent from the sitemap.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3417 pnpm
  i18n:technical:built`: 22 expected 200 routes and five expected 404 routes
  passed.
- Rendered English desktop QA at about 1,382 by 797 CSS pixels measured the
  new homepage download section at about 411 CSS pixels high, down from the
  live baseline of about 960 CSS pixels.
- Rendered English mobile QA at 393 by 852 CSS pixels measured the new
  homepage download section at about 698 CSS pixels high, down from the live
  baseline of about 1,834 CSS pixels. Its direct recommended download action
  and full-download-hub link were both present.
- English, zh-TW, and zh-CN home and download routes had zero document-level
  horizontal overflow at both inspected desktop and mobile widths. All four
  download-hub buttons stayed inside the mobile viewport.
- The English download hub exposed four exact immutable release asset URLs,
  exact self-canonical metadata, reciprocal English, zh-TW, zh-CN, and
  x-default alternates, `BreadcrumbList` plus `WebPage` JSON-LD, and visible
  `wenlan doctor` verification.

This verifies local readiness only. No commit, push, PR, merge, deployment,
indexing request, GSC validation, external post, or synthetic analytics event
was performed.
