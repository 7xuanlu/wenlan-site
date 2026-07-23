import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";

import { validateGoalControlPlane } from "./seo-goal-check.mjs";

const repoRoot = resolve(import.meta.dirname, "..");
const goalCheckScript = resolve(import.meta.dirname, "seo-goal-check.mjs");
const execFileAsync = promisify(execFile);
const canonicalPlan = await readFile(resolve(repoRoot, "PLAN.md"), "utf8");
const canonicalExperiments = await readFile(resolve(repoRoot, "EXPERIMENTS.md"), "utf8");
const experimentFreeExperiments = canonicalExperiments.replace(
  /\n?<!-- EXPERIMENT-RECORD:START -->[\s\S]*?<!-- EXPERIMENT-RECORD:END -->\n?/g,
  "\n",
);
const currentExperimentId = "EXP-2026-07-23-zhtw-obsidian-localization";

function removeCurrentExperiment(experiments = canonicalExperiments) {
  return experiments.replace(
    new RegExp(
      `\\n?<!-- EXPERIMENT-RECORD:START -->\\n## Experiment start: ${currentExperimentId}[\\s\\S]*?<!-- EXPERIMENT-RECORD:END -->\\n?`,
    ),
    "\n",
  );
}

function removeCampaignApproval(experiments = canonicalExperiments) {
  return experiments.replace(
    /\n### 2026-07-18T22:06:21Z — contract approval\n[\s\S]*?(?=\n(?:### |<!-- EXPERIMENT-RECORD:START -->))/,
    "\n",
  );
}

function validationErrors({
  plan = canonicalPlan,
  experiments = canonicalExperiments,
} = {}) {
  return validateGoalControlPlane({ plan, experiments });
}

function experimentStart({
  id,
  status = "active",
  windowStart,
  windowEnd,
  assetClass = "refresh",
  launched,
}) {
  return `
<!-- EXPERIMENT-RECORD:START -->
## Experiment start: ${id}

- Record type: experiment-start
- Experiment ID: ${id}
- Status: ${status}
- Data window: ${windowStart}..${windowEnd}
- Asset class: ${assetClass}
- Launched: ${launched}
- Hypothesis: The bounded change earns qualified exposure.
- Candidate evidence: Inspectable evidence with URL, date, locale, and native unit.
- Baseline: GSC, Vercel, and GitHub snapshots recorded separately.
- Change: One bounded acquisition-surface change.
- Publish date: ${launched}
- Index date: not-indexed
- Minimum exposure: 10 qualified-source visitors
- Success criteria: Predeclared exposure threshold and target response reached.
- Failure criteria: Minimum exposure reached without the target response.
- Stop criteria: Technical regression or evidence-backed harm.
- 24h readout: pending
- 7d readout: pending
- W2 readout: pending
- W4 readout: pending
- W8 readout: pending
- Result: pending
- Decision: wait
- Next step: Wait for the predeclared readout.
<!-- EXPERIMENT-RECORD:END -->
`;
}

function experimentReadout({
  id,
  observedAt,
  readout = "7d",
  status,
  result,
  decision,
}) {
  return `
<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: ${id} at ${observedAt}

- Record type: experiment-readout
- Experiment ID: ${id}
- Observed at: ${observedAt}
- Readout: ${readout}
- Status: ${status}
- Evidence: Native-unit observations recorded by source.
- Result: ${result}
- Decision: ${decision}
- Next step: Follow the predeclared decision.
<!-- EXPERIMENT-RECORD:END -->
`;
}

test("canonical Goal control plane passes", () => {
  assert.deepEqual(validationErrors(), []);
});

test("PLAN current experiment must exist as an active ledger start", () => {
  const errors = validationErrors({ experiments: removeCurrentExperiment() });

  assert.ok(
    errors.some(
      (error) =>
        error.includes(currentExperimentId) &&
        error.includes("active experiment in EXPERIMENTS.md"),
    ),
  );
});

test("PLAN active experiment count must match the ledger", () => {
  const plan = canonicalPlan.replace(
    "- Active experiments: 2.",
    "- Active experiments: 1.",
  );

  assert.ok(
    validationErrors({ plan }).some((error) =>
      error.includes("PLAN.md Active experiments is 1 but EXPERIMENTS.md has 2"),
    ),
  );
});

test("PLAN approved contract requires its matching campaign approval record", () => {
  assert.ok(
    validationErrors({ experiments: removeCampaignApproval() }).some((error) =>
      error.includes("campaign-approval record for 2026-07-18T22:06:21Z"),
    ),
  );
});

