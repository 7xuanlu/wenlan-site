"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/i18n/content";

type BentoCellCopy = HomeContent["redesign"]["bento"]["cells"][number];

/**
 * Bento: what the pages give you. Each cell carries a bespoke visual that
 * demonstrates its claim: the page stack fans, the recall graph lights its
 * typed neighborhood (person, project, page), the citation traces back to
 * its source memory, the review queue surfaces a contradiction, spaces pull
 * apart, the git rail lights in commit order, and every MCP client converges
 * on one store. Cells land staggered on first scroll-in (final state by
 * default, same contract as pains.tsx) and carry a cursor spotlight tinted
 * to their accent. Cell titles and bodies come from the dictionary; the
 * artifact internals are mock tool output and stay English in every locale.
 */

type Stage = "final" | "pre" | "played";

function BentoCell({
  accent,
  body,
  children,
  className = "",
  landDelay,
  pre,
  title,
}: {
  accent: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  landDelay: string;
  pre: boolean;
  title: string;
}) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${pre ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
      style={{ transitionDelay: landDelay }}
    >
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--cell-accent)_30%,var(--o-border))]"
        style={{ "--cell-accent": accent } as React.CSSProperties}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx, 70%) var(--my, 30%), color-mix(in srgb, var(--cell-accent) 9%, transparent), transparent 70%)",
          }}
        />
        <h3 className="relative font-serif text-xl font-medium tracking-tight">{title}</h3>
        <p className="relative mt-2 max-w-md text-base leading-relaxed text-[var(--o-text-secondary)]">{body}</p>
        <div className="relative mt-auto pt-6">{children}</div>
      </div>
    </div>
  );
}

const chipBase =
  "rounded border border-[var(--o-border)] bg-[var(--o-surface)] px-2 py-1 transition-colors duration-300";

const stackedPages = [
  {
    title: "Migration plan",
    offset: "top-0 left-0 opacity-60",
    fan: "group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:-rotate-1",
    cites: 6,
  },
  {
    title: "Runbook",
    offset: "top-7 left-4 opacity-80",
    fan: "group-hover:-translate-y-0.5",
    cites: 8,
  },
  {
    title: "Architecture map",
    offset: "top-14 left-8",
    fan: "group-hover:translate-x-1.5 group-hover:translate-y-1 group-hover:rotate-1 group-hover:shadow-[0_10px_28px_rgba(26,26,46,0.10)]",
    cites: 10,
  },
];

/* The recall neighborhood: one memory, its typed context. Node shapes carry
   the type (circle = person, folder = project, document = page); hovering
   the cell walks the edges outward in order. */
