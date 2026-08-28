#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(import.meta.dirname, "..");
const LOCALES = ["en", "zh-TW", "zh-CN"];
const STAGES = new Set([
  "understand",
  "build",
  "integrate",
  "maintain",
  "troubleshoot",
  "evaluate",
]);
const COVERAGE = new Set(["covered", "partial", "gap"]);
const DECISIONS = new Set([
  "refresh-existing",
  "net-new",
  "research",
  "reject",
  "published",
  "measuring",
]);
const PUBLICATION_STATES = new Set([
  "not-published",
  "prepared",
  "published",
  "measuring",
  "rejected",
]);
const GATE_STATUSES = new Set(["passed", "failed", "pending"]);
const REQUIRED_GATES = [
  "provenance",
  "repeatedDemand",
  "trilingualSerp",
  "cleanGap",
  "firstPartyProof",
  "standaloneUtility",
  "internalLinks",
  "authorityPath",
];
const EXECUTABLE_DECISIONS = new Set([
  "refresh-existing",
  "net-new",
  "published",
  "measuring",
]);
const EXPECTED_FAMILY_IDS = [
  "source-change-stale-pages",
  "coding-agent-source-backed-knowledge-base",
  "verify-citations-provenance-unsupported-claims",
  "obsidian-read-only-source-vs-maintained-knowledge-base",
  "knowledge-retrieval-context-token-cost",
  "document-pdf-ingestion-failures",
  "multi-agent-knowledge-write-conflicts",
  "retrieval-regression-after-knowledge-base-changes",
  "source-backed-research-knowledge-base",
];
const APPROVED_SCENARIO_CONTRACT_SHA256 =
  "eb7e0528be042f9d4fc9d298479209cfb9558a7e03517530edc91e112297f5a4";
const EXPECTED_WEEKLY_WINDOWS = [
  ["2026-08-24", "2026-08-30", "source-change-stale-pages"],
  ["2026-08-31", "2026-09-06", "coding-agent-source-backed-knowledge-base"],
  ["2026-09-07", "2026-09-13", "verify-citations-provenance-unsupported-claims"],
  [
    "2026-09-14",
    "2026-09-20",
    "obsidian-read-only-source-vs-maintained-knowledge-base",
  ],
];

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeQuery(value) {
  return text(value).normalize("NFKC").replace(/\s+/g, " ").toLocaleLowerCase();
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function expectedLocaleForUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname.startsWith("/zh-TW/")) return "zh-TW";
  if (pathname.startsWith("/zh-CN/")) return "zh-CN";
  return "en";
}

function requireText(value, label, errors) {
  if (!text(value)) errors.push(`${label} must be a non-empty string.`);
}

function scenarioContractHash(families) {
  const contract = families.map(
    ({ id, audience, trigger, userTask, desiredOutcome }) => ({
      id,
      audience,
      trigger,
      userTask,
      desiredOutcome,
    }),
  );
  return createHash("sha256").update(JSON.stringify(contract)).digest("hex");
}

function validateEvidence(record, label, errors) {
  for (const field of [
    "sourceType",
    "sourceUrl",
    "query",
    "capturedAt",
    "language",
    "geography",
    "nativeUnit",
    "value",
    "note",
  ]) {
    requireText(record?.[field], `${label}.${field}`, errors);
  }
  if (record?.sourceUrl && !normalizeUrl(record.sourceUrl)) {
    errors.push(`${label}.sourceUrl must be an absolute URL.`);
  }
  if (
    record?.capturedAt &&
    !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}Z)?$/.test(record.capturedAt)
  ) {
    errors.push(`${label}.capturedAt must be an ISO date or UTC timestamp.`);
  }
}

