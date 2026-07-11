# Wenlan SEO/GEO Growth Loop

Use this when deciding what to do next for Wenlan search visibility. The rule is measurement first: GSC decides indexing and query/page demand; Vercel Analytics or Umami can enrich landing-page and referrer evidence when exports are available. The canonical deployed property is `wenlan.app`; keep deployed-site technical checks pointed there and treat `useorigin.app` as a legacy redirect bridge.

## Operating Pattern

1. Fetch GSC query/page data and matching Vercel Web Analytics weekly.
2. Classify queries into setup, MCP client, comparison, concept, troubleshooting, branded, and generic groups.
3. Prioritize pages already getting impressions before creating new pages.
4. Fix technical blockers before writing content.
5. Publish new articles only for proven query gaps.
6. Use Reddit and other communities only when the post has standalone utility.
7. Record before/after metrics for every page update.

## Weekly Inputs

- GSC Performance, last 28 days: queries, pages, clicks, impressions, CTR, average position.
- GSC Indexing: sitemap status, indexed count, excluded reasons, canonical details for important URLs.
- Vercel Analytics or Umami: landing pages, referrers, AI assistant referrals, `llms.txt` hits, and community referrals when exports are available.
- Site audit: sitemap, robots, canonicals, redirects, `noindex`, structured data, broken links.

Generate the weekly action report from CSV exports:

```bash
mkdir -p /tmp/wenlan-seo
# Save the GSC Queries export as /tmp/wenlan-seo/gsc-queries.csv
# Save the GSC Pages export as /tmp/wenlan-seo/gsc-pages.csv
# Save provenance as /tmp/wenlan-seo/gsc-metadata.json with:
# {"siteUrl":"sc-domain:wenlan.app","startDate":"YYYY-MM-DD","endDate":"YYYY-MM-DD","source":"..."}
pnpm seo:weekly:run -- --date YYYY-MM-DD
```

When Vercel CLI authentication is available, run `pnpm seo:vercel:fetch -- --date YYYY-MM-DD` before the weekly report. It writes normalized page, referrer, and metadata inputs to `/tmp/wenlan-seo`; the report prefers them over optional Umami exports. Custom CTA event totals remain account-gated on plans where the Vercel API returns `402`.

Normal runs require metadata for `sc-domain:wenlan.app`, an accepted GSC source label, and the 28 complete days ending the day before `--date`. Metadata declares local provenance but does not authenticate manually copied files, so the operator remains responsible for obtaining them from authenticated GSC. API metadata also carries a separate `byProperty` aggregate; reports show its difference from visible query rows instead of treating anonymized or truncated query tables as complete property totals. Use `--allow-manual-date-range true` only for a deliberate historical or custom-range analysis; dates, row counts, and CSV row metadata must still agree with the sidecar. Fixture mode is bound to `pnpm seo:weekly:sample` and is a pipeline health check, not search evidence.

Raw GSC exports stay outside git. Commit the generated `docs/seo-audits/YYYY-MM-DD-weekly-seo.md` only when it records a strategy decision or shipped SEO work.

## Decision Gates

| Signal | Action |
| --- | --- |
| Important page is not indexed | Fix crawl/indexing/canonical issue first. |
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
