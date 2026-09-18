#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";

const SURFACES = [
  "Google AI Overview",
  "Google AI Mode",
  "Claude",
  "ChatGPT",
  "Gemini",
  "Perplexity",
];
const DEFAULT_PROMPTS_DOC = "docs/seo-measurement.md";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") continue;
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    args[key] = value;
    i += 1;
  }

  if (!args.date) throw new Error("Missing required --date");

  const date = args.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("--date must be YYYY-MM-DD");
  }
  if (args.force && !["true", "false"].includes(args.force)) {
    throw new Error("--force must be true or false");
  }
  if (args.cohort && !["core", "legacy"].includes(args.cohort)) {
    throw new Error("--cohort must be core or legacy");
  }

  return {
    date,
    force: args.force === "true",
    cohort: args.cohort ?? "core",
    promptsDoc: resolve(process.cwd(), args["prompts-doc"] ?? DEFAULT_PROMPTS_DOC),
    outputPath: args.output
      ? resolve(process.cwd(), args.output)
      : resolve(process.cwd(), `docs/seo-audits/${date}-ai-visibility.md`),
  };
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function parsePromptMetadata(metadata) {
  if (!metadata) {
    return { language: "unknown", targetMarket: "unknown" };
  }

  const [language, targetMarket] = metadata
    .split("|")
    .map((value) => value.trim());
  return {
    language: language || "unknown",
    targetMarket: targetMarket || "unknown",
  };
}

function extractAiVisibilityPrompts(markdown, cohort = "core") {
  const lines = markdown.split(/\r?\n/);
  const prompts = [];
  let inSection = false;
  let hasCohortSections = false;
  let activeCohort = null;
  let task = "Unspecified task";

  for (const line of lines) {
    if (/^##\s+AI Visibility Prompts\s*$/.test(line)) {
      inSection = true;
      activeCohort = null;
      continue;
    }
    if (inSection && /^##\s+/.test(line)) break;
    if (!inSection) continue;

    const cohortHeading = line.match(/^###\s+(Core|Legacy)\b/i);
    if (cohortHeading) {
      hasCohortSections = true;
      activeCohort = cohortHeading[1].toLowerCase();
      task = "Unspecified task";
      continue;
    }

    if (hasCohortSections && activeCohort !== cohort) continue;

    const taskHeading = line.match(/^####\s+(.+?)\s*$/);
    if (taskHeading) {
      task = taskHeading[1];
      continue;
    }

    const match = line.match(/^(\d+)\.\s+(?:\[([^\]]+)\]\s+)?(.+?)\s*$/);
    if (match) {
      const metadata = parsePromptMetadata(match[2]);
      prompts.push({
        number: Number(match[1]),
        prompt: match[3],
        task,
        ...metadata,
      });
    }
  }

  return prompts;
}

function escapeTableCell(value) {
  return String(value).replace(/\|/g, "\\|");
}

function displayPath(path) {
  const relativePath = relative(process.cwd(), path);
  if (!relativePath.startsWith("..")) return relativePath;
  return path;
}

function surfaceSlug(surface) {
  return surface.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function observationId(prompt, surface) {
  return `${prompt.number}-${surfaceSlug(surface)}`;
}

function makeWorksheet({ date, prompts, promptsDoc, cohort }) {
  if (!prompts.length) {
    throw new Error("No AI visibility prompts found");
  }
  for (let i = 0; i < prompts.length; i += 1) {
    const expectedNumber = i + 1;
    if (prompts[i].number !== expectedNumber) {
      throw new Error(
        `AI visibility prompt numbering must be contiguous: expected ${expectedNumber}, found ${prompts[i].number}`,
      );
    }
  }

  const rows = [];
  const contextRows = [];
  for (const prompt of prompts) {
    for (const surface of SURFACES) {
      const id = observationId(prompt, surface);
      contextRows.push(
        `| ${id} | ${prompt.number} | ${surface} | ${escapeTableCell(prompt.language)} | ${escapeTableCell(prompt.targetMarket)} | unrun | unrun | unrun | unknown | unrun | unknown |`,
      );
      rows.push(
        `| ${id} | ${prompt.number} | ${surface} | unrun | unrun | unrun | unrun | unrun | unrun | unrun |`,
      );
    }
  }

  return `# AI Visibility Worksheet — ${date}

Generated from \`${promptsDoc}\` (cohort: **${cohort}**).

This worksheet is a manual observation log. The core cohort is the default diagnostic
set; the historical 28-prompt set is available only with \`--cohort legacy\`. Do not
infer results from a missing answer, and do not treat an unrun observation as zero.
Use \`unrun\` until the prompt is exercised and record \`unknown\` when a surface or
account does not expose the requested fact.

## Context record

The prompt catalog holds the exact query or prompt once. Each surface then gets its
own context row, because account, model, session, device, and capture time can
differ between surfaces. The target language and market come from the cohort
definition; actual country is observed session data and must remain \`unrun\` until
checked. A language target does not imply the observer's country. Use an ISO 8601
timestamp with an explicit timezone.

### Prompt catalog

| Prompt # | Task | Target language | Target market | Exact query/prompt |
| ---: | --- | --- | --- | --- |
${prompts
  .map(
    (prompt) =>
      `| ${prompt.number} | ${escapeTableCell(prompt.task)} | ${escapeTableCell(prompt.language)} | ${escapeTableCell(prompt.targetMarket)} | ${escapeTableCell(prompt.prompt)} |`,
  )
  .join("\n")}

### Per-surface context

| Observation ID | Prompt # | Surface | Target language | Target market | Actual country | Captured at (ISO 8601 + timezone) | Device | Account / personalization | Session | Model |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${contextRows.join("\n")}

## Surface observations

Record a linked citation separately from a brand mention. For Google, keep AI
Overview and AI Mode as separate surfaces. The cited URL should be the exact link
shown by the surface; use the evidence location for a source label, quote anchor,
or screenshot reference. \`Triggered?\`, \`Brand mention?\`, and \`Linked citation?\`
must remain \`unrun\` until checked manually.

| Observation ID | Prompt # | Surface | Triggered? | Brand mention? | Linked citation? | Cited URL / evidence location | Position/order | Accuracy / sentiment | Notes |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
${rows.join("\n")}
`;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const markdown = await readFile(args.promptsDoc, "utf8");
  const prompts = extractAiVisibilityPrompts(markdown, args.cohort);
  const worksheet = makeWorksheet({
    date: args.date,
    prompts,
    cohort: args.cohort,
    promptsDoc: displayPath(args.promptsDoc),
  });

  if (!args.force && (await exists(args.outputPath))) {
    throw new Error(
      `Refusing to overwrite existing worksheet: ${args.outputPath}. Pass --force true to regenerate placeholders.`,
    );
  }
  await mkdir(dirname(args.outputPath), { recursive: true });
  await writeFile(args.outputPath, worksheet, "utf8");
  console.log(`[seo-ai-visibility] wrote ${args.outputPath}`);
}

run().catch((err) => {
  console.error(`[seo-ai-visibility] ${err.message}`);
  process.exit(1);
});
