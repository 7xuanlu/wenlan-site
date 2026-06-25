"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useScrollProgress } from "@/app/use-scroll-reveal";
import type { CoreTextSection } from "@/i18n/content";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function VisualFrame({
  children,
  className = "",
  visualFilter = "var(--o-visual-filter)",
}: {
  children: ReactNode;
  className?: string;
  visualFilter?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`wenlan-visual-frame relative min-h-[22rem] overflow-hidden rounded-2xl border border-[var(--o-visual-border)] bg-[linear-gradient(145deg,var(--o-visual-card-bg),transparent_62%)] shadow-[0_14px_44px_rgba(0,0,0,0.13)] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.035),transparent)]" />
      <div className="relative h-full min-h-[22rem]" style={{ filter: visualFilter }}>
        {children}
      </div>
    </div>
  );
}

function ProblemVisual({ progress }: { progress: number }) {
  const scatter = remap(progress, 0.08, 0.68, 0, 1);
  const dim = remap(progress, 0.24, 0.78, 0.12, 0.34);

  return (
    <VisualFrame visualFilter="var(--o-visual-filter-early)">
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cold-context-thread" x1="104" y1="210" x2="536" y2="210">
            <stop stopColor="var(--o-text-dim)" stopOpacity="0" />
            <stop offset="0.34" stopColor="var(--o-warm)" stopOpacity="0.42" />
            <stop offset="0.66" stopColor="var(--o-indigo)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--o-text-dim)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <path d="M112 144 C184 144 214 196 282 196" stroke="url(#cold-context-thread)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 12" strokeDashoffset={42 - scatter * 58} opacity={0.38 + scatter * 0.34}>
          <animate attributeName="stroke-dashoffset" values="42;-46" dur="12s" repeatCount="indefinite" />
        </path>
        <path d="M112 276 C182 276 214 224 282 224" stroke="url(#cold-context-thread)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 12" strokeDashoffset={-6 - scatter * 58} opacity={0.34 + scatter * 0.32}>
          <animate attributeName="stroke-dashoffset" values="-6;-94" dur="13s" repeatCount="indefinite" />
        </path>
        <path d="M358 196 C422 196 454 142 530 142" stroke="url(#cold-context-thread)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" opacity={0.22 + scatter * 0.24}>
          <animate attributeName="stroke-dashoffset" values="22;-66" dur="14s" repeatCount="indefinite" />
        </path>
        <path d="M358 224 C424 224 454 276 530 276" stroke="url(#cold-context-thread)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" opacity={0.2 + scatter * 0.22}>
          <animate attributeName="stroke-dashoffset" values="-18;-106" dur="15s" repeatCount="indefinite" />
        </path>
        <rect x="276" y="154" width="88" height="112" rx="26" fill="var(--o-bg)" fillOpacity="0.72" stroke="var(--o-indigo)" strokeOpacity="0.26" />
        <path d="M304 184 H336" stroke="var(--o-warm)" strokeOpacity="0.48" strokeWidth="6" strokeLinecap="round" />
        <path d="M298 210 H344" stroke="var(--o-text-secondary)" strokeOpacity={0.16 + dim} strokeWidth="6" strokeLinecap="round" />
        <path d="M306 236 H334" stroke="var(--o-indigo)" strokeOpacity={0.18 + dim} strokeWidth="6" strokeLinecap="round" />
      </svg>

      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-xl border border-[var(--o-warm)]/18 bg-[var(--o-bg)]/56 shadow-[0_14px_48px_rgba(0,0,0,0.12)]"
          style={{
            left: `${70 + (i % 2) * 28}px`,
            top: `${78 + i * 46}px`,
            width: `${118 - (i % 3) * 16}px`,
            height: "38px",
            opacity: 0.32 + scatter * (0.36 - i * 0.02),
            transform: `translateX(${scatter * (8 + i * 2)}px) rotate(${-5 + i * 2}deg)`,
            animation: `problem-card-drift-left ${8 + i * 0.7}s ease-in-out ${i * 0.35}s infinite`,
          }}
        >
          <div className="mt-3 ml-4 h-1.5 w-2/3 rounded-full bg-[var(--o-text-secondary)]/24" />
          <div className="mt-2 ml-4 h-1.5 w-1/2 rounded-full bg-[var(--o-warm)]/30" />
        </div>
      ))}

      <div className="absolute right-[4.5rem] top-20 grid grid-cols-2 gap-3 sm:right-24">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[4.5rem] w-28 rounded-xl border border-[var(--o-indigo)]/16 bg-[var(--o-bg)]/42 p-4"
            style={{
              opacity: 0.22 + scatter * (0.34 - i * 0.03),
              transform: `translateY(${(1 - scatter) * (10 + i * 2)}px)`,
              animation: `problem-card-drift-right ${9 + i * 0.8}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            <div className="h-1.5 w-12 rounded-full bg-[var(--o-text-secondary)]/20" />
            <div className="mt-2 h-1.5 w-16 rounded-full bg-[var(--o-indigo)]/22" />
          </div>
        ))}
      </div>

      <div
        className="absolute left-1/2 top-1/2 h-[8.5rem] w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[var(--o-indigo)]/22 bg-[var(--o-bg)]/24"
        style={{ animation: "problem-chat-pulse 5.6s ease-in-out infinite" }}
      />
    </VisualFrame>
  );
}

