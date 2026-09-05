import { DemoVideo } from "../demo-video";
import { WaitlistForm } from "../waitlist-form";
import { ThemeToggle } from "../theme-toggle";
import { BrandWordmark } from "@/components/brand-wordmark";
import {
  ArrowRightIcon,
  ClaudeBrandIcon,
  CursorBrandIcon,
  GitHubLogoIcon,
  ObsidianBrandIcon,
  OpenAiBrandIcon,
  VSCodeBrandIcon,
} from "@/components/icons";
import { BentoSection } from "@/components/home/bento";
import { DownloadSection } from "@/components/home/download";
import { HeroLivingPage } from "@/components/home/hero-living-page";
import { PainsSection } from "@/components/home/pains";
import { PipelineSection } from "@/components/home/pipeline";
import { StorageSection } from "@/components/home/storage";
import { UseCasesSection } from "@/components/home/use-cases";
import { TrackedLink, TrackedLocalizedLink } from "@/components/tracked-link";
import { getCoreContent, type HomeContent, type LinkContent } from "@/i18n/content";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { LocalizedLink, localizedHrefForLocale } from "@/i18n/navigation";
import { SITE_URL } from "@/i18n/routing";
import { demoVideoForLocale } from "@/lib/demo-video";

function WenlanMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-7">
      <defs>
        <linearGradient id="nav-ring" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--o-logo-start)" }} />
          <stop offset="50%" style={{ stopColor: "var(--o-logo-mid)" }} />
          <stop offset="100%" style={{ stopColor: "var(--o-logo-end)" }} />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="10" stroke="url(#nav-ring)" strokeWidth="5" />
      <circle cx="20" cy="10" r="3" fill="var(--o-logo-orb)" opacity="0.9" />
    </svg>
  );
}

const localeLabels = {
  en: { label: "English", short: "EN" },
  "zh-TW": { label: "繁體中文", short: "繁" },
  "zh-CN": { label: "简体中文", short: "简" },
} as const satisfies Record<Locale, { label: string; short: string }>;

/* The works-with strip pairs each client's official mark with its name for
   screen readers. Client names are product names and stay English in every
   locale. Claude Code and Claude Desktop share the Claude mark. Codex ships
   under OpenAI, so it carries the OpenAI mark. */
const worksWithClients = [
  { id: "claude-code", label: "Claude Code", Icon: ClaudeBrandIcon },
  { id: "cursor", label: "Cursor", Icon: CursorBrandIcon },
  { id: "codex", label: "Codex", Icon: OpenAiBrandIcon },
  { id: "claude-desktop", label: "Claude Desktop", Icon: ClaudeBrandIcon },
  { id: "vscode", label: "VS Code", Icon: VSCodeBrandIcon },
  { id: "obsidian", label: "Obsidian", Icon: ObsidianBrandIcon },
] as const;

function MetricBar({
  label,
  sub,
  tone,
  value,
  widthPercent,
}: {
  label: string;
  sub: string;
  tone: "muted" | "warm";
  value: string;
  widthPercent: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-base font-medium">{label}</p>
        <p className="font-mono text-base tabular-nums" style={{ color: tone === "warm" ? "var(--o-warm)" : "var(--o-text-muted)" }}>
          {value}
        </p>
      </div>
      <div className="mt-2 h-3 rounded-sm bg-[var(--o-surface)]">
        <div
          className="h-full rounded-sm"
          style={{
            width: `${widthPercent}%`,
            background: tone === "warm" ? "var(--o-warm)" : "var(--o-text-dim)",
          }}
        />
      </div>
      <p className="mt-1.5 font-mono text-[12px] text-[var(--o-text-muted)]">{sub}</p>
    </div>
  );
}

const metricBarChrome: Record<string, { tone: "muted" | "warm"; widthPercent: number }> = {
  "full-replay": { tone: "muted", widthPercent: 100 },
  wenlan: { tone: "warm", widthPercent: 4 },
};

