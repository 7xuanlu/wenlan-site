# wenlan-site

Marketing + docs site for [Wenlan](https://github.com/7xuanlu/wenlan), a living personal knowledge library for AI work.

Production: [useorigin.app](https://useorigin.app).

## Stack

Next.js 16 (App Router) on Vercel. Tailwind 4. TypeScript. JSON-LD on appropriate page types. IndexNow auto-ping on every production deploy.

## Develop

```bash
pnpm install
pnpm dev
```

Default dev URL: http://localhost:3000.

## Build + ship

```bash
pnpm build           # Next.js production build + postbuild IndexNow ping
pnpm start           # serve the production build locally
```

Vercel deploys main automatically. Preview deploys fire on every PR.

## SEO surfaces

The site ships the following AI-discovery + SEO surfaces:

- `/llms.txt` and `/llms-full.txt` per [llmstxt.org](https://llmstxt.org/) spec
- `/feed.xml` RSS 2.0 for `/learn` articles
- `/sitemap.xml` with per-URL images and accurate `lastmod`
- `/robots.txt` allowing 20+ AI crawler user agents
- `/.well-known/security.txt` per RFC 9116
- `/manifest.webmanifest` PWA manifest
- `/humans.txt`
- Per-page JSON-LD: Article + TechArticle + SoftwareApplication + Organization + Person + WebSite + CollectionPage + HowTo + VideoObject + BreadcrumbList + SiteNavigationElement. Visible FAQ content stays in HTML, but `FAQPage` JSON-LD is intentionally omitted because Google no longer shows FAQ rich results for ordinary software sites.
- Dynamic per-page OG images via `next/og` (Learn articles, Doc pages, About, Get started, section indices)
- IndexNow auto-ping on every production deploy reaching Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazon Bot

## Layout

```
src/app/
  root-document.tsx              Shared document shell (head, JSON-LD, footer, fonts)
  global-not-found.tsx           App-wide branded 404 for multiple root layouts
  (en)/layout.tsx                Unprefixed English root layout
  (en)/page.tsx                  Homepage
  (en)/about/                    /about
  (en)/docs/                     /docs index + slug pages + get-started
  (en)/learn/                    /learn index + slug pages + articles.ts data
  (en)/feed.xml/route.ts         RSS feed
  (en)/llms-full.txt/route.ts    Long-form llms.txt
  [locale]/layout.tsx            Prefixed localized root layout
  sitemap.ts                     Sitemap (Next MetadataRoute)
  robots.ts                      robots.txt (Next MetadataRoute)
src/components/
  site-footer.tsx                Sitewide footer rendered in root layout
  sections.tsx                   Homepage FAQ + section components
  problem-solution.tsx           Homepage problem/solution sections
scripts/
  indexnow-ping.mjs              Postbuild IndexNow submitter (Vercel production only)
public/
  09521e19ffdcca3d68daffa830e64611.txt  IndexNow ownership key
  manifest.webmanifest
  humans.txt
  llms.txt
  .well-known/security.txt
```

## Content updates

Learn articles live in `src/app/learn/articles.ts`. Each entry's `updatedAt` drives the sitemap `lastmod` and is shown to readers + AI crawlers as the freshness signal. Bump the date when you edit substantively.

Doc pages live in `src/app/docs/docs.ts` under the `docPages` array. Same `updatedAt` semantics.

## License

This website source is MIT. The Wenlan product (daemon, CLI, MCP server) is Apache-2.0 in [7xuanlu/wenlan](https://github.com/7xuanlu/wenlan).

## Author

Built by [Qi-Xuan Lu](https://github.com/7xuanlu).