export function validateScenarioBacklog(
  backlog,
  { sitemapRows = [], renderedReport = null } = {},
) {
  const errors = [];
  if (backlog?.schemaVersion !== 2) {
    errors.push("scenario backlog schemaVersion must be 2.");
  }
  requireText(backlog?.updatedAt, "updatedAt", errors);
  if (backlog?.campaign?.deadline !== "2026-09-21") {
    errors.push("scenario campaign deadline must remain 2026-09-21.");
  }
  if (backlog?.campaign?.finalWindow !== "2026-08-24..2026-09-20") {
    errors.push("scenario campaign finalWindow must remain 2026-08-24..2026-09-20.");
  }
  const baseline = backlog?.campaign?.baseline;
  const expectedBaseline = {
    sitemapUrls: 120,
    englishLearnUrls: 46,
    englishStrictKnowledgeOwners: 5,
    englishOwnersWithObsidian: 6,
    zhTWLearnUrls: 5,
    zhCNLearnUrls: 5,
    gscImpressions: 1005,
    gscClicks: 8,
    gscCtrPercent: 0.8,
    vercelVisitors: 248,
    vercelGoogleVisitors: 30,
  };
  for (const [field, expected] of Object.entries(expectedBaseline)) {
    if (baseline?.[field] !== expected) {
      errors.push(`scenario baseline ${field} must remain ${expected}.`);
    }
  }
  requireText(baseline?.range, "campaign.baseline.range", errors);
  requireText(baseline?.provenance, "campaign.baseline.provenance", errors);
  if (baseline?.interpretation !== "baseline-not-demand-or-causality") {
    errors.push(
      "scenario baseline must state that it is not demand volume or causal evidence.",
    );
  }

  const weekly = backlog?.campaign?.weeklyCadence;
  if (!Array.isArray(weekly) || weekly.length !== EXPECTED_WEEKLY_WINDOWS.length) {
    errors.push("scenario backlog must retain the four weekly target windows.");
  } else {
    EXPECTED_WEEKLY_WINDOWS.forEach(([start, end, preferredFamilyId], index) => {
      const actual = weekly[index];
      if (
        actual?.start !== start ||
        actual?.end !== end ||
        actual?.preferredFamilyId !== preferredFamilyId
      ) {
        errors.push(`weekly target window ${index + 1} is missing or changed.`);
      }
      requireText(actual?.fallbackRule, `weeklyCadence[${index}].fallbackRule`, errors);
    });
  }

  const families = backlog?.families;
  if (!Array.isArray(families)) {
    errors.push("scenario backlog families must be an array.");
    return { errors, familyCount: 0, sitemapCount: sitemapRows.length };
  }
  if (
    families.length !== EXPECTED_FAMILY_IDS.length ||
    families.some((family, index) => family?.id !== EXPECTED_FAMILY_IDS[index])
  ) {
    errors.push("scenario families must retain the approved nine-item order.");
  }
  if (scenarioContractHash(families) !== APPROVED_SCENARIO_CONTRACT_SHA256) {
    errors.push(
      "scenario audience, trigger, user task, and desired outcome contract changed without approval.",
    );
  }

  const sitemapSet = new Set(
    sitemapRows.map((row) => normalizeUrl(row.url)).filter(Boolean),
  );
  const queryOwners = new Map();
  const ids = new Set();
  for (const [familyIndex, family] of families.entries()) {
    const label = `families[${familyIndex}]`;
    requireText(family?.id, `${label}.id`, errors);
    if (ids.has(family?.id)) errors.push(`duplicate scenario family id: ${family.id}.`);
    ids.add(family?.id);
    requireText(family?.audience, `${label}.audience`, errors);
    requireText(family?.trigger, `${label}.trigger`, errors);
    requireText(family?.userTask, `${label}.userTask`, errors);
    requireText(family?.desiredOutcome, `${label}.desiredOutcome`, errors);
    if (!STAGES.has(family?.stage)) {
      errors.push(`${family?.id ?? label} has invalid stage.`);
    }
    if (!DECISIONS.has(family?.decision)) {
      errors.push(`${family?.id ?? label} has invalid decision.`);
    }
    if (!PUBLICATION_STATES.has(family?.publicationStatus)) {
      errors.push(`${family?.id ?? label} has invalid publicationStatus.`);
    }
    requireText(family?.plannedWindow, `${label}.plannedWindow`, errors);
    requireText(family?.standaloneUtility, `${label}.standaloneUtility`, errors);
    requireText(family?.overlapCheck, `${label}.overlapCheck`, errors);
    requireText(family?.nextResearchDirection, `${label}.nextResearchDirection`, errors);

    for (const locale of LOCALES) {
      const localeData = family?.locales?.[locale];
      if (!localeData) {
        errors.push(`${family?.id ?? label} is missing locale ${locale}.`);
        continue;
      }
      if (!COVERAGE.has(localeData.coverage)) {
        errors.push(`${family.id}.${locale} has invalid coverage.`);
      }
      if (!Array.isArray(localeData.queryFamily) || localeData.queryFamily.length === 0) {
        errors.push(`${family.id}.${locale}.queryFamily must not be empty.`);
      } else {
        for (const query of localeData.queryFamily) {
          const normalized = normalizeQuery(query);
          if (!normalized) {
            errors.push(`${family.id}.${locale} has an empty query.`);
            continue;
          }
          const key = `${locale}:${normalized}`;
          const owner = queryOwners.get(key);
          if (owner && owner !== family.id) {
            errors.push(
              `duplicate query family owner in ${locale}: ${query} -> ${owner}, ${family.id}.`,
            );
          } else {
            queryOwners.set(key, family.id);
          }
        }
      }
      for (const field of ["serpEvidence", "demandEvidence"]) {
        if (!Array.isArray(localeData[field])) {
          errors.push(`${family.id}.${locale}.${field} must be an array.`);
        } else {
          localeData[field].forEach((item, index) =>
            validateEvidence(item, `${family.id}.${locale}.${field}[${index}]`, errors),
          );
        }
      }
      requireText(
        localeData.researchNeeded,
        `${family.id}.${locale}.researchNeeded`,
        errors,
      );
      if (localeData.existingOwner !== null) {
        const owner = normalizeUrl(localeData.existingOwner);
        if (!owner) {
          errors.push(`${family.id}.${locale}.existingOwner must be null or an absolute URL.`);
        } else {
          if (sitemapSet.size > 0 && !sitemapSet.has(owner)) {
            errors.push(
              `${family.id}.${locale} existing owner ${owner} is not in the sitemap.`,
            );
          }
          if (expectedLocaleForUrl(owner) !== locale) {
            errors.push(`${family.id}.${locale} existing owner has the wrong locale.`);
          }
        }
      }
    }

    const gates = family?.gates;
    for (const gateName of REQUIRED_GATES) {
      const gate = gates?.[gateName];
      if (!gate || !GATE_STATUSES.has(gate.status)) {
        errors.push(`${family?.id ?? label}.${gateName} has invalid gate status.`);
        continue;
      }
      requireText(gate.reason, `${family.id}.${gateName}.reason`, errors);
      if (!Array.isArray(gate.evidenceRefs)) {
        errors.push(`${family.id}.${gateName}.evidenceRefs must be an array.`);
      } else if (gate.status === "passed" && gate.evidenceRefs.length === 0) {
        errors.push(`${family.id}.${gateName} passed without evidenceRefs.`);
      }
    }
    if (
      EXECUTABLE_DECISIONS.has(family?.decision) &&
      REQUIRED_GATES.some((gateName) => gates?.[gateName]?.status !== "passed")
    ) {
      errors.push(
        `${family.id} decision ${family.decision} requires every candidate gate to pass.`,
      );
    }
    if (!Array.isArray(family?.wenlanProof) || family.wenlanProof.length === 0) {
      errors.push(`${family?.id ?? label}.wenlanProof must not be empty.`);
    } else {
      family.wenlanProof.forEach((proof, index) => {
        requireText(proof?.claim, `${family.id}.wenlanProof[${index}].claim`, errors);
        requireText(proof?.sourceRef, `${family.id}.wenlanProof[${index}].sourceRef`, errors);
        requireText(proof?.verification, `${family.id}.wenlanProof[${index}].verification`, errors);
      });
    }
    if (!Array.isArray(family?.internalLinks) || family.internalLinks.length < 3) {
      errors.push(`${family?.id ?? label} must predeclare at least three internal links.`);
    } else {
      for (const link of family.internalLinks) {
        const normalized = normalizeUrl(link);
        if (!normalized || (sitemapSet.size > 0 && !sitemapSet.has(normalized))) {
          errors.push(`${family.id} internal link ${link} is not in the sitemap.`);
        }
      }
    }
    requireText(family?.authorityPath?.type, `${label}.authorityPath.type`, errors);
    requireText(family?.authorityPath?.target, `${label}.authorityPath.target`, errors);
    requireText(family?.authorityPath?.status, `${label}.authorityPath.status`, errors);
    for (const source of ["gsc", "vercel"]) {
      if (family?.readout?.[source]?.status !== "unavailable") {
        errors.push(`${family?.id ?? label} initial ${source} readout must be unavailable.`);
      }
      requireText(
        family?.readout?.[source]?.nativeUnit,
        `${label}.readout.${source}.nativeUnit`,
        errors,
      );
    }
  }

  if (renderedReport !== null && renderScenarioBacklog(backlog) !== renderedReport) {
    errors.push(
      "docs/seo-scenario-backlog.md is out of sync; run pnpm seo:scenario:update.",
    );
  }
  return {
    errors: [...new Set(errors)].sort(),
    familyCount: families.length,
    sitemapCount: sitemapSet.size,
  };
}

function escapeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function renderEvidence(items) {
  if (!items.length) return "No captured evidence yet; research is required.";
  return items
    .map(
      (item) =>
        `- ${item.sourceType}: [${item.query}](${item.sourceUrl}) — ${item.value} ${item.nativeUnit}; ${item.language}/${item.geography}; captured ${item.capturedAt}. ${item.note}`,
    )
    .join("\n");
}

export function renderScenarioBacklog(backlog) {
  const baseline = backlog.campaign.baseline;
  const schedule = backlog.campaign.weeklyCadence
    .map(
      (week) =>
        `| ${week.start}..${week.end} | \`${week.preferredFamilyId}\` | ${escapeCell(week.fallbackRule)} |`,
    )
    .join("\n");
  const families = backlog.families
    .map((family, index) => {
      const localeRows = LOCALES.map((locale) => {
        const item = family.locales[locale];
        return `| ${locale} | ${escapeCell(item.queryFamily.join("; "))} | ${item.coverage} | ${item.existingOwner ? `[owner](${item.existingOwner})` : "none"} | ${escapeCell(item.researchNeeded)} |`;
      }).join("\n");
      const evidence = LOCALES.map((locale) => {
        const item = family.locales[locale];
        return `#### ${locale} evidence\n\nSERP:\n${renderEvidence(item.serpEvidence)}\n\nDemand discovery:\n${renderEvidence(item.demandEvidence)}`;
      }).join("\n\n");
      const gates = REQUIRED_GATES.map((name) => {
        const gate = family.gates[name];
        return `| ${name} | ${gate.status} | ${escapeCell(gate.reason)} | ${escapeCell(gate.evidenceRefs.join("; ") || "none")} |`;
      }).join("\n");
      const proof = family.wenlanProof
        .map(
          (item) =>
            `- ${item.claim} — \`${item.sourceRef}\`; verify with \`${item.verification}\`.`,
        )
        .join("\n");
      const links = family.internalLinks.map((link) => `- ${link}`).join("\n");
      return `## ${index + 1}. ${family.userTask}\n\n- ID: \`${family.id}\`\n- Audience: ${family.audience}\n- Trigger: ${family.trigger}\n- Desired outcome: ${family.desiredOutcome}\n- Stage: \`${family.stage}\`\n- Decision: \`${family.decision}\`\n- Planned window: \`${family.plannedWindow}\`\n- Publication: \`${family.publicationStatus}\`\n- Standalone utility: ${family.standaloneUtility}\n- Overlap check: ${family.overlapCheck}\n- Next research: ${family.nextResearchDirection}\n\n### Locale intent and ownership\n\n| Locale | Query family | Coverage | Existing owner | Research needed |\n| --- | --- | --- | --- | --- |\n${localeRows}\n\n${evidence}\n\n### Candidate gate\n\n| Gate | Status | Reason | Evidence refs |\n| --- | --- | --- | --- |\n${gates}\n\n### Wenlan proof\n\n${proof}\n\n### Planned internal links\n\n${links}\n\n### Authority path and readout\n\n- Authority path: ${family.authorityPath.type} — ${family.authorityPath.target} (${family.authorityPath.status}).\n- GSC: ${family.readout.gsc.status}; native unit: ${family.readout.gsc.nativeUnit}.\n- Vercel: ${family.readout.vercel.status}; native unit: ${family.readout.vercel.nativeUnit}.`;
    })
    .join("\n\n");

  return `# Wenlan Trilingual SEO Scenario Backlog\n\nGenerated from \`docs/seo-scenario-backlog.json\`. Do not edit this file directly; run \`pnpm seo:scenario:update\`. Updated: ${backlog.updatedAt}.\n\nThis queue nominates user tasks, not keyword-volume claims. GSC remains the authority for Wenlan search performance. Trends, SERP, community, and OSS observations can nominate a scenario only with their native units and provenance. Empty evidence means research is still required, not zero demand.\n\n## Campaign and baseline\n\n- Deadline: \`${backlog.campaign.deadline}\`\n- Final window: \`${backlog.campaign.finalWindow}\`\n- Weekly rule: ${backlog.campaign.weeklyRule}\n- Baseline range: \`${baseline.range}\`\n- Sitemap URLs: ${baseline.sitemapUrls}\n- Learn URLs: English ${baseline.englishLearnUrls}; zh-TW ${baseline.zhTWLearnUrls}; zh-CN ${baseline.zhCNLearnUrls}.\n- Strict English AI knowledge-base or LLM Wiki owners: ${baseline.englishStrictKnowledgeOwners}; ${baseline.englishOwnersWithObsidian} with the Obsidian-adjacent page.\n- GSC: ${baseline.gscClicks} clicks, ${baseline.gscImpressions} impressions, ${baseline.gscCtrPercent.toFixed(2)}% CTR.\n- Vercel: ${baseline.vercelVisitors} visitors, including ${baseline.vercelGoogleVisitors} attributed to Google.\n- Provenance: ${baseline.provenance}\n- Interpretation: these are baselines, not demand volume and not causal evidence.\n\n## Four-week target queue\n\n| Window | Preferred family | If the gate fails |\n| --- | --- | --- |\n${schedule}\n\n${families}\n`;
}

