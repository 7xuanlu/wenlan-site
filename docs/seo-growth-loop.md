# Wenlan SEO/GEO Growth Loop

Use this when deciding what to do next for Wenlan search visibility. The rule is measurement first: GSC decides indexing and query/page demand; Vercel Analytics or Umami can enrich landing-page and referrer evidence when exports are available. The canonical deployed property is `wenlan.app`; keep deployed-site technical checks pointed there and treat `useorigin.app` as a legacy redirect bridge.

## Operating Pattern

1. Fetch GSC query/page data and matching Vercel Web Analytics weekly.
2. Capture the same-day GitHub stars and cumulative release-asset download counters.
3. Classify queries into setup, MCP client, comparison, concept, troubleshooting, branded, and generic groups.
4. Prioritize pages already getting impressions before creating new pages.
5. Fix technical blockers before writing content.
6. Publish new articles only for proven query gaps.
7. Use Reddit and other communities only when the post has standalone utility.
8. Record before/after metrics for every page update.

## Weekly Inputs

- GSC Performance, last 28 days: queries, pages, clicks, impressions, CTR, average position.
- GSC Indexing: sitemap status, indexed count, excluded reasons, canonical details for important URLs.
- Vercel Analytics or Umami: landing pages, referrers, AI assistant referrals, `llms.txt` hits, and community referrals when exports are available.
- GitHub REST: point-in-time stars and cumulative release-asset `download_count` values.
- Resend Contacts API: aggregate contacts created in the reporting range and bounded acquisition-property breakdowns, never email addresses.
- Site audit: sitemap, robots, canonicals, redirects, `noindex`, structured data, broken links.

Generate the weekly action report from CSV exports:

```bash
mkdir -p /tmp/wenlan-seo
# Save the GSC Queries export as /tmp/wenlan-seo/gsc-queries.csv
# Save the GSC Pages export as /tmp/wenlan-seo/gsc-pages.csv
# Save provenance as /tmp/wenlan-seo/gsc-metadata.json with:
# {"siteUrl":"sc-domain:wenlan.app","startDate":"YYYY-MM-DD","endDate":"YYYY-MM-DD","source":"..."}
# The API fetcher additionally writes /tmp/wenlan-seo/gsc-query-pages.json
# for visible query-to-page candidate mapping; manual CSV runs need not create it.
pnpm seo:vercel:fetch -- --date YYYY-MM-DD
pnpm seo:github:fetch -- --date YYYY-MM-DD
vercel env run -e production -- pnpm seo:resend:fetch -- --date YYYY-MM-DD
pnpm seo:weekly:run -- --date YYYY-MM-DD
```

When Vercel CLI authentication is available, run `pnpm seo:vercel:fetch -- --date YYYY-MM-DD` before the weekly report. It writes normalized page, referrer, and metadata inputs to `/tmp/wenlan-seo`; the report prefers them over optional Umami exports. Run `pnpm seo:github:fetch -- --date YYYY-MM-DD` to add a point-in-time GitHub snapshot to the same input directory. Use `vercel env run -e production -- pnpm seo:resend:fetch -- --date YYYY-MM-DD` to add privacy-safe Resend aggregates without copying secrets or email addresses to disk. GitHub release `download_count` values are cumulative counters and stay separate from Umami outbound clicks, Resend contacts, stars, visitors, and GSC clicks. Custom CTA event totals remain account-gated on plans where the Vercel API returns `402`.

Normal runs require metadata for `sc-domain:wenlan.app`, an accepted GSC source label, and the 28 complete days ending the day before `--date`. Metadata declares local provenance but does not authenticate manually copied files, so the operator remains responsible for obtaining them from authenticated GSC. API metadata also carries a separate `byProperty` aggregate; reports show its difference from visible query rows instead of treating anonymized or truncated query tables as complete property totals. Authenticated API fetches additionally write `gsc-query-pages.json`, a privacy-filtered `query + page` join for candidate mapping. When the file is present, the weekly pipeline validates and consumes it automatically so observed pages stay separate from configured targets and the click-opportunity queue can use visible non-brand mappings. It does not replace property totals, reveal omitted queries, or become a required input for manually copied CSVs. Use `--allow-manual-date-range true` only for a deliberate historical or custom-range analysis; dates, row counts, and CSV row metadata must still agree with the sidecar. Fixture mode is bound to `pnpm seo:weekly:sample` and is a pipeline health check, not search evidence.

