# GitHub Exposure and Directory Status — 2026-08-08

## Decision

Treat insufficient human repository exposure as the current GitHub-star
bottleneck. Do not use clone counts as people, rewrite the already-complete
README merely to look active, or open duplicate directory submissions.

Continue the previously approved directory campaign by keeping existing PRs
accurate and mergeable. GitHub stars, repository traffic, directory state,
GSC, and Vercel remain separate native-unit observations without attribution.

## GitHub native evidence

GitHub Traffic covers the native 14-day range `2026-07-25..2026-08-07`:

| Surface | Total | Unique |
| --- | ---: | ---: |
| Repository views | 406 | 49 |
| Repository clones | 9,711 | 990 |
| Repository overview path | 104 | 31 |
| Pull-request index path | 102 | 2 |

The clone endpoint does not identify people and can contain automation, CI,
dependency mirrors, or repeated tooling activity. Its 990 unique-cloner unit
is therefore not treated as human reach, visitors, setup starts, or qualified
acquisition.

Popular referrers for the same GitHub traffic surface are `github.com` 45
views/9 uniques, Google 6/6, `gist.github.com` 3/2,
`carsteneu.github.io` 2/1, `l.threads.com` 2/1, and `lib.rs` 1/1. These are
repository referrer rows, not Vercel visitors or GSC clicks.

GitHub REST still reports 47 total stars. Stargazer timestamps show one new
star inside the traffic range, at `2026-08-01T19:08:54Z`; the prior star was
dated `2026-06-28T06:00:36Z`. The traffic and stargazer sources remain separate
and do not establish an identified viewer-to-star conversion.

## README inspection

The current repository first screen already provides:

- a responsive source-backed knowledge-base banner and one-sentence job;
- English, Simplified-Chinese, Traditional-Chinese, and Spanish routes;
- CI, release, and Apache-2.0 evidence;
- Get Started, product explanation, capabilities, daily workflow, evaluation,
  and Learn navigation;
- a product screenshot, desktop setup, AI-assisted setup, headless setup, and
  platform boundaries;
- explicit source-backed knowledge-base, Karpathy LLM-wiki, Pages, citations,
  refresh, and human-review positioning.

No missing category answer or broken first-screen route explains the present
star plateau. A cosmetic README rewrite would not create the missing human
reach and is not nominated.

## Approved directory batch status

Three listings are now merged:

1. `gavischneider/awesome-llm-wiki` PR #4 — merged
   `2026-08-01T18:55:52Z`.
2. `TeleAI-UAGI/Awesome-Agent-Memory` PR #72 — merged
   `2026-08-01T22:15:12Z`.
3. `TensorBlock/awesome-mcp-servers` PR #1500 — merged
   `2026-08-03T00:09:13Z`.

Eleven existing PRs remain open after the current reconciliation: eight
`CLEAN`, one `BLOCKED` on repository review/policy, one `UNSTABLE` because of
previously verified unrelated whole-repository link failures, and one
`UNKNOWN` while GitHub does not expose a stable mergeability result. No
maintainer feedback requests an author-side product or copy correction.

`XiaomingX/awesome-ai-memory` PR #8 had become `DIRTY` after upstream reformatted
the same README table. The already-approved existing-PR maintenance scope was
used to merge current upstream main into the existing fork branch. The final
comparison against upstream remains exactly one README insertion, contains one
`7xuanlu/wenlan` link, contains no legacy Origin path, passes diff hygiene, and
the repository link returns HTTP 200. Commit
`d4f8111a17f7a2b69f3f114d60c2a23cb3e8cd4c` was pushed to the existing
`codex/add-origin` branch; PR #8 now reports `MERGEABLE` and `CLEAN`.

No new PR, duplicate listing, maintainer comment, review request, paid listing,
external post, website change, analytics mutation, indexing request, or
Search Console validation was created in this maintenance action.

### mcpservers.org public-state reconciliation

The previously approved free submission ID `5334` is now publicly reachable at
`https://mcpservers.org/servers/7xuanlu/wenlan`. The first source-native live
verification in this campaign occurred at `2026-08-09T01:40:19Z`; the public
page returns the Wenlan name, the submitted AI-knowledge-base and LLM-wiki
description, a canonical pointing to that exact URL, `SoftwareApplication`
structured data, the GitHub repository link, and the directory's displayed
GitHub-star count of `47`.

