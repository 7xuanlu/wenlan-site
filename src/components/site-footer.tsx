import { BrandWordmark } from "@/components/brand-wordmark";
import { getCoreContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import Image from "next/image";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = getCoreContent(locale).footer.content;

  return (
    <footer className="border-t border-[var(--o-border-subtle)] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <nav aria-label={content.ariaLabel} className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
              {content.brand}
            </p>
            <p className="text-sm leading-relaxed text-[var(--o-text-muted)]">
              {content.tagline}
            </p>
          </div>
          {content.groups.map((group) => (
            <div key={group.id}>
              <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                {group.title}
              </p>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.id}>
                    {isExternalHref(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel={link.id === "license" ? "noopener noreferrer license" : "noopener noreferrer"}
                        className="text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <LocalizedLink
                        href={link.href}
                        locale={locale}
                        className="text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                      >
                        {link.label}
                      </LocalizedLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--o-border-subtle)] pt-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-[var(--o-text-secondary)]">
              <BrandWordmark label={content.signature.brand} variant="footer" />
            </span>
            <span className="text-xs text-[var(--o-text-dim)]">&middot;</span>
            <span className="text-xs text-[var(--o-text-muted)]">
              {content.signature.tagline}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.toolpilot.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Featured on ToolPilot"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="tp-badge-dark">
                <Image
                  src="/images/toolpilot-featured-dark.png"
                  alt="Featured on ToolPilot"
                  width={118}
                  height={26}
                />
              </span>
              <span className="tp-badge-light" aria-hidden="true">
                <Image
                  src="/images/toolpilot-featured-light.png"
                  alt=""
                  width={118}
                  height={26}
                />
              </span>
            </a>
            <p className="font-mono text-[10px] text-[var(--o-text-muted)]">
              {content.signature.builtByPrefix}{" "}
              <a
                href={content.signature.authorUrl}
                target="_blank"
                rel="noopener noreferrer author"
                className="underline decoration-[var(--o-warm)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--o-warm)]"
              >
                {content.signature.author}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
