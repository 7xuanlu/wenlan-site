"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/components/tracked-link";
import type { Locale } from "@/i18n/locales";

type DemoVideoProps = {
  sectionTitle: string;
  embedUrl: string;
  posterUrl: string;
  playLabel: string;
  title: string;
  locale: Locale;
};

export function DemoVideo({ sectionTitle, embedUrl, posterUrl, playLabel, title, locale }: DemoVideoProps) {
  const [attempt, setAttempt] = useState(0);
  const [errorReason, setErrorReason] = useState<string>();
  const stageRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<(() => void) | undefined>(undefined);
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const playerRef = useRef<HTMLDivElement>(null);
  const errorLinkRef = useRef<HTMLAnchorElement>(null);
  const copy = playerCopy[locale];

  useEffect(() => {
    if (!attempt) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    void import("@/lib/youtube-player").then(({ mountDemoPlayer }) => {
      if (cancelled || !playerRef.current) return;
      dispose = mountDemoPlayer(playerRef.current, embedUrl, title, {
        onReady: (play) => { resumeRef.current = play; setPhase("ready"); },
        onError: (reason) => { setErrorReason(reason); setPhase("error"); },
      });
    }).catch(() => { if (!cancelled) { setErrorReason("player-module-load-failed"); setPhase("error"); } });
    return () => { cancelled = true; resumeRef.current = undefined; dispose?.(); };
  }, [attempt, embedUrl, title]);

  useEffect(() => {
    if (phase === "error" && document.activeElement === document.body) {
      errorLinkRef.current?.focus({ preventScroll: true });
    }
  }, [phase]);

  function startPlayback() {
    trackAnalyticsEvent({ eventName: "video_play_click", placement: "home-demo", locale, context: "home" });
    const stage = stageRef.current;
    if (stage) {
      const bounds = stage.getBoundingClientRect();
      // Center in the space below the fixed navigation; keep tall players clear of it.
      const top = window.scrollY + bounds.top - Math.max(80, (window.innerHeight - bounds.height + 64) / 2);
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    if (phase === "ready") { resumeRef.current?.(); return; }
    if (phase === "loading") return;
    setErrorReason(undefined);
    setPhase("loading");
    setAttempt((value) => value + 1);
  }

  return (
    <>
      <h2 id="demo-heading" className="mb-6 flex justify-center">
        <button type="button" onClick={startPlayback} aria-controls="demo-player" aria-busy={phase === "loading"} className={`home-demo-trigger inline-flex min-h-12 items-center gap-3 rounded-full border py-2 pl-2 pr-5 text-base font-medium text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]`}>
          <span aria-hidden="true" className={`home-demo-disc grid size-8 place-items-center rounded-full bg-[var(--o-text)] text-[var(--o-bg)]`}><svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-4"><path d="M8 5v14l11-7z" /></svg></span>
          {sectionTitle}
        </button>
      </h2>
      <div id="demo-player" ref={stageRef} data-player-phase={phase} data-player-error={errorReason} className="group relative w-full aspect-[1619/972] min-h-[202px] overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg-deep)] shadow-[var(--o-shadow-media)]">
        <div ref={playerRef} className="absolute inset-0" aria-hidden={phase !== "ready"} />
        <div aria-hidden={phase === "ready"} className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${phase === "ready" ? "pointer-events-none opacity-0" : "opacity-100"}`}>
          <Image
            src={posterUrl}
            alt={posterDescriptions[locale]}
            width={1619}
            height={972}
            sizes="(max-width: 1072px) calc(100vw - 48px), 1024px"
            className="h-full w-full object-contain"
          />
          {phase === "idle" && (
            <button type="button" aria-label={playLabel} onClick={startPlayback} className="absolute inset-0 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[var(--o-text)]">
              <span className="absolute bottom-4 right-4 grid size-14 place-items-center rounded-full border border-white/60 bg-[#17191d]/90 text-white shadow-[0_4px_20px_rgba(0,0,0,0.16)] backdrop-blur-md transition-transform duration-200 group-hover:scale-105 group-active:scale-95 motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:size-16" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-6 sm:size-7"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
          {(phase === "loading" || phase === "error") && (
            <div className="absolute inset-x-0 bottom-0 flex min-h-16 flex-wrap items-center justify-between gap-3 border-t border-[var(--o-border)] bg-[var(--o-bg)] px-5 py-4 text-sm text-[var(--o-text)] sm:px-7">
              <p role="status">{phase === "loading" ? copy.loading : copy.error}</p>
              {phase === "error" && (
                <a ref={errorLinkRef} href={`https://www.youtube.com/watch?v=${new URL(embedUrl).pathname.split("/").pop()}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md px-2 font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">{copy.open}</a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const posterDescriptions: Record<Locale, string> = {
  en: "Wenlan desktop showing the Agent handoff loop page with a source citation expanded.",
  "zh-TW": "Wenlan 桌面版的 Agent handoff loop 知識頁，已展開引用來源。",
  "zh-CN": "Wenlan 桌面版的 Agent handoff loop 知识页，已展开引用来源。",
};

const playerCopy: Record<Locale, { loading: string; error: string; open: string }> = {
  en: { loading: "Loading video…", error: "The video could not load here.", open: "Open video" },
  "zh-TW": { loading: "正在載入影片…", error: "目前無法在此播放影片。", open: "開啟影片" },
  "zh-CN": { loading: "正在加载视频…", error: "目前无法在此播放视频。", open: "打开视频" },
};