function RecallGraph() {
  const edgeBase = "fill-none transition-[stroke] duration-300";
  const labelBase = "font-mono text-[10px] transition-[fill] duration-300";
  return (
    <svg viewBox="0 0 340 176" className="h-40 w-full" aria-hidden="true">
      <path
        d="M124 88 C 154 88, 160 30, 192 30"
        strokeWidth="1.2"
        className={`${edgeBase} stroke-[var(--o-border)] group-hover:stroke-[var(--o-indigo)]`}
      />
      <path
        d="M124 88 L 193 88"
        strokeWidth="1.2"
        className={`${edgeBase} stroke-[var(--o-border)] delay-[120ms] group-hover:stroke-[var(--o-warm)]`}
      />
      <path
        d="M124 88 C 154 88, 160 146, 192 146"
        strokeWidth="1.2"
        className={`${edgeBase} stroke-[var(--o-border)] delay-[240ms] group-hover:stroke-[var(--o-sage)]`}
      />

      {/* entities link to each other too: Dana works on checkout, checkout is documented by the page */}
      <path
        d="M213 42.5 C 221 54, 221 66, 213 78"
        strokeWidth="1.1"
        strokeDasharray="3 3"
        className={`${edgeBase} stroke-[var(--o-border)] delay-[360ms] group-hover:stroke-[color-mix(in_srgb,var(--o-indigo)_50%,var(--o-warm))]`}
      />
      <path
        d="M213 99 C 221 110, 221 121, 213 132"
        strokeWidth="1.1"
        strokeDasharray="3 3"
        className={`${edgeBase} stroke-[var(--o-border)] delay-[440ms] group-hover:stroke-[color-mix(in_srgb,var(--o-warm)_50%,var(--o-sage))]`}
      />

      {/* the memory that was recalled */}
      <rect x="16" y="72" width="108" height="32" rx="7" className="fill-[var(--o-surface)] stroke-[var(--o-border)]" />
      <circle cx="32" cy="88" r="3" className="fill-[var(--o-warm)]" />
      <text x="42" y="91.5" className="fill-[var(--o-text-secondary)] font-mono text-[11px]">
        rollback fix
      </text>

      {/* person: circle */}
      <circle
        cx="208"
        cy="30"
        r="13"
        className="fill-[var(--o-surface)] stroke-[color-mix(in_srgb,var(--o-indigo)_55%,var(--o-border))] transition-[stroke] duration-300 group-hover:stroke-[var(--o-indigo)]"
        strokeWidth="1.2"
      />
      <circle cx="208" cy="26.5" r="3" className="fill-none stroke-[var(--o-indigo)]" strokeWidth="1.3" />
      <path d="M202 36.5 C 202 32, 214 32, 214 36.5" className="fill-none stroke-[var(--o-indigo)]" strokeWidth="1.3" strokeLinecap="round" />
      <text x="228" y="33.5" className={`${labelBase} fill-[var(--o-text-muted)] group-hover:fill-[var(--o-indigo)]`}>
        person: Dana
      </text>

      {/* project: folder */}
      <rect
        x="196"
        y="80"
        width="24"
        height="17"
        rx="3"
        className="fill-[var(--o-surface)] stroke-[color-mix(in_srgb,var(--o-warm)_55%,var(--o-border))] transition-[stroke] duration-300 delay-[120ms] group-hover:stroke-[var(--o-warm)]"
        strokeWidth="1.2"
      />
      <path d="M200 80 v-1.5 a2 2 0 0 1 2 -2 h5.5 l3 3.5" className="fill-none stroke-[var(--o-warm)]" strokeWidth="1.2" strokeLinecap="round" />
      <text x="228" y="91.5" className={`${labelBase} fill-[var(--o-text-muted)] delay-[120ms] group-hover:fill-[var(--o-warm)]`}>
        project: checkout
      </text>

      {/* page: document with folded corner */}
      <path
        d="M198 134 h13 l7 7 v17 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-22 a2 2 0 0 1 2 -2 z"
        className="fill-[var(--o-surface)] stroke-[color-mix(in_srgb,var(--o-sage)_55%,var(--o-border))] transition-[stroke] duration-300 delay-[240ms] group-hover:stroke-[var(--o-sage)]"
        strokeWidth="1.2"
      />
      <path d="M211 134 v7 h7" className="fill-none stroke-[var(--o-sage)]" strokeWidth="1.1" />
      <path d="M202 149 h10 M202 154 h10" className="stroke-[var(--o-sage)] opacity-60" strokeWidth="1" />
      <text x="228" y="149.5" className={`${labelBase} fill-[var(--o-text-muted)] delay-[240ms] group-hover:fill-[var(--o-sage)]`}>
        page: usability
      </text>
    </svg>
  );
}

const mcpClients = ["Claude Code", "Cursor", "Codex", "Claude Desktop", "VS Code", "Gemini CLI"];

/* Per-cell layout, accent, land order, and artifact. Copy comes from the
   dictionary and joins by id. */
const cellChrome: Record<string, { accent: string; span: string; delayMs: number }> = {
  pages: { accent: "var(--o-warm)", span: "sm:col-span-3", delayMs: 0 },
  graph: { accent: "var(--o-indigo)", span: "sm:col-span-3", delayMs: 90 },
  citations: { accent: "var(--o-warm)", span: "sm:col-span-3", delayMs: 180 },
  review: { accent: "var(--o-amber)", span: "sm:col-span-3", delayMs: 270 },
  nurture: { accent: "var(--o-sage)", span: "sm:col-span-2", delayMs: 360 },
  spaces: { accent: "var(--o-warm)", span: "sm:col-span-2", delayMs: 430 },
  git: { accent: "var(--o-warm)", span: "sm:col-span-2", delayMs: 500 },
  mcp: { accent: "var(--o-warm)", span: "sm:col-span-6", delayMs: 570 },
};

