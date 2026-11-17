import { readmeVisualForLocale } from "@/lib/readme-visuals";
import Image from "next/image";
import { EvidenceImage } from "./evidence-image";
import { RealKnowledgeGraph } from "./real-knowledge-graph";
import { RetrievalStory, KnowledgeGraphStory } from "./knowledge-story-demos";
import type { Locale } from "@/i18n/locales";
import { TrackedLocalizedLink } from "@/components/tracked-link";
import { storyCopyByLocale } from "./home-story-copy";
import { WikiCapture } from "./wiki-capture";
import { wikiMaterialViews } from "./wiki-material-data";
import { wikiInteractionData } from "./wiki-interaction-data";
import { wikiPreviewLinks } from "./wiki-capture-data";
import { homeSectionHeadClass, homeSectionTitleClass } from "@/components/home/section-title";

export type ProductMediaSlot = "wiki" | "ai" | "updates" | "graph";

type ProductMediaAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption?: string;
  readonly crop: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
};

type ProductMediaManifest = Record<Locale, Record<ProductMediaSlot, ProductMediaAsset | null>>;

// Native captures from PR #855; wiki views include the local source-label fix.
// Lumo is a fictional demonstration. Refresh the URL when replacing image bytes.
const wikiCaptureVersion = "source-label-20261012";
// CSS crops focus the view; the link always opens the untouched full capture.
function capture(locale: Locale, slot: ProductMediaSlot): ProductMediaAsset {
  const dimensions = slot === "updates" ? [2880, 1920] : slot === "ai" ? [1800, 1400] : [2400, 1560];
  const crop = slot === "wiki" ? { x: 495, y: 0, width: 1905, height: 1560 }
    : slot === "updates" ? { x: 752, y: 110, width: 1380, height: locale === "en" ? 1515 : 1435 }
    : slot === "ai" ? { x: 95, y: locale === "en" ? 265 : 435, width: 1635, height: locale === "en" ? 765 : 590 }
    : { x: 0, y: 0, width: 2400, height: 1560 };
  const captions = {
    en: { app: "Wenlan development build · Fictional Lumo project", ai: "Claude reading Wenlan · Fictional Lumo project" },
    "zh-TW": { app: "Wenlan 開發版實機 · 虛構 Lumo 專案", ai: "Claude 實際查閱 Wenlan · 虛構 Lumo 專案" },
    "zh-CN": { app: "Wenlan 开发版实机 · 虚构 Lumo 项目", ai: "Claude 实际查阅 Wenlan · 虚构 Lumo 项目" },
  };
  const alt = mediaText(locale, slot).subject;
  return { src: `/images/home/v019/${locale}-${slot}${slot === "wiki" ? `-${wikiCaptureVersion}` : ""}.jpg`, width: dimensions[0], height: dimensions[1], crop, alt, caption: captions[locale][slot === "ai" ? "ai" : "app"] };
}

export const productMediaManifest: ProductMediaManifest = {
  en: { wiki: capture("en", "wiki"), ai: capture("en", "ai"), updates: capture("en", "updates"), graph: capture("en", "graph") },
  "zh-TW": { wiki: capture("zh-TW", "wiki"), ai: capture("zh-TW", "ai"), updates: capture("zh-TW", "updates"), graph: capture("zh-TW", "graph") },
  "zh-CN": { wiki: capture("zh-CN", "wiki"), ai: capture("zh-CN", "ai"), updates: capture("zh-CN", "updates"), graph: capture("zh-CN", "graph") },
};

function mediaText(locale: Locale, slot: ProductMediaSlot) {
  const copy = storyCopyByLocale[locale];
  switch (slot) {
    case "wiki":
      return { title: copy.wikiMedia.title, subject: copy.wikiMedia.description };
    case "ai":
      return { title: copy.aiTitle, subject: copy.aiMediaSubject };
    case "updates":
      return { title: copy.updates.title, subject: copy.updates.mediaSubject };
    case "graph":
      return { title: copy.graph.title, subject: copy.graph.mediaSubject };
  }
}

