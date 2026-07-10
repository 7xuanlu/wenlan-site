"use client";

import { useEffect, useState } from "react";

/**
 * Hero artifact: a page that visibly lives. Loops through the loop —
 * /capture arrives, /distill supersedes a stale claim, the page refreshes.
 * Each cycle rotates the specimen across domains (architecture, product
 * design) so the wiki reads domain-general, not code-only. The rotation
 * deliberately avoids the four use-case domains below the fold.
 * Reduced motion pins the finished state of the first specimen.
 * Mock data stays English in every locale: it depicts real tool output.
 */

const PHASE_MS = [2400, 1600, 2600, 3200, 600]; // rest, capture, distill, hold, fade

const SPECIMENS = [
  {
    title: "Architecture map",
    metaBefore: "9 sources · refreshed 2 sessions ago",
    metaAfter: "10 sources",
    capture: "“vector rerank shipped”",
    claimStable: "Search writes go through the ingest daemon; the API crate only reads.",
    claimStale: "Search is FTS5 keyword only.",
    claimFresh: "Search runs hybrid: FTS5 keyword plus DiskANN vector rerank.",
    links: ["search design", "runbooks"],
    linkNew: "evals",
    cites: [
      { label: "/docs/architecture", detail: "System map", accent: "var(--o-warm)" },
      { label: "/runbooks/release", detail: "Rollback", accent: "var(--o-sage)" },
    ],
    citeNew: { label: "/sessions/41", detail: "Capture" },
    nodes: ["Search design", "Release runbook"],
    nodeNew: "Evals",
  },
  {
    title: "Checkout redesign",
    metaBefore: "7 sources · refreshed 4 sessions ago",
    metaAfter: "8 sources",
    capture: "“usability round findings”",
    claimStable: "Guest checkout is the default; account creation moves to after purchase.",
    claimStale: "Most drop-off happens on the address form.",
    claimFresh: "Autofill fixed the address form; drop-off moved to the payment step.",
    links: ["design system", "copy"],
    linkNew: "usability",
    cites: [
      { label: "/design/checkout", detail: "Spec", accent: "var(--o-warm)" },
      { label: "/research/usability", detail: "Findings", accent: "var(--o-sage)" },
    ],
    citeNew: { label: "/sessions/58", detail: "Capture" },
    nodes: ["Design system", "Copy"],
    nodeNew: "Usability",
  },
];

function CiteN({ n }: { readonly n: number }) {
  return (
    <span className="ml-1 inline-block rounded border border-[var(--o-border-subtle)] bg-[var(--o-surface)] px-1 font-mono text-[8px] text-[var(--o-text-muted)]">
      {n}
    </span>
  );
}

function SourceSlip({ label, detail, accent }: { label: string; detail: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-[var(--o-border)] bg-[var(--o-card-bg)] px-3 py-2">
      <span className="size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
      <span className="truncate font-mono text-[10px] text-[var(--o-text-secondary)]">{label}</span>
      <span className="ml-auto shrink-0 font-mono text-[9px] tracking-wide text-[var(--o-text-muted)] uppercase">{detail}</span>
    </div>
  );
}

const linkChipStyle = {
  borderColor: "color-mix(in srgb, var(--o-indigo) 35%, transparent)",
  color: "var(--o-indigo)",
  background: "color-mix(in srgb, var(--o-indigo) 8%, transparent)",
};

function GraphNode({
  label,
  accent,
  className,
}: {
  label: string;
  accent: string;
  className: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-1.5 rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)] px-2.5 py-1.5 shadow-[0_2px_12px_rgba(26,26,46,0.06)] sm:flex ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
      <span className="font-serif text-xs whitespace-nowrap text-[var(--o-text-secondary)]">{label}</span>
    </div>
  );
}

