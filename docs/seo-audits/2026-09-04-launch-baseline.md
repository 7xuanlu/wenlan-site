# Pre-launch measurement capture — 2026-09-04

This is the user's requested launch-readiness capture, generated with the weekly pipeline in a separate directory; it is not a replacement for the scheduled Friday report. No website change, post, or video was published by this capture.

## Capture limitations and launch decision

- Requested GSC/Vercel range: 2026-08-07..2026-09-03. Vercel uses complete UTC days; GSC response metadata does not establish trailing-day availability. No post-launch claim is supported.
- GitHub counters captured at 2026-09-04T03:58:05.835Z; traffic captured at 2026-09-04T03:56:29.859Z. Native units stay separate. Current stars: 62, not an attributed conversion count.
- The v0.17.7 website-linked assets below are the prepared branch's selection. The live website was still linked to v0.17.6 when checked. The 13-count subtotal is not evidence of clicks from this unpublished branch.
- Resend capture at 2026-09-04T03:58:53.300Z used credentials available through `vercel env run`, which reported loading local fallback configuration. Six contact-property definitions exist; the sensitive production enable flag and a real production contact write remain unchecked. The two contacts have no acquisition properties; no test contacts were created.
- Vercel custom events returned HTTP 402 (paid plan required). Umami Google login with Qi-Xuan Lu reaches an unfinished data-region/plan setup, not the existing website dashboard; no region or plan was selected. The existing property's login remains unresolved. Missing event observations are unavailable, not zero; no upgrade is required by this work.
- Rows such as zero Reddit referrals or zero llms.txt hits below mean no matching rows in the returned limited export, not proof of complete zero traffic. Query rows are privacy-filtered; page impressions are by-page aggregates and can exceed property totals.
- No source-to-star, source-to-download, or source-to-contact causality can be established. Platform audience and completed installs remain unknown.

### GitHub traffic, independently captured

GitHub returned daily traffic dates 2026-08-20..2026-09-02: 182 repository views, 58 unique visitors. This is not the GSC/Vercel range. Referrer rows below are source-native rolling aggregates; their unique counts are not additive.

| Referrer | Repository views | Unique visitors |
| --- | ---: | ---: |
| github.com | 34 | 12 |
| t.co | 26 | 15 |
| l.threads.com | 7 | 5 |
| Google | 6 | 1 |
| m.facebook.com | 2 | 1 |
| zby.github.io | 2 | 1 |

These establish referring surfaces, not the post or person responsible for a star. Current-stargazer dates cannot reconstruct unstarring or historical net growth.

### Prepared measurement and video work

- [42 trilingual launch URLs](../launch-links.md) cover 14 candidate channels; preparation does not authorize publication.
- Local code preserves sanitized first landing for 30 minutes in per-tab storage, enriches optional Umami events with finite campaign labels and known release-asset IDs, and records video play-button clicks. Production collection remains unverified until approved deployment and real observations.
- Vercel export now includes all valid observed referrer hostnames instead of a search-only list: 7 referrer rows and 24 source/page rows returned. The generated summary below displays only its top rows; raw CSV holds the returned rows, not an invented complete audience.
- The user's `Documents/Wenlan Demo Clips` contains English, zh-Hant and zh-Hans v17 launch videos. English is 84.096 seconds, 1920x1200, SHA-256 `e32b2203622e1d2e606a0b2ccad46ea3f17ae2875401b65aef813f0f9d0033ef`, matching the Sep 3 publish kit's external-store file. YouTube Studio is logged into `Qi-Xuan 奇軒`; upload visibility awaits confirmation. The old v0.9 website demo must not be relabeled as v0.17.7 footage.

Raw captures: `/tmp/wenlan-launch-2026-09-04`. This interpreted record preserves the decision; raw generated data is not committed. Use the native report windows on each later capture, and record the actual publication timestamp before comparing any deltas.

### Local verification and handoff

