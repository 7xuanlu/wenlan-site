import { ThemeToggle } from "@/app/theme-toggle";
import { BrandWordmark } from "@/components/brand-wordmark";
import { HomeMobileNav } from "@/components/home/mobile-nav";
import { GitHubLogoIcon } from "@/components/icons";
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
    <nav aria-label={nav.schemaName} className="fixed top-0 z-40 w-full border-b border-[var(--o-border-subtle)] bg-[var(--o-nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 max-[360px]:px-4">
        {home ? brand : (
          <LocalizedLink href="/" locale={locale} aria-label={nav.brand} className="transition-opacity hover:opacity-80">
            {brand}
          </LocalizedLink>
        )}
        <div className="flex items-center gap-3 max-[360px]:gap-1 sm:gap-4">
          {nav.links
            .filter((link) => link.id !== "github")
            .map((link) => (
              <LocalizedLink
                key={link.id}
                href={link.href}
                locale={locale}
                className="hidden text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-text)] lg:inline"
              >
                {link.label}
              </LocalizedLink>
            ))}
          <LanguageSwitcher locale={locale} />
          <a
            href="https://github.com/7xuanlu/wenlan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.githubAriaLabel}
            className="hidden items-center gap-2 text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:text-[var(--o-text)] lg:flex"
          >
            <GitHubLogoIcon className="size-5" />
          </a>
          <div className="hidden lg:block">
            <ThemeToggle
              darkLabel={nav.themeToggle.darkLabel}
              lightLabel={nav.themeToggle.lightLabel}
            />
          </div>
          <HomeMobileNav locale={locale} nav={nav} />
        </div>
      </div>
    </nav>
  );
}
