import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink, type AnalyticsContext } from "@/components/tracked-link";
import {
  articleCategories,
  articles,
  articleUrl,
  formatArticleDate,
  SITE_URL,
} from "./articles";
import { ArticleHalo, MemoryIndex } from "./article-visuals";
import { alternateUrls } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "AI Memory Guides for Claude Code, Codex, ChatGPT | Wenlan",
  description:
    "Build persistent AI work memory across Claude Code, Codex, ChatGPT, and Cursor with setup guides, MCP workflows, source-backed wiki patterns, and comparisons.",
  alternates: {
    canonical: "/learn",
    languages: alternateUrls("/learn"),
  },
  openGraph: {
    title: "AI Memory Guides for Claude Code, Codex, ChatGPT | Wenlan",
    description:
      "Build persistent AI work memory across Claude Code, Codex, ChatGPT, and Cursor with setup guides, MCP workflows, source-backed wiki patterns, and comparisons.",
    type: "website",
    url: `${SITE_URL}/learn`,
    siteName: "Wenlan",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Memory Guides for Claude Code, Codex, ChatGPT | Wenlan",
    description:
      "Build persistent AI work memory across Claude Code, Codex, ChatGPT, and Cursor with setup guides, MCP workflows, source-backed wiki patterns, and comparisons.",
  },
};

const searchRoutes = [
  {
    query: "Basic Memory comparison",
    intent: "Compare Wenlan and Basic Memory on provenance, local retrieval, shared clients, and wiki pages.",
    href: "/learn/wenlan-vs-basic-memory",
    context: "comparisons",
  },
  {
    query: "Claude Code session handoff",
    intent: "Carry decisions, open work, and next steps from one coding session into the next.",
    href: "/learn/claude-code-session-handoff",
    context: "workflows",
  },
  {
    query: "MCP memory server",
    intent: "Connect Claude Code, Codex, Cursor, ChatGPT, and other MCP clients to Wenlan.",
    href: "/learn/mcp-memory-server",
    context: "concepts",
  },
  {
    query: "Claude Code memory",
    intent: "Understand CLAUDE.md, /memory, and when Wenlan adds shared local context.",
    href: "/learn/claude-code-memory",
    context: "workflows",
  },
  {
    query: "ChatGPT MCP",
    intent: "Connect ChatGPT to your Wenlan runtime through Streamable HTTP MCP Remote Access.",
    href: "/docs/mcp-clients",
    context: "setup",
  },
  {
    query: "Cursor memory MCP",
    intent: "Wire Cursor to Wenlan's local MCP memory server and verify recall.",
    href: "/learn/how-to-add-mcp-memory-to-cursor",
    context: "workflows",
  },
  {
    query: "Local AI memory",
    intent: "Keep project context local, inspectable, and under your control.",
    href: "/learn/local-first-ai-memory",
    context: "concepts",
  },
  {
    query: "Wenlan memory",
    intent: "Map the brand to the category: local AI work memory across tools.",
    href: "/learn/ai-work-memory",
    context: "concepts",
  },
  {
    query: "How Wenlan works",
    intent: "See how the daemon, MCP connector, local index, and source-backed pages fit together.",
    href: "/docs/architecture",
    context: "setup",
  },
] as const satisfies readonly {
  readonly query: string;
  readonly intent: string;
  readonly href: string;
  readonly context: AnalyticsContext;
}[];

