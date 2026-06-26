import { DEFAULT_LOCALE, LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { rootHomeSeo } from "@/i18n/metadata";
import { canonicalUrl } from "@/i18n/routing";

const englishSoftwareApplicationFeatures = [
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
] as const;

export function softwareApplicationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Wenlan",
    alternateName: [
      "Wenlan AI Work Memory",
      "Wenlan Local AI Work Memory",
      "Wenlan MCP",
    ],
    description: rootHomeSeo(locale).description,
    url: canonicalUrl(locale, "/"),
    inLanguage: LOCALE_CONFIG[locale].hreflang,
    applicationCategory: "DeveloperApplication",
    operatingSystem: ["macOS", "Linux", "Windows"],
    softwareVersion: "0.9.1",
    softwareRequirements:
      "macOS arm64 or x64, Linux x86_64 or aarch64 (glibc), Windows x86_64",
    installUrl: "https://github.com/7xuanlu/wenlan#quickstart",
    downloadUrl: "https://github.com/7xuanlu/wenlan/releases",
    screenshot: "https://useorigin.app/og.png",
    ...(locale === DEFAULT_LOCALE
      ? { featureList: [...englishSoftwareApplicationFeatures] }
      : {}),
    license: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: { "@id": "https://useorigin.app/#organization" },
    codeRepository: "https://github.com/7xuanlu/wenlan",
  };
}