function CarryForwardVisual({ progress }: { progress: number }) {
  const cycle = remap(progress, 0.08, 0.7, 0, 1);

  return (
    <VisualFrame visualFilter="var(--o-visual-filter-soft)">
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="handoff-cycle" x1="96" y1="210" x2="544" y2="210">
            <stop stopColor="var(--o-warm)" stopOpacity="0.62" />
            <stop offset="0.5" stopColor="var(--o-indigo)" stopOpacity="0.58" />
            <stop offset="1" stopColor="var(--o-sage)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <path
          d="M320 76 C450 76 540 130 540 210 C540 292 450 344 320 344 C190 344 100 292 100 210 C100 130 190 76 320 76"
          stroke="var(--o-border)"
          strokeOpacity="0.34"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          id="handoff-cycle-path"
          d="M320 76 C450 76 540 130 540 210 C540 292 450 344 320 344 C190 344 100 292 100 210 C100 130 190 76 320 76"
          stroke="url(#handoff-cycle)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="34 18"
          strokeDashoffset={18 - cycle * 38}
          opacity={0.14 + cycle * 0.22}
        >
          <animate attributeName="stroke-dashoffset" values="0;-104" dur="10s" repeatCount="indefinite" />
        </path>
        <g>
          <circle cx="320" cy="76" r="30" fill="var(--o-bg)" fillOpacity="0.8" stroke="var(--o-warm)" strokeOpacity={0.34 + cycle * 0.22} />
          <rect x="305" y="64" width="30" height="22" rx="6" stroke="var(--o-warm)" strokeOpacity={0.42 + cycle * 0.2} fill="var(--o-warm)" fillOpacity="0.05" />
          <path d="M312 74 H326" stroke="var(--o-warm)" strokeOpacity={0.46 + cycle * 0.22} strokeWidth="3" strokeLinecap="round" />
          <path d="M312 80 H321" stroke="var(--o-text-secondary)" strokeOpacity={0.18 + cycle * 0.12} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g>
          <circle cx="540" cy="210" r="30" fill="var(--o-bg)" fillOpacity="0.82" stroke="var(--o-indigo)" strokeOpacity={0.32 + cycle * 0.24} />
          <path d="M527 199 H535 M527 199 V207 M553 199 H545 M553 199 V207 M527 221 H535 M527 221 V213 M553 221 H545 M553 221 V213" stroke="var(--o-indigo)" strokeOpacity={0.28 + cycle * 0.2} strokeWidth="3" strokeLinecap="round" />
          <path d="M532 211 L538 217 L550 204" stroke="var(--o-sage)" strokeOpacity={0.42 + cycle * 0.24} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g>
          <circle cx="320" cy="344" r="30" fill="var(--o-bg)" fillOpacity="0.82" stroke="var(--o-sage)" strokeOpacity={0.32 + cycle * 0.24} />
          <path d="M309 330 H327 L333 336 V358 H309 Z" stroke="var(--o-sage)" strokeOpacity={0.4 + cycle * 0.22} fill="var(--o-sage)" fillOpacity="0.05" strokeLinejoin="round" />
          <path d="M327 330 V336 H333" stroke="var(--o-sage)" strokeOpacity={0.4 + cycle * 0.2} strokeLinejoin="round" />
          <path d="M315 344 H327" stroke="var(--o-text-secondary)" strokeOpacity={0.18 + cycle * 0.12} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M315 351 H324" stroke="var(--o-warm)" strokeOpacity={0.24 + cycle * 0.14} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g>
          <circle cx="100" cy="210" r="30" fill="var(--o-bg)" fillOpacity="0.82" stroke="var(--o-warm)" strokeOpacity={0.26 + cycle * 0.2} />
          <rect x="91" y="199" width="22" height="20" rx="5" stroke="var(--o-warm)" strokeOpacity={0.38 + cycle * 0.18} fill="var(--o-warm)" fillOpacity="0.04" />
          <path d="M79 210 H100" stroke="var(--o-warm)" strokeOpacity={0.42 + cycle * 0.2} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M94 204 L100 210 L94 216" stroke="var(--o-warm)" strokeOpacity={0.42 + cycle * 0.2} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M96 214 H108" stroke="var(--o-text-secondary)" strokeOpacity={0.16 + cycle * 0.12} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {[
          { x: 320, y: 36, label: "START" },
          { x: 540, y: 263, label: "CAPTURE" },
          { x: 320, y: 394, label: "HANDOFF" },
          { x: 100, y: 263, label: "RESUME" },
        ].map((item) => (
          <text
            key={item.label}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            letterSpacing="2"
            fill="var(--o-text-secondary)"
            opacity={0.6 + cycle * 0.16}
          >
            {item.label}
          </text>
        ))}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 w-44 rounded-2xl border border-[var(--o-warm)]/28 bg-[var(--o-bg)]/66 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
        style={{
          opacity: 0.78 + cycle * 0.18,
          transform: `translate(-50%, -50%) scale(${0.96 + cycle * 0.04})`,
          boxShadow: "0 18px 64px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded-full border border-[var(--o-warm)]/30 bg-[var(--o-warm)]/10" />
          <div className="h-2 w-16 rounded-full bg-[var(--o-warm)]/48" />
        </div>
        <div className="mt-5 space-y-3">
          <div className="h-1.5 rounded-full bg-[var(--o-text-secondary)]/30" />
          <div className="h-1.5 w-10/12 rounded-full bg-[var(--o-text-secondary)]/24" />
          <div className="h-1.5 w-8/12 rounded-full bg-[var(--o-sage)]/36" />
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-5 w-5 rounded-full border border-[var(--o-warm)]/28 bg-[var(--o-warm)]/10" />
          <div className="h-5 w-12 rounded-full border border-[var(--o-indigo)]/18 bg-[var(--o-indigo)]/8" />
        </div>
      </div>
    </VisualFrame>
  );
}

function DistilleryVisual({ progress }: { progress: number }) {
  const refine = remap(progress, 0.08, 0.68, 0, 1);
  const drift = remap(progress, 0.12, 0.72, 18, 0);
  const flow = remap(progress, 0.18, 0.72, 0, 1);

  return (
    <VisualFrame visualFilter="var(--o-visual-filter-early)">
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="workbench-flow" x1="92" y1="210" x2="548" y2="210">
            <stop stopColor="var(--o-warm)" stopOpacity="0.48" />
            <stop offset="0.55" stopColor="var(--o-indigo)" stopOpacity="0.34" />
            <stop offset="1" stopColor="var(--o-sage)" stopOpacity="0.48" />
          </linearGradient>
        </defs>

        <g opacity={0.28 + refine * 0.42} transform={`translate(${drift * -0.55} 0)`}>
          <rect x="72" y="104" width="118" height="46" rx="11" fill="var(--o-bg)" fillOpacity="0.58" stroke="var(--o-warm)" strokeOpacity="0.18" />
          <path d="M92 122 H158" stroke="var(--o-text-secondary)" strokeOpacity="0.2" strokeWidth="5" strokeLinecap="round" />
          <path d="M92 137 H136" stroke="var(--o-warm)" strokeOpacity="0.32" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g opacity={0.24 + refine * 0.36} transform={`translate(${drift * -0.35} 0)`}>
          <rect x="92" y="186" width="118" height="46" rx="11" fill="var(--o-bg)" fillOpacity="0.54" stroke="var(--o-indigo)" strokeOpacity="0.14" />
          <path d="M112 204 H174" stroke="var(--o-text-secondary)" strokeOpacity="0.2" strokeWidth="5" strokeLinecap="round" />
          <path d="M112 219 H154" stroke="var(--o-indigo)" strokeOpacity="0.26" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g opacity={0.22 + refine * 0.34} transform={`translate(${drift * -0.2} 0)`}>
          <rect x="78" y="268" width="118" height="46" rx="11" fill="var(--o-bg)" fillOpacity="0.52" stroke="var(--o-warm)" strokeOpacity="0.14" />
          <path d="M98 286 H160" stroke="var(--o-text-secondary)" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round" />
          <path d="M98 301 H142" stroke="var(--o-warm)" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
        </g>

        <path
          d="M190 127 C226 127 226 130 254 130"
          stroke="url(#workbench-flow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 12"
          strokeDashoffset={36 - flow * 52}
          opacity={0.22 + flow * 0.3}
        >
          <animate attributeName="stroke-dashoffset" values="36;-52" dur="9s" repeatCount="indefinite" />
        </path>
        <path
          d="M210 209 C235 209 234 210 254 210"
          stroke="url(#workbench-flow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 12"
          strokeDashoffset={16 - flow * 52}
          opacity={0.2 + flow * 0.28}
        >
          <animate attributeName="stroke-dashoffset" values="16;-72" dur="9.5s" repeatCount="indefinite" />
        </path>
        <path d="M196 291 C228 291 230 290 254 290" stroke="url(#workbench-flow)" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 12" strokeDashoffset={-4 - flow * 52} opacity={0.18 + flow * 0.26}>
          <animate attributeName="stroke-dashoffset" values="-4;-92" dur="10s" repeatCount="indefinite" />
        </path>

        <rect x="246" y="78" width="250" height="264" rx="28" fill="var(--o-bg)" fillOpacity="0.42" stroke="var(--o-border)" strokeOpacity="0.72" />
        <path d="M278 165 H464" stroke="var(--o-border-subtle)" strokeOpacity="0.9" strokeWidth="1.5" />
        <path d="M278 251 H464" stroke="var(--o-border-subtle)" strokeOpacity="0.9" strokeWidth="1.5" />

        <g opacity={0.42 + refine * 0.38}>
          <rect x="292" y="108" width="74" height="30" rx="9" fill="var(--o-bg)" fillOpacity="0.62" stroke="var(--o-warm)" strokeOpacity="0.2" />
          <rect x="314" y="124" width="74" height="30" rx="9" fill="var(--o-bg)" fillOpacity="0.58" stroke="var(--o-warm)" strokeOpacity="0.18" />
          <path d="M310 122 H348 M332 138 H370" stroke="var(--o-warm)" strokeOpacity="0.36" strokeWidth="4" strokeLinecap="round" />
          <path d="M378 130 C392 130 400 130 412 130" stroke="var(--o-text-muted)" strokeOpacity="0.24" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="418" y="110" width="40" height="40" rx="12" fill="var(--o-sage)" fillOpacity="0.08" stroke="var(--o-sage)" strokeOpacity="0.24" />
          <path d="M430 130 H446" stroke="var(--o-sage)" strokeOpacity="0.46" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g opacity={0.38 + refine * 0.42}>
          <circle cx="302" cy="208" r="8" fill="var(--o-indigo)" fillOpacity="0.28" />
          <circle cx="358" cy="188" r="8" fill="var(--o-indigo)" fillOpacity="0.22" />
          <circle cx="392" cy="226" r="8" fill="var(--o-sage)" fillOpacity="0.26" />
          <path d="M310 205 L350 191 M365 194 L386 221 M310 212 L384 225" stroke="var(--o-indigo)" strokeOpacity="0.24" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="438" cy="208" r="24" fill="var(--o-bg)" fillOpacity="0.48" stroke="var(--o-sage)" strokeOpacity="0.22">
            <animate attributeName="r" values="24;26;24" dur="4.8s" repeatCount="indefinite" />
          </circle>
          <path d="M428 209 L436 217 L450 199" stroke="var(--o-sage)" strokeOpacity="0.48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g opacity={0.4 + refine * 0.38}>
          <path d="M296 286 H392" stroke="var(--o-text-secondary)" strokeOpacity="0.22" strokeWidth="6" strokeLinecap="round" />
          <path d="M294 285 L396 285" stroke="var(--o-warm)" strokeOpacity="0.34" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M296 306 H422" stroke="var(--o-sage)" strokeOpacity="0.42" strokeWidth="7" strokeLinecap="round" />
          <path d="M440 283 C448 283 454 289 454 297 C454 305 448 311 440 311" stroke="var(--o-sage)" strokeOpacity="0.34" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M440 311 L445 305 M440 311 L447 315" stroke="var(--o-sage)" strokeOpacity="0.34" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g
          opacity={0.42 + refine * 0.42}
          transform={`translate(${drift * 0.35} 0)`}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
          letterSpacing="1.2"
        >
          <rect x="506" y="118" width="100" height="42" rx="12" fill="var(--o-bg)" fillOpacity="0.62" stroke="var(--o-sage)" strokeOpacity="0.22" />
          <path d="M520 139 H536" stroke="var(--o-sage)" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
          <text x="569" y="143" fill="var(--o-text-secondary)" opacity="0.66" textAnchor="middle">MERGED</text>

          <rect x="500" y="190" width="108" height="44" rx="13" fill="var(--o-bg)" fillOpacity="0.64" stroke="var(--o-sage)" strokeOpacity="0.24" />
          <path d="M516 212 H532 M532 212 H548" stroke="var(--o-sage)" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
          <text x="578" y="216" fill="var(--o-text-secondary)" opacity="0.68" textAnchor="middle">LINKED</text>

          <rect x="506" y="272" width="102" height="42" rx="12" fill="var(--o-bg)" fillOpacity="0.62" stroke="var(--o-sage)" strokeOpacity="0.22" />
          <path d="M520 289 H536 M520 298 H531" stroke="var(--o-sage)" strokeOpacity="0.52" strokeWidth="3" strokeLinecap="round" />
          <text x="573" y="298" fill="var(--o-text-secondary)" opacity="0.66" textAnchor="middle">REFINED</text>
        </g>
      </svg>
    </VisualFrame>
  );
}

function HumanControlVisual({ progress }: { progress: number }) {
  const reveal = remap(progress, 0.08, 0.68, 0, 1);
  const slide = remap(progress, 0.12, 0.7, 18, 0);

  return (
    <VisualFrame>
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="control-pointer" x1="188" y1="210" x2="432" y2="210">
            <stop stopColor="var(--o-indigo)" stopOpacity="0.44" />
            <stop offset="1" stopColor="var(--o-sage)" stopOpacity="0.44" />
          </linearGradient>
        </defs>

        <path
          d="M214 158 C268 148 306 134 358 132"
          stroke="url(#control-pointer)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 12"
          strokeDashoffset={34 - reveal * 56}
          opacity={0.18 + reveal * 0.32}
        >
          <animate attributeName="stroke-dashoffset" values="34;-54" dur="10s" repeatCount="indefinite" />
        </path>
        <path
          d="M214 214 C276 214 300 214 358 214"
          stroke="url(#control-pointer)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 12"
          strokeDashoffset={8 - reveal * 56}
          opacity={0.16 + reveal * 0.3}
        >
          <animate attributeName="stroke-dashoffset" values="8;-80" dur="10.5s" repeatCount="indefinite" />
        </path>
        <path
          d="M214 268 C268 280 304 296 358 298"
          stroke="url(#control-pointer)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 12"
          strokeDashoffset={-18 - reveal * 56}
          opacity={0.14 + reveal * 0.28}
        >
          <animate attributeName="stroke-dashoffset" values="-18;-106" dur="11s" repeatCount="indefinite" />
        </path>

        <g opacity={0.46 + reveal * 0.36} transform={`translate(${-slide * 0.35} 0)`}>
          <ellipse cx="164" cy="132" rx="58" ry="20" fill="var(--o-bg)" fillOpacity="0.62" stroke="var(--o-indigo)" strokeOpacity="0.26" />
          <path d="M106 132 V250 C106 262 132 272 164 272 C196 272 222 262 222 250 V132" fill="var(--o-bg)" fillOpacity="0.42" stroke="var(--o-indigo)" strokeOpacity="0.22" />
          <ellipse cx="164" cy="250" rx="58" ry="20" fill="var(--o-bg)" fillOpacity="0.46" stroke="var(--o-indigo)" strokeOpacity="0.2" />
          <path d="M118 166 C142 180 188 180 210 166" stroke="var(--o-text-secondary)" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
          <path d="M118 204 C142 218 188 218 210 204" stroke="var(--o-text-secondary)" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />
          <circle cx="146" cy="134" r="5" fill="var(--o-indigo)" fillOpacity="0.36" />
          <circle cx="172" cy="126" r="5" fill="var(--o-indigo)" fillOpacity="0.28" />
          <circle cx="188" cy="142" r="5" fill="var(--o-sage)" fillOpacity="0.34" />
          <path d="M151 133 L167 128 M176 129 L184 138" stroke="var(--o-text-muted)" strokeOpacity="0.28" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g opacity={0.48 + reveal * 0.36} transform={`translate(${slide * 0.25} 0)`}>
          <rect x="356" y="82" width="156" height="242" rx="18" fill="var(--o-bg)" fillOpacity="0.68" stroke="var(--o-border)" />
          <path d="M472 82 L512 122 H482 C476 122 472 118 472 112 Z" fill="var(--o-sage)" fillOpacity="0.06" stroke="var(--o-border-subtle)" />
          <path d="M386 126 H456" stroke="var(--o-warm)" strokeOpacity="0.42" strokeWidth="7" strokeLinecap="round" />
          <path d="M386 150 H468" stroke="var(--o-text-secondary)" strokeOpacity="0.22" strokeWidth="5" strokeLinecap="round" />
          <path d="M386 176 H468" stroke="var(--o-text-secondary)" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round" />
          <path d="M386 202 H454" stroke="var(--o-sage)" strokeOpacity="0.34" strokeWidth="6" strokeLinecap="round" />
          <path d="M386 238 H468" stroke="var(--o-text-secondary)" strokeOpacity="0.2" strokeWidth="5" strokeLinecap="round" />
          <path d="M384 237 L472 237" stroke="var(--o-warm)" strokeOpacity="0.24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M386 262 H474" stroke="var(--o-sage)" strokeOpacity="0.38" strokeWidth="6" strokeLinecap="round" />
          <circle cx="370" cy="176" r="4" fill="var(--o-indigo)" fillOpacity="0.36" />
          <circle cx="370" cy="202" r="4" fill="var(--o-sage)" fillOpacity="0.36" />
          <circle cx="370" cy="262" r="4" fill="var(--o-sage)" fillOpacity="0.38" />
        </g>
      </svg>

      <div
        className="absolute left-[5.2rem] bottom-[4.2rem] grid w-40 grid-cols-2 gap-2 rounded-2xl border border-[var(--o-indigo)]/14 bg-[var(--o-bg)]/42 p-3 shadow-[0_16px_54px_rgba(0,0,0,0.1)]"
        style={{
          opacity: 0.34 + reveal * 0.36,
          transform: `translateX(${-slide * 0.2}px)`,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded-lg border border-[var(--o-indigo)]/12 bg-[var(--o-indigo)]/5 px-2 py-3">
            <div className="h-1.5 rounded-full bg-[var(--o-indigo)]/24" />
          </div>
        ))}
      </div>
      <div
        className="absolute right-[5rem] bottom-[4.35rem] flex w-44 gap-2 rounded-2xl border border-[var(--o-sage)]/16 bg-[var(--o-bg)]/44 p-3 shadow-[0_16px_54px_rgba(0,0,0,0.1)]"
        style={{
          opacity: 0.34 + reveal * 0.38,
          transform: `translateX(${slide * 0.22}px)`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-8 flex-1 rounded-lg border border-[var(--o-sage)]/14 bg-[var(--o-sage)]/6 px-2 py-3">
            <div className="h-1.5 rounded-full bg-[var(--o-sage)]/28" />
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

function CompoundVisual({ progress }: { progress: number }) {
  const lift = remap(progress, 0.08, 0.68, 28, 0);
  const reveal = remap(progress, 0.16, 0.74, 0.3, 1);

  return (
    <VisualFrame>
      <div className="absolute left-8 top-12 flex w-[42%] flex-col gap-4 sm:left-12">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-12 rounded-xl border border-[var(--o-border-subtle)] bg-[var(--o-bg)]/38"
            style={{
              opacity: reveal - i * 0.1,
              transform: `translateY(${lift + i * 2}px)`,
            }}
          >
            <div className="mt-4 ml-4 h-1.5 w-2/3 rounded-full bg-[var(--o-text-secondary)]/25" />
            <div className="mt-2 ml-4 h-1.5 w-1/2 rounded-full bg-[var(--o-warm)]/30" />
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M260 110 C318 110 326 174 390 174 C442 174 454 132 514 132"
          stroke="var(--o-warm)"
          strokeOpacity={0.18 + reveal * 0.42}
          strokeWidth="2"
          strokeDasharray="6 10"
        >
          <animate attributeName="stroke-dashoffset" values="0;-64" dur="12s" repeatCount="indefinite" />
        </path>
        <path
          d="M260 210 C330 210 336 242 396 242 C446 242 462 224 514 224"
          stroke="var(--o-indigo)"
          strokeOpacity={0.18 + reveal * 0.42}
          strokeWidth="2"
          strokeDasharray="6 10"
        >
          <animate attributeName="stroke-dashoffset" values="-20;-84" dur="13s" repeatCount="indefinite" />
        </path>
        <path
          d="M260 310 C326 310 344 284 398 284 C448 284 468 326 514 326"
          stroke="var(--o-sage)"
          strokeOpacity={0.18 + reveal * 0.36}
          strokeWidth="2"
          strokeDasharray="6 10"
        >
          <animate attributeName="stroke-dashoffset" values="-40;-104" dur="14s" repeatCount="indefinite" />
        </path>
      </svg>

      <div
        className="absolute right-8 top-16 w-[46%] rounded-2xl border border-[var(--o-border)] bg-[var(--o-bg)]/66 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:right-12 sm:p-6"
        style={{
          opacity: reveal,
          transform: `translateY(${lift * 0.4}px)`,
        }}
      >
        <div className="mb-5 h-2 w-24 rounded-full bg-[var(--o-warm)]/45" />
        <div className="space-y-3">
          <div className="h-2 rounded-full bg-[var(--o-text-secondary)]/30" />
          <div className="h-2 w-11/12 rounded-full bg-[var(--o-text-secondary)]/24" />
          <div className="h-2 w-4/5 rounded-full bg-[var(--o-text-secondary)]/18" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-lg border border-[var(--o-warm)]/20 bg-[var(--o-warm)]/8" />
          <div className="h-14 rounded-lg border border-[var(--o-indigo)]/20 bg-[var(--o-indigo)]/8" />
          <div className="h-14 rounded-lg border border-[var(--o-sage)]/20 bg-[var(--o-sage)]/8" />
        </div>
      </div>
    </VisualFrame>
  );
}

type TextSectionProps = {
  copy: CoreTextSection;
};

export function ProblemSection({ copy }: TextSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const isMobile = useIsMobile();

  const opacity = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 0, 1);
  const slide = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 28, 0);

  return (
    <section ref={ref} className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid min-h-[84svh] max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          className="max-w-xl"
          style={{ opacity, transform: `translateY(${slide}px)` }}
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {copy.body}
          </p>
          <p className="mt-8 max-w-sm border-l border-[var(--o-warm)]/40 pl-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
            {copy.note}
          </p>
        </div>

        <ProblemVisual progress={progress} />
      </div>
    </section>
  );
}

export function SolutionSection({ copy }: TextSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const isMobile = useIsMobile();

  const opacity = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 0, 1);
  const slide = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 28, 0);

  return (
    <section ref={ref} className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid min-h-[84svh] max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="order-2 lg:order-1">
          <CarryForwardVisual progress={progress} />
        </div>

        <div
          className="order-1 max-w-xl lg:order-2 lg:ml-auto"
          style={{ opacity, transform: `translateY(${slide}px)` }}
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {copy.body}
          </p>
          <p className="mt-8 max-w-sm border-l border-[var(--o-indigo)]/40 pl-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MemoryDistillerySection({ copy }: TextSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const isMobile = useIsMobile();

  const opacity = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 0, 1);
  const slide = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 28, 0);

  return (
    <section ref={ref} className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid min-h-[84svh] max-w-6xl items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <div
          className="max-w-xl"
          style={{ opacity, transform: `translateY(${slide}px)` }}
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {copy.body}
          </p>
          <p className="mt-8 max-w-sm border-l border-[var(--o-warm)]/45 pl-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
            {copy.note}
          </p>
        </div>

        <DistilleryVisual progress={progress} />
      </div>
    </section>
  );
}

