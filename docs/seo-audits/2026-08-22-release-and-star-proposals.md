# Wenlan v0.16.0 release alignment and GitHub star proposals — 2026-08-22

## Decision boundary

This artifact prepares two independent proposals. It does not change or publish
the website or any Wenlan repository README.

1. **Release alignment:** a factual correction from the deployed website's
   `v0.15.8` release surface to GitHub's current `v0.16.0` release.
2. **GitHub star CTA:** an optional visitor-to-star conversion experiment for
   the four localized Wenlan READMEs.

The release correction must not be reported as an SEO or star-growth result.
The star CTA must not be folded into the release correction, because doing so
would remove the ability to observe them separately.

## Source-native evidence

Captured on 2026-08-22.

- GitHub Releases reports [`v0.16.0`](https://github.com/7xuanlu/wenlan/releases/tag/v0.16.0)
  as the latest release, published at `2026-08-19T03:57:54Z`.
- The tagged [`app/tauri.conf.json`](https://github.com/7xuanlu/wenlan/blob/v0.16.0/app/tauri.conf.json)
  declares product version `0.16.0`, an active desktop bundle, updater
  artifacts, and the unified `latest.json` updater endpoint.
- The tagged English, zh-Hans, zh-Hant, and Spanish READMEs explicitly instruct
  Windows x64 users to run the release `-setup.exe`. They separately retain a
  headless Windows runtime archive path.
- The tagged [`docs/setup-with-ai.md`](https://github.com/7xuanlu/wenlan/blob/v0.16.0/docs/setup-with-ai.md)
  still directs headless Windows setup to `wenlan-windows-x64.zip`. Therefore
  the setup executable and runtime ZIP are separate valid paths; neither should
  replace the other.
- A rendered production read of `https://wenlan.app/`, `/download`, and `/about`
  still showed `v0.15.8`. The production download page linked only the
  `v0.15.8` Windows runtime ZIP, macOS DMG, and four runtime builds, while the
  about page said Windows had no desktop app. The checked `origin/main` source
  contains the same stale claims, so this is source and deployment drift rather
  than a client-rendering artifact.

### Current v0.16.0 assets needed by the website

| Website id | GitHub asset | Native role | Size shown on site |
| --- | --- | --- | ---: |
| `windows-desktop-x64` | `Wenlan_0.16.0_x64-setup.exe` | Windows desktop installer | 59.5 MiB |
| `windows-x64` | `wenlan-windows-x64.zip` | Windows headless runtime | 73.7 MiB |
| `macos-arm64` | `Wenlan_0.16.0_aarch64.dmg` | macOS desktop preview | 83.7 MiB |
| `macos-runtime-arm64` | `wenlan-darwin-arm64.tar.gz` | macOS headless runtime | 50.2 MiB |
| `linux-x64` | `wenlan-linux-x64.tar.gz` | Linux headless runtime | 64.3 MiB |
| `linux-arm64` | `wenlan-linux-arm64.tar.gz` | Linux headless runtime | 63.1 MiB |

GitHub asset sizes are source-native byte counts rendered here as MiB to one
decimal place. Download counts are deliberately omitted from the proposed
copy: they are cumulative counters, not product quality or platform demand.

## Proposal A — isolated v0.16.0 factual correction

### Release contract

Update `src/lib/releases.ts` to:

- `version: "0.16.0"`
- `tag: "v0.16.0"`
- `publishedAt: "2026-08-19"`
- use the `v0.16.0` release, download, setup-guide, and README anchors;
- add `windows-desktop-x64` as a first-class asset before the existing
  `windows-x64` headless runtime;
- retain all five existing asset ids and update their filenames and sizes.

Update `src/lib/platform-recommendation.ts` so an unambiguous Windows x64
desktop user agent recommends `windows-desktop-x64`. The complete download hub
must still show both Windows choices. Mobile and ambiguous user agents continue
to fall back to the hub.

No component redesign is required. The existing homepage and download-page
components already render the release array generically, preserve one device
recommendation, and link to the full download hub.

### Exact trilingual homepage and download copy

Add a sixth platform id to `src/i18n/content/schema.ts` and add the following
localized platform before the existing Windows runtime entry.

**English**

- Name: `Wenlan Desktop`
- Architecture: `Windows · x64`
- Description: `Install the desktop app with its bundled daemon, CLI, MCP connector, and runtime libraries. No WSL or Rust toolchain required.`
- Action: `Download Windows desktop`
- Package: `Desktop app · bundled runtime`
- Steps:
  1. `Download and run the x64 setup executable.`
  2. `Open Wenlan. The app starts its bundled daemon and offers to connect detected AI clients.`
  3. `Check the app status or run wenlan doctor to verify the local runtime.`

Change the old Windows entry to `Windows runtime`, architecture
`x64 · headless`, and action `Download Windows runtime`; retain its ZIP, PATH,
and `wenlan doctor` instructions.

Use these release summaries:

- Home: `Wenlan v0.16.0 ships desktop installers for Windows x64 and macOS Apple silicon, plus headless runtime builds for Windows, macOS, and Linux.`
- Download page: `The current release provides desktop builds for Windows x64 and macOS Apple silicon plus four native headless runtime archives.`
- Download SEO description: `Download the Wenlan desktop app for Windows x64 or macOS Apple silicon, or install the headless CLI, local daemon, and MCP connector for Windows, macOS, and Linux.`

**繁體中文**

- 名稱：`Wenlan Desktop`
- 架構：`Windows · x64`
- 說明：`安裝內建 daemon、CLI、MCP connector 與所需 runtime libraries 的桌面 App；不需要 WSL 或 Rust toolchain。`
- 動作：`下載 Windows 桌面版`
- 套件：`桌面 App · 內建 runtime`
- 步驟：
  1. `下載並執行 x64 setup 安裝檔。`
  2. `開啟 Wenlan；App 會啟動內建 daemon，並提供連接偵測到的 AI 用戶端。`
  3. `查看 App 狀態，或執行 wenlan doctor 驗證本地 runtime。`

將舊 Windows 項目改為 `Windows runtime`、`x64 · headless` 與
`下載 Windows runtime`，保留 ZIP、PATH 與 `wenlan doctor` 指示。

- 首頁：`Wenlan v0.16.0 提供 Windows x64 與 macOS Apple silicon 桌面版，以及 Windows、macOS、Linux 的 headless runtime 套件。`
- 下載頁：`目前版本提供 Windows x64 與 macOS Apple silicon 桌面版，以及四個原生 headless runtime 套件。`
- 下載 SEO：`下載 Windows x64 或 macOS Apple silicon 的 Wenlan 桌面 App，或安裝支援 Windows、macOS 與 Linux 的 headless CLI、本地 daemon 與 MCP connector。`

**简体中文**

- 名称：`Wenlan Desktop`
- 架构：`Windows · x64`
- 说明：`安装内置 daemon、CLI、MCP connector 与所需 runtime libraries 的桌面 App；不需要 WSL 或 Rust toolchain。`
- 动作：`下载 Windows 桌面版`
- 套件：`桌面 App · 内置 runtime`
- 步骤：
  1. `下载并运行 x64 setup 安装程序。`
  2. `打开 Wenlan；App 会启动内置 daemon，并提供连接检测到的 AI 客户端。`
  3. `查看 App 状态，或运行 wenlan doctor 验证本地 runtime。`

将旧 Windows 项目改为 `Windows runtime`、`x64 · headless` 与
`下载 Windows runtime`，保留 ZIP、PATH 与 `wenlan doctor` 指引。

- 首页：`Wenlan v0.16.0 提供 Windows x64 与 macOS Apple silicon 桌面版，以及 Windows、macOS、Linux 的 headless runtime 包。`
- 下载页：`当前版本提供 Windows x64 与 macOS Apple silicon 桌面版，以及四个原生 headless runtime 包。`
- 下载 SEO：`下载 Windows x64 或 macOS Apple silicon 的 Wenlan 桌面 App，或安装支持 Windows、macOS 与 Linux 的 headless CLI、本地 daemon 与 MCP connector。`

### About, docs, machine-readable surfaces, and tests

The isolated implementation should touch only the source surfaces that carry
the stale release fact or enforce its contract:

| File | Required correction |
| --- | --- |
| `src/i18n/content/en.ts` | Release, homepage/download, about, and get-started facts; add distinct Windows desktop and runtime entries. |
| `src/i18n/content/zh-TW.ts` | Same facts in zh-TW. |
| `src/i18n/content/zh-CN.ts` | Same facts in zh-CN. |
| `src/i18n/content/schema.ts` | Permit `windows-desktop-x64`. |
| `src/lib/releases.ts` | Pin the six v0.16.0 website assets and source URLs. |
| `src/lib/platform-recommendation.ts` | Recommend the installer, not the headless ZIP, to Windows x64 browsers. |
| `src/app/(en)/docs/docs.ts` | Remove the false `no current desktop app release` and macOS-only desktop-path claims; update platform support, app source tag, and changelog to v0.16.0. |
| `src/app/structured-data.ts` | Keep runtime support separate, update the tagged app source, and state that desktop builds ship for macOS Apple silicon and Windows x64. `softwareVersion` updates through `WENLAN_RELEASE`. |
| `public/llms.txt` | Update the tagged app-source link and desktop-platform sentence. |
| `src/app/(en)/llms-full.txt/route.ts` | Apply the same machine-readable correction. |
| `src/app/(en)/about/opengraph-image.tsx` | Replace the stale release footer with `v0.16.0`. |
| `scripts/download-recommendation.test.mjs` | Require Windows x64 to select `windows-desktop-x64`; retain all ambiguity fallbacks. |
| `scripts/seo-github-fetch.test.mjs` | Replace the current-release fixture with all six website-linked v0.16.0 assets and recompute cumulative expectations. |

The changelog section should summarize only first-party v0.16.0 release facts:
Windows desktop packaging, portable runtime paths/tests, page truth badges,
the two-zone knowledge graph, human-reviewed page capability, restored page and
community maps, daemon auto-start, and the durable offline outbox. It should
retain the macOS non-notarization warning supported by the tagged README and
must not invent Windows code-signing or SmartScreen behavior.

Implementation verification floor:

```text
pnpm lint
pnpm test:seo
pnpm build
pnpm seo:technical:built
```

### Prepared exact patch — not applied

The reviewable implementation is stored as
`docs/seo-audits/2026-08-22-wenlan-v0.16.0-proposal.patch`. The patch is the
authoritative candidate when a prose example above is less exact.

- Base: `origin/main` at
  `721b862cde31a767f58c58a46c9f734a1a660114`.
- Scope: 15 files, 150 insertions, 92 deletions.
- SHA-256:
  `6dce422661f86a6303c5445ae12fb5727bd2ecaa4a2c3625a39d65b6374a4f98`.
- The candidate also updates the sitemap dates for the changed About and Get
  Started surfaces, localizes the new Chinese platform labels instead of
  copying English fallback text, refreshes the fixed translation source
  hashes, and changes the app-source contract test to follow the authoritative
  release tag instead of hard-coding the next version again.
- `git apply --check --reverse` passed against the isolated candidate, proving
  that the saved patch matches the verified working diff.

Verification in the isolated worktree:

```text
pnpm lint                                  pass
pnpm test:i18n                            63/63 pass
pnpm test:seo                             224/224 pass
pnpm build                                pass, 223 static pages generated
pnpm seo:technical:built                  pass
git diff --check                          pass
```

The first sandboxed build attempt could not fetch the configured Google Fonts;
the same build passed with network access. A prior attempt using an external
`node_modules` symlink was rejected by Turbopack before compilation and was
replaced with an ordinary isolated install. Neither failure is a source-code
failure.

After a separately approved merge and automatic deployment, verify the three
locale homepages, three locale download pages, `/about`, exact asset URLs,
structured data, canonical/indexability, and a real Windows x64 recommendation
render. Publication would be a factual release correction, not a new search
experiment and not evidence of traffic or star causality.

## Proposal B — separate GitHub visitor-to-star experiment

### Hypothesis and placement

Hypothesis: after the README has shown the source-backed desktop product, one
restrained localized request may convert some already-interested GitHub
visitors into stars. This is unproven because GitHub does not provide a native
README-view-to-star funnel.

Place one line immediately after the desktop screenshot caption and before the
first horizontal rule in each README. This waits until after visible product
proof, remains above the install detail, and avoids adding another badge or a
repeated CTA wall.

Exact proposed copy:

- `README.md`: `If Wenlan helps your work, consider starring the repository—it helps more people discover the project.`
- `README.zh-Hant.md`: `如果 Wenlan 對你的工作有幫助，歡迎為這個 repository 加星，讓更多人看見這個專案。`
- `README.zh-Hans.md`: `如果 Wenlan 对你的工作有帮助，欢迎为这个 repository 加星，让更多人发现这个项目。`
- `README.es-ES.md`: `Si Wenlan te ayuda en tu trabajo, considera marcar el repositorio con una estrella para que más personas descubran el proyecto.`

Implementation rules if separately approved:

- edit the four localized READMEs together;
- preserve the `README_SYNC` contract and run
  `python3 scripts/check-readme-translations.py` plus its repository-prescribed
  README checks;
- do not add a star-count badge, modal, repeated request, or website CTA in the
  same experiment;
- record the publication time and source-native GitHub star count before the
  merge, then observe only total stars in their native unit;
- do not claim a README-view conversion rate or causality, because repository
  impressions and per-visitor star attribution are unavailable.

## Recommendation

Review and publish Proposal A first only after separate approval because it
corrects a publicly false platform statement and exposes the current Windows
desktop UI. The exact patch is prepared and verified but remains unapplied.
Keep Proposal B as a later, isolated conversion experiment. Neither proposal
authorizes a website or README edit, commit, push, PR, merge, or deployment in
this record.
