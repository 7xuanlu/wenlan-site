# Localized Acquisition Gap — 2026-07-19

## Decision

Queue one Traditional Chinese localization candidate:

- English source: `/learn/wenlan-vs-obsidian-ai-memory`
- Proposed zh-TW route:
  `/zh-TW/learn/wenlan-vs-obsidian-ai-memory`
- Working title:
  `Obsidian + Claude Code 的 AI 筆記：何時需要 Agent Memory？`
- Status: candidate-gate PASS, queued, not active
- Current-window action: none

This is a localized counterpart to an existing English article, not a new
English topic. It must not start before the active
`EXP-2026-07-18-claude-code-memory-refresh` reaches its predeclared readout and
the next weekly data window is eligible.

Do not create a zh-CN counterpart from the Taiwan evidence. The current route,
hreflang, static-param, and sitemap model must first support locale-specific
article availability.

## Why this gap wins

### Native evidence

| Source | Observation | Native unit | Provenance | Use |
| --- | --- | --- | --- | --- |
| Google Trends | Taiwan `Obsidian` moved from a first-13-week average of `24.3` to a recent-13-week average of `69.6` in the past-12-month ecosystem comparison. Related rising observations included `obsidian claude code` `+3,350%`, `obsidian and claude` `+2,400%`, and `obsidian claude` `+1,500%`. | Request-relative `0–100` index and Trends rising-query percentages, not search volume | Signed-in official Explore UI, captured 2026-07-18; interpreted in `docs/seo-audits/2026-07-18-trends-demand-discovery.md` | Validates a modifier-qualified Obsidian and Claude bridge, not generic `Obsidian`. |
| GSC | The existing English `/learn/wenlan-vs-obsidian-ai-memory` page had `4` impressions, `0` clicks, and average position `4.5` in the latest authenticated weekly report. | GSC page impressions, clicks, and average position | `sc-domain:wenlan.app`, complete days ending 2026-07-17; `docs/seo-audits/2026-07-17-weekly-seo.md` | Shows that the existing article already earns search exposure. It is not a locale-specific traffic claim. |
| Reddit | `Claude Code + Obsidian?` had `+239` votes and repeated workflows around structured Markdown, session continuity, decisions, captures, and NotebookLM as a different source-Q&A layer. `Claude Code and Obsidian as an AI-maintained second brain` had `+358` votes and discussed maintained wikis plus knowledge rot. | Reddit post/comment scores as displayed | Captured 2026-07-19: <https://www.reddit.com/r/ClaudeAI/comments/1skw2vb/claude_code_obsidian/> and <https://www.reddit.com/r/ClaudeAI/comments/1uwrxbo/claude_code_and_obsidian_as_an_aimaintained/> | Independent repeated problem and workflow evidence; not GSC or keyword volume. |
| OSS | Maintained Obsidian integrations expose Claude Code or other MCP clients to vault files and workspace context. | Repository documentation; no cross-source numeric conversion | Captured 2026-07-19: <https://github.com/iansinnott/obsidian-claude-code-mcp> and <https://github.com/bitbonsai/mcpvault> | Confirms that the integration job is real and inspectable. |
| Traditional Chinese sources | Recent Traditional Chinese guides describe Claude Code inside Obsidian and an Obsidian-based local knowledge workflow. | Published pages, no inferred traffic | Captured 2026-07-19: <https://repoinside.com/YishenTu/claudian> and <https://academy.showu.com.tw/blog_16.html> | Corroborates a Traditional Chinese audience for the modifier-qualified workflow. |

The `AI 筆記` Taiwan Trends curve is supporting vocabulary only. Its related
queries remain mixed across NotebookLM, Google Notes, Notion AI, and laptop
ambiguity, so it does not independently justify an `AI 筆記` article.

## Candidate gate

1. **Inspectable provenance — PASS.** Query, geography, period, capture date,
   raw Trends unit, GSC unit, URLs, languages, and Reddit native scores are
   recorded without conversion.
2. **Repeated or high-intent problem — PASS.** Modifier-qualified Obsidian and
   Claude workflows repeat across Trends related queries, Reddit discussions,
   maintained OSS integrations, and Traditional Chinese guides.
3. **Clean coverage gap — PASS for zh-TW localization.** The English comparison
   exists and has impressions. The zh-TW Learn surface has no Obsidian,
   Claude-Code-plus-Obsidian, or corresponding comparison article. This is not
   a claim that the English topic is uncovered.
4. **Maintained Wenlan proof — PASS.** The existing English article can ground
   the localized answer in real capture, recall, review, distill, handoff, MCP,
   source-ID, and readable-Markdown workflows. It must not claim direct
   NotebookLM or Obsidian sync.
5. **Standalone utility — PASS.** The role map helps a Traditional Chinese
   reader decide when plain Markdown/Obsidian is sufficient and when
   cross-client recall, review, provenance, and maintained pages are needed.

## Rejected for this localization round

- `AI 筆記 ≠ Agent Memory` as a standalone net-new topic: HOLD. Taiwan
  attention is real, but the related-query intent is too mixed and the current
  site already partly explains notes, memories, and source-backed pages.
- `/learn/ai-work-memory-vs-knowledge-base`: HOLD. Exact Taiwan
  `AI 知識庫` moved only `0.0 → 1.3`; generic `知識庫` is broad.
- `/learn/ai-agent-memory-local-vs-cloud`: HOLD. Stronger English/global
  category evidence is not zh-TW-specific demand.
- `/learn/mcp-memory-server`: HOLD. The English integration cluster is clean,
  but no equivalent zh-TW-specific signal is available.
- A new English benchmark article: HOLD. `/docs/evaluation` already covers the
  intent and had `3` GSC impressions at average position `6.7`; refresh the
  existing page before considering another URL.

## Implementation prerequisite

The current localization model assumes that every translated Learn slug exists
in both zh-TW and zh-CN:

- `src/i18n/learn-articles.ts` uses one shared slug union and requires complete
  records for both locales.
- `translatedLearnStaticParams()` emits every translated slug for both
  locales.
- `src/i18n/routing.ts` builds one shared translated-path set and emits both
  Mandarin alternates.
- `src/app/sitemap.ts` emits every translated article for both locales.

Before the candidate can ship, change these seams to enumerate actual
locale-specific availability. The zh-TW candidate must emit English, zh-TW,
and `x-default` alternates only; it must not advertise or generate a
nonexistent zh-CN route.

This prerequisite and the localized content belong to one future experiment
because the routing change exists only to publish the evidence-backed zh-TW
page. Required verification will include i18n contract tests, sitemap and
alternate reciprocity, localized route 200/404 behavior, SEO tests, build,
built technical checks, and rendered desktop/mobile inspection.

## Next decision

Wait for the active Claude Code memory experiment's 24-hour and then
predeclared 7-day evidence. At the next eligible weekly window, re-read the
fresh GSC report. If it does not reveal a stronger technical or
impression-bearing existing-page action, prepare this zh-TW localization as the
single experiment for that window and request approval before push, merge, or
deploy.