export function ProductMedia({ locale, slot }: { readonly locale: Locale; readonly slot: ProductMediaSlot }) {
  if (slot === "ai") return <RetrievalStory locale={locale} />;
  if (slot === "graph") return <KnowledgeGraphStory locale={locale} />;
  const asset = productMediaManifest[locale][slot];
  const copy = storyCopyByLocale[locale];
  const text = mediaText(locale, slot);

  if (asset) {
    const imageScale = asset.width / asset.crop.width;
    const imageSizes = `(min-width: 1200px) ${Math.ceil(688 * imageScale)}px, (min-width: 1024px) ${60 * imageScale}vw, calc(${100 * imageScale}vw - ${48 * imageScale}px)`;
    const openLabel = locale === "en" ? "Open full screenshot" : locale === "zh-TW" ? "開啟完整截圖" : "打开完整截图";
    return (
      <figure className="min-w-0" data-product-media={slot} data-media-status="capture">
        {slot === "wiki" ? <WikiCapture
          locale={locale}
          baseSrc={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          crop={asset.crop}
          previews={wikiPreviewLinks[locale].map((link) => ({ ...link, src: `/images/home/v019/${locale}-wiki-preview-${link.id}-${wikiCaptureVersion}.jpg` }))}
          materialViews={wikiMaterialViews[locale]}
          interaction={wikiInteractionData[locale]}
          sourceView={{ src: `/images/home/v019/${locale}-wiki-source-${wikiCaptureVersion}.jpg`, label: locale === "en" ? "Original Markdown file" : locale === "zh-TW" ? "查看原始 Markdown 檔案" : "查看原始 Markdown 文件" }}
        /> : (
        <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`${openLabel}: ${text.title}`} className="relative block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]" style={{ aspectRatio: `${asset.crop.width} / ${asset.crop.height}` }}>
        <Image
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          sizes={imageSizes}
          className="absolute h-auto max-w-none"
          style={{ width: `${asset.width / asset.crop.width * 100}%`, left: `${-asset.crop.x / asset.crop.width * 100}%`, top: `${-asset.crop.y / asset.crop.height * 100}%` }}
        />
        </a>
        )}
        {slot !== "wiki" && <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs leading-5 text-[var(--o-text-secondary)]">
          <span>{asset.caption}</span>
          <a href={asset.src} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4">{openLabel}</a>
        </figcaption>}
      </figure>
    );
  }

  return (
    <figure className="min-w-0" data-product-media={slot} data-media-status="placeholder">
      <div
        role="img"
        aria-label={`${copy.media.placeholder}: ${copy.media.labels[slot]}`}
        className={`flex w-full min-w-0 ${slot === "wiki" ? "aspect-[16/10] sm:aspect-video lg:aspect-[2/1]" : "aspect-[4/3] sm:aspect-[16/10]"} flex-col items-center justify-center gap-2 rounded-lg bg-[var(--o-bg-alt)] p-6 text-center`}
      >
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="mb-3 size-8 text-[var(--o-text-secondary)]">
          <rect x="4" y="5" width="24" height="22" rx="3" />
          <circle cx="11" cy="12" r="2" />
          <path d="m5 23 7-7 5 5 4-4 6 6" />
        </svg>
        <p className="text-sm font-medium text-[var(--o-text-secondary)]">{copy.media.labels[slot]}</p>
        <p className="text-xs leading-5 text-[var(--o-text-secondary)]">{copy.media.placeholder}</p>
      </div>
      <figcaption className="sr-only">{text.title}</figcaption>
    </figure>
  );
}

export function StoryIntro({ locale, slot, id, title, body, wide = false, showLabel = true }: {
  readonly locale: Locale;
  readonly slot: ProductMediaSlot | "cite-check";
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly wide?: boolean;
  readonly showLabel?: boolean;
}) {
  return (
    <div data-story-intro={slot}>
      {showLabel && slot !== "cite-check" && <p className="mb-4 text-sm font-medium text-[var(--o-warm)]">
        {storyCopyByLocale[locale].steps[slot]}
      </p>}
      <div className={wide ? homeSectionHeadClass : "space-y-5"}>
        <h2 id={id} className={`max-w-xl ${homeSectionTitleClass}`}>{locale === "en" ? title : title.split(/(?<=[，。])/).filter(Boolean).map((phrase) => <span key={phrase} className="inline-block max-w-full">{phrase}</span>)}</h2>
        <p className="max-w-[38ch] text-base leading-7 text-pretty text-[var(--o-text-secondary)]">{body}</p>
      </div>
    </div>
  );
}