- Worktree: `/tmp/wenlan-launch-measurement`, branch `codex/launch-measurement-video`, based on main `19d9c23177277d927134ae4cb07f851b3df03093`. Original dirty worktrees are untouched.
- `pnpm seo:goal:check`: PASS; frozen targets and controller unchanged.
- `pnpm test:seo`: 267/267; includes 9 new launch-measurement tests. `pnpm test:i18n`: 81/81. `pnpm lint`: PASS.
- `pnpm build`: PASS after allowing the existing Google Fonts download. Local postbuild explicitly skipped IndexNow. `pnpm seo:technical:built`: PASS, 168 sitemap URLs, 26 redirects, 7 intentional noindex header rules, no FAQPage in 172 HTML outputs.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3127 pnpm i18n:technical:built`: PASS, 39 expected-200 and 4 expected-404 routes. Initial attempts before server access were failed checks, not passes.
- Inline local browser QA: English/zh-TW/zh-CN download pages at 393px and 1280px; homepage first screens at 393px after entrance animations. No new clipping or action overlap observed in these views. No production click or signup was generated. This does not certify a new video, which is still unpublished.
- Remaining: approve YouTube visibility for the selected channel/files; resolve the existing Umami property's login; verify the sensitive Resend production flag and one explicitly consented real signup; separately approve website commit/push/PR/merge/deployment. No external publication occurred in this turn.

Generated from Search Console API. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | 2026-09-04 |
| Date range | 2026-08-07 to 2026-09-03 |
| GSC data source | Search Console API |
| Evidence fingerprint | sha256:73abedb5208471bfaa89eadf2ce416cf149eef0a0ab7a552433702d3715e3128 |
| Property clicks | 11 |
| Property impressions | 975 |
| Property CTR | 1.13% |
| Property average position | 24.5 |
| Visible query table clicks | 2 |
| Visible query table impressions | 238 |
| Visible query table CTR | 0.84% |
| Visible query table average position | 31.5 |
| Query visibility gap | 9 clicks; 737 impressions |
| Visible page table clicks | 11 |
| Visible page table impressions | 1299 |
| Top query groups | Other (105), Brand/entity (58), AI knowledge base / wiki (37), Comparisons (21) |
| Top page | /learn |
| Analytics data source | Vercel Web Analytics API |
| Analytics date range | 2026-08-07 to 2026-09-03 |
| Analytics visitors | 570 |
| Analytics pageviews | 1040 |
| AI referrals | 1 visit from 1 referrer |
| Reddit referrals | 0 visits from 0 referrers |
| llms.txt hits | 0 |
| CTA custom events | account-gated: Pro or Enterprise plan required |
| GitHub captured at | 2026-09-04T03:58:05.835Z |
| GitHub stars | 62 |
| Website-linked v0.17.7 asset downloads | 13 |
| All release asset downloads | 2129 |
| Resend fetched at | 2026-09-04T03:58:53.300Z |
| Resend total contacts | 2 point-in-time |
| Resend contacts in range | 0 |
| Resend attributed contacts in range | 0 |

## Vercel Analytics Evidence

Authenticated Web Analytics API data for the linked Wenlan Vercel project. Property totals come from the count endpoint; tables show the top aggregate rows returned by the API.

### Pages

| Page | Visitors | Pageviews |
| --- | ---: | ---: |
| `/zh-CN/learn` | 162 | 162 |
| `/Others` | 56 | 120 |
| `/` | 87 | 103 |
| `/zh-CN` | 22 | 31 |
| `/zh-TW` | 14 | 24 |
| `/download` | 10 | 21 |
| `/learn/source-backed-wiki-pages-ai-work` | 5 | 18 |
| `/docs` | 15 | 17 |
| `/docs/get-started` | 11 | 16 |
| `/learn` | 13 | 13 |
| `/docs/changelog` | 9 | 13 |
| `/learn/build-competitive-intelligence-knowledge-base` | 3 | 13 |

### Referrers

| Referrer | Visitors | Pageviews | Channel |
| --- | ---: | ---: | --- |
| (direct) | 537 | 999 | Other |
| google.com | 31 | 31 | Other |
| bing.com | 2 | 2 | Other |
| github.com | 2 | 5 | Other |
| duckduckgo.com | 1 | 2 | Other |
| gemini.google.com | 1 | 1 | AI referral |
| kagi.com | 1 | 1 | Other |

### Acquisition source → page

These are authenticated Vercel aggregates filtered by one referrer hostname and grouped by page. They support source-to-page observation for the listed rows, but do not identify users or prove that a source caused a later action.

| Source | Page | Visitors | Pageviews |
| --- | --- | ---: | ---: |
| google.com | `/` | 9 | 9 |
| google.com | `/docs/configuration` | 4 | 4 |
| google.com | `/learn` | 3 | 3 |
| google.com | `/learn/ai-agent-memory-types` | 2 | 2 |
| google.com | `/learn/claude-code-memory` | 2 | 2 |
| google.com | `/learn/distilled-wiki-pages-ai-memory` | 2 | 2 |
| google.com | `/zh-CN` | 2 | 2 |
| github.com | `/docs/daily-workflow` | 2 | 2 |
| google.com | `/docs/commands` | 1 | 1 |
| google.com | `/docs/security` | 1 | 1 |
| google.com | `/learn/build-local-ai-knowledge-base-from-documents` | 1 | 1 |
| google.com | `/learn/local-first-ai-memory` | 1 | 1 |
| google.com | `/learn/wenlan-vs-basic-memory` | 1 | 1 |
| google.com | `/zh-CN/learn/fix-pdf-ingestion-ai-knowledge-base` | 1 | 1 |
| google.com | `/zh-CN/learn/test-ai-knowledge-base-retrieval-after-changes` | 1 | 1 |
| bing.com | `/` | 1 | 1 |
| bing.com | `/learn/codex-claude-code-shared-memory` | 1 | 1 |
| github.com | `/docs/get-started` | 1 | 1 |
| github.com | `/learn/ai-work-memory` | 1 | 1 |
| github.com | `/zh-CN/learn/source-backed-research-knowledge-base` | 1 | 1 |

## GitHub Release Evidence

GitHub release asset counts are cumulative point-in-time counters captured at 2026-09-04T03:58:05.835Z. They are not the same unit as Umami outbound clicks, email contacts, stars, visitors, or GSC clicks, and this report does not infer a person-level join or causality.

| Asset | Linked from wenlan.app | Cumulative downloads |
| --- | --- | ---: |
| `latest.json` | no | 1 |
| `SHA256SUMS` | no | 1 |
| `wenlan-cli-darwin-arm64.tar.gz` | no | 0 |
| `wenlan-darwin-arm64.tar.gz` | yes | 1 |
| `wenlan-linux-arm64.tar.gz` | yes | 1 |
| `wenlan-linux-x64.tar.gz` | yes | 7 |
| `wenlan-mcp-darwin-arm64.tar.gz` | no | 1 |
| `wenlan-windows-x64.zip` | yes | 2 |
| `Wenlan_0.17.7_aarch64.dmg` | yes | 0 |
| `Wenlan_0.17.7_x64-setup.exe` | yes | 2 |
| `Wenlan_0.17.7_x64-setup.exe.sig` | no | 0 |
| `Wenlan_aarch64.app.tar.gz` | no | 0 |
| `Wenlan_aarch64.app.tar.gz.sig` | no | 0 |

## Resend Signup Evidence

Resend contact counts are native contact records, not Umami events, Vercel sessions, GSC clicks, GitHub downloads, or identified cross-source users. This report contains aggregate counts only and intentionally omits email addresses.

| Field | Value |
| --- | ---: |
| All contacts at capture | 2 |
| Subscribed contacts at capture | 2 |
| Contacts created in 2026-08-07–2026-09-03 | 0 |
| Attributed contacts created in range | 0 |

| Acquisition property | Value | Contacts in range |
| --- | --- | ---: |
| - | No attributed contacts in range | 0 |

## Top Actions

Within this authenticated GSC report, only technical blockers, protected AI knowledge-base/wiki rows, and visible Obsidian + Claude/Claude Code/MCP query rows are nominated here. Generic Obsidian and other rows remain visible in the complete queues as measurement evidence. Separately, inspectable Trends plus independent corroboration may nominate a pre-GSC campaign candidate through the full candidate gate.

1. **query-page-review** — `agent knowledge base`: Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing.
2. **query-page-review** — `knowledge base consulting`: Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing.
3. **title-meta-refresh** — `/learn/ai-work-memory-vs-knowledge-base`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
4. **title-meta-refresh** — `/learn/build-local-ai-knowledge-base-from-documents`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
5. **title-meta-refresh** — `/zh-CN/learn/distilled-wiki-pages-ai-memory`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
6. **title-meta-refresh** — `/zh-TW/learn/choose-ai-knowledge-base-tool`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
7. **title-meta-refresh** — `/zh-CN/learn`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
8. **title-meta-refresh** — `/zh-CN/learn/source-backed-wiki-pages-ai-work`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.

## Query Action Queue

| Query | Query group | Observed GSC page | Configured target | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `agent knowledge base` | AI knowledge base / wiki | `/learn/when-ai-agent-should-query-knowledge-base` | `/learn/ai-work-memory-vs-knowledge-base` | 12 | 0 | 0.00% | 60.9 | query-page-review | Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing. |
| `superlocalmemory` | Comparisons | `/learn/wenlan-vs-superlocal-memory` | `/learn/wenlan-vs-basic-memory` | 7 | 0 | 0.00% | 8.7 | query-page-review | Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing. |
| `knowledge base consulting` | AI knowledge base / wiki | `/learn/build-client-project-knowledge-base-for-consulting` | `/learn/ai-work-memory-vs-knowledge-base` | 4 | 0 | 0.00% | 17.0 | query-page-review | Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing. |
| `wenlan web3 payment` | Brand/entity | `/docs/changelog` (2)<br>`/download` (1) | `/` | 3 | 0 | 0.00% | 3.7 | query-page-review | Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing. |
| `claude-mem vs` | Comparisons | `/learn/wenlan-vs-claude-mem` | `/learn/wenlan-vs-claude-mem` | 7 | 0 | 0.00% | 8.7 | title-meta-refresh | Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer. |
| `claude mem vs` | Other | `/learn/wenlan-vs-claude-mem` | - | 4 | 0 | 0.00% | 8.0 | title-meta-refresh | Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer. |
| `llm wiki` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 6 | 1 | 16.67% | 26.5 | internal-link-refresh | Page has demand but needs stronger internal links and supporting context. |
| `fusellm` | Other | `/learn` | - | 41 | 0 | 0.00% | 47.6 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `wenlan` | Brand/entity | `/docs/architecture` (19)<br>`/download` (8)<br>`/` (6)<br>`/zh-TW` (2)<br>`/docs/data-and-privacy` (2) | `/` | 36 | 0 | 0.00% | 5.0 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `site:useorigin.app` | Brand/entity | `/docs/data-and-privacy` (5)<br>`/learn/wenlan-vs-claude-mem` (5)<br>`/learn/wenlan-vs-basic-memory` (5)<br>`/learn/wenlan-vs-superlocal-memory` (5)<br>`/docs` (4)<br>`/about` (4)<br>`/zh-CN` (4)<br>`/docs/core-concepts` (4)<br>`/learn/ai-work-memory` (4)<br>`/docs/get-started` (4)<br>`/learn/source-backed-wiki-pages-ai-work` (3)<br>`/` (2)<br>`/learn` (2)<br>`/zh-CN/docs` (2)<br>`/zh-CN/about` (2)<br>`/learn/mcp-memory-server` (2)<br>`/zh-CN/docs/get-started` (2)<br>`/docs/diagnostics-and-issue-reports` (1)<br>`/learn/wenlan-vs-obsidian-ai-memory` (1) | `/` | 9 | 0 | 0.00% | 6.7 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `文澜` | Other | `/zh-TW` (7)<br>`/zh-CN` (2) | - | 8 | 0 | 0.00% | 5.8 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `karpathy llm wiki` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 6 | 0 | 0.00% | 55.0 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `types of ai agent memory` | AI work memory | `/learn/ai-agent-memory-types` | `/learn/ai-agent-memory-types` | 6 | 0 | 0.00% | 78.5 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `wenlan web` | Brand/entity | `/` (5)<br>`/docs/data-and-privacy` (2)<br>`/download` (2)<br>`/docs/architecture` (1)<br>`/learn/wenlan-vs-basic-memory` (1) | `/` | 5 | 1 | 20.00% | 1.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `durable memory for ai agents` | Other | `/learn/ai-agent-memory-types` | - | 4 | 0 | 0.00% | 46.3 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `wenlanmwep3` | Other | `/download` (4)<br>`/docs` (2)<br>`/docs/changelog` (2)<br>`/docs/platforms` (1)<br>`/docs/updates-and-uninstall` (1) | - | 4 | 0 | 0.00% | 4.3 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `what does "local-first ai memory" mean?` | Architecture/trust | `/learn/local-first-ai-memory` | `/learn/local-first-ai-memory` | 4 | 0 | 0.00% | 4.3 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `文瀾` | Other | `/zh-TW` | - | 4 | 0 | 0.00% | 5.8 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `llm-viewer` | Other | `/learn` | - | 3 | 0 | 0.00% | 64.3 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `memory layer for ai agents` | Other | `/learn/ai-agent-memory-types` | - | 3 | 0 | 0.00% | 66.7 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `agent memory vs claude-mem` | Comparisons | `/learn/wenlan-vs-claude-mem` | `/learn/wenlan-vs-claude-mem` | 2 | 0 | 0.00% | 13.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `andrej karpathy knowledge base` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/ai-work-memory-vs-knowledge-base` | 2 | 0 | 0.00% | 71.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `base llm` | Other | `/learn` | - | 2 | 0 | 0.00% | 63.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `basic memory` | Comparisons | `/learn/wenlan-vs-basic-memory` | `/learn/wenlan-vs-basic-memory` | 2 | 0 | 0.00% | 29.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm registry` | Other | `/learn` | - | 2 | 0 | 0.00% | 80.5 | wait | No immediate content action. Keep measuring before changing the page. |
| `weknora` | Other | `/learn` | - | 2 | 0 | 0.00% | 85.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `wenlan web3` | Brand/entity | `/about` | `/` | 2 | 0 | 0.00% | 3.5 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `wenlanvwep` | Other | `/download` (2)<br>`/docs` (1) | - | 2 | 0 | 0.00% | 7.5 | wait | No immediate content action. Keep measuring before changing the page. |
| `wiki llm` | Other | `/learn/distilled-wiki-pages-ai-memory` | - | 2 | 0 | 0.00% | 13.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `workflow memory` | Other | `/learn/ai-work-memory` | - | 2 | 0 | 0.00% | 73.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `agent memory types` | AI work memory | `/learn/ai-agent-memory-types` | `/learn/ai-agent-memory-types` | 1 | 0 | 0.00% | 41.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `agent working memory` | Other | `/learn/ai-work-memory` | - | 1 | 0 | 0.00% | 76.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `ai agent memory types` | AI work memory | `/learn/ai-agent-memory-types` | `/learn/ai-agent-memory-types` | 1 | 0 | 0.00% | 76.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `ai memory types` | AI work memory | `/learn/ai-agent-memory-types` | `/learn/ai-agent-memory-types` | 1 | 0 | 0.00% | 68.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `ai working memory` | Other | `/learn/ai-work-memory` | - | 1 | 0 | 0.00% | 45.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `basellm` | Other | `/learn` | - | 1 | 0 | 0.00% | 36.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `basic memory ai` | Comparisons | `/learn/wenlan-vs-basic-memory` | `/learn/wenlan-vs-basic-memory` | 1 | 0 | 0.00% | 11.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude mem ai` | Other | `/learn/wenlan-vs-claude-mem` | - | 1 | 0 | 0.00% | 26.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude-mem` | Comparisons | `/learn/wenlan-vs-claude-mem` | `/learn/wenlan-vs-claude-mem` | 1 | 0 | 0.00% | 9.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude.md in codex` | Cursor/Codex workflows | `/learn/coding-agent-source-backed-knowledge-base` | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 51.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `does codex read claude md` | Cursor/Codex workflows | `/learn/coding-agent-source-backed-knowledge-base` | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 53.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `http://127.0.0.1:7878` | Setup/troubleshooting | `/docs/platforms` | `/docs/troubleshooting` | 1 | 0 | 0.00% | 75.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `kaparthy llm wiki` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 46.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `karpathy wiki llm` | Other | `/learn/distilled-wiki-pages-ai-memory` | - | 1 | 0 | 0.00% | 6.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `knowledge base wiki` | AI knowledge base / wiki | `/learn/source-backed-wiki-pages-ai-work` | `/learn/ai-work-memory-vs-knowledge-base` | 1 | 0 | 0.00% | 100.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `knowledge discovery for ai agents` | Other | `/learn/when-ai-agent-should-query-knowledge-base` | - | 1 | 0 | 0.00% | 52.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm client` | Other | `/learn` | - | 1 | 0 | 0.00% | 37.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm knowledge base andrej karpathy` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/ai-work-memory-vs-knowledge-base` | 1 | 0 | 0.00% | 73.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `llm viewer` | Other | `/learn` | - | 1 | 0 | 0.00% | 62.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm wiki cursor` | AI knowledge base / wiki | `/learn` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 10.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `llm wiki for codebase` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 7.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm wiki karpathy` | AI knowledge base / wiki | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 67.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm wiki v2` | AI knowledge base / wiki | `/learn` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 50.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `lm studio reranker` | Other | `/learn` | - | 1 | 0 | 0.00% | 57.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `memclaw` | Other | `/learn/wenlan-vs-claude-mem` | - | 1 | 0 | 0.00% | 79.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `memory for ai agents` | Other | `/learn/ai-agent-memory-types` | - | 1 | 0 | 0.00% | 60.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `munder difflin` | Other | `/learn` | - | 1 | 0 | 0.00% | 85.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `nvk/llm-wiki` | Other | `/learn` | - | 1 | 0 | 0.00% | 51.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `samuraigpt/llm-wiki-agent` | Other | `/learn` | - | 1 | 0 | 0.00% | 54.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `sudolang` | Other | `/learn` | - | 1 | 0 | 0.00% | 64.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `super local memory` | Comparisons | `/learn/wenlan-vs-superlocal-memory` | `/learn/wenlan-vs-superlocal-memory` | 1 | 0 | 0.00% | 11.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `the state of agent wikis` | Other | `/learn/distilled-wiki-pages-ai-memory` | - | 1 | 0 | 0.00% | 9.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `type of agent memory` | AI work memory | `/learn/ai-agent-memory-types` | `/learn/ai-agent-memory-types` | 1 | 0 | 0.00% | 84.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `wamalength` | Other | `/learn` | - | 1 | 0 | 0.00% | 58.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `wenlan technology` | Brand/entity | `/download` | `/` | 1 | 0 | 0.00% | 11.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `wenlan wep3` | Brand/entity | `/docs/architecture` | `/` | 1 | 0 | 0.00% | 1.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `wenlan wep3 charge` | Brand/entity | `/learn/wenlan-vs-superlocal-memory` | `/` | 1 | 0 | 0.00% | 7.0 | wait | Observed GSC page differs from the configured target, but the visible query is below the action floor. Preserve the routing observation without editing. |
| `wenlanawep3` | Other | `/docs/get-started` | - | 1 | 0 | 0.00% | 1.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `wenlanvwep3` | Other | `/download` | - | 1 | 0 | 0.00% | 7.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `wenlanwep3` | Other | `/download` | - | 1 | 0 | 0.00% | 5.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `working memory in ai` | Other | `/learn/ai-work-memory` | - | 1 | 0 | 0.00% | 39.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `working memory llm` | Other | `/learn/ai-work-memory` | - | 1 | 0 | 0.00% | 56.0 | wait | No immediate content action. Keep measuring before changing the page. |

