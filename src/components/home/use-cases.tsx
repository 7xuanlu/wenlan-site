"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  accentForScenario,
  totalSourcesForScenario,
  type UseCasesCopy,
} from "@/components/use-case-model";
import type { Locale } from "@/i18n/locales";

/**
 * Use cases as a specimen rail: four giant serif tabs, one live page specimen
 * per domain, ghost cards hinting at the unselected pages, and a two-row
 * counter-drifting marquee for the long tail. Scenario copy (labels, leads,
 * outcomes) comes from the dictionary; the specimen pages and marquee pills
 * are mock wiki content and stay English in every locale, except the claim
 * chip, which localizes per reader feedback.
 */

type Specimen = {
  readonly title: string;
  readonly sources: readonly { readonly label: string; readonly detail: string }[];
};

const claimSourceByLocale: Record<Locale, { readonly label: string; readonly detail: string }> = {
  en: { label: "CLAIM-07", detail: "Re-check" },
  "zh-TW": { label: "聲明-07", detail: "待重查" },
  "zh-CN": { label: "声明-07", detail: "待重查" },
};

const specimens: Record<string, Specimen> = {
  "dev-codebase": {
    title: "Auth v2 migration",
    sources: [
      { label: "/migrations/auth-v2", detail: "Rollout" },
      { label: "/runbooks/release", detail: "Rollback" },
    ],
  },
  "product-customers": {
    title: "Acme onboarding scope",
    sources: [
      { label: "/calls/acme-q3", detail: "Client call" },
      { label: "/proposal/v4", detail: "Tradeoff" },
    ],
  },
  "research-writing": {
    title: "Retrieval eval notes",
    sources: [
      { label: "/papers/attention", detail: "Paper" },
      claimSourceByLocale.en,
    ],
  },
  "learning-study": {
    title: "Zone 2 training, explained",
    sources: [
      { label: "/papers/seiler-2010", detail: "Paper" },
      { label: "/notes/hr-zones", detail: "Concept" },
    ],
  },
};

function CiteMark({ n }: { readonly n: number }) {
  return (
    <span className="ml-1.5 rounded border border-[var(--o-border-subtle)] bg-[var(--o-surface)] px-1.5 font-mono text-[10px] text-[var(--o-text-muted)]">
      {n}
    </span>
  );
}

/* Code: a migration page reads as a phase tracker. */
function CodeBody({ accent }: { readonly accent: string }) {
  const phases = [
    { label: "token backfill", state: "done" },
    { label: "flag flip", state: "active" },
    { label: "30d expiry", state: "pending" },
  ] as const;
  return (
    <div className="space-y-4 pt-4">
      <div className="flex flex-wrap items-center gap-2">
        {phases.map((phase, index) => (
          <div key={phase.label} className="flex items-center gap-2">
            {index > 0 && <span className="font-mono text-[11px] text-[var(--o-text-dim)]">→</span>}
            <span
              className={`rounded border px-2 py-1 font-mono text-[11px] ${
                phase.state === "pending"
                  ? "border-[var(--o-border-subtle)] text-[var(--o-text-muted)]"
                  : "text-[var(--o-text-secondary)]"
              }`}
              style={
                phase.state === "active"
                  ? { borderColor: accent, color: accent }
                  : phase.state === "done"
                    ? { borderColor: "var(--o-border)" }
                    : undefined
              }
            >
              {phase.state === "done" ? "✓ " : ""}
              {phase.label}
            </span>
          </div>
        ))}
        <span className="font-mono text-[10px] tracking-wide text-[var(--o-text-muted)] uppercase">Rollout</span>
      </div>
      <p className="text-[15px] leading-relaxed text-[var(--o-text-secondary)]">
        Cutover blocks on the session-token backfill; run it before the flag flip.
        <CiteMark n={1} />
      </p>
      <p className="text-[15px] leading-relaxed text-[var(--o-text-secondary)]">
        Legacy tokens stay valid for 30 days after cutover, then hard-expire.
        <CiteMark n={2} />
      </p>
    </div>
  );
}

