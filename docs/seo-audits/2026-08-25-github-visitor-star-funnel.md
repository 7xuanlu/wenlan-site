# Wenlan GitHub visitor-to-star funnel — 2026-08-25

## Scope and evidence boundary

Captured at `2026-08-25T08:02:46Z` from authenticated, read-only GitHub REST
traffic and stargazer endpoints for `7xuanlu/wenlan`. GitHub's traffic API
returned its fixed recent 14-day series for `2026-08-11..2026-08-24`; this is
not the successor Goal's 28-day GSC or Vercel window.

Repository views, unique viewers, clones, referrers, paths, and stargazer
timestamps remain separate native GitHub units. GitHub exposes no person-level
join between a viewer and a later star. This audit therefore does not compute a
conversion rate or attribute a star to a referrer, page, website change,
directory merge, or README wording.

## Source-native observations

### Repository views

- Total views: `235`.
- Unique viewers: `40`.
- Overview path `/7xuanlu/wenlan`: `62` views and `27` unique viewers.
- The remaining popular-path rows were pull requests, commits, comparisons,
  and localized README pages. GitHub returns only its popular-path subset, so
  omitted paths are unavailable rather than zero.

### Popular referrers

| Referrer | Views | Unique viewers |
| --- | ---: | ---: |
| `github.com` | 35 | 13 |
| `Google` | 9 | 3 |
| `lib.rs` | 2 | 1 |
| `m.facebook.com` | 2 | 1 |
| `neoneye.github.io` | 1 | 1 |

GitHub returns a capped popular-referrer list. The absence of `wenlan.app` or
an authority listing from this table is not proof of zero visits.

### Clones

- Total clones: `7,292`.
- Unique cloners: `1,815`.
- The series contains a large non-view-correlated spike: `2026-08-15` alone
  reports `1,141` clones and `1,036` unique cloners while repository views for
  that date were `14` with `1` unique viewer.

Clone traffic is therefore unsuitable as a human-exposure or visitor proxy.
The evidence supports an automated or otherwise non-comparable cohort warning
for the spike, not a blanket classification of every clone as automated.

### Stars

- Current repository total at capture: `51` stars.
- Fixed successor starting observation: `48` stars.
- Four stargazer timestamps fall inside the traffic API dates:
  - `2026-08-20T15:34:27Z`
  - `2026-08-23T17:03:23Z`
  - `2026-08-24T05:50:14Z`
  - `2026-08-24T07:22:59Z`
- Three of those timestamps occur after the successor starting capture, which
  is consistent with the native-unit change from `48` to `51`. It does not
  identify which surface, if any, preceded a star.

## Decision

The clearest observed constraint is repository reach: only `40` unique viewers
and `27` unique Overview viewers were recorded across the available 14-day
traffic window. The same source separately records four star timestamps in
that date range, so this evidence does not establish that a missing literal
star request is the primary problem.

Keep the restrained README star-CTA wording candidate on hold. Prioritize
inspectable distribution and authority that can place Wenlan in front of more
qualified people, while keeping the current README's product proof and install
path stable. The immediate time-sensitive candidate is maintenance of the
already-open Awesome Mac PR #2643: it now conflicts after upstream changes,
and a verified local four-line resolution exists. Updating that external branch
still requires separate explicit approval.

No README, website, release, analytics configuration, indexing state,
directory branch, maintainer message, paid action, or other external state was
changed by this audit.

## Read-only monitoring refresh

At `2026-08-25T08:42:15Z`, GitHub REST still reported `51` total stars. The
available traffic window remained `235` views and `40` unique viewers, with
the Overview path at `62` views and `27` unique viewers; the popular-referrer
rows remained `github.com` 35/13, Google 9/3, `lib.rs` 2/1,
`m.facebook.com` 2/1, and `neoneye.github.io` 1/1 in GitHub's native
view/unique-viewer units. This is a no-change source refresh, not a new daily
increment or a viewer-to-star join.

## 2026-08-26 read-only refresh

Captured at `2026-08-26T08:00:45Z`. GitHub's sliding traffic window is now
`2026-08-12..2026-08-25` and reports `238` views from `41` unique viewers.
The Overview path reports `63` views from `27` unique viewers. GitHub still
reports `51` total stars, so no new stargazer timestamp was added after the
four timestamps already listed above.

Popular referrers remain a capped list: `github.com` reports `35` views from
`12` unique viewers, Google `9/3`, `lib.rs` `2/1`, `m.facebook.com` `2/1`,
and `neoneye.github.io` `1/1`. Clones separately report `7,700` clones from
`1,830` unique cloners and retain the non-view-correlated spikes; they remain
unsuitable as a human-reach proxy.

The evidence still points to limited qualified repository reach: the sliding
window added one unique repository viewer but no additional Overview viewer
or star. The merged Dhanush listing and the clean open Awesome Mac PR are
recorded as separate authority states; neither is joined to these repository
traffic or star units, and no causal claim is made.

## 2026-08-27 read-only refresh

Captured at approximately `2026-08-28T05:20:00Z`. GitHub's sliding traffic
window is now `2026-08-13..2026-08-26` and reports `160` views from `41`
unique viewers. The Overview path reports `68` views from `30` unique viewers.
GitHub still reports `51` total stars.

Popular referrers remain separate capped rows: `github.com` reports `35`
views from `12` unique viewers, Google `7/2`, `l.threads.com` `6/4`,
`lib.rs` `2/1`, and `m.facebook.com` `2/1`. Clones separately report `9,853`
clones from `1,875` unique cloners and remain unsuitable as a human-reach
proxy because their scale is not comparable to repository views.

The fall from the prior `238` total views to `160` is a sliding-window change,
not a negative daily count. Within the path subset, Overview unique viewers
increased from `27` to `30`, while stars remained unchanged. GitHub still
provides no viewer-to-star or referrer-to-star join.

The latest GitHub release is `v0.17.3`, published
`2026-08-27T22:15:26Z`. At capture its macOS DMG reports `2` downloads and
its Windows installer reports `1` download. The live homepage, download page,
and about page still display `v0.16.0`; this is a factual release-alignment
candidate, not traffic evidence. Any website correction requires its own exact
diff and publication approval and must not be attributed as search growth.
