import { DownloadPlatforms } from "@/components/download/download-platforms";
import { TrackedLink, TrackedLocalizedLink } from "@/components/tracked-link";
import { getCoreContent } from "@/i18n/content";
import { LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { canonicalUrl } from "@/i18n/routing";
import { WENLAN_RELEASE } from "@/lib/releases";
import type { WenlanRelease } from "@/lib/release-manifest";
import { SiteHeader } from "@/components/site-header";
import { SoftwareApplicationData } from "@/components/software-application-data";

export function DownloadPage({ locale, release = WENLAN_RELEASE }: { locale: Locale; release?: WenlanRelease }) {
  const dictionary = getCoreContent(locale);
  const chrome = dictionary.chrome.content;
  const copy = dictionary.home.content.download;
  const content = copy.page;
  const homeUrl = canonicalUrl(locale, "/");
  const downloadUrl = canonicalUrl(locale, "/download");
  const platforms = release.assets.map((asset) => {
    const platform = copy.platforms.find((item) => item.id === asset.id);
    if (!platform) {
      throw new Error(`Missing localized download copy for ${asset.id}`);
    }
    return { ...asset, ...platform };
  });
  const installationGuides = platforms.filter(
    (platform, index) =>
      platform.guideHref &&
      platform.guideLabel &&
      platforms.findIndex((item) => item.guideHref === platform.guideHref) === index,
  );

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
        item: downloadUrl,
      },
    ],
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo.title,
    description: content.seo.description,
    url: downloadUrl,
    inLanguage: LOCALE_CONFIG[locale].hreflang,
    mainEntity: {
      "@id": "https://wenlan.app/#software",
    },
  };

  return (
    <main className="grain min-h-[100dvh]">
      <SoftwareApplicationData locale={locale} release={release} />
      <SiteHeader locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <article>
        <header className="relative overflow-hidden border-b border-[var(--o-border-subtle)] px-5 pt-24 pb-10 sm:px-6 sm:pt-24 sm:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(var(--o-warm) 1px, transparent 1px), linear-gradient(90deg, var(--o-warm) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "linear-gradient(to bottom right, black, transparent 72%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl">
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
              <span
                className="text-[var(--o-text-secondary)]"
                aria-current="page"
              >
                {content.breadcrumbs.current}
              </span>
            </nav>

            <div className="mt-8 min-w-0">
              <h1 className="max-w-full break-words font-serif text-4xl leading-[1.05] font-medium tracking-tight [overflow-wrap:anywhere] sm:text-6xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
                {content.description}
              </p>
            </div>
          </div>
        </header>

        <DownloadPlatforms
          copy={copy}
          locale={locale}
          platforms={platforms}
          releaseTag={release.tag}
          releaseUrl={release.releaseUrl}
        />

        <section className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                {content.nextTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
                {content.nextDescription}
              </p>
            </div>
            <TrackedLocalizedLink
              href="/docs/get-started"
              eventName="get_started_click"
              placement="download-page"
              locale={locale}
              context="setup"
              className="inline-flex min-h-11 w-fit max-w-full items-center justify-center rounded-lg bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] press-wenlan focus-wenlan"
            >
              {content.getStartedLabel}
            </TrackedLocalizedLink>
          </div>
          <details className="group mx-auto mt-8 max-w-5xl">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 py-3 text-sm font-medium text-[var(--o-text-secondary)] hover:text-[var(--o-text)] focus-wenlan [&::-webkit-details-marker]:hidden">
              {content.verifyTitle}
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
            </summary>
            <div className="flex flex-col items-start">
              {installationGuides.map((platform) => (
                <TrackedLink
                  key={platform.guideHref}
                  href={platform.guideHref!}
                  eventName="get_started_click"
                  placement="download-page"
                  locale={locale}
                  context="setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center py-2 text-sm font-medium text-[var(--o-text-secondary)] underline underline-offset-4 hover:text-[var(--o-warm)] focus-wenlan"
                >
                  {platform.guideLabel}
                </TrackedLink>
              ))}
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--o-text-secondary)]">{content.verifyDescription}</p>
            <code className="mt-4 block max-w-xl overflow-x-auto rounded-lg bg-[var(--o-bg-deep)] px-5 py-4 font-mono text-sm text-[var(--o-warm)]">
              wenlan doctor
            </code>
            <TrackedLink
              href={release.setupGuideUrl}
              eventName="get_started_click"
              placement="download-page"
              locale={locale}
              context="setup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center py-2 text-sm font-medium text-[var(--o-text-secondary)] underline underline-offset-4 hover:text-[var(--o-warm)] focus-wenlan"
            >
              {content.setupGuideLabel}
            </TrackedLink>
          </details>
        </section>
      </article>
    </main>
  );
}