export default function LearnPage() {
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
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://wenlan.app/learn#collection",
    name: "Wenlan Learn",
    description:
      "Articles about AI work memory, MCP memory servers, local-first AI work context, setup guides, client workflows, trust, and Wenlan comparisons.",
    url: `${SITE_URL}/learn`,
    isPartOf: { "@id": "https://wenlan.app/#website" },
    publisher: { "@id": "https://wenlan.app/#organization" },
    inLanguage: "en-US",
    mainEntity: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: articleUrl(article.slug),
      author: {
        "@id": "https://wenlan.app/#qixuan-lu",
      },
    })),
  };

  return (
    <main className="grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <section className="relative border-b border-[var(--o-border-subtle)] px-6 py-24 sm:py-32">
        <ArticleHalo />
        <div className="relative z-10 mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 font-mono text-xs text-[var(--o-text-muted)]">
            <Link
              href="/"
              className="transition-colors hover:text-[var(--o-text-secondary)]"
            >
              Wenlan
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--o-text-secondary)]" aria-current="page">
              Learn
            </span>
          </nav>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                Learn
              </p>
              <h1 className="warm-glow font-serif text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl">
                AI memory guides for work that carries forward.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--o-text-secondary)]">
                Start with setup, persistent memory, or a named comparison.
                Wenlan keeps durable context local and turns trusted captures
                into source-backed wiki pages your AI tools can reuse.
              </p>
            </div>
            <MemoryIndex
              label="Learn topics"
              items={[
                "AI work memory",
                "LLM wiki for AI work",
                "Setup guides",
                "Client workflows",
                "Named comparisons",
                "Local-first trust",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="py-2">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-warm)]/80 uppercase">
              Start here
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
              Search intent first. Start with the problem or phrase you would
              type into Google, then move into setup, workflow, trust, and
              comparison articles once the route is clear.
            </p>
          </div>

          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--o-text)]">
                Popular search paths
              </h2>
              <p className="font-mono text-[11px] text-[var(--o-text-dim)]">
                Search demand
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {searchRoutes.map((route) => (
                <TrackedLink
                  key={route.query}
                  href={route.href}
                  eventName="Learn Article Click"
                  placement="learn-search-path"
                  locale="en"
                  context={route.context}
                  scroll
                  className="group rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-5 transition-colors hover:border-[var(--o-warm)]/50"
                >
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--o-warm)]/80 uppercase">
                    {route.query}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--o-text-secondary)]">
                    {route.intent}
                  </p>
                </TrackedLink>
              ))}
            </div>
          </section>

          <div className="mt-16 space-y-16">
            {articleCategories.map((category) => {
              const categoryArticles = articles.filter(
                (article) => article.category === category,
              );

              return (
                <section key={category}>
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--o-text)]">
                      {category}
                    </h2>
                    <p className="font-mono text-[11px] text-[var(--o-text-dim)]">
                      {categoryArticles.length} articles
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {categoryArticles.map((article) => (
                      <TrackedLink
                        key={article.slug}
                        href={`/learn/${article.slug}`}
                        eventName="Learn Article Click"
                        placement="learn-grid"
                        locale="en"
                        context={article.category === "Comparisons" ? "comparisons" : article.category === "Workflows" ? "workflows" : "concepts"}
                        scroll
                        className="card-wenlan group relative overflow-hidden rounded-xl p-7 transition-transform duration-150 hover:-translate-y-1"
                      >
                        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[var(--o-border-subtle)] opacity-50 transition-transform duration-300 group-hover:scale-110" />
                        <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-warm)]/80 uppercase">
                          {article.eyebrow}
                        </p>
                        <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight text-[var(--o-text)]">
                          {article.title}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
                          {article.description}
                        </p>
                        <div className="mt-6 border-t border-[var(--o-border-subtle)] pt-5">
                          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-[var(--o-text-muted)]">
                            <span>{article.author}</span>
                            <time dateTime={article.updatedAt}>
                              {formatArticleDate(article.updatedAt)}
                            </time>
                            <span>{article.readingTime}</span>
                          </div>
                        </div>
                      </TrackedLink>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--o-border-subtle)] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/70 uppercase">
            Ready to try the local memory loop?
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Make AI work carry forward.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            Install Wenlan, connect your AI tools, and verify the first memory
            loop locally.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <TrackedLink
              href="/docs/get-started"
              eventName="Get Started Click"
              placement="learn-footer"
              locale="en"
              context="setup"
              className="rounded-xl bg-[var(--o-text)] px-6 py-3 text-sm font-semibold text-[var(--o-bg)] transition-all duration-150 hover:opacity-90"
            >
              Get started
            </TrackedLink>
            <TrackedLink
              href="https://github.com/7xuanlu/wenlan"
              eventName="GitHub Click"
              placement="learn-footer"
              locale="en"
              context="setup"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--o-border)] px-6 py-3 text-sm font-medium text-[var(--o-text-secondary)] transition-all duration-150 hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)]"
            >
              View on GitHub
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
