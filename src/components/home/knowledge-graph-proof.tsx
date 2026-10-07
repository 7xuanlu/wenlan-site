import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "@/components/home/evidence-image";

const copyByLocale = {
  en: {
    title: "Follow a topic back to your work.",
    question: "Why did we design Wenlan this way?",
    description: ["Find the comparison notes, design decisions and AI discussions behind it."],
    legend: "What the graph connects",
    entities: "Entities / topics",
    entityTypes: ["Projects", "Technology", "Organizations", "People", "Topics"],
    pages: "Wiki pages",
    pagesDetail: "Organized knowledge",
    memories: "Memories",
    memoriesDetail: "Saved context",
    sources: "Page sources",
    sourceTypes: ["Files (PDF, Markdown…)", "Notes", "AI conversations"],
    connections: "Lines show connections",
    caption: "Real graph screenshot · Annotations illustrate possible uses, not the original node names.",
    expand: "Enlarge original",
    key: "Example topics in the graph",
    annotations: [
      { title: "Building Wenlan", detail: "Wiki pages, citations and MCP" },
      { title: "AI memory research", detail: "Comparing Mem0, Zep and Letta" },
      { title: "Claude / Codex workflows", detail: "Save with /handoff. Find with /recall." },
    ],
    contextTopics: ["Japan trip", "English practice", "AI tools", "Reading notes", "Writing ideas", "Yearly planning", "Photography"],
    alt: "Wenlan knowledge graph from real user data: colored nodes for projects, technologies, organizations, people, themes, wiki pages and memories, joined by connection lines into clusters around labels such as user, wenlan and Wenlan MCP",
  },
  "zh-TW": {
    title: "從一個主題，找回做過的功課。",
    question: "當初為什麼這樣設計 Wenlan？",
    description: ["找回相關的比較筆記、", "設計決策與 AI 討論。"],
    legend: "圖譜中的分類",
    entities: "實體／主題",
    entityTypes: ["專案", "技術", "組織", "人物", "主題"],
    pages: "知識頁",
    pagesDetail: "整理後的知識",
    memories: "記憶",
    memoriesDetail: "保存的對話與紀錄",
    sources: "知識頁的來源",
    sourceTypes: ["檔案（PDF、Markdown 等）", "筆記", "AI 對話"],
    connections: "連線表示關聯",
    caption: "真實圖譜截圖 · 標註為用途示意，非原節點名稱。",
    expand: "放大原圖",
    key: "圖中的示例主題",
    annotations: [
      { title: "Wenlan 產品開發", detail: "知識頁、來源引用、MCP 串接" },
      { title: "AI 記憶研究", detail: "Mem0、Zep、Letta 比較筆記" },
      { title: "Claude / Codex 工作流程", detail: "/handoff 留下決策，/recall 找回脈絡" },
    ],
    contextTopics: ["日本旅行", "英文學習", "AI 工具比較", "閱讀筆記", "寫作靈感", "年度計畫", "攝影練習"],
    alt: "以使用者真實資料繪製的文瀾知識圖譜（介面標籤為英文）：專案、技術、組織、人物、主題、知識頁與記憶以不同顏色的節點呈現，連線聚集在 user、wenlan、Wenlan MCP 等標籤周圍",
  },
  "zh-CN": {
    title: "从一个主题，找回做过的功课。",
    question: "当初为什么这样设计 Wenlan？",
    description: ["找回相关的比较笔记、", "设计决策与 AI 讨论。"],
    legend: "图谱中的分类",
    entities: "实体／主题",
    entityTypes: ["项目", "技术", "组织", "人物", "主题"],
    pages: "知识页",
    pagesDetail: "整理后的知识",
    memories: "记忆",
    memoriesDetail: "保存的对话与记录",
    sources: "知识页的来源",
    sourceTypes: ["文件（PDF、Markdown 等）", "笔记", "AI 对话"],
    connections: "连线表示关联",
    caption: "真实图谱截图 · 标注为用途示意，非原节点名称。",
    expand: "放大原图",
    key: "图中的示例主题",
    annotations: [
      { title: "Wenlan 产品开发", detail: "知识页、来源引用、MCP 连接" },
      { title: "AI 记忆研究", detail: "Mem0、Zep、Letta 比较笔记" },
      { title: "Claude / Codex 工作流", detail: "/handoff 留下决策，/recall 找回上下文" },
    ],
    contextTopics: ["日本旅行", "英语学习", "AI 工具比较", "阅读笔记", "写作灵感", "年度计划", "摄影练习"],
    alt: "以用户真实数据绘制的文澜知识图谱（界面标签为英文）：项目、技术、组织、人物、主题、知识页和记忆以不同颜色的节点呈现，连线聚集在 user、wenlan、Wenlan MCP 等标签周围",
  },
} as const;

// Match the light-theme capture, even when the surrounding website is dark.
const entityColors = ["#C0851F", "#2D78BD", "#C95A37", "#8160B5", "#4A925C"] as const;

// These callouts explain possible personal uses; they do not rename captured nodes.
const annotationPositions = [
  { left: "77%", top: "23%", line: "770,230 770,460 659,614", node: [659, 614] },
  { left: "31%", top: "23%", line: "310,230 310,140 192,68", node: [192, 68] },
  { left: "31%", top: "64%", line: "310,640 310,735 223,820", node: [223, 820] },
] as const;

// Small illustrative topic labels sit by peripheral nodes, below the main callouts.
const contextTopicPositions = [
  { left: "7%", top: "12%", compact: false },
  { left: "39.5%", top: "86%", compact: true },
  { left: "54.3%", top: "35.5%", compact: false },
  { right: "2%", top: "60.4%", compact: true },
  { left: "16.5%", top: "91.5%", compact: true },
  { left: "74.5%", top: "12.5%", compact: false },
  { left: "80.5%", top: "86.7%", compact: false },
] as const;

