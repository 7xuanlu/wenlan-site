# Wenlan Source Release-Boundary Audit — 2026-07-25

Status: local public-site correction prepared and verified. Commit, push, PR,
merge, automatic Vercel deployment, and production verification were
explicitly approved at `2026-07-27T04:00:43Z`; indexing requests and external
publication remain approval-gated.

## Question

Did the website contract inspect the latest published `wenlan` and
`wenlan-app` releases, and what can the public site now state about Windows?

## Source evidence

Refreshed at `2026-07-27T03:02:34Z`.

| Repository | Published release | Current source observation | Public boundary |
| --- | --- | --- | --- |
| `7xuanlu/wenlan` | `v0.15.0`, published `2026-07-26T05:13:54Z` | The release contains PR #382's Windows Vulkan runtime work and ships native Windows, macOS, and Linux archives. | The website may present the released Windows runtime and direct `v0.15.0` downloads. |
| `7xuanlu/wenlan-app` | `v0.14.0`, published `2026-07-20T14:45:22Z` | Main includes later Windows compatibility and Page Map work, but no newer desktop-app release is published. | The website must not present a released Windows desktop app. |

The local Wenlan checkout fetched the immutable `v0.15.0` tag for verification.
The dirty wenlan-app checkout was not pulled, reset, or modified. Its published
facts continue to come from the immutable highest local version tag.

## Released runtime artifacts

The `v0.15.0` release exposes these direct public packages:

| Platform | Asset | Published size | Read-only URL check |
| --- | --- | ---: | --- |
| Windows x64 | `wenlan-windows-x64.zip` | 66.3 MB | Redirect followed to GitHub release assets; HTTP 200 |
| macOS Apple silicon | `wenlan-darwin-arm64.tar.gz` | 45.6 MB | Redirect followed to GitHub release assets; HTTP 200 |
| Linux x64 | `wenlan-linux-x64.tar.gz` | 56.5 MB | Redirect followed to GitHub release assets; HTTP 200 |
| Linux ARM64 | `wenlan-linux-arm64.tar.gz` | 50.7 MB | Redirect followed to GitHub release assets; HTTP 200 |

The tagged release workflow packages `wenlan.exe`, `wenlan-server.exe`,
`wenlan-mcp.exe`, `onnxruntime.dll`, `vulkan-1.dll`, and the Vulkan runtime
license together in the Windows ZIP. It smoke-tests the package and required
runtimes. The tagged setup guide instructs Windows users to extract the ZIP as
one unit into a user-owned directory on `PATH`, keep the DLLs beside the
executables, then run:

```text
wenlan setup --basic
wenlan background on
wenlan status
```

This is a released native headless runtime. It is not a released Windows
desktop app, installer, signer, or updater.

## Original contract defect

`scripts/app-contract.test.mjs` called the current wenlan-app working tree a
release. The local package and backend pin were already `0.14.1`, while GitHub
still published only `v0.14.0`. The test could therefore accept unreleased
metadata.

The focused RED assertion compared the inferred app tag with the checkout's
highest version tag:

```text
actual:   v0.14.1
expected: v0.14.0
```

The correction reads package, Tauri, Cargo, backend-pin, Remote Access UI,
translation, and runtime facts from the immutable app tag with `git show`,
fails closed when tags are unavailable, and accepts both released and keyed
backend-pin manifest shapes.

## Public-site correction

- Add one release contract for the exact `v0.15.0` tag, release page, setup
  guide, four direct asset URLs, formats, and published sizes.
- Add a visible homepage Download section with a featured Windows runtime and
  macOS/Linux packages, preserving the existing Wenlan visual system.
- Make the primary homepage action reach the Download section and record the
  bounded `setup_path_click` diagnostic.
- Track direct release-asset clicks as `github_outbound` with
  `placement="home-download"`.
- Add exact Windows/macOS/Linux setup steps to English, Traditional Chinese,
  and Simplified Chinese Get Started pages.
- Align About, structured data, changelog, platform/security/build docs,
  sitemap modification dates, and the About social image with `v0.15.0`.
- Keep the runtime-versus-desktop-app boundary explicit in every public claim.
- Preserve localized technical tokens while preventing Chinese fallback copy
  and awkward mobile breaks in `直接`, `選擇` / `选择`, and `不需要`.

## Verification

- `pnpm seo:goal:check`: passed before the campaign action.
- `pnpm test:seo`: 189 passed, 0 failed.
- `pnpm test:i18n`: 53 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm build`: passed; 211 static pages generated and IndexNow skipped
  outside production.
- `pnpm seo:technical:built`: passed; 110 sitemap URLs, 26 redirects, seven
  noindex headers, 14 checked HTML pages, and no `FAQPage` schema across 114
  built HTML files.
- All four direct release asset URLs returned HTTP 200 after their GitHub
  redirects.
- Fresh production-build visual QA covered Home, Get Started, and About in
  English, Traditional Chinese, and Simplified Chinese at `1440x1000` and
  `393x852`: 18/18 routes returned HTTP 200, none had horizontal overflow,
  all homepage asset links were present, the Download anchor and Windows
  focus target worked, and no page or console error was recorded.
- The first CJK pass found an unnatural mobile `直 / 接` break and possible
  `選 / 擇` and `不需 / 要` breaks. Word-joiner protection fixed those exact
  compounds; the site was rebuilt and the complete 18-route capture set was
  regenerated and re-inspected.
- Fresh visual evidence is under
  `/private/tmp/wenlan-visual-qa-2026-07-26/`.

## Adjacent SEO-cluster decision

The same authenticated GSC evidence window is recorded separately in
`2026-07-26-llm-wiki-obsidian-knowledge-cluster.md`. The existing LLM-wiki,
Obsidian, and knowledge-base URLs already cover the requested intents and are
production measurement cohorts. Do not mix another content hypothesis into
this release/download correction.

After this correction is production-verified, the next eligible SEO change is
a bounded internal-link closure across those existing pages. It does not
require a duplicate `AI notes` or generic `knowledge base` article.

## Boundaries

No source repository was modified. No Git push, PR, merge, deployment,
indexing request, GSC validation, external post, OSS submission, paid
acquisition, account mutation, or metric-definition change was performed.
