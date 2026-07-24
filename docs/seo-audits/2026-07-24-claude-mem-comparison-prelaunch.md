# Current claude-mem Comparison Refresh — Prelaunch

**Experiment:** `EXP-2026-07-24-claude-mem-comparison-refresh`

**Prepared:** `2026-07-24T23:17:30Z`

**Status:** active local preparation; not published

## Decision

Refresh the existing English
`/learn/wenlan-vs-claude-mem` comparison instead of creating a new URL.

The current page has authenticated GSC exposure, but its main decision
boundary is no longer accurate. It describes claude-mem as a Claude Code
single-tool workflow, says its package is MIT-licensed, and understates its
current Codex and cross-agent support. Maintained claude-mem source and the
latest release show that the more useful comparison is now:

- automatic hook-driven session capture, compression, and progressive
  retrieval in claude-mem;
- explicit source-backed capture, handoffs, review, and maintained pages in
  Wenlan.

Both projects now support more than one agent. The refreshed page must not
claim that cross-agent access is unique to Wenlan.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: 7 impressions, 0 clicks, 0.00% CTR, average position 14.4.
- No visible query row is joined to the target page. The visible
  `mempalace vs claude-mem` row maps to a different page, so it is not used as
  target-page query evidence.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: 1 visitor and 1 pageview.
- GitHub: 47 Wenlan total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

GSC, Vercel, and GitHub remain separate native units. The page and referrer
exports cannot be joined, so this record makes no source-to-page or causal
claim.

## Current-source provenance

Captured at `2026-07-24T23:17:30Z`. These observations validate the comparison
and its accuracy gap; they are not GSC or keyword volume.

