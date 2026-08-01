# OSS directory publication scope — 2026-08-01

## Decision

Publish a non-duplicate Wenlan rebrand and discovery campaign across the
account's existing awesome-directory work before creating new submissions.
The user explicitly approved the complete publication scope in this Codex
task at `2026-08-01T05:11:57Z` and corrected the earlier two-repository
inventory by noting that more awesome forks and merged submissions existed.

The campaign therefore uses three lanes:

1. Update existing open pre-Wenlan PRs in place where the upstream remains a valid
   Wenlan discovery surface.
2. Update already-accepted pre-Wenlan listings to Wenlan without adding a
   duplicate entry.
3. Submit only new high-fit directories whose current contribution gate can
   be satisfied now.

Website content, request indexing, GSC validation, analytics mutation, paid
distribution, and unrelated external posts are excluded.

## Account-wide inventory

GitHub was queried at `2026-08-01T05:11:57Z` for repositories owned by
`7xuanlu`, fork parents, and pull requests authored by `7xuanlu`. Native star
counts below describe the directory repositories only; they are not predicted
Wenlan impressions, clicks, visitors, or stars.

The inventory found 20 relevant awesome, MCP, plugin, or memory forks:

- 10 still-open pre-Wenlan PRs.
- Four PRs merged by upstream maintainers.
- One additional pre-Wenlan entry merged manually after its PR was closed.
- One closed and unmerged PR whose upstream now requires a Glama listing and
  score badge.
- Four forks without an external PR.

No prior external PR authored by `7xuanlu` contains the Wenlan brand. The
correct action is rebrand maintenance on existing PRs and listings, not a
second Wenlan entry.

## Lane 1 — update existing open PRs in place

| Upstream | Existing PR | Upstream stars | Current decision |
| --- | --- | ---: | --- |
| `composio-community/awesome-claude-plugins` | #254 | 1,850 | Update the existing one-line plugin entry to Wenlan and the maintained repository path. |
| `ComposioHQ/awesome-claude-skills` | #852 | 71,488 | Update the existing one-line skill entry to Wenlan and current commands. |
| `tolkonepiu/best-of-mcp-servers` | #225 | 133 | Update the existing structured knowledge-and-memory record to `7xuanlu/wenlan` and `wenlan-mcp`. |
| `YuzeHao2023/Awesome-MCP-Servers` | #266 | 1,053 | Update the existing Knowledge & Memory line to Wenlan. |
| `rohitg00/awesome-devops-mcp-servers` | #231 | 1,012 | Update the existing Memory & Knowledge Systems line to Wenlan. |
| `mcp-finder/awesome-mcp-servers` | #2 | 0 | Update the existing one-line PR; do not open a duplicate. |
| `jvidal86/awesome-claude-code-memory` | #1 | 6 | Update the existing table row and current star value; keep this as a low-reach maintenance lane. |
| `XiaomingX/awesome-ai-memory` | #8 | 163 | Update the existing Simplified-Chinese row to Wenlan and source-backed wiki language. |
| `wfnuser/Awesome-Agent-Memory` | #6 | 17 | Update the existing table row to Wenlan; keep this as a low-reach maintenance lane. |
| `obra/superpowers-marketplace` | #49 | 1,196 | Do not merely rename the old `v0.7.0` plugin manifest. The PR embeds obsolete pre-Wenlan package paths and needs a current marketplace contract, so it remains a separate product-distribution repair rather than a one-line SEO submission. |

The first nine are bounded factual updates to already-open directory PRs. The
Superpowers marketplace PR is not safe to update as a mechanical rebrand: it
points at the retired `origin` plugin name, repository subdirectory, binary,
and version. It is excluded from this directory batch rather than publishing
a broken install path.

## Lane 2 — update accepted pre-Wenlan listings

| Upstream | Acceptance evidence | Current decision |
| --- | --- | --- |
| `TeleAI-UAGI/Awesome-Agent-Memory` | PR #31 closed after maintainer commit `a229ae6` added the pre-Wenlan entry manually | Replace the existing legacy block with Wenlan, current code/docs links, current star badge, and source-backed knowledge-base description. |
| `DhanushNehru/awesome-mcp-servers` | PR #24 merged 2026-06-02 | Rename the existing legacy MCP line to Wenlan; do not add a second line. |
| `toolsdk-ai/toolsdk-mcp-registry` | PR #326 merged 2026-06-04 | Rename the existing registry record and retired MCP package ID to `wenlan` and `wenlan-mcp`, then run the repository validators. |
| `TensorBlock/awesome-mcp-servers` | PR #614 merged 2026-06-01 | Update the existing profile and generated Knowledge Management & Memory surface according to the current registry workflow; do not add a duplicate. |
| `davepoon/buildwithclaude` | PR #152 merged 2026-05-18 | Exclude from this batch. It contains a bundled obsolete pre-Wenlan plugin implementation rather than a directory listing; a safe migration requires a separate product-distribution contract. |

