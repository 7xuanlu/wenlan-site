import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import { buildPageIntentRows } from "./seo-intent-map.mjs";
import {
  renderScenarioBacklog,
  validateScenarioBacklog,
} from "./seo-scenario-check.mjs";

const repoRoot = resolve(import.meta.dirname, "..");
const backlog = JSON.parse(
  await readFile(resolve(repoRoot, "docs/seo-scenario-backlog.json"), "utf8"),
);
const report = await readFile(
  resolve(repoRoot, "docs/seo-scenario-backlog.md"),
  "utf8",
);
const sitemapRows = buildPageIntentRows();

test("canonical trilingual scenario backlog is complete and generated report is in sync", () => {
  const result = validateScenarioBacklog(backlog, {
    sitemapRows,
    renderedReport: report,
  });

  assert.deepEqual(result.errors, []);
  assert.equal(backlog.families.length, 11);
  assert.equal(
    backlog.families.at(-1)?.id,
    "source-backed-investment-research-knowledge-base",
  );
  assert.equal(backlog.campaign.baseline.sitemapUrls, 120);
  assert.equal(sitemapRows.length, 147);
  assert.equal(result.sitemapCount, sitemapRows.length);
  assert.equal(renderScenarioBacklog(backlog), report);
});

test("investment-research family preserves one trilingual filing-to-thesis task", () => {
  const family = backlog.families.find(
    (candidate) =>
      candidate.id === "source-backed-investment-research-knowledge-base",
  );

  assert.ok(family, "investment-research scenario family");
  assert.match(family.audience, /investment|equity|financial/i);
  assert.match(family.trigger, /filing|annual report|earnings/i);
  assert.match(family.userTask, /investment research knowledge base/i);
  assert.match(family.desiredOutcome, /traceable|current|thesis/i);
  assert.equal(family.decision, "net-new");
  assert.equal(family.publicationStatus, "prepared");
  assert.deepEqual(Object.keys(family.locales), ["en", "zh-TW", "zh-CN"]);
  assert.ok(
    Object.values(family.gates).every((gate) => gate.status === "passed"),
    "every investment-research candidate gate must pass",
  );
  assert.equal(family.internalLinks.length, 9);
});

test("consultant client-project family preserves its approved trilingual task contract", () => {
  const family = backlog.families.find(
    (candidate) => candidate.id === "consultant-client-project-knowledge-base",
  );

  assert.ok(family, "consultant client-project scenario family");
  assert.match(family.audience, /consultants/i);
  assert.match(family.trigger, /client/i);
  assert.match(family.userTask, /client-project knowledge base/i);
  assert.match(family.desiredOutcome, /traceable|current/i);
  assert.equal(family.decision, "net-new");
  assert.equal(family.publicationStatus, "prepared");
  assert.deepEqual(Object.keys(family.locales), ["en", "zh-TW", "zh-CN"]);
  assert.ok(
    Object.values(family.gates).every((gate) => gate.status === "passed"),
    "every approved candidate gate must pass",
  );
  assert.equal(family.internalLinks.length, 9);
  assert.equal(family.readout.gsc.status, "unavailable");
  assert.equal(family.readout.vercel.status, "unavailable");
});

test("scenario validation rejects a missing locale and an owner outside the sitemap", () => {
  const changed = structuredClone(backlog);
  delete changed.families[0].locales["zh-CN"];
  changed.families[1].locales.en.existingOwner =
    "https://wenlan.app/learn/not-a-real-owner";

  const errors = validateScenarioBacklog(changed, { sitemapRows }).errors;
  assert.ok(errors.some((error) => error.includes("missing locale zh-CN")));
  assert.ok(errors.some((error) => error.includes("not in the sitemap")));
});

test("scenario validation requires an audience, trigger, task, and desired outcome", () => {
  const changed = structuredClone(backlog);
  delete changed.families[0].audience;
  delete changed.families[1].trigger;
  delete changed.families[2].userTask;
  delete changed.families[3].desiredOutcome;

  const errors = validateScenarioBacklog(changed, { sitemapRows }).errors;
  assert.ok(errors.some((error) => error.includes("families[0].audience")));
  assert.ok(errors.some((error) => error.includes("families[1].trigger")));
  assert.ok(errors.some((error) => error.includes("families[2].userTask")));
  assert.ok(errors.some((error) => error.includes("families[3].desiredOutcome")));
});

test("scenario validation protects the approved audience-trigger-task-outcome meaning", () => {
  const changed = structuredClone(backlog);
  changed.families[4].audience = "x";
  changed.families[4].trigger = "y";
  changed.families[4].userTask = "z";
  changed.families[4].desiredOutcome = "q";

  assert.ok(
    validateScenarioBacklog(changed, { sitemapRows }).errors.some((error) =>
      error.includes("contract changed without approval"),
    ),
  );
});

test("a publishable decision cannot bypass any candidate gate", () => {
  const changed = structuredClone(backlog);
  changed.families[0].decision = "net-new";
  changed.families[0].gates.cleanGap.status = "pending";

  assert.ok(
    validateScenarioBacklog(changed, { sitemapRows }).errors.some((error) =>
      error.includes("requires every candidate gate to pass"),
    ),
  );
});

test("duplicate locale query ownership is rejected", () => {
  const changed = structuredClone(backlog);
  changed.families[1].locales.en.queryFamily[0] =
    changed.families[0].locales.en.queryFamily[0];

  assert.ok(
    validateScenarioBacklog(changed, { sitemapRows }).errors.some((error) =>
      error.includes("duplicate query family owner"),
    ),
  );
});

test("generated Markdown drift is rejected", () => {
  const result = validateScenarioBacklog(backlog, {
    sitemapRows,
    renderedReport: `${report}\nmanual drift\n`,
  });

  assert.ok(result.errors.some((error) => error.includes("out of sync")));
});
