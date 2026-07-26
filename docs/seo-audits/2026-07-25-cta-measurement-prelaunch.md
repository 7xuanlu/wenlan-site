# CTA Measurement Technical Correction — 2026-07-25

Status: locally prepared and approved for commit, push, merge, deployment, and
production verification at `2026-07-26T03:07:04Z`. Production event reads
remain dependent on authenticated Umami dashboard or export access.

## Why this is next

The Goal fixes CTA as
`github_outbound / eligible acquisition-surface sessions`, but no reliable
`github_outbound` observation exists. The live site already loads the Umami
Cloud tracker on `wenlan.app`, while `TrackedLink` sends custom interactions
only to Vercel Analytics. Vercel custom-event reporting returns an
account-plan gate, so the current implementation cannot supply the approved
diagnostic CTA evidence.

This is a measurement blocker, not a search-demand or SEO-success signal. It
does not justify a new article, infer a star from an outbound click, or change
the frozen CTA definition.

## Inspectable evidence

- Approved design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md` defines one
  provider-neutral event contract and routes custom events to Umami when it is
  configured.
- Live production capture at `2026-07-26T02:56:08Z` returned HTTP 200 and
  included `https://cloud.umami.is/script.js` with the configured website ID.
  The capture is temporary under `/tmp/wenlan-home-live.html`; credentials or
  private analytics rows are not committed.
- Current code before this correction imported `track` from
  `@vercel/analytics` in `src/components/tracked-link.tsx`.
- The authenticated weekly report keeps CTA events account-gated and reports
  no outbound total rather than inventing one.
- Official Umami tracker documentation supports
  `umami.track(eventName, data)`, `data-domains`, `data-exclude-search`, and
  `data-do-not-track`.

## Bounded correction

- Normalize the existing event meanings to:
  `github_outbound`, `get_started_click`, `learn_article_click`, and
  `setup_path_click`.
- Keep Vercel Web Analytics for pageviews and use Umami as the only custom
  event sink when its tracker is available.
- Send only `placement`, `locale`, `context`, and a fixed
  `destination_category`.
- Restrict Umami to `wenlan.app`, exclude URL search parameters, and respect
  browser Do Not Track.
- Add a public website-analytics disclosure to
  `/docs/data-and-privacy`, explicitly separate from installed Wenlan product
  telemetry.
- Preserve every existing URL, canonical, sitemap entry, locale route,
  structured-data type, and `FAQPage` policy.

The correction never sends memory content, code, command contents, user paths,
search terms, names, email addresses, full URLs, query strings, or stable
account identifiers.

## Verification contract

- RED: the existing acquisition-event test must fail while it still requires
  Vercel custom events and lacks the hardened Umami attributes.
- GREEN: source contract and runtime interaction tests must prove all four
  normalized event names, their fixed destination categories, the bounded
  property set, and safe no-op behavior when Umami is unavailable.
- Production build, TypeScript, SEO, i18n, built technical SEO, and Goal
  verifier must pass.
- Rendered desktop and mobile checks must show the website-analytics
  disclosure without overflow, framework overlay, or relevant console errors.
- A runtime interaction test must intercept the analytics call rather than
  writing a synthetic production event. Rendered browser verification must
  exercise a tracked CTA, confirm navigation, and remain free of relevant
  console errors.
- After an approved deployment, the live tag must contain the hardened
  attributes and the deployed technical SEO floor must remain green.
- Actual Umami event totals remain manual/account-gated until authenticated
  dashboard or export access is available. Missing access is not zero events.

## Decision boundary

The user explicitly approved commit, Git push, PR creation, merge, automatic
Vercel deployment, and production verification at
`2026-07-26T03:07:04Z`. Synthetic production event generation and analytics
account mutation remain prohibited. GA4, request indexing, GSC validation,
Reddit or other external publication, OSS submission, paid acquisition, and
metric-definition changes remain out of scope.

## Local verification

- `pnpm test:seo` with the real Wenlan and wenlan-app source roots: 187/187.
- `pnpm test:i18n`: 53/53.
- `pnpm lint`, `pnpm seo:goal:check`, and `pnpm seo:weekly:sample`: pass.
- Production build: 211 static pages.
- `pnpm seo:technical:built`: 110 sitemap URLs, 14 checked HTML pages, seven
  noindex headers, 26 redirects, and no `FAQPage` across 114 built HTML files.
- Local built locale matrix: 19 expected HTTP 200 routes and five expected
  hard 404 routes.
- Rendered desktop and 390px mobile checks show the updated disclosure without
  horizontal overflow. A tracked Get Started CTA navigated to the expected
  route with no browser warning or error.
- Independent review: APPROVE with no P0-P2 findings.
- `git diff --check`: pass.
