"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { trackAnalyticsEvent } from "@/components/tracked-link";

const stageNames = ["save", "page", "recall"] as const;
const stageDimensions = [
  { width: 3456, height: 2168 },
  { width: 1440, height: 1100 },
  { width: 3456, height: 2168 },
] as const;

const copyByLocale = {
  en: {
    stages: ["Save the work", "Read the page", "Ask next time"],
    outcomes: [
      "At the end of a discussion, /handoff saves the decisions, reasons, and unfinished work.",
      "An agent separately turned those same records into this readable Page; the original records are linked below.",
      "In a new conversation, /recall finds the saved records. Claude answers with sources, keeping unapproved ideas separate.",
    ],
    scenario: "Fictional project · Email assistant",
    questionLabel: "You ask AI",
    answerLabel: "Summary of Claude’s response",
    question: "Can the first release send email automatically?",
    answer: "No. The first release creates drafts for the user to review and send. Automatic sending is still awaiting approval.",
    evidence: [
      "Claude Code · /handoff · Fictional demo, actual screenshot",
      "Wenlan · Agent-authored knowledge page and sources · Fictional demo",
      "Claude Code · /recall · Fictional demo, actual screenshot",
    ],
    alt: [
      "English handoff in Claude Code saves the email decision, its reason and the unapproved proposal",
      "English Wenlan knowledge page with the email decision, reasons and three linked source records",
      "English recall skill in a new Claude Code conversation retrieves Wenlan records and answers with their source IDs",
    ],
    expand: "View full size",
    close: "Close image",
    dialog: "Wenlan product demonstration",
    openOriginal: "Open original",
    fit: "Fit",
    detail: "Zoom in",
    hint: "Scroll or swipe to explore the enlarged image.",
  },
  "zh-TW": {
    stages: ["收工時留下", "在文瀾核對", "下次問 AI"],
    outcomes: [
      "討論結束時，用 /handoff 留下決定、理由和還沒完成的事。",
      "Agent 將同一批紀錄另行整理成易讀的知識頁；原始紀錄連結在下方。",
      "換一段對話，用 /recall 找回紀錄。Claude 依來源回答，也分清哪些提案還沒核准。",
    ],
    scenario: "虛構專案 · 郵件助理",
    questionLabel: "你問 AI",
    answerLabel: "這次 Claude 的回答摘要",
    question: "第一版能自動寄信嗎？",
    answer: "不能。第一版只產生草稿，由使用者確認後寄出；自動寄送仍待批准。",
    evidence: [
      "Claude Code · /handoff · 虛構案例，實機截圖",
      "文瀾 · Agent 整理的知識頁與來源 · 虛構案例",
      "Claude Code · /recall · 虛構案例，實機截圖",
    ],
    alt: [
      "繁體中文 Claude Code handoff，保存郵件決策、理由與未核准提案",
      "繁體中文文瀾知識頁，呈現郵件決策、理由及三筆原始紀錄",
      "新對話中以繁體中文呼叫 recall skill，Claude Code 查回文瀾紀錄並附來源回答",
    ],
    expand: "放大查看",
    close: "關閉圖片",
    dialog: "Wenlan 產品示範",
    openOriginal: "開啟原圖",
    fit: "全圖",
    detail: "放大細節",
    hint: "滑動圖片，查看放大後的細節。",
  },
  "zh-CN": {
    stages: ["收工时留下", "在文澜核对", "下次问 AI"],
    outcomes: [
      "讨论结束时，用 /handoff 留下决定、理由和还没完成的事。",
      "Agent 将同一批记录另行整理成易读的知识页；原始记录链接在下方。",
      "换一段对话，用 /recall 找回记录。Claude 依据来源回答，也分清哪些提案还没批准。",
    ],
    scenario: "虚构项目 · 邮件助手",
    questionLabel: "你问 AI",
    answerLabel: "Claude 的回答摘要",
    question: "第一版能自动发邮件吗？",
    answer: "不能。第一版只生成草稿，由用户确认后发送；自动发送仍待批准。",
    evidence: [
      "Claude Code · /handoff · 虚构案例，实机截图",
      "文澜 · Agent 整理的知识页与来源 · 虚构案例",
      "Claude Code · /recall · 虚构案例，实机截图",
    ],
    alt: [
      "简体中文 Claude Code handoff，保存邮件决定、理由和未批准提案",
      "简体中文文澜知识页，呈现邮件决定、理由及三条原始记录",
      "新对话中以简体中文调用 recall skill，Claude Code 查回文澜记录并附来源回答",
    ],
    expand: "放大查看",
    close: "关闭图片",
    dialog: "Wenlan 产品演示",
    openOriginal: "打开原图",
    fit: "全图",
    detail: "放大细节",
    hint: "滑动图片，查看放大后的细节。",
  },
} as const;

