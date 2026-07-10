import { DemoVideo } from "../demo-video";
import { WaitlistForm } from "../waitlist-form";
import { ThemeToggle } from "../theme-toggle";
import { BrandWordmark } from "@/components/brand-wordmark";
import { FAQSection } from "@/components/sections";
import {
  FeatureSection,
  HumanControlSection,
  MemoryDistillerySection,
  ProblemSection,
  SolutionSection,
} from "@/components/problem-solution";
import { getCoreContent, type HomeContent, type LinkContent } from "@/i18n/content";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { LocalizedLink, localizedHrefForLocale } from "@/i18n/navigation";
import { SITE_URL } from "@/i18n/routing";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

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

function WenlanRingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 800 800"
        fill="none"
        className="animate-float absolute top-[55%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 sm:h-[1000px] sm:w-[1000px]"
        style={{
          opacity: "var(--o-ring-opacity)",
          filter: "var(--o-ring-filter)",
        }}
      >
        <defs>
          <linearGradient id="ring-grad" x1="100" y1="400" x2="700" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" style={{ stopColor: "var(--o-ring-grad-start)" }} />
            <stop offset="35%" style={{ stopColor: "var(--o-ring-grad-mid)" }} />
            <stop offset="65%" style={{ stopColor: "var(--o-ring-grad-mid2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--o-ring-grad-end)" }} />
          </linearGradient>
          <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--o-ring-glow)" }} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" style={{ stopColor: "var(--o-ring-orb-glow)" }} stopOpacity="0.8" />
            <stop offset="100%" style={{ stopColor: "var(--o-ring-orb-edge)" }} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="280" fill="url(#inner-glow)" />
        <circle cx="400" cy="400" r="240" stroke="url(#ring-grad)" strokeWidth="72" strokeLinecap="round" fill="none" />
        <circle cx="540" cy="195" r="32" fill="url(#orb-glow)" />
        <circle cx="540" cy="195" r="14" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

const demoVideoId = "k37gjWVPHwI";
const demoVideoEmbedUrl = `https://www.youtube.com/embed/${demoVideoId}?autoplay=1&rel=0`;
const demoVideoPosterUrl = `https://i.ytimg.com/vi/${demoVideoId}/maxresdefault.jpg`;

const localeLabels = {
  en: { label: "English", short: "EN" },
  "zh-TW": { label: "繁體中文", short: "繁" },
  "zh-CN": { label: "简体中文", short: "简" },
} as const satisfies Record<Locale, { label: string; short: string }>;

