# LLM Wiki Schema and Template Candidate — 2026-08-11

## Decision

Nominate one bounded refresh of the existing English, zh-TW, and zh-CN
`distilled-wiki-pages-ai-memory` canonical family. Do not create another URL.
Do not prepare or publish the refresh while the independently verified
`v0.15.8` release-accuracy correction occupies the production slot.

This record is demand discovery and a candidate gate. It is not GSC evidence,
keyword volume, a rank claim, an experiment start, or publication approval.

## Inspectable demand observations

The repeated job is more specific than another general "LLM Wiki vs RAG"
article: people want a usable schema or template, the smallest file structure,
and an ingest, query, and lint loop they can verify.

- [Karpathy's LLM-wiki idea file](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f),
  English, read `2026-08-11`: defines the schema as a `CLAUDE.md` or
  `AGENTS.md` contract for structure, conventions, ingest, query, and
  maintenance. The file intentionally leaves exact implementation details to
  the user's domain.
- [jackwener/llm-wiki](https://github.com/jackwener/llm-wiki), English,
  read `2026-08-11`: the maintained repository provides one initialization
  command, compact `CLAUDE.md` and `AGENTS.md` entry files, a separate wiki
  purpose and schema, an append-only log, and on-demand ingest, query, lint,
  and research skills. GitHub REST reports 94 stars and repository update time
  `2026-08-11T01:30:46Z`; these are repository units, not search demand.
- [Hjarni's LLM-wiki CLAUDE.md template](https://hjarni.com/blog/llm-wiki-claude-md-template),
  English, published `2026-06-18`, observed `2026-08-11`: directly answers
  the copy-paste schema and annotated-page job.
- [Reddit: token-efficient Karpathy LLM-wiki](https://www.reddit.com/r/ObsidianMD/comments/1sqfe7m/i_have_refactored_the_karpathy_llmwiki_and_it_is/),
  English, observed `2026-08-11`: the post reports 88 votes in Reddit's native
  score unit and separates a compact always-loaded file from on-demand ingest,
  lint, and query skills. The discussion explicitly asks which template to
  use.
- [Reddit: first LLM-wiki test drive](https://www.reddit.com/r/LocalLLM/comments/1tio3p1/llmwiki_first_test_drive_am_i_doing_this_right/),
  English, observed `2026-08-11`: the user copied the idea file into
  `CLAUDE.md`, ingested `.md`, `.pdf`, and `.txt`, then asked whether the setup
  and token use were correct. This is a repeated implementation and
  verification problem, not a popularity metric.
- [nashsu/llm_wiki Chinese README](https://github.com/nashsu/llm_wiki/blob/main/README_CN.md),
  Simplified Chinese, read `2026-08-11`: independently describes raw, wiki,
  schema, index, log, ingest, query, lint, scenario templates, and source
  traceability. GitHub REST reports 16,207 stars and repository update time
  `2026-08-12T06:38:08Z`; these remain repository units.
- [Simplified-Chinese Claude Code + Obsidian walkthrough](https://www.youtube.com/watch?v=CTyx5XF2KVA),
  Simplified Chinese, published `2026-04-14`, observed `2026-08-11`: YouTube
  reports 7,070 views and 216 likes in its native units. Its chapters cover
  the three-layer design, `CLAUDE.md`, ingest, query, lint, and a downloadable
  starter repository.
- [Traditional-Chinese LLM Wiki workflow notes](https://pradabear.medium.com/%E7%AD%86%E8%A8%98-karpathy-%E5%BC%8F-llm-wiki-%E5%B7%A5%E4%BD%9C%E6%B5%81%E5%AF%A6%E8%B8%90-d59db6de5452)
  and an independent [Traditional-Chinese schema explanation](https://medium.com/%40bryanchen.homigin/%E5%BE%9E-chatgpt-%E9%80%B2%E5%85%A5%E5%88%B0-claude-code-codex-%E4%B9%8B%E5%89%8D-%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E6%A0%B8%E5%BF%83%E5%B7%AE%E7%95%B0-3e9c573e894d),
  observed `2026-08-11`, separately describe the Karpathy workflow and its
  schema layer. Neither exposes a reliable native query-volume unit. Existing
  Taiwan Trends and OpenSEO evidence remains category support only; this
  record does not manufacture a Traditional-Chinese template volume.

## Current Wenlan evidence and coverage

Authenticated GSC for `2026-07-14..2026-08-10` reports 7 property clicks and
869 impressions. Visible-query totals are 2 clicks and 174 impressions,
leaving a 5-click and 695-impression visibility gap. No visible template or
schema query exists; missing visible rows are unavailable rather than zero.

The existing LLM Wiki family has the following page aggregates:

| Locale | GSC clicks | GSC impressions | Page-average position | Vercel visitors | Vercel pageviews |
| --- | ---: | ---: | ---: | ---: | ---: |
| English | 0 | 5 | 14.2 | 10 | 15 |
| zh-TW | 0 | 1 | 8.0 | 5 | 9 |
| zh-CN | 0 | 3 | 10.3 | 16 | 21 |

The GSC rows and Vercel rows keep their native units and do not form a
source-to-page or causal join.

All three existing pages already explain Karpathy, AI knowledge bases, RAG,
Sources, atomic knowledge, maintained Pages, stale state, review, the
five-minute Wenlan workflow, and the non-endorsement boundary. They do not
give a concrete starter schema checklist or explain the Wenlan-specific
boundary that users should not paste a generic wiki-management schema into
every client session.

The clean gap is therefore a refresh of the existing page family, not a new
template URL. The standalone answer should:

1. show the minimum vendor-neutral schema fields: purpose and scope, immutable
   source boundary, page ownership, naming and linking rules, ingest, query,
   lint, update log, citation requirement, and stale or review behavior;
2. explain that `CLAUDE.md` or `AGENTS.md` should stay compact while detailed
   operation procedures load only when needed;
3. give one small acceptance test: ingest one harmless source, answer one
   question with a citation, run lint, change the source, and confirm stale or
   review behavior;
4. map those requirements to Wenlan's built-in Sources, typed Memories,
   Pages, citations, refresh, `/distill`, `/lint`, and `/curate` instead of
   falsely claiming that Wenlan requires users to author its internal schema.

## First-party proof and limitation

Maintained Wenlan source proves the answer:

- the root README defines Sources, Memories, and Pages and says Wenlan extends
  Karpathy's schema with built-in Page structure, provenance, citations,
  refresh, ownership, and review;
- `docs/technical-foundations.md` documents typed `MemorySchema` validation
  and explicitly says Page structure is governed separately rather than by a
  user-editable schema;
- the documented daily loop exposes `/brief`, `/capture`, `/recall`,
  `/handoff`, `/distill`, `/pages`, `/lint`, and `/curate`;
- the distill and lint skills expose stale-page, source-support, citation,
  review, and non-mutating diagnostic boundaries.

The page must not offer a fabricated Wenlan `CLAUDE.md` template, claim a
user-editable Page schema, promise arbitrary source-code ingestion, or claim
that the generic Karpathy structure is Wenlan's storage layout.

## Candidate gate

| Gate | Result | Evidence |
| --- | --- | --- |
| Inspectable provenance | Pass | URLs, capture date, language, publish dates where exposed, Reddit score, YouTube views and likes, and GitHub native counts are preserved. |
| Repeated problem or high intent | Pass | Independent template articles, maintained OSS, Reddit setup and token questions, and a Chinese walkthrough repeat the schema and starter-workflow job. |
| Clean Wenlan coverage gap | Pass for a refresh; fail for a new URL | Existing pages own the category and comparison intent but omit a concrete starter-schema checklist and acceptance test. |
| Maintained Wenlan proof | Pass with limitation | First-party source proves built-in schema, provenance, citations, refresh, commands, and review, but not a user-authored Wenlan Page schema. |
| Standalone utility | Pass | The checklist and acceptance test help readers evaluate any LLM-wiki setup before Wenlan is introduced. |

## Proposed experiment contract

Candidate ID: `EXP-2026-08-11-llm-wiki-schema-template-refresh`.

- Scope: refresh only the existing English, zh-TW, and zh-CN LLM Wiki
  canonical family; keep the current URL, original `datePublished`, canonical,
  hreflang, sitemap membership, Article and BreadcrumbList schema, maintained
  sources, visible FAQ, and absence of `FAQPage`.
- Baseline: English 0 clicks/5 impressions, zh-TW 0/1, zh-CN 0/3 in GSC for
  `2026-07-14..2026-08-10`; Vercel target rows remain separate at English
  10/15, zh-TW 5/9, and zh-CN 16/21 visitors/pageviews.
- Minimum exposure: 10 GSC target-page impressions per locale after a
  confirmed post-deploy crawl; locales are never pooled.
- Success per locale: at minimum exposure, that locale records at least one
  target-page click, or a privacy-visible qualified template/schema query
  receives at least 5 impressions on that intended locale canonical without a
  visible owner split.
- Failure: at minimum exposure and after a confirmed post-deploy crawl, a
  locale records zero clicks and no privacy-visible qualified query reaches 5
  impressions by W4.
- Inconclusive: the locale remains below minimum exposure, lacks a confirmed
  post-deploy crawl, or available data mixes another edit to the same
  canonical.
- Stop: another controller edits the same canonical, the technical or locale
  floor regresses, first-party product truth changes, or the template framing
  implies an unsupported user-authored Wenlan schema.
- Readouts: technical 24h; GSC/Vercel 7d, W2, W4, and W8, using complete
  source-native windows and independent locale guards.

## Next action

The `v0.15.8` technical correction is now merged in PR #123 and
production-verified, so the production slot is open. The exact three-language
refresh is locally prepared and passes the Goal verifier, 222 SEO tests, 63
i18n tests, TypeScript, the 223-page production build, built technical checks,
the 27-200 plus 4-404 locale matrix, diff hygiene, and fresh 393px and 1440px
English, zh-TW, and zh-CN rendered QA. The built pages preserve exact
self-canonicals, `index, follow`, reciprocal locale alternates, original
publication dates, Article and BreadcrumbList schema, and zero `FAQPage`.
All four maintained references resolve with HTTP 200.

Seek separate approval for commit, push, PR, merge, automatic Vercel
deployment, and read-only production verification of this exact refresh.
Request indexing, GSC validation, external publication, paid action,
synthetic events, analytics mutation, and metric-definition changes remain
outside that scope.
