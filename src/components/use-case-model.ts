import type { CSSProperties } from "react";
import type { HomeContent } from "@/i18n/content";

export type UseCasesCopy = HomeContent["useCases"];
export type UseCaseScenario = UseCasesCopy["scenarios"][number];

export type SourceReference = {
  readonly label: string;
  readonly detail: string;
};

type CaseAccentStyle = CSSProperties & {
  readonly "--case-accent": string;
};

const scenarioAccents: Record<string, string> = {
  "dev-codebase": "var(--o-warm)",
  "product-customers": "var(--o-sage)",
  "research-writing": "var(--o-indigo)",
  "learning-study": "var(--o-amber)",
} as const;

const scenarioSourceCounts: Record<string, readonly number[]> = {
  "dev-codebase": [10, 8, 6, 4],
  "product-customers": [9, 7, 6, 5],
  "research-writing": [12, 9, 7, 5],
  "learning-study": [8, 6, 5, 3],
} as const;

const fallbackSourceCounts = [7, 6, 5, 4] as const;

const evidenceTags: Record<string, readonly string[]> = {
  architecture: ["diagram", "data-flow", "owner"],
  "failed-paths": ["runbook", "release", "rollback"],
  "dependency-research": ["migration", "rollout", "cleanup"],
  "open-threads": ["integration", "adapter", "upstream"],
  "customer-voice": ["voice", "support", "sales"],
  "client-constraints": ["budget", "legal", "brand"],
  "decision-rationale": ["roadmap", "pricing", "why"],
  "follow-up-threads": ["owner", "meeting", "next-step"],
  "trusted-sources": ["paper", "docs", "quote"],
  "comparison-notes": ["compare", "claim", "change"],
  "outline-decisions": ["outline", "argument", "draft"],
  "stale-claims": ["stale", "verify", "public"],
  "concept-pages": ["concept", "source", "explained"],
  "prerequisite-links": ["builds-on", "link", "gap"],
  "review-notes": ["review", "wrong", "fixed"],
  "study-plan": ["plan", "order", "next"],
} as const;

const scenarioSources: Record<string, readonly SourceReference[]> = {
  "dev-codebase": [
    { label: "/docs/architecture", detail: "System Map" },
    { label: "/runbooks/release", detail: "Rollback" },
    { label: "/migrations/auth-v2", detail: "Rollout" },
    { label: "/integrations/search", detail: "Upstream" },
  ],
  "product-customers": [
    { label: "/calls/acme-q3", detail: "Client Call" },
    { label: "/notes/objections", detail: "Sales Notes" },
    { label: "/proposal/v4", detail: "Tradeoff" },
    { label: "CRM-184", detail: "Follow-up" },
  ],
  "research-writing": [
    { label: "/papers/attention", detail: "Paper" },
    { label: "/sources/docs", detail: "Docs" },
    { label: "/outline/next", detail: "Draft Plan" },
    { label: "CLAIM-07", detail: "Re-check" },
  ],
  "learning-study": [
    { label: "/papers/seiler-2010", detail: "Paper" },
    { label: "/notes/hr-zones", detail: "Concept" },
    { label: "/reviews/week-12", detail: "Review" },
    { label: "/plans/base-block", detail: "Plan" },
  ],
} as const;

export function accentForScenario(scenario: UseCaseScenario): string {
  return scenarioAccents[scenario.id] ?? "var(--o-warm)";
}

export function countsForScenario(scenario: UseCaseScenario): readonly number[] {
  return scenarioSourceCounts[scenario.id] ?? fallbackSourceCounts;
}

export function totalSourcesForScenario(scenario: UseCaseScenario): number {
  return countsForScenario(scenario).reduce((total, count) => total + count, 0);
}

export function caseAccentStyle(scenario: UseCaseScenario): CaseAccentStyle {
  return { "--case-accent": accentForScenario(scenario) };
}

export function tagsForEvidence(id: string): readonly string[] {
  return evidenceTags[id] ?? ["source", "note", "cite"];
}

export function sourcesForScenario(scenario: UseCaseScenario): readonly SourceReference[] {
  return scenarioSources[scenario.id] ?? [];
}
