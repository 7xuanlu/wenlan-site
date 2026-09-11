# English LLM Wiki crawl refresh — 2026-08-26

Captured at `2026-08-26T03:14:12Z`. This is a read-only GSC URL Inspection
observation for the existing English owner. It does not request indexing,
test the live URL, validate a coverage issue, change the page, or infer search
performance.

## Account and tool boundary

- OpenSEO project `wenlan.app` is authenticated as
  `h164654156465@gmail.com` and remains connected to
  `sc-domain:wenlan.app`.
- OpenSEO reports that all hosted credits are used. Its GSC Insights surface
  exposes no current URL Inspection control, so it did not provide the crawl
  result below.
- Google Search Console was therefore read directly in the existing signed-in
  `Qi-Xuan Lu (h164654156465@gmail.com)` Chrome session. No submission button
  was used.

## Source-native URL Inspection result

Inspected URL:
`https://wenlan.app/learn/distilled-wiki-pages-ai-memory`

| Field | GSC observation |
| --- | --- |
| Coverage | `URL is on Google` |
| Page indexing | `Page is indexed` |
| Sitemap | `https://wenlan.app/sitemap.xml` |
| Last crawl | `Jul 28, 2026, 6:09:29 PM` in the signed-in UI, equivalent to the already recorded `2026-07-29T01:09:29Z` UTC observation |
| Crawled as | Googlebot smartphone |
| Crawl allowed | Yes |
| Page fetch | Successful |
| Indexing allowed | Yes |
| User canonical | exact inspected URL |
| Google canonical | inspected URL |
| HTTPS | page is served over HTTPS |
| Breadcrumbs | one valid item detected |

The crawl remains earlier than the current production version deployed at
`2026-08-02T04:39:55Z`. Google therefore still has no confirmed crawl of that
version. The 28-complete-day post-crawl cooldown has not started, even though
the latest authenticated performance evidence separately records 21 page
impressions, one click, and seven visible qualified-query impressions for the
English owner in `2026-07-25..2026-08-22`.

## Decision

Keep the canonical, title, H1, copy, schema, internal links, and Mandarin
owners unchanged. Do not repeat Request Indexing. The exact locally verified
first-party README bridge remains the highest-leverage executable proposal
because it can add a maintained source-to-guide authority path without
stacking another treatment on the uncrawled page version. Commit, push, PR,
merge, and publication of that README patch remain separately approval-gated.

The Search Console Overview page also displayed `16 total web search clicks`,
`117 indexed pages`, and `31 not indexed pages` at capture. The click card's
date range was not exposed in the inspected DOM, so it is an unspecified-range
UI observation and must not replace the fixed 28-day GSC Goal metric. The
indexing counts are a current property snapshot, not performance or causality.