The directory page does not expose a reliable publication timestamp. Use the
first verified live observation above as the conservative listing-days start;
do not backdate it from crawler recency or infer that the listing caused a
repository view, star, GSC impression, or Vercel visit. The accepted listing
must not be resubmitted, upgraded to Premium, or counted as another PR.

### Public GitHub mention quality

A live GitHub code-search capture at `2026-08-09T01:49:40Z` found the literal
repository path `7xuanlu/wenlan` in 62 files across eight external
repositories. This is a capped, indexed code-search result, not a complete
backlink graph. Two generated repositories account for 55 of the 62 files:
25 generated MCP-server pages and 30 daily Wenlan digest files. The remaining
seven files are spread across six repositories.

The static mentions are mixed rather than six independent endorsements:

- the merged TeleAI and TensorBlock listings use current Wenlan framing;
- two Chat2AnyLLM catalog rows are automated scanner output, including one
  root-manifest `missing` result even though Wenlan's maintained Claude plugin
  lives under `plugin/.claude-plugin` rather than repository root;
- one third-party profile invents unsupported enterprise-scale deployment,
  client-library, authentication, and API claims;
- one competitive-research source still labels the project
  `Origin (Wenlan)` despite linking to the current repository.

Only one external indexed file in the same capture contains the literal
`wenlan.app` hostname: the merged TeleAI listing. These native GitHub search
counts explain why the apparent external-footprint total overstates current,
accurate website and repository exposure. They are not backlinks, unique
visitors, search impressions, referrals, or star attribution. Correcting the
two inaccurate third-party pages would require a separate external-contact or
repository-contribution approval; no outreach or mutation is authorized here.

### Open-PR state reconciliation

A fresh read-only GitHub reconciliation at `2026-08-09T02:04:24Z` confirms all
11 remaining approved directory PRs are still open. Nine are now `CLEAN`, one
is `UNSTABLE`, and one is `BLOCKED`; the earlier `UNKNOWN` mergeability state
has resolved to `CLEAN` without an author-side change.

- `DhanushNehru/awesome-mcp-servers` PR #52 remains `UNSTABLE`: its
  `hypersweep` check passes while the whole-repository `lychee` check fails for
  the previously verified unrelated upstream links.
- `ComposioHQ/awesome-claude-skills` PR #852 remains `BLOCKED` only on required
  review. Its validation and both Socket checks pass.
- PRs #433, #231, #6, #1, #8, #2, #266, #254, and #225 are `CLEAN`; all
  reported checks pass where checks exist, and none has an author review or
  change request.

No PR needs an author-side code or copy correction. Continue passive review
observation; do not create no-op updates or maintainer messages merely to bump
the PRs.

### appcypher lane closure

A fresh gate at `2026-08-09T02:08:15Z` found no existing Wenlan entry and no
open or closed Wenlan PR in `appcypher/awesome-mcp-servers`. The prepared
`7xuanlu:add-wenlan-appcypher` branch remains exactly one commit ahead and zero
behind current upstream, with one factual `Note Taking` README insertion.

The authoritative repository metadata now reports `archived: true` and
`has_issues: false`; GitHub's pull-request list endpoint returns HTTP 404 for
the repository. This explains the earlier GraphQL and REST PR-creation denial.
The branch is valid, but the upstream currently cannot accept a pull request.
Close this distribution lane unless the owner unarchives the repository; do
not retry, create a duplicate, or contact the maintainer from this evidence.

### Glama prerequisite recheck

At `2026-08-09T02:09:53Z`, Glama's public server API still returned HTTP 404
with `Server not found` for both `7xuanlu/wenlan` and the legacy
`7xuanlu/origin` slug. Public search likewise exposed no Wenlan server result.
The prerequisite for reopening `punkpeye/awesome-mcp-servers` PR #7080 remains
unmet. Do not install the Glama GitHub App, grant repository access, or reopen
the PR without separate approval for that account mutation.

### Codex plugin directory gate recheck

At `2026-08-09T02:11:12Z`, current GitHub `7xuanlu/wenlan@main` still keeps the
Codex bundle under `plugin-codex/`. The repository root has `README.md`,
`SECURITY.md`, and `LICENSE`, but it does not have root-level
`.codex-plugin/plugin.json`, `assets/icon.svg`, or
`.github/workflows/hol-plugin-scanner.yml`.

