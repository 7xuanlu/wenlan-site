import Image from "next/image";
import type { Locale } from "@/i18n/locales";

const copyByLocale = {
  en: {
    update: "This update", retained: "Original decision kept", decision: "Keep the text’s left edge fixed when the sidebar opens.",
    added: "Added to the page", result: "Toggle the sidebar across all four reading views and check that sentence starts stay in place.",
    sources: "Supported by", web: "W3C reflow", file: "Reading-layout review.md", before: "View before the update",
    current: "App capture · After the update", previous: "App capture · Before the update", open: "Open full capture",
    note: "Recorded App views from the demo library. Excerpts explain the change.",
    alt: "Agent Loop in Wenlan: W3C reflow and a reading-layout review file now support the existing sidebar design decision.",
    beforeAlt: "Earlier Agent Loop page describing the sidebar problem and the original design decision.",
  },
  "zh-TW": {
    update: "這次更新", retained: "原有決定保留", decision: "側欄開啟時，固定正文的左側起點。",
    added: "補進同一頁", result: "開關側欄、比較四種頁面，確認句首不會跳動。",
    sources: "新增依據", web: "W3C 文字重排", file: "閱讀排版驗收.md", before: "查看更新前",
    current: "App 實機 · 更新後", previous: "App 實機 · 更新前", open: "開啟完整截圖",
    note: "示範知識庫的實機畫面；旁側摘錄說明這次更新。",
    alt: "Wenlan 的 Agent Loop 頁面新增 W3C 文字重排與閱讀驗收檔案，並保留原有的側欄設計決定。",
    beforeAlt: "更新前的 Agent Loop 實機頁面，記錄側欄問題與原有設計決定。",
  },
  "zh-CN": {
    update: "这次更新", retained: "原有决定保留", decision: "侧栏开启时，固定正文的左侧起点。",
    added: "补进同一页", result: "开关侧栏、比较四种页面，确认句首不会跳动。",
    sources: "新增依据", web: "W3C 文字重排", file: "阅读排版验收.md", before: "查看更新前",
    current: "App 实机 · 更新后", previous: "App 实机 · 更新前", open: "打开完整截图",
    note: "演示知识库的实机画面；旁侧摘录说明这次更新。",
    alt: "Wenlan 的 Agent Loop 页面新增 W3C 文字重排与阅读验收文件，并保留原有的侧栏设计决定。",
    beforeAlt: "更新前的 Agent Loop 实机页面，记录侧栏问题与原有设计决定。",
  },
} as const;

// Untouched native App captures from the shared README demo library.
// CSS crops show the relevant paragraph; the full capture stays inspectable.
function NativeExcerpt({ version, locale }: { version: 5 | 8; locale: Locale }) {
  const copy = copyByLocale[locale];
  const src = `/images/home/personal-knowledge/agent-loop-v${version}.png`;
  const crop = { y: 420, width: 1360, height: 920 };
  return (
    <figure className="min-w-0">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open}: Agent Loop`} className="relative block overflow-hidden rounded-lg border border-[#E3E7EE] bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]" style={{ aspectRatio: `${crop.width}/${crop.height}` }}>
        <Image src={src} width={1360} height={2400} alt={version === 8 ? copy.alt : copy.beforeAlt} sizes="(min-width: 1200px) 660px, (min-width: 768px) 58vw, calc(100vw - 48px)" className="absolute h-auto w-full max-w-none" style={{ top: `${-crop.y / crop.height * 100}%` }} />
      </a>
      <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 text-xs leading-6 text-[var(--o-text-secondary)]">
        <span>{version === 8 ? copy.current : copy.previous}</span>
        <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">{copy.open}<span aria-hidden="true"> ↗</span></a>
      </figcaption>
    </figure>
  );
}

export function AgentLoopUpdate({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  return (
    <div data-agent-loop-update>
      <div className="grid items-center gap-7 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
        <div className="min-w-0 md:col-start-2 md:row-start-1">
          <h3 className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xl font-medium text-[var(--o-text)]">Agent Loop <span className="text-sm font-normal text-[var(--o-text-secondary)]">{copy.update}</span></h3>
          <dl className="space-y-5">
            <div>
              <dt className="text-xs font-medium text-[var(--o-text-secondary)]">{copy.retained}</dt>
              <dd className="mt-2 text-base leading-7 text-[var(--o-text)]">{copy.decision}</dd>
            </div>
            <div className="border-t border-[var(--o-border)] pt-5">
              <dt className="text-xs font-medium text-[var(--o-text-secondary)]">{copy.sources}</dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--o-warm)]">
                <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 underline decoration-current/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"><SourceIcon kind="url" />{copy.web}</a>
                <a href="/images/home/personal-knowledge/reading-review.md" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 underline decoration-current/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"><SourceIcon kind="file" />{copy.file}</a>
              </dd>
            </div>
            <div className="rounded-lg bg-[var(--o-bg-alt)] p-4">
              <dt className="text-xs font-medium text-[var(--o-warm)]">{copy.added}</dt>
              <dd className="mt-2 text-base leading-7 text-[var(--o-text)]">{copy.result}</dd>
            </div>
          </dl>
        </div>
        <div className="min-w-0 md:col-start-1 md:row-start-1"><NativeExcerpt version={8} locale={locale} /></div>
      </div>
      <details className="group mt-3 border-t border-[var(--o-border)] pt-2">
        <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-3 text-sm text-[var(--o-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">{copy.before}<span aria-hidden="true" className="text-lg group-open:rotate-45">+</span></summary>
        <div className="max-w-2xl pt-4"><NativeExcerpt version={5} locale={locale} /></div>
      </details>
      <p className="mt-2 text-xs leading-6 text-[var(--o-text-muted)]">{copy.note}</p>
    </div>
  );
}

function SourceIcon({ kind }: { kind: "url" | "file" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 shrink-0">{kind === "url" ? <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></> : <><path d="M14 3H6v18h12V7zM14 3v5h4M9 12h6M9 16h6" /></>}</svg>;
}
