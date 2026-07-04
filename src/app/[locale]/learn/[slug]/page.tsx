import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLink } from "@/i18n/navigation";
import {
  getLocalizedLearnArticle,
  isTranslatedLearnSlug,
  localizedLearnArticlePath,
  TRANSLATED_LEARN_SLUGS,
  translatedLearnStaticParams,
} from "@/i18n/learn-articles";
import { LOCALE_CONFIG, type TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { alternateUrls, canonicalUrl, SITE_URL } from "@/i18n/routing";
import {
  DEFAULT_AUTHOR_SAME_AS,
  DEFAULT_AUTHOR_URL,
  formatArticleDate,
  getArticle,
  type LearnArticle,
} from "../../../(en)/learn/articles";
import { ArticleHalo, MemoryIndex } from "../../../(en)/learn/article-visuals";

type LocalizedLearnArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const chromeByLocale = {
  "zh-TW": {
    home: "Wenlan",
    learn: "Learn",
    updated: "更新",
    articlePacket: "文章封包",
    inThisArticle: "本文段落",
    relatedArticles: "相關文章",
    faq: "FAQ",
    getStarted: "開始使用",
    github: "在 GitHub 查看",
  },
  "zh-CN": {
    home: "Wenlan",
    learn: "Learn",
    updated: "更新",
    articlePacket: "文章封包",
    inThisArticle: "本文段落",
    relatedArticles: "相关文章",
    faq: "FAQ",
    getStarted: "开始使用",
    github: "在 GitHub 查看",
  },
} as const satisfies Record<TranslatedLocale, Record<string, string>>;

function sectionId(heading: string, index: number): string {
  const asciiId = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return asciiId || `section-${index + 1}`;
}

function translatedArticleOrNotFound(locale: string, slug: string) {
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const article = getLocalizedLearnArticle(resolvedLocale, slug);

  if (!article) {
    notFound();
  }

  return { locale: resolvedLocale, article };
}

function articleHref(slug: string): string {
  if (isTranslatedLearnSlug(slug)) {
    return localizedLearnArticlePath(slug);
  }

  return `/learn/${slug}`;
}

function relatedArticleForLocale(locale: TranslatedLocale, slug: string): LearnArticle | null {
  return getLocalizedLearnArticle(locale, slug) ?? getArticle(slug) ?? null;
}

export function generateStaticParams() {
  return translatedLearnStaticParams();
}

export async function generateMetadata({
  params,
}: LocalizedLearnArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const article = getLocalizedLearnArticle(resolvedLocale, slug);

  if (!article || !isTranslatedLearnSlug(slug)) {
    return {};
  }

  const pathname = localizedLearnArticlePath(slug);
  const url = canonicalUrl(resolvedLocale, pathname);

  return {
    metadataBase: new URL(SITE_URL),
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: url,
      languages: alternateUrls(pathname),
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      url,
      siteName: "Wenlan",
      locale: LOCALE_CONFIG[resolvedLocale].openGraphLocale,
      publishedTime: article.publishedAt ?? article.updatedAt,
      modifiedTime: article.updatedAt,
      authors: [DEFAULT_AUTHOR_URL],
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function LocalizedLearnSlugPage({
  params,
}: LocalizedLearnArticlePageProps) {
  const { locale, slug } = await params;
  const { locale: resolvedLocale, article } = translatedArticleOrNotFound(locale, slug);
  const chrome = chromeByLocale[resolvedLocale];

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => relatedArticleForLocale(resolvedLocale, relatedSlug))
    .filter(
      (relatedArticle): relatedArticle is NonNullable<typeof relatedArticle> =>
        Boolean(relatedArticle),
    );

  const pathname = `/learn/${article.slug}`;
  const url = canonicalUrl(resolvedLocale, pathname);
  const articleBody = article.sections
    .flatMap((section) => section.body)
    .join("\n\n");
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;
  const articleBodySnippet =
    article.sections[0]?.body[0]?.slice(0, 500) ?? article.description;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      "@id": "https://wenlan.app/#qixuan-lu",
      name: article.author,
      url: DEFAULT_AUTHOR_URL,
      sameAs: DEFAULT_AUTHOR_SAME_AS,
      knowsAbout: [
        "AI work memory",
        "LLM wiki",
        "Model Context Protocol",
        "source-backed memory",
        "knowledge graphs",
      ],
    },
    publisher: {
      "@id": "https://wenlan.app/#organization",
    },
    datePublished: article.publishedAt ?? article.updatedAt,
    dateModified: article.updatedAt,
    image: `${SITE_URL}/og.png`,
    mainEntityOfPage: url,
    isPartOf: { "@id": `${canonicalUrl(resolvedLocale, "/learn")}#collection` },
    audience: { "@type": "Audience", audienceType: article.audience },
    keywords: article.keywords.join(", "),
    inLanguage: LOCALE_CONFIG[resolvedLocale].hreflang,
    isAccessibleForFree: true,
    wordCount,
    articleBody: articleBodySnippet,
    about: article.keywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    hasPart: article.sections.map((section, index) => ({
      "@type": "WebPageElement",
      name: section.heading,
      position: index + 1,
      url: `${url}#${sectionId(section.heading, index)}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: chrome.home,
        item: canonicalUrl(resolvedLocale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: chrome.learn,
        item: `${SITE_URL}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  return (
    <main className="grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        <header className="relative border-b border-[var(--o-border-subtle)] px-6 py-24 sm:py-32">
          <ArticleHalo />
          <div className="relative z-10 mx-auto max-w-5xl">
            <nav className="flex items-center gap-3 font-mono text-xs text-[var(--o-text-muted)]">
              <LocalizedLink
                href="/"
                locale={resolvedLocale}
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                {chrome.home}
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink
                href="/learn"
                locale={resolvedLocale}
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                {chrome.learn}
              </LocalizedLink>
            </nav>
            <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div className="min-w-0">
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                  {article.eyebrow}
                </p>
                <h1 className="warm-glow max-w-full break-words font-serif text-[2rem] leading-[1.08] font-medium tracking-tight [overflow-wrap:anywhere] sm:text-7xl sm:leading-[1.05]">
                  {article.title}
                </h1>
                <p className="mt-8 max-w-2xl break-words text-lg leading-relaxed text-[var(--o-text-secondary)]">
                  {article.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--o-text-muted)]">
                  <span>{article.author}</span>
                  <span>
                    {chrome.updated}{" "}
                    <time dateTime={article.updatedAt}>
                      {formatArticleDate(article.updatedAt)}
                    </time>
                  </span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
              <MemoryIndex
                label={chrome.articlePacket}
                items={[
                  article.category,
                  article.audience,
                  article.readingTime,
                ]}
              />
            </div>
          </div>
        </header>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-3">
              {article.heroBullets.map((bullet, index) => (
                <div key={bullet} className="card-wenlan rounded-xl p-5">
                  <p className="mb-5 font-mono text-[11px] text-[var(--o-warm)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--o-text-secondary)]">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,680px)_1fr]">
            <div className="min-w-0 space-y-14">
              {article.sections.map((section, index) => (
                <section
                  id={sectionId(section.heading, index)}
                  key={section.heading}
                  className="grid scroll-mt-24 gap-5 sm:grid-cols-[72px_1fr]"
                >
                  <p className="font-mono text-[11px] text-[var(--o-warm)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--o-text)]">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--o-text-secondary)]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-6 space-y-3 border-l border-[var(--o-border)] pl-5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-sm leading-relaxed text-[var(--o-text-muted)]"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.link && (
                      <LocalizedLink
                        href={section.link.href}
                        locale={resolvedLocale}
                        className="mt-6 inline-flex rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                      >
                        {section.link.label}
                      </LocalizedLink>
                    )}
                  </div>
                </section>
              ))}

              <section className="relative overflow-hidden rounded-2xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.18)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[var(--o-border-subtle)] opacity-50" />
                <h2 className="font-serif text-3xl font-medium tracking-tight">
                  {article.cta.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--o-text-secondary)]">
                  {article.cta.body}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <LocalizedLink
                    href="/docs/get-started"
                    locale={resolvedLocale}
                    className="rounded-xl bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-all hover:shadow-[0_0_28px_var(--o-glow-warm)]"
                  >
                    {chrome.getStarted}
                  </LocalizedLink>
                  <a
                    href="https://github.com/7xuanlu/wenlan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[var(--o-border)] px-5 py-3 text-center text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                  >
                    {chrome.github}
                  </a>
                </div>
              </section>
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-20 lg:self-start">
              <nav
                aria-label={chrome.inThisArticle}
                className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5"
              >
                <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  {chrome.inThisArticle}
                </p>
                <div className="mt-4 space-y-3">
                  {article.sections.map((section, index) => (
                    <a
                      key={section.heading}
                      href={`#${sectionId(section.heading, index)}`}
                      className="grid grid-cols-[28px_1fr] gap-2 text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                    >
                      <span className="font-mono text-[10px] text-[var(--o-text-dim)]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  ))}
                </div>
              </nav>

              <div className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  {chrome.relatedArticles}
                </p>
                <div className="mt-4 space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <LocalizedLink
                      key={relatedArticle.slug}
                      href={articleHref(relatedArticle.slug)}
                      locale={resolvedLocale}
                      scroll
                      className="block text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                    >
                      {relatedArticle.title}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-[var(--o-border-subtle)] px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
              {chrome.faq}
            </p>
            <div className="divide-y divide-[var(--o-border-subtle)] rounded-xl border border-[var(--o-border)]">
              {article.faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-serif text-sm font-medium text-[var(--o-text)] transition-colors duration-150 hover:text-[var(--o-text-secondary)] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="ml-4 text-[var(--o-text-muted)] transition-transform duration-150 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[var(--o-text-muted)]">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
