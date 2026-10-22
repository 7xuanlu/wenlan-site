import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import { ReadingCodeBlock } from "@/components/reading/reading-code-block";
import { FileText, Folder, MessageSquare, Terminal } from "lucide-react";

type ArticleCodeBlockProps = {
  label: string;
  code: string;
  kind?: "markdown" | "text" | "prompt" | "shell" | "json";
};

// Match documentation renderers such as Fumadocs: highlight at build time,
// then let CSS switch themes. Grammars and WASM stay out of the browser bundle.
const highlighter = createHighlighterCore({
  themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
  langs: [import("shiki/langs/markdown.mjs"), import("shiki/langs/shellscript.mjs"), import("shiki/langs/json.mjs")],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});

function codeKind(code: string): NonNullable<ArticleCodeBlockProps["kind"]> {
  const text = code.trim();
  if (text.startsWith("{") || text.startsWith("[")) {
    try { JSON.parse(text); return "json"; } catch { /* Authored excerpts may not be complete JSON. */ }
  }
  if (/^(?:npx |npm |pnpm |curl |git |wenlan |~\/\.wenlan\/|cd |mkdir |#!)/m.test(text)) return "shell";
  if (/^(?:#{1,6} |@AGENTS\.md|---$)/m.test(text)) return "markdown";
  return "text";
}

export async function ArticleCodeBlock({ label, code, kind = codeKind(code) }: ArticleCodeBlockProps) {
  const renderer = await highlighter;
  const html = renderer.codeToHtml(code, {
    lang: kind === "shell" ? "shellscript" : kind === "markdown" ? "markdown" : kind === "json" ? "json" : "text",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    transformers: [{ pre(node) { node.properties.class = "min-w-full w-max [&>code]:flex [&>code]:flex-col"; } }],
  });

  const Icon = kind === "shell" ? Terminal : kind === "prompt" ? MessageSquare : kind === "text" && /[├└]/.test(code) ? Folder : FileText;
  return <ReadingCodeBlock title={label} icon={<Icon size={15} />} data-article-code-block={kind} viewportProps={{"aria-label": label}}><div dangerouslySetInnerHTML={{__html: html}} /></ReadingCodeBlock>;
}