function parseArgs(argv) {
  return { update: argv.includes("--update") };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const jsonPath = resolve(repoRoot, "docs/seo-scenario-backlog.json");
  const markdownPath = resolve(repoRoot, "docs/seo-scenario-backlog.md");
  const backlog = JSON.parse(await readFile(jsonPath, "utf8"));
  const { buildPageIntentRows } = await import("./seo-intent-map.mjs");
  const sitemapRows = buildPageIntentRows();

  if (args.update) {
    const initial = validateScenarioBacklog(backlog, { sitemapRows });
    if (initial.errors.length > 0) {
      for (const error of initial.errors) console.error(`[seo-scenario] ${error}`);
      process.exitCode = 1;
      return;
    }
    await writeFile(markdownPath, renderScenarioBacklog(backlog), "utf8");
    console.log(`[seo-scenario] wrote ${markdownPath}`);
  }

  const renderedReport = await readFile(markdownPath, "utf8");
  const result = validateScenarioBacklog(backlog, { sitemapRows, renderedReport });
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`[seo-scenario] ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `[seo-scenario] PASS: ${result.familyCount} trilingual families; ${result.sitemapCount} sitemap owners available.`,
  );
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  run().catch((error) => {
    console.error(`[seo-scenario] ${error.message}`);
    process.exitCode = 1;
  });
}

export { EXPECTED_FAMILY_IDS, LOCALES, REQUIRED_GATES };