The current `hashgraph-online/awesome-codex-plugins` contract still requires a
root plugin bundle, a passing HOL scanner workflow on main, score at least
80/130, and no high or critical findings. Wenlan therefore remains ineligible
for a mechanical directory PR. Meeting the gate requires an intentional
product/repository packaging change or separate root plugin repository, not an
SEO-only listing edit; neither was authorized or performed.

### Fork-only inventory closure

A current GitHub fork-parent reconciliation at `2026-08-09T02:13:30Z`
identified the original four directory forks without external PRs and closed
their ambiguity:

- `wong2/awesome-mcp-servers` rejects PRs; its supported free
  `mcpservers.org` route is already publicly live as listing `5334`.
- `appcypher/awesome-mcp-servers` is archived and cannot accept PRs.
- `IAAR-Shanghai/Awesome-AI-Memory` remains a research-paper bibliography,
  not a software-product directory.
- `subinium/awesome-claude-code` remains unchanged since 2026-04-25 and has no
  stronger current acquisition evidence than the active Claude directories.

No fork-only candidate remains eligible for another submission. This closes
the original inventory without inventing an additional directory lane.

### Awesome Second Brain high-fit submission

The current `aristoapp/awesome-second-brain` repository was captured at 502
GitHub stars and is active rather than archived. Its contribution contract is
an unusually close fit for Wenlan: AI-native second-brain workspaces, local
knowledge, LLM-wiki workflows, Obsidian-adjacent tools, solution layers, and a
capability matrix. No existing Wenlan entry or PR was present.

Wenlan passed the candidate gate with maintained first-party evidence for the
local workspace and daemon, source-backed Pages, citations, refresh and human
review, MCP/CLI/desktop/plugin access, supported imports, and explicit limits
for platforms, scanned PDFs, broad SaaS OAuth, collaboration controls, and
external model privacy. The approved publication scope was used to create
commit `4fb28dd` on `7xuanlu:agent/add-wenlan-profile`. The diff changes exactly
five files: the root lifecycle chooser, solution index, new 94-line Wenlan
profile, solution-layer comparison, and capability matrix. It contains 103
insertions and 6 deletions.

The repository-relative link check, ten external first-party HTTP checks, and
`git diff --check` passed. Public PR #43 was created at
`2026-08-09T02:20:19Z`:
`https://github.com/aristoapp/awesome-second-brain/pull/43`. At the first
source-native verification it is open, non-draft, and `CLEAN`, with no review
decision or checks reported. `CLEAN` therefore records mergeability only, not
CI coverage.

The PR is an approved distribution candidate, not a website experiment and
not a traffic result. Do not attribute a future merge, view, referrer, star,
GSC impression, or Vercel visit to it without the matching source-native
observation. No maintainer message, no-op bump, website change, indexing
request, GSC validation, analytics mutation, paid action, synthetic event, or
metric change was performed.

### High-reach candidate gate results

Three further current repositories were checked rather than treated as
automatic backlink opportunities:

- `danielrosehill/Awesome-Obsidian-AI-Tools` has 252 GitHub stars but its
  authoritative README is specifically a list of Obsidian plugins, each with
  an Obsidian plugin installation route. Wenlan can consume an Obsidian vault;
  it is not an Obsidian plugin. The repository currently shows nine external
  PRs and no merged external contribution. A Wenlan submission would be
  factually miscategorized and is rejected.
- `Arindam200/awesome-ai-apps` has 13,353 GitHub stars but collects complete
  runnable projects, tutorials, and recipes implemented within the repository.
  Its contribution contract asks contributors to add such an example rather
  than list an external product. Creating a duplicate Wenlan demo solely for
  a link is rejected.
- `awesome-selfhosted/awesome-selfhosted` has 311,438 GitHub stars and its
  Knowledge Management Tools category is a plausible future fit for Wenlan's
  local daemon and HTTP/MCP service. The source-of-truth repository requires
  the first stable release to be more than four months old. Wenlan `v0.1.0`
  was published at `2026-04-19T22:09:18Z`, so it cannot pass that gate until
  after `2026-08-19T22:09:18Z`, later than this campaign's fixed deadline.

