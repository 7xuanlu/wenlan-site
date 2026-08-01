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
const experimentsWithoutRecords = canonicalExperiments.replace(
  /\n?<!-- EXPERIMENT-RECORD:START -->[\s\S]*?<!-- EXPERIMENT-RECORD:END -->\n?/g,
  "\n",
);
const experimentFreeExperiments = experimentsWithoutRecords.replace(
  "<!-- EXPERIMENT-DATE-SCHEMA-V1 -->",
  `<!-- EXPERIMENT-DATE-SCHEMA-V1 -->\n${experimentStart({
    id: "EXP-2026-07-29-docs-github-acquisition",
    status: "stopped",
    windowStart: "2026-07-25",
    windowEnd: "2026-07-31",
    launched: "2026-07-29",
  }).trimStart()}`,
);
const currentExperimentSection = canonicalPlan.match(
  /\n### Current experiment\n([\s\S]*?)(?=\n### )/,
)?.[1];
const currentExperimentId = currentExperimentSection?.match(
  /`(EXP-[A-Za-z0-9][A-Za-z0-9-]*)`/,
)?.[1];
const canonicalActiveExperimentCount = Number(
  canonicalPlan.match(/^- Active experiments: (\d+)\.$/m)?.[1],
);

assert.ok(currentExperimentId, "PLAN.md must expose the current experiment ID");
assert.ok(
  Number.isInteger(canonicalActiveExperimentCount),
  "PLAN.md must expose the active experiment count",
);

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

function fixturePlan(currentId, activeCount) {
  return canonicalPlan
    .replaceAll(currentExperimentId, currentId)
    .replace(
      /^- Active experiments: \d+\.$/m,
      `- Active experiments: ${activeCount}.`,
    );
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

test("PLAN current experiment matches the unique production-in-flight experiment", () => {
  const measuringId = "EXP-030";
  const productionId = "EXP-031";
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: measuringId,
      status: "measuring",
      windowStart: "2026-08-01",
      windowEnd: "2026-08-07",
      launched: "2026-08-01",
    }),
    experimentStart({
      id: productionId,
      status: "active",
      windowStart: "2026-08-01",
      windowEnd: "2026-08-07",
      launched: "2026-08-02",
    }),
  ].join("\n");

  const errors = validationErrors({
    plan: fixturePlan(measuringId, 2),
    experiments,
  });

  assert.ok(
    errors.some((error) =>
      error.includes(
        `Current experiment must match the unique production-in-flight experiment "${productionId}"`,
      ),
    ),
  );
});

test("PLAN active experiment count must match the ledger", () => {
  const plan = canonicalPlan.replace(
    `- Active experiments: ${canonicalActiveExperimentCount}.`,
    "- Active experiments: 1.",
  );

  assert.ok(
    validationErrors({ plan }).some((error) =>
      error.includes(
        `PLAN.md Active experiments is 1 but EXPERIMENTS.md has ${canonicalActiveExperimentCount}`,
      ),
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

test("changed frozen targets fail with specific contract errors", () => {
  const changedStars = canonicalPlan.replace(
    "GitHub total stars >= 100",
    "GitHub total stars >= 99",
  );
  const changedClicks = canonicalPlan.replace(
    "property clicks >= 100",
    "property clicks >= 99",
  );
  const changedImpressions = canonicalPlan.replace(
    "property impressions >= 10,000",
    "property impressions >= 9,999",
  );

  assert.ok(
    validationErrors({ plan: changedStars }).some((error) =>
      error.includes("GitHub total stars >= 100"),
    ),
  );
  assert.ok(
    validationErrors({ plan: changedClicks }).some((error) =>
      error.includes("GSC property clicks >= 100"),
    ),
  );
  assert.ok(
    validationErrors({ plan: changedImpressions }).some((error) =>
      error.includes("GSC property impressions >= 10,000"),
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

test("frozen and mutable acquisition focus cannot drift back to generic memory", () => {
  const withoutFrozenCenter = canonicalPlan.replace(
    "The acquisition center for new experiments is one co-primary, non-ranked",
    "The acquisition center for new experiments is generic memory,",
  );
  const withoutParity = canonicalPlan.replace(
    "one co-primary, non-ranked cluster",
    "one priority-ordered cluster",
  );
  const withoutCodexChatGPT = canonicalPlan.replace(
    "Codex, ChatGPT, Claude Code, Obsidian, and MCP are first-class",
    "Claude Code, Obsidian, and MCP are secondary",
  );
  const withoutPriorityFamilies = canonicalPlan.replace(
    "The next candidate must be selected from fresh evidence for",
    "The next candidate may be selected from fresh evidence for",
  );
  const withoutMemoryBoundary = canonicalPlan.replace(
    "generic memory demand no longer nominates the next acquisition asset.",
    "generic memory demand may nominate the next acquisition asset.",
  );

  assert.ok(
    validationErrors({ plan: withoutFrozenCenter }).some((error) =>
      error.includes("co-primary trilingual AI knowledge-base"),
    ),
  );
  assert.ok(
    validationErrors({ plan: withoutParity }).some((error) =>
      error.includes("co-primary trilingual AI knowledge-base"),
    ),
  );
  assert.ok(
    validationErrors({ plan: withoutCodexChatGPT }).some((error) =>
      error.includes("Codex ChatGPT and tool-workflow acquisition entries"),
    ),
  );
  assert.ok(
    validationErrors({ plan: withoutPriorityFamilies }).some((error) =>
      error.includes("tool-workflow demand families"),
    ),
  );
  assert.ok(
    validationErrors({ plan: withoutMemoryBoundary }).some((error) =>
      error.includes("generic memory cannot nominate"),
    ),
  );
});

test("three measurement cohorts can coexist without blocking production", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-001",
      status: "measuring",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-002",
      status: "measuring",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      launched: "2026-07-25",
    }),
    experimentStart({
      id: "EXP-003",
      status: "measuring",
      windowStart: "2026-08-01",
      windowEnd: "2026-08-07",
      launched: "2026-08-01",
    }),
  ].join("\n");

  const plan = fixturePlan("EXP-003", 3);

  assert.deepEqual(validationErrors({ plan, experiments }), []);
});

test("two production-in-flight changes fail the single-change guard", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-001",
      status: "active",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-002",
      status: "approved",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      launched: "2026-07-25",
    }),
  ].join("\n");

  const plan = fixturePlan("EXP-002", 2);

  assert.ok(
    validationErrors({ plan, experiments }).some((error) =>
      error.includes("at most one production-in-flight change"),
    ),
  );
});

