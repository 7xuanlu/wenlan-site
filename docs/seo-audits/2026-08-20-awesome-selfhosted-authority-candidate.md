# Awesome Selfhosted authority candidate

## Verdict

Prepare one factual data-file contribution for human review. Do not submit it
automatically.

This is the only current authority candidate strong enough to displace more
on-page work or another small directory PR. Passing the gate does not predict
a merge, referral, star, GSC impression, or Vercel visitor.

## Source-native gate

Captured at `2026-08-21T04:43:02Z`.

- The rendered `awesome-selfhosted/awesome-selfhosted` repository is active
  and reports 314,007 GitHub stars. Its source-data repository separately
  reports 1,107 stars; these units are not combined.
- Recent additions were merged through `2026-08-17`, including submissions
  created on July 31, August 2, and August 3. The contribution lane is active,
  although review latency varies from days to months.
- The current contribution contract requires one YAML file, active
  maintenance, working installation instructions, no duplicate listing, and
  a first release more than four months old.
- Wenlan `v0.1.0` was published at `2026-04-19T22:09:18Z`; the age gate passed
  after `2026-08-19T22:09:18Z`. The current public release is `v0.16.0`,
  published at `2026-08-19T03:57:54Z` with 12 assets.
- GitHub currently reports Wenlan as active, Apache-2.0 licensed, and at 48
  stars. Awesome Selfhosted's published addition contract does not impose a
  star minimum.
- `https://wenlan.app`, the latest GitHub release, `docs/setup-with-ai.md`,
  and the CLI README all return HTTP 200. The public README documents a
  headless Linux runtime, one local daemon, and HTTP and MCP access; Wenlan is
  not being submitted as a desktop-only notes application.
- Exact searches found no Wenlan match in the source-data repository, its open
  or closed issues and pull requests, or `awesome-foss/awesome-sysadmin`.
  The required `staticgen.com`, `staticsitegenerators.bevry.me`, and
  `dbdb.io/browse` pages returned 200 and contained no Wenlan or `7xuanlu`
  match.

## Exact candidate

File: `software/wenlan.yml`

```yaml
name: Wenlan
website_url: https://wenlan.app
source_code_url: https://github.com/7xuanlu/wenlan
description: Local source-backed AI knowledge base that turns documents and agent work into maintained Markdown pages with citations, MCP and HTTP access, and human review.
licenses:
  - Apache-2.0
platforms:
  - Rust
tags:
  - Knowledge Management Tools
  - Generative Artificial Intelligence (GenAI)
```

`Knowledge Management Tools` is intentionally first because the rendered
single-page list uses the first tag as the primary category. Do not use
`Wikis`: that category is defined as collaboratively edited through a web
browser. Do not claim Docker support. `depends_3rdparty` is omitted because
the core daemon and retrieval path run locally; optional model providers do
not make an external service mandatory.

## Human-review and publication boundary

The contribution guide says machine or LLM-generated contributions that do
not respect the project rules can result in a ban. In PR #2785, maintainers
also rejected a similar AI developer tool partly because of generated prose
and the project's AI-heavy development style. This makes blind automated
submission a reputational risk even though the mechanical gate passes.

Before any external action, the user should personally confirm the six factual
YAML fields and approve the exact one-file PR. If approved, preserve the
repository's pull-request template, check only verified boxes, and add no
marketing narrative, generated walkthrough, maintainer ping, or automated
reply. An open PR will remain attempted distribution; only a merge and
rendered exported listing count as inspectable authority.

## Local upstream validation

Validated at `2026-08-21T04:47:45Z` in an isolated clone of upstream commit
`237fd410a7e9d8ba68a2cc7b4324ae604728e14b`.

- The temporary diff contains only untracked `software/wenlan.yml`; no fork,
  push, issue, or PR exists.
- `make install` succeeded with upstream's pinned
  `nodiscc/hecat@1.6.0` toolchain.
- `make export_markdown` succeeded. The generated single-page list places the
  exact Wenlan line under `Knowledge Management Tools` with its website,
  source-code link, Apache-2.0 license, and Rust platform.
- `git diff --check` succeeded.
- `make awesome_lint` did not pass. Its only error is the pre-existing
  `ZincSearch` record because `zincsearch/zincsearch` is now archived. No
  Wenlan finding was emitted.

The last successful upstream build observed was for commit
`144b51d5231dda844ff4c9ed1fae250b32edde15` at `2026-08-20T18:43:30Z`.
Current master advanced afterward through the metadata bot to the tested
`237fd410...` commit. A new pull request would rerun the whole-tree lint and is
therefore expected to fail until upstream removes or explicitly exempts the
archived ZincSearch entry.

Do not hide or repair that unrelated upstream failure inside the Wenlan PR.
After explicit publication approval, fetch current master and require its
unchanged baseline plus the one-file candidate to pass the current PR workflow
before pushing.
