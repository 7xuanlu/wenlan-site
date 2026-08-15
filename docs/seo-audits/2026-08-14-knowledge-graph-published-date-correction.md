# Knowledge Graph published-date correction — 2026-08-14

## Decision

Restore the existing `/docs/knowledge-graph` TechArticle publication date to
`2026-07-09` while retaining `dateModified: 2026-08-13`.

This is a bounded schema correction, not a new search experiment. It changes
no visible copy, URL, canonical, sitemap membership, locale behavior, schema
type, source link, or performance baseline.

## Evidence

- Before PR #126, the page used `updatedAt: DOCS_UPDATED_AT`, whose immutable
  value was `2026-07-09`. Because the shared renderer uses
  `page.publishedAt ?? page.updatedAt`, production emitted
  `datePublished: 2026-07-09`.
- PR #126 changed the record to `updatedAt: "2026-08-13"` without adding
  `publishedAt`. The live page therefore emits both `datePublished` and
  `dateModified` as `2026-08-13`.
- The approved candidate contract required the publication date to remain
  stable. The experiment's technical stop criterion includes a schema
  regression.

## Bounded change

- Add `publishedAt: "2026-07-09"` to the existing knowledge-graph record.
- Retain `updatedAt: "2026-08-13"`.
- Add a focused regression assertion for both values.

## Local verification

- RED: the focused knowledge-graph test failed because `publishedAt` was
  absent.
- GREEN: the same focused test passes after the correction.
- `pnpm test:seo` passes 223/223 with the explicit Wenlan and wenlan-app
  source roots required by this isolated worktree.
- `pnpm lint`, `pnpm seo:goal:check`, and `git diff --check` pass.
- `pnpm build` generates 223 static pages; non-production postbuild correctly
  skips IndexNow.
- `pnpm seo:technical:built` passes 120 sitemap URLs, 24 required pages,
  redirects, noindex headers, robots, sitemap-wide `FAQPage` absence, and
  old-URL exclusion.
- The built target retains exact canonical and `index, follow`, contains one
  TechArticle, emits `datePublished: 2026-07-09` and
  `dateModified: 2026-08-13`, and contains no `FAQPage`.

## Approval boundary

Local preparation is allowed by the approved Goal contract. Commit, push, PR
creation, merge, automatic Vercel deployment, and live read-only verification
were explicitly approved by the user at `2026-08-15T00:20:38Z` for this exact
bounded correction and its required campaign records. Request indexing, GSC
validation, external publication, paid action, synthetic events, analytics
mutation, and metric changes remain excluded.
