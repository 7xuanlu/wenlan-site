#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const DEFAULT_OUTPUT_DIR = "/tmp/origin-seo";
const DEFAULT_API_BASE_URL = "https://api.umami.is/v1";
const DEFAULT_LIMIT = 500;
const METRIC_TYPES = ["entry", "referrer", "path"];
const UMAMI_SOURCE = "Umami metrics/expanded API";

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

  for (const key of ["start-date", "end-date"]) {
    if (!args[key]) throw new Error(`Missing required --${key}`);
  }

  return {
    startDate: parseDate(args["start-date"], "start-date"),
    endDate: parseDate(args["end-date"], "end-date"),
    outputDir: resolve(process.cwd(), args["output-dir"] ?? DEFAULT_OUTPUT_DIR),
    apiBaseUrl: stripTrailingSlash(
      args["api-base-url"] ??
        process.env.UMAMI_API_BASE_URL ??
        process.env.UMAMI_API_CLIENT_ENDPOINT ??
        DEFAULT_API_BASE_URL,
    ),
    websiteId:
      args["website-id"] ??
      process.env.UMAMI_WEBSITE_ID ??
      process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
      "",
    fixtureDir: args["fixture-dir"] ?? process.env.UMAMI_FIXTURE_DIR ?? "",
    limit: parsePositiveInteger(args.limit ?? DEFAULT_LIMIT, "limit"),
    skipIfMissing: parseBool(args["skip-if-missing"] ?? "false", "skip-if-missing"),
  };
}

function parseDate(value, label) {
  const text = String(value ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new Error(`Invalid --${label}: expected YYYY-MM-DD`);
  }
  const parsed = new Date(`${text}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== text) {
    throw new Error(`Invalid --${label}: ${text}`);
  }
  return text;
}

function parsePositiveInteger(value, label) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid --${label}: expected positive integer`);
  }
  return parsed;
}

function parseBool(value, label) {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  throw new Error(`Invalid --${label}: expected true or false`);
}

function stripTrailingSlash(value) {
  return String(value).replace(/\/+$/, "");
}

function addDays(date, days) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

function utcDateToMs(date) {
  return new Date(`${date}T00:00:00.000Z`).getTime();
}

function makeRange({ startDate, endDate }) {
  if (utcDateToMs(startDate) > utcDateToMs(endDate)) {
    throw new Error("--start-date must be on or before --end-date");
  }

  return {
    startAt: utcDateToMs(startDate),
    endAt: utcDateToMs(addDays(endDate, 1)) - 1,
  };
}

function getCredentials() {
  return {
    apiKey: process.env.UMAMI_API_KEY ?? "",
    authToken: process.env.UMAMI_AUTH_TOKEN ?? "",
  };
}

function canFetch(args, credentials) {
  return Boolean(args.fixtureDir || credentials.apiKey || credentials.authToken);
}

async function fetchMetric(type, args, range, credentials) {
  if (args.fixtureDir) {
    const fixturePath = join(args.fixtureDir, `${type}.json`);
    return parseMetricResponse(
      JSON.parse(await readFile(fixturePath, "utf8")),
      `fixture ${fixturePath}`,
      type,
    );
  }

  if (!args.websiteId) {
    throw new Error(
      "Missing Umami website id. Set UMAMI_WEBSITE_ID or NEXT_PUBLIC_UMAMI_WEBSITE_ID.",
    );
  }

  const url = new URL(
    `${args.apiBaseUrl}/websites/${encodeURIComponent(args.websiteId)}/metrics/expanded`,
  );
  url.searchParams.set("startAt", String(range.startAt));
  url.searchParams.set("endAt", String(range.endAt));
  url.searchParams.set("type", type);
  url.searchParams.set("limit", String(args.limit));

  const headers = {
    accept: "application/json",
  };
  if (credentials.apiKey) {
    headers["x-umami-api-key"] = credentials.apiKey;
  } else {
    headers.authorization = `Bearer ${credentials.authToken}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Umami ${type} metrics request failed: ${response.status} ${response.statusText} ${body}`.trim(),
    );
  }

  return parseMetricResponse(await response.json(), `Umami ${type} metrics`, type);
}

