#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(import.meta.dirname, "..");
const FROZEN_START = "<!-- FROZEN-GOAL-CONTRACT:START -->";
const FROZEN_END = "<!-- FROZEN-GOAL-CONTRACT:END -->";
const EXPECTED_FROZEN_SHA256 =
  "65ce42e862dd0f7b45dffef438909ac62ab755d8c911485e6bca3e9d4ffe0d67";
const DAY_MS = 24 * 60 * 60 * 1000;
const CAMPAIGN_WINDOW_ANCHOR = new Date("2026-07-18T00:00:00.000Z");
const CAMPAIGN_DEADLINE = new Date("2026-08-18T00:00:00.000Z");

const requiredFrozenClauses = [
  ["deadline 2026-08-18", "Deadline: 2026-08-18."],
  ["GitHub total stars >= 100", "GitHub total stars >= 100 at the deadline."],
  [
    "GSC property impressions >= 1,000",
    "GSC `sc-domain:wenlan.app` rolling-28-day property impressions >= 1,000.",
  ],
  [
    "Vercel visitors >= 2,000",
    "Vercel Web Analytics rolling-28-day visitors >= 2,000 over the same range.",
  ],
  ["fixed GitHub baseline 47", "Fixed progress baseline: GitHub total stars 47."],
  [
    "fixed GSC baseline 197",
    "Fixed progress baseline: GSC property impressions 197.",
  ],
  [
    "fixed Vercel baseline 323",
    "Fixed progress baseline: Vercel visitors 323.",
  ],
  [
    "fixed final window",
    "The final search and traffic window is the 28 complete days ending 2026-08-17.",
  ],
  [
    "GSC delay cannot move the final window",
    "If GSC reporting is delayed, delay the final read; do not move the window.",
  ],
  [
    "baseline provenance",
    "Verify the fixed progress baselines against the real source on the day the control plane starts and record provenance.",
  ],
  [
    "metric definitions are frozen",
    "Target values, deadline, metric definitions, and the final window must not be changed by the Goal controller.",
  ],
  [
    "Wenlan canonical destination",
    "Wenlan and `https://wenlan.app` are the destination product and canonical public site.",
  ],
  [
    "legacy bridge-host boundary",
    "`https://useorigin.app` and `https://www.useorigin.app` are redirect bridges into Wenlan, not destination brands.",
  ],
  [
    "pre-action PLAN read and verifier",
    "Before every campaign action, read `PLAN.md` and run `pnpm seo:goal:check`.",
  ],
  [
    "verifier failure stop",
    "If the verifier fails, stop; do not continue from a summary or chat memory.",
  ],
  [
    "contract review before website experiment",
    "The Goal contract must be approved before such an experiment begins.",
  ],
  [
    "GSC property/query/gap quality split",
    "Every weekly report must show GSC property totals, visible-query totals, and the query visibility gap separately.",
  ],
  [
    "visible-query non-brand quality split",
    "Track visible-query non-brand impressions, valid problem clusters, and non-brand pages with impressions separately",
  ],
  [
    "Vercel traffic quality split",
    "Report Vercel raw visitors, direct traffic, qualified-source visitors, and acquisition-surface visitors separately.",
  ],
  [
    "no invented source-to-page sessions",
    "If a source-to-page join is not available, do not invent source-to-page sessions.",
  ],
  [
    "no composite score or causality",
    "Do not create a composite score and do not claim causality among them.",
  ],
  [
    "fixed CTA definition",
    "CTA is fixed as `github_outbound / eligible acquisition-surface sessions`.",
  ],
  [
    "CTA remains diagnostic without Umami",
    "Until a reliable Umami baseline exists, CTA is diagnostic only and has no invented 4% threshold.",
  ],
  [
    "setup starts lagging and non-gating",
    "Setup starts are a lagging metric: report them when reliable, but they do not gate completion of this Goal.",
  ],
  [
    "technical SEO regression floor",
    "Sitemap, canonical, robots, redirects, noindex and X-Robots headers, structured data, key direct-200 URLs, and indexing must not gain a new technical regression.",
  ],
  [
    "English and Mandarin locale checks",
    "Inspect English, zh-TW, and zh-CN acquisition surfaces separately.",
  ],
  [
    "prohibited content shortcuts",
    "Do not use a fixed article quota, programmatic SEO, source-free comparisons, invented keyword volume, or `FAQPage` JSON-LD for an ordinary software site.",
  ],
  [
    "GSC evidence authority",
    "GSC is the only authority for Google Search performance and indexing.",
  ],
  [
    "Vercel Umami GitHub evidence roles",
    "Vercel is the primary source for visitors and referrers. Umami may enrich UTM, outbound, and CTA evidence when available. GitHub public or REST data is the authority for stars.",
  ],
  [
    "Google Trends Reddit and OSS demand lane",
    "Google Trends, Reddit, GitHub issues and discussions, OSS documentation and directories, and SERP observations are demand-discovery inputs only.",
  ],
  [
    "demand lane cannot impersonate GSC",
    "They may nominate experiments, but they must never enter authenticated GSC input, impersonate GSC evidence, or be described as keyword volume.",
  ],
  [
    "Google Trends provenance",
    "Google Trends must preserve query, geography, period, captured-at, and the raw 0-100 index.",
  ],
  [
    "native source units",
    "Every source keeps its native unit. Do not convert or normalize numbers across GSC, Trends, Reddit, GitHub, Vercel, Umami, or other sources.",
  ],
  [
    "demand inputs stay physically separate",
    "`/tmp/wenlan-seo-demand`, physically separate from authenticated GSC inputs under `/tmp/wenlan-seo`.",
  ],
  [
    "candidate provenance gate",
    "The source is inspectable, and its URL or query, capture date, language or geography, and native unit have provenance.",
  ],
  [
    "candidate corroboration gate",
    "The problem repeats, has independent corroboration, or has clear high intent.",
  ],
  [
    "candidate coverage gate",
    "Existing Wenlan coverage has a clean gap. If a page partly covers the intent, refresh the existing page before creating a new URL.",
  ],
  [
    "candidate proof gate",
    "Wenlan can prove the answer with a real command, workflow, test, release, or maintained first-party source.",
  ],
  [
    "candidate standalone utility gate",
    "The asset has standalone utility even without promoting Wenlan.",
  ],
  [
    "experiment priority order",
    "`technical blockers -> indexed page with impressions -> integration/workflow hub -> diagnostic/recipe -> net-new article`.",
  ],
  [
    "weekly windows do not block approved launches",
    "Weekly data windows are reporting boundaries, not launch blockers.",
  ],
  ["at most two active experiments", "Keep at most two active experiments."],
  [
    "14-day net-new cap",
    "Start at most one net-new search asset in any 14-calendar-day period.",
  ],
  [
    "predeclared exposure and readouts",
    "Every experiment predeclares its hypothesis, baseline, positive minimum exposure threshold and unit, success, failure, and stop criteria, and its 24h, 7d, W2, W4, and W8 readouts.",
  ],
  [
    "inconclusive below exposure floor",
    "If minimum exposure is not reached, the result is `inconclusive`; do not force a success or failure verdict.",
  ],
  [
    "month-one existing-page preference",
    "In month one, prefer an existing indexed page plus approved distribution.",
  ],
  [
    "wait without new evidence",
    "When there is no new evidence, wait. Do not continuously rewrite the same page.",
  ],
  [
    "weekly automation remains independent",
    "The existing `weekly-origin-seo-cleanup` automation remains independent.",
  ],
  [
    "no duplicate weekly cron",
    "Do not create a duplicate weekly cron or change its schedule or ID without explicit user approval.",
  ],
  [
    "Goal controller role",
    "This Goal is the campaign controller. The existing weekly automation remains the Searchfit, GSC, indexing, and technical-evidence lane.",
  ],
  [
    "weekly attribution conflict approval",
    "present the smallest prompt diff for user approval; do not silently allow both controllers to write.",
  ],
  [
    "same-task follow-up only",
    "If a calendar wake is needed, use a scheduled follow-up in this same main task.",
  ],
  [
    "approval boundary",
    "No deploy, Reddit or external article/message publication, OSS directory submission, paid acquisition, request indexing, GSC validation submission, push, or merge without explicit user approval.",
  ],
  [
    "GA4 outside Goal",
    "GA4 is outside this Goal. Keep the GSC + Vercel + existing Umami + GitHub evidence stack",
  ],
  [
    "stop if deadline unmet",
    "The deadline arrives and one or more fixed targets are unmet.",
  ],
  [
    "stop after two unreliable windows",
    "Two consecutive windows have no reliable data.",
  ],
  [
    "stop without reasonable experiment",
    "No reasonable experiment passes the candidate gate.",
  ],
  [
    "stop when approvals block necessary action",
    "Approval boundaries block a necessary action.",
  ],
  [
    "stop-delivery requirements",
    "deliver attempted paths, evidence by source, success/failure/inconclusive experiments, blockers, and the next decision that requires the user",
  ],
];

