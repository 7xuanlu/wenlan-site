# Wenlan campaign final read and authority-first correction

## Verdict

The fixed campaign missed every protected target. Technical SEO remained
healthy, but indexed inventory and repeated on-page changes did not establish
qualified query ownership or durable external authority.

## Fixed final window

The search and traffic window remains exactly `2026-07-21..2026-08-17`.
The data was captured after the window closed; the window was not moved.

| Source | Native result | Protected target | Result |
| --- | ---: | ---: | --- |
| GSC property clicks | 9 | 100 | unmet |
| GSC property impressions | 1,024 | 10,000 | unmet |
| Vercel raw visitors | 605 | 2,000 | unmet |
| GitHub stars at 2026-08-18 deadline | 47 | 100 | unmet |

GSC visible-query rows separately report 3 clicks and 222 impressions, leaving
a visibility gap of 6 clicks and 802 impressions. The exact privacy-visible
core queries `llm wiki`, `llm wiki for codebase`, and
`local ai knowledge base` total 0 clicks and 3 impressions.

Vercel separately reports 219 direct visitors and 383 `google.com`-referrer
visitors. GSC reports only 9 Google Search clicks in the same range. These
units are not joined, but the mismatch and the prior exact-signature audit mean
the Vercel Google row cannot be presented as human search acquisition. The
same Vercel window reports no AI referral, Reddit referral, or `llms.txt` hit.

The final deterministic report is
`/tmp/wenlan-seo-final-2026-08-18/final-window-seo.md`, with evidence
fingerprint
`sha256:859e6fd10d8b69ba52630a6c9f6ee8626cc5533ef8bf4612034bf7ac6994a296`.
Raw authenticated inputs remain outside git in
`/tmp/wenlan-seo-final-2026-08-18`.

## What failed

1. The campaign produced indexed pages faster than it produced qualified
   demand or authority. The final sitemap and indexing health did not turn
   into core-query visibility.
2. The weekly generator could nominate title or metadata work from as little
   as one page impression. That converted sparse evidence into activity.
3. Several pages were edited again before Google had crawled and exposed the
   previous version for a complete evaluation window.
4. Open directory pull requests were valid attempts but most did not become
   merged or live authority during the campaign.
5. Raw Vercel visitors were a protected metric but were not reliable evidence
   of human acquisition; the anomalous Google-referrer cohort later rolled out
   of the fixed window and raw visitors fell to 605.

## Corrected operating objective

Move Wenlan from indexed inventory to owned discovery for AI knowledge bases,
Karpathy or LLM wiki, source-backed wiki, and knowledge bases for AI agents.
The leading execution evidence is a small set of qualified non-brand query
owners plus inspectable live or merged external references. Article count,
technical checks, indexing requests, submitted pull requests, and raw Vercel
visitors do not count as growth.

The protected correction in `PLAN.md` now requires a confirmed post-deploy
Google crawl, at least 20 target-page impressions in one complete 28-day GSC
range, and at least 3 joined qualified visible impressions before another
existing-page SEO edit. Net-new and translated assets require a clean intent
gap, locale-specific evidence, and a predeclared authority or distribution
path. Two consecutive below-exposure website experiments stop the on-page lane
instead of nominating another article or rewrite.

No new numeric deadline or target is created by this correction.