Raw GSC exports stay outside git. Commit the generated `docs/seo-audits/YYYY-MM-DD-weekly-seo.md` only when it records a strategy decision or shipped SEO work.

## Decision Gates

| Signal | Action |
| --- | --- |
| Important page is not indexed | Fix crawl/indexing/canonical issue first. |
| Technical blocker or AI knowledge-base, LLM-wiki, or source-backed-wiki row has actionable evidence | Nominate it in Top Actions. |
| Visible Obsidian query pairs Obsidian with Claude, Claude Code, or MCP and has actionable evidence | Treat it as an integration bridge and nominate it in Top Actions. |
| Trends exposes a modifier-qualified Obsidian query and independent Reddit/OSS/SERP evidence repeats the intent | Run the complete candidate gate now; GSC is the later measurement source, not a prerequisite for preparation. |
| Generic or page-only Obsidian evidence lacks either a visible qualifying query or a qualified external-demand record | Keep measuring; do not infer the search wording from the page aggregate alone. |
| Generic memory row has actionable evidence | Keep it visible in the complete queue and existing-cohort measurements; do not let it nominate the next acquisition experiment. |
| Page ranks position 8-30 | Refresh the existing page before writing a new one. |
| Page has impressions but low CTR | Rewrite title/meta and sharpen the first answer. |
| Query group has impressions but no strong matching page | Create one focused Learn article. |
| New Learn batch is not indexed yet | Wait and measure before another batch. |
| Reddit post cannot stand alone without Wenlan | Do not post it yet. |

## Content Rules

- One page per developer-stuck query cluster.
- No generic thought-leadership pages unless GSC proves demand.
- Prefer updates over net-new pages: screenshots, command snippets, sharper quick answers, clearer title/meta, and stronger internal links.
- Comparison pages may name competitors, but must stay factual, sourced, and non-combative.
- FAQ text may stay visible, but do not add `FAQPage` JSON-LD unless Google changes eligibility for ordinary software sites.

## Technical SEO Rules

- Sitemap contains canonical public URLs only.
- Old `/guides/*` and `/docs/guides/*` URLs redirect to `/learn/*`; they do not appear in sitemap.
- `Alternate page with proper canonical tag` is usually informational for duplicates, alternates, and redirected URLs. Treat it as a problem only when the canonical URL we want indexed is missing, non-200, absent from sitemap, or points to the wrong page.
- Keep schema appropriate to page type: Organization, WebSite, Article, TechArticle, BreadcrumbList, HowTo, VideoObject, and SoftwareApplication where relevant.
- Keep `/llms.txt` and `/llms-full.txt` concise, current, and discoverable.

## Recrawl After Page Changes

User decision (2026-10-10): every deployed change to an indexable page gets a Google recrawl request. Without one, when Google refreshes the page is unknown. On 10-10, requested pages were crawled within 1–3 days; changed pages that were not requested waited 1–2 months.

