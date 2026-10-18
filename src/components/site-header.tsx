import { ThemeToggle } from "@/app/theme-toggle";
import { BrandWordmark } from "@/components/brand-wordmark";
import { HomeMobileNav } from "@/components/home/mobile-nav";
import { GitHubLogoIcon } from "@/components/icons";
import { ResourceMenu } from "@/components/resource-menu";
import { resourceCopy, resourceLinks } from "@/components/resource-navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getCoreContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";

function WenlanMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-hidden="true">
      <defs>
        <linearGradient id="site-nav-ring" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--o-logo-start)" }} />
          <stop offset="50%" style={{ stopColor: "var(--o-logo-mid)" }} />
          <stop offset="100%" style={{ stopColor: "var(--o-logo-end)" }} />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="10" stroke="url(#site-nav-ring)" strokeWidth="5" />
      <circle cx="20" cy="10" r="3" fill="var(--o-logo-orb)" opacity="0.9" />
    </svg>
  );
}

export function SiteHeader({
  locale,
  home = false,
}: {
  locale: Locale;
  home?: boolean;
}) {
  const nav = getCoreContent(locale).home.content.nav;
  const brand = (
    <span className="flex items-center gap-3 max-[360px]:gap-2">
      <WenlanMark />
      <BrandWordmark label={nav.brand} variant="nav" />
    </span>
  );

  return (
    <nav aria-label={nav.schemaName} className="site-header fixed top-0 z-40 w-full bg-[var(--o-nav-bg)] backdrop-blur-xl [&_summary]:text-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {home ? brand : (
          <LocalizedLink href="/" locale={locale} aria-label={nav.brand} className="transition-opacity hover:opacity-80">
            {brand}
          </LocalizedLink>
        )}
        <div className="flex shrink-0 items-center gap-3 max-[360px]:gap-2 md:gap-8">
          <div className="flex items-center gap-5">
          {nav.links
            .filter((link) => link.id === "download")
            .map((link) => (
              <LocalizedLink
                key={link.id}
                href={link.href}
                locale={locale}
                className="inline-flex min-h-11 items-center whitespace-nowrap text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
              >
                {link.label}
              </LocalizedLink>
            ))}
            <ResourceMenu locale={locale} label={resourceCopy[locale].title} links={resourceLinks(locale, nav)} />
          </div>
          <div className="flex shrink-0 items-center gap-1">
          <a
            href="https://github.com/wenlan-app/wenlan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.githubAriaLabel}
            title="GitHub"
            className="site-utility-icon hidden size-11 shrink-0 items-center justify-center rounded-lg text-[var(--o-text-secondary)] transition-colors duration-150 hover:bg-[var(--o-card-bg)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] sm:inline-flex"
          >
            <GitHubLogoIcon className="size-5" />
          </a>
          <div className="hidden items-center md:flex"><LanguageSwitcher locale={locale} /></div>
          <div className="hidden items-center md:flex">
            <ThemeToggle
              darkLabel={nav.themeToggle.darkLabel}
              lightLabel={nav.themeToggle.lightLabel}
            />
          </div>
          <HomeMobileNav locale={locale} nav={nav} />
          </div>
        </div>
      </div>
    </nav>
  );
}