const allowedStatuses = new Set([
  "approved",
  "active",
  "live",
  "measuring",
  "extended",
  "decided",
  "inconclusive",
  "stopped",
]);
const activeStatuses = new Set(["approved", "active", "live", "measuring", "extended"]);
const allowedReadoutStatuses = new Set([
  "active",
  "live",
  "measuring",
  "extended",
  "decided",
  "inconclusive",
  "stopped",
]);
const allowedAssetClasses = new Set([
  "refresh",
  "integration-hub",
  "diagnostic-recipe",
  "net-new-search",
]);
const requiredExperimentFields = [
  "Record type",
  "Experiment ID",
  "Status",
  "Data window",
  "Asset class",
  "Launched",
  "Hypothesis",
  "Candidate evidence",
  "Baseline",
  "Change",
  "Publish date",
  "Index date",
  "Minimum exposure",
  "Success criteria",
  "Failure criteria",
  "Stop criteria",
  "24h readout",
  "7d readout",
  "W2 readout",
  "W4 readout",
  "W8 readout",
  "Result",
  "Decision",
  "Next step",
];
const requiredReadoutFields = [
  "Record type",
  "Experiment ID",
  "Observed at",
  "Readout",
  "Status",
  "Evidence",
  "Result",
  "Decision",
  "Next step",
];
const allowedReadouts = new Set(["24h", "7d", "W2", "W4", "W8", "correction"]);
const allowedResults = new Set(["pending", "success", "failure", "inconclusive"]);
const allowedDecisions = new Set([
  "wait",
  "scale",
  "refresh",
  "merge",
  "stop",
  "localize",
  "extend",
]);