## Acquisition Hierarchy Validation

Only privacy-visible protected acquisition rows are evaluated. A split or mismatch is a routing-review signal, not proof of cannibalization; an absent row is unavailable, not zero. The query-minus-join visibility gap remains explicit, and no locale or source is pooled.

| Layer | Query | Observed owner pages | Configured owner | Query impressions | Joined owner impressions | Query-minus-join visibility gap | Ownership state | Decision |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| Core acquisition | `agent knowledge base` | `/learn/when-ai-agent-should-query-knowledge-base` | `/learn/ai-work-memory-vs-knowledge-base` | 12 | 12 | 0 | visible mismatch | query-page-review |
| Core acquisition | `knowledge base consulting` | `/learn/build-client-project-knowledge-base-for-consulting` | `/learn/ai-work-memory-vs-knowledge-base` | 4 | 4 | 0 | visible mismatch | query-page-review |
| Core acquisition | `andrej karpathy knowledge base` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/ai-work-memory-vs-knowledge-base` | 2 | 2 | 0 | visible mismatch | wait — below 3-impression joined floor |
| Core acquisition | `knowledge base wiki` | `/learn/source-backed-wiki-pages-ai-work` | `/learn/ai-work-memory-vs-knowledge-base` | 1 | 1 | 0 | visible mismatch | wait — below 3-impression joined floor |
| Core acquisition | `llm knowledge base andrej karpathy` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/ai-work-memory-vs-knowledge-base` | 1 | 1 | 0 | visible mismatch | wait — below 3-impression joined floor |
| Core acquisition | `llm wiki cursor` | `/learn` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 1 | 0 | visible mismatch | wait — below 3-impression joined floor |
| Core acquisition | `llm wiki v2` | `/learn` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 1 | 0 | visible mismatch | wait — below 3-impression joined floor |
| Core acquisition | `karpathy llm wiki` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 6 | 6 | 0 | visible aligned | keep |
| Core acquisition | `llm wiki` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 6 | 6 | 0 | visible aligned | keep |
| Core acquisition | `kaparthy llm wiki` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 1 | 0 | visible aligned | wait — below 3-impression joined floor |
| Core acquisition | `llm wiki for codebase` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 1 | 0 | visible aligned | wait — below 3-impression joined floor |
| Core acquisition | `llm wiki karpathy` | `/learn/distilled-wiki-pages-ai-memory` | `/learn/distilled-wiki-pages-ai-memory` | 1 | 1 | 0 | visible aligned | wait — below 3-impression joined floor |