export function HeroLivingPage() {
  const [phase, setPhase] = useState(0);
  const [specIndex, setSpecIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(3);
      return;
    }
    const timer = setTimeout(() => {
      if (phase === PHASE_MS.length - 1) {
        setSpecIndex((specIndex + 1) % SPECIMENS.length);
      }
      setPhase((phase + 1) % PHASE_MS.length);
    }, PHASE_MS[phase]);
    return () => clearTimeout(timer);
  }, [phase, specIndex]);

  const spec = SPECIMENS[specIndex];
  const capturing = phase === 1;
  const distilling = phase === 2;
  const distilled = phase === 2 || phase === 3;
  const fading = phase === 4;

  return (
    <div aria-hidden="true" className="relative mx-auto h-[30rem] w-full max-w-[32rem]">
      {/* The page's link neighborhood: nodes mirror the Links row; the graph grows at distill */}
      <svg
        viewBox="0 0 512 480"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full text-[var(--o-border)] sm:block"
      >
        {/* faint trails: the graph continues past the frame */}
        <g opacity="0.5">
          <circle cx="20" cy="140" r="2.5" fill="currentColor" />
          <path d="M 20 140 C 26 158, 40 175, 54 188" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" />
          <circle cx="60" cy="430" r="2.5" fill="currentColor" />
          <path d="M 60 430 C 56 412, 50 385, 46 358" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" />
        </g>
        <g className={`transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
          <path d="M 120 203 C 134 203, 148 206, 160 211" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 138 343 C 146 344, 154 346, 160 349" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
        <g className={`transition-opacity duration-700 ${distilled ? "opacity-100" : "opacity-0"}`}>
          <path d="M 148 106 C 154 114, 158 125, 160 136" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 100 118 C 92 140, 86 166, 84 190" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
      </svg>

      {/* The living page */}
      <div className="absolute top-6 right-0 w-[22rem]">
        {/* Event chips, one slot above the page */}
        <div
          className={`absolute -top-4 right-5 z-10 flex items-center gap-2 rounded-md border bg-[var(--o-bg-alt)] px-2.5 py-1.5 shadow-[0_4px_16px_rgba(26,26,46,0.10)] transition-all duration-500 ${
            capturing ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
          style={{ borderColor: "color-mix(in srgb, var(--o-sage) 45%, transparent)" }}
        >
          <span className="font-mono text-[9px] font-semibold text-[var(--o-sage)]">/capture</span>
          <span className="font-mono text-[9px] whitespace-nowrap text-[var(--o-text-secondary)]">{spec.capture}</span>
        </div>
        <div
          className={`absolute -top-4 right-5 z-10 flex items-center gap-2 rounded-md border bg-[var(--o-bg-alt)] px-2.5 py-1.5 shadow-[0_4px_16px_rgba(26,26,46,0.10)] transition-all duration-500 ${
            distilling ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
          style={{ borderColor: "color-mix(in srgb, var(--o-warm) 45%, transparent)" }}
        >
          <span className="font-mono text-[9px] font-semibold text-[var(--o-warm)]">/distill</span>
          <span className="font-mono text-[9px] text-[var(--o-text-secondary)]">superseding claim 2</span>
        </div>

        <article
          className={`rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-5 shadow-[var(--o-shadow-media)] transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <header className="flex items-center justify-between gap-3 border-b border-[var(--o-border-subtle)] pb-3">
            <h3 className="font-serif text-lg font-medium">{spec.title}</h3>
            <span className="rounded-full border border-[var(--o-warm)]/30 bg-[var(--o-glow-warm-bg)] px-2 py-0.5 font-mono text-[9px] tracking-wide text-[var(--o-warm)] uppercase">
              Source-backed
            </span>
          </header>
          <div className="relative h-4 pt-2.5">
            <p
              className={`absolute inset-x-0 font-mono text-[9px] text-[var(--o-text-muted)] transition-opacity duration-500 ${
                distilled ? "opacity-0" : "opacity-100"
              }`}
            >
              {spec.metaBefore}
            </p>
            <p
              className={`absolute inset-x-0 font-mono text-[9px] text-[var(--o-text-muted)] transition-opacity duration-500 ${
                distilled ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-[var(--o-warm)] align-middle" />
              <span className="text-[var(--o-warm)]">refreshed just now</span> · {spec.metaAfter}
            </p>
          </div>
          <div className="space-y-2 pt-3.5 text-[11px] leading-relaxed text-[var(--o-text-secondary)]">
            <p>
              {spec.claimStable}
              <CiteN n={1} />
            </p>
            <p
              className={`transition-all duration-500 ${
                distilled ? "text-[var(--o-text-muted)] line-through decoration-[var(--o-text-dim)]" : ""
              }`}
            >
              {spec.claimStale}
              <CiteN n={2} />
              <span
                className={`ml-1.5 inline-block rounded border px-1 font-mono text-[8px] tracking-wide uppercase transition-opacity duration-500 ${
                  distilled ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  borderColor: "color-mix(in srgb, var(--o-warm) 40%, transparent)",
                  color: "var(--o-warm)",
                }}
              >
                superseded
              </span>
            </p>
            <div
              className={`grid transition-all duration-500 ${
                distilled ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden">
                {spec.claimFresh}
                <CiteN n={3} />
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-3.5">
            <span className="mr-1 font-mono text-[9px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">Links</span>
            {spec.links.map((term) => (
              <span key={term} className="rounded border px-1.5 py-0.5 font-mono text-[9px]" style={linkChipStyle}>
                [[{term}]]
              </span>
            ))}
            <span
              className={`rounded border px-1.5 py-0.5 font-mono text-[9px] transition-all duration-500 ${
                distilled ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={linkChipStyle}
            >
              [[{spec.linkNew}]]
            </span>
          </div>
          <footer className="mt-4 border-t border-[var(--o-border-subtle)] pt-3">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--o-text-muted)] uppercase">Cites</p>
            <div className="mt-2 space-y-1.5">
              {spec.cites.map((cite) => (
                <SourceSlip key={cite.label} label={cite.label} detail={cite.detail} accent={cite.accent} />
              ))}
              <div
                className={`grid transition-all duration-500 ${
                  distilled ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <SourceSlip label={spec.citeNew.label} detail={spec.citeNew.detail} accent="var(--o-indigo)" />
                </div>
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* Linked pages: same titles as the Links row inside the card; right edges pinned to the edge anchors */}
      <GraphNode
        label={spec.nodes[0]}
        accent="var(--o-warm)"
        className={`top-[190px] right-[392px] transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      />
      <GraphNode
        label={spec.nodes[1]}
        accent="var(--o-sage)"
        className={`top-[330px] right-[374px] transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      />
      <GraphNode
        label={spec.nodeNew}
        accent="var(--o-indigo)"
        className={`top-[92px] right-[364px] transition-all duration-700 ${
          distilled ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      />
    </div>
  );
}