function parseMetricResponse(value, label, type) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} response must be an array`);
  }
  return value
    .map((row) => normalizeMetricRow(row, type))
    .filter((row) => row.name && row.count > 0);
}

function normalizeMetricRow(row, type) {
  const name = String(row.x ?? row.name ?? row.value ?? "").trim();
  const count = parseMetricCount(metricValueForType(row, type));
  return { name, count };
}

function metricValueForType(row, type) {
  if (type === "entry" || type === "referrer") {
    return row.visits;
  }
  if (type === "path") {
    return row.pageviews;
  }
  return undefined;
}

function parseMetricCount(value) {
  if (value === undefined || value === null) return 0;
  const text = String(value).trim().replace(/[ ,]/g, "");
  if (!/^(?:\d+|\d*\.\d+)$/.test(text)) return 0;
  const parsed = Number(text);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function csvEscape(value) {
  const text = String(value);
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function makeCsv(headers, rows) {
  return [
    headers.join(","),
    ...rows.map((row) => row.map(csvEscape).join(",")),
    "",
  ].join("\n");
}

function isLlmsPath(value) {
  return /\/llms(?:-full)?\.txt\b/i.test(String(value));
}

async function writeCsvs(args, metrics) {
  await mkdir(args.outputDir, { recursive: true });

  const metadata = [args.startDate, args.endDate, UMAMI_SOURCE];
  const landingRows = metrics.entry
    .filter((row) => !isLlmsPath(row.name))
    .map((row) => [row.name, row.count, ...metadata]);
  const referrerRows = metrics.referrer.map((row) => [
    row.name || "(direct)",
    row.count,
    ...metadata,
  ]);
  const llmsRows = metrics.path
    .filter((row) => isLlmsPath(row.name))
    .map((row) => ["pageview", row.name, row.count, ...metadata]);

  await Promise.all([
    writeFile(
      join(args.outputDir, "umami-pages.csv"),
      makeCsv(["Page", "Visits", "Start date", "End date", "Source"], landingRows),
      "utf8",
    ),
    writeFile(
      join(args.outputDir, "umami-referrers.csv"),
      makeCsv(["Referrer", "Visits", "Start date", "End date", "Source"], referrerRows),
      "utf8",
    ),
    writeFile(
      join(args.outputDir, "umami-events.csv"),
      makeCsv(["Event", "URL", "Count", "Start date", "End date", "Source"], llmsRows),
      "utf8",
    ),
  ]);

  return {
    landingRows: landingRows.length,
    referrerRows: referrerRows.length,
    llmsRows: llmsRows.length,
  };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const credentials = getCredentials();

  if (!canFetch(args, credentials)) {
    if (args.skipIfMissing) {
      console.log("[seo-umami-fetch] skipped: missing Umami API credentials");
      return;
    }
    throw new Error("Missing Umami API credentials. Set UMAMI_API_KEY or UMAMI_AUTH_TOKEN.");
  }

  const range = makeRange(args);
  const entries = await Promise.all(
    METRIC_TYPES.map(async (type) => [type, await fetchMetric(type, args, range, credentials)]),
  );
  const metrics = Object.fromEntries(entries);
  const counts = await writeCsvs(args, metrics);

  console.log(
    [
      `[seo-umami-fetch] wrote ${counts.landingRows} landing pages`,
      `${counts.referrerRows} referrers`,
      `${counts.llmsRows} llms path rows`,
      `for ${args.startDate} to ${args.endDate}`,
      `to ${args.outputDir}`,
    ].join(", "),
  );
}

run().catch((err) => {
  console.error(`[seo-umami-fetch] ${err.message}`);
  process.exit(1);
});