## GSC Click Opportunity Queue

Deterministic order: protected AI knowledge-base/wiki and modifier-qualified Obsidian acquisition rows first; within each lane, zero-click query-page mismatches precede striking-distance pages, page-one snippet reviews, internal-link candidates, and evidence gaps. Existing generic-memory cohorts remain `measuring-only`; `Brand/entity` and unclassified `Other` rows remain visible in the full query table but do not nominate this queue. Metrics remain in native GSC units; this is not a forecast or composite score.

| Rank | Page | Campaign lane | Page impressions | Page clicks | Page CTR | Page avg position | Qualified avg position | Qualified zero-click query impressions | Observed visible queries | Next move | Why |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| 1 | `/learn/distilled-wiki-pages-ai-memory` | eligible | 59 | 1 | 1.69% | 34.0 | 55.4 | 12 | `karpathy llm wiki` (6)<br>`andrej karpathy knowledge base` (2)<br>`llm wiki for codebase` (1) | query-page-review | A visible qualified query lands on a different page than its configured target. Resolve intent and internal-link routing before editing copy. |
| 2 | `/learn/when-ai-agent-should-query-knowledge-base` | eligible | 22 | 0 | 0.00% | 49.1 | 60.9 | 12 | `agent knowledge base` (12) | query-page-review | A visible qualified query lands on a different page than its configured target. Resolve intent and internal-link routing before editing copy. |
| 3 | `/learn/build-client-project-knowledge-base-for-consulting` | eligible | 5 | 0 | 0.00% | 15.0 | 17.0 | 4 | `knowledge base consulting` (4) | query-page-review | A visible qualified query lands on a different page than its configured target. Resolve intent and internal-link routing before editing copy. |
| 4 | `/learn` | eligible | 190 | 0 | 0.00% | 50.6 | 30.0 | 2 | `llm wiki cursor` (1)<br>`llm wiki v2` (1) | evidence-gap-review | No single configured owner reaches the 3-impression joined floor. Keep the distinct intent mismatches separate and wait. |
| 5 | `/learn/source-backed-wiki-pages-ai-work` | eligible | 7 | 0 | 0.00% | 35.7 | 100.0 | 1 | `knowledge base wiki` (1) | evidence-gap-review | No single configured owner reaches the 3-impression joined floor. Keep the distinct intent mismatches separate and wait. |
| 6 | `/learn/ai-work-memory-vs-knowledge-base` | eligible | 27 | 0 | 0.00% | 11.7 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 7 | `/learn/build-local-ai-knowledge-base-from-documents` | eligible | 11 | 0 | 0.00% | 8.6 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 8 | `/zh-CN/learn/distilled-wiki-pages-ai-memory` | eligible | 11 | 0 | 0.00% | 18.1 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 9 | `/zh-TW/learn/choose-ai-knowledge-base-tool` | eligible | 4 | 0 | 0.00% | 12.8 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 10 | `/zh-CN/learn/choose-ai-knowledge-base-tool` | eligible | 3 | 0 | 0.00% | 4.3 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 11 | `/zh-TW/learn/build-local-ai-knowledge-base-from-documents` | eligible | 2 | 0 | 0.00% | 3.5 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |
| 12 | `/zh-CN/learn` | eligible | 1 | 0 | 0.00% | 17.0 | - | 0 | - | evidence-gap-review | Qualified visible demand is below the 3-impression joined floor. Preserve the evidence gap without editing. |

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| `/learn/wenlan-vs-claude-mem` | 68 | 0 | 0.00% | 19.1 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/download` | 62 | 0 | 0.00% | 8.4 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/about` | 49 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/get-started` | 36 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/coding-agent-source-backed-knowledge-base` | 33 | 0 | 0.00% | 29.9 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/ai-work-memory` | 28 | 0 | 0.00% | 22.4 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/ai-work-memory-vs-knowledge-base` | 27 | 0 | 0.00% | 11.7 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/codex-claude-code-shared-memory` | 27 | 0 | 0.00% | 10.6 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/prevent-multi-agent-knowledge-conflicts` | 20 | 0 | 0.00% | 9.8 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/changelog` | 19 | 0 | 0.00% | 13.3 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/platforms` | 11 | 0 | 0.00% | 22.5 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/build-local-ai-knowledge-base-from-documents` | 11 | 0 | 0.00% | 8.6 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/wenlan-vs-obsidian-ai-memory` | 11 | 0 | 0.00% | 13.6 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn/distilled-wiki-pages-ai-memory` | 11 | 0 | 0.00% | 18.1 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/updates-and-uninstall` | 6 | 0 | 0.00% | 18.7 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/build-client-project-knowledge-base-for-consulting` | 5 | 0 | 0.00% | 15.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/cursor-claude-code-shared-memory` | 4 | 0 | 0.00% | 8.3 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/how-to-add-mcp-memory-to-cursor` | 4 | 0 | 0.00% | 17.3 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-TW/learn/choose-ai-knowledge-base-tool` | 4 | 0 | 0.00% | 12.8 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/mcp-memory-server` | 3 | 0 | 0.00% | 10.3 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/persistent-project-context-for-ai-agents` | 3 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/wenlan-vs-mcp-memory-service` | 3 | 0 | 0.00% | 27.7 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/local-git-history-ai-memory` | 2 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/docs/get-started` | 2 | 0 | 0.00% | 19.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/releases-and-versioning` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/spaces` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/ai-coding-agent-loses-context` | 1 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/how-to-give-codex-persistent-memory` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/wenlan-vs-notion-ai` | 1 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn` | 1 | 0 | 0.00% | 17.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn/build-product-research-knowledge-base-for-prd` | 1 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn/build-sre-incident-knowledge-base` | 1 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn/coding-agent-source-backed-knowledge-base` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-CN/learn/source-backed-wiki-pages-ai-work` | 1 | 0 | 0.00% | 18.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-TW/docs/get-started` | 1 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-TW/learn/distilled-wiki-pages-ai-memory` | 1 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/` | 63 | 3 | 4.76% | 14.8 | internal-link-refresh | Page has search demand. Add internal links from stronger related pages. |
| `/learn/ai-agent-memory-types` | 43 | 0 | 0.00% | 41.7 | internal-link-refresh | Existing Learn page has search demand but weak ranking. Add links from stronger related pages before rewriting content. |
| `/learn/when-ai-agent-should-query-knowledge-base` | 22 | 0 | 0.00% | 49.1 | internal-link-refresh | Existing Learn page has search demand but weak ranking. Add links from stronger related pages before rewriting content. |
| `/docs/configuration` | 7 | 1 | 14.29% | 26.7 | internal-link-refresh | Page has search demand. Add internal links from stronger related pages. |
| `/learn` | 190 | 0 | 0.00% | 50.6 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vs-superlocal-memory` | 96 | 0 | 0.00% | 7.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/distilled-wiki-pages-ai-memory` | 59 | 1 | 1.69% | 34.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs` | 51 | 0 | 0.00% | 6.1 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vs-basic-memory` | 47 | 1 | 2.13% | 6.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/data-and-privacy` | 40 | 0 | 0.00% | 4.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/architecture` | 31 | 0 | 0.00% | 5.1 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN` | 22 | 2 | 9.09% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW` | 21 | 0 | 0.00% | 5.2 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/core-concepts` | 16 | 0 | 0.00% | 6.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/mcp-memory-server-localhost-7878` | 14 | 0 | 0.00% | 4.9 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-memory-provenance` | 10 | 0 | 0.00% | 7.1 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/local-first-ai-memory` | 8 | 0 | 0.00% | 7.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/source-backed-wiki-pages-ai-work` | 7 | 0 | 0.00% | 35.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/diagnostics-and-issue-reports` | 5 | 0 | 0.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-agent-handoff-loop` | 5 | 0 | 0.00% | 5.6 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/fix-pdf-ingestion-ai-knowledge-base` | 4 | 1 | 25.00% | 5.8 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/test-ai-knowledge-base-retrieval-after-changes` | 4 | 1 | 25.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/learn/prevent-multi-agent-knowledge-conflicts` | 4 | 0 | 0.00% | 6.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/api-examples` | 3 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/review-and-trust` | 3 | 0 | 0.00% | 32.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/choose-ai-knowledge-base-tool` | 3 | 0 | 0.00% | 46.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/claude-code-memory` | 3 | 0 | 0.00% | 56.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/about` | 3 | 0 | 0.00% | 7.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/docs` | 3 | 0 | 0.00% | 6.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/choose-ai-knowledge-base-tool` | 3 | 0 | 0.00% | 4.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/wenlan-vs-obsidian-ai-memory` | 3 | 0 | 0.00% | 6.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/security` | 2 | 1 | 50.00% | 134.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/capture-quality` | 2 | 0 | 0.00% | 1.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/claude-code-plugin` | 2 | 0 | 0.00% | 2.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/evaluation` | 2 | 0 | 0.00% | 5.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/glossary` | 2 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/project-scope` | 2 | 0 | 0.00% | 33.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-agent-memory-local-vs-cloud` | 2 | 0 | 0.00% | 4.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/build-sre-incident-knowledge-base` | 2 | 0 | 0.00% | 6.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/test-ai-knowledge-base-retrieval-after-changes` | 2 | 0 | 0.00% | 6.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/build-local-ai-knowledge-base-from-documents` | 2 | 0 | 0.00% | 66.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/verify-ai-knowledge-base-citations` | 2 | 0 | 0.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/about` | 2 | 0 | 0.00% | 6.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/learn/build-local-ai-knowledge-base-from-documents` | 2 | 0 | 0.00% | 3.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/learn/when-ai-agent-should-query-knowledge-base` | 2 | 0 | 0.00% | 6.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/agent-profiles` | 1 | 0 | 0.00% | 2.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/backup-and-migration` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/commands` | 1 | 0 | 0.00% | 2.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/environment-variables` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/faq` | 1 | 0 | 0.00% | 2.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/memory-types` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/source-backed-pages` | 1 | 0 | 0.00% | 1.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/upgrade-notes` | 1 | 0 | 0.00% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-agent-project-status-handoff` | 1 | 0 | 0.00% | 6.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/build-product-research-knowledge-base-for-prd` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/project-scope-ai-memory` | 1 | 0 | 0.00% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/review-before-trust-ai-memory` | 1 | 0 | 0.00% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/source-backed-research-knowledge-base` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-for-claude-code` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vscode-mcp-workflow` | 1 | 0 | 0.00% | 59.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/docs` | 1 | 0 | 0.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/learn/wenlan-vs-obsidian-ai-memory` | 1 | 0 | 0.00% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

The acquisition queue centers AI knowledge bases, LLM wiki, source-backed wiki, and knowledge bases for AI agents. In this GSC-derived queue, Obsidian enters Top Actions only when a visible query pairs it with Claude, Claude Code, or MCP. The campaign may still act earlier when inspectable Trends, independent corroboration, a clean coverage gap, maintained Wenlan proof, and standalone utility pass the complete candidate gate. Generic memory rows remain visible evidence and measuring cohorts, but they do not nominate the next acquisition experiment.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [ ] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Run `pnpm seo:vercel:fetch -- --date YYYY-MM-DD` before the weekly report; keep custom CTA events marked account-gated when the Vercel plan blocks them.
- [ ] Run `pnpm seo:github:fetch -- --date YYYY-MM-DD` before the weekly report; treat release download counts as cumulative point-in-time GitHub evidence, not a date-range conversion metric.
- [ ] Run `pnpm seo:resend:fetch -- --date YYYY-MM-DD` before the weekly report; keep contact counts in native Resend units and never write email addresses into SEO artifacts.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD` and manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-09-11.
