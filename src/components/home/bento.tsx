"use client";

import { useEffect, useRef, useState } from "react";
import { CapabilityArtifact } from "./capability-artifacts";
import type { HomeContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { HomeReadableText } from "./readable-text";
import { homeSectionHeadClass, homeSectionTitleClass } from "@/components/home/section-title";

type BentoCellCopy = HomeContent["redesign"]["bento"]["cells"][number];

const bentoVisualCopy: Record<Locale, { intro: string; illustrationLabel: string }> = {
  en: {
    intro: "Keep your sources, enrich their context, and use the knowledge in your everyday tools.",
    illustrationLabel: "App captures & capability illustrations · demo content",
  },
  "zh-TW": {
    intro: "從帶入素材、補上脈絡，到用回日常工具，讓累積的知識派上用場。",
    illustrationLabel: "App 畫面與能力示意 · 使用示範內容",
  },
  "zh-CN": {
    intro: "从导入素材、补上背景，到用回日常工具，让积累的知识派上用场。",
    illustrationLabel: "App 画面与能力示意 · 使用示范内容",
  },
};

// Supplement the main story with everyday capabilities. Reveal only once;
// hover and inline controls do not replay the main demonstrations.
type Stage = "final" | "pre" | "played";

function BentoCell({
  accent,
  id,
  body,
  children,
  className = "",
  landDelay,
  pre,
  title,
}: {
  accent: string;
  id: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  landDelay: string;
  pre: boolean;
  title: string;
}) {
  return (
    <div
      className={`wc-cell transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
      style={{ transitionDelay: landDelay }}
    >
      <div
        className={`home-panel rounded-lg group relative flex h-full flex-col overflow-hidden border border-[var(--o-border)] bg-[var(--o-bg-alt)] transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none wc-card`}
        style={{ "--cell-accent": accent } as React.CSSProperties}
      >
        <div className="wc-cardCopy">
          <h3 className="relative font-serif text-xl font-medium tracking-tight">{title.split(/(?<=\.)\s+(?=\S)/).map((sentence, index) => (
            // A two-sentence title breaks between its sentences, never inside one.
            <span key={sentence}>{index > 0 ? " " : null}<span className="inline-block max-w-full">{sentence}</span></span>
          ))}</h3>
          <p className="relative mt-2 text-base leading-relaxed text-pretty text-[var(--o-text-secondary)]"><HomeReadableText>{body}</HomeReadableText></p>
        </div>
        <div className="wc-canvas" data-capability={id}>{children}</div>
      </div>
    </div>
  );
}

/* Per-cell layout, accent, land order, and artifact. Copy comes from the
   dictionary and joins by id. Wide desktops use three tracks: three singles,
   then the full-width sources card (copy beside its wall), then two rows of
   three singles, so the ten cells leave no holes. Narrower screens pair every
   cell (two tracks, five rows) or stack them (one). */
type CellLayout = "single" | "split";
const cellChrome: Record<string, { accent: string; delayMs: number; layout?: CellLayout }> = {
  steep: { accent: "var(--o-sage)", delayMs: 0 },
  lock: { accent: "var(--o-sage)", delayMs: 40 },
  "repo-wiki": { accent: "var(--o-sage)", delayMs: 80 },
  sources: { accent: "var(--o-warm)", delayMs: 120, layout: "split" },
  obsidian: { accent: "var(--o-warm)", delayMs: 160 },
  tools: { accent: "var(--o-warm)", delayMs: 180 },
  "web-access": { accent: "var(--o-warm)", delayMs: 200 },
  spaces: { accent: "var(--o-warm)", delayMs: 220 },
  topics: { accent: "var(--o-warm)", delayMs: 240 },
  history: { accent: "var(--o-warm)", delayMs: 260 },
};
const layoutClass: Record<CellLayout, string> = {
  single: "",
  split: "wc-cellWide wc-cellSplit xl:col-span-3",
};

export function BentoSection({
  cells,
  locale = "en",
  title,
}: {
  readonly cells: readonly BentoCellCopy[];
  readonly locale?: Locale;
  readonly title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage>("final");
  const pre = stage === "pre";
  const played = stage === "played";
  const visual = bentoVisualCopy[locale];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    if (typeof IntersectionObserver === "undefined") return;
    setStage("pre");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage("played");
          observer.disconnect();
        }
      },
      // A five-row grid can be taller than the viewport; reveal at entry.
      { threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const delay = (ms: number) => (played ? `${ms}ms` : "0ms");

  return (
    <section ref={sectionRef} data-home-reveal="section" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className={homeSectionHeadClass}>
          <h2 className={`max-w-xl ${homeSectionTitleClass}`}>
            <HomeReadableText>{title}</HomeReadableText>
          </h2>
          <p data-capabilities-intro className="max-w-[38ch] text-base leading-7 text-pretty text-[var(--o-text-secondary)]">
            {visual.intro}
          </p>
        </div>
        <div className="wc-capabilityGrid mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {cells.map((cell) => {
            const chrome = cellChrome[cell.id];
            if (!chrome) return null;
            return (
              <BentoCell
                key={cell.id}
                id={cell.id}
                accent={chrome.accent}
                className={layoutClass[chrome.layout ?? "single"]}
                landDelay={delay(chrome.delayMs)}
                pre={pre}
                title={cell.title}
                body={cell.body}
              >
                <CapabilityArtifact id={cell.id} locale={locale} />
              </BentoCell>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[var(--o-text-muted)]">{visual.illustrationLabel}</p>
      </div>
    </section>
  );
}
