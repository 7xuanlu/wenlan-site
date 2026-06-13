#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_DIR = "/tmp/origin-seo";

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
      args["input-dir"] ?? process.env.SEO_WEEKLY_INPUT_DIR ?? DEFAULT_INPUT_DIR,
    ),
    outputPath: args.output ? resolve(process.cwd(), args.output) : null,
    skipUmamiFetch: parseBool(args["skip-umami-fetch"] ?? "false", "skip-umami-fetch"),
    umamiStartDate: args["umami-start-date"] ?? null,
    umamiEndDate: args["umami-end-date"] ?? null,
  };
}

function parseBool(value, label) {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`Invalid --${label}: expected true or false`);
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
        reject(new Error(`seo pipeline child exited with code ${code}`));
      }
    });
  });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = cells[index]?.trim() ?? "";
    });
    return record;
  });
}

function normalizeHeader(header) {
  return header
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function extractDateRange(records, label) {
  if (records.length === 0) return null;

  let datedRows = 0;
  const ranges = [
    ...new Set(
      records
        .map((row) => {
          const start = String(row.start_date ?? "").trim();
          const end = String(row.end_date ?? "").trim();
          if (!start && !end) return "";
          if (!start || !end) {
            throw new Error(`Incomplete GSC date metadata in ${label} export`);
          }
          datedRows += 1;
          return `${start} to ${end}`;
        })
        .filter(Boolean),
    ),
  ];

  if (datedRows > 0 && datedRows < records.length) {
    throw new Error(`Partial GSC date metadata in ${label} export`);
  }
  if (ranges.length > 1) {
    throw new Error(`Mixed GSC date ranges in ${label} export: ${ranges.join("; ")}`);
  }

  if (!ranges[0]) return null;
  const [startDate, endDate] = ranges[0].split(" to ");
  return { startDate, endDate };
}

async function resolveUmamiDateRange(args, queriesPath, pagesPath) {
  if (args.umamiStartDate || args.umamiEndDate) {
    if (!args.umamiStartDate || !args.umamiEndDate) {
      throw new Error("Pass both --umami-start-date and --umami-end-date");
    }
    return {
      startDate: args.umamiStartDate,
      endDate: args.umamiEndDate,
    };
  }

  const [queryRecords, pageRecords] = await Promise.all([
    readFile(queriesPath, "utf8").then(parseCsv),
    readFile(pagesPath, "utf8").then(parseCsv),
  ]);
  const queryRange = extractDateRange(queryRecords, "queries");
  const pageRange = extractDateRange(pageRecords, "pages");

  if (queryRange && pageRange) {
    const queryText = `${queryRange.startDate} to ${queryRange.endDate}`;
    const pageText = `${pageRange.startDate} to ${pageRange.endDate}`;
    if (queryText !== pageText) {
      throw new Error(`Mismatched GSC date ranges: queries=${queryText}; pages=${pageText}`);
    }
    return queryRange;
  }

  if (queryRange || pageRange) {
    throw new Error(
      `One-sided GSC date metadata: queries=${
        queryRange ? `${queryRange.startDate} to ${queryRange.endDate}` : "unknown"
      }; pages=${pageRange ? `${pageRange.startDate} to ${pageRange.endDate}` : "unknown"}`,
    );
  }

  return null;
}

async function maybeFetchUmami(args, queriesPath, pagesPath) {
  if (args.skipUmamiFetch) {
    console.log("[seo-weekly-pipeline] skipped Umami fetch: --skip-umami-fetch true");
    return {
      dateRange: await resolveUmamiDateRange(args, queriesPath, pagesPath),
      fetched: false,
    };
  }

  const dateRange = await resolveUmamiDateRange(args, queriesPath, pagesPath);
  if (!dateRange) {
    console.log(
      "[seo-weekly-pipeline] skipped Umami fetch: missing GSC date metadata; pass --umami-start-date and --umami-end-date to align ranges",
    );
    return { dateRange: null, fetched: false };
  }

  await runNode([
    resolve(__dirname, "seo-umami-fetch.mjs"),
    "--start-date",
    dateRange.startDate,
    "--end-date",
    dateRange.endDate,
    "--output-dir",
    args.inputDir,
    "--skip-if-missing",
    "true",
  ]);

  return {
    dateRange,
    fetched:
      hasConfiguredUmamiSource() &&
      (await isReadable(join(args.inputDir, "umami-pages.csv"))),
  };
}

function hasConfiguredUmamiSource() {
  return Boolean(
    process.env.UMAMI_FIXTURE_DIR ||
      process.env.UMAMI_API_KEY ||
      process.env.UMAMI_AUTH_TOKEN,
  );
}

async function shouldIncludeUmamiCsv(path, label, umamiState) {
  if (umamiState.fetched) return true;
  if (!umamiState.dateRange) return true;

  const records = parseCsv(await readFile(path, "utf8"));
  const range = extractDateRange(records, `Umami ${label}`);
  const expectedRange = `${umamiState.dateRange.startDate} to ${umamiState.dateRange.endDate}`;

  if (!range) {
    console.log(
      `[seo-weekly-pipeline] skipped ${label}: missing Umami date metadata for ${expectedRange}`,
    );
    return false;
  }

  const foundRange = `${range.startDate} to ${range.endDate}`;
  if (foundRange !== expectedRange) {
    throw new Error(`Mismatched Umami date range: ${label}=${foundRange}; GSC=${expectedRange}`);
  }

  return true;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const queriesPath = join(args.inputDir, "gsc-queries.csv");
  const pagesPath = join(args.inputDir, "gsc-pages.csv");

  await assertReadable(queriesPath, "queries");
  await assertReadable(pagesPath, "pages");
  const umamiState = await maybeFetchUmami(args, queriesPath, pagesPath);

  const generatorArgs = [
    resolve(__dirname, "seo-weekly.mjs"),
    "--queries",
    queriesPath,
    "--pages",
    pagesPath,
    "--date",
    args.date,
  ];

  if (args.outputPath) {
    generatorArgs.push("--output", args.outputPath);
  }

  for (const [filename, flag] of [
    ["umami-pages.csv", "--umami-pages"],
    ["umami-referrers.csv", "--umami-referrers"],
    ["umami-events.csv", "--umami-events"],
  ]) {
    const path = join(args.inputDir, filename);
    if (await isReadable(path) && await shouldIncludeUmamiCsv(path, filename, umamiState)) {
      generatorArgs.push(flag, path);
    }
  }

  await runNode(generatorArgs);
}

run().catch((err) => {
  console.error(`[seo-weekly-pipeline] ${err.message}`);
  process.exit(1);
});