/* Client work: the page keeps the client's own words. */
function ClientBody({ accent }: { readonly accent: string }) {
  return (
    <div className="space-y-4 pt-4">
      <blockquote
        className="rounded-md px-4 py-3"
        style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)` }}
      >
        <p className="font-serif text-lg leading-relaxed text-[var(--o-text)] italic">
          &ldquo;We cannot exceed 40k this quarter. Route any scope trade through our ops lead.&rdquo;
        </p>
        <p className="mt-1.5 font-mono text-[10px] tracking-wide text-[var(--o-text-muted)] uppercase">
          Acme call, Q3
          <CiteMark n={1} />
        </p>
      </blockquote>
      <p className="text-[15px] leading-relaxed text-[var(--o-text-secondary)]">
        Legal needs ten days for any data-processing change, so book review early.
        <CiteMark n={2} />
      </p>
    </div>
  );
}

/* Research: a reading page with a kept highlight and a flagged stale claim. */
function ResearchBody({ accent }: { readonly accent: string }) {
  return (
    <div className="space-y-4 pt-4">
      <p className="text-[15px] leading-relaxed text-[var(--o-text-secondary)]">
        <mark
          className="rounded-sm px-0.5 text-[var(--o-text)]"
          style={{ background: `color-mix(in srgb, ${accent} 18%, transparent)` }}
        >
          Hybrid keyword plus vector search beats either alone
        </mark>{" "}
        across the eval corpus.
        <CiteMark n={1} />
      </p>
      <p className="text-[15px] leading-relaxed">
        <span className="text-[var(--o-text-muted)] line-through decoration-[var(--o-text-dim)]">
          Latency stays flat past 10M vectors.
        </span>
        <span
          className="ml-2 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase"
          style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, color: accent }}
        >
          stale, re-check
        </span>
        <CiteMark n={2} />
      </p>
    </div>
  );
}

/* Learning: a concept page with prerequisite wiki-links. */
function LearningBody({ accent }: { readonly accent: string }) {
  return (
    <div className="space-y-4 pt-4">
      <p className="text-[15px] leading-relaxed text-[var(--o-text-secondary)]">
        <span className="font-semibold text-[var(--o-text)]">Zone 2</span> is the easy pace you can still talk
        at; most of your weekly training hours belong there, not at threshold.
        <CiteMark n={1} />
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] tracking-wide text-[var(--o-text-muted)] uppercase">Builds on</span>
        {["heart rate zones", "lactate threshold"].map((term) => (
          <span
            key={term}
            className="rounded border px-2 py-1 font-mono text-[11px]"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
              color: accent,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
          >
            [[{term}]]
          </span>
        ))}
        <CiteMark n={2} />
      </div>
    </div>
  );
}

/* Two counter-drifting rows; accents rotate so no column reads single-color. */
const longTailRows = [
  [
    "meeting notes",
    "incident reviews",
    "trip planning",
    "reading lists",
    "hiring loops",
    "home lab",
    "language study",
    "competitor teardowns",
    "grant applications",
    "garden log",
    "gift ideas",
    "tax season",
  ],
  [
    "postmortems",
    "api quirks",
    "vendor notes",
    "recipe box",
    "team rituals",
    "conference notes",
    "side projects",
    "health logs",
    "renovation plans",
    "paper trails",
    "dnd campaigns",
    "onboarding docs",
  ],
];

const longTailAccents = ["var(--o-warm)", "var(--o-sage)", "var(--o-indigo)", "var(--o-amber)"];

const specimenBodies: Record<string, (props: { readonly accent: string }) => ReactNode> = {
  "dev-codebase": CodeBody,
  "product-customers": ClientBody,
  "research-writing": ResearchBody,
  "learning-study": LearningBody,
};

export function UseCasesSection({
  copy,
  locale,
}: {
  readonly copy: UseCasesCopy;
  readonly locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scenarios = copy.scenarios;
  const active = scenarios[activeIndex] ?? scenarios[0];
  const accent = accentForScenario(active);
  const specimen = specimens[active.id] ?? specimens["dev-codebase"];
  const SpecimenBody = specimenBodies[active.id] ?? CodeBody;

  function selectTab(index: number) {
    const next = (index + scenarios.length) % scenarios.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectTab(index + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectTab(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectTab(scenarios.length - 1);
    }
  }

  const ghostClasses = ["top-14 w-[92%] opacity-70", "top-7 w-[84%] opacity-45", "top-0 w-[76%] opacity-30"];

  return (
    <section className="border-b border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="sr-only">{copy.title}</h2>
          <p className="max-w-sm text-xl leading-relaxed text-[var(--o-text-secondary)]">{copy.description}</p>
          <div role="tablist" aria-label={copy.eyebrow} className="mt-10 flex flex-col items-start gap-3">
            {scenarios.map((scenario, index) => {
              const selected = index === activeIndex;
              const scenarioAccent = accentForScenario(scenario);
              return (
                <button
                  key={scenario.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`font-serif text-4xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:text-5xl ${
                    selected
                      ? "text-[var(--o-text)]"
                      : "text-[var(--o-text-muted)] hover:text-[var(--o-text-secondary)]"
                  }`}
                >
                  {scenario.railLabel}
                  <span style={selected ? { color: scenarioAccent } : undefined}>.</span>
                </button>
              );
            })}
          </div>
          <div className="mt-9">
            <p className="flex max-w-xs items-start gap-2.5 text-base leading-relaxed text-[var(--o-text-secondary)]">
              <span
                className="mt-[0.55rem] size-1.5 shrink-0 rounded-full transition-colors duration-200"
                style={{ background: accent }}
              />
              <span>{active.lead}</span>
            </p>
            <p className="mt-2 pl-4 font-mono text-[11px] tracking-[0.15em] text-[var(--o-text-muted)] uppercase">
              {active.summary} · {totalSourcesForScenario(active)} sources
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative mx-auto w-full max-w-[30rem] pt-[5.5rem] lg:mr-0 lg:ml-auto">
            {scenarios
              .filter((_, index) => index !== activeIndex)
              .map((scenario, ghostIndex) => (
                <div
                  key={scenario.id}
                  aria-hidden="true"
                  className={`absolute left-1/2 -translate-x-1/2 rounded-lg border border-[var(--o-border-subtle)] bg-[var(--o-surface)] px-5 py-3 ${
                    ghostClasses[ghostIndex] ?? ghostClasses[2]
                  }`}
                >
                  <p className="truncate font-serif text-[15px] text-[var(--o-text-muted)]">
                    {specimens[scenario.id]?.title}
                  </p>
                </div>
              ))}
            <article
              key={active.id}
              className="animate-fade-up motion-reduce:animate-none relative rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-6 shadow-[var(--o-shadow-media)]"
              style={{ animationDuration: "0.4s" }}
              role="tabpanel"
            >
              <header className="flex items-center justify-between gap-3 border-b border-[var(--o-border-subtle)] pb-4">
                <h3 className="font-serif text-2xl font-medium tracking-tight">{specimen.title}</h3>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase"
                  style={{
                    color: accent,
                    borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                  }}
                >
                  {copy.index.sourceBackedLabel}
                </span>
              </header>
              <SpecimenBody accent={accent} />
              <footer className="mt-5 border-t border-[var(--o-border-subtle)] pt-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">Cites</p>
                <div className="mt-2.5 space-y-2">
                  {specimen.sources.map((source) => {
                    const chip = source === claimSourceByLocale.en ? claimSourceByLocale[locale] : source;
                    return (
                      <div
                        key={source.label}
                        className="flex items-center justify-between gap-3 rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)] px-3 py-2"
                      >
                        <span className="flex min-w-0 items-center gap-2 font-mono text-[12px] text-[var(--o-text-secondary)]">
                          <span className="size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                          <span className="truncate">{chip.label}</span>
                        </span>
                        <span className="shrink-0 font-mono text-[10px] tracking-wide text-[var(--o-text-muted)] uppercase">
                          {chip.detail}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </footer>
            </article>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--o-text-muted)]">{active.outcome}</p>
          </div>
        </div>
        <div className="mt-2 flex min-w-0 items-center gap-4 border-t border-[var(--o-border-subtle)] pt-6 lg:col-span-12">
          <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">The long tail</span>
          <div className="marquee-hover-pause min-w-0 flex-1 space-y-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            {longTailRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`animate-marquee flex w-max ${rowIndex === 1 ? "marquee-reverse" : ""}`}
                style={rowIndex === 1 ? { animationDuration: "48s" } : undefined}
              >
                {[0, 1].map((copyIndex) => (
                  <div key={copyIndex} aria-hidden={copyIndex === 1} className="flex gap-2 pr-2">
                    {row.map((term, termIndex) => {
                      const pillAccent = longTailAccents[(termIndex + rowIndex) % longTailAccents.length];
                      return (
                        <span
                          key={term}
                          className="rounded-full px-3 py-1 font-mono text-[12px] whitespace-nowrap"
                          style={{
                            color: pillAccent,
                            background: `color-mix(in srgb, ${pillAccent} 9%, transparent)`,
                          }}
                        >
                          [[{term}]]
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <span className="hidden shrink-0 text-[15px] text-[var(--o-text-muted)] lg:inline">and whatever you feed it.</span>
        </div>
      </div>
    </section>
  );
}