test("a terminal readout updates active reporting without blocking later production", () => {
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
      status: "measuring",
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

  const plan = fixturePlan("EXP-011", 2);

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

test("two launches in one reporting window pass when production is sequential", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-004",
      status: "measuring",
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

  const plan = fixturePlan("EXP-005", 2);

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

test("net-new search assets may launch fewer than 14 days apart after production verification", () => {
  const experiments = [
    experimentFreeExperiments,
    experimentStart({
      id: "EXP-006",
      status: "measuring",
      windowStart: "2026-07-18",
      windowEnd: "2026-07-24",
      assetClass: "net-new-search",
      launched: "2026-07-18",
    }),
    experimentStart({
      id: "EXP-007",
      status: "measuring",
      windowStart: "2026-07-25",
      windowEnd: "2026-07-31",
      assetClass: "net-new-search",
      launched: "2026-07-31",
    }),
  ].join("\n");

  const plan = fixturePlan("EXP-007", 2);

  assert.deepEqual(validationErrors({ plan, experiments }), []);
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

test("date-schema cutover accepts only dates or explicit sentinels", () => {
  const validSentinels = experimentStart({
    id: "EXP-022",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  }).replace("- Publish date: 2026-07-18", "- Publish date: not-published");
  const validDates = experimentStart({
    id: "EXP-023",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  }).replace("- Index date: not-indexed", "- Index date: 2026-07-19");
  const ambiguous = experimentStart({
    id: "EXP-024",
    windowStart: "2026-07-18",
    windowEnd: "2026-07-24",
    launched: "2026-07-18",
  })
    .replace(
      "- Publish date: 2026-07-18",
      "- Publish date: pending explicit approval",
    )
    .replace("- Index date: not-indexed", "- Index date: unknown-request-state");

  for (const valid of [validSentinels, validDates]) {
    const dateErrors = validationErrors({
      experiments: `${experimentFreeExperiments}\n${valid}`,
    }).filter(
      (error) =>
        error.includes("Publish date must") ||
        error.includes("Index date must"),
    );
    assert.deepEqual(dateErrors, []);
  }

  const errors = validationErrors({
    experiments: `${experimentFreeExperiments}\n${ambiguous}`,
  });

  assert.ok(
    errors.some((error) => error.includes("YYYY-MM-DD or not-published")),
  );
  assert.ok(
    errors.some((error) => error.includes("YYYY-MM-DD or not-indexed")),
  );
});

test("date-schema cutover cannot move inside or after its first V1 record", () => {
  const marker = "<!-- EXPERIMENT-DATE-SCHEMA-V1 -->";
  const firstDateSchemaExperimentId =
    "EXP-2026-07-29-docs-github-acquisition";
  const firstV1Start =
    "<!-- EXPERIMENT-RECORD:START -->\n" +
    `## Experiment start: ${firstDateSchemaExperimentId}`;
  const insideRecord = canonicalExperiments.replace(
    `${marker}\n${firstV1Start}`,
    `<!-- EXPERIMENT-RECORD:START -->\n${marker}\n## Experiment start: ${firstDateSchemaExperimentId}`,
  );
  const afterRecord = `${canonicalExperiments.replace(`${marker}\n`, "")}\n${marker}\n`;

  for (const experiments of [insideRecord, afterRecord]) {
    assert.ok(
      validationErrors({ experiments }).some((error) =>
        error.includes("must remain outside records and immediately precede"),
      ),
    );
  }
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