function normalizeWhitespace(value) {
  return value.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
}

function frozenContract(plan, errors) {
  const start = plan.indexOf(FROZEN_START);
  const end = plan.indexOf(FROZEN_END);
  if (start === -1 || end === -1 || end <= start) {
    errors.push("PLAN.md must contain one ordered frozen Goal contract marker pair.");
    return null;
  }
  if (
    plan.indexOf(FROZEN_START, start + FROZEN_START.length) !== -1 ||
    plan.indexOf(FROZEN_END, end + FROZEN_END.length) !== -1
  ) {
    errors.push("PLAN.md must contain exactly one frozen Goal contract marker pair.");
    return null;
  }

  return plan.slice(start + FROZEN_START.length, end).replace(/\r\n/g, "\n").trim();
}

function parseIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) {
    return null;
  }
  return date;
}

function parseIsoUtcTimestamp(value) {
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value ?? "")
  ) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  const canonical = value.includes(".")
    ? date.toISOString()
    : date.toISOString().replace(".000Z", "Z");
  return canonical === value ? date : null;
}

function parseExperimentFields(block) {
  const fields = new Map();
  const duplicates = [];
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^- ([^:]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (fields.has(key)) duplicates.push(key);
    fields.set(key, value.trim());
  }
  return { fields, duplicates };
}

