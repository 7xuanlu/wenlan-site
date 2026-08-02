# Tool boundaries and document knowledge-base gate — 2026-08-01

## Decision

Publish one new English, zh-TW, and zh-CN workflow family for building a local
AI knowledge base from supported documents. The candidate passes the demand,
coverage, product-proof, and standalone-utility gates. At
`2026-08-02T00:36:22Z`, the user approved the exact GitHub publication,
automatic Vercel deployment, and read-only production-verification scope
recorded below; indexing and other excluded actions remain separately gated.

Use Vercel Web Analytics for visitor, referrer, page, and authenticated
referrer-to-page aggregates. Keep CTA events account-gated on the current plan.
Use OpenSEO only as an optional demand and SERP discovery source: the hosted
account is signed in, but its trial credits are exhausted and GSC is not
connected.

## OpenSEO authenticated account boundary

Captured from the signed-in `wenlan.app` project on 2026-08-01. No search,
audit, rank-tracking setup, GSC connection, purchase, or other account mutation
was performed.

| Surface | Account observation | Usable now |
| --- | --- | --- |
| Dashboard | `You've used all your credits` and an upgrade prompt | Existing results only |
| Keyword Research | Seven prior searches remain readable; new searches would consume unavailable credits | No new hosted research |
| GSC Insights | `Not connected`; offers `Connect with Google` | No authenticated Wenlan GSC data |
| Rank Tracking | No tracked domains; offers `Add Domain` | Not configured or verified |
| Site Audit | No audits; offers a 10–10,000-page crawl and optional Lighthouse | Not run or verified |
| AI & MCP | Exposes the hosted MCP URL, setup guides, and tool catalogue | Interface exists; live data calls remain subject to account credits and connection state |

The useful prior OpenSEO observations remain in
[`2026-08-01-openseo-evaluation.md`](./2026-08-01-openseo-evaluation.md).
OpenSEO is not a GSC substitute, and the account cannot currently produce
another free hosted keyword or SERP result.

## Vercel authenticated account boundary

Captured through Vercel CLI 52.0.0 against the linked `wenlan-site` project.
All calls were read-only and used the same complete `2026-07-03..2026-07-30`
range as the latest weekly evidence.

| Capability | Actual account result |
| --- | --- |
| Property visitors and pageviews | Available through `visits/count` |
| Page aggregates | Available through `visits/aggregate?by=requestPath` |
| Referrer aggregates | Available through `visits/aggregate?by=referrerHostname` |
| Page filter | `/learn` returned 105 visitors and 110 pageviews |
| Google → page aggregate | Available by filtering `referrerHostname eq 'google.com'` and grouping by `requestPath` |
| Page → referrer aggregate | Available by filtering `requestPath eq '/learn'` and grouping by `referrerHostname`; `/learn` returned 92 Google visitors and 13 direct visitors in this range |
| CTA custom events | Account-gated; `events/count` returned HTTP 402 and requires Pro or Enterprise |

The Google-filtered page result is not derived by joining two separate CSVs.
It is one authenticated aggregate query. For example, the same range returned
774 visitors for `/docs/configuration`, 287 for `/learn/mcp-memory-server`, 92
for `/learn`, and 21 for `/`, all with `google.com` applied as the request
filter. These native Vercel visitor counts are not GSC clicks, identified users,
or proof that Google caused a later signup, download, GitHub outbound, or star.

The deterministic fetcher now writes `vercel-source-pages.csv` beside the
existing page, referrer, and metadata files. The weekly report labels these
rows as authenticated source-to-page aggregates and preserves the causality
boundary. Umami is no longer required for this acquisition-page observation;
it remains optional if a free export becomes available. CTA event counts remain
manual/account-gated rather than inferred.

## New article candidate gate

Candidate family:

- English: `How to Build a Local AI Knowledge Base from Markdown, PDFs, and Obsidian`
- zh-TW: `如何用 Markdown、PDF 與 Obsidian 建立本地 AI 知識庫`
- zh-CN: `如何用 Markdown、PDF 与 Obsidian 建立本地 AI 知识库`
- Canonical family: `/learn/build-local-ai-knowledge-base-from-documents`

### 1. Inspectable demand provenance — pass

- OpenSEO's US `AI knowledge base` seed displayed 880 in its own third-party
  volume unit and exposed smaller builder, examples, open-source, tools,
  GitHub, and free modifiers.
