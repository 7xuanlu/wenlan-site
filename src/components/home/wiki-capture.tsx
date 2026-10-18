"use client";

import Image from "next/image";
import { CaretDownIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import { WikiInteractiveDemo } from "./wiki-interactive-demo";
import { WikiReaderContent } from "./wiki-reader-content";
import { demoCopy } from "./wiki-demo-data";
import type { Locale } from "@/i18n/locales";

type Rect = { readonly x: number; readonly y: number; readonly width: number; readonly height: number };

type MaterialView = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly crop: Rect;
  readonly mobileCrop: Rect;
  readonly files?: readonly { readonly label: string; readonly href: string }[];
};

type InteractionResource = {
  readonly id: string;
  readonly kind: "file" | "memory";
  readonly title: string;
  readonly body: string;
  readonly href?: string;
  readonly usedIn?: readonly { readonly label: string; readonly target: string }[];
};

type InteractionScene = "page" | "sources" | "memory" | "source" | "preview:decision" | "preview:checklist";
type InteractionTarget = InteractionScene | `resource:${string}`;
type ReaderLocation = "sources" | { readonly kind: "resource"; readonly id: string };
type CaptureState = {
  readonly activePreview: string | null;
  readonly pinnedPreview: string | null;
  readonly showSource: boolean;
  readonly activeMaterial: string | null;
  readonly reader: ReaderLocation | null;
};

type InteractionProps = {
  readonly resources: readonly InteractionResource[];
  readonly hotspots: Readonly<Record<string, readonly { readonly id: string; readonly label: string; readonly rect: Rect; readonly target: InteractionTarget }[]>>;
  readonly sourceTitle: string;
  readonly pageTitle: string;
};

type WikiCaptureProps = {
  readonly locale: Locale;
  readonly baseSrc: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly crop: Rect;
  readonly previews: readonly {
    readonly id: string;
    readonly label: string;
    readonly src: string;
    readonly rect: Rect;
    readonly rects?: readonly Rect[];
  }[];
  readonly sourceView: { readonly src: string; readonly label: string } | undefined;
  readonly materialViews?: readonly MaterialView[];
  readonly interaction?: InteractionProps;
};

const copyByLocale = {
  en: {
    hint: "Interactive demo · Select links, memories and sources in the view",
    mobileHint: "Interactive demo · Select links, memories and sources in the view.",
    base: "Wiki page",
    reset: "Reset view",
    source: "Source view",
    materials: "Sources",
    open: "Open current screenshot",
    openSource: "Open source file: ",
    back: "Back",
    page: "Page",
    sourceFiles: "Files",
    memories: "Memories",
    sources: "Sources",
    close: "Close reader",
    openOriginal: "Open original",
    usedIn: "Used in",
    sourceButtons: "Sources",
  },
  "zh-TW": {
    hint: "互動展示 · 可在畫面中查看連結、記憶與來源",
    mobileHint: "互動展示 · 可在畫面中查看連結、記憶與來源。",
    base: "知識頁",
    reset: "還原畫面",
    source: "來源畫面",
    materials: "記憶與檔案",
    open: "開啟目前截圖",
    openSource: "開啟原始檔案：",
    back: "返回",
    page: "知識頁",
    sourceFiles: "檔案",
    memories: "記憶",
    sources: "來源",
    close: "關閉閱讀面板",
    openOriginal: "開啟原始檔案",
    usedIn: "出現在",
    sourceButtons: "來源",
  },
  "zh-CN": {
    hint: "互动演示 · 可在画面中查看链接、记忆与来源",
    mobileHint: "互动演示 · 可在画面中查看链接、记忆与来源。",
    base: "知识页",
    reset: "还原画面",
    source: "来源画面",
    materials: "记忆与文件",
    open: "打开当前截图",
    openSource: "打开原始文件：",
    back: "返回",
    page: "知识页",
    sourceFiles: "文件",
    memories: "记忆",
    sources: "来源",
    close: "关闭阅读面板",
    openOriginal: "打开原始文件",
    usedIn: "出现在",
    sourceButtons: "来源",
  },
} as const;

function intersectRect(rect: Rect, crop: Rect): Rect | null {
  const x = Math.max(rect.x, crop.x);
  const y = Math.max(rect.y, crop.y);
  const right = Math.min(rect.x + rect.width, crop.x + crop.width);
  const bottom = Math.min(rect.y + rect.height, crop.y + crop.height);
  if (right <= x || bottom <= y) return null;
  return { x, y, width: right - x, height: bottom - y };
}

