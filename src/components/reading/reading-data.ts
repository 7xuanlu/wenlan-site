import { articles, type LearnArticle } from "@/app/(en)/learn/articles";
import { getLocalizedLearnArticles } from "@/i18n/learn-articles";
import { getCoreContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/routing";
import type { ReadingGroup } from "./reading-types";

const learnLabels = {
  en: ["Concepts", "AI tools and shared memory", "Build a knowledge base", "Maintain and verify", "Tool comparisons"],
  "zh-TW": ["基礎概念", "AI 工具與共用記憶", "建立知識庫", "維護與驗證", "工具比較"],
  "zh-CN": ["基础概念", "AI 工具与共享记忆", "搭建知识库", "维护与验证", "工具对比"],
};
const learnIds = ["concepts", "ai-tools", "knowledge-base", "maintenance", "comparisons"];
const maintenance = new Set(["verify-ai-knowledge-base-citations", "when-ai-agent-should-query-knowledge-base", "fix-pdf-ingestion-ai-knowledge-base", "prevent-multi-agent-knowledge-conflicts", "test-ai-knowledge-base-retrieval-after-changes", "review-before-trust-ai-memory"]);
const clients = new Set(["claude-code-memory", "how-to-give-codex-persistent-memory", "codex-claude-code-shared-memory", "how-to-add-mcp-memory-to-cursor", "claude-desktop-mcp-memory-setup", "cursor-claude-code-shared-memory", "ai-agent-handoff-loop"]);

export function getLearnSections(locale: Locale) {
  const available = locale === "en" ? articles : getLocalizedLearnArticles(locale);
  const groupIndex = (article: LearnArticle) => maintenance.has(article.slug) ? 3 : clients.has(article.slug) ? 1 : article.category === "Comparisons" ? 4 : article.category === "Concepts" ? 0 : 2;
  return learnIds.map((id, index) => ({id, title: learnLabels[locale][index], articles: available.filter(article => groupIndex(article) === index)})).filter(group => group.articles.length);
}

const docReferenceGroups = [
  {id: "connect", slugs: ["mcp-clients", "claude-code-plugin", "agent-profiles"], labels: ["Connect AI tools", "連接 AI 工具", "连接 AI 工具"]},
  {id: "knowledge", slugs: ["memory-types", "spaces", "source-backed-pages", "knowledge-graph", "import-and-portability"], labels: ["Knowledge and sources", "知識與來源", "知识与来源"]},
  {id: "data", slugs: ["data-and-privacy", "backup-and-migration", "local-git-history"], labels: ["Data and privacy", "資料與隱私", "数据与隐私"]},
  {id: "runtime", slugs: ["cli-and-service", "configuration", "environment-variables", "models-and-keys", "platforms", "updates-and-uninstall", "upgrade-notes", "packages-and-registries"], labels: ["Runtime and settings", "執行環境與設定", "运行环境与设置"]},
  {id: "developer", slugs: ["commands", "http-api", "api-examples", "typed-clients", "architecture", "advanced-retrieval", "experimental-flags"], labels: ["Developer reference", "開發參考", "开发参考"]},
  {id: "help", slugs: ["troubleshooting", "diagnostics-and-issue-reports", "faq", "glossary"], labels: ["Troubleshooting and help", "疑難排解與說明", "故障排查与帮助"]},
];

export function getDocsSections(locale: Locale) {
  const sections = getCoreContent(locale).docs.content.sections.items;
  const reference = sections.find(section => section.id === "reference");
  if (!reference) return [...sections];
  const localeIndex = locale === "en" ? 0 : locale === "zh-TW" ? 1 : 2;
  const assigned = new Set(docReferenceGroups.flatMap(group => group.slugs));
  return sections.flatMap(section => section.id !== "reference" ? [section] : [
    ...docReferenceGroups.map(group => ({...section, id: group.id, title: group.labels[localeIndex], description: "", items: group.slugs.flatMap(slug => reference.items.filter(item => item.id === slug))})),
    {...section, items: reference.items.filter(item => !assigned.has(item.id))},
  ]).filter(section => section.items.length);
}


// Short index labels make the article tree scannable; the full title remains searchable.
const learnIndexLabels: Record<string, string> = {
  "ai-work-memory": "What is AI work memory?",
  "mcp-memory-server": "MCP memory servers",
  "wenlan-vs-obsidian-ai-memory": "Obsidian + Claude Code",
  "local-first-ai-memory": "Local-first AI memory",
  "claude-code-memory": "Claude Code memory",
  "how-to-give-codex-persistent-memory": "Codex memory and AGENTS.md",
  "distilled-wiki-pages-ai-memory": "Karpathy’s LLM Wiki",
  "ai-work-memory-vs-knowledge-base": "Memory vs knowledge base",
  "ai-agent-memory-types": "AI agent memory types",
  "ai-agent-handoff-loop": "Session handoffs",
  "how-to-add-mcp-memory-to-cursor": "Cursor MCP setup",
  "claude-desktop-mcp-memory-setup": "Claude Desktop MCP setup",
  "ai-agent-memory-local-vs-cloud": "Local vs cloud memory",
  "ai-coding-agent-loses-context": "Why agents lose context",
  "coding-agent-source-backed-knowledge-base": "A project knowledge base for Codex",
  "cursor-claude-code-shared-memory": "Share Cursor + Claude Code memory",
  "codex-claude-code-shared-memory": "Share Codex + Claude Code memory",
  "source-backed-research-knowledge-base": "Research papers and PDFs",
  "choose-ai-knowledge-base-tool": "Choose a knowledge base tool",
  "migrate-obsidian-vault-to-llm-wiki": "Bring an Obsidian vault",
  "setup-agent-knowledge-base-for-coding-agents": "Set up an agent knowledge base",
  "build-client-project-knowledge-base-for-consulting": "Client projects and consulting",
  "build-investment-research-knowledge-base": "Investment research",
  "build-sre-incident-knowledge-base": "SRE incidents and runbooks",
  "build-competitive-intelligence-knowledge-base": "Competitive intelligence",
  "build-ict-supplier-due-diligence-evidence-pack": "Supplier due diligence",
  "build-customer-support-answer-knowledge-base": "Customer support answers",
  "build-course-wiki-from-lecture-notes": "A course wiki from lecture notes",
  "build-business-metric-definition-knowledge-base": "Business metric definitions",
  "prevent-multi-agent-knowledge-conflicts": "Prevent shared knowledge conflicts",
  "fix-pdf-ingestion-ai-knowledge-base": "Diagnose PDF ingestion",
  "when-ai-agent-should-query-knowledge-base": "When agents should query",
  "verify-ai-knowledge-base-citations": "Verify citations and claims",
  "source-backed-wiki-pages-ai-work": "Source-backed knowledge for agents",
  "review-before-trust-ai-memory": "Fix stale AI memory",
  "build-local-ai-knowledge-base-from-documents": "Build from local documents",
  "test-ai-knowledge-base-retrieval-after-changes": "Regression-test retrieval",
  "build-product-research-knowledge-base-for-prd": "Product research before a PRD",
};
function learnIndexLabel(article: LearnArticle, locale: Locale) {
  if (locale !== "en") return article.title;
  return learnIndexLabels[article.slug] ?? article.title.split(":")[0];
}

export function getReadingGroups(locale: Locale, section: "learn" | "docs"): ReadingGroup[] {
  if (section === "learn") return getLearnSections(locale).map(group => ({id: group.id, label: group.title, items: group.articles.map(article => ({href: localizePath(locale, `/learn/${article.slug}`), label: learnIndexLabel(article, locale), searchText: article.title}))}));
  return getDocsSections(locale).map(group => ({id: group.id, label: group.title, items: group.items.map(item => ({href: localizePath(locale, item.href), label: item.title, english: locale !== "en" && localizePath(locale, item.href) === item.href}))}));
}