function inspectMutableCampaignState(plan, errors) {
  const mutableHeading = "\n## Mutable Campaign State\n";
  const mutableIndex = plan.indexOf(mutableHeading);
  if (mutableIndex === -1) {
    errors.push('PLAN.md must retain one "## Mutable Campaign State" section.');
    return { active: null, currentId: null, approvalTimestamp: null };
  }
  if (plan.indexOf(mutableHeading, mutableIndex + mutableHeading.length) !== -1) {
    errors.push('PLAN.md must contain exactly one "## Mutable Campaign State" section.');
  }

  const mutable = plan.slice(mutableIndex + mutableHeading.length);
  const activeMatches = [
    ...mutable.matchAll(/^- Active experiments:\s*(\d+)\.\s*$/gm),
  ];
  if (activeMatches.length !== 1) {
    errors.push("PLAN.md must state exactly one numeric Active experiments count.");
  }
  const active = activeMatches.length === 1 ? Number(activeMatches[0][1]) : null;

  const currentHeading = "\n### Current experiment\n";
  const currentIndex = mutable.indexOf(currentHeading);
  let currentId = null;
  if (currentIndex === -1) {
    errors.push('PLAN.md must retain one "### Current experiment" section.');
  } else {
    const currentStart = currentIndex + currentHeading.length;
    const nextHeading = mutable.indexOf("\n### ", currentStart);
    const current = mutable.slice(
      currentStart,
      nextHeading === -1 ? mutable.length : nextHeading,
    );
    const currentIds = [...current.matchAll(/`(EXP-[A-Za-z0-9][A-Za-z0-9-]*)`/g)].map(
      (match) => match[1],
    );
    if (currentIds.length > 1) {
      errors.push("PLAN.md Current experiment section must identify at most one experiment.");
    }
    currentId = currentIds[0] ?? null;
  }

  const websiteExperimentMatch = mutable.match(
    /^- Website-affecting experiment:\s*\n\s*`(EXP-[A-Za-z0-9][A-Za-z0-9-]*)`/m,
  );
  const websiteExperimentId = websiteExperimentMatch?.[1] ?? null;
  if (currentId && websiteExperimentId !== currentId) {
    errors.push(
      `PLAN.md Website-affecting experiment must match Current experiment "${currentId}".`,
    );
  }

  const approvalClaimed = /^- Contract approval:\s*approved\b/m.test(mutable);
  const approvalMatch = mutable.match(
    /^- Contract approval:\s*approved by the user in this Codex task on\s*\n\s*`(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)`\.\s*$/m,
  );
  if (approvalClaimed && !approvalMatch) {
    errors.push(
      "PLAN.md approved Contract approval must retain its ISO-8601 UTC approval timestamp.",
    );
  }

  return {
    active,
    currentId,
    approvalTimestamp: approvalMatch?.[1] ?? null,
  };
}

