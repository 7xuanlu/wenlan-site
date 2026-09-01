# Business Metric Definition Knowledge Base — local prelaunch verification

- Captured at: `2026-09-01T04:54:48Z`
- Experiment: `EXP-2026-09-01-business-metric-definition-knowledge-base-locales`
- Status: locally verified; not published

## Owned search task

Turn approved Markdown, text, and text-extractable PDF metric specifications
into one cited, versioned, human-reviewed definition record. The record keeps
the business definition, non-executable formula text, grain, dimensions,
inclusions, exclusions, owner, source IDs and revisions, review state, and the
definition it supersedes.

The English owner targets `data dictionary` and `metric definition`; zh-TW
uses the natural `指標定義` and `資料字典` expressions; zh-CN uses `指标定义`,
`数据字典`, and `指标口径`. The source-native demand and overlap evidence is
in `2026-08-31-business-metrics-glossary-demand-gate.md`. Trends indexes remain
request-relative observations, not keyword volume.

## Routes

- `/learn/build-business-metric-definition-knowledge-base`
- `/zh-TW/learn/build-business-metric-definition-knowledge-base`
- `/zh-CN/learn/build-business-metric-definition-knowledge-base`

Each locale has same-locale inbound paths from the source-backed AI knowledge
base, citation-verification, and multi-agent conflict owners. The separately
gated authority path is one same-locale Workflow guide link in the Wenlan
source README after the website routes are live and verified; it is not part of
this candidate.

## Capability boundary

The page does not claim CSV or YAML ingestion, SQL execution, warehouse or BI
connectivity, metric calculation, lineage, data-quality monitoring, permission
management, approval workflow, or automatic conflict reconciliation. It keeps
conflicting approved definitions visible until a named domain owner reviews
them.

## Verification

- `pnpm seo:goal:check`: pass.
- `pnpm seo:scenario:check`: pass; 18 trilingual families and 168 sitemap
  owners.
- `pnpm test:goal`: pass, 54/54.
- `pnpm test:seo`: pass, 256/256, against the published Wenlan `v0.17.6`
  source checkout.
- `pnpm test:i18n`: pass, 81/81.
- `pnpm lint`: pass.
- `pnpm build`: pass; 287 static pages.
- `pnpm seo:technical:built`: pass; 168 sitemap URLs, 24 required pages, 26
  redirects, seven noindex header rules, robots, and no `FAQPage` in 172 built
  HTML pages.
- Running-build locale matrix: 39 expected 200 routes and four intentional 404
  routes passed.
- In-app Browser QA at `1280x900` and exact `393x852`: all three routes had
  one H1, exact self-canonical, reciprocal en-US / zh-TW / zh-CN / x-default
  hreflang, `Article` and `BreadcrumbList`, visible FAQ without `FAQPage`, a
  loaded product-evidence image, working evidence anchor and FAQ expansion, no
  framework overlay, no console warning or error, and no horizontal overflow.
  Every protected `指標定義` / `指标定义` span occupied one client rect. The
  desktop zh-CN screenshot was re-read after `document.fonts.ready`; the stable
  layout had no overlap.

QA screenshots are temporary local artifacts under
`/private/tmp/wenlan-business-metric-qa/` and are intentionally not committed.

## Approval boundary

The candidate is prepared, not published. Commit, push, pull request, merge,
automatic Vercel deployment, production verification, the Wenlan source README
link, request indexing, GSC validation, analytics mutation, maintainer contact,
paid actions, synthetic events, and every other external action require their
own explicit approval.
