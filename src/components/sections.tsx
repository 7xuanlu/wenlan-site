import type { HomeContent } from "@/i18n/content";

/* FAQ */

export const homepageFaqs = [
  {
    q: "What is Wenlan?",
    a: "Wenlan is a living personal knowledge library for AI work. Agents capture what they learn, you add sources you trust, and the local daemon keeps source-cited pages current across chats, tools, projects, and time.",
  },
  {
    q: "How is Wenlan different from built-in AI memory?",
    a: "Built-in memory stores what the AI decided was important. You usually cannot trace it, correct it, or use it from another tool. Wenlan keeps memory local, visible, correctable, and traceable. Readable pages, session logs, and project status are versioned in ~/.wenlan/.git/, and every distilled page cites the source memory IDs that produced it.",
  },
  {
    q: "What retrieval quality does Wenlan reach?",
    a: "Hybrid retrieval combines vector search (BGE-Base-EN-v1.5-Q, 768-dim), FTS5, reciprocal-rank fusion, knowledge-graph context, and the local BGE reranker. LME_Oracle is 93.6% Recall@5, 0.857 MRR, and 0.883 NDCG@10 on the 500-question snapshot. LME_S is 87.7% Recall@5, 0.815 MRR, and 0.822 NDCG@10 on the stratified N=90 deep-S snapshot. The eval harness ships in the repo at crates/wenlan-core/src/eval/.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Wenlan runs on your machine and stores its database locally. No cloud sync or telemetry by default. Local memory setup works without a model or API key. On-device models or an Anthropic key are opt-in for automatic page distillation, recaps, and richer graph work.",
  },
  {
    q: "Is Wenlan just another memory MCP?",
    a: "No. The MCP server is the connector. Wenlan also includes the local daemon, manual /distill, optional model-backed background extraction and page work, a libSQL store with DiskANN vectors, FTS5 + knowledge graph, mandatory provenance, real git versioning for memory, page, and session artifacts, and readable Markdown export paths.",
  },
  {
    q: "What AI tools work with Wenlan?",
    a: "Claude Code has a marketplace plugin. MCP-compatible clients such as Cursor, Codex, Claude Desktop, VS Code, Gemini CLI, and others connect through Wenlan's MCP server.",
  },
  {
    q: "Is Wenlan a replacement for Notion or Obsidian?",
    a: "No. Wenlan is not a notes app or a writing tool. It captures and refines what you learn from AI conversations. The Markdown projection under ~/.wenlan/ can be symlinked into Obsidian if you want to read it there.",
  },
  {
    q: "How do I set it up?",
    a: "In Claude Code, run /plugin marketplace add 7xuanlu/claude-plugins, then /plugin install wenlan@7xuanlu, then /init. For other MCP clients, run npx -y wenlan setup first, then ~/.wenlan/bin/wenlan mcp add codex, cursor, claude-desktop, vscode, or gemini.",
  },
  {
    q: "Does Wenlan work on Windows or Linux?",
    a: "Yes. The daemon builds and runs on macOS (arm64, x64), Linux (x86_64, aarch64; glibc), and Windows (x86_64). Service registration uses launchd on macOS, systemd-user on Linux, and Task Scheduler (schtasks) on Windows.",
  },
  {
    q: "Can I keep work and personal memory separate?",
    a: "Yes. Memories, pages, and recalls belong to a space (for example, work, personal, or client-X). Set the active space per shell with WENLAN_SPACE, or declare them in ~/.wenlan/spaces.toml. The auto-detector also picks a space from the current repo or workspace.",
  },
  {
    q: "Is Wenlan free?",
    a: "Yes. Wenlan is open-source. The local runtime, CLI, MCP server, and Claude Code plugin files in the Wenlan repo are Apache-2.0.",
  },
];

type FAQCopy = HomeContent["faqs"];

export function FAQSection({ copy }: { copy: FAQCopy }) {
  return (
    <section className="border-t border-[var(--o-border-subtle)] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[var(--o-border-subtle)] rounded-lg border border-[var(--o-border)]">
          {copy.items.map((f) => (
            <details key={f.id} className="group">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-serif text-sm font-medium text-[var(--o-text)] transition-colors duration-150 hover:text-[var(--o-text-secondary)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="ml-4 text-[var(--o-text-muted)] transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-[13px] leading-relaxed text-[var(--o-text-muted)]">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