## Lane 3 — new submissions whose current gate can pass

| Upstream | Native repository evidence | Decision |
| --- | --- | --- |
| `gavischneider/awesome-llm-wiki` | 43 stars; exact LLM-wiki compiler/daemon/MCP scope; official `awesome-lint` passes | Submit the prepared one-line `CLI Compilers and Builders` entry. |
| `appcypher/awesome-mcp-servers` | 5,731 stars; contribution guide accepts one item per PR; current README has a `Note Taking` category for personal knowledge-management tools | Prepare and verify one factual `Note Taking` entry from the existing fork, then submit only if its exact current format and link checks pass. |
| `wong2/awesome-mcp-servers` | 4,238 stars; README rejects PRs and routes additions to `mcpservers.org/submit`; the live form requires a contact email and offers an optional $39 Premium path | Do not open a GitHub PR. Keep the submission pending until an approved contact email is available, use only the free listing path, and never select the paid upgrade under this approval. |

## Prerequisite lanes — not submission-ready

### `punkpeye/awesome-mcp-servers`

The prior pre-Wenlan PR #7080 was closed after the repository introduced mandatory
Glama validation. The maintainer comment requires an existing Glama server,
successful runtime/introspection checks, and a Glama score badge in the README
entry. Public Glama API reads returned HTTP 404 for `7xuanlu/wenlan` and the
legacy repository slug at capture. The prepared one-line patch is
therefore not submission-ready. Reopening or duplicating #7080 before the
Glama lane passes would ignore maintainer instructions.

### `hashgraph-online/awesome-codex-plugins`

The current contribution contract requires a public source repository whose
root contains `.codex-plugin/plugin.json`, `assets/icon.svg`, `README.md`,
`SECURITY.md`, and `LICENSE`; HOL scanner CI on the source repository; a score
of at least 80/130; and no high or critical findings. Wenlan's maintained
Codex plugin is currently in the `plugin-codex/` subdirectory, while the
directory generator requires a repository-root plugin bundle and a root GitHub
URL. A directory PR would fail before review. Packaging or extracting a
scanner-compatible source repository is a separate Wenlan product change and
is not silently added to this SEO distribution batch.

## Rejected new candidates

- `alexanderop/awesome-local-first`: the maintainer explicitly limits entries
  to mature, widely used projects. Wenlan's current 46-star observation does
  not establish that gate.
- `IAAR-Shanghai/Awesome-AI-Memory`: the contribution guide accepts research
  papers in paired English/Chinese tables, not software products.
- `ccplugins/awesome-claude-code-plugins`: the catalog vendors copied plugin
  bundles and its source has not been pushed since 2025; it is not a clean
  current listing-only distribution surface.
- `subinium/awesome-claude-code`: the existing fork has no submitted PR and
  the upstream has not moved since 2026-04-25; it is not a current acquisition
  surface compared with the active Claude plugin and skill lists above.
- Generic Obsidian plugin directories: Wenlan syncs Obsidian sources but is not
  an Obsidian-native plugin. Submitting it as one would misstate the product.
- Additional low-star forks of the same LLM-wiki list: duplicate reach is not
  enough to pass the evidence and standalone-utility gate.

## Operational tracking — not a Goal experiment

- Objective: replace stale pre-Wenlan discovery paths with accurate Wenlan
  entries and add a small number of high-fit directory paths without another
  same-intent article.
- Baseline: GitHub reports 46 Wenlan stars. The latest authenticated GSC
  property totals remain 10 clicks and 660 impressions; Vercel remains 1,468
  visitors in its separate same-range observation. These units remain
  separate and are not attributed to directory activity.
- Change: update existing external PRs and accepted listings in place; add only
  the approved new high-fit entries. No Wenlan website or analytics change.
- Integrity floor: no duplicate entry, inaccurate claim, broken current link,
  or unsupported install path may be published.
- Just-in-time duplicate gate: immediately before every external push or form
  submission, search the current upstream default branch, open and closed PRs
  from every author, and the supported directory surface for the Wenlan name
  and repository URL. Update an existing path when one exists; stop instead of
  submitting a second entry when ownership or state is ambiguous.
- Stop: duplicate entry, inaccurate claim, maintainer request for unsupported
  metrics or rankings, broken install path, security/license regression, or a
  prerequisite that requires an unapproved product change.
- Observations: append campaign observations after 24 hours and seven complete
  live days for PR state, maintainer feedback, direct listing presence, and
  listing-days. GitHub, GSC, Vercel, and authenticated Umami remain separate
  native-unit observations when available.

This is a distribution action under the approved Goal, not a new website or
search experiment. It does not add an active experiment to the deterministic
ledger and does not consume the website production slot.

No causal claim, keyword-volume claim, source-to-page join, or synthetic event
is authorized by this publication scope.
