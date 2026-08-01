# Core Acquisition URL Inspection

**Captured:** `2026-08-01T21:47:09Z`

**Authority:** authenticated Google Search Console URL Inspection API for
`sc-domain:wenlan.app`

**Status:** read-only observation; no indexing request or validation submitted

## Result

All six existing LLM Wiki and source-backed AI knowledge-base URLs are
reported as `Submitted and indexed`, have exact Google-selected self-
canonicals, and allow indexing. The existing English and zh-TW Obsidian URLs
have the same healthy indexed state. The new zh-CN Obsidian route is still
`URL is unknown to Google` and has no crawl timestamp.

The practical constraint is crawl freshness, not another missing article or a
canonical/indexability defect. Google has not yet fetched several already
published refreshes.

| URL | GSC coverage | Last crawl | Interpretation against production history |
| --- | --- | --- | --- |
| `/learn/distilled-wiki-pages-ai-memory` | Submitted and indexed | `2026-07-29T01:09:29Z` | Post-2026-07-27 implementation-guide refresh |
| `/zh-TW/learn/distilled-wiki-pages-ai-memory` | Submitted and indexed | `2026-07-29T01:10:28Z` | Predates the 2026-08-01 zh-TW refresh |
| `/zh-CN/learn/distilled-wiki-pages-ai-memory` | Submitted and indexed | `2026-07-15T03:40:31Z` | Predates the 2026-07-29 zh-CN refresh |
| `/learn/source-backed-wiki-pages-ai-work` | Submitted and indexed | `2026-07-29T01:09:32Z` | Predates the 2026-07-30 knowledge-base refresh |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | Submitted and indexed | `2026-07-30T08:08:05Z` | Post-content-deploy crawl of the 2026-07-30 refresh |
| `/zh-CN/learn/source-backed-wiki-pages-ai-work` | Submitted and indexed | `2026-07-30T08:08:51Z` | Post-content-deploy crawl of the 2026-07-30 refresh |
| `/learn/wenlan-vs-obsidian-ai-memory` | Submitted and indexed | `2026-07-28T21:52:49Z` | Predates the 2026-07-29 English Obsidian refresh |
| `/zh-TW/learn/wenlan-vs-obsidian-ai-memory` | Submitted and indexed | `2026-07-25T06:56:25Z` | Predates the 2026-08-01 zh-TW knowledge-base refresh |
| `/zh-CN/learn/wenlan-vs-obsidian-ai-memory` | URL is unknown to Google | none | New 2026-08-01 locale route; no crawl yet |

For every indexed row, GSC returned `PASS`, `ALLOWED`,
`INDEXING_ALLOWED`, `SUCCESSFUL`, and an exact match between the user and
Google canonical. The unknown zh-CN Obsidian row returned no canonical,
sitemap, referring URL, fetch, or crawl observation; these absent fields are
not converted into fabricated values.

## Decision

Do not rewrite these pages and do not create another overlapping article from
this observation. The current titles and content already answer the protected
LLM Wiki, AI knowledge-base, source-backed wiki, and Obsidian integration
intents. The next search action is a fixed, approval-gated URL Inspection
request batch for URLs whose meaningful content has not been fetched:

1. `/zh-CN/learn/wenlan-vs-obsidian-ai-memory` — new and unknown to Google.
2. `/zh-TW/learn/wenlan-vs-obsidian-ai-memory` — indexed, but last crawl
   predates the August 1 refresh.
3. `/learn/wenlan-vs-obsidian-ai-memory` — indexed, but last crawl predates the
   July 29 refresh.
4. `/zh-CN/learn/distilled-wiki-pages-ai-memory` — indexed, but last crawl
   predates the July 29 refresh by fourteen days.

Do not repeat requests for the English source-backed page or zh-TW LLM Wiki
page: both already received approved requests in the existing campaign, and a
repeat request does not create a stronger queue priority. The two Mandarin
source-backed knowledge-base pages already have post-refresh crawl evidence.

Queue acceptance, if later approved and returned, will remain only a GSC
operation result. It will not establish a new crawl, indexing success, rank,
traffic lift, click lift, or causality.

## Approval boundary

This read used authenticated GSC data only. No request indexing, GSC
validation, website edit, push, PR, merge, deployment, external publication,
paid acquisition, synthetic event, or account mutation was performed.
