import { TrackedLink, TrackedLocalizedLink } from "@/components/tracked-link";
import { getCoreContent } from "@/i18n/content";
import { LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { canonicalUrl } from "@/i18n/routing";
import { WENLAN_RELEASE } from "@/lib/releases";

export function DownloadPage({ locale }: { locale: Locale }) {
  const dictionary = getCoreContent(locale);
  const chrome = dictionary.chrome.content;
  const copy = dictionary.home.content.download;
  const content = copy.page;
  const homeUrl = canonicalUrl(locale, "/");
  const downloadUrl = canonicalUrl(locale, "/download");
  const platforms = WENLAN_RELEASE.assets.map((asset) => {
    const platform = copy.platforms.find((item) => item.id === asset.id);
    if (!platform) {
      throw new Error(`Missing localized download copy for ${asset.id}`);
    }
    return { ...asset, ...platform };
  });

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
    <main className="grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <article>
        <header className="relative overflow-hidden border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-28">
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

            <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)] uppercase">
                  {content.eyebrow}
                </p>
                <h1 className="mt-4 max-w-full break-words font-serif text-5xl leading-[1.03] font-medium tracking-tight [overflow-wrap:anywhere] sm:text-7xl">
                  {content.title}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--o-text-secondary)]">
                  {content.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-end">
                <span className="font-mono text-xs text-[var(--o-text-muted)]">
                  {copy.stableLabel} {WENLAN_RELEASE.tag}
                </span>
                <TrackedLink
                  href={WENLAN_RELEASE.releaseUrl}
                  eventName="github_outbound"
                  placement="download-page"
                  locale={locale}
                  context="setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)]"
                >
                  {content.releaseSourceLabel}
                </TrackedLink>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(240px,0.5fr)] sm:items-end">
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                {content.buildsTitle}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--o-text-muted)] sm:text-right">
                {content.buildsDescription}
              </p>
            </div>

            <div className="mt-8 divide-y divide-[var(--o-border-subtle)] border-y border-[var(--o-border-subtle)]">
              {platforms.map((platform) => (
                <article
                  id={platform.id}
                  key={platform.id}
                  className="grid scroll-mt-24 gap-6 py-7 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center"
                >
                  <div>
                    <h3 className="font-serif text-2xl font-medium">
                      {platform.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-[var(--o-warm)]">
                      {platform.architecture}
                    </p>
                  </div>
                  <div>
                    <p className="max-w-xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
                      {platform.description}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-[var(--o-text-muted)]">
                      {copy.packageIncludesLabel} · {platform.format} ·{" "}
                      {platform.size}
                    </p>
                  </div>
                  <TrackedLink
                    href={platform.href}
                    eventName="github_outbound"
                    placement="download-page"
                    locale={locale}
                    context="setup"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] md:w-auto"
                  >
                    {platform.actionLabel}
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--o-border-subtle)] bg-[var(--o-bg-alt)] px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              {content.setupTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--o-text-secondary)]">
              {content.setupDescription}
            </p>

            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {platforms.map((platform) => (
                <section key={`${platform.id}-setup`}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--o-border)] pb-3">
                    <h3 className="font-serif text-xl font-medium">
                      {platform.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--o-text-muted)]">
                      {platform.architecture}
                    </span>
                  </div>
                  <ol className="mt-5 space-y-4">
                    {platform.setupSteps.map((step, index) => (
                      <li
                        key={step}
                        className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-[var(--o-text-secondary)]"
                      >
                        <span className="font-mono text-[10px] text-[var(--o-warm)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-8 border-b border-[var(--o-border)] pb-12 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)] md:items-center">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                {content.verifyTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
                {content.verifyDescription}
              </p>
            </div>
            <code className="block overflow-x-auto rounded-lg bg-[var(--o-bg-deep)] px-5 py-4 font-mono text-sm text-[var(--o-warm)]">
              wenlan doctor
            </code>
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href={WENLAN_RELEASE.setupGuideUrl}
              eventName="get_started_click"
              placement="download-page"
              locale={locale}
              context="setup"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--o-border)] px-5 py-3 text-center text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)]"
            >
              {content.setupGuideLabel}
            </TrackedLink>
            <TrackedLocalizedLink
              href="/docs/get-started"
              eventName="get_started_click"
              placement="download-page"
              locale={locale}
              context="setup"
              className="rounded-lg bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {content.getStartedLabel}
            </TrackedLocalizedLink>
          </div>
        </section>
      </article>
    </main>
  );
}