export function HumanControlSection({ copy }: TextSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const isMobile = useIsMobile();

  const opacity = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 0, 1);
  const slide = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 28, 0);

  return (
    <section ref={ref} className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid min-h-[84svh] max-w-6xl items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="order-2 lg:order-1">
          <HumanControlVisual progress={progress} />
        </div>

        <div
          className="order-1 max-w-xl lg:order-2 lg:ml-auto"
          style={{ opacity, transform: `translateY(${slide}px)` }}
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {copy.body}
          </p>
          <p className="mt-8 max-w-sm border-l border-[var(--o-sage)]/50 pl-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FeatureSection({ copy }: TextSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const isMobile = useIsMobile();

  const opacity = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 0, 1);
  const slide = remap(progress, isMobile ? 0 : 0.04, isMobile ? 0.38 : 0.32, 28, 0);

  return (
    <section ref={ref} className="border-t border-[var(--o-border-subtle)] px-6 py-20 sm:py-24">
      <div className="mx-auto grid min-h-[84svh] max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div
          className="max-w-xl"
          style={{ opacity, transform: `translateY(${slide}px)` }}
        >
          <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--o-text-secondary)] sm:text-lg">
            {copy.body}
          </p>
          <p className="mt-8 max-w-sm border-l border-[var(--o-sage)]/50 pl-4 text-sm leading-relaxed text-[var(--o-text-muted)]">
            {copy.note}
          </p>
        </div>

        <CompoundVisual progress={progress} />
      </div>
    </section>
  );
}
