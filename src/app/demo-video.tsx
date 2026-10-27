"use client";

import { mountNativeDemoPlayer } from "@/lib/native-demo-player";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackAnalyticsEvent } from "@/components/tracked-link";
import type { Locale } from "@/i18n/locales";

type DemoVideoProps = {
  primaryAction: ReactNode;
  sourceAction?: ReactNode;
  trustNote?: ReactNode;
  sectionTitle: string;
  videoUrl: string;
  posterUrl: string;
  playLabel: string;
  title: string;
  locale: Locale;
  caption: string;
};

export function DemoVideo({ primaryAction, sourceAction, trustNote, sectionTitle, videoUrl, posterUrl, playLabel, title, locale, caption }: DemoVideoProps) {
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [errorReason, setErrorReason] = useState<string>();
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const playerRef = useRef<HTMLVideoElement>(null);
  const errorLinkRef = useRef<HTMLAnchorElement>(null);
  const copy = playerCopy[locale];

  useEffect(() => {
    if (!expanded || !attempt) return;
    const video = playerRef.current;
    if (!video) return;
    return mountNativeDemoPlayer(video, videoUrl, {
      onReady: () => setPhase("ready"),
      onError: (reason) => { setErrorReason(reason); setPhase("error"); },
    });
  }, [expanded, attempt, videoUrl, title]);

  useEffect(() => {
    if (!expanded) return;
    const frame = requestAnimationFrame(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const bounds = stage.getBoundingClientRect();
      const top = window.scrollY + bounds.top - Math.max(80, (window.innerHeight - bounds.height + 64) / 2);
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [expanded]);

  useEffect(() => {
    if (phase === "error" && document.activeElement === document.body) {
      errorLinkRef.current?.focus({ preventScroll: true });
    }
  }, [phase]);

  function startPlayback() {
    trackAnalyticsEvent({ eventName: "video_play_click", placement: "home-demo", locale, context: "home" });
    if (phase === "loading") return;
    setExpanded(true);
    setErrorReason(undefined);
    setPhase("loading");
    setAttempt((value) => value + 1);
  }

  function closeVideo() {
    playerRef.current?.pause();
    setExpanded(false);
    setPhase("idle");
    setErrorReason(undefined);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <div id="demo" className="home-hero-actions scroll-mt-24" role="group" aria-label={locale === "en" ? "Get Wenlan" : locale === "zh-TW" ? "取得文瀾" : "获取文澜"}>
        {primaryAction}
        {sourceAction}
      </div>
      {trustNote}
      {/* One switch for the product view: the live demo below, or the film in its place. */}
      <div className="home-hero-video">
        <div className="home-demo-switch" role="tablist" aria-label={copy.switchLabel}>
          <button type="button" role="tab" aria-selected={!expanded} aria-controls="knowledge-workflows" onClick={expanded ? closeVideo : undefined}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" className="size-3.5 shrink-0"><path d="M4 3.5 19.5 10l-6.6 2.4L10.5 19 4 3.5Z" /></svg>
            <span>{copy.tryIt}</span>
          </button>
          <button ref={triggerRef} type="button" role="tab" aria-selected={expanded} aria-controls="demo-player" aria-label={expanded ? sectionTitle : playLabel} onClick={expanded ? undefined : startPlayback}>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-3 shrink-0"><path d="M6 4.2v11.6a.6.6 0 0 0 .92.5l9.1-5.8a.6.6 0 0 0 0-1L6.92 3.7A.6.6 0 0 0 6 4.2Z" /></svg>
            <span>{sectionTitle}</span>
          </button>
        </div>
      </div>
      <div id="demo-player" hidden={!expanded} onKeyDown={(event) => { if (event.key === "Escape") closeVideo(); }}>
      {expanded && <>
      <div ref={stageRef} data-player-phase={phase} data-player-error={errorReason} className="group relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg-deep)] shadow-[var(--o-shadow-media)]">
        <video key={attempt} ref={playerRef} poster={posterUrl}
          controls playsInline preload="auto" aria-label={title}
          className="absolute inset-0 h-full w-full object-contain" />
        <div className={`absolute inset-0 ${phase === "error" ? "" : "pointer-events-none"}`}>
          {(phase === "loading" || phase === "error") && (
            <div className={`absolute inset-x-0 ${phase === "loading" ? "top-0" : "bottom-0"} flex min-h-16 flex-wrap items-center justify-between gap-3 bg-[var(--o-bg)] px-5 py-4 text-sm text-[var(--o-text)] sm:px-7`}>
              <p role="status">{phase === "loading" ? copy.loading : copy.error}</p>
              {phase === "error" && (
                <div className="flex items-center gap-4">
                <button type="button" onClick={startPlayback} className="min-h-11 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">{copy.retry}</button>
                <a ref={errorLinkRef} href={videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md px-2 font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">{copy.open}</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[var(--o-text-muted)]">{caption}</p>
      </>}
      </div>
    </>
  );
}

const playerCopy: Record<Locale, { loading: string; error: string; open: string; close: string; retry: string; tryIt: string; switchLabel: string }> = {
  en: { loading: "Loading video…", error: "The video could not load here.", open: "Open video", close: "Close video", retry: "Retry", tryIt: "Try it yourself", switchLabel: "Product demo" },
  "zh-TW": { loading: "正在載入影片…", error: "目前無法在此播放影片。", open: "開啟影片", close: "收起影片", retry: "重試", tryIt: "親手試試", switchLabel: "產品示範" },
  "zh-CN": { loading: "正在加载视频…", error: "目前无法在此播放视频。", open: "打开视频", close: "收起视频", retry: "重试", tryIt: "亲手试试", switchLabel: "产品演示" },
};
