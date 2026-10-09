import type { Locale } from "@/i18n/locales";

const copy = {
  en: { label: "Jump to a topic", links: ["Connect", "MCP", "Plugins", "Why Wenlan"] },
  "zh-TW": { label: "直接看你需要的部分", links: ["開始連接", "MCP", "外掛", "為什麼用 Wenlan"] },
  "zh-CN": { label: "直接看你需要的部分", links: ["开始连接", "MCP", "插件", "为什么用 Wenlan"] },
} satisfies Record<Locale, { label: string; links: string[] }>;

const targets = ["before-you-start", "obsidian-mcp-server", "obsidian-claude-code-plugin", "claude-code-obsidian-memory"];

export function ObsidianGuideJumpLinks({ locale }: { locale: Locale }) {
  const content = copy[locale];
  return (
    <nav aria-label={content.label} className="mt-7 lg:hidden">
      <p className="text-xs text-[var(--o-text-muted)]">{content.label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {targets.map((id, index) => (
          <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--o-border)] px-3 py-2 text-sm font-medium text-[var(--o-text-secondary)] hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
            {content.links[index]}
          </a>
        ))}
      </div>
    </nav>
  );
}