function campaignRecords(ledger) {
  const boundaries = [
    ...ledger.matchAll(/^(?:### |<!-- EXPERIMENT-RECORD:START -->)/gm),
  ];
  const records = [];
  boundaries.forEach((boundary, index) => {
    if (!boundary[0].startsWith("### ")) return;
    const end = boundaries[index + 1]?.index ?? ledger.length;
    const block = ledger.slice(boundary.index, end);
    const heading = block.slice(4, block.indexOf("\n"));
    records.push({ heading, fields: parseExperimentFields(block).fields });
  });
  return records;
}

function inspectExperimentLedger(experiments, errors) {
  const ledgerHeading = "\n## Ledger\n";
  const ledgerIndex = experiments.indexOf(ledgerHeading);
  if (ledgerIndex === -1) {
    errors.push('EXPERIMENTS.md must retain one "## Ledger" section.');
    return {
      starts: 0,
      active: 0,
      startedIds: new Set(),
      activeIds: new Set(),
      campaignRecords: [],
    };
  }
  if (experiments.indexOf(ledgerHeading, ledgerIndex + ledgerHeading.length) !== -1) {
    errors.push('EXPERIMENTS.md must contain exactly one "## Ledger" section.');
  }
  const beforeLedger = experiments
    .slice(0, ledgerIndex)
    .replace(/```[\s\S]*?```/g, "");
  if (
    /<!-- EXPERIMENT-RECORD:(?:START|END) -->|^## Experiment (?:start|readout):|^- Record type: experiment-(?:start|readout)\s*$|^- Experiment ID: EXP-/m.test(
      beforeLedger,
    )
  ) {
    errors.push("EXPERIMENTS.md contains experiment records before the Ledger section.");
  }
  const ledger = experiments.slice(ledgerIndex + ledgerHeading.length);
  const startMarkerCount =
    ledger.match(/<!-- EXPERIMENT-RECORD:START -->/g)?.length ?? 0;
  const endMarkerCount =
    ledger.match(/<!-- EXPERIMENT-RECORD:END -->/g)?.length ?? 0;
  if (startMarkerCount !== endMarkerCount) {
    errors.push(
      `EXPERIMENTS.md requires paired experiment record markers; found ${startMarkerCount} starts and ${endMarkerCount} ends.`,
    );
  }
  const ledgerOutsideRecords = ledger.replace(
    /<!-- EXPERIMENT-RECORD:START -->[\s\S]*?<!-- EXPERIMENT-RECORD:END -->/g,
    "",
  );
  if (
    /^## Experiment (?:start|readout):|^- Record type: experiment-(?:start|readout)\s*$|^- Experiment ID: EXP-/m.test(
      ledgerOutsideRecords,
    )
  ) {
    errors.push(
      "EXPERIMENTS.md contains experiment fields outside paired record markers.",
    );
  }
  const blocks = [
    ...ledger.matchAll(
      /<!-- EXPERIMENT-RECORD:START -->([\s\S]*?)<!-- EXPERIMENT-RECORD:END -->/g,
    ),
  ].map((match) => match[1]);
  const startedIds = new Set();
  const latestStatuses = new Map();
  const launchDatesById = new Map();
  const lastReadoutAtById = new Map();
  const netNewLaunches = [];

  blocks.forEach((block, index) => {
    const recordLabel = `experiment record ${index + 1}`;
    const { fields, duplicates } = parseExperimentFields(block);
    for (const duplicate of duplicates) {
      errors.push(`${recordLabel} repeats field "${duplicate}".`);
    }
    const recordType = fields.get("Record type");
    const id = fields.get("Experiment ID");
    if (id) {
      if (!/^EXP-[A-Za-z0-9][A-Za-z0-9-]*$/.test(id)) {
        errors.push(`${recordLabel} has invalid Experiment ID "${id}".`);
      }
    }

    const status = fields.get("Status");
    if (status && !allowedStatuses.has(status)) {
      errors.push(`${recordLabel} has invalid status "${status}".`);
    }
    const result = fields.get("Result");
    if (result && !allowedResults.has(result)) {
      errors.push(`${recordLabel} has invalid Result "${result}".`);
    }
    const decision = fields.get("Decision");
    if (decision && !allowedDecisions.has(decision)) {
      errors.push(`${recordLabel} has invalid Decision "${decision}".`);
    }

    if (recordType === "experiment-readout") {
      for (const field of requiredReadoutFields) {
        if (!fields.get(field)) {
          errors.push(`${recordLabel} is missing required field "${field}".`);
        }
      }
      if (id && !startedIds.has(id)) {
        errors.push(`${recordLabel} references "${id}" before its experiment-start record.`);
      }
      if (status && !allowedReadoutStatuses.has(status)) {
        errors.push(`${recordLabel} has invalid readout status "${status}".`);
      }
      const observedAtText = fields.get("Observed at") ?? "";
      const observedAt = parseIsoUtcTimestamp(observedAtText);
      let timestampIsOrdered = Boolean(observedAt);
      if (!observedAt) {
        errors.push(
          `${recordLabel} Observed at must be a valid calendar timestamp in ISO-8601 UTC.`,
        );
      } else if (id && startedIds.has(id)) {
        const launchDate = launchDatesById.get(id);
        if (launchDate && observedAt < launchDate) {
          errors.push(`${recordLabel} Observed at cannot precede its launch date.`);
          timestampIsOrdered = false;
        }
        const previousReadoutAt = lastReadoutAtById.get(id);
        if (previousReadoutAt && observedAt <= previousReadoutAt) {
          errors.push(`${recordLabel} readout timestamps must strictly increase.`);
          timestampIsOrdered = false;
        }
        if (timestampIsOrdered) lastReadoutAtById.set(id, observedAt);
      }
      const readout = fields.get("Readout");
      if (readout && !allowedReadouts.has(readout)) {
        errors.push(`${recordLabel} has invalid Readout "${readout}".`);
      }
      if (
        id &&
        startedIds.has(id) &&
        timestampIsOrdered &&
        status &&
        allowedReadoutStatuses.has(status)
      ) {
        latestStatuses.set(id, status);
      }
      return;
    }

    if (recordType !== "experiment-start") {
      errors.push(
        `${recordLabel} Record type must be "experiment-start" or "experiment-readout".`,
      );
      return;
    }
    for (const field of requiredExperimentFields) {
      if (!fields.get(field)) {
        errors.push(`${recordLabel} is missing required field "${field}".`);
      }
    }
    if (id) {
      if (startedIds.has(id)) {
        errors.push(`Experiment start ID "${id}" must be unique.`);
      }
      startedIds.add(id);
      if (status && allowedStatuses.has(status)) latestStatuses.set(id, status);
    }

    const assetClass = fields.get("Asset class");
    if (assetClass && !allowedAssetClasses.has(assetClass)) {
      errors.push(`${recordLabel} has invalid asset class "${assetClass}".`);
    }

    const window = fields.get("Data window");
    const windowMatch = window?.match(/^(\d{4}-\d{2}-\d{2})\.\.(\d{4}-\d{2}-\d{2})$/);
    const startDate = parseIsoDate(windowMatch?.[1]);
    const endDate = parseIsoDate(windowMatch?.[2]);
    if (!startDate || !endDate || (endDate.valueOf() - startDate.valueOf()) / DAY_MS !== 6) {
      errors.push(`${recordLabel} Data window must span seven complete dates inclusive.`);
    } else {
      const anchorOffsetDays =
        (startDate.valueOf() - CAMPAIGN_WINDOW_ANCHOR.valueOf()) / DAY_MS;
      if (anchorOffsetDays < 0 || anchorOffsetDays % 7 !== 0) {
        errors.push(
          `${recordLabel} Data window must follow the campaign cadence anchored on 2026-07-18.`,
        );
      }
    }

    const launchedText = fields.get("Launched");
    const launched = parseIsoDate(launchedText);
    if (!launched) {
      errors.push(`${recordLabel} Launched must be a valid YYYY-MM-DD date.`);
    } else {
      if (startDate && endDate && (launched < startDate || launched > endDate)) {
        errors.push(`${recordLabel} launch date must fall inside its Data window.`);
      }
      if (launched > CAMPAIGN_DEADLINE) {
        errors.push(`${recordLabel} cannot launch after 2026-08-18.`);
      }
      if (id && startedIds.has(id)) launchDatesById.set(id, launched);
      if (assetClass === "net-new-search") {
        netNewLaunches.push({ id: id ?? recordLabel, date: launched });
      }
    }

    const minimumExposure = fields.get("Minimum exposure") ?? "";
    const exposureMatch = minimumExposure.match(/^(\d+(?:\.\d+)?)\s+(\S.*)$/);
    if (!exposureMatch || Number(exposureMatch[1]) <= 0) {
      errors.push(
        `${recordLabel} Minimum exposure must contain a positive threshold and native unit.`,
      );
    }
  });

  const active = [...latestStatuses]
    .filter(([, status]) => activeStatuses.has(status))
    .map(([id]) => id);
  if (active.length > 2) {
    errors.push(
      `EXPERIMENTS.md allows at most two active experiments; found ${active.length}: ${active.join(", ")}.`,
    );
  }
  netNewLaunches.sort((left, right) => left.date - right.date);
  for (let index = 1; index < netNewLaunches.length; index += 1) {
    const previous = netNewLaunches[index - 1];
    const current = netNewLaunches[index];
    const days = (current.date - previous.date) / DAY_MS;
    if (days < 14) {
      errors.push(
        `Net-new search assets must launch at least 14 calendar days apart; ${previous.id} and ${current.id} are ${days} days apart.`,
      );
    }
  }

  return {
    starts: startedIds.size,
    active: active.length,
    startedIds,
    activeIds: new Set(active),
    campaignRecords: campaignRecords(ledger),
  };
}