const imageFocus = [
  { x: 0.10, y: 0.50 },
  { x: 0.15, y: 0.32 },
  { x: 0.10, y: 0.60 },
] as const;

export function ProductShowcase({ locale }: { readonly locale: Locale }) {
  const labels = copyByLocale[locale];
  const stages = stageNames.map((stage, index) => ({
    src: `/images/product-evidence/wenlan-handoff-${stage}-${locale}.jpg`,
    ...stageDimensions[index],
  }));
  const [active, setActive] = useState(0);
  const [dialogImage, setDialogImage] = useState(0);
  const [enlarged, setEnlarged] = useState(true);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const imageViewport = useRef<HTMLDivElement>(null);

  const changeZoom = (zoom: boolean) => {
    setEnlarged(zoom);
    requestAnimationFrame(() => {
      const viewport = imageViewport.current;
      if (!viewport || !dialog.current?.open) return;
      const focus = imageFocus[dialogImage];
      const zoomHeight = 1600 * stages[dialogImage].height / stages[dialogImage].width;
      viewport.scrollTo({
        left: zoom ? 1600 * focus.x - viewport.clientWidth / 2 : 0,
        top: zoom ? zoomHeight * focus.y - viewport.clientHeight / 2 : 0,
      });
    });
  };

  const openImage = (imageIndex: number) => {
    setDialogImage(imageIndex);
    setEnlarged(true);
    dialog.current?.showModal();
    requestAnimationFrame(() => {
      const viewport = imageViewport.current;
      if (!viewport || !dialog.current?.open) return;
      const focus = imageFocus[imageIndex];
      const zoomHeight = 1600 * stages[imageIndex].height / stages[imageIndex].width;
      viewport.scrollTo({
        left: 1600 * focus.x - viewport.clientWidth / 2,
        top: zoomHeight * focus.y - viewport.clientHeight / 2,
      });
    });
    trackAnalyticsEvent({
      eventName: "product_image_open",
      placement: "home-product-views",
      locale,
      context: "home",
      detail: ["handoff", "wiki", "recall"][imageIndex],
    });
  };

  const select = (next: number) => {
    if (next !== active) {
      trackAnalyticsEvent({
        eventName: "product_view_select",
        placement: "home-product-views",
        locale,
        context: "home",
        detail: ["handoff", "wiki", "recall"][next],
      });
    }
    setActive(next);
  };

  return (
    <div id="product-views" className="min-w-0">
      <div>
        <p className="text-xs font-medium text-[var(--o-text-secondary)]">{labels.scenario}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_1.6fr] sm:gap-10">
          <div>
            <p className="text-xs font-medium text-[var(--o-text-secondary)]">{labels.questionLabel}</p>
            <p className="mt-2 text-base font-medium leading-7 text-[var(--o-text)]">{labels.question}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--o-text-secondary)]">{labels.answerLabel}</p>
            <p className="mt-2 text-base leading-7 text-[var(--o-text)]">{labels.answer}</p>
          </div>
        </div>
      </div>

      <div role="group" aria-label={labels.dialog} className="mt-6 grid max-w-lg grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
        {labels.stages.map((stage, index) => (
          <button
            key={stage}
            type="button"
            aria-pressed={active === index}
            aria-controls={`${id}-product-example`}
            onClick={() => select(index)}
            className={`min-h-11 rounded-md border px-1.5 py-2 text-xs font-medium leading-5 transition-colors motion-reduce:transition-none sm:px-3 sm:text-sm ${active === index ? "border-[var(--o-text)] bg-[var(--o-text)] text-[var(--o-bg)]" : "border-[var(--o-border)] text-[var(--o-text-secondary)] hover:text-[var(--o-text)]"} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]`}
          >
            {stage}
          </button>
        ))}
      </div>

      <div className="mt-4 grid max-w-4xl text-base leading-7 text-[var(--o-text-secondary)] sm:mt-6 sm:text-lg sm:leading-8">
        {labels.outcomes.map((outcome) => (
          <p key={outcome} aria-hidden="true" className="invisible col-start-1 row-start-1">{outcome}</p>
        ))}
        <p aria-live="polite" aria-atomic="true" className="col-start-1 row-start-1">{labels.outcomes[active]}</p>
      </div>

      <figure id={`${id}-product-example`} className="mt-4 sm:mt-6">
        <div className="grid min-w-0 grid-cols-1">
          {stages.map((stage, index) => (
            <div
              key={stage.src}
              aria-hidden={active !== index}
              inert={active !== index}
              className={`col-start-1 row-start-1 min-w-0 transition-opacity duration-[180ms] motion-reduce:transition-none ${active === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <button
                type="button"
                onClick={() => openImage(index)}
                aria-label={`${labels.expand}: ${labels.stages[index]}`}
                className="home-product-frame group relative block aspect-[432/271] w-full cursor-zoom-in overflow-hidden rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
              >
                {/* Fill the width; only the Page capture's empty footer falls outside this preview. */}
                <Image {...stage} alt={`${labels.alt[index]} · ${labels.evidence[index]}`} sizes="(max-width: 1023px) calc(100vw - 48px), 1152px" className={`block h-auto w-full ${index !== 1 ? "home-native-window" : "rounded-md"}`} />
              </button>
            </div>
          ))}
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs leading-relaxed text-[var(--o-text-secondary)]">
          <div className="grid min-w-0 flex-1">
            {labels.evidence.map((evidence, index) => (
              <p key={evidence} aria-hidden={active !== index} className={`col-start-1 row-start-1 ${active === index ? "visible" : "invisible"}`}>{evidence}</p>
            ))}
          </div>
          <button type="button" className="min-h-11 shrink-0 text-[var(--o-warm)] underline underline-offset-4" onClick={() => openImage(active)}>{labels.expand}</button>
        </figcaption>
      </figure>

      <dialog
        ref={dialog}
        className="home-image-dialog fixed m-auto max-h-[94dvh] w-[min(96vw,1600px)] max-w-none flex-col gap-3 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg)] p-3 text-[var(--o-text)] open:flex sm:p-5"
        aria-label={`${labels.dialog}: ${labels.stages[dialogImage]}`}
        onClose={() => setEnlarged(false)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex gap-1 rounded-lg border border-[var(--o-border)] p-1">
            {[false, true].map((zoom) => <button key={String(zoom)} type="button" aria-pressed={enlarged === zoom} onClick={() => changeZoom(zoom)} className={`min-h-11 rounded-md px-3 text-sm focus-visible:outline-2 focus-visible:outline-[var(--o-warm)] ${enlarged === zoom ? "bg-[var(--o-text)] text-[var(--o-bg)]" : "text-[var(--o-text-secondary)]"}`}>{zoom ? labels.detail : labels.fit}</button>)}
          </div>
          <form method="dialog"><button autoFocus className="min-h-11 whitespace-nowrap rounded-lg border border-[var(--o-border)] px-3 text-sm focus-visible:outline-2 focus-visible:outline-[var(--o-warm)]">{labels.close}</button></form>
        </div>
        <div ref={imageViewport} role="region" aria-label={labels.dialog} aria-describedby={`${id}-image-hint`} tabIndex={0} className="min-h-0 max-h-[72dvh] overflow-auto overscroll-contain rounded-lg border border-[var(--o-border)] focus-visible:outline-2 focus-visible:outline-[var(--o-warm)]">
          <Image {...stages[dialogImage]} unoptimized alt={`${labels.alt[dialogImage]} · ${labels.evidence[dialogImage]}`} className={`mx-auto h-auto ${dialogImage !== 1 ? "home-native-window" : "rounded-md"}`} style={{ width: enlarged ? 1600 : "auto", maxWidth: enlarged ? "none" : "100%", maxHeight: enlarged ? "none" : "68dvh" }} />
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-[var(--o-text-secondary)]">
          <p id={`${id}-image-hint`}>{labels.hint}</p>
          <a href={stages[dialogImage].src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center whitespace-nowrap text-[var(--o-warm)] underline underline-offset-4">{labels.openOriginal}</a>
        </div>
      </dialog>
    </div>
  );
}
