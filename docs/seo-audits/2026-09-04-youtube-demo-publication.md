# Three-locale YouTube demos — 2026-09-04

The user approved uploading all three supplied demo files as **Unlisted**, usable by direct link and embedded on the website. This is not a public YouTube launch or an approval to publish other channels.

## Verified publication

Channel: Qi-Xuan 奇軒 (`UCXLHf4AzsR17L8jAnXGjdWw`). YouTube Studio's refreshed content list showed all three videos as Unlisted at approximately `2026-09-04T06:50:00Z`; this is the verification time, not an exact server publication timestamp. Studio displays the local upload date as September 3, 2026.

| Website locale | Supplied file in Documents/Wenlan Demo Clips | YouTube link | Language setting |
| --- | --- | --- | --- |
| English | `wenlan-launch-v17.mp4` | https://youtu.be/1K_Zjogwxrw | English |
| zh-TW | `wenlan-launch-v17-zh-Hant.mp4` | https://youtu.be/bTGvS8wg4rQ | Chinese (Traditional) |
| zh-CN | `wenlan-launch-v17-zh-Hans.mp4` | https://youtu.be/Ie3FvmDo4Ho | Chinese (Simplified) |

- All three uploads reached 100%; processing and copyright/community checks completed with no issues reported before final Unlisted save.
- Allow embedding was checked. Subscription-feed publication/notifications were unchecked. Category: Science & Technology. The software demos were marked not made for kids.
- Each description contains a natural localized product introduction, the locale-specific YouTube campaign URL from `docs/launch-links.md`, and the official GitHub repository link.
- No public playlist, premiere, paid promotion, external social post, or indexing request was created.
- The three supplied v17 edits were uploaded unchanged. They are not relabeled recordings of a particular patch release; the v0.17.7 campaign label identifies the launch links, not a claim that all recorded UI came from that patch.

## Measurement and website boundary

YouTube Studio views, watch time, and traffic sources are video-native observations. Website visitors/referrers, website play-button clicks, GitHub asset downloads, and stars remain separate; an embed click is not a completed view or install. QA playback must not be presented as user acquisition.

The homepage integration is prepared locally on `codex/launch-measurement-video`. Website commit, push, PR, merge, and Vercel production deployment are not performed by the video upload approval. Verify the locale-specific poster and click-to-load iframe before handing off this branch.

## Local integration verification

Verified against a fresh production build served at `http://127.0.0.1:3127`, after the final localized-label edits:

- English, zh-TW, and zh-CN homepages select their own video and poster. The existing click-to-load, `youtube-nocookie.com` iframe remains in place; no autoplaying iframe loads before the visitor chooses to play.
- All three embedded videos actually played with the correct localized titles/subtitles. Desktop and exact 393px mobile screenshots were inspected inline; these are local-build observations, not deployed-site verification.
- Functional/design pass: the play control, poster, existing rounded frame, and responsive player remain usable. No blocked-embed error was observed.
- Separate CJK pass: both Chinese poster labels fit without clipping, and the localized burned-in subtitles are visible. No horizontal player overflow was observed. Mobile video text is necessarily small; fullscreen remains available.
- This playback is QA, not evidence of organic viewers, acquisition, or completed video views.

| Check | Result |
| --- | --- |
| Focused demo-video tests | 3/3 pass; implementation followed failing tests |
| `pnpm test:i18n` | 81/81 pass |
| `pnpm lint` | Pass |
| `pnpm build` | Pass; local postbuild skipped IndexNow |
| `pnpm seo:technical:built` | Pass: 168 sitemap URLs, 26 redirects, 7 intentional noindex rules, 24 HTML checks; 172 HTML files checked for absence of FAQPage |
| `pnpm seo:goal:check` | Pass |
| `git diff --check` | Pass |
| `pnpm test:seo` | **266/270 pass; 4 release-version checks fail** |

### Release-version test blocker

The four failing SEO checks concern desktop-app source facts, root metadata, security documentation, and current-release surfaces. Their local source-tag lookup now selects `v0.17.8`, while the authenticated GitHub release observations made during this verification showed:

- `releases/latest`: `v0.17.7`, `prerelease: false`, published `2026-09-04T00:39:42Z`, 13 assets including desktop installers and updater/checksum files.
- `releases/tags/v0.17.8`: `prerelease: true`, published `2026-09-04T06:44:43Z`, six runtime archives and no desktop installers at capture time.

The website therefore retains the complete stable `v0.17.7` downloads. The four failures were not bypassed or relabeled as passes, and no nonexistent v0.17.8 desktop links were added. Resolve stable-release selection and rerun the affected checks before website publication; release status may change after this capture.