Awesome Selfhosted is retained as a post-campaign candidate, not submitted
early. No fork, issue, PR, maintainer contact, website change, indexing
request, GSC validation, analytics mutation, paid action, synthetic event, or
metric change was performed.

### Awesome Note Taking CLI submission

`tehtbl/awesome-note-taking` was captured at 934 GitHub stars. Unlike the
rejected generic or plugin-only candidates, its authoritative contribution
contract explicitly accepts tools primarily used for note-taking or knowledge
management and exposes a dedicated open-source CLI category. Current main
already contains IWE, `nb`, `zk`, and the close local-first RAG, Markdown-wiki,
knowledge-graph, and MCP comparator SwarmVault. Wenlan therefore fits the
category without being described as an Obsidian plugin or conventional notes
editor.

The duplicate search found no Wenlan entry or prior PR. Fork
`7xuanlu/awesome-note-taking`, branch `agent/add-wenlan`, and commit
`4ac8df8afb62162c3e98af26e39f58099414fcff` add exactly one README line under
CLI tools. The entry states that Wenlan is a local source-backed AI knowledge
base for agents with maintained Markdown pages, citations, and CLI, MCP, and
HTTP access; it records the Apache-2.0 license and Rust stack. The exact-one
duplicate assertion, contribution format, icon/category check, one-line
`1:0` diff, `git diff --check`, and public GitHub HTTP 200 check passed.

Public PR #121 was created at `2026-08-09T02:35:04Z`:
`https://github.com/tehtbl/awesome-note-taking/pull/121`. It is open,
non-draft, and `CLEAN`, with no checks or review decision reported. The
upstream last direct commit is `2026-04-20` and many later submissions remain
open, so merge latency is uncertain. The open PR is a valid distribution
attempt, not a public-listing, view, referral, star, GSC, or Vercel result. No
maintainer message, website change, indexing request, GSC validation,
analytics mutation, paid action, synthetic event, or metric change occurred.

## Release boundary

Wenlan PR #484, titled `chore(main): release 0.15.6`, merged at
`2026-08-09T01:00:19Z`, but GitHub still reports `v0.15.5` as the latest public
release and no `v0.15.6` tag exists. Public website release alignment must
therefore continue to target `v0.15.5` until a tag and non-draft,
non-prerelease GitHub Release with verified assets actually exist. A fresh
GitHub REST read at `2026-08-09T01:40:19Z` reconfirmed `v0.15.5` as the latest
non-draft, non-prerelease release with six assets; both the `v0.15.6` tag and
release endpoints returned HTTP 404.

## 2026-08-12 open-PR reconciliation

A fresh read-only GitHub check at `2026-08-12T07:26:49Z` found all 13
currently submitted Wenlan directory PRs still open. No PR has a maintainer
review, change request, or comment requiring an author-side correction, and
none merged since the prior capture.

- Ten PRs are `CLEAN`: `tehtbl/awesome-note-taking#121`,
  `aristoapp/awesome-second-brain#43`,
  `rohitg00/awesome-devops-mcp-servers#231`,
  `wfnuser/Awesome-Agent-Memory#6`,
  `jvidal86/awesome-claude-code-memory#1`,
  `XiaomingX/awesome-ai-memory#8`,
  `mcp-finder/awesome-mcp-servers#2`,
  `YuzeHao2023/Awesome-MCP-Servers#266`,
  `composio-community/awesome-claude-plugins#254`, and
  `tolkonepiu/best-of-mcp-servers#225`.
- `ComposioHQ/awesome-claude-skills#852` is `BLOCKED` only because repository
  policy requires review; validation and both Socket checks pass.
- `DhanushNehru/awesome-mcp-servers#52` is currently `UNKNOWN`; its Wenlan-
  relevant `hypersweep` check passes, while the previously documented whole-
  repository `lychee` check still fails.
- `toolsdk-ai/toolsdk-mcp-registry#433` is currently `UNKNOWN`; both reported
  Biome and package-schema checks pass.

These are mergeability, review, and check observations, not listing exposure,
repository traffic, stars, GSC impressions, or Vercel visitors. A no-op push
or maintainer ping is not justified by this evidence. No external state was
changed.
