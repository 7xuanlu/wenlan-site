# Download and signup attribution prelaunch — 2026-08-01

## Decision

Prepare one bounded measurement correction that keeps three source-native
layers separate:

- GitHub REST is the authority for cumulative release-asset downloads and
  repository stars.
- Umami records anonymous `github_outbound` and successful
  `waitlist_signup` events with the existing bounded event properties.
- Resend owns the submitted email and, only after its contact properties are
  initialized and the production flag is enabled, stores bounded acquisition
  context with that contact.

This does not claim that an Umami click caused a GitHub download or that a
GitHub download belongs to a Resend contact. Email is never sent to Umami.

## Homepage placement

The waitlist remains in the homepage closing CTA at the bottom of the page.
It is not immediately below the Download section: the Download section is
followed by the demo video and the rest of the homepage narrative before the
closing CTA. This correction does not move or restyle the form.

## GitHub baseline

The new deterministic `pnpm seo:github:fetch -- --date 2026-08-01` command
captured GitHub REST evidence at `2026-08-01T16:47:51.633Z` under
`/tmp/wenlan-seo/github-metadata.json`:

- repository stars: 46;
- current public release: `v0.15.3`;
- cumulative downloads across the four assets linked from `wenlan.app`: 19;
- per linked asset: macOS ARM64 5, Linux ARM64 0, Linux x64 10, Windows x64 4;
- cumulative downloads across all assets in all 44 returned releases: 1,376.

These are point-in-time counters. They are not a same-range analytics total
and do not replace Umami outbound-click evidence.

The fetcher reads the current tag and exact website-linked asset names from
`src/lib/releases.ts`, validates every counter, writes only to
`/tmp/wenlan-seo`, and is auto-detected by the weekly report pipeline. When
anonymous REST is rate-limited, it can fall back to the already-authenticated
`gh` CLI without exposing a token.

## Signup flow

After Resend successfully creates the contact, the browser sends one anonymous
`waitlist_signup` Umami event with `placement=home-footer`, the current locale,
`context=home`, and `destination_category=email`. No email, UTM value,
referrer, path, or stable identifier is included in that event.

The form captures only these bounded server-submitted fields for optional
Resend contact properties:

- `signup_locale`;
- `signup_landing_path`;
- `signup_referrer_host`;
- `signup_utm_source`;
- `signup_utm_medium`;
- `signup_utm_campaign`.

The source fields are capped at 120 characters and control characters are
removed. The referrer is reduced to its hostname; its full path and query are
not stored. Resend API errors now return a form error instead of being
mistaken for a successful signup.

## Fail-safe account gate

`RESEND_ACQUISITION_PROPERTIES_ENABLED` defaults off. Existing signups keep
working without acquisition properties. Before enabling it in production:

1. run `pnpm resend:contact-properties:ensure` with the production
   `RESEND_API_KEY`;
2. verify all six string properties exist in Resend;
3. set `RESEND_ACQUISITION_PROPERTIES_ENABLED=1` in Vercel;
4. deploy and perform one consented signup smoke test.

The same verification found and corrected a pre-existing release drift: the
source and public GitHub release were already `v0.15.3`, while the site still
linked and described `v0.15.2`. The local release contract, localized copy,
download URLs, About image, and release documentation now match the public
`v0.15.3` tag and its immutable asset sizes.

The production Resend and Umami variables were already present in Vercel; no
secret value was copied into this worktree or printed. On 2026-08-01, all six
bounded string properties were created and verified in Resend, and
`RESEND_ACQUISITION_PROPERTIES_ENABLED=1` was added to Vercel Production and
Preview. A new deployment is required before the local code begins attaching
those properties. No synthetic event or test contact was created.

The production-key `seo:resend:fetch` path was also verified without copying
secrets to disk. Its latest completed 28-day aggregate for the configured
audience contained 2 subscribed contacts in total, 0 contacts created in
range, and 0 attributed contacts in range. The generated JSON contains
aggregate totals and empty breakdowns only; it contains no email address.

## Local verification

Final verification completed at `2026-08-01T17:03:53Z`:

- `pnpm seo:goal:check`: pass;
- `pnpm lint`: pass;
- `pnpm test:seo`: 209 passed, 0 failed, using the explicit Wenlan and
  wenlan-app sibling roots;
- `pnpm test:i18n`: 58 passed, 0 failed;
- `pnpm build`: pass, 214 static/SSG pages generated; the non-production
  postbuild correctly skipped IndexNow;
- `pnpm seo:technical:built`: pass, including 113 sitemap URLs, 17 key HTML
  pages, 26 redirects, seven noindex header rules, and site-wide absence of
  `FAQPage` JSON-LD;
- `pnpm seo:weekly:sample`: pass as pipeline health only.

Fresh English, zh-TW, and zh-CN desktop and mobile renders had no horizontal
overflow. The existing closing CTA and all three mobile waitlist form views
matched the deployed reference at 100/100 pixel similarity. DOM inspection
confirmed the current locale, landing path, referrer host, and test UTM
source/medium/campaign were present in the intended hidden fields; none are
sent in the anonymous Umami event.

The final diff review also corrected the v0.15.3 changelog date and removed
older-release bullets from the v0.15.3 highlights. The public copy now tracks
the official 2026-08-01 release note rather than mechanically carrying
v0.15.2 material forward.

## Approval boundary

The user approved completing this exact measurement scope. Resend property and
Vercel environment setup are complete. Commit, push, PR, merge, automatic
deployment, and read-only production verification are authorized for this
branch. A synthetic analytics event remains forbidden; a consented live signup
requires an address supplied for that purpose.

## Post-review verification

At `2026-08-01T19:09:02Z`, the fresh-eye review returned `MERGE` after four
findings were corrected: unsafe client-reported attribution is rejected at
ingestion and export, GitHub credentials cannot follow a custom API base URL,
Resend property setup reads bounded cursor pages, and GitHub release listing
has a shared 1,000-release cap for REST and `gh` fallback paths.

The final post-review run passed 215 SEO tests, 58 i18n tests, TypeScript, the
Goal verifier, the 214-page production build, compiled technical SEO, 22
expected localized 200 routes, 5 expected localized 404 routes, the weekly
fixture pipeline, and `git diff --check`. The configured-audience Resend fetch
also passed again with 2 total subscribed contacts and no contacts or
attributed contacts in the completed GSC-aligned range.
