# LLM Wiki authority-first execution gate

Captured: `2026-08-25T05:07:10Z`. This record turns the highest-leverage demand
decision into an executable boundary. It does not start a new URL, change the
live article, request indexing, publish an authority placement, or claim that a
link will improve rank.

## Decision

Do not rewrite `/learn/distilled-wiki-pages-ai-memory` yet. The English page
clears the current performance floor, but Google has not crawled the version
already deployed on `2026-08-02T04:39:55Z`. A further rewrite would stack a new
copy treatment on top of an unseen version and break the protected post-crawl
cooldown and attribution guard.

The next useful work is authority-first: prepare exact links from maintained,
first-party or exact-topic surfaces to the existing implementation guide, then
publish any of them only after separate approval.

## Source-native gate evidence

Authenticated OpenSEO URL Inspection for `sc-domain:wenlan.app` returned:

| Field | Observation |
| --- | --- |
| URL | `https://wenlan.app/learn/distilled-wiki-pages-ai-memory` |
| Coverage | `Submitted and indexed` |
| Indexing | `INDEXING_ALLOWED` |
| Fetch | `SUCCESSFUL` |
| Google canonical | exact inspected URL |
| User canonical | exact inspected URL |
| Crawled as | mobile |
| Last crawl | `2026-07-29T01:09:29Z` |

The last crawl is earlier than the current production version. The existing
page already contains the direct Karpathy LLM Wiki answer, an architecture,
five-minute protocol, starter schema, acceptance test, six-command workflow,
verification loop, source-to-answer example, failure modes, comparisons,
maintained sources, and visible FAQ. The current problem is therefore not a
missing generic explanation.

Authenticated GSC for `2026-07-25..2026-08-22` remains separate:

- English page: 21 impressions, 1 click, 4.76% CTR, average position 25.33.
- Visible English queries: 7 impressions and 1 click.
- Exact `llm wiki`: 4 impressions, 1 click, 25% CTR, average position 11.5.
- zh-TW page: 1 impression; visible query rows unavailable.
- zh-CN page: 6 impressions; visible query rows unavailable.

These values satisfy the English 20-page-impression and three-qualified-query
floors. They do not satisfy the independent Mandarin floors and they do not
replace the missing confirmed post-deploy crawl or 28-complete-day cooldown.

## Prepared authority paths

### 1. Wenlan source repository

The maintained `7xuanlu/wenlan` README already explains the LLM-wiki lineage
in English, Traditional Chinese, and Simplified Chinese, but it links to the
Karpathy and Rohitg00 notes and `nashsu/llm_wiki`, not to Wenlan's inspectable
implementation guide.

Prepare a small three-file source-repository change after separate approval:

- `README.md`: add `Implementation guide` beside the current Wenlan LLM-wiki
  foundation paragraph, linking to
  `https://wenlan.app/learn/distilled-wiki-pages-ai-memory`.
- `README.zh-Hant.md`: add a natural `實作指南` link to
  `https://wenlan.app/zh-TW/learn/distilled-wiki-pages-ai-memory`.
- `README.zh-Hans.md`: add a natural `实现指南` link to
  `https://wenlan.app/zh-CN/learn/distilled-wiki-pages-ai-memory`.

This connects maintained first-party product proof to the existing search
owner without adding another website URL. The repository change must preserve
the three-language README translation contract and pass its own checks.

### 2. Existing Awesome LLM Wiki listing

The live `gavischneider/awesome-llm-wiki` README already lists Wenlan and links
to `https://github.com/7xuanlu/wenlan`. The exact proposed follow-up is to add
one neutral companion `Implementation guide` link to the existing Wenlan row,
not a second entry. Before any external change, recheck the contribution rules,
duplicate state, current maintainer response, and whether an in-place follow-up
would be useful rather than promotional. Upstream mutation and maintainer
contact remain separately approval-gated.

### 3. Current article refresh, held

Keep the canonical, H1, metadata, Mandarin copies, schema, and internal links
unchanged. Reinspect the English URL after a later source-native GSC boundary.
Only nominate a copy refresh when Google confirms a crawl of the current
production version and 28 complete cooldown days have elapsed, while the page
still clears the 20-page-impression and three-qualified-query floors.

## Rejected work

- No new retrieval-regression URL: it is a valid lower-demand backlog item.
- No duplicate `llm wiki` query-variant page: the current canonical owns it.
- No extra same-intent internal-link shuffle: the page already has contextual
  inbound paths and is not orphaned.
- No Mandarin copy rewrite: each locale remains below its independent exposure
  floor.
- No repeated request indexing: the user has not approved it for this URL and
  queue acceptance would not prove a crawl or ranking gain.

## Next decision

The highest-leverage executable publication is the three-language Wenlan
source-repository link change. It is a small authority bridge to the existing
page, not another article. Commit, push, PR, merge, deployment, and the external
Awesome LLM Wiki follow-up require explicit approval in their own repository
scopes.