export function KnowledgeGraphProof({ locale }: { readonly locale: Locale }) {
  const copy = copyByLocale[locale];
  const titleParts = copy.title.split("，");

  return (
    <section id="knowledge-connections" aria-labelledby="knowledge-connections-heading" className="scroll-mt-8 px-6 py-16 sm:scroll-mt-4 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="knowledge-connections-heading" className="max-w-3xl font-serif text-3xl font-medium tracking-tight text-balance text-[var(--o-text)] sm:text-5xl sm:leading-tight">
          {titleParts.length === 2 ? (
            <><span className="inline-block">{titleParts[0]}，</span><wbr /><span className="inline-block">{titleParts[1]}</span></>
          ) : copy.title}
        </h2>
        <div className="mt-4 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
          <p className="font-medium text-pretty text-[var(--o-text)]">{copy.question}</p>
          <p className="mt-1 text-pretty text-[var(--o-text-secondary)]">
            {copy.description.map((part) => <span key={part} className={locale === "en" ? undefined : "inline-block"}>{part}</span>)}
          </p>
        </div>
        <div className="mt-6 sm:mt-7">
          <div className="mb-5 grid gap-5 py-5 text-sm leading-6 lg:grid-cols-[minmax(0,2fr)_minmax(15rem,1fr)] lg:gap-12 lg:py-6">
            <div>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium text-[var(--o-text)]">{copy.legend}</h3>
                <p className="flex items-center gap-2 text-xs text-[var(--o-text-secondary)]">
                  <span aria-hidden="true" className="h-px w-5 bg-[var(--o-text-secondary)] opacity-60" />
                  {copy.connections}
                </p>
              </div>
              <dl className="space-y-3">
                <div className="grid gap-x-5 gap-y-2 sm:grid-cols-[8rem_1fr]">
                  <dt className="font-medium text-[var(--o-text)]">{copy.entities}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--o-text-secondary)]">
                      {copy.entityTypes.map((label, index) => (
                        <li key={label} className="inline-flex items-center gap-2 whitespace-nowrap">
                          <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: entityColors[index] }} />
                          {label}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {[
                  { label: copy.pages, detail: copy.pagesDetail, color: "#5E9C98" },
                  { label: copy.memories, detail: copy.memoriesDetail, color: "#B9A987" },
                ].map(({ label, detail, color }) => (
                  <div key={label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-5 sm:grid-cols-[8rem_1fr]">
                    <dt className="inline-flex items-center gap-2 font-medium text-[var(--o-text)]">
                      <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      {label}
                    </dt>
                    <dd className="text-[var(--o-text-secondary)]">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="pt-4 lg:pt-0">
              <h3 className="font-medium text-[var(--o-text)]">{copy.sources}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[var(--o-text-secondary)] lg:mt-4 lg:flex-col lg:gap-y-3">
                {copy.sourceTypes.map((source) => <li key={source}>{source}</li>)}
              </ul>
            </div>
          </div>
          {/* Full capture on purpose: some clusters run past the source frame. */}
          <EvidenceImage
            src="/images/product-evidence/wenlan-live-knowledge-graph-20260906.webp"
            width={3456}
            height={1950}
            alt={copy.alt}
            caption={copy.caption}
            locale={locale}
            expandLabel={copy.expand}
            annotations={
              <>
                {copy.contextTopics.map((topic, index) => {
                  const { compact, ...position } = contextTopicPositions[index];
                  return (
                    <span
                      key={topic}
                      className={`absolute -translate-y-1/2 whitespace-nowrap bg-white/85 px-0.5 py-0.5 font-sans text-[11px] leading-none font-normal text-[#59616d] md:text-xs xl:text-[13px] ${compact ? "" : "hidden lg:block"}`}
                      style={position}
                    >
                      {topic}
                    </span>
                  );
                })}
                <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-[#a45331]">
                  {annotationPositions.map(({ line, node }) => (
                    <g key={line}>
                      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" />
                      <ellipse cx={node[0]} cy={node[1]} rx="7" ry="12.4" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>
                  ))}
                </svg>
                {copy.annotations.map(({ title, detail }, index) => (
                  <div
                    key={title}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 text-[#252536] ${index < 2 ? "md:translate-y-0" : ""}`}
                    style={{ left: annotationPositions[index].left, top: annotationPositions[index].top }}
                  >
                    <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-[#a45331] font-mono text-xs font-medium text-white md:hidden">{index + 1}</span>
                    <div className="hidden w-[min(19rem,35vw)] rounded-sm bg-white/95 px-3 py-3 md:block">
                      <div className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#a45331] font-mono text-xs font-medium text-white">{index + 1}</span>
                        <div className="min-w-0">
                          <p className="text-base leading-6 font-semibold tracking-tight">{title}</p>
                          <p className="mt-1 text-sm leading-5 text-pretty text-[#5b5b6c]">{detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            }
            annotationKey={
              <ol key="graph-annotation-key" aria-label={copy.key} className="mt-5 space-y-4 md:hidden">
                {copy.annotations.map(({ title, detail }, index) => (
                  <li key={title} className="grid grid-cols-[1.75rem_1fr] items-start gap-3">
                    <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-[#a45331] font-mono text-xs font-medium text-white">{index + 1}</span>
                    <div className="min-w-0">
                      <p className="text-sm leading-7 font-semibold text-[var(--o-text)]">{title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-[var(--o-text-secondary)]">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            }
          />
        </div>
      </div>
    </section>
  );
}
