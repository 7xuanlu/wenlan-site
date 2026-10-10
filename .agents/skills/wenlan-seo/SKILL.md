---
name: wenlan-seo
description: Continue Wenlan site SEO research, page decisions, measurement, or Claude/Codex handoffs using the shared project workflow. Use in the wenlan-site repository; not a generic SEO data provider.
---

# Wenlan SEO

Use the current `wenlan-site` checkout. Paths below are relative to its repository
root, not this skill directory. If the project files are absent, locate the intended
checkout before proceeding; do not create a replacement workflow.

1. Read `AGENTS.md` SEO Campaign Control Plane, run `pnpm seo:goal:control`,
   and read the returned guide plus only the task-matched bookmarks. Stop on a
   failed control check. Follow the same read requirements after a handoff.
2. Read `docs/seo-demand-workflow.md` for shared decisions and replaceable tool
   routing, then the relevant row in `docs/seo-growth-recovery.md` and its linked
   evidence. Use that workflow's **Claude and Codex continuity** section when
   switching hosts. Keep its records authoritative; do not copy them into this skill.
3. Address the user's concrete question with available, verified capabilities.
   Reuse an installed research/brief skill when it supplies the needed output;
   its availability on one host does not establish access on the other. Preserve
   project judgment, locale/market differences, source units and unknowns.
4. Return the decision, supporting evidence, remaining gap and next check.
   Update the existing decision record when the state changes, not a parallel
   report or keyword backlog. This invocation adds no publishing or spending
   authorization and does not automatically contact another agent.
5. When the work changes an indexable page, the PR needs a `## Recrawl after deploy`
   list; hooks and CI enforce it. After merge, give the user the list from
   `pnpm seo:recrawl:pending` and follow `docs/seo-growth-loop.md#recrawl-after-page-changes`.