function TokenEfficiencySection({ copy }: { copy: HomeContent["metrics"] }) {
  return (
    <section className="border-t border-[var(--o-border-subtle)] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--o-text-muted)]">
            {copy.description}
          </p>
        </div>
        <div className="mt-12 overflow-x-auto rounded-lg border border-[var(--o-border)]">
          <table className="w-full min-w-[720px] text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-[var(--o-border)] bg-[var(--o-surface)]">
                <th className="px-6 py-4 font-medium text-[var(--o-text-secondary)]">{copy.headers.surface}</th>
                <th className="px-6 py-4 font-medium text-[var(--o-text-secondary)]">{copy.headers.scope}</th>
                <th className="px-6 py-4 font-medium text-[var(--o-text-secondary)]">{copy.headers.result}</th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row, index) => {
                const emphasized = row.id !== "full-replay";
                return (
                  <tr
                    key={row.id}
                    className={index < copy.rows.length - 1 ? "border-b border-[var(--o-border-subtle)]" : undefined}
                  >
                    <td className={`px-6 py-4 ${emphasized ? "font-medium text-[var(--o-text)]" : "text-[var(--o-text-muted)]"}`}>
                      {row.surface}
                    </td>
                    <td className={`px-6 py-4 ${emphasized ? "text-[var(--o-text-secondary)]" : "text-[var(--o-text-muted)]"}`}>
                      {row.scope}
                    </td>
                    <td className={`px-6 py-4 ${emphasized ? "font-medium text-[var(--o-warm)]" : "text-[var(--o-text-muted)]"}`}>
                      {row.result}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center font-mono text-[10px] leading-relaxed text-[var(--o-text-muted)] sm:text-[11px]">
          {copy.note}{" "}
          <a
            href={copy.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-[var(--o-warm)]"
          >
            {copy.link.label}
          </a>
        </p>
      </div>
    </section>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = getCoreContent(locale).home.content;
  const siteNavigationSchema = buildSiteNavigationSchema(locale, content.nav);

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
            <span className="hidden rounded-full border border-[var(--o-warm)]/20 bg-[var(--o-warm)]/5 px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--o-warm)] sm:inline-flex">
              {content.nav.previewBadge}
            </span>
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
              <GitHubIcon />
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

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
        <WenlanRingBackground />

        <div className="relative z-10 w-full min-w-0 max-w-3xl text-center">
          <h1 className="animate-fade-up delay-100 warm-glow text-[2rem] leading-[1.08] sm:text-7xl sm:leading-[1.1]">
            <BrandWordmark label={content.hero.title} variant="hero" />
          </h1>
          <p className="animate-fade-up delay-100 mx-auto mt-7 max-w-[22rem] break-keep text-base leading-relaxed text-[var(--o-text-secondary)] sm:mt-8 sm:max-w-xl sm:text-xl">
            {content.hero.description}
          </p>
          <div className="animate-fade-up delay-200 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <HomeCta link={content.hero.primaryCta} locale={locale} variant="primary" />
            <HomeCta link={content.hero.secondaryCta} locale={locale} variant="secondary" />
          </div>
          <div className="animate-fade-up delay-300 mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] text-[var(--o-text-muted)]">
            <span>{content.hero.metaText[0].label}</span>
            <span aria-hidden="true">&middot;</span>
            <LocalizedLink
              href={content.hero.metaLinks[0].href}
              locale={locale}
              className="underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)]"
            >
              {content.hero.metaLinks[0].label}
            </LocalizedLink>
            <span aria-hidden="true">&middot;</span>
            <LocalizedLink
              href={content.hero.metaLinks[1].href}
              locale={locale}
              className="underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)]"
            >
              {content.hero.metaLinks[1].label}
            </LocalizedLink>
            <span aria-hidden="true">&middot;</span>
            <span>{content.hero.metaText[1].label}</span>
          </div>
        </div>
      </section>

      <section className="relative -mt-20 px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="animate-fade-up delay-600 overflow-hidden rounded-xl border border-[var(--o-border)] shadow-[0_8px_60px_rgba(0,0,0,0.4)]">
            <div className="relative aspect-video bg-[var(--o-bg-deep)]">
              <DemoVideo
                embedUrl={demoVideoEmbedUrl}
                posterUrl={demoVideoPosterUrl}
                playLabel={content.demo.playLabel}
                title={content.demo.title}
              />
            </div>
          </div>
        </div>
      </section>

      <ProblemSection copy={content.sections.problem} />
      <SolutionSection copy={content.sections.solution} />
      <MemoryDistillerySection copy={content.sections.memoryDistillery} />
      <FeatureSection copy={content.sections.features} />
      <HumanControlSection copy={content.sections.humanControl} />
      <TokenEfficiencySection copy={content.metrics} />

      <FAQSection copy={content.faqs} />

      <section className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/70 uppercase">
            {content.sections.openSourceCta.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {content.sections.openSourceCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {content.sections.openSourceCta.body}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <HomeCta link={content.sections.openSourceCta.primaryCta} locale={locale} variant="primary" compact />
            <HomeCta link={content.sections.openSourceCta.secondaryCta} locale={locale} variant="secondary" showGithubIcon />
          </div>
          <div className="mx-auto mt-9 max-w-md">
            <p className="mb-3 text-sm text-[var(--o-text-muted)]">
              {content.sections.openSourceCta.waitlistHeading}
            </p>
            <WaitlistForm copy={content.sections.openSourceCta.waitlist} />
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
  compact = false,
  link,
  locale,
  showGithubIcon = false,
  variant,
}: {
  compact?: boolean;
  link: LinkContent;
  locale: Locale;
  showGithubIcon?: boolean;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? `flex items-center gap-2 rounded-xl bg-[var(--o-text)] px-6 py-3 text-sm font-semibold text-[var(--o-bg)] transition-all duration-150 ${compact ? "hover:opacity-90" : "hover:shadow-[0_0_28px_var(--o-glow-warm)]"}`
      : "flex items-center gap-2 rounded-xl border border-[var(--o-border)] px-6 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-all duration-150 hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)]";

  const children = (
    <>
      {showGithubIcon && <GitHubIcon />}
      {link.label}
      {!showGithubIcon && <ArrowIcon />}
    </>
  );

  if (isExternalHref(link.href)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={link.href} locale={locale} className={className}>
      {children}
    </LocalizedLink>
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
