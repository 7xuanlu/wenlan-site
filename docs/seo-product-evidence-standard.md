# SEO Product Evidence Standard

## Purpose and scope

This is the quality floor for Wenlan acquisition pages that answer a concrete
search scenario. It applies to new scenario pages and meaningful expansions of
existing scenario pages. It does not require every documentation or reference
page to become a product landing page.

Technical SEO, correct metadata, and indexability remain required. They do not
replace an answer that helps a visitor understand the task, inspect how Wenlan
supports it, and choose a relevant next step.

## Required page contract

A scenario page must provide all of the following:

1. One search task, one canonical URL, and one natural H1.
2. A direct answer near the start. Do not open with a Wenlan marketing claim.
3. At least one real, current, sanitized product view when the product workflow
   is material to the answer. Prefer a screenshot that exposes sources,
   citations, revisions, stale state, or review state over decorative artwork.
4. A visible input to decision to output sequence. A reader must be able to
   identify what enters Wenlan, what judgment still belongs to the user, and
   what inspectable artifact comes out.
5. A concrete worked artifact or result that demonstrates the scenario without
   inventing customer data, outcomes, or usage numbers.
6. A next action written for the scenario. Generic download or GitHub calls may
   remain, but they do not replace the scenario action.
7. Maintained first-party sources, honest product limits, and standalone value
   for a reader who does not use Wenlan.
8. Natural English, zh-TW, and zh-CN localization. Each locale owns its phrasing;
   query terms and headings are not translated word for word.
9. Article and BreadcrumbList schema, reciprocal hreflang, sitemap membership,
   contextual internal links, and a visible FAQ without FAQPage JSON-LD.

## Product evidence rules

- Use a real `<img>` element or Next.js `Image`, with an accurate filename,
  intrinsic dimensions, descriptive alternative text, and a visible caption.
- Keep the important meaning in HTML text. A screenshot supplements the answer;
  it is never the only place where the workflow or result is explained.
- Remove personal information, private workspaces, tokens, account identifiers,
  and unrelated customer material before an asset enters the repository.
- State when an image is a general product example rather than evidence from the
  scenario described on the page.
- Preserve the source image's aspect ratio. Let Next.js optimize delivery and
  lazy-load evidence below the first viewport.

Do not use simulated div-based product chrome as proof, generic decorative art
as a substitute for product evidence, or unsupported product claims. Do not
change a canonical or create a near-duplicate URL merely to add this pattern.

## Responsive and visual acceptance

Before publication, verify the real route in both themes at desktop width and
at exactly 393px. The page must have:

- no horizontal overflow, clipped product evidence, broken images, or console
  errors;
- readable English and CJK line breaks, captions, and workflow labels;
- a working in-page scenario action that lands on the evidence section;
- a product view large enough to inspect without making the surrounding answer
  secondary;
- stable layout space reserved before the image loads.

## Verification gates

Run the relevant repository checks in this order:

1. `pnpm seo:goal:check`
2. `pnpm seo:scenario:check`
3. `pnpm test:goal`
4. `pnpm test:seo`
5. `pnpm test:i18n`
6. `pnpm lint`
7. `pnpm build`
8. `pnpm seo:technical:built`
9. Desktop and exact 393px browser QA in dark and light themes

The scenario contract test must fail if a required locale loses its evidence
data, asset, workflow steps, worked artifact, or scenario action.

## Adoption and measurement

The product-research-to-PRD family is the reference implementation. New
scenario families must meet this standard before publication. Retrofit existing
pages in demand and GSC priority order rather than mechanically changing every
Learn URL.

This pattern is not a ranking guarantee. Its purpose is to make the answer more
helpful, demonstrate first-party experience, create an image discovery surface,
and give the visitor a concrete reason to continue. A heavy or poorly described
asset can harm page experience, so measure page performance and keep GSC,
Vercel, and GitHub observations in their native units.