test("CLI path overrides validate the supplied control-plane files", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "wenlan-goal-check-"));
  const planPath = join(fixtureRoot, "PLAN.md");
  const experimentsPath = join(fixtureRoot, "EXPERIMENTS.md");
  try {
    await Promise.all([
      writeFile(planPath, canonicalPlan, "utf8"),
      writeFile(experimentsPath, canonicalExperiments, "utf8"),
    ]);
    const passing = await execFileAsync(process.execPath, [
      goalCheckScript,
      "--plan",
      planPath,
      "--experiments",
      experimentsPath,
    ]);
    assert.match(passing.stdout, /\[seo-goal\] PASS/);

    await writeFile(
      planPath,
      canonicalPlan.replace("GitHub total stars >= 100", "GitHub total stars >= 99"),
      "utf8",
    );
    await assert.rejects(
      execFileAsync(process.execPath, [
        goalCheckScript,
        "--plan",
        planPath,
        "--experiments",
        experimentsPath,
      ]),
      (error) => {
        assert.equal(error.code, 1);
        assert.match(error.stderr, /GitHub total stars >= 100/);
        return true;
      },
    );
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});

test("changed frozen targets fail with a specific contract error", () => {
  const changed = canonicalPlan.replace(
    "GitHub total stars >= 100",
    "GitHub total stars >= 99",
  );

  assert.ok(
    validationErrors({ plan: changed }).some((error) =>
      error.includes("GitHub total stars >= 100"),
    ),
  );
});

test("missing demand-discovery or approval clauses fail", () => {
  const withoutTrends = canonicalPlan.replace(
    "Google Trends must preserve query, geography, period, captured-at, and the raw 0-100 index.",
    "",
  );
  const withoutApproval = canonicalPlan.replace(
    "No deploy, Reddit or external article/message publication, OSS directory submission, paid acquisition, request indexing, GSC validation submission, push, or merge without explicit user approval.",
    "",
  );

  assert.ok(
    validationErrors({ plan: withoutTrends }).some((error) =>
      error.includes("Google Trends provenance"),
    ),
  );
  assert.ok(
    validationErrors({ plan: withoutApproval }).some((error) =>
      error.includes("approval boundary"),
    ),
  );
});

test("more than two active experiments fail", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-001",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-002",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      launched: "2026-07-25",
    }),
    experimentStart({
      id: "EXP-003",
      windowStart: "2026-08-01",
      windowEnd: "2026-08-07",
      launched: "2026-08-01",
    }),
  ].join("\n");

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("at most two active experiments"),
    ),
  );
});

test("an appended terminal readout removes an experiment from the active cap", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-009",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentReadout({
      id: "EXP-009",
      observedAt: "2026-07-25T00:00:00Z",
      status: "decided",
      result: "success",
      decision: "scale",
    }),
    experimentStart({
      id: "EXP-010",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      launched: "2026-07-25",
    }),
    experimentStart({
      id: "EXP-011",
      windowStart: "2026-08-01",
      windowEnd: "2026-08-07",
      launched: "2026-08-01",
    }),
  ].join("\n");

  const plan = canonicalPlan
    .replaceAll(currentExperimentId, "EXP-010")
    .replace("- Active experiments: 1.", "- Active experiments: 2.");

  assert.deepEqual(validationErrors({ plan, experiments }), []);
});

test("readout result and decision values must stay inside the ledger contract", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-016",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentReadout({
      id: "EXP-016",
      observedAt: "2026-07-25T00:00:00Z",
      status: "decided",
      result: "banana",
      decision: "teleport",
    }),
  ].join("\n");

  const errors = validationErrors({ experiments });
  assert.ok(errors.some((error) => error.includes('invalid Result "banana"')));
  assert.ok(errors.some((error) => error.includes('invalid Decision "teleport"')));
});

test("approved is a start status, not a readout status", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-021",
      status: "approved",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentReadout({
      id: "EXP-021",
      observedAt: "2026-07-25T00:00:00Z",
      status: "approved",
      result: "pending",
      decision: "wait",
    }),
  ].join("\n");

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes('invalid readout status "approved"'),
    ),
  );
});

