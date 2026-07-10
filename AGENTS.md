# AGENTS.md

Guidance for coding agents working in this repository.

## Project

Wenlan public website and SEO/GEO surface, built with Next.js 16 App Router, React 19, and Tailwind CSS 4. The product is Wenlan, and the canonical public site is https://wenlan.app.

The site is deployed on Vercel. Do not push, deploy, submit Search Console validations, or post externally unless the user explicitly asks.

## Commands

```bash
pnpm dev                  # Local dev server with Turbopack
pnpm build                # Production build; postbuild skips IndexNow unless production/forced
pnpm start                # Serve the production build
pnpm lint                 # TypeScript check: tsc --noEmit --incremental false
pnpm test:seo             # node:test suite for brand, SEO, redirects, schema, and pipeline behavior
pnpm seo:weekly:sample    # Fixture-backed weekly SEO pipeline health check
pnpm seo:weekly:run -- --date YYYY-MM-DD
pnpm seo:gsc:fetch -- --date YYYY-MM-DD
pnpm seo:ai-visibility -- --date YYYY-MM-DD
pnpm seo:technical:built
pnpm seo:technical:deployed
```

The SEO tests read sibling Wenlan and wenlan-app checkouts for current source facts. Set both `WENLAN_REPO_ROOT=/absolute/path/to/wenlan` and `WENLAN_APP_REPO_ROOT=/absolute/path/to/wenlan-app` when those repos are not adjacent to this checkout.

## Architecture

- `src/app/page.tsx` - homepage.
- `src/app/about/page.tsx` - about/release positioning page.
- `src/app/docs/` - documentation index, docs content, docs pages, and docs OG images.
- `src/app/learn/` - Learn index, SEO article data, article pages, article visuals, and Learn OG images.
- `src/app/layout.tsx` - root metadata, fonts, Umami script, theme bootstrap, JSON-LD, and footer shell.
- `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/feed.xml/route.ts`, `src/app/llms-full.txt/route.ts` - machine-readable SEO/GEO surfaces.
- `next.config.ts` - X-Robots headers plus legacy pre-Wenlan and `/guides/*` redirects to canonical Wenlan/`/learn/*` URLs.
- `scripts/` - deterministic SEO, technical SEO, AI visibility worksheet, GSC fetch, IndexNow, and brand-contract checks.
- `docs/search-console-umami.md`, `docs/seo-growth-loop.md`, `docs/seo-measurement.md`, `docs/seo-audits/` - weekly SEO/GEO operating docs and generated/manual audit records.

## Product And SEO Rules

- Use Wenlan as the product name. `useorigin.app` and `www.useorigin.app` are legacy redirect bridge hosts for migrating users and search queries into `wenlan.app`.
- Search Console is the canonical source for query/page performance. Do not invent GSC, indexing, or Umami metrics.
- Prefer refreshing indexed pages with impressions before creating net-new Learn content.
- Keep visible FAQ text where useful, but do not add `FAQPage` JSON-LD unless Google eligibility changes for ordinary software sites.
- Keep canonical public URLs in the sitemap. Old `/guides/*`, `/docs/guides/*`, and legacy pre-Wenlan Learn slugs should redirect, not appear in the sitemap.
- `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/humans.txt`, manifest, and static assets intentionally receive noindex-style headers where configured.

## Theming And UI

Dark mode is the default. Light mode is enabled by setting `data-theme="light"` on `<html>`; do not rely on Tailwind `dark:` variants for site theming.

Theme state is stored in `localStorage("wenlan-theme")`. A blocking script in `layout.tsx` applies the saved theme before paint.

Static accent tokens live in `globals.css` as Tailwind theme variables such as `--color-wenlan-warm`, `--color-wenlan-amber`, `--color-wenlan-gold`, `--color-wenlan-indigo`, and `--color-wenlan-sage`. Runtime semantic colors use `--o-*` CSS variables under `:root` and `[data-theme="light"]`.

Style constraints:

- No left border accent stripes on cards. Use other visual treatments.
- Keep card radii restrained and avoid nested cards.
- Use the existing typography stack: Fraunces, Instrument Sans, JetBrains Mono.
- Path alias `@/*` maps to `./src/*`.

## Analytics And Server Actions

Umami is included only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set. `NEXT_PUBLIC_UMAMI_SCRIPT_URL` can override the script URL; otherwise the cloud script is used.

The waitlist server action lives in `src/app/actions.ts` and uses Resend. It requires `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` for successful submissions.

## Quality Bar

- Before claiming a change is done, run the narrow relevant check. For site or SEO changes, prefer `pnpm test:seo`, `pnpm seo:weekly:sample`, and `pnpm build` as applicable.
- Run `pnpm lint` when TypeScript or route/component code changes.
- Use `pnpm seo:technical:built` after build-output-sensitive SEO changes.
- Use `pnpm seo:technical:deployed` only when deployed-site checks are relevant and network access is available.
- Keep generated/raw GSC and Umami exports out of git. Use `/tmp/wenlan-seo` for weekly input CSVs and commit only interpreted reports when they record decisions or shipped work.
