import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHalo } from "../learn/article-visuals";
import { SITE_URL } from "../learn/articles";

export const metadata: Metadata = {
  title: "Origin Docs | Get Started",
  description:
    "Install Origin, connect Claude Code or an MCP client, and verify the local AI work memory loop.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Origin Docs | Get Started",
    description:
      "Install Origin, connect Claude Code or an MCP client, and verify the local AI work memory loop.",
    type: "website",
    url: `${SITE_URL}/docs`,
    siteName: "Origin",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Docs | Get Started",
    description:
      "Install Origin, connect Claude Code or an MCP client, and verify the local AI work memory loop.",
    images: ["/og.png"],
  },
};

const docsSections = [
  {
    href: "/docs/get-started",
    label: "Start here",
    title: "Get started with Origin",
    description:
      "Install the Claude Code plugin, wire Origin into an MCP client, and confirm the local memory loop works.",
    meta: "Setup path",
  },
];

export default function DocsPage() {
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
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Origin Docs",
    description: "Product documentation for Origin, a local-first memory layer for AI work.",
    url: `${SITE_URL}/docs`,
    hasPart: [
      {
        "@type": "WebPage",
        name: "Get started with Origin",
        url: `${SITE_URL}/docs/get-started`,
      },
    ],
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
          <Link
            href="/"
            className="font-mono text-xs text-[var(--o-text-muted)] transition-colors hover:text-[var(--o-text-secondary)]"
          >
            Origin
          </Link>
          <div className="mt-12 max-w-3xl">
            <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
              Docs
            </p>
            <h1 className="warm-glow font-serif text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl">
              Start using Origin.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--o-text-secondary)]">
              Install the local memory layer, connect your AI tools, and verify
              the first memory loop.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl divide-y divide-[var(--o-border-subtle)] border-y border-[var(--o-border-subtle)]">
          {docsSections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className="group grid gap-5 py-8 transition-colors duration-150 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center"
            >
              <p className="font-mono text-[11px] text-[var(--o-warm)]">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <div>
                <p className="mb-3 font-mono text-[10px] tracking-[0.24em] text-[var(--o-text-muted)] uppercase">
                  {section.label}
                </p>
                <h2 className="font-serif text-2xl font-medium tracking-tight text-[var(--o-text)] transition-colors group-hover:text-[var(--o-warm)]">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--o-text-muted)]">
                  {section.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <span className="font-mono text-[11px] text-[var(--o-text-dim)]">
                  {section.meta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
