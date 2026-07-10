"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/i18n/content";

type PainsCopy = HomeContent["redesign"]["pains"];

/* Era tags and status chips are mono design texture, not prose: they stay English. */
const generationEras: readonly (string | null)[] = ["gen 0", "gen 1", null];

const generationVerbs = [
  { verb: "capture", accent: "var(--o-warm)" },
  { verb: "recall", accent: "var(--o-sage)" },
  { verb: "enrich", accent: "var(--o-indigo)" },
];

type Stage = "final" | "pre" | "played";

/**
 * Scroll-triggered supersede choreography: rows land alive, strike lines draw
 * the dead generations out, then the Wenlan row blooms warm. Renders the final
 * state by default (no-JS, reduced motion, already-visible section) and only
 * arms the intro after mount when the section is still below the viewport.
 */
export function PainsSection({ copy }: { readonly copy: PainsCopy }) {
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

  return (
    <section
      ref={sectionRef}
      className="border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-[var(--o-text-secondary)]">
            {copy.intro}
          </p>
        </div>
        <div className="mt-12">
          {copy.generations.map((gen, index) => (
            <div
              key={gen.id}
              className={`grid gap-2 sm:grid-cols-2 sm:items-baseline ${
                generationEras[index] ? "border-t border-[var(--o-border-subtle)] py-5" : "pt-0 pb-5"
              } transition-all duration-500 ease-out ${pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
              style={{ transitionDelay: delay(index * 130) }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="w-28 shrink-0 font-mono text-[10px] tracking-[0.15em] text-[var(--o-text-muted)] uppercase">
                  {generationEras[index] ?? ""}
                </span>
                <span
                  className="relative font-serif text-xl transition-colors duration-450"
                  style={{
                    color: pre ? "var(--o-text)" : "var(--o-text-muted)",
                    transitionDelay: delay(550 + index * 160),
                  }}
                >
                  {gen.name}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-1/2 h-px origin-left bg-[var(--o-text-muted)] transition-transform duration-450 ease-out"
                    style={{
                      transform: pre ? "scaleX(0)" : "scaleX(1)",
                      transitionDelay: delay(550 + index * 160),
                    }}
                  />
                </span>
                <span
                  className={`inline-block rounded border border-[var(--o-border)] px-1 font-mono text-[9px] tracking-wide text-[var(--o-text-dim)] uppercase transition-all duration-300 ${
                    pre ? "scale-90 opacity-0" : "scale-100 opacity-100"
                  }`}
                  style={{ transitionDelay: delay(850 + index * 160) }}
                >
                  superseded
                </span>
              </div>
              <p className="text-lg leading-relaxed text-[var(--o-text-muted)]">{gen.body}</p>
            </div>
          ))}
          <div
            className={`relative mt-4 grid gap-2 rounded-lg px-4 py-6 sm:-mx-4 sm:grid-cols-2 sm:items-baseline transition-all duration-500 ease-out ${
              pre ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
            style={{ transitionDelay: delay(390) }}
          >
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-lg border border-[color-mix(in_srgb,var(--o-warm)_25%,transparent)] bg-[var(--o-glow-warm-bg)] transition-opacity duration-700 ${
                pre ? "opacity-0" : "opacity-100"
              }`}
              style={{ transitionDelay: delay(1350) }}
            />
            <div className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="w-28 shrink-0 font-mono text-[10px] tracking-[0.15em] text-[var(--o-text-muted)] uppercase">
                gen 2 and beyond
              </span>
              <span className="font-serif text-xl text-[var(--o-text)]">{copy.current.name}</span>
              <span
                className={`inline-block rounded border px-1 font-mono text-[9px] tracking-wide uppercase transition-all duration-400 ${
                  pre ? "scale-90 opacity-0" : "scale-100 opacity-100"
                }`}
                style={{
                  borderColor: "color-mix(in srgb, var(--o-warm) 45%, transparent)",
                  color: "var(--o-warm)",
                  transitionDelay: delay(1550),
                }}
              >
                current
              </span>
            </div>
            <div className="relative">
              <p className="text-lg leading-relaxed text-[var(--o-text)]">{copy.current.body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {generationVerbs.map((chip) => (
                  <span
                    key={chip.verb}
                    className={`rounded border px-1.5 py-px font-mono text-[10px] tracking-[0.12em] uppercase transition-all duration-400 ${
                      pre ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                    style={{
                      borderColor: `color-mix(in srgb, ${chip.accent} 40%, transparent)`,
                      color: chip.accent,
                      background: `color-mix(in srgb, ${chip.accent} 8%, transparent)`,
                      transitionDelay: delay(1550),
                    }}
                  >
                    {chip.verb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p
          className={`mt-14 border-t border-[var(--o-border-subtle)] pt-10 font-serif text-2xl tracking-tight text-balance sm:text-3xl transition-all duration-500 ease-out ${
            pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
          }`}
          style={{ transitionDelay: delay(1750) }}
        >
          {copy.closer.pre}
          <em className="text-[var(--o-warm)]">{copy.closer.emphasis}</em>
          {copy.closer.post}
        </p>
      </div>
    </section>
  );
}