const cellArtifacts: Record<string, React.ReactNode> = {
  pages: (
    <div className="relative mx-auto h-36 w-[19rem]">
      {stackedPages.map((page) => (
        <div
          key={page.title}
          className={`absolute ${page.offset} ${page.fan} w-72 rounded-md border border-[var(--o-border)] bg-[var(--o-surface)] px-4 py-3 shadow-[0_4px_16px_rgba(26,26,46,0.06)] transition-all duration-300 ease-out`}
        >
          <p className="text-[13px] font-medium">{page.title}</p>
          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-[var(--o-text-muted)]">{page.cites} sources cited</p>
        </div>
      ))}
    </div>
  ),
  graph: <RecallGraph />,
  citations: (
    <div>
      <div className="rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)] p-3.5">
        <p className="font-mono text-[13px] text-[var(--o-text)]"># Architecture map</p>
        <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-[var(--o-text-secondary)]">
          Search writes go through the ingest daemon; the API crate only reads.
          <sup className="ml-0.5 font-medium text-[var(--o-warm)] transition-opacity duration-300 group-hover:opacity-100">[1]</sup>
        </p>
      </div>
      <div className="ml-6 h-5 w-px origin-top scale-y-50 bg-[var(--o-border)] transition-all duration-300 delay-[120ms] group-hover:scale-y-100 group-hover:bg-[var(--o-warm)]" />
      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
        <span className={`${chipBase} delay-[240ms] group-hover:border-[color-mix(in_srgb,var(--o-warm)_40%,var(--o-border))] group-hover:text-[var(--o-text)]`}>
          [1] mem_0142 · decision
        </span>
        <span className="text-[var(--o-text-muted)]">from</span>
        <span className={`${chipBase} text-[var(--o-text-secondary)] delay-[360ms] group-hover:border-[color-mix(in_srgb,var(--o-warm)_40%,var(--o-border))] group-hover:text-[var(--o-text)]`}>
          /docs/architecture
        </span>
      </div>
    </div>
  ),
  review: (
    <div className="rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)] p-3.5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-[var(--o-text-muted)] uppercase">
          <span className="size-1.5 rounded-full bg-[var(--o-amber)]" />
          contradiction
        </p>
        <span className="rounded border border-[var(--o-border)] px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-[var(--o-text-muted)] uppercase">
          low confidence
        </span>
      </div>
      <div className="mt-3 space-y-1.5 font-mono text-[12px]">
        <p className="text-[var(--o-text-secondary)] transition-colors duration-300 group-hover:text-[var(--o-text)]">
          new: &ldquo;staging deploys from main&rdquo;
        </p>
        <p className="text-[var(--o-text-muted)] transition-colors duration-300 delay-[130ms] group-hover:text-[var(--o-text-secondary)]">
          mem_0087: &ldquo;staging deploys from release branches&rdquo;
        </p>
      </div>
      <div className="mt-3 flex gap-2 font-mono text-[11px]">
        <span className={`${chipBase} delay-[260ms] group-hover:border-[color-mix(in_srgb,var(--o-amber)_45%,var(--o-border))] group-hover:text-[var(--o-text)]`}>
          supersede
        </span>
        <span className={`${chipBase} text-[var(--o-text-muted)] delay-[340ms] group-hover:border-[color-mix(in_srgb,var(--o-amber)_45%,var(--o-border))]`}>
          keep both
        </span>
      </div>
    </div>
  ),
  nurture: (
    <div className="space-y-1.5 font-mono text-[12px] text-[var(--o-text-secondary)]">
      <p className="transition-all duration-300 delay-[0ms] group-hover:translate-x-1 group-hover:text-[var(--o-text)]">
        <span className="text-[var(--o-sage)]">+</span> linked Dana to checkout redesign
      </p>
      <p className="transition-all duration-300 delay-[110ms] group-hover:translate-x-1 group-hover:text-[var(--o-text)]">
        <span className="text-[var(--o-warm)]">~</span> refreshed page: architecture map
      </p>
      <p className="transition-all duration-300 delay-[220ms] group-hover:opacity-40">
        <span className="text-[var(--o-text-muted)]">−</span> faded 3 stale memories
      </p>
    </div>
  ),
  spaces: (
    <div className="space-y-1.5 font-mono text-[12px]">
      <p className={`${chipBase} flex items-center gap-2 transition-all group-hover:-translate-y-0.5 group-hover:border-[color-mix(in_srgb,var(--o-warm)_45%,var(--o-border))]`}>
        <span className="size-1.5 rounded-full bg-[var(--o-warm)]" />
        space: work
        <span className="ml-auto text-[var(--o-text-muted)]">128</span>
      </p>
      <p className={`${chipBase} flex items-center gap-2 transition-all delay-[100ms] group-hover:border-[color-mix(in_srgb,var(--o-sage)_45%,var(--o-border))]`}>
        <span className="size-1.5 rounded-full bg-[var(--o-sage)]" />
        space: personal
        <span className="ml-auto text-[var(--o-text-muted)]">41</span>
      </p>
      <p className={`${chipBase} flex items-center gap-2 transition-all delay-[200ms] group-hover:translate-y-0.5 group-hover:border-[color-mix(in_srgb,var(--o-indigo)_45%,var(--o-border))]`}>
        <span className="size-1.5 rounded-full bg-[var(--o-indigo)]" />
        space: client-arden
        <span className="ml-auto text-[var(--o-text-muted)]">67</span>
      </p>
    </div>
  ),
  git: (
    <div className="relative space-y-1.5 font-mono text-[12px] text-[var(--o-text-secondary)]">
      <div aria-hidden="true" className="absolute top-1.5 bottom-1.5 left-[3px] w-px bg-[var(--o-border)]" />
      <p className="flex items-center gap-2.5">
        <span className="relative size-[7px] shrink-0 rounded-full border border-[var(--o-border)] bg-[var(--o-bg-alt)] transition-colors duration-300 group-hover:border-[var(--o-warm)] group-hover:bg-[var(--o-warm)]" />
        <span className="transition-transform duration-300 group-hover:translate-x-0.5"><span className="text-[var(--o-warm)]">a41f2c</span> distill: architecture map</span>
      </p>
      <p className="flex items-center gap-2.5">
        <span className="relative size-[7px] shrink-0 rounded-full border border-[var(--o-border)] bg-[var(--o-bg-alt)] transition-colors duration-300 delay-[110ms] group-hover:border-[var(--o-warm)] group-hover:bg-[var(--o-warm)]" />
        <span className="transition-transform duration-300 delay-[110ms] group-hover:translate-x-0.5"><span className="text-[var(--o-warm)]">9d03b7</span> capture: rollback lesson</span>
      </p>
      <p className="flex items-center gap-2.5">
        <span className="relative size-[7px] shrink-0 rounded-full border border-[var(--o-border)] bg-[var(--o-bg-alt)] transition-colors duration-300 delay-[220ms] group-hover:border-[var(--o-warm)] group-hover:bg-[var(--o-warm)]" />
        <span className="transition-transform duration-300 delay-[220ms] group-hover:translate-x-0.5"><span className="text-[var(--o-warm)]">3c88e1</span> handoff: session close</span>
      </p>
    </div>
  ),
  mcp: (
    <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="grid shrink-0 grid-cols-3 gap-1.5 font-mono text-[12px] sm:grid-cols-2">
        {mcpClients.map((client, index) => (
          <span
            key={client}
            className={`${chipBase} text-center text-[var(--o-text-secondary)] group-hover:border-[color-mix(in_srgb,var(--o-warm)_40%,var(--o-border))] group-hover:text-[var(--o-text)]`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            {client}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 140 120" preserveAspectRatio="none" className="hidden h-24 min-w-0 flex-1 sm:block" aria-hidden="true">
        {[12, 31, 50, 70, 89, 108].map((y, index) => (
          <path
            key={y}
            d={`M0 ${y} C 70 ${y}, 90 60, 140 60`}
            strokeWidth="1"
            className="fill-none stroke-[var(--o-border)] transition-[stroke] duration-300 group-hover:stroke-[color-mix(in_srgb,var(--o-warm)_55%,var(--o-border))]"
            style={{ transitionDelay: `${140 + index * 60}ms` }}
          />
        ))}
      </svg>
      <div className="shrink-0 text-center sm:text-left">
        <p className="font-mono text-[12px] text-[var(--o-text-muted)]">~/.wenlan</p>
        <span className="mt-1.5 inline-block rounded border border-[var(--o-warm)]/40 bg-[var(--o-glow-warm-bg)] px-2.5 py-1 font-mono text-[12px] text-[var(--o-warm)]">
          one shared memory
        </span>
        <p className="mt-1.5 font-mono text-[11px] text-[var(--o-text-muted)]">local daemon · plain files</p>
      </div>
    </div>
  ),
};

export function BentoSection({
  cells,
  title,
}: {
  readonly cells: readonly BentoCellCopy[];
  readonly title: string;
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
      { threshold: 0.1 },
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
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-6">
          {cells.map((cell) => {
            const chrome = cellChrome[cell.id];
            if (!chrome) return null;
            return (
              <BentoCell
                key={cell.id}
                accent={chrome.accent}
                className={chrome.span}
                landDelay={delay(chrome.delayMs)}
                pre={pre}
                title={cell.title}
                body={cell.body}
              >
                {cellArtifacts[cell.id]}
              </BentoCell>
            );
          })}
        </div>
      </div>
    </section>
  );
}
