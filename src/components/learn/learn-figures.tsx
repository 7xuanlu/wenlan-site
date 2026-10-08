import type { ReactNode } from "react";
import type { ComparisonTable, LearnArticleSection, LearnFigureId } from "@/app/(en)/learn/articles";
import type { Locale } from "@/i18n/locales";

type RenderText = (text: string) => ReactNode;
const plain: RenderText = (text) => text;

const architectureCopy: Record<Locale, {
  caption: string;
  schema: { title: string; detail: string };
  follows: string;
  sources: { title: string; detail: string; note: string };
  wiki: { title: string; detail: string; note: string };
  answer: { title: string; detail: string };
  ingest: string;
  query: string;
  lint: string;
}> = {
  en: {
    caption: "The three layers and three jobs of an LLM wiki.",
    schema: { title: "Schema", detail: "CLAUDE.md or AGENTS.md: how the wiki is organized" },
    follows: "the agent follows it on every job",
    sources: { title: "Raw sources", detail: "articles, papers, notes, files", note: "read-only" },
    wiki: { title: "Wiki", detail: "one Markdown page per topic, with links", note: "index.md · log.md" },
    answer: { title: "Answer", detail: "with links to the pages and sources used" },
    ingest: "ingest",
    query: "query",
    lint: "lint: find contradictions, stale claims, orphan pages",
  },
  "zh-TW": {
    caption: "LLM Wiki 的三層結構與三個工作。",
    schema: { title: "Schema", detail: "CLAUDE.md 或 AGENTS.md：wiki 怎麼組織" },
    follows: "AI 每個工作都照這份規則做",
    sources: { title: "原始來源", detail: "文章、論文、筆記、檔案", note: "只讀不改" },
    wiki: { title: "Wiki", detail: "每個主題一頁 Markdown，互相連結", note: "index.md · log.md" },
    answer: { title: "回答", detail: "附上用到的頁面與來源連結" },
    ingest: "ingest",
    query: "query",
    lint: "lint：找出矛盾、過時說法、沒人連到的頁面",
  },
  "zh-CN": {
    caption: "LLM Wiki 的三层结构与三个任务。",
    schema: { title: "Schema", detail: "CLAUDE.md 或 AGENTS.md：wiki 怎么组织" },
    follows: "AI 每个任务都按这份规则做",
    sources: { title: "原始来源", detail: "文章、论文、笔记、文件", note: "只读不改" },
    wiki: { title: "Wiki", detail: "每个主题一页 Markdown，互相链接", note: "index.md · log.md" },
    answer: { title: "回答", detail: "附上用到的页面与来源链接" },
    ingest: "ingest",
    query: "query",
    lint: "lint：找出矛盾、过时说法、没有被链接的页面",
  },
};

const ragCopy: Record<Locale, {
  caption: string;
  rows: Array<{ name: string; steps: string[]; note: string; accent: boolean }>;
}> = {
  en: {
    caption: "RAG retrieves relevant source chunks per query; the same material may recur. A wiki keeps maintained pages that still need updates when sources change.",
    rows: [
      { name: "RAG", steps: ["Question", "Search source chunks", "Answer"], note: "The source collection stays available; chunks may recur.", accent: false },
      { name: "LLM wiki", steps: ["Source", "Ingest into maintained pages", "Question", "Start from pages"], note: "Update pages when sources change.", accent: true },
    ],
  },
  "zh-TW": {
    caption: "RAG 會按問題檢索來源片段，同一內容可能再次出現；Wiki 保留維護中的頁面，來源變更時仍要更新。",
    rows: [
      { name: "RAG", steps: ["提問", "檢索來源片段", "回答"], note: "來源仍可查詢；片段可能再次出現。", accent: false },
      { name: "LLM Wiki", steps: ["來源", "整理並維護頁面", "提問", "先看相關頁面"], note: "來源變更時要更新頁面。", accent: true },
    ],
  },
  "zh-CN": {
    caption: "RAG 会按问题检索来源片段，同一内容可能再次出现；Wiki 保留维护中的页面，来源变化时仍要更新。",
    rows: [
      { name: "RAG", steps: ["提问", "检索来源片段", "回答"], note: "来源仍可查询；片段可能再次出现。", accent: false },
      { name: "LLM Wiki", steps: ["来源", "整理并维护页面", "提问", "先看相关页面"], note: "来源变化时要更新页面。", accent: true },
    ],
  },
};

