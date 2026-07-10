"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/i18n/content";

type StorageCopy = HomeContent["redesign"]["storage"];

/**
 * Storage: why index + files beats either alone. The index card plays the
 * hybrid retrieval argument: one query, three ways in (exact term,
 * paraphrase, linked entity), fused into one ranked answer. Below it,
 * staging captures wait for /distill to solidify them into Markdown pages,
 * the lasting record you read, diff, and keep. A three-way comparison strip
 * makes the hybrid case explicit. Same scroll-armed choreography contract as
 * pains.tsx: final state by default, intro only arms below the fold.
 * Labels and tradeoffs come from the dictionary; the recall rows, staging
 * queue, and Markdown card are mock tool output and stay English.
 */

type Stage = "final" | "pre" | "played";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const methodChip =
  "w-[9.5rem] shrink-0 rounded border px-2 py-1 text-center font-mono text-[10px] tracking-wide uppercase transition-colors duration-300";

export function StorageSection({ copy }: { readonly copy: StorageCopy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage>("final");
  const pre = stage === "pre";
  const played = stage === "played";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    setStage("pre");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage("played");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const delay = (ms: number) => (played ? `${ms}ms` : "0ms");
  const land = pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100";
  const slide = pre ? "-translate-x-1.5 opacity-0" : "translate-x-0 opacity-100";

  return (
    <section
      ref={sectionRef}
      className="border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-medium tracking-tight whitespace-pre-line sm:text-5xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-[var(--o-text-secondary)]">
          {copy.intro}
        </p>
        <div className="mt-12 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div
            className={`group min-w-0 rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-6 transition-all duration-500 ease-out ${land}`}
            style={{ transitionDelay: delay(0) }}
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">{copy.indexLabel}</p>
            <div
              className={`mt-4 inline-block rounded border border-[var(--o-border)] bg-[var(--o-surface)] px-2.5 py-1.5 font-mono text-[12px] text-[var(--o-text-secondary)] transition-all duration-400 ease-out ${land}`}
              style={{ transitionDelay: delay(250) }}
            >
              <span className="text-[var(--o-warm)]">recall:</span> &ldquo;staging rollback&rdquo;
            </div>
            <div className="mt-3 ml-3 space-y-2 border-l border-[var(--o-border-subtle)] pl-3">
              <div
                className={`flex items-center gap-2.5 transition-all duration-400 ease-out ${slide}`}
                style={{ transitionDelay: delay(550) }}
              >
                <span
                  className={`${methodChip} animate-route-flash border-[color-mix(in_srgb,var(--o-warm)_45%,var(--o-border))] text-[var(--o-warm)]`}
                  style={{ "--route-accent": "var(--o-warm)" } as React.CSSProperties}
                >
                  FTS5 · exact term
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] text-[var(--o-text-secondary)]">
                  mem_0231 · <span className="rounded bg-[color-mix(in_srgb,var(--o-warm)_16%,transparent)] px-0.5 text-[var(--o-warm)]">rollback</span> needs db lock
                </span>
              </div>
              <div
                className={`flex items-center gap-2.5 transition-all duration-400 ease-out ${slide}`}
                style={{ transitionDelay: delay(850) }}
              >
                <span
                  className={`${methodChip} animate-route-flash border-[color-mix(in_srgb,var(--o-sage)_45%,var(--o-border))] text-[var(--o-sage)]`}
                  style={{ "--route-accent": "var(--o-sage)", animationDelay: "0.8s" } as React.CSSProperties}
                >
                  vectors · paraphrase
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] text-[var(--o-text-secondary)]">
                  mem_0142 · <span className="rounded bg-[color-mix(in_srgb,var(--o-sage)_16%,transparent)] px-0.5 text-[var(--o-sage)]">deploy reverts hang</span>
                </span>
              </div>
              <div
                className={`flex items-center gap-2.5 transition-all duration-400 ease-out ${slide}`}
                style={{ transitionDelay: delay(1150) }}
              >
                <span
                  className={`${methodChip} animate-route-flash border-[color-mix(in_srgb,var(--o-indigo)_45%,var(--o-border))] text-[var(--o-indigo)]`}
                  style={{ "--route-accent": "var(--o-indigo)", animationDelay: "1.6s" } as React.CSSProperties}
                >
                  graph · entity link
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] text-[var(--o-text-secondary)]">
                  mem_0087 · <span className="rounded bg-[color-mix(in_srgb,var(--o-indigo)_16%,transparent)] px-0.5 text-[var(--o-indigo)]">project: checkout →</span> deploy gotcha
                </span>
              </div>
            </div>
            <div
              className={`animate-fuse-pulse mt-3 flex items-center gap-2 rounded border border-[var(--o-warm)]/40 bg-[var(--o-glow-warm-bg)] px-3 py-2 transition-all duration-400 ease-out ${land}`}
              style={{ transitionDelay: delay(1500) }}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[var(--o-warm)]" />
              <span className="font-mono text-[12px] text-[var(--o-text)]">all three return together, ranked</span>
              <span className="ml-auto shrink-0 rounded border border-[var(--o-border)] px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-[var(--o-text-muted)] uppercase">
                reciprocal rank fusion
              </span>
            </div>
            <p
              className={`mt-3 text-[13px] leading-relaxed text-[var(--o-text-muted)] transition-all duration-400 ease-out ${land}`}
              style={{ transitionDelay: delay(1650) }}
            >
              {copy.fusionNote}
            </p>
            <div
              className={`mt-4 border-t border-[var(--o-border-subtle)] pt-3 transition-all duration-400 ease-out ${land}`}
              style={{ transitionDelay: delay(1800) }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">staging</p>
              <div className="mt-2.5 space-y-2 font-mono text-[12px] text-[var(--o-text-secondary)]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate">mem_0231 · rollback needs db lock</span>
                  <span className="shrink-0 rounded border border-[var(--o-border)] px-1.5 py-0.5 text-[9px] tracking-wide text-[var(--o-text-muted)] uppercase">staging</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate">mem_0198 · budget capped at 40k</span>
                  <span className="shrink-0 rounded border border-[var(--o-warm)]/40 px-1.5 py-0.5 text-[9px] tracking-wide text-[var(--o-warm)] uppercase">ready to distill</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-row items-center justify-center gap-6 py-1 transition-opacity duration-400 sm:flex-col sm:gap-7 sm:px-1 ${pre ? "opacity-0" : "opacity-100"}`}
            style={{ transitionDelay: delay(1900) }}
            aria-hidden="true"
          >
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <p className="font-mono text-[11px] text-[var(--o-warm)]">/distill</p>
              <span className="animate-arrow-nudge flex rotate-90 text-[var(--o-text-muted)] sm:rotate-0">
                <ArrowIcon />
              </span>
              <p className="max-w-24 font-mono text-[10px] leading-relaxed text-[var(--o-text-muted)] sm:text-center">
                {copy.distillCaption}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <p className="font-mono text-[11px] text-[var(--o-sage)]">ingest</p>
              <span className="animate-arrow-nudge flex -rotate-90 text-[var(--o-text-muted)] sm:rotate-180" style={{ animationDelay: "1.2s" }}>
                <ArrowIcon />
              </span>
              <p className="max-w-24 font-mono text-[10px] leading-relaxed text-[var(--o-text-muted)] sm:text-center">
                {copy.ingestCaption}
              </p>
            </div>
          </div>
          <div
            className={`min-w-0 rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-6 transition-all duration-500 ease-out ${land}`}
            style={{ transitionDelay: delay(200) }}
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">{copy.filesLabel}</p>
            <div className="mt-4 rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)] p-4">
              <p className="font-mono text-[11px] text-[var(--o-text-muted)]">~/.wenlan/pages/architecture-map.md</p>
              <div className="mt-3 space-y-1.5 font-mono text-[13px] text-[var(--o-text-secondary)]">
                <p className="text-[var(--o-text)]"># Architecture map</p>
                <p>Writes go through the daemon. [^1]</p>
                <p className="pt-1 text-[var(--o-text-muted)]">[^1]: /docs/architecture</p>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 font-mono text-[12px] text-[var(--o-text-muted)]">
              <p><span className="text-[var(--o-warm)]">a1b2c3d</span> page: architecture-map refreshed (4 sources)</p>
              <p>Obsidian-compatible · grep-able · yours to move</p>
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {copy.tradeoffs.map((option, index) => {
            const winner = option.id === "index-files";
            return (
              <div
                key={option.id}
                className={`rounded-lg border p-4 transition-all duration-500 ease-out ${land} ${
                  winner
                    ? "border-[color-mix(in_srgb,var(--o-warm)_35%,var(--o-border))] bg-[var(--o-bg-alt)]"
                    : "border-[var(--o-border)] bg-[var(--o-bg-alt)]"
                }`}
                style={{ transitionDelay: delay(2000 + index * 130) }}
              >
                <p className="flex items-center gap-2 text-sm font-medium">
                  <span className={`font-mono ${winner ? "text-[var(--o-warm)]" : "text-[var(--o-text-muted)]"}`}>
                    {winner ? "✓" : "×"}
                  </span>
                  {option.title}
                </p>
                <p className={`mt-1.5 text-[13px] leading-relaxed ${winner ? "text-[var(--o-text-secondary)]" : "text-[var(--o-text-muted)]"}`}>
                  {option.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
