#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";

const ASSISTANTS = ["Claude", "ChatGPT", "Gemini", "Perplexity"];
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

  return {
    date,
    force: args.force === "true",
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

function extractAiVisibilityPrompts(markdown) {
  const lines = markdown.split(/\r?\n/);
  const prompts = [];
  let inSection = false;

  for (const line of lines) {
    if (/^##\s+AI Visibility Prompts\s*$/.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection && /^##\s+/.test(line)) break;
    if (!inSection) continue;

    const match = line.match(/^(\d+)\.\s+(.+?)\s*$/);
    if (match) {
      prompts.push({
        number: Number(match[1]),
        prompt: match[2],
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

function makeWorksheet({ date, prompts, promptsDoc }) {
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
  for (const prompt of prompts) {
    for (const assistant of ASSISTANTS) {
      rows.push(
        `| ${prompt.number} | ${escapeTableCell(prompt.prompt)} | ${assistant} | manual | manual | manual | manual | manual | manual |`,
      );
    }
  }

  return `# AI Visibility Worksheet — ${date}

Generated from \`${promptsDoc}\`.

Do not infer results. Run each prompt manually in the listed assistant, then record whether Wenlan appears, its position/order, accuracy, sentiment, cited URLs, and notes.

| Prompt # | Prompt | Assistant | Wenlan appears? | Position/order | Accuracy | Sentiment | Cited URLs | Notes |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
${rows.join("\n")}
`;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const markdown = await readFile(args.promptsDoc, "utf8");
  const prompts = extractAiVisibilityPrompts(markdown);
  const worksheet = makeWorksheet({
    date: args.date,
    prompts,
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
