"use client";

import Image from "next/image";
import { useId, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/locales";

const copyByLocale = {
  en: {
    expand: "View full size",
    close: "Close",
    fit: "Fit",
    detail: "Zoom detail",
    openOriginal: "Open original",
    hint: "Scroll or swipe to explore the enlarged image.",
  },
  "zh-TW": {
    expand: "放大查看",
    close: "關閉",
    fit: "全圖",
    detail: "放大細節",
    openOriginal: "開啟原圖",
    hint: "滑動圖片，查看放大後的細節。",
  },
  "zh-CN": {
    expand: "放大查看",
    close: "关闭",
    fit: "全图",
    detail: "放大细节",
    openOriginal: "打开原图",
    hint: "滑动图片，查看放大后的细节。",
  },
} as const;

type EvidenceCrop = { readonly x: number; readonly y: number; readonly width: number; readonly height: number };

type EvidenceImageProps = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly showCaption?: boolean;
  readonly showExpandAction?: boolean;
  readonly locale: Locale;
  readonly annotations?: ReactNode;
  readonly annotationKey?: ReactNode;
  readonly expandLabel?: string;
  readonly mobileZoomWidth?: number;
  readonly detailZoomWidth?: number;
  readonly preview?: ReactNode;
  readonly crop?: EvidenceCrop;
  readonly lossless?: boolean;
};

// A presentation crop keeps the source image byte-for-byte intact.
function CroppedEvidenceImage({ src, width, height, alt, crop, displayWidth = "100%", original = false }: {
  src: string; width: number; height: number; alt: string; crop: EvidenceCrop;
  displayWidth?: number | string; original?: boolean;
}) {
  return <span data-evidence-crop={`${crop.x},${crop.y},${crop.width},${crop.height}`} className="relative mx-auto block overflow-hidden rounded-md"
    style={{ width: displayWidth, aspectRatio: `${crop.width} / ${crop.height}` }}>
    <Image src={src} width={width} height={height} alt={alt} loading="lazy" unoptimized={original}
      sizes="(min-width: 1200px) 1240px, 108vw"
      className="absolute block h-auto max-w-none"
      style={{ width: `${width / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} />
  </span>;
}

export function EvidenceImage({ src, width, height, alt, caption, locale, showCaption = true, showExpandAction = true, annotations, annotationKey, expandLabel, mobileZoomWidth, detailZoomWidth, preview, crop, lossless = false }: EvidenceImageProps) {
  const labels = copyByLocale[locale];
  const expand = expandLabel ?? labels.expand;
  const [enlarged, setEnlarged] = useState(false);
  const [zoomWidth, setZoomWidth] = useState<number>();
  const id = useId();
  const imageDescriptionId = `${id}-image-description`;
  const dialog = useRef<HTMLDialogElement>(null);
  const imageViewport = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // Captures default to their CSS-pixel size; a dense graph can choose a readable zoom scale.
  const detailWidth = zoomWidth ?? detailZoomWidth ?? Math.max(1600, Math.round(width / 2));

  const changeZoom = (zoom: boolean) => {
    setEnlarged(zoom);
    requestAnimationFrame(() => {
      const viewport = imageViewport.current;
      if (!viewport || !dialog.current?.open) return;
      viewport.scrollTo({
        left: zoom ? (viewport.scrollWidth - viewport.clientWidth) / 2 : 0,
        top: zoom ? (viewport.scrollHeight - viewport.clientHeight) / 2 : 0,
      });
    });
  };

  const openImage = () => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    setZoomWidth(isMobile ? mobileZoomWidth : undefined);
    dialog.current?.showModal();
    changeZoom(isMobile);
  };

  return (
    <figure className="min-w-0">
      {annotations && showCaption && <figcaption className="mb-2 text-xs leading-relaxed text-[var(--o-text-secondary)]">{caption}</figcaption>}
      <div className="relative">
        <button
          type="button"
          onClick={openImage}
          aria-label={`${expand}: ${caption}`}
          aria-describedby={imageDescriptionId}
          className="block w-full cursor-zoom-in rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
        >
          {preview ?? (crop ? <CroppedEvidenceImage src={src} width={width} height={height} alt={alt} crop={crop} original={lossless} /> : <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading="lazy"
            unoptimized={lossless}
            sizes="(max-width: 1199px) calc(100vw - 48px), 1152px"
            className="block h-auto w-full rounded-md"
          />)}
        </button>
        {annotations && <div className="pointer-events-none absolute inset-0">{annotations}</div>}
      </div>
      <span id={imageDescriptionId} className="sr-only">{alt}</span>
      {annotations && showExpandAction && (
        <div className="mt-2 flex justify-end">
          <button type="button" onClick={openImage} className="min-h-11 shrink-0 text-xs text-[var(--o-warm)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
            {expand}
          </button>
        </div>
      )}
      {annotationKey}
      {!annotations && (showCaption || showExpandAction) && (
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs leading-relaxed text-[var(--o-text-secondary)]">
          {showCaption && <p className="min-w-0 text-balance">{caption}</p>}
          {showExpandAction && <button type="button" onClick={openImage} className="min-h-11 shrink-0 text-[var(--o-warm)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
            {expand}
          </button>}
        </figcaption>
      )}

      <dialog
        ref={dialog}
        className="home-image-dialog fixed m-auto max-h-[94dvh] w-[min(96vw,1600px)] max-w-none flex-col gap-3 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg)] p-3 text-[var(--o-text)] open:flex sm:p-5"
        aria-label={caption}
        onClose={() => {
          setEnlarged(false);
          opener.current?.focus();
        }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex gap-1 rounded-lg border border-[var(--o-border)] p-1">
            {[false, true].map((zoom) => (
              <button
                key={String(zoom)}
                type="button"
                aria-pressed={enlarged === zoom}
                onClick={() => changeZoom(zoom)}
                className={`min-h-11 rounded-md px-3 text-sm focus-visible:outline-2 focus-visible:outline-[var(--o-warm)] ${enlarged === zoom ? "bg-[var(--o-text)] text-[var(--o-bg)]" : "text-[var(--o-text-secondary)]"}`}
              >
                {zoom ? labels.detail : labels.fit}
              </button>
            ))}
          </div>
          <form method="dialog">
            <button autoFocus className="min-h-11 whitespace-nowrap rounded-lg border border-[var(--o-border)] px-3 text-sm focus-visible:outline-2 focus-visible:outline-[var(--o-warm)]">{labels.close}</button>
          </form>
        </div>
        <div
          ref={imageViewport}
          role="region"
          aria-label={caption}
          aria-describedby={`${id}-image-hint`}
          tabIndex={0}
          className="min-h-0 max-h-[72dvh] overflow-auto overscroll-contain rounded-md focus-visible:outline-2 focus-visible:outline-[var(--o-warm)]"
        >
          {crop ? <CroppedEvidenceImage src={src} width={width} height={height} alt={alt} crop={crop} original
            displayWidth={enlarged ? detailWidth : `min(100%, ${68 * crop.width / crop.height}dvh)`} /> : (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            unoptimized
            className="mx-auto h-auto rounded-md"
            style={{ width: enlarged ? detailWidth : "auto", maxWidth: enlarged ? "none" : "100%", maxHeight: enlarged ? "none" : "68dvh" }}
          />
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-[var(--o-text-secondary)]">
          <p id={`${id}-image-hint`}>{labels.hint}</p>
          <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center whitespace-nowrap text-[var(--o-warm)] underline underline-offset-4">{labels.openOriginal}</a>
        </div>
      </dialog>
    </figure>
  );
}