1. **Scope.** Each canonical URL whose rendered title, description, canonical, structured data or main content changed, per locale. Include the Learn index or home page only when their own visible content changed. Exclude redirects, noindex surfaces (`/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/humans.txt`), Open Graph images and static assets. A change to structured data alone, on any page except the three home pages, needs no request: it is usually a node in the shared layout, and the sitemap and normal crawling cover it. The home pages carry the site name, so their structured data counts on its own.
2. **PR.** Any agent (Claude or Codex) that changes such a page adds a `## Recrawl after deploy` section to the PR with the exact absolute URLs; after `pnpm build`, `pnpm seo:recrawl:changed` prints them. No change to an indexable page means writing `none`.
3. **Request.** Required once the deploy is verified live. With Search Console credentials, first run `pnpm seo:recrawl:pending`: it drops URLs Google has crawled since the deploy, because those need no request. The attended agent then asks the user once to confirm the batch, then opens `https://search.google.com/search-console?resource_id=sc-domain%3Awenlan.app` in the user's signed-in browser (Claude in Chrome, or the host's equivalent) and types each URL into "Inspect any URL". A direct `/inspect?id=` link returns 404. It checks the box holds the URL before pressing Enter, because after a dialog closes focus can sit on Request again. It clicks Request indexing and waits for "Indexing requested". It stops at a sign-in page, CAPTCHA or quota message and never enters credentials. If no such browser is available, or the host blocks the step, the agent gives the user the URLs and the user submits them. Unattended and cloud sessions stop at the list. The daily request quota is limited and unpublished: send acquisition owners first and carry the rest to the next day.
4. **Record.** For each URL Search Console confirmed, run `pnpm seo:recrawl:mark -- --pr <number> --url <URL>` (omit `--url` when all were). Each run adds a dated PR comment with those URLs; once every listed URL is recorded, it adds the `recrawl-requested` label and the reminder stops. Note anything Search Console reported (quota, errors) in the same PR. Do not start a separate ledger.
5. **Verify.** About 3 days later, read `lastCrawlTime` with the read-only URL Inspection API from a local session that has the credentials. If a URL is still uncrawled after 7 days, request it once more and note that. Requested, crawled and indexed are separate states; record each one.

**Enforcement.** This step is not optional. `scripts/seo-recrawl.mjs` backs three gates, registered identically in `.claude/settings.json` and `.codex/hooks.json` (a test keeps them identical):

- **PR creation** (`PreToolUse`): `gh pr create`, `gh pr edit` with a body, and GitHub MCP PR writes are denied unless the body has the section with URLs or `none`.
- **CI** (`Recrawl list` step): compares every sitemap URL in the PR build with production (title, description, robots, canonical, hreflang, JSON-LD and `<main>` text) and fails when a changed URL that needs a request is missing from the section. Structured-data-only changes off the home pages are reported as "sitemap only" and need not be listed. Editing the PR body re-runs CI.
- **After merge** (`SessionStart` and `Stop`): every session is told which merged PRs still have unrequested URLs and the confirm → browser → record steps above. Once Vercel's production deploy has succeeded, the first stop in each session is blocked until the agent has done them or told the user why it could not. `pnpm seo:recrawl:pending` prints the same list after reading each deployed URL's last crawl from the URL Inspection API (a few seconds per URL) and saves those times locally; the hooks use the saved times and make no Google call. Only recorded comments from the repository owner or collaborators count.

Codex runs repo hooks only after the user reviews and trusts them once with `/hooks`. If GitHub cannot be reached, the reminder hooks say so rather than block.

Sitemap `lastmod` and IndexNow (`postbuild`, for Bing and other IndexNow engines) continue, but they do not replace this for Google. Google's Indexing API covers only job-posting and livestream pages; do not use it for ordinary pages.

## Distribution Rules

- Lead with a concrete problem or lesson, not a product launch.
- Avoid putting Wenlan in the title.
- Link only when the page materially helps the reader.
- Track each post in Vercel Analytics or Umami plus GSC for referrals, branded-search lift, and assisted discovery.
- Stop reusing an angle if moderators remove it or the community rejects it.

## Metrics

Track weekly:

- Indexed canonical page count.
- Impressions by query group.
- Clicks, CTR, and average position.
- Top pages by impressions and clicks.
- Pages with impressions and zero clicks.
- AI assistant referrals.
- `llms.txt` / `llms-full.txt` hits.
- Reddit referrals.

Track monthly:

- AI visibility prompts across ChatGPT, Claude, Gemini, and Perplexity.
- Competitor comparison visibility.
- Branded query visibility for Wenlan.
- Learn article cohort indexing and traffic.

## Source Notes

- Google Search Console is the source of truth for indexing and query/page performance.
- Google currently limits FAQ rich results to government and health sites, so Wenlan keeps visible FAQ content without `FAQPage` JSON-LD.
- The Reddit SEO case study pattern to borrow is not blind volume; it is query-cluster pages, weekly technical cleanup, human-edited content, and careful distribution.