export function HomePage({ locale }: { locale: Locale }) {
  const content = getCoreContent(locale).home.content;
  const siteNavigationSchema = buildSiteNavigationSchema(locale, content.nav);
  const redesign = content.redesign;
  const cta = content.sections.openSourceCta;
  const demoVideo = demoVideoForLocale(locale);

  return (
    <div className="grain relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
      <nav className="fixed top-0 z-40 w-full border-b border-[var(--o-border-subtle)] bg-[var(--o-nav-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <WenlanMark />
            <BrandWordmark label={content.nav.brand} variant="nav" />
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {content.nav.links
              .filter((link) => link.id !== "github")
              .map((link) => (
                <LocalizedLink
                  key={link.id}
                  href={link.href}
                  locale={locale}
                  className="hidden text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-text)] sm:inline"
                >
                  {link.label}
                </LocalizedLink>
              ))}
            <LanguageSwitcher locale={locale} href="/" />
            <a
              href="https://github.com/7xuanlu/wenlan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.nav.githubAriaLabel}
              className="hidden items-center gap-2 text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-text)] sm:flex"
            >
              <GitHubLogoIcon className="size-5" />
            </a>
            <div className="hidden sm:block">
              <ThemeToggle
                darkLabel={content.nav.themeToggle.darkLabel}
                lightLabel={content.nav.themeToggle.lightLabel}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero: the product is the hero. The living page loops the /capture →
          /distill refresh; the wordmark sits as a brand eyebrow above the
          message headline. */}
      <section className="relative overflow-hidden border-b border-[var(--o-border-subtle)] px-6 pt-24 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-6">
            <p className="animate-fade-up motion-reduce:animate-none font-serif text-xl sm:text-2xl">
              <BrandWordmark label={content.hero.title} variant="hero" />
            </p>
            <h1 className="animate-fade-up motion-reduce:animate-none delay-100 mt-4 font-serif text-4xl leading-[1.12] font-medium tracking-tight break-words text-balance sm:text-6xl">
              {redesign.hero.headline.pre}
              <em className="mr-1.5 text-[var(--o-warm)]">{redesign.hero.headline.emphasis}</em>
              {redesign.hero.headline.post}
            </h1>
            <p className="animate-fade-up motion-reduce:animate-none delay-200 mt-6 max-w-lg text-lg leading-relaxed break-words text-[var(--o-text-secondary)] sm:text-xl">
              {redesign.hero.description}
            </p>
            <div className="animate-fade-up motion-reduce:animate-none delay-200 mt-8 flex flex-wrap items-center gap-4">
              <HomeCta link={content.hero.primaryCta} locale={locale} placement="home-hero" variant="primary" />
              <HomeCta link={content.hero.secondaryCta} locale={locale} placement="home-hero" variant="secondary" />
            </div>
          </div>
          <div className="animate-fade-up motion-reduce:animate-none delay-300 pt-6 lg:col-span-6 lg:pt-0">
            <HeroLivingPage />
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--o-border-subtle)] pt-5 text-sm text-[var(--o-text-muted)]">
          <span className="text-[var(--o-text-secondary)]">{redesign.hero.worksWithLabel}</span>
          {worksWithClients.map(({ id, label, Icon }) => (
            <span key={id} className="inline-flex items-center">
              <Icon className="size-4 text-[var(--o-text-secondary)]" />
              <span className="sr-only">{label}</span>
            </span>
          ))}
          <span className="ml-auto hidden sm:inline">{redesign.hero.worksWithNote}</span>
        </div>
      </section>

      <nav
        aria-label={content.nav.links.find((link) => link.id === "learn")?.label}
        className="border-b border-[var(--o-border-subtle)]"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
          {content.hero.metaLinks.map((link) => (
            <TrackedLocalizedLink
              key={link.id}
              href={link.href}
              locale={locale}
              eventName="learn_article_click"
              placement="home-acquisition"
              context="concepts"
              className={`inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-warm)] ${
                link.id === "ai-knowledge-base-tool" ? "w-full sm:w-auto" : ""
              }`}
            >
              <span className="break-keep">{link.label}</span>
              <ArrowRightIcon className="size-4" />
            </TrackedLocalizedLink>
          ))}
        </div>
      </nav>

      <DownloadSection copy={content.download} locale={locale} />

      <section className="border-b border-[var(--o-border-subtle)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-[var(--o-border)] shadow-[var(--o-shadow-media)]">
            <div className="relative aspect-video bg-[var(--o-bg-deep)]">
              <DemoVideo
                locale={locale}
                embedUrl={demoVideo.embedUrl}
                posterUrl={demoVideo.posterUrl}
                playLabel={content.demo.playLabel}
                title={content.demo.title}
              />
            </div>
          </div>
        </div>
      </section>

      <PainsSection copy={redesign.pains} />
      <UseCasesSection copy={content.useCases} locale={locale} />
      <PipelineSection copy={redesign.pipeline} solution={content.sections.solution} />
      <BentoSection title={content.sections.features.title} cells={redesign.bento.cells} />
      <StorageSection copy={redesign.storage} />

      <section className="border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-4 font-mono text-[12px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
              {content.metrics.eyebrow}
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
              {redesign.metrics.title}
            </h2>
            <p className="mt-4 text-xl leading-relaxed text-[var(--o-text-secondary)]">
              {content.metrics.description}
            </p>
            <a
              href={content.metrics.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)]"
            >
              {content.metrics.link.label}
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-6 sm:p-8">
              <div className="space-y-6">
                {redesign.metrics.bars.map((bar) => {
                  const chrome = metricBarChrome[bar.id] ?? { tone: "muted" as const, widthPercent: 100 };
                  return (
                    <MetricBar
                      key={bar.id}
                      label={bar.label}
                      value={bar.value}
                      sub={bar.sub}
                      widthPercent={chrome.widthPercent}
                      tone={chrome.tone}
                    />
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--o-border-subtle)] pt-5 font-mono text-[13px] tabular-nums text-[var(--o-text-secondary)]">
                <span><span className="text-[var(--o-text)]">93.6%</span> Recall@5</span>
                <span><span className="text-[var(--o-text)]">0.883</span> NDCG@10</span>
                <span><span className="text-[var(--o-text)]">0.857</span> MRR</span>
                <span className="text-[var(--o-text-muted)]">LME_Oracle snapshot</span>
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-[var(--o-text-muted)]">
              {redesign.metrics.footnote}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-5xl">{content.faqs.title}</h2>
          <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {content.faqs.items.map((faq) => (
              <div key={faq.id} className="border-t border-[var(--o-border-subtle)] pt-5">
                <h3 className="font-serif text-xl font-medium">{faq.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--o-text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA: stands out structurally — a hard rule in the page's own
          ink and an asymmetric split — no glow, no wash. */}
      <section className="border-t-2 border-[var(--o-text)] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[12px] tracking-[0.3em] text-[var(--o-warm)] uppercase">
              {cta.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-6xl">
              {cta.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--o-text-secondary)] sm:text-xl">
              {cta.body}
            </p>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-[var(--o-border-subtle)] lg:pl-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <HomeCta link={cta.primaryCta} locale={locale} placement="home-footer" variant="primary" />
              <HomeCta link={cta.secondaryCta} locale={locale} placement="home-footer" variant="secondary" showGithubIcon />
            </div>
            <div className="mt-9 max-w-md">
              <p className="mb-3 text-sm text-[var(--o-text-muted)]">
                {cta.waitlistHeading}
              </p>
              <WaitlistForm copy={cta.waitlist} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LanguageSwitcher({ href, locale }: { href: string; locale: Locale }) {
  return (
    <div
      aria-label="Language"
      className="flex items-center rounded-full border border-[var(--o-border-subtle)] bg-[var(--o-surface)]/50 p-0.5 font-mono text-[10px] text-[var(--o-text-muted)]"
    >
      {SUPPORTED_LOCALES.map((targetLocale) => {
        const active = targetLocale === locale;
        const labels = localeLabels[targetLocale];

        return (
          <a
            key={targetLocale}
            href={localizedHrefForLocale(targetLocale, href)}
            aria-label={labels.label}
            aria-current={targetLocale === locale ? "true" : undefined}
            className={`rounded-full px-2 py-1 transition-colors ${
              active
                ? "bg-[var(--o-text)] text-[var(--o-bg)]"
                : "hover:text-[var(--o-text-secondary)]"
            }`}
          >
            {labels.short}
          </a>
        );
      })}
    </div>
  );
}

function HomeCta({
  link,
  locale,
  placement,
  showGithubIcon = false,
  variant,
}: {
  link: LinkContent;
  locale: Locale;
  placement: "home-hero" | "home-footer";
  showGithubIcon?: boolean;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "flex items-center gap-2 rounded-xl bg-[var(--o-text)] px-6 py-3 text-sm font-semibold text-[var(--o-bg)] transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      : "flex items-center gap-2 rounded-xl border border-[var(--o-border)] px-6 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-all duration-150 hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)]";

  const children = (
    <>
      {showGithubIcon && <GitHubLogoIcon className="size-5" />}
      {link.label}
      {!showGithubIcon && <ArrowRightIcon className="size-4" />}
    </>
  );

  if (isExternalHref(link.href)) {
    return (
      <TrackedLink
        href={link.href}
        eventName="github_outbound"
        placement={placement}
        locale={locale}
        context="home"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </TrackedLink>
    );
  }

  return (
    <TrackedLocalizedLink
      href={link.href}
      eventName={link.id === "download" ? "setup_path_click" : "get_started_click"}
      placement={placement}
      locale={locale}
      context="home"
      className={className}
    >
      {children}
    </TrackedLocalizedLink>
  );
}

function buildSiteNavigationSchema(locale: Locale, nav: HomeContent["nav"]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nav.schemaName,
    itemListElement: nav.links.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.label,
      url: isExternalHref(link.href)
        ? link.href
        : `${SITE_URL}${localizedHrefForLocale(locale, link.href) === "/" ? "" : localizedHrefForLocale(locale, link.href)}`,
    })),
  };
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