| Source | Native observation | Provenance | Use |
| --- | --- | --- | --- |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 88,477 stars, 7,680 forks, 274 open issues; Apache-2.0; main commit `132b46343e60ecf4057c427736c57b08f7615dfe` | GitHub REST API, captured `2026-07-24T23:17:30Z` | Confirms that the maintained project, license, and current source differ materially from the old comparison. Stars are OSS supply/attention, not search demand. |
| [claude-mem v13.12.4](https://github.com/thedotmack/claude-mem/releases/tag/v13.12.4) | Latest GitHub release, published `2026-07-23T22:47:26Z` | GitHub Releases API | Pins the competitor snapshot used by the page. |
| [Architecture overview](https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/docs/public/architecture/overview.mdx) | Hook-driven capture, worker service, SQLite/FTS5, optional Chroma, automatic compression, session injection, and progressive search | Maintained source at the captured commit | Supports the automatic-capture and retrieval boundary. |
| [Installation guide](https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/docs/public/installation.mdx) | Supported IDEs are Claude Code, Cursor, Windsurf, OpenCode, Codex CLI, Antigravity CLI, and OpenClaw; Gemini is listed separately as an LLM provider | Maintained source at the captured commit | Prevents the comparison from turning an LLM provider into a client integration or naming an unsupported integration. |
| [Codex hooks](https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/plugin/hooks/codex-hooks.json) | Current Codex hook registration exists in the maintained source | Maintained source at the captured commit | Proves that “Claude Code only” and “three disjoint stores” are stale claims. |
| [Codex support request #1270](https://github.com/thedotmack/claude-mem/issues/1270) | Closed; 1 comment, 0 reactions; requested Codex read/write capture | GitHub Issues API | Independent cross-agent workflow evidence in its native issue units. |
| [Shared backend request #1328](https://github.com/thedotmack/claude-mem/issues/1328) | Closed; 1 comment, 0 reactions; requested a shared backend beyond Claude Code | GitHub Issues API | Independently repeats the cross-agent job; current source now contains the relevant adapters and hooks. |

Maintained Wenlan proof is pinned to
[`7xuanlu/wenlan` commit `93451bf0ef58399e08400e3b4ac613942adcfec8`](https://github.com/7xuanlu/wenlan/commit/93451bf0ef58399e08400e3b4ac613942adcfec8),
version `0.14.1`. Its README and plugin skills document:

- one local daemon shared through MCP;
- explicit `/capture`, `/recall`, and `/handoff`;
- deliberate `/distill` page creation or refresh;
- review through `/brief`, `/curate`, and read-only `/lint`;
- inspectable local libSQL, Markdown, citations, revisions, and git history;
- Apache-2.0 for the runtime, CLI, MCP server, and plugin files.

## Candidate gate

1. **Inspectable provenance — PASS.** GSC, Vercel, GitHub, release, issue,
   source-commit, date, and native units are recorded.
2. **Repeated or clear high intent — PASS.** The existing page has seven GSC
   impressions. Two independent issues repeat the cross-agent job, and the
   actively maintained OSS project now exposes that support.
3. **Clean coverage decision — PASS.** Wenlan already has the exact comparison
   URL. Refresh it rather than creating another comparison.
4. **Maintained Wenlan proof — PASS.** Current first-party source supports the
   explicit capture, handoff, review, distillation, local storage, and
   cross-client claims.
5. **Standalone utility — PASS.** A source-backed automatic-versus-explicit
   decision guide helps a reader choose between the tools even without
   installing Wenlan.

## Non-overlap and locale decision

- `/learn/claude-code-memory` explains native Claude Code memory boundaries
  and Wenlan setup.
- `/learn/wenlan-vs-claude-mem` compares two maintained products and their
  capture, retrieval, review, artifact, and licensing models.
- The current locale evidence does not establish a Mandarin claude-mem
  comparison query cluster. This experiment changes English only and does not
  infer demand from the competitor's translated README files.

## Bounded change

- Refresh the existing title, metadata, first answer, body, comparison table,
  FAQ copy, and maintained references.
- Correct claude-mem's Apache-2.0 license and current Codex/cross-agent support.
- Remove unsupported “single-tool,” “three disjoint stores,” and direct
  migration-script claims.
- Preserve the URL, canonical, sitemap membership, English-only availability,
  Article and BreadcrumbList schema types, and CTA.
- Add no `FAQPage` JSON-LD, indexing request, or external distribution.

## Predeclared readouts

- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 target-page GSC click or average
  position of 12.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than 20.0.
- Inconclusive: fewer than 5 impressions, or 0 clicks with average position
  from 12.1 through 20.0 after minimum exposure.
- Technical stop: maintained-source drift, overlap with the active Claude Code
  page, or any canonical, indexing, robots, noindex, schema, sitemap, locale,
  source-link, or rendered-layout regression.
- 24h: technical and rendered production proof only; no SEO-success judgment.
- 7d, W2, W4, W8: report available source-native evidence and apply the
  predeclared minimum-exposure guard without moving thresholds.

## Approval boundary

At `2026-07-24T23:27:13Z`, the user explicitly approved the current website
publication flow: commit, push, PR, merge, deployment, and production
verification.

That approval does not include request indexing, GSC validation, Reddit or
other external publication, OSS submission, paid acquisition, or
metric-definition changes.

## Local verification and review

- RED-to-GREEN contract test covers the current title, release, Apache-2.0
  license, Codex hooks, progressive disclosure, pinned maintained sources, and
  removal of the stale single-tool, three-store, MIT, and direct-migration
  claims.
- `pnpm seo:goal:check`: pass.
- `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan WENLAN_APP_REPO_ROOT=/Users/lucian/Repos/wenlan-app pnpm test:seo`:
  177 passed, 0 failed.
- `pnpm test:i18n`: 53 passed, 0 failed.
- `pnpm lint`: pass.
- `pnpm build`: pass; 209 static pages generated.
- `pnpm seo:technical:built`: pass; 26 redirects, 7 noindex headers,
  109 sitemap locations, 14 key HTML pages, and no `FAQPage` in 113 built HTML
  files.
- `git diff --check`: pass.
- Independent review initially found one P2: the article treated Gemini as a
  client integration and named unsupported Hermes support. The page now uses
  the exact supported-IDE list from the pinned installation guide and cites
  that guide. Focused re-review returned `SHIP`.
- Fresh desktop and mobile render checks passed. Desktop document width was
  `1274/1274`; mobile was `387/387`. The mobile comparison table remains
  intentionally wider than its `339px` scroll container without widening the
  document. The corrected integration list rendered, the Gemini/Hermes claim
  was absent, and browser warnings/errors were empty.
- Fresh screenshots:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-claude-mem-comparison-final/desktop-full-1280x720.png`
  and
  `/tmp/wenlan-seo/visual-qa/2026-07-24-claude-mem-comparison-final/mobile-full-393x852.png`.
