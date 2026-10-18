import { readmeVisualForLocale } from "@/lib/readme-visuals";
import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "./evidence-image";

const copy = {
  "zh-TW": {
    expand: "放大圖譜",
    page: "知識頁", sources: ["記憶", "檔案 · PDF / Markdown", "網址 · URL"], legendLabel: "圖例",
    caption: "實機圖譜 · 區域為示意標註",
    alt: "與 README 共用的文瀾知識圖譜：個人脈絡、Wenlan 開發、MCP 與 AI 整合、AI 記憶系統，以及城市發展史、基因與演化、人機協作研究的區域示意；記憶、主題與知識頁直接標在圖中。",
  },
  "zh-CN": {
    expand: "放大图谱",
    page: "知识页", sources: ["记忆", "文件 · PDF / Markdown", "网址 · URL"], legendLabel: "图例",
    caption: "实机图谱 · 区域为示意标注",
    alt: "与 README 共用的文澜知识图谱：个人背景、Wenlan 开发、MCP 与 AI 整合、AI 记忆系统，以及城市发展史、基因与演化、人机协作研究的区域示意；记忆、主题与知识页直接标在图中。",
  },
  en: {
    expand: "Enlarge graph",
    page: "Wiki page", sources: ["Memory", "Files · PDF / Markdown", "Web links · URL"], legendLabel: "Legend",
    caption: "Actual App graph · Illustrative region labels",
    alt: "The same annotated Wenlan graph used in the README: personal context, Wenlan development, MCP and AI integration, AI memory systems, and illustrative regions for urban history, genetics and evolution, and human–AI collaboration research. Memories, topics and wiki pages are labeled in the image.",
  },
} as const;

// Keep the localized README labels intact; the website supplies its own heading.
export function RealKnowledgeGraph({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const asset = readmeVisualForLocale(locale, "graph");
  return <div className="ks-real-graph">
    <div className="home-evidence-frame overflow-hidden pb-[10px] rounded-xl border border-[#e3e7ee] bg-[#fcfcfd] shadow-[0_8px_28px_-18px_#1a1a2e30]">
      <EvidenceImage
        {...asset} alt={c.alt} caption={c.caption} locale={locale}
        crop={{ x: 72, y: 482, width: 3456, height: 1950 }}
        expandLabel={c.expand} mobileZoomWidth={1200} showCaption={false} showExpandAction={false}
      />
    </div>
    <div className="ks-real-source-guide">
      <ul className="ks-real-source-path" aria-label={c.legendLabel}>
        <li><i data-type="page" aria-hidden="true"/>{c.page}</li>
        {c.sources.map((source,index)=><li key={source}><i data-type={index===0?"memory":"source"} aria-hidden="true"/>{source}</li>)}
      </ul>
    </div>
  </div>;
}