export function validateGoalControlPlane({ plan, experiments }) {
  const errors = [];
  const frozen = frozenContract(plan, errors);
  if (frozen) {
    const normalized = normalizeWhitespace(frozen);
    for (const [label, clause] of requiredFrozenClauses) {
      if (!normalized.includes(normalizeWhitespace(clause))) {
        errors.push(`Frozen Goal contract is missing or changed: ${label}.`);
      }
    }
    const digest = createHash("sha256").update(frozen).digest("hex");
    if (digest !== EXPECTED_FROZEN_SHA256) {
      errors.push(
        `Frozen Goal contract hash changed: expected ${EXPECTED_FROZEN_SHA256}, received ${digest}.`,
      );
    }
  }

  if (!experiments.includes("This file is append-only.")) {
    errors.push("EXPERIMENTS.md must retain its append-only policy.");
  }
  if (!experiments.includes("24h readout") || !experiments.includes("W8 readout")) {
    errors.push("EXPERIMENTS.md must retain the 24h, 7d, W2, W4, and W8 readout schema.");
  }
  const mutable = inspectMutableCampaignState(plan, errors);
  const ledger = inspectExperimentLedger(experiments, errors);
  if (mutable.active !== null && mutable.active !== ledger.active) {
    errors.push(
      `PLAN.md Active experiments is ${mutable.active} but EXPERIMENTS.md has ${ledger.active}.`,
    );
  }
  if (mutable.currentId && !ledger.activeIds.has(mutable.currentId)) {
    errors.push(
      `PLAN.md Current experiment "${mutable.currentId}" must exist as an active experiment in EXPERIMENTS.md.`,
    );
  }
  if (!mutable.currentId && ledger.active > 0) {
    errors.push(
      "PLAN.md Current experiment must identify an active experiment while the ledger has active experiments.",
    );
  }
  if (mutable.approvalTimestamp) {
    const approvalRecord = ledger.campaignRecords.find(
      ({ heading, fields }) =>
        heading.startsWith(`${mutable.approvalTimestamp} —`) &&
        fields.get("Record type") === "campaign-approval" &&
        fields.get("Contract status") === "approved by the user in this Codex task",
    );
    if (!approvalRecord) {
      errors.push(
        `EXPERIMENTS.md must retain the campaign-approval record for ${mutable.approvalTimestamp} while PLAN.md claims approval.`,
      );
    }
  }
  return errors;
}

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (!argument.startsWith("--")) {
      throw new Error(`Unexpected argument: ${argument}`);
    }
    const key = argument.slice(2);
    if (!["plan", "experiments"].includes(key)) {
      throw new Error(`Unknown option: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}`);
    }
    values[key] = value;
    index += 1;
  }
  return {
    planPath: resolve(values.plan ?? resolve(repoRoot, "PLAN.md")),
    experimentsPath: resolve(values.experiments ?? resolve(repoRoot, "EXPERIMENTS.md")),
  };
}

async function run() {
  const { planPath, experimentsPath } = parseArgs(process.argv.slice(2));
  const [plan, experiments] = await Promise.all([
    readFile(planPath, "utf8"),
    readFile(experimentsPath, "utf8"),
  ]);
  const errors = validateGoalControlPlane({ plan, experiments });
  if (errors.length > 0) {
    console.error(`[seo-goal] FAIL (${errors.length} violations)`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log("[seo-goal] PASS: frozen contract and experiment caps verified.");
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  run().catch((error) => {
    console.error(`[seo-goal] ${error.message}`);
    process.exitCode = 1;
  });
}
