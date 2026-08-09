# Tool-selection homepage links — prelaunch audit

Captured: 2026-08-09T16:07:17Z
Experiment: `EXP-2026-08-09-tool-selection-home-links`
Status: publication approved; awaiting commit, PR, deployment, and production verification.

## Evidence baseline

- Latest completed weekly evidence: `docs/seo-audits/2026-08-07-weekly-seo.md`, authenticated range `2026-07-10..2026-08-06`.
- GSC property total: 8 clicks, 874 impressions, average position 12.1.
- GSC visible-query total: 2 clicks, 172 impressions; visibility gap: 6 clicks, 702 impressions.
- The three tool-selection URLs have no privacy-visible GSC page or query-page row in that capture. Missing rows remain unavailable, not zero.
- GSC URL Inspection showed all three targets indexed with the exact canonical and post-publish crawl timestamps: English `2026-08-02T14:20:50Z`, zh-TW `2026-08-03T10:19:09Z`, zh-CN `2026-08-03T13:05:24Z`.
- Vercel target-page observations in the same report range: English 2 visitors / 6 pageviews, zh-TW 2 / 2, zh-CN 1 / 1. No authenticated source-to-page aggregate was available.
- A rendered 120-URL sitemap crawl at `2026-08-09T15:49:23Z` found one distinct non-self inbound source per target: its same-locale Learn hub.

## Candidate

Add one same-locale homepage acquisition link to each existing tool-selection guide. The target URLs, target copy, metadata, canonicals, schema, sitemap, and experiment measurement boundary do not change. At mobile width, the new item occupies its own row; at `sm` and above, all three acquisition links remain inline.

Built-output inventory confirms exactly two non-self source pages per target after the candidate: the same-locale homepage and Learn hub.

## Verification

- RED: focused homepage acquisition-link test failed before the new links existed; the mobile row guard also failed before the responsive class existed.
- GREEN: focused acquisition-link test 1/1.
- `pnpm test:i18n`: 63/63.
- `pnpm lint`: pass.
- `pnpm build`: pass; 223 static pages generated; IndexNow correctly skipped outside production.
- `pnpm seo:technical:built`: pass — 26 redirects, 7 noindex headers, 120 sitemap URLs, 24 required URLs, 24 HTML checks, 124 pages without `FAQPage`.
- `pnpm i18n:technical:built`: pass — 27 expected 200 routes and 4 expected 404 routes.
- `pnpm test:seo`: 219/222 pass. The three failures are the pre-existing release-version contract drift: GitHub now reports public stable `0.15.7` while the website release/download surface remains `0.15.3`. The candidate-specific test passes.
- Render QA: English, zh-TW, and zh-CN at 393x1800 and 1440x1000. The new item is fully visible on its own mobile row and remains inline on desktop; no candidate-induced CJK break or overflow remains.

### Publication-gate rerun — 2026-08-09T19:23:37Z

- Fresh production-build render QA covered all six locale/viewport combinations: English, zh-TW, and zh-CN at exact 393x852 mobile and 1440x1000 desktop viewports.
- Functional/design-system pass: high confidence. All three links are visible, route to the exact same-locale target, use the existing homepage component and tokens, and introduce no new interaction or layout system.
- Visual/CJK pass: high confidence. Desktop changes are confined to the intended third-link area. Mobile changes are confined to the intended new row and resulting downward shift of the following Download section. No horizontal overflow, clipping, tofu, or semantic CJK phrase split was observed.
- Final prelaunch verdict: good; no blocking correction required.

## Approval boundary

At `2026-08-09T19:13:25Z`, the user explicitly approved commit, push, PR creation, merge, automatic Vercel deployment, and read-only production verification for this exact three-locale homepage-link scope. IndexNow force, request indexing, GSC validation, unrelated website changes, paid actions, synthetic events, analytics mutation, and metric-definition changes remain excluded.
