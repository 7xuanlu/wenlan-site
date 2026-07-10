"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/i18n/content";

type PipelineCopy = HomeContent["redesign"]["pipeline"];
type SolutionCopy = HomeContent["sections"]["solution"];

/**
 * The handoff loop, choreographed. The three stages land in loop order,
 * capture lines arrive one at a time, distill verbs fire, the next-session
 * brief snaps in, then the /handoff arc draws back across the top to close
 * the loop. Renders the final state by default (no-JS, reduced motion,
 * section already visible) and only arms the intro after mount when the
 * section is still below the viewport (same contract as pains.tsx).
 * Section title and closer reuse the pinned sections.solution copy.
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

function PipelineStage({
  accent,
  body,
  className = "",
  step,
  style,
  title,
}: {
  accent: string;
  body: React.ReactNode;
  className?: string;
  step: string;
  style?: React.CSSProperties;
  title: string;
}) {
  return (
    <div
      className={`relative flex-1 rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-5 ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ background: accent }} />
        <p className="font-mono text-[11px] tracking-[0.15em] text-[var(--o-text-muted)]">{step}</p>
      </div>
      <p className="mt-2 font-serif text-lg font-medium">{title}</p>
      <div className="mt-3">{body}</div>
    </div>
  );
}

const captureLines = [
  "+ rollback needs db lock",
  "+ client capped budget at 40k",
  "+ claim in section 2 went stale",
];

const stageAccents = ["var(--o-sage)", "var(--o-amber)", "var(--o-warm)"];

export function PipelineSection({
  copy,
  solution,
}: {
  readonly copy: PipelineCopy;
  readonly solution: SolutionCopy;
}) {
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
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const delay = (ms: number) => (played ? `${ms}ms` : "0ms");
  const land = pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100";

  const stageBodies = [
    <ul key="capture" className="space-y-1.5 font-mono text-[12px] leading-relaxed text-[var(--o-text-secondary)]">
      {captureLines.map((line, index) => (
        <li
          key={line}
          className={`truncate transition-all duration-400 ease-out ${pre ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}
          style={{ transitionDelay: delay(550 + index * 150) }}
        >
          {line}
        </li>
      ))}
    </ul>,
    <div key="distill">
      <div className="flex flex-wrap gap-1.5">
        {["Dedup", "Link", "Supersede"].map((label, index) => (
          <span
            key={label}
            className={`rounded border border-[var(--o-border)] bg-[var(--o-surface)] px-2 py-1 font-mono text-[10px] tracking-wide text-[var(--o-text-secondary)] uppercase transition-all duration-400 ${
              pre ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{ transitionDelay: delay(1000 + index * 110) }}
          >
            {label}
          </span>
        ))}
      </div>
      <p
        className={`mt-3 text-[13px] leading-relaxed text-[var(--o-text-muted)] transition-all duration-400 ease-out ${
          pre ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{ transitionDelay: delay(1350) }}
      >
        {copy.distillNote}
      </p>
    </div>,
    <div
      key="brief"
      className={`rounded border border-[var(--o-border-subtle)] bg-[var(--o-surface)] p-2.5 transition-all duration-400 ease-out ${
        pre ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ transitionDelay: delay(1550) }}
    >
      <p className="text-[13px] font-medium">Release runbook</p>
      <p className="mt-1 font-mono text-[11px] text-[var(--o-text-muted)]">cites /runbooks/release, /docs/architecture</p>
    </div>,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-24"
    >
      <p
        className="pointer-events-none absolute top-16 left-6 hidden origin-left rotate-90 font-mono text-[11px] tracking-[0.25em] whitespace-nowrap text-[var(--o-text-muted)] uppercase xl:block"
        aria-hidden="true"
      >
        each pass leaves the store sharper
      </p>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
            {solution.title}
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-[var(--o-text-secondary)]">
            {copy.intro}
          </p>
        </div>
        <div className="relative mt-24 flex flex-col items-stretch gap-3 sm:flex-row">
          <div className="pointer-events-none absolute inset-x-10 -top-16 hidden h-14 sm:block" aria-hidden="true">
            {/* The return arc draws right-to-left after the brief lands: the loop closing is the payoff */}
            <svg
              className="h-full w-full text-[var(--o-border)]"
              viewBox="0 0 1000 56"
              fill="none"
              preserveAspectRatio="none"
              style={{
                clipPath: pre ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
                transition: "clip-path 800ms ease-out",
                transitionDelay: delay(1750),
              }}
            >
              <path
                d="M992 52 C 800 -8, 200 -8, 16 46"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                vectorEffect="non-scaling-stroke"
                className="animate-arc-flow"
              />
            </svg>
            <svg
              className={`absolute -bottom-0.5 left-0 size-2.5 text-[var(--o-text-muted)] transition-opacity duration-300 ${pre ? "opacity-0" : "opacity-100"}`}
              style={{ transitionDelay: delay(2400) }}
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path d="M8.5 1 L1 5.8 L9 9 Z" />
            </svg>
            <p
              className={`absolute inset-x-0 -top-4 text-center font-mono text-[10px] tracking-[0.2em] text-[var(--o-text-muted)] transition-opacity duration-400 ${pre ? "opacity-0" : "opacity-100"}`}
              style={{ transitionDelay: delay(2400) }}
            >
              {copy.arcLabel}
            </p>
          </div>
          {copy.stages.map((stageCopy, index) => (
            <div key={stageCopy.id} className="contents">
              {index > 0 && (
                <div
                  className={`hidden shrink-0 self-center text-[var(--o-text-muted)] transition-opacity duration-400 sm:flex ${pre ? "opacity-0" : "opacity-100"}`}
                  style={{ transitionDelay: delay(70 + index * 180) }}
                  aria-hidden="true"
                >
                  <span className="animate-arrow-nudge flex" style={index === 2 ? { animationDelay: "1.2s" } : undefined}>
                    <ArrowIcon />
                  </span>
                </div>
              )}
              <PipelineStage
                accent={stageAccents[index]}
                step={stageCopy.step}
                title={stageCopy.title}
                className={`transition-all duration-500 ease-out ${land}`}
                style={{ transitionDelay: delay(index * 180) }}
                body={stageBodies[index]}
              />
            </div>
          ))}
        </div>
        <p
          className={`mt-8 text-lg text-[var(--o-text-muted)] transition-all duration-500 ease-out ${land}`}
          style={{ transitionDelay: delay(2650) }}
        >
          {solution.note}
        </p>
      </div>
    </section>
  );
}
