# Product-evidence landing-page correction

Date: 2026-08-29  
Status: durable design and SEO decision; not yet implemented  
Scope: English, zh-TW, and zh-CN scenario acquisition pages

## Observed problem

The production product-research-to-PRD family is technically healthy but does
not yet prove the product experience to a search visitor.

Current rendered evidence across the three locale routes:

- no `img`, `picture`, `video`, `canvas`, or `iframe` appears anywhere in the
  page body;
- there is no button, product action, or scenario-specific CTA in the first
  viewport; only the Wenlan and Learn breadcrumb links are visible;
- the English article is about 4,319 CSS pixels tall and each Mandarin article
  is about 3,506 CSS pixels tall before the only conversion block;
- the article describes sources, citations, revisions, stale state, and review,
  but shows no inspectable Wenlan screen or resulting artifact;
- the final `Get started` and `View on GitHub` actions are generic and arrive
  after the full article rather than continuing the visitor's scenario.

The result is a useful text article that can still look like commodity SEO
content. A visitor cannot quickly verify what Wenlan is, what it produces, or
how the described workflow differs from a generic checklist.

## Protected correction

Each high-priority scenario family should keep one search task and one direct
HTML answer, then add the smallest truthful product-evidence path:

1. Put a scenario-specific primary action beside or immediately after the first
   direct answer. The action should describe the next task, such as viewing an
   example evidence base or starting that workflow, rather than using only
   generic `Get started` text.
2. Show at least one real, current Wenlan product view that is necessary to
   understand the task. Prefer an inspectable source-backed Page with its
   source location, citation, revision, stale state, or review state over a
   decorative illustration.
3. Add one concrete, standalone artifact for the scenario. For the product-
   research family, show a small requirement-to-source matrix containing an
   observation, interpretation, assumption, contradiction, open question, and
   decision state.
4. Explain the input-to-output path in visible HTML: approved source set,
   Wenlan command or action, resulting Page or evidence view, and the human
   review boundary. Do not place essential meaning only inside an image.
5. Keep a repeated contextual CTA after the worked example and retain the
   existing final CTA. Do not use intrusive overlays, interstitials, or a large
   download panel that obscures the main answer.
6. Apply the same evidence structure to English, zh-TW, and zh-CN, but localize
   the example labels, CTA copy, captions, filenames, and alt text naturally.

This is a shared evidence pattern, not permission to add identical screenshots
or generic hero artwork to every URL. Each image or example must help complete
that page's distinct user task.

## SEO and generative-search effect

The correction is evidence-aligned, but it is not a ranking guarantee.

- Google recommends original, substantial, people-first content that shows
  first-hand experience and adds value beyond summaries. A real, current
  Wenlan screen and worked artifact can turn the page from a generic workflow
  explanation into inspectable first-party evidence.
- Google's current generative-search guidance explicitly recommends valuable,
  non-commodity content and relevant high-quality images or video when they
  support the text. The same guidance warns against creating many query-variant
  pages or rewriting solely for AI systems.
- Images can create additional Google Images, text-result-image, Discover, and
  generative-search opportunities when Google can crawl and understand them.
  Use real HTML image elements, descriptive nearby captions, useful localized
  alt text, descriptive filenames, and a representative preferred image.
- A CTA itself is not a documented ranking factor. Moving a truthful next action
  near the answer primarily improves comprehension and conversion. Do not claim
  that it directly raises rank, impressions, or clicks.
- Google uses Core Web Vitals in its ranking systems, while other page-
  experience improvements mostly help satisfaction rather than directly raise
  rank. Heavy or unstable media can erase part of the benefit by harming LCP or
  layout stability.

## Implementation guardrails

- Preserve the descriptive H1, direct answer, canonical, reciprocal hreflang,
  sitemap membership, Article and BreadcrumbList schema, visible FAQ, and the
  absence of FAQPage JSON-LD.
- Render essential copy, captions, commands, limitations, and evidence labels
  as crawlable HTML. Images support the answer; they do not replace it.
- Use `next/image` or an equivalent responsive `<img>` path with explicit
  dimensions, `src`, `srcset`/`sizes`, an optimized WebP or AVIF asset, and no
  layout shift. Do not implement meaningful product evidence as a CSS
  background image.
- Use a relevant screenshot or artifact preview rather than a logo, abstract
  glow, stock illustration, fake product UI, or text-heavy social card.
- Keep all product claims source-backed and within current Wenlan capability.
  Do not invent integrations, automation, outputs, or customer results.
- Validate desktop plus exact 393px mobile rendering in all three locales,
  including CJK line breaks, image legibility, keyboard focus, target sizes,
  alt text, and reduced-motion behavior where relevant.
- Run Lighthouse or PageSpeed Insights after media is added and compare LCP,
  CLS, and INP with the pre-change page before publication.

## Measurement

Keep sources and units separate:

- GSC: property totals, visible-query totals, visibility gap, target-page rows,
  and joined qualified queries;
- Vercel: visitors, referrers, and target-page observations;
- GitHub: outbound traffic and stars when source-native evidence exists;
- product actions: only measured when a reliable event source is available.

The first 24 hours judge only rendering, indexability, schema, image
discoverability, and performance. Search impact requires a clean post-crawl
window; conversion changes do not prove ranking causality.

## Official references

- Google Search Central, Creating helpful, reliable, people-first content:
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, Optimizing for generative AI features:
  https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, Google image SEO best practices:
  https://developers.google.com/search/docs/appearance/google-images
- Google Search Central, Understanding page experience:
  https://developers.google.com/search/docs/appearance/page-experience
- Google Search Central, SEO Starter Guide:
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Next implementation decision

Prototype this pattern on the product-research-to-PRD family first. Review the
exact real product evidence, worked artifact, CTA language, performance budget,
and three-locale render before changing the shared Learn template or applying
the pattern to other measuring pages. No commit, push, PR, merge, deployment,
indexing request, GSC validation, analytics mutation, or external publication
is authorized by this record.