export function HomeComparisonLink({ locale }: { readonly locale: Locale }) {
  return (
    <TrackedLocalizedLink
      href="/learn/choose-ai-knowledge-base-tool#compare-tools"
      locale={locale}
      eventName="learn_article_click"
      placement="home-comparison"
      context="comparisons"
      className="inline-flex min-h-11 items-start gap-3 py-2 text-sm font-medium leading-6 text-[var(--o-text-secondary)] hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
    >
      {storyCopyByLocale[locale].comparisonLabel}
    </TrackedLocalizedLink>
  );
}

export function KnowledgeUpdates({ locale }: { readonly locale: Locale }) {
  const copy = storyCopyByLocale[locale];
  const media = {
    en: {
      caption: "Illustrative flow, not an App screenshot",
      open: "Enlarge the image",
      alt: "Illustrative flow: AI chats, documents and folders (including Obsidian), code, and web content go into Steep. It writes a new page from several memories, merges duplicate pages, and updates a page with a citation it checks against the source; a page set to Ask me first waits for approval. It also finds a new link and resolves a contradiction by keeping the newer statement, with the older one restorable from history. Next time you ask, your AI tool cites the updated page.",
    },
    "zh-TW": {
      caption: "示意流程，不是 App 截圖",
      open: "放大查看",
      alt: "示意流程：AI 對話、文件與資料夾（含 Obsidian）、程式碼和網頁內容進入沉澱。它把幾則記憶寫成新頁、整併重複的頁，並更新舊頁，引用會對照來源查核；設成「先問我」的頁會等你點頭。它也會找出新關聯，處理矛盾時改用較新的說法，舊的留在紀錄可還原。下次再問，AI 工具會引用更新後的頁面。",
    },
    "zh-CN": {
      caption: "示意流程，不是 App 截图",
      open: "放大查看",
      alt: "示意流程：AI 对话、文件与文件夹（含 Obsidian）、代码和网页内容进入沉淀。它把几条记忆写成新页、合并重复的页，并更新旧页，引用会对照来源核查；设成“先问我”的页会等你点头。它也会找出新关联，处理矛盾时改用较新的说法，旧的留在记录可还原。下次再问，AI 工具会引用更新后的页面。",
    },
  }[locale];
  const asset = readmeVisualForLocale(locale, "updates");

  return (
    <section id="knowledge-updates" aria-labelledby="knowledge-updates-heading" className="scroll-mt-24 px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl min-w-0">
        <StoryIntro locale={locale} slot="updates" id="knowledge-updates-heading" title={copy.updates.title} body={copy.updates.body} wide showLabel={false} />
        <div className="home-evidence-frame mt-8 rounded-xl border border-[#e3e7ee] bg-[#fcfcfb] px-3 pt-3 pb-3 shadow-[0_8px_28px_-18px_#1a1a2e30] sm:px-6 sm:pt-5 sm:pb-5" data-native-knowledge-update>
          <EvidenceImage {...asset} alt={media.alt} caption={media.caption} locale={locale}
            lossless mobileZoomWidth={1200} detailZoomWidth={1600}
            expandLabel={media.open} showCaption={false} showExpandAction={false} />
        </div>
      </div>
    </section>
  );
}

// The first story after the hero: a real refused write, shown full width so the
// terminal text stays legible on desktop; phones read it through View full size.
export function CiteCheck({ locale }: { readonly locale: Locale }) {
  const copy = storyCopyByLocale[locale].citeCheck;

  return (
    <section id="cite-check" aria-labelledby="cite-check-heading" className="scroll-mt-24 px-6 pt-8 pb-12 sm:pt-12 sm:pb-20">
      <div className="mx-auto max-w-6xl min-w-0">
        <StoryIntro locale={locale} slot="cite-check" id="cite-check-heading" title={copy.title} body={copy.body} wide showLabel={false} />
        <div className="mt-8" data-cite-check-capture>
          <EvidenceImage src="/images/home/capabilities/cite-check.webp" width={1454} height={460} locale={locale}
            alt={copy.alt} caption={copy.caption} mobileZoomWidth={960} detailZoomWidth={1454} />
        </div>
      </div>
    </section>
  );
}

export function KnowledgeConnections({ locale }: { readonly locale: Locale }) {
  const copy = storyCopyByLocale[locale];

  return (
    <section id="knowledge-connections" aria-labelledby="knowledge-connections-heading" className="scroll-mt-24 px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl min-w-0">
        <StoryIntro locale={locale} slot="graph" id="knowledge-connections-heading" title={copy.graph.title} body={copy.graph.body} wide showLabel={false} />
        <div className="mt-8"><RealKnowledgeGraph locale={locale} /></div>
      </div>
    </section>
  );
}
