# Self-Updating Codebase Wiki Coverage Gate

**Captured at:** `2026-08-01T21:33:26Z`

**Decision type:** demand-discovery and coverage audit
**Search authority:** none; this record does not replace GSC or report keyword volume

## Question

Does repeated interest in a self-updating codebase wiki justify a new Wenlan
search page in English, Traditional Chinese, or Simplified Chinese?

## Inspectable demand observations

The English problem repeats across independent community posts:

- [Claude Code and Obsidian as an AI-maintained wiki](https://www.reddit.com/r/ClaudeAI/comments/1uwrxbo/claude_code_and_obsidian_as_an_aimaintained/)
  — English Reddit post; score `358` when observed on `2026-08-01`; separates
  immutable sources, a maintained wiki, citations, ingest, and query.
- [Self-updating wiki for your codebase](https://www.reddit.com/r/ClaudeCode/comments/1tbrvl7/selfupdating_wiki_for_your_codebase/)
  — English Reddit post; score `16` when observed on `2026-08-01`; discussion
  emphasizes links to commits, pull requests, decisions, and stale expiry.
- [How do you keep code documentation up to date?](https://www.reddit.com/r/ClaudeCode/comments/1p8jzr0/how_do_you_keep_your_code_documentation_up_to_date/)
  — English Reddit post; score `11` when observed on `2026-08-01`; asks how to
  prevent documentation drift while agents work in the repository.
- [How I got Claude Code to maintain its own documentation](https://www.reddit.com/r/ClaudeCode/comments/1s05abq/how_i_got_claude_code_to_maintain_its_own/)
  — English Reddit post observed on `2026-08-01`; uses last-audited state and
  treats source code as authoritative.
- [Claude Code + Obsidian + Karpathy LLM Wiki knowledge base](https://www.bilibili.com/video/BV1k6QvBYEVA/)
  — Simplified-Chinese video observed on `2026-08-01`; corroborates the broader
  Claude Code, Obsidian, LLM Wiki, and knowledge-base workflow, but not a
  distinct codebase-sync query. No matching Traditional-Chinese observation
  was retained for this exact problem.

Maintained OSS also shows interest in adjacent implementations. GitHub counts
below are native cumulative repository units read at `2026-08-01T21:33:26Z`;
they are not search demand or a Wenlan forecast.

| Repository | Stars | Forks | Last pushed |
| --- | ---: | ---: | --- |
| [`6eanut/llm-wiki`](https://github.com/6eanut/llm-wiki) | 40 | 10 | `2026-05-13T01:27:09Z` |
| [`Pratiyush/llm-wiki`](https://github.com/Pratiyush/llm-wiki) | 354 | 53 | `2026-06-18T11:23:46Z` |
| [`junbjnnn/llm-wiki`](https://github.com/junbjnnn/llm-wiki) | 11 | 2 | `2026-04-08T07:06:33Z` |
| [`AlmanacCode/codealmanac`](https://github.com/AlmanacCode/codealmanac) | 758 | 69 | `2026-07-25T00:00:46Z` |
| [`ussumant/llm-wiki-compiler`](https://github.com/ussumant/llm-wiki-compiler) | 305 | 30 | `2026-07-10T06:47:14Z` |
| [`coleam00/claude-memory-compiler`](https://github.com/coleam00/claude-memory-compiler) | 1,264 | 316 | `2026-04-06T19:46:57Z` |

These sources pass the repetition check for the English problem. The retained
Mandarin evidence supports LLM Wiki and AI-knowledge-base demand generally,
not a separate localized codebase-wiki page.

## Existing Wenlan coverage

| Language | Existing canonical coverage | Gap result |
| --- | --- | --- |
| English | `/learn/distilled-wiki-pages-ai-memory` already explains sources, maintained pages, selective retrieval, stale reasons, refresh, review, failure modes, and explicitly says current source code, repository search, tests, and native documentation remain authoritative. `/learn/source-backed-wiki-pages-ai-work` already gives the smallest source/capture/distill/lint/curate loop. | Partial intent is already covered; no clean new-URL gap. |
| zh-TW | `/zh-TW/learn/distilled-wiki-pages-ai-memory` already includes a continuously updated knowledge-base workflow, stale reasons, reviewable revisions, validation, and the boundary that current code and tests remain authoritative. The localized source-backed page covers sources, refresh, and review. | No clean content gap and no retained exact Traditional-Chinese demand signal. |
| zh-CN | `/zh-CN/learn/distilled-wiki-pages-ai-memory` and `/zh-CN/learn/source-backed-wiki-pages-ai-work` cover the same maintained-wiki lifecycle; the new Obsidian page covers the adjacent Claude Code + vault workflow. | No clean content gap; the Bilibili observation is adjacent rather than an exact codebase-sync intent. |

## First-party capability boundary

Wenlan proves a maintained documentation and knowledge lifecycle, but it does
not currently prove automatic source-code indexing through a Directory Source:

- `wenlan sources add <path>` registers a Directory Source and syncs it.
- `crates/wenlan-core/src/sources/directory.rs` explicitly scans only
  `.md`, `.txt`, and `.pdf`, skips `.git`, and does not ingest `.rs`, `.ts`,
  `.tsx`, `.py`, or other source-code files.
- The generic chunker recognizes programming-language extensions, but that
  parser capability is not wired into Directory Source ingestion and therefore
  cannot support a public claim that Wenlan automatically follows code changes.
- Maintained first-party evidence does support Sources, captured decisions,
  source IDs and citations, stale reasons, refresh, revisions, git history,
  `/distill`, `/lint`, and `/curate` for documentation and knowledge pages.

The defensible answer is therefore: Wenlan can maintain source-backed
engineering documentation supplied as supported documents and work evidence;
current code, tests, and repository search remain the authority for software
behavior. It cannot yet be positioned as a code index that regenerates its wiki
directly from arbitrary source files.

## Candidate gate

| Gate | Result | Evidence |
| --- | --- | --- |
| Inspectable provenance | Pass | URLs, capture date, language, Reddit scores, and GitHub native repository counts are retained. |
| Repeated problem or high intent | Pass for English; insufficient for a separate Mandarin page | Multiple independent English discussions and maintained repositories repeat the problem. Mandarin evidence is adjacent category evidence. |
| Clean Wenlan coverage gap | Fail | All three LLM Wiki/source-backed page families already answer the source, stale, refresh, review, and authority boundaries. |
| Maintained Wenlan proof | Fail for the proposed code-sync promise | Directory Source excludes source-code extensions; a new page would have to narrow the answer back to existing document-maintenance coverage. |
| Standalone utility | Pass | A vendor-neutral checklist for documentation drift would be useful, but utility alone cannot override the failed coverage and proof gates. |

## Decision

Do not start a new English, zh-TW, or zh-CN article for “self-updating codebase
wiki” in this window. It would overlap the existing LLM Wiki and source-backed
knowledge-base canonicals while inviting an unsupported code-ingestion claim.

At the next authenticated query-page window:

1. Look for recurring, page-joined phrases such as `self updating codebase
   wiki`, `code documentation up to date`, and their Mandarin equivalents.
2. If a qualified cluster reaches an existing LLM Wiki page, prefer a bounded
   clarification on that canonical rather than a new URL.
3. Reconsider a dedicated codebase-wiki asset only after Wenlan has maintained
   first-party support for source-code ingestion or another exact workflow that
   can prove the answer without treating generated documentation as current
   code truth.

No website change, experiment start, indexing request, GSC validation, external
publication, or analytics mutation is authorized or performed by this audit.