function Box({ title, detail, note, accent = false }: { title: string; detail: string; note?: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent
          ? "border-[var(--o-warm)]/50 bg-[var(--o-glow-warm-bg)]"
          : "border-[var(--o-border)] bg-[var(--o-bg)]"
      }`}
    >
      <p className={`text-sm font-semibold ${accent ? "text-[var(--o-warm)]" : "text-[var(--o-text)]"}`}>{title}</p>
      <p className="mt-1 text-sm leading-snug text-[var(--o-text-secondary)]">{detail}</p>
      {note && <p className="mt-2 font-mono text-[11px] text-[var(--o-text-muted)]">{note}</p>}
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-[var(--o-text-muted)] sm:flex-col sm:gap-0 sm:px-1 sm:py-0">
      <span className="font-mono text-[11px] text-[var(--o-warm)]">{label}</span>
      <span aria-hidden="true" className="text-lg leading-none">
        <span className="sm:hidden">↓</span>
        <span className="hidden sm:inline">→</span>
      </span>
    </div>
  );
}

function ArchitectureFigure({ locale }: { locale: Locale }) {
  const c = architectureCopy[locale];
  return (
    <>
      <div className="mx-auto sm:w-[46%]">
        <Box title={c.schema.title} detail={c.schema.detail} />
        <p className="py-2 text-center text-[11px] text-[var(--o-text-muted)]">
          <span aria-hidden="true">↓ </span>
          {c.follows}
        </p>
      </div>
      <div className="grid items-center sm:grid-cols-[1fr_auto_1.25fr_auto_1fr]">
        <Box title={c.sources.title} detail={c.sources.detail} note={c.sources.note} />
        <Connector label={c.ingest} />
        <Box title={c.wiki.title} detail={c.wiki.detail} note={c.wiki.note} accent />
        <Connector label={c.query} />
        <Box title={c.answer.title} detail={c.answer.detail} />
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-[var(--o-text-muted)] sm:mx-auto sm:w-[46%]">
        <span aria-hidden="true">↻ </span>
        {c.lint}
      </p>
    </>
  );
}

function RagFigure({ locale }: { locale: Locale }) {
  const c = ragCopy[locale];
  return (
    <div className="space-y-5">
      {c.rows.map((row) => (
        <div key={row.name}>
          <p className={`font-mono text-[11px] tracking-[0.18em] uppercase ${row.accent ? "text-[var(--o-warm)]" : "text-[var(--o-text-muted)]"}`}>
            {row.name}
          </p>
          <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
            {row.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-[var(--o-text-muted)]">→</span>}
                <span
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    row.accent
                      ? "border-[var(--o-warm)]/50 bg-[var(--o-glow-warm-bg)] text-[var(--o-text)]"
                      : "border-[var(--o-border)] bg-[var(--o-bg)] text-[var(--o-text-secondary)]"
                  }`}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-sm text-[var(--o-text-muted)]">{row.note}</p>
        </div>
      ))}
    </div>
  );
}

export function LearnFigure({ id, locale }: { id: LearnFigureId; locale: Locale }) {
  const caption = id === "llm-wiki-architecture" ? architectureCopy[locale].caption : ragCopy[locale].caption;
  return (
    <figure className="mt-6 rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)] p-4 sm:p-6">
      {id === "llm-wiki-architecture" ? <ArchitectureFigure locale={locale} /> : <RagFigure locale={locale} />}
      <figcaption className="mt-5 border-t border-[var(--o-border-subtle)] pt-3 text-xs leading-relaxed text-[var(--o-text-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function SectionTable({ table, renderText = plain }: { table: NonNullable<LearnArticleSection["table"]>; renderText?: RenderText }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--o-border)]">
      {/* Below sm, each row stacks into a card and every cell shows its column name. */}
      <table className="w-full border-collapse text-sm max-sm:block">
        <thead className="max-sm:hidden">
          <tr className="border-b border-[var(--o-border)] bg-[var(--o-card-bg)] text-left">
            {table.columns.map((column) => (
              <th key={column} className="px-4 py-3 align-top text-xs font-semibold text-[var(--o-text-muted)]">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-[var(--o-border-subtle)] align-top last:border-b-0 max-sm:block max-sm:py-2">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="px-4 py-3 text-left align-top font-medium text-[var(--o-text)] [overflow-wrap:anywhere] max-sm:block max-sm:pb-1">
                    {renderText(cell)}
                  </th>
                ) : (
                  <td
                    key={index}
                    data-label={table.columns[index]}
                    className="px-4 py-3 align-top text-[var(--o-text-secondary)] max-sm:block max-sm:py-1 max-sm:before:block max-sm:before:text-xs max-sm:before:text-[var(--o-text-muted)] max-sm:before:content-[attr(data-label)]"
                  >
                    {renderText(cell)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const comparisonCopy: Record<Locale, { heading: string; intro: (name: string) => string; dimension: string }> = {
  en: {
    heading: "Side-by-side",
    intro: (name) => `Practical dimensions. Where ${name} leads, we say so.`,
    dimension: "Dimension",
  },
  "zh-TW": {
    heading: "並排比較",
    intro: (name) => `用實際使用的面向比較。${name} 比較好的地方，我們直接寫出來。`,
    dimension: "面向",
  },
  "zh-CN": {
    heading: "并排比较",
    intro: (name) => `用实际使用的维度比较。${name} 更好的地方，我们直接写出来。`,
    dimension: "维度",
  },
};

export function ComparisonTableSection({
  table,
  locale,
  renderText = plain,
}: {
  table: ComparisonTable;
  locale: Locale;
  renderText?: RenderText;
}) {
  const c = comparisonCopy[locale];
  return (
    <section>
      <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--o-text)] [word-break:keep-all] [overflow-wrap:break-word]">
        {c.heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--o-text-muted)]">{c.intro(table.competitorName)}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--o-border)]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--o-border)] bg-[var(--o-card-bg)] text-left font-mono text-[11px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">
              <th className="px-5 py-4 align-top">{c.dimension}</th>
              <th className="px-5 py-4 align-top text-[var(--o-warm)]">Wenlan</th>
              <th className="px-5 py-4 align-top">{table.competitorName}</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.dimension} className="border-b border-[var(--o-border-subtle)] last:border-b-0 align-top">
                <th scope="row" className="px-5 py-4 text-left align-top font-medium text-[var(--o-text)]">
                  {renderText(row.dimension)}
                </th>
                <td className="px-5 py-4 align-top text-[var(--o-text-secondary)]">{renderText(row.wenlan)}</td>
                <td className="px-5 py-4 align-top text-[var(--o-text-muted)]">{renderText(row.competitor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