function RecordedWikiCapture({ locale, baseSrc, alt, width, height, crop, previews, sourceView, materialViews = [], interaction }: WikiCaptureProps) {
  const copy = copyByLocale[locale];
  const [capture, setCapture] = useState<CaptureState>({ activePreview: null, pinnedPreview: null, showSource: false, activeMaterial: null, reader: null });
  const [history, setHistory] = useState<CaptureState[]>([]);
  const [preloadImages, setPreloadImages] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const readerOriginRef = useRef<{ readonly capture: CaptureState; readonly historyLength: number } | null>(null);
  const focusIntentRef = useRef<"reader" | "return" | "page" | null>(null);

  const selectedPreview = previews.find((preview) => preview.id === capture.activePreview);
  const selectedMaterial = materialViews.find((view) => view.id === capture.activeMaterial);
  const readerId = capture.reader && capture.reader !== "sources" ? capture.reader.id : null;
  const readerResource = interaction?.resources.find((resource) => resource.id === readerId);
  const imageSrc = selectedMaterial?.src ?? (capture.showSource && sourceView ? sourceView.src : selectedPreview?.src ?? baseSrc);
  const imageWidth = selectedMaterial?.width ?? width;
  const imageHeight = selectedMaterial?.height ?? height;
  const imageCrop = selectedMaterial?.crop ?? crop;
  const imageAlt = selectedMaterial
    ? `${alt} · ${selectedMaterial.label}`
    : capture.showSource && sourceView
      ? `${alt} · ${sourceView.label}`
      : selectedPreview
        ? `${alt} · ${selectedPreview.label}`
        : alt;
  const mobileCrop = selectedMaterial?.mobileCrop ?? (capture.showSource
    ? { x: 1760, y: 115, width: 640, height: 800 }
    : selectedPreview
      ? { x: Math.max(0, selectedPreview.rect.x - 20), y: selectedPreview.rect.y - 10, width: 640, height: 800 }
      : { x: 700, y: 230, width: 1000, height: 1250 });
  const currentScene: InteractionScene = capture.reader === "sources"
    ? "sources"
    : capture.showSource
      ? "source"
      : capture.activeMaterial
        ? (capture.activeMaterial === "sources" ? "sources" : "memory")
        : selectedPreview
          ? `preview:${selectedPreview.id}` as InteractionScene
          : "page";
  const sceneHotspots = capture.reader
    ? []
    : interaction?.hotspots[currentScene]
      ?? (currentScene.startsWith("preview:") ? interaction?.hotspots.page : undefined)
      ?? [];
  // sizes describes the full rendered image, including the portion outside the CSS crop.
  const imageSizes = "(max-width: 639px) calc(375vw - 180px), (min-width: 1200px) 1452px, calc(126vw - 60px)";
  const imageStyle = (imageCropValue: Rect, imageWidthValue: number) => ({
    width: `${(imageWidthValue / imageCropValue.width) * 100}%`,
    left: `${(-imageCropValue.x / imageCropValue.width) * 100}%`,
    top: `${(-imageCropValue.y / imageCropValue.height) * 100}%`,
  });

  useEffect(() => {
    const intent = focusIntentRef.current;
    if (!intent) return;
    const focusVisible = (selector: string) => {
      const target = [...(rootRef.current?.querySelectorAll<HTMLElement>(selector) ?? [])]
        .find((element) => element.getClientRects().length > 0);
      target?.focus({ preventScroll: true });
      return Boolean(target);
    };
    if (intent === "reader" && capture.reader) focusVisible("[data-wiki-reader-heading]");
    else if (intent === "page") focusVisible("[data-demo-page]");
    else if (intent === "return") {
      const previous = returnFocusRef.current;
      if (!previous?.isConnected || previous.getClientRects().length === 0) {
        if (!focusVisible("[data-demo-sources]")) focusVisible("[data-demo-page]");
      } else previous.focus({ preventScroll: true });
    }
    focusIntentRef.current = null;
  }, [capture]);

  const navigate = (next: CaptureState, focus: "reader" | "return" | "page" | null = null) => {
    if (
      next.activePreview === capture.activePreview
      && next.pinnedPreview === capture.pinnedPreview
      && next.showSource === capture.showSource
      && next.activeMaterial === capture.activeMaterial
      && JSON.stringify(next.reader) === JSON.stringify(capture.reader)
    ) return;
    const returnState = capture.activePreview && !capture.pinnedPreview && !capture.showSource && !capture.activeMaterial && !capture.reader
      ? { ...capture, activePreview: null }
      : capture;
    setHistory((current) => [...current.slice(-19), returnState]);
    setCapture(next);
    if (focus) focusIntentRef.current = focus;
  };

  const goBack = () => {
    const previous = history.at(-1);
    if (previous) {
      setHistory((current) => current.slice(0, -1));
      setCapture(previous);
      if (!previous.reader) readerOriginRef.current = null;
      focusIntentRef.current = previous.reader ? "reader" : "return";
      return;
    }
    if (capture.reader) {
      setCapture({ ...capture, reader: null });
      readerOriginRef.current = null;
      focusIntentRef.current = "return";
      return;
    }
    const page: CaptureState = { activePreview: null, pinnedPreview: null, showSource: false, activeMaterial: null, reader: null };
    setCapture(page);
    focusIntentRef.current = "page";
  };

  useEffect(() => {
    if (!capture.activePreview && !capture.pinnedPreview && !capture.showSource && !capture.activeMaterial && !capture.reader) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !rootRef.current?.contains(document.activeElement)) return;
      event.preventDefault();
      goBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [capture, history]);

  const enterReader = (reader: ReaderLocation, trigger?: HTMLElement) => {
    if (!capture.reader) {
      readerOriginRef.current = { capture, historyLength: history.length };
      if (trigger) returnFocusRef.current = trigger;
    }
    navigate({ ...capture, reader }, "reader");
  };

  const closeReader = () => {
    const origin = readerOriginRef.current;
    if (origin) {
      setCapture(origin.capture);
      setHistory((current) => current.slice(0, origin.historyLength));
    } else setCapture({ ...capture, reader: null });
    readerOriginRef.current = null;
    focusIntentRef.current = "return";
  };

  const selectPreview = (id: string) => {
    navigate({ activePreview: id, pinnedPreview: id, showSource: false, activeMaterial: null, reader: null }, "page");
  };

  const selectMaterial = (id: string) => {
    navigate({ activePreview: null, pinnedPreview: null, showSource: false, activeMaterial: id, reader: null }, "page");
  };

  const selectSource = () => {
    navigate({ activePreview: null, pinnedPreview: null, showSource: true, activeMaterial: null, reader: null }, "page");
  };

  const selectPage = () => {
    navigate({ activePreview: null, pinnedPreview: null, showSource: false, activeMaterial: null, reader: null }, "page");
  };

  const goToTarget = (target: string, trigger?: HTMLElement) => {
    if (!interaction) {
      if (target === "page") selectPage();
      else if (target === "source") selectSource();
      else if (target.startsWith("preview:")) selectPreview(target.slice("preview:".length));
      return;
    }
    if (target === "sources") {
      enterReader("sources", trigger);
      return;
    }
    if (target === "memory") {
      if (materialViews.some((view) => view.id === "memory")) selectMaterial("memory");
      return;
    }
    if (target.startsWith("resource:")) {
      const id = target.slice("resource:".length);
      if (interaction.resources.some((resource) => resource.id === id)) enterReader({ kind: "resource", id }, trigger);
      return;
    }
    if (target === "page") selectPage();
    else if (target === "source") selectSource();
    else if (target.startsWith("preview:")) selectPreview(target.slice("preview:".length));
  };

  const previewOnHover = (id: string, pointerType: string) => {
    if (pointerType === "mouse" && !capture.pinnedPreview && !capture.showSource && !capture.activeMaterial && !capture.reader) {
      setCapture((current) => ({ ...current, activePreview: id }));
    }
  };

  const previewOnFocus = (id: string) => {
    if (capture.reader || capture.showSource || capture.activeMaterial) return;
    setCapture((current) => ({ ...current, pinnedPreview: null, activePreview: id }));
  };

  const imageFrame = (isMobile: boolean) => {
    const visibleCrop = isMobile ? mobileCrop : imageCrop;
    const cropRect = (rect: Rect) => intersectRect(rect, visibleCrop);
    const previewHotspots = !capture.reader && !capture.showSource && !capture.activeMaterial
      ? previews.flatMap((preview) => (preview.rects ?? [preview.rect]).map((rect, index) => ({ preview, rect, index, clipped: cropRect(rect) }))).filter((entry) => entry.clipped)
      : [];

    return (
      <div
        data-scene={currentScene}
        data-wiki-stage={isMobile ? "mobile" : "desktop"}
        className={`relative order-2 overflow-hidden rounded-lg ${isMobile ? "aspect-[4/5] sm:hidden" : "hidden sm:block"}`}
        style={{ aspectRatio: isMobile ? "4 / 5" : `${imageCrop.width} / ${imageCrop.height}` }}
      >
        <Image
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt={imageAlt}
          sizes={imageSizes}
          className="absolute h-auto max-w-none"
          style={imageStyle(visibleCrop, imageWidth)}
        />
        {previewHotspots.map(({ preview, clipped, index }) => (
          <button
            key={`link-${preview.id}-${index}-${isMobile ? "mobile" : "desktop"}`}
            type="button"
            aria-label={preview.label}
            aria-pressed={capture.activePreview === preview.id}
            title={preview.label}
            data-hotspot={preview.id}
            data-scene={currentScene}
            onPointerEnter={(event) => { if (!isMobile) previewOnHover(preview.id, event.pointerType); }}
            onPointerLeave={() => {
              if (!capture.pinnedPreview && !capture.showSource && !capture.reader) setCapture((current) => ({ ...current, activePreview: null }));
            }}
            onFocus={() => {
              if (!isMobile) previewOnFocus(preview.id);
            }}
            onBlur={() => {
              if (!capture.pinnedPreview && !capture.showSource && !capture.reader) setCapture((current) => ({ ...current, activePreview: null }));
            }}
            onClick={() => selectPreview(preview.id)}
            className="absolute z-10 cursor-pointer rounded-sm bg-transparent hover:bg-[var(--o-warm)]/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--o-warm)]"
            style={{
              left: `${((clipped!.x - visibleCrop.x) / visibleCrop.width) * 100}%`,
              top: `${((clipped!.y - visibleCrop.y) / visibleCrop.height) * 100}%`,
              width: `${(clipped!.width / visibleCrop.width) * 100}%`,
              height: `${(clipped!.height / visibleCrop.height) * 100}%`,
            }}
          />
        ))}
        {sceneHotspots.flatMap((hotspot) => {
          const clipped = cropRect(hotspot.rect);
          if (!clipped) return [];
          return [
            <button
              key={`${hotspot.id}-${isMobile ? "mobile" : "desktop"}`}
              type="button"
              aria-label={hotspot.label}
              title={hotspot.label}
              data-hotspot={hotspot.id}
              data-scene={currentScene}
              onClick={(event) => goToTarget(hotspot.target, event.currentTarget)}
              className="absolute z-10 cursor-pointer rounded-sm bg-transparent hover:bg-[var(--o-warm)]/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--o-warm)]"
              style={{
                left: `${((clipped.x - visibleCrop.x) / visibleCrop.width) * 100}%`,
                top: `${((clipped.y - visibleCrop.y) / visibleCrop.height) * 100}%`,
                width: `${(clipped.width / visibleCrop.width) * 100}%`,
                height: `${(clipped.height / visibleCrop.height) * 100}%`,
              }}
            />,
          ];
        })}
        {interaction && !capture.reader && (
          <nav aria-label={copy.sourceButtons} className="absolute inset-x-1 bottom-1 z-20 flex items-center gap-1 rounded-md border border-[#d9d6d0] bg-[#fbfaf8]/95 p-1 text-xs text-[#35332f] shadow-sm backdrop-blur-sm">
            <button
              type="button"
              aria-label={copy.back}
              title={copy.back}
              data-demo-back
              disabled={history.length === 0 && !capture.reader}
              onClick={goBack}
              className="min-h-8 min-w-8 rounded px-2 hover:bg-[#eeece7] disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#6658c8]"
            >
              ←
            </button>
            <button
              type="button"
              aria-pressed={currentScene === "page" && !capture.reader}
              data-demo-page
              onClick={selectPage}
              className="min-h-8 rounded px-2 hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#6658c8]"
            >
              {interaction.pageTitle || copy.page}
            </button>
            <button
              type="button"
              aria-pressed={capture.reader === "sources"}
              data-demo-sources
              onClick={(event) => enterReader("sources", event.currentTarget)}
              className="min-h-8 rounded px-2 hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#6658c8]"
            >
              {interaction.sourceTitle}
            </button>
          </nav>
        )}
        {capture.reader && interaction && (
          <aside
            aria-label={capture.reader === "sources" ? interaction.sourceTitle : readerResource?.title}
            data-wiki-panel={capture.reader === "sources" ? "sources" : readerResource?.id}
            className={`absolute inset-y-0 right-0 z-30 flex min-h-0 flex-col border-l border-[#dedbd5] bg-[#fbfaf8] text-[#302f2b] shadow-xl ${isMobile ? "left-0 w-full border-l-0" : "w-[42%]"}`}
          >
            <header className="flex shrink-0 items-start justify-between gap-2 border-b border-[#e5e2dc] px-3 py-2">
              <div className="min-w-0">
                <h3 data-wiki-reader-heading tabIndex={-1} className="truncate text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#6658c8]">
                  {capture.reader === "sources" ? interaction.sourceTitle : readerResource?.title}
                </h3>
                {capture.reader === "sources" && <p className="mt-0.5 text-xs text-[#706e68]">{interaction.resources.length} · {copy.sources}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" aria-label={copy.back} title={copy.back} data-demo-back onClick={goBack} className="min-h-8 rounded px-2 text-sm hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-[#6658c8]">←</button>
                <button type="button" aria-label={copy.close} title={copy.close} onClick={closeReader} className="min-h-8 rounded px-2 text-sm hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-[#6658c8]">×</button>
              </div>
            </header>
            {capture.reader === "sources" ? (
              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                {(["file", "memory"] as const).map((kind) => {
                  const group = interaction.resources.filter((resource) => resource.kind === kind);
                  if (group.length === 0) return null;
                  return (
                    <section key={kind} className="mb-3">
                      <h4 className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#77746e]">{kind === "file" ? copy.sourceFiles : copy.memories}</h4>
                      <ul className="space-y-0.5">
                        {group.map((resource) => (
                          <li key={resource.id}>
                            <button type="button" data-resource-id={resource.id} onClick={() => enterReader({ kind: "resource", id: resource.id })} className="w-full rounded px-2 py-2 text-left text-sm hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-[#6658c8]">
                              {resource.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            ) : readerResource ? (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
                  <WikiReaderContent body={readerResource.body} title={readerResource.title} />
                  {readerResource.usedIn && readerResource.usedIn.length > 0 && (
                    <section className="mt-4 border-t border-[#e5e2dc] pt-3">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#77746e]">{copy.usedIn}</h4>
                      <div className="flex flex-wrap gap-2">
                        {readerResource.usedIn.map((item) => (
                          <button key={`${item.label}-${item.target}`} type="button" onClick={() => goToTarget(item.target)} className="rounded border border-[#d8d5cf] px-2 py-1 text-xs hover:bg-[#eeece7] focus-visible:outline-2 focus-visible:outline-[#6658c8]">
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
                {readerResource.kind === "file" && readerResource.href && (
                  <a href={readerResource.href} target="_blank" rel="noopener noreferrer" className="shrink-0 border-t border-[#e5e2dc] px-3 py-2 text-xs text-[#5954a9] underline underline-offset-2 hover:text-[#393481] focus-visible:outline-2 focus-visible:outline-[#6658c8]">
                    {copy.openOriginal}
                  </a>
                )}
              </>
            ) : null}
          </aside>
        )}
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className="relative flex min-w-0 flex-col"
      onPointerEnter={() => setPreloadImages(true)}
      onFocusCapture={() => setPreloadImages(true)}
      onPointerLeave={() => {
        if (!capture.pinnedPreview && !capture.showSource && !capture.reader) setCapture((current) => ({ ...current, activePreview: null }));
      }}
    >
      {preloadImages && (
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 size-px overflow-hidden opacity-0">
          {[
            ...new Map([
              ...previews.map((preview) => [preview.src, { src: preview.src, width, height }] as const),
              ...(sourceView ? [[sourceView.src, { src: sourceView.src, width, height }] as const] : []),
              ...materialViews.map((view) => [view.src, { src: view.src, width: view.width, height: view.height }] as const),
            ]).values(),
          ].map((view) => (
            <Image key={view.src} src={view.src} width={view.width} height={view.height} sizes={imageSizes} alt="" loading="eager" />
          ))}
        </div>
      )}
      {imageFrame(false)}
      {imageFrame(true)}
      <p className="order-3 mt-2 hidden text-xs leading-5 text-[var(--o-text-secondary)] sm:block">{copy.hint}</p>
      <p className="order-3 mt-2 text-xs leading-5 text-[var(--o-text-secondary)] sm:hidden">{copy.mobileHint}</p>
      <div className="order-1 mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm leading-5">
        <button
          type="button"
          aria-pressed={!capture.activePreview && !capture.showSource && !capture.activeMaterial}
          onClick={selectPage}
          className="min-h-11 text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
        >
          {capture.pinnedPreview || capture.activePreview || capture.showSource || capture.activeMaterial ? copy.reset : copy.base}
        </button>
        {previews.map((preview) => (
          <button
            key={preview.id}
            type="button"
            aria-pressed={capture.activePreview === preview.id}
            onPointerEnter={(event) => previewOnHover(preview.id, event.pointerType)}
            onPointerLeave={() => {
              if (!capture.pinnedPreview && !capture.showSource && !capture.reader) setCapture((current) => ({ ...current, activePreview: null }));
            }}
            onFocus={() => previewOnFocus(preview.id)}
            onBlur={() => {
              if (!capture.pinnedPreview && !capture.showSource && !capture.reader) setCapture((current) => ({ ...current, activePreview: null }));
            }}
            onClick={() => selectPreview(preview.id)}
            className={`min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] ${capture.activePreview === preview.id ? "text-[var(--o-text)] decoration-[var(--o-warm)]" : "text-[var(--o-text-secondary)] decoration-[var(--o-border)] hover:text-[var(--o-text)]"}`}
          >
            {preview.label}
          </button>
        ))}
        {!sourceView && materialViews.length === 0 && (
          <a href={imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open}: ${selectedPreview?.label ?? copy.base}`} className="inline-flex min-h-11 items-center text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
            {copy.open}
          </a>
        )}
      </div>
      {(sourceView || materialViews.length > 0) && (
        <div className="order-1 mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm leading-5">
          <span className="basis-full text-xs font-medium tracking-wide text-[var(--o-text-secondary)]">{copy.materials}</span>
          {sourceView && <button type="button" aria-pressed={capture.showSource} onClick={selectSource} className={`min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] ${capture.showSource ? "text-[var(--o-text)] decoration-[var(--o-warm)]" : "text-[var(--o-text-secondary)] decoration-[var(--o-border)] hover:text-[var(--o-text)]"}`}>{sourceView.label || copy.source}</button>}
          {materialViews.map((view) => (
            <button key={view.id} type="button" aria-pressed={capture.activeMaterial === view.id} onClick={() => selectMaterial(view.id)} className={`min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] ${capture.activeMaterial === view.id ? "text-[var(--o-text)] decoration-[var(--o-warm)]" : "text-[var(--o-text-secondary)] decoration-[var(--o-border)] hover:text-[var(--o-text)]"}`}>
              {view.label}
            </button>
          ))}
          <a href={imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open}: ${selectedMaterial?.label ?? selectedPreview?.label ?? (capture.showSource && sourceView ? sourceView.label : copy.base)}`} className="inline-flex min-h-11 items-center text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
            {copy.open}
          </a>
        </div>
      )}
      {materialViews.length > 0 && <p aria-live="polite" className="order-4 mt-1 min-h-10 text-sm leading-5 text-[var(--o-text-secondary)]">{selectedMaterial?.description ?? ""}</p>}
      {selectedMaterial?.files && selectedMaterial.files.length > 0 && (
        <div className="order-5 mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5">
          {selectedMaterial.files.map((file) => <a key={file.href} href={file.href} target="_blank" rel="noopener noreferrer" aria-label={`${copy.openSource}${file.label}`} className="text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">{file.label}</a>)}
        </div>
      )}
    </div>
  );
}

export function WikiCapture(props: WikiCaptureProps) {
  return <div>
    <WikiInteractiveDemo key={props.locale} locale={props.locale} />
    <details data-recorded-views className="wiki-recorded-views">
      <summary>
        <span className="wiki-demo-provenance">
          {demoCopy[props.locale].sampleLibrary}{" · "}
          <span className="wiki-demo-pointer-hint">{demoCopy[props.locale].hint}</span>
          <span className="wiki-demo-touch-hint">{demoCopy[props.locale].touchHint}</span>
        </span>
        <span className="wiki-recorded-action">{demoCopy[props.locale].recorded}<CaretDownIcon className="size-3.5" /></span>
      </summary>
      <div className="mt-3"><RecordedWikiCapture {...props} /></div>
    </details>
  </div>;
}
