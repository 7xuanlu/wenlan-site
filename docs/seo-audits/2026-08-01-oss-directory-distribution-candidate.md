# OSS directory distribution candidate — 2026-08-01

> **Superseded preflight:** A later account-wide fork and PR inventory found
> earlier pre-Wenlan submissions and newer repository-specific requirements that
> were not included in this first two-repository pass. In particular,
> `punkpeye/awesome-mcp-servers` closed the prior pre-Wenlan PR after introducing a
> mandatory Glama listing, runnable-server check, and score badge. Its local
> patch below is preparation evidence only and is not submission-ready. The
> corrected non-duplicate publication scope is recorded in
> `2026-08-01-oss-directory-publication-scope.md`.

## Decision

This first pass prepared two complementary listings:

1. `punkpeye/awesome-mcp-servers` as the primary high-reach MCP discovery
   surface.
2. `gavischneider/awesome-llm-wiki` as the exact-topic LLM Wiki discovery
   surface.

This is not another article or an edit to a measuring page. The later
account-wide inventory supersedes the publication decision in this document;
do not submit the Awesome MCP Servers patch until its Glama prerequisite is
satisfied.

## Captured evidence

Captured at `2026-08-01T04:51:43Z`.

### Current search surface

The search provider was queried for `"LLM wiki" AI knowledge base Karpathy`,
`"LLM wiki" knowledge bases for AI agents`, and
`"AI knowledge base" local first markdown MCP`. Geography and personalization
were not exposed, so the returned order is not described as Google rank or GSC
evidence.

Wenlan was absent from the returned set. The set included exact-topic products,
directories, and guides such as:

- `https://llmwikis.org/`
- `https://openknowledge.sh/`
- `https://llm-wiki.net/`
- `https://karpathy-wiki.lol/en/wiki/llm-wiki-guide`
- `https://denser.ai/blog/llm-wiki-karpathy-knowledge-base/`
- `https://aillm.wiki/`

This nominates distribution and authority surfaces; it does not prove a Google
position, backlink effect, or causal traffic outcome.

### Primary directory: Awesome MCP Servers

- Repository: `https://github.com/punkpeye/awesome-mcp-servers`
- Captured repository commit:
  `375407c7290dd99d305938983f37adffa9d44275`
- GitHub native units at capture: 91,667 stars; last pushed
  `2026-07-29T10:26:20Z`; last updated `2026-08-01T04:45:43Z`.
- Wenlan search result inside the repository: no match.
- Target section: `Knowledge & Memory`.
- Contribution rule discovered after this first pass: a concise entry in the
  relevant section plus an existing Glama listing, a working server that
  passes Glama checks, and a Glama score badge. Automated-agent PRs may append
  `🤖🤖🤖` to the PR title, but that does not waive the listing prerequisites.
- Recent inspectable accepted examples:
  - PR #11128, `Add pr-genius to Knowledge & Memory`, merged 5 minutes 24
    seconds after creation.
  - PR #11136, an agent-marked addition, merged 6 minutes 40 seconds after
    creation.
  - PR #11119, an agent-marked addition, merged 6 hours 9 minutes 23 seconds
    after creation.
  - PR #11064, `Add linklore/linklore-mcp to Knowledge & Memory`, merged
    22 hours 57 minutes 17 seconds after creation.

Those durations show that the contribution lane is active. They do not predict
Wenlan's acceptance, impressions, clicks, or stars.

Proposed one-line patch:

```markdown
- [Wenlan](https://github.com/7xuanlu/wenlan) 🦀 🏠 🍎 🪟 🐧 - Local-first source-backed knowledge base and MCP server for Claude Code, Codex, Cursor, and other agents. Captures decisions and source material, distills cited Markdown wiki pages, and keeps revisions and Git history inspectable.
```

Proposed PR title:

`Add Wenlan to Knowledge & Memory 🤖🤖🤖`

Local patch:
`/private/tmp/wenlan-oss-candidate-20260801-awesome-mcp-servers`.

Local branch and commit: `add-wenlan` at `fff127c`.

Prepared PR body: `/private/tmp/wenlan-awesome-mcp-pr-body.md`.

### Exact-topic directory: Awesome LLM Wiki

- Repository: `https://github.com/gavischneider/awesome-llm-wiki`
- Captured repository commit:
  `f3079cad5aac8a17692e6287aa67c60ac79aa98b`
- GitHub native units at capture: 43 stars; last pushed
  `2026-07-30T23:58:39Z`; last updated `2026-07-31T23:32:34Z`.