- OpenSEO's Taiwan `AI 知識庫` seed displayed 210 in the same third-party unit.
- OpenSEO did not return a Simplified-Chinese result, so it is not evidence for
  zh-CN. The inspectable zh-CN community snapshot captured at
  `2026-07-29T04:29:56Z` supplies that independent provenance instead:
  Bilibili's `跟Karpathy学搭建AI知识库-附Obsidian实例` displayed `3.1万播放`
  ([source](https://www.bilibili.com/video/BV1mgQPBXEZp/)); its
  `Hermes+Obsidian+LLM wkii，构建AI知识库` displayed `8.0万播放`
  ([source](https://www.bilibili.com/video/BV16hZFB5ERM/)); and Juejin's
  `用 Obsidian 实现 LLM Wiki 知识库管理方法` displayed `2,053 reads`
  ([source](https://juejin.cn/post/7634711670124920882)). These native units
  remain separate and establish repeated Simplified-Chinese implementation
  wording, not search volume.
- The full captured table, including V2EX and additional Bilibili/Juejin
  observations, is preserved in
  [`2026-07-29-zh-cn-community-demand.md`](./2026-07-29-zh-cn-community-demand.md).
  Together with the English and zh-TW observations, it repeats the same job:
  build a local or open-source knowledge base from documents, Markdown, or an
  Obsidian-like vault, then make it usable by an AI agent.
- These observations nominate the experiment only. They are not authenticated
  Wenlan GSC impressions, clicks, or keyword-volume forecasts.

### 2. Repeated problem or high intent — pass

The modifier is an implementation request, not a broad definition. Independent
results discuss building from files, document ingestion, local control,
Markdown, and the gap between raw retrieval and maintained knowledge.

### 3. Clean Wenlan coverage gap — pass

The existing LLM Wiki and source-backed knowledge-base pages explain the
architecture and maintenance lifecycle. They do not own a focused
document-to-page recipe covering supported file types, idempotent source sync,
scanned-PDF limits, Obsidian's read-only boundary, and an end-to-end validation
loop. The new page links back to those canonicals instead of restating their
conceptual answer.

### 4. Maintained first-party proof — pass

Current Wenlan source and CLI documentation verify:

- `wenlan sources add <path>` registers a file or folder and syncs it now;
  repeating an already registered path resyncs it.
- Directory Sources support `.md`, `.txt`, and text-extractable `.pdf` files.
- Folders recurse through supported files.
- Obsidian vaults remain read-only sources and resync on demand.
- Image-only PDFs require OCR first, and arbitrary source-code files are not
  claimed as Directory Source inputs.
- The platform-specific setup guide separates macOS Apple Silicon, Linux, and
  Windows runtime installation, then requires connecting and verifying the
  current AI client.
- `/distill`, `/pages`, `/lint`, and `/curate` form the maintained Page and
  review loop in supported Wenlan plugin clients; MCP-only clients use the
  Wenlan tools exposed by their client rather than assuming slash commands.

### 5. Standalone utility — pass

The guide remains useful without choosing Wenlan: bound the source set, test a
known and unknown question, inspect ingestion counts, resync after a change,
verify citations, and expand only after one topic closes the full loop.

## Publication and measurement boundary

At `2026-08-02T00:36:22Z`, the user explicitly approved publication of this
exact article family and deterministic Vercel report support. The approval
covers commit, push, PR creation, merge, automatic Vercel deployment, and
read-only production verification. It does not cover request indexing, GSC
validation, paid OpenSEO actions, rank-tracking setup, external publication,
paid acquisition, synthetic events, or metric-definition changes.

The approved change occupies the single production slot until Vercel
production is verified. Its measurement clock starts from production
completion, not commit, PR, or merge time.

### Immutable experiment contract

- Experiment ID: `EXP-2026-08-01-document-knowledge-base-guide`
- Hypothesis: A source-backed implementation guide that turns Markdown,
  text-extractable PDFs, and an Obsidian vault into a maintained local AI
  knowledge base will earn qualified search exposure across English, zh-TW,
  and zh-CN without replacing the existing conceptual LLM-wiki and
  source-backed-knowledge-base pages.
- Baseline: The three target URLs do not exist in the authenticated
  `2026-07-03..2026-07-30` GSC or Vercel exports and are reported as
  unavailable, not zero. Same-range GSC property totals are 10 clicks and 660
  impressions; visible-query totals are 2 clicks and 111 impressions; the
  visibility gap is 8 clicks and 549 impressions. Vercel reports 1,468
  visitors and 1,745 pageviews. GitHub REST separately reports 46 stars.
- Minimum exposure: Each locale independently requires at least 5 GSC
  target-page impressions within the first 28 complete days after that exact
  locale URL is first confirmed crawled or indexed. Locale impressions are
  never pooled.
- Success: After its own minimum exposure, a locale earns at least 1 GSC
  target-page click or reaches page-average position 20.0 or better while the
  technical, source-accuracy, and locale floors remain green.
- Failure: After 28 complete post-index days and its own minimum exposure, a
  locale has 0 clicks and page-average position worse than 20.0, or the
  publication creates a technical, source-accuracy, or rendered-layout
  regression.
- Inconclusive: A locale below 5 target-page impressions, without a confirmed
  post-change crawl/index date, or without 28 complete post-index days cannot
  be called a search failure. Missing rows remain unavailable rather than
  zero.
- Stop: Hold or repair the experiment if a supported-source claim becomes
  false, the new page overlaps an existing canonical's intent, any canonical,
  robots, sitemap, hreflang, noindex, redirect, schema, or direct-200 contract
  regresses, or a second controller edits the same canonical family.
- Readouts: 24h verifies publication integrity only; 7d reports early
  source-native evidence; W2 applies the per-locale exposure guard; W4 applies
  the 28-day success/failure/inconclusive contract when eligible; W8 is a
  post-campaign scale, refresh, merge, stop, or inconclusive follow-up.

## Local verification

- `pnpm test:seo`: 222 passed, 0 failed.
- `node --test --import tsx scripts/i18n-contract.test.mjs`: 62 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm build`: passed and generated 219 static pages.
- `pnpm seo:technical:built`: passed with 117 sitemap URLs, 21 required
  canonicals, 21 checked HTML pages, and no `FAQPage` schema in 121 built HTML
  files.
- Built-server locale check: 25 intended routes returned 200 and four
  unsupported localized routes returned the expected 404.
- Rendered QA covered English, zh-TW, and zh-CN at 393px and 1280px widths.
  Canonicals, indexability, Article and BreadcrumbList schema, CJK phrase
  wrapping, code blocks, and the visible CTA passed without a blocking issue.
- `pnpm seo:goal:check` and `git diff --check`: passed.

These results establish local readiness only. They do not establish a Vercel
production deployment, a new Google crawl, indexing, impressions, clicks, or
visitor lift.
