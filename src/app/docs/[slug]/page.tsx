import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHalo, MemoryIndex } from "../../learn/article-visuals";
import { docPages, docUrl, formatDocDate, getDocPage } from "../docs";
import { SITE_URL } from "../../learn/articles";

type DocsArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return docPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/docs/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "article",
      url: docUrl(page.slug),
      siteName: "Origin",
      images: ["/og.png"],
      publishedTime: page.updatedAt,
      modifiedTime: page.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default async function DocsArticlePage({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const page = getDocPage(slug);

  if (!page) {
    notFound();
  }

  const nextPage = page.nextSlug ? getDocPage(page.nextSlug) : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    author: {
      "@id": "https://useorigin.app/#organization",
      name: page.author,
    },
    publisher: {
      "@id": "https://useorigin.app/#organization",
    },
    datePublished: page.updatedAt,
    dateModified: page.updatedAt,
    image: `${SITE_URL}/og.png`,
    mainEntityOfPage: docUrl(page.slug),
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
        name: "Docs",
        item: `${SITE_URL}/docs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: docUrl(page.slug),
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
              <Link
                href="/"
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                Origin
              </Link>
              <span>/</span>
              <Link
                href="/docs"
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                Docs
              </Link>
            </nav>
            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                  {page.eyebrow}
                </p>
                <h1 className="warm-glow font-serif text-[2rem] leading-[1.08] font-medium tracking-tight sm:text-7xl sm:leading-[1.05]">
                  {page.title}
                </h1>
                <p className="mt-8 max-w-[20rem] text-lg leading-relaxed text-[var(--o-text-secondary)] sm:max-w-2xl">
                  {page.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--o-text-muted)]">
                  <span>{page.author}</span>
                  <span>Updated {formatDocDate(page.updatedAt)}</span>
                  <span>{page.readingTime}</span>
                </div>
              </div>
              <MemoryIndex
                label="Doc packet"
                items={[
                  page.group,
                  page.readingTime,
                  nextPage?.title ?? "Reference",
                ]}
              />
            </div>
          </div>
        </header>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-3">
              {page.summary.map((item, index) => (
                <div key={item} className="card-origin rounded-xl p-5">
                  <p className="mb-5 font-mono text-[11px] text-[var(--o-warm)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--o-text-secondary)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,680px)_1fr]">
            <div className="space-y-14">
              {page.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className="grid gap-5 border-t border-[var(--o-border-subtle)] pt-10 sm:grid-cols-[72px_1fr]"
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
                    {section.code && (
                      <div className="mt-6">
                        <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[var(--o-text-dim)] uppercase">
                          {section.code.label}
                        </p>
                        <pre className="overflow-x-auto rounded-xl border border-[var(--o-border)] bg-[var(--o-bg-deep)] p-5 font-mono text-sm leading-relaxed text-[var(--o-text-secondary)]">
                          <code>{section.code.code}</code>
                        </pre>
                      </div>
                    )}
                    {section.link && (
                      <a
                        href={section.link.href}
                        className="mt-6 inline-flex rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
                      >
                        {section.link.label}
                      </a>
                    )}
                  </div>
                </section>
              ))}

              {nextPage && (
                <section className="rounded-2xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-7">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                    Next
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight">
                    {nextPage.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--o-text-secondary)]">
                    {nextPage.description}
                  </p>
                  <Link
                    href={`/docs/${nextPage.slug}`}
                    className="mt-6 inline-flex rounded-xl bg-[var(--o-text)] px-5 py-3 text-sm font-semibold text-[var(--o-bg)] transition-all hover:opacity-90"
                  >
                    Read next
                  </Link>
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  In this doc
                </p>
                <div className="mt-4 space-y-3">
                  {page.sections.map((section, index) => (
                    <p
                      key={section.heading}
                      className="grid grid-cols-[28px_1fr] gap-2 text-sm text-[var(--o-text-secondary)]"
                    >
                      <span className="font-mono text-[10px] text-[var(--o-text-dim)]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  Docs
                </p>
                <div className="mt-4 space-y-4">
                  <Link
                    href="/docs/get-started"
                    className="block text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                  >
                    Get started
                  </Link>
                  {docPages.map((docPage) => (
                    <Link
                      key={docPage.slug}
                      href={`/docs/${docPage.slug}`}
                      className="block text-sm leading-relaxed text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-warm)]"
                    >
                      {docPage.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
