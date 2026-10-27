# Automatic stable downloads

The homepage recommendations, three localized download pages, Get Started Windows
downloads/install text and HowTo schema, and SoftwareApplication JSON-LD on the
homepage, About, Download, and Get Started pages resolve a validated GitHub release
manifest on the server. The shared root shell and editorial Docs/Learn pages have no
runtime release dependency. Their release references remain editorial snapshots in
`src/lib/releases.ts`, not latest-version pins for download links.

## Selection and refresh

- Source: `https://api.github.com/repos/wenlan-app/wenlan/releases/latest`.
- Only a stable `vMAJOR.MINOR.PATCH` release with all supported uploaded, nonempty
  downloads and required updater/checksum assets is eligible. A tag alone, draft,
  prerelease, or incomplete asset set is not eligible.
- Download URLs must belong to that exact repository and tag. Versioned installer
  filenames, sizes, and the visible release label come from the same manifest.
- The signed Releases webhook (`/api/release/revalidate`) refreshes the release
  cache tag and all 12 release pages when a stable release is published. Timed
  refresh is only a daily backstop: Next Data Cache revalidates after 86400 seconds,
  on demand. The four release-aware page types across English, Traditional Chinese,
  and Simplified Chinese make 12 public ISR pages, each eligible for revalidation
  after 86400 seconds on the next request. Editorial Docs/Learn pages and the shared shell do not fetch the release.
  Stale-while-revalidate can serve a previous result on the first visit after expiry;
  the timed backstop is not a publication SLA.
- No cron, client-side GitHub polling, new storage service, or App release workflow
  change is required. Existing open tabs retain the version they rendered.

## Cache-write budget

The shared Data Cache and page TTLs move together. A shorter shared dependency can
lower the route interval, so changing only the page exports is not sufficient.
Keep the eight route exports as numeric literals for Next static analysis; source
and compiled-manifest tests check that all 12 concrete pages keep the daily policy.

Moving from 5 minutes to 1 hour (#230) and then to 1 day reduces time-based refresh
opportunities by a factor of 288 under continuous traffic. The daily step followed
the 2026-10-27 Hobby usage check before the Product Hunt launch: over the previous
30 days ISR reads were 662K of 1M, ISR writes 140K of 200K and CDN-to-function transfer
6.1 GB of 10 GB, while Fast Data Transfer was 3.56 GB of 100 GB. The 12 release pages
are the only timed ISR routes. This is not a measured reduction in billable writes:
[Vercel does not charge ISR writes when regenerated output is unchanged](https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing#optimizing-isr-reads-and-writes),
and write units depend on output size. The quota alert alone does not identify this
project or these routes as its source. After an approved deploy, compare the same
project and usage window in Vercel, and inspect changed output if writes remain high.
No cache purge, new webhook credentials, or paid plan is required by this policy.

## Failure behavior

Invalid responses and upstream failures throw *inside* the cached function, so a
failed refresh cannot replace its last valid entry. Only the outer resolver catches
an initial cache failure and uses the bundled audited snapshot. If no cache survives
(for example after eviction), that snapshot can be older than the last version
served elsewhere; this is a safe download fallback, not guaranteed latestness.
Each release-aware route has explicit 86400-second revalidation so an initial fallback
can retry later. This retry boundary leaves editorial routes outside release ISR.

The Data Cache is Vercel/Next-managed cache, not a durable release-history database.
The authoritative durable history and artifacts remain on GitHub. New platforms or
changed release naming conventions require a reviewed schema/UI update; releasing
another version with the existing contract does not.

## Measurement and evidence

`GET /api/release` is read-only, noindex, and exposes the server's resolved manifest
for verification/reporting. It does not record an event. Different cached page
generations may temporarily show the prior version; the endpoint is not proof that
every historical visitor saw that version.

The `X-Wenlan-Release-Source` header distinguishes `github-cache` from
`bundled-fallback`; the latter also emits a bounded server warning. A cached GitHub
result may be stale, so `github-cache` is not proof of a successful fresh fetch.
GitHub measurement exports retain this resolution label (or `unavailable` for an
older endpoint), separately from the asset counters.

Tracked download clicks identify the exact URL selected, not a bundled version.
The collector accepts only bounded stable-version labels and known asset IDs.
These remain anonymous client-reported operations, not authenticated release
evidence, successful downloads, installs, or unique people. GitHub's cumulative
asset download counts remain separate from site clicks.

The source/documentation snapshot and release highlights remain editorial evidence
for their stated version. `seo:release:bump` is optional maintenance for those
surfaces, not a prerequisite for new installer downloads.

## Verification

- `pnpm test:release`: deterministic parsing, malformed assets, future versions,
  failure handling, download selection, measurement, and report contracts.
- `pnpm seo:release:check`: current GitHub stable asset contract.
- `pnpm seo:release:check -- --site http://127.0.0.1:PORT`: exercise the running
  site's release endpoint and localized download pages.
- Run lint/build, built technical checks, and desktop/mobile rendering before
  publication. Then verify the production manifest and actual page links.
- `pnpm seo:technical:built` also checks the compiled cache policy: all sitemap
  pages must be prerendered, only the 12 release pages may use timed ISR, and
  those pages retain their 86400-second retry even after a cold-cache fallback.

No test should send production analytics, subscribe an address, or count fixture
observations as organic usage.