- Wenlan search result inside the repository: no match.
- Target section: `CLI Compilers and Builders`.
- Contribution rules: directly related to static LLM knowledge-base
  compilation, concise non-promotional description, capitalized and
  period-terminated, strict alphabetical order, and `npm run test`.
- The current section already contains local compilers, Rust CLIs, daemons,
  MCP integrations, and Obsidian-compatible implementations. Wenlan fits this
  maintained category without inventing a comparison claim.

Proposed one-line patch:

```markdown
- [Wenlan](https://github.com/7xuanlu/wenlan) - A local-first Rust CLI and daemon that turns source-backed captures into maintained Markdown wiki pages, with citation-gated refresh, MCP access, agent plugins, and inspectable local Git history.
```

Proposed PR title:

`Add Wenlan to CLI Compilers and Builders`

Local patch:
`/private/tmp/wenlan-oss-candidate-20260801-awesome-llm-wiki`.

Local branch and commit: `add-wenlan` at `973e690`.

Prepared PR body: `/private/tmp/wenlan-awesome-llm-wiki-pr-body.md`.

## Candidate gate

1. **Inspectable provenance — pass.** Both repositories, captured commits,
   contribution rules, native GitHub star units, timestamps, exact target
   sections, and proposed patches are recorded above.
2. **Repeated problem or clear intent — pass.** The current search set, the
   retained LLM Wiki and AI-knowledge-base Trends series, and the active MCP
   Knowledge & Memory contribution lane independently expose the same
   compiled-knowledge and cross-agent audience.
3. **Clean Wenlan coverage gap — pass.** Wenlan already has maintained
   English, zh-TW, and zh-CN LLM Wiki and source-backed knowledge-base pages.
   The gap is third-party discovery: Wenlan is absent from both directories.
   No new Wenlan URL or duplicate article is needed.
4. **Maintained first-party proof — pass.** Public Wenlan README and release
   sources verify a Rust CLI, local daemon, `wenlan-mcp` crate, source-backed
   maintained Markdown Pages, citation-gated refresh, Claude Code and Codex
   plugins, Cursor and other MCP clients, local Git history, and released
   macOS, Windows, and Linux runtime archives.
5. **Standalone utility — pass.** Each proposed entry is a factual directory
   description that helps readers discover an applicable open-source tool
   without requiring promotional copy or a Wenlan website visit.

## Predeclared readout contract

- Hypothesis: two accurate listings, one broad MCP surface and one exact-topic
  LLM Wiki surface, create persistent relevant discovery paths to the Wenlan
  repository without another same-intent article.
- Baseline: Wenlan is absent from both directories; GitHub reports 46 total
  Wenlan stars at capture. The latest authenticated GSC property totals remain
  10 clicks and 660 impressions; Vercel remains 1,468 visitors in its separate
  same-range observation. No source is joined or attributed to another.
- Change: one README line in each external repository. No Wenlan website,
  product, analytics, indexing, or metric-definition change.
- Positive minimum exposure: at least one accepted listing remains live for
  seven complete days. Unit: complete live listing-days.
- Success: both PRs are accepted and both listings remain live at the 7-day
  readout. GitHub stars, GSC, and Vercel are reported separately and do not
  determine this distribution-integrity result.
- Partial: one listing is accepted and remains live while the other is
  rejected or closed.
- Failure: both listings are rejected for fit, or every accepted listing is
  removed before seven complete days.
- Inconclusive: one or both PRs remain open without a maintainer decision, or
  no listing reaches seven complete live days.
- Stop criteria: stop for an inaccurate product claim, duplicate listing,
  maintainer request that expands beyond one factual line, broken project or
  release link, licensing or security regression, or request to add an
  unsupported benchmark, badge, or ranking claim.
- 24h readout: PR state, maintainer feedback, and direct listing presence only.
- 7d, W2, W4, and W8 readouts: listing persistence plus separate native-unit
  GitHub-star, GSC, Vercel, and authenticated Umami observations when
  available. No causal or source-to-page claim.

## Local verification

- Both clones are pinned to the commits recorded above.
- Each local branch adds exactly one README line in one commit.
- `git diff --check` passed in both clones before commit; both working trees
  are clean after commit.
- `npm test` passes in `awesome-llm-wiki` using its locked dependencies and
  official `awesome-lint README.md` command.
- The Awesome MCP Servers repository exposes no local test command; its
  one-line patch was checked against the documented format, target category,
  platform legend, public Wenlan repository, and current release facts.

Result: the Awesome LLM Wiki patch remains submission-ready. The Awesome MCP
Servers patch remains locally prepared but blocked on the repository's Glama
prerequisite. No fork, external branch, push, PR, directory submission,
website publication, indexing request, GSC validation, or analytics mutation
occurred during this first pass.