test("readout timestamps are real UTC dates and strictly increase", () => {
  const start = experimentStart({
    id: "EXP-019",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  });
  const invalidDate = experimentReadout({
    id: "EXP-019",
    observedAt: "2026-02-31T00:00:00Z",
    status: "measuring",
    result: "pending",
    decision: "wait",
  });
  const later = experimentReadout({
    id: "EXP-019",
    observedAt: "2026-07-25T00:00:00Z",
    status: "stopped",
    result: "failure",
    decision: "stop",
  });
  const outOfOrder = experimentReadout({
    id: "EXP-019",
    observedAt: "2026-07-20T00:00:00Z",
    status: "active",
    result: "pending",
    decision: "wait",
  });

  assert.ok(
    validationErrors({
      experiments: `${experimentFreeExperiments}\n${start}\n${invalidDate}`,
    }).some((error) => error.includes("valid calendar timestamp")),
  );
  assert.ok(
    validationErrors({
      experiments: `${experimentFreeExperiments}\n${start}\n${later}\n${outOfOrder}`,
    }).some((error) => error.includes("strictly increase")),
  );
});

test("two launches in one reporting window pass when active and net-new caps hold", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-004",
      status: "active",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-005",
      status: "active",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      assetClass: "net-new-search",
      launched: "2026-07-19",
    }),
  ].join("\n");

  const plan = canonicalPlan.replaceAll(currentExperimentId, "EXP-005");

  assert.deepEqual(validationErrors({ plan, experiments }), []);
});

test("reporting windows remain anchored to the campaign cadence", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-012",
      status: "decided",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-013",
      status: "decided",
      windowStart: "2026-07-19",
      windowEnd: "2026-07-25",
      launched: "2026-07-19",
    }),
  ].join("\n");

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("campaign cadence anchored on 2026-07-18"),
    ),
  );
});

test("net-new search assets launched fewer than 14 days apart fail", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-006",
      status: "decided",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      assetClass: "net-new-search",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-007",
      status: "decided",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      assetClass: "net-new-search",
      launched: "2026-07-31",
    }),
  ].join("\n");

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("14 calendar days apart"),
    ),
  );
});

test("an experiment cannot launch after the frozen campaign deadline", () => {
  const experiments = `${experimentFreeExperiments}
${experimentStart({
  id: "EXP-020",
  windowStart: "2026-08-15",
  windowEnd: "2026-08-21",
  launched: "2026-08-19",
})}`;

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("cannot launch after 2026-08-18"),
    ),
  );
});

test("experiment starts require valid enums, seven-day windows, and readout fields", () => {
  const invalid = experimentStart({
    id: "EXP-008",
    status: "running",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-25",
    assetClass: "content-factory",
    launched: "2026-07-18",
  }).replace("- W8 readout: pending\n", "");

  const errors = validationErrors({
    experiments: `${experimentFreeExperiments}\n${invalid}`,
  });

  assert.ok(errors.some((error) => error.includes("invalid status")));
  assert.ok(errors.some((error) => error.includes("invalid asset class")));
  assert.ok(errors.some((error) => error.includes("seven complete dates")));
  assert.ok(errors.some((error) => error.includes("W8 readout")));
});

test("minimum exposure requires a positive threshold and a native unit", () => {
  const noUnit = experimentStart({
    id: "EXP-014",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  }).replace("10 qualified-source visitors", "10");
  const negative = experimentStart({
    id: "EXP-015",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  }).replace("10 qualified-source visitors", "-1 visitors");

  assert.ok(
    validationErrors({
      experiments: `${experimentFreeExperiments}\n${noUnit}`,
    }).some((error) => error.includes("positive threshold and native unit")),
  );
  assert.ok(
    validationErrors({
      experiments: `${experimentFreeExperiments}\n${negative}`,
    }).some((error) => error.includes("positive threshold and native unit")),
  );
});

test("unpaired experiment record markers fail instead of hiding a launch", () => {
  const experiments = `${experimentFreeExperiments}
<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-hidden`;

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("paired experiment record markers"),
    ),
  );
});

test("removing both record markers cannot erase a launch from cap accounting", () => {
  const hidden = experimentStart({
    id: "EXP-017",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  })
    .replace("<!-- EXPERIMENT-RECORD:START -->", "")
    .replace("<!-- EXPERIMENT-RECORD:END -->", "");

  assert.ok(
    validationErrors({
      experiments: `${experimentFreeExperiments}\n${hidden}`,
    }).some((error) => error.includes("experiment fields outside paired record markers")),
  );
});

test("moving the Ledger heading cannot hide earlier experiment records", () => {
  const hidden = experimentStart({
    id: "EXP-018",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  });
  const experiments = `${experimentFreeExperiments.replace("\n## Ledger\n", "\n")}
${hidden}
## Ledger
`;

  assert.ok(
    validationErrors({ experiments }).some((error) =>
      error.includes("experiment records before the Ledger section"),
    ),
  );
});
