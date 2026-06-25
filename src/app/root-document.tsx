import { SiteFooter } from "@/components/site-footer";
import { getCoreContent } from "@/i18n/content";
import { LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { rootHomeSeo } from "@/i18n/metadata";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const siteDescription = rootHomeSeo(locale).description;
  const chrome = getCoreContent(locale).chrome.content;

  return (
    <html
      lang={LOCALE_CONFIG[locale].htmlLang}
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="me" href="https://github.com/7xuanlu" />
        <link rel="author" href="https://github.com/7xuanlu" />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("wenlan-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);else if(window.matchMedia("(prefers-color-scheme:light)").matches)document.documentElement.setAttribute("data-theme","light")}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Wenlan",
              alternateName: [
                "Wenlan AI Work Memory",
                "Wenlan Local AI Work Memory",
                "Wenlan MCP",
              ],
              description: siteDescription,
              url: "https://useorigin.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: ["macOS", "Linux", "Windows"],
              softwareVersion: "0.9.1",
              softwareRequirements:
                "macOS arm64 or x64, Linux x86_64 or aarch64 (glibc), Windows x86_64",
              installUrl: "https://github.com/7xuanlu/wenlan#quickstart",
              downloadUrl: "https://github.com/7xuanlu/wenlan/releases",
              screenshot: "https://useorigin.app/og.png",
              featureList: [
                "Hybrid retrieval on libSQL: vector + FTS5 + reciprocal-rank fusion + knowledge-graph context with a CE reranker. LME_Oracle: 93.6% Recall@5, 0.857 MRR, 0.883 NDCG@10 (500 Q). LME_S: 87.7% Recall@5, 0.815 MRR, 0.822 NDCG@10 (deep, N=90). Retrieval uses ~168 tokens per recall query versus full replay at 4,505 tokens per query.",
                "Real git versioning: readable pages, sessions, handoffs, and status artifacts commit into ~/.wenlan/.git/ so Markdown artifacts can be inspected, diffed, reverted, or branched.",
                "Source-backed provenance: distilled wiki page records keep source memory IDs. The daemon rejects pages with empty source_memory_ids (HTTP 422), and pages can grow or refresh without losing their source chain.",
                "Auditable memory: low-confidence captures, contradictions, supersession chains, and protected-memory conflicts surface for review instead of silently entering context.",
                "Composition over storage: memories distill into pages. Sessions track workflow. An entity graph links people, projects, tools, and relations. ~30 MCP tools across one daemon, not 100+ skills bolted on.",
                "Explicit spaces: tag memories, pages, and recalls with space=work | personal | client-X. Auto-detected from current repo or workspace.",
                "Cross-platform daemon: macOS arm64/x64, Linux x86_64/aarch64, Windows x86_64. Native installer per OS.",
                "MCP-native: works with Claude Code, Cursor, Codex, Claude Desktop, VS Code, Gemini CLI, and other MCP clients.",
                "No cloud sync or telemetry by default. Local models and Anthropic keys are opt-in for automatic page distillation, recaps, and richer graph work.",
                "Markdown artifacts you can read: pages in ~/.wenlan/pages/, session logs and project status under ~/.wenlan/sessions/. Symlink into Obsidian.",
              ],
              license:
                "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: { "@id": "https://useorigin.app/#organization" },
              codeRepository: "https://github.com/7xuanlu/wenlan",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://useorigin.app/#website",
              name: "Wenlan",
              alternateName: "useorigin.app",
              url: "https://useorigin.app",
              description: siteDescription,
              inLanguage: LOCALE_CONFIG[locale].hreflang,
              publisher: { "@id": "https://useorigin.app/#organization" },
              copyrightHolder: { "@id": "https://useorigin.app/#qixuan-lu" },
              copyrightYear: 2026,
              license: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://useorigin.app/#organization",
              name: "Wenlan",
              alternateName: [
                "Wenlan AI",
                "Wenlan AI Work Memory",
                "Wenlan Local AI Work Memory",
              ],
              url: "https://useorigin.app",
              logo: "https://useorigin.app/logo.svg",
              founder: {
                "@type": "Person",
                "@id": "https://useorigin.app/#qixuan-lu",
                name: "Qi-Xuan Lu",
                url: "https://github.com/7xuanlu",
                sameAs: ["https://github.com/7xuanlu"],
              },
              sameAs: [
                "https://github.com/7xuanlu/wenlan",
                "https://github.com/7xuanlu",
                "https://www.npmjs.com/package/wenlan",
                "https://www.npmjs.com/package/wenlan-mcp",
                "https://crates.io/crates/wenlan-mcp",
                "https://crates.io/crates/wenlan-types",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[var(--o-text)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[var(--o-bg)] focus:outline focus:outline-2 focus:outline-[var(--o-warm)]"
        >
          {chrome.skipLinkLabel}
        </a>
        <ThemeProvider>
          <div id="main-content">{children}</div>
          <SiteFooter locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
