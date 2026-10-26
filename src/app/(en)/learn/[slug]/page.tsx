import { ArticleCodeBlock } from "@/components/learn/article-code-block";
import { ReadingShell, learnContents } from "@/components/reading/reading-shell";
import { ObsidianGuideJumpLinks } from "@/components/learn/obsidian-guide-jump-links";
import { ArticleTitleText } from "@/components/learn/article-title-text";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articleUrl,
  articles,
  DEFAULT_AUTHOR_SAME_AS,
  DEFAULT_AUTHOR_URL,
  formatArticleDate,
  getArticle,
  SITE_URL,
} from "../articles";
import { ArticleHalo } from "../article-visuals";
import { ShareArticle } from "@/components/learn/share-article";
import { LOCALE_CONFIG } from "@/i18n/locales";
import { alternateUrls, isTranslatedLearnPath } from "@/i18n/routing";
import { TrackedLink } from "@/components/tracked-link";
import { getScenarioPacket } from "@/lib/scenario-examples";
import { ScenarioWorkedExample } from "@/components/learn/scenario-worked-example";
import { ProductEvidencePanel } from "@/components/learn/product-evidence-panel";
import { getCoreContent } from "@/i18n/content";
import { RecordedWorkflowProof } from "@/components/learn/recorded-workflow-proof";
import { ArticleSteps } from "@/components/learn/article-steps";
import { ArticleOpeningExample } from "@/components/learn/article-opening-example";
import { EvidenceImage } from "@/components/learn/evidence-image";
import { SectionDisclosure } from "@/components/learn/section-disclosure";
import { ComparisonTableSection, LearnFigure, SectionTable } from "@/components/learn/learn-figures";

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type LearnArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LearnArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const pathname = `/learn/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: pathname,
      ...(isTranslatedLearnPath(pathname)
        ? {
            languages: alternateUrls(pathname),
          }
        : {}),
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      url: articleUrl(article.slug),
      siteName: "Wenlan",
      locale: LOCALE_CONFIG.en.openGraphLocale,
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

export default async function LearnArticlePage({ params }: LearnArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => getArticle(relatedSlug))
    .filter(
      (relatedArticle): relatedArticle is NonNullable<typeof relatedArticle> =>
        Boolean(relatedArticle),
    );

  const articleBody = article.sections
    .flatMap((section) => [...section.body, ...(section.afterBullets ?? [])])
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
        "local-first software",
        "Model Context Protocol",
        "knowledge graphs",
        "hybrid retrieval",
      ],
    },
    publisher: {
      "@id": "https://wenlan.app/#organization",
    },
    datePublished: article.publishedAt ?? article.updatedAt,
    dateModified: article.updatedAt,
    image: `${SITE_URL}/og.png`,
    mainEntityOfPage: articleUrl(article.slug),
    isPartOf: { "@id": "https://wenlan.app/learn#collection" },
    audience: { "@type": "Audience", audienceType: article.audience },
    keywords: article.keywords.join(", "),
    inLanguage: "en",
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
      url: `${articleUrl(article.slug)}#${section.id ?? sectionId(section.heading)}`,
    })),
    ...(article.comparisonTable
      ? {
          mentions: [
            {
              "@type": "SoftwareApplication",
              name: article.comparisonTable.competitorName,
              applicationCategory: "DeveloperApplication",
              ...(article.officialReferences?.[0]?.href
                ? { url: article.officialReferences[0].href }
                : {}),
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://wenlan.app/#software",
              name: "Wenlan",
              applicationCategory: "DeveloperApplication",
              url: "https://wenlan.app",
            },
          ],
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${SITE_URL}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl(article.slug),
      },
    ],
  };

  return (
    <div className="grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingShell locale="en" section="learn" path={`/learn/${article.slug}`} toc={learnContents(article, article.sections.map(section => section.id ?? sectionId(section.heading)), "en")}>
      <article>
        <header data-lead-example={article.openingExample ? "true" : undefined} className="reading-page-header relative px-6 py-24 sm:py-32">
          <ArticleHalo />
          <div className="relative z-10 mx-auto max-w-5xl">
            <nav className="flex items-center gap-3 font-mono text-xs text-[var(--o-text-muted)]">
              <Link
                href="/"
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                Wenlan
              </Link>
              <span>/</span>
              <Link
                href="/learn"
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                Learn
              </Link>
            </nav>
            <div className="reading-title mt-8">
              <div className="min-w-0">
                {!article.openingExample && (
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                  {article.eyebrow}
                </p>
                )}
                <h1 className="warm-glow max-w-full font-serif text-[2rem] leading-[1.08] font-medium tracking-tight [overflow-wrap:anywhere] [word-break:normal] sm:[overflow-wrap:break-word] sm:[word-break:keep-all] sm:text-7xl sm:leading-[1.05]"
                >
                  <ArticleTitleText title={article.title} />
                </h1>
                <p className="mt-8 max-w-2xl break-words text-lg leading-relaxed text-[var(--o-text-secondary)]">
                  {article.description}
                </p>
                {article.openingExample && <ArticleOpeningExample example={article.openingExample} locale={"en"} />}
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--o-text-muted)]">
                  <span>{article.author}</span>
                  <span>
                    Updated{" "}
                    <time dateTime={article.updatedAt}>
                      {formatArticleDate(article.updatedAt)}
                    </time>
                  </span>
                  <span>{article.readingTime}</span>
                </div>
                <div className="reading-actions">
                {article.slug === "wenlan-vs-obsidian-ai-memory" && <ObsidianGuideJumpLinks locale={"en"} />}
                {article.productEvidence && (
                  <a
                    href={article.productEvidence.action.href}
                    className="mt-7 inline-flex rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-semibold text-[var(--o-text)] transition-colors hover:border-[var(--o-warm)] hover:text-[var(--o-warm)]"
                  >
                    {article.productEvidence.action.label}
                  </a>
                )}
                {article.slug === "distilled-wiki-pages-ai-memory" && (
                  <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#worked-example" className="inline-flex rounded-md border border-[var(--o-border)] px-5 py-3 text-sm font-semibold hover:text-[var(--o-warm)]">
                    Try the complete source-to-wiki example
                  </a>
                  <a href="/learn-example/en" download className="inline-flex items-center px-2 py-3 text-sm font-semibold text-[var(--o-warm)] underline underline-offset-4">Download the exercise (.md)</a>
                  </div>
                )}
                {["distilled-wiki-pages-ai-memory", "source-backed-wiki-pages-ai-work", "build-local-ai-knowledge-base-from-documents"].includes(article.slug) && (
                  <a href={article.slug === "build-local-ai-knowledge-base-from-documents" ? "#add-documents-in-wenlan" : "#recorded-workflow"} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--o-warm)] underline underline-offset-4">Inspect the real app screens</a>
                )}
              </div>
              </div>
            </div>
          </div>
        </header>

        {!article.openingExample && article.slug !== "choose-ai-knowledge-base-tool" && <section className="reading-summary-section px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="reading-summary grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
              {article.heroBullets.map((bullet, index) => (
                <div key={bullet} className="card-wenlan p-5">
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
        </section>}

        {getScenarioPacket(article.slug) ? (
          <ScenarioWorkedExample packet={getScenarioPacket(article.slug)!} locale={"en"} />
        ) : article.productEvidence && (
          <ProductEvidencePanel evidence={article.productEvidence} />
        )}

        <section className="px-6 pb-20">
          <div className="reading-prose-layout mx-auto min-w-0">
            <div className="min-w-0 space-y-14">
              {article.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className="reading-chapter grid scroll-mt-24 gap-5 sm:grid-cols-[72px_1fr]"
                >
                  <p className="font-mono text-[11px] text-[var(--o-warm)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <div className="min-w-0">
                    {article.slug === "choose-ai-knowledge-base-tool" && section.id === "choose-your-path" && (
                      <>
                        <span id="compare-tools" className="scroll-mt-28" />
                        <span id="compare-tools-heading" className="scroll-mt-28" />
                        <span id="workflow-comparisons" className="scroll-mt-28" />
                        <span id="workflow-comparisons-heading" className="scroll-mt-28" />
                      </>
                    )}
                    <h2 id={section.id ?? sectionId(section.heading)} className="scroll-mt-28 font-serif text-3xl font-medium tracking-tight text-[var(--o-text)]">
                      {section.heading}
                    </h2>
                    <SectionDisclosure label={section.disclosure}>
                      <div className={`${section.disclosure ? "" : "mt-5 "}space-y-4 text-base leading-relaxed text-[var(--o-text-secondary)]`}>
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className={section.id?.startsWith("worked-example") ? "text-pretty" : undefined}>{paragraph}</p>
                        ))}
                      </div>
                      {section.steps && <ArticleSteps steps={section.steps} locale={"en"} />}
                      {section.figure && <LearnFigure id={section.figure} locale="en" />}
                      {section.table && <SectionTable table={section.table} />}
                      {section.bullets && (
                        <ul className={article.slug === "choose-ai-knowledge-base-tool"
                          ? "mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-[var(--o-text-secondary)]"
                          : "mt-6 space-y-3 border-l border-[var(--o-border)] pl-5"}>
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className={article.slug === "choose-ai-knowledge-base-tool"
                                ? undefined
                                : "text-sm leading-relaxed text-[var(--o-text-muted)]"}
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.afterBullets && (
                        <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--o-text-secondary)]">
                          {section.afterBullets.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                      {section.code && <ArticleCodeBlock label={section.code.label} code={section.code.code} />}
                      {section.image && (
                        <figure className="mt-6 overflow-hidden rounded-xl border border-[var(--o-border)]">
                          <EvidenceImage image={section.image} locale={"en"} detailFocus={section.id === "review-the-update" ? { x: 0.86, y: 0.44 } : section.id === "see-the-source" ? { x: 0.86, y: 0.7 } : undefined} />
                          <figcaption className="px-4 pb-4 text-sm leading-relaxed text-[var(--o-text-muted)]">{section.image.caption}</figcaption>
                        </figure>
                      )}
                      {section.link && ((section.link.href.startsWith("#") || section.link.href.startsWith(`/learn/${article.slug}#`)) ? (
                        <a
                          href={section.link.href.startsWith(`/learn/${article.slug}#`)
                            ? section.link.href.slice(`/learn/${article.slug}`.length)
                            : section.link.href}
                          className="mt-6 inline-flex rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                        >
                          {section.link.label}
                        </a>
                      ) : (
                        <Link
                          href={section.link.href}
                          className="mt-6 inline-flex rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                        >
                          {section.link.label}
                        </Link>
                      ))}
                    </SectionDisclosure>
                  </div>
                </section>
              ))}

              {article.comparisonTable && (
                <ComparisonTableSection headingAnchor table={article.comparisonTable} locale="en" />
              )}

              <section className="relative overflow-hidden rounded-2xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.18)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[var(--o-border-subtle)] opacity-50" />
                <h2 className="font-serif text-3xl font-medium tracking-tight">
                  {article.cta.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--o-text-secondary)]">
                  {article.cta.body}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href="/docs/get-started"
                    eventName="get_started_click"
                    placement="learn-article"
                    locale="en"
                    context={article.category === "Comparisons" ? "comparisons" : article.category === "Workflows" ? "workflows" : "concepts"}
                    className="rounded-xl bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-all hover:shadow-[0_0_28px_var(--o-glow-warm)]"
                  >
                    Get started
                  </TrackedLink>
                  <TrackedLink
                    href="https://github.com/wenlan-app/wenlan"
                    eventName="github_outbound"
                    placement="learn-article"
                    locale="en"
                    context={article.category === "Comparisons" ? "comparisons" : article.category === "Workflows" ? "workflows" : "concepts"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[var(--o-border)] px-5 py-3 text-center text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                  >
                    View on GitHub
                  </TrackedLink>
                </div>
              </section>
            </div>

            <aside  className="reading-resources min-w-0 space-y-6">
              <span id="article-resources" className="block h-px col-span-full" aria-hidden="true" />

              {article.officialReferences && (
                <div className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                    Official references
                  </p>
                  <div className="mt-4 space-y-4">
                    {article.officialReferences.map((reference) => (
                      <a
                        key={reference.href}
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="block text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                      >
                        {reference.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  Related articles
                </p>
                <div className="mt-4 space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      href={`/learn/${relatedArticle.slug}`}
                      scroll
                      className="block text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                    >
                      {relatedArticle.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>


        {["distilled-wiki-pages-ai-memory", "source-backed-wiki-pages-ai-work", "wenlan-vs-obsidian-ai-memory"].includes(article.slug) && <RecordedWorkflowProof headingAnchor locale="en" />}

        <section  className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p id="article-faq" className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
              FAQ
            </p>
            <div className="rounded-xl border border-[var(--o-border)]">
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

        <ShareArticle locale="en" url={articleUrl(article.slug)} title={article.title} />
      </article>
      </ReadingShell>
    </div>
  );
}
