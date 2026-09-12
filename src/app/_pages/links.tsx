import { ArticleHalo } from "../(en)/learn/article-visuals";
import { getCoreContent } from "@/i18n/content";
import { LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { canonicalUrl } from "@/i18n/routing";

// Every link on the hub carries the same UTM set so bio traffic is
// attributable in analytics: source identifies the hub, content the link.
const HUB_UTM = {
  utm_source: "links",
  utm_medium: "social",
  utm_campaign: "links-bio",
} as const;

function hubUtmQuery(id: string): string {
  const params = new URLSearchParams({
    ...HUB_UTM,
    utm_content: id,
  });
  return params.toString();
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function hubExternalHref(href: string, id: string): string {
  const url = new URL(href);
  for (const [key, value] of Object.entries(HUB_UTM)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("utm_content", id);
  return url.toString();
}

export function LinksPage({ locale }: { locale: Locale }) {
  const dictionary = getCoreContent(locale);
  const content = dictionary.links.content;
  const chrome = dictionary.chrome.content;
  const linksUrl = canonicalUrl(locale, "/links");
  const homeUrl = canonicalUrl(locale, "/");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: content.breadcrumbs.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.breadcrumbs.current,
        item: linksUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo.title,
    description: content.seo.description,
    url: linksUrl,
    inLanguage: LOCALE_CONFIG[locale].hreflang,
    mainEntity: {
      "@id": "https://wenlan.app/#organization",
    },
  };

  return (
    <main className="grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <article>
        <header className="relative border-b border-[var(--o-border-subtle)] px-6 py-24 sm:py-32">
          <ArticleHalo />
          <div className="relative z-10 mx-auto max-w-5xl">
            <nav
              aria-label={chrome.breadcrumbAriaLabel}
              className="flex items-center gap-3 font-mono text-xs text-[var(--o-text-muted)]"
            >
              <LocalizedLink
                href="/"
                locale={locale}
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                {content.breadcrumbs.home}
              </LocalizedLink>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--o-text-secondary)]" aria-current="page">
                {content.breadcrumbs.current}
              </span>
            </nav>
            <div className="mt-12 min-w-0">
              <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                {content.hero.eyebrow}
              </p>
              <h1 className="warm-glow max-w-full break-words font-serif text-5xl leading-[1.05] font-medium [overflow-wrap:anywhere] sm:text-7xl">
                {content.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--o-text-secondary)]">
                {content.hero.description}
              </p>
            </div>
          </div>
        </header>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <ul className="space-y-4">
              {content.links.map((link) => {
                const external = isExternalHref(link.href);
                const className =
                  "group flex items-center justify-between gap-6 rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] px-6 py-5 transition-colors hover:border-[var(--o-warm)]";
                const body = (
                  <>
                    <span className="min-w-0">
                      <span className="block font-serif text-xl font-medium tracking-tight text-[var(--o-text)] transition-colors group-hover:text-[var(--o-warm)]">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-[var(--o-text-muted)]">
                        {link.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-sm text-[var(--o-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--o-warm)]"
                    >
                      →
                    </span>
                  </>
                );

                return (
                  <li key={link.id}>
                    {external ? (
                      <a
                        href={hubExternalHref(link.href, link.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {body}
                      </a>
                    ) : (
                      <LocalizedLink
                        href={`${link.href}?${hubUtmQuery(link.id)}`}
                        locale={locale}
                        className={className}
                      >
                        {body}
                      </LocalizedLink>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-10 text-center font-mono text-xs leading-relaxed text-[var(--o-text-muted)]">
              {content.footnote}
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
