"use client";

import { useId, useState } from "react";
import type { ArticleOpeningExample } from "@/app/(en)/learn/articles";
import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "./evidence-image";

const labels = {
  en: { heading: "Actual screens", answer: "Claude answer", source: "Wenlan source" },
  "zh-TW": { heading: "實際畫面", answer: "Claude 回答", source: "文瀾原文" },
  "zh-CN": { heading: "实际画面", answer: "Claude 回答", source: "文澜原文" },
} as const;

type GalleryProps = {
  image: ArticleOpeningExample["image"];
  sourceImage: ArticleOpeningExample["sourceImage"];
  locale: Locale;
};

export function RecordedEvidenceGallery({ image, sourceImage, locale }: GalleryProps) {
  const [view, setView] = useState<"answer" | "source">("answer");
  const copy = labels[locale];
  const viewId = useId();
  const activeImage = view === "answer" ? image : sourceImage;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 px-5 pb-4 sm:px-7">
        <div role="group" aria-label={copy.heading} className="inline-flex rounded-lg bg-[var(--o-bg)] p-1">
          {(["answer", "source"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              aria-controls={viewId}
              onClick={() => setView(key)}
              className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] ${view === key ? "bg-[var(--o-text)] text-[var(--o-bg)]" : "text-[var(--o-text-secondary)] hover:text-[var(--o-text)]"}`}
            >
              {copy[key]}
            </button>
          ))}
        </div>
      </div>
      <figure id={viewId}>
        <EvidenceImage key={activeImage.src} image={activeImage} locale={locale} loading="eager" presentation="overlay" detailFocus={view === "answer" ? { x: 0.43, y: 0.57 } : { x: 0.2, y: 0.4 }} />
        <figcaption aria-live="polite" className="px-5 py-3 text-xs leading-relaxed text-[var(--o-text-secondary)] sm:px-7">{activeImage.caption}</figcaption>
      </figure>
    </div>
  );
}
