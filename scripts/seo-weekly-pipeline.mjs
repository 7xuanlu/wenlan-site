#!/usr/bin/env node

import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_DIR = "/tmp/wenlan-seo";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") continue;
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    i += 1;
  }

  if (!args.date) throw new Error("Missing required --date");

  return {
    date: args.date,
    inputDir: resolve(
      process.cwd(),
      args["input-dir"] || process.env.SEO_WEEKLY_INPUT_DIR || DEFAULT_INPUT_DIR,
    ),
    outputPath: args.output ? resolve(process.cwd(), args.output) : null,
  };
}

async function assertReadable(path, label) {
  try {
    await access(path, constants.R_OK);
  } catch {
    throw new Error(
      `Missing ${label}: ${path}. Export the GSC ${label} CSV there or pass --input-dir.`,
    );
  }
}

async function isReadable(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function runNode(args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
      } else {
        reject(new Error(`seo weekly generator exited with code ${code}`));
      }
    });
  });
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const queriesPath = join(args.inputDir, "gsc-queries.csv");
  const pagesPath = join(args.inputDir, "gsc-pages.csv");
  const metadataPath = join(args.inputDir, "gsc-metadata.json");

  await assertReadable(queriesPath, "queries");
  await assertReadable(pagesPath, "pages");

  const generatorArgs = [
    resolve(__dirname, "seo-weekly.mjs"),
    "--queries",
    queriesPath,
    "--pages",
    pagesPath,
    "--date",
    args.date,
  ];

  if (await isReadable(metadataPath)) {
    generatorArgs.push("--gsc-metadata", metadataPath);
  }

  if (args.outputPath) {
    generatorArgs.push("--output", args.outputPath);
  }

  for (const [filename, flag] of [
    ["umami-pages.csv", "--umami-pages"],
    ["umami-referrers.csv", "--umami-referrers"],
    ["umami-events.csv", "--umami-events"],
  ]) {
    const path = join(args.inputDir, filename);
    if (await isReadable(path)) {
      generatorArgs.push(flag, path);
    }
  }

  await runNode(generatorArgs);
}

run().catch((err) => {
  console.error(`[seo-weekly-pipeline] ${err.message}`);
  process.exit(1);
});
