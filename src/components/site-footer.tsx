import { BrandWordmark } from "@/components/brand-wordmark";
import { FooterSubscription } from "@/components/footer-subscription";
import { resourceLinks } from "@/components/resource-navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AnalyticsSettingsButton } from "@/components/google-analytics";
import { getCoreContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import Image from "next/image";

const footerLabels = {
  en: { product: "Product", resources: "Resources", community: "Community", issues: "Report an issue" },
  "zh-TW": { product: "產品", resources: "資源", community: "社群", issues: "回報問題" },
  "zh-CN": { product: "产品", resources: "资源", community: "社区", issues: "反馈问题" },
} satisfies Record<Locale, Record<string, string>>;

const releaseUpdatesHeading = {
  en: "Get product updates",
  "zh-TW": "訂閱產品更新",
  "zh-CN": "订阅产品更新",
} satisfies Record<Locale, string>;

const linkStyle = "inline-flex min-h-11 items-center text-sm text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-text-secondary)]";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = getCoreContent(locale).footer.content;
  const home = getCoreContent(locale).home.content;
  const nav = home.nav;
  const projectLinks = content.groups.flatMap((group) => group.links);
  const labels = footerLabels[locale];
  const allLinks = [...resourceLinks(locale, nav), ...projectLinks];
  const selectLinks = (ids: string[]) => ids.flatMap((id) => {
    const link = allLinks.find((item) => item.id === id);
    return link ? [link] : [];
  });
  const groups = [
    { id: "product", title: labels.product, links: selectLinks(["get-started", "changelog", "about", "data-and-privacy"]) },
    { id: "resources", title: labels.resources, links: selectLinks(["docs", "learn", "evaluation"]) },
    { id: "community", title: labels.community, links: [
      { id: "discord", label: "Discord", href: "https://discord.gg/nmzVTTU3HG" },
      ...selectLinks(["github"]),
      { id: "issues", label: labels.issues, href: "https://github.com/wenlan-app/wenlan/issues" },
    ] },
  ];
  const license = allLinks.find(({ id }) => id === "license");

  return (
    <footer className="px-6 pt-6 pb-8 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-12">
          <div>
            <div className="flex h-5 items-center text-[var(--o-text-secondary)]"><BrandWordmark label={content.signature.brand} variant="footer" /></div>
            <p className="mt-2 max-w-sm text-pretty text-[13px] leading-5 text-[var(--o-text-muted)]">{content.tagline}</p>
            <FooterSubscription locale={locale} heading={releaseUpdatesHeading[locale]} copy={home.sections.openSourceCta.waitlist} />
          </div>
          <nav aria-label={content.ariaLabel} className="grid min-w-0 grid-cols-2 content-start gap-x-5 gap-y-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] sm:gap-x-6">
            {groups.map((group) => (
              <div key={group.id} className="min-w-0">
                <h2 className="mb-2 text-sm font-semibold text-[var(--o-text)]">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.id}>
                      {isExternalHref(link.href) ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{link.label}</a>
                      ) : (
                        <LocalizedLink href={link.href} locale={locale} className={linkStyle}>{link.label}</LocalizedLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-sm text-[var(--o-text-muted)]">
              {content.signature.builtByPrefix}{" "}
              <a
                href={content.signature.authorUrl}
                target="_blank"
                rel="noopener noreferrer author"
                className="underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-text)]"
              >
                {content.signature.author}
              </a>
            </p>
            {license && <a href={license.href} target="_blank" rel="noopener noreferrer license" className={linkStyle}>{license.label}</a>}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <LanguageSwitcher locale={locale} placement="up" />
            <AnalyticsSettingsButton locale={locale} />
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

          </div>
        </div>
      </div>
    </footer>
  );
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
