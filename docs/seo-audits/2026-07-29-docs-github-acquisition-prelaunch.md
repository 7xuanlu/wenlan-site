# Docs to GitHub Acquisition Bridge - 2026-07-29

Status: active preparation with publication and indexing approval recorded.

## Why this is next

The fixed Goal still needs 54 GitHub stars from the verified live observation
of 46. In the aligned `2026-06-28..2026-07-25` window, Vercel reports 774
visitors and 850 pageviews for `/docs/configuration`, while the shared Docs
article renderer has no tracked path to the public repository. Search Console
separately reports 12 impressions and no clicks for that route. These are
source-native observations, not a source-to-page join.

The repository remains the inspectable source, release record, and public
project-interest surface. A quiet open-source link in the existing Docs rail
therefore closes a visible navigation gap without adding a new article or
changing search intent.

## Candidate gate

1. Provenance: authenticated Vercel and GSC exports for the aligned range are
   preserved under `/tmp/wenlan-seo-2026-07-28`; GitHub REST reported 46 stars
   at `2026-07-30T05:39:51Z`.
2. Repeated or high intent: a reader using configuration, architecture, or
   operational Docs has a direct reason to inspect source and releases.
3. Coverage gap: the shared English Docs article renderer contains no
   `TrackedLink` or `github_outbound` repository path.
4. Maintained proof: `https://github.com/7xuanlu/wenlan` is the maintained
   Apache-2.0 source and release repository.
5. Standalone utility: the link lets any reader inspect source, releases, and
   issues without installing Wenlan.

## Bounded change

- Add `docs-article` to the existing bounded analytics placement union.
- Add one compact open-source module below the existing Docs table of contents.
- Link only to `https://github.com/7xuanlu/wenlan`.
- Emit the existing `github_outbound` event with locale `en`, context `setup`,
  placement `docs-article`, and destination category `github`.
- Keep URLs, metadata, canonical tags, sitemap membership, structured data,
  Docs content, and `FAQPage` policy unchanged.

## Experiment contract

- Hypothesis: exposing one persistent repository path in the Docs rail will
  produce measurable GitHub-outbound interest from existing Docs traffic.
- Baseline:
  - GSC property: 8 clicks and 395 impressions.
  - GSC visible queries: 2 clicks and 92 impressions.
  - GSC visibility gap: 6 clicks and 303 impressions.
  - `/docs/configuration`: 12 GSC impressions, 0 clicks, average position 15.8.
  - Vercel raw: 1,420 visitors and 1,628 pageviews.
  - `/docs/configuration`: 774 visitors and 850 pageviews.
  - GitHub: 46 stars.
  - Authenticated Umami events: unavailable, not zero.
- Minimum exposure: 50 Vercel visitors to English Docs slug routes after
  production.
- Success: authenticated Umami reports at least five `github_outbound` events
  with placement `docs-article` by the 7-day readout, while the technical floor
  remains green.
- Failure: at least 100 Vercel visitors reach English Docs slug routes in a
  complete post-deploy window and authenticated Umami reports zero
  `docs-article` GitHub outbound events.
- Inconclusive: the minimum exposure is not reached or authenticated Umami
  evidence remains unavailable.
- Stop: a technical SEO regression, broken navigation, unsafe analytics
  payload, misleading destination, or sustained evidence that the module
  harms Docs use.
- Readouts: technical and event-availability check at 24h; exposure and event
  read at 7d; W2, W4, and W8 only if the experiment remains unresolved.

GitHub stars remain a separate public REST observation. An outbound event is
not a star, and neither metric is attributed causally to this change.

## Approval boundary

At `2026-07-30T06:57:46Z`, the user approved local preparation, commit, push,
PR creation, merge, automatic Vercel deployment, read-only production
verification, and the later GSC URL Inspection and necessary indexing batch
described in the campaign plan. No GSC validation, synthetic production
event, Reddit or external post, OSS submission, paid acquisition, analytics
account mutation, or metric-definition change is approved.
