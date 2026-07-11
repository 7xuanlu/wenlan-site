#!/usr/bin/env node

import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const DEFAULT_OUTPUT_DIR = "/tmp/wenlan-seo";
const DEFAULT_PROJECT_ID = "prj_nqR9IMJGE0Sw4lpFUdMtc1pCo4nb";
const DEFAULT_PROJECT_NAME = "wenlan-site";
const DEFAULT_SCOPE = "7xuanlus-projects";
const DAY_MS = 24 * 60 * 60 * 1000;

function parseIsoDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
  return parsed;
}

function dateRangeFromReportDate(date) {
  const reportDate = parseIsoDate(date, "--date");
  const endDate = new Date(reportDate.valueOf() - DAY_MS);
  const startDate = new Date(endDate.valueOf() - 27 * DAY_MS);
  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    until: reportDate.toISOString(),
  };
}

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (!argument.startsWith("--")) throw new Error(`Unexpected argument: ${argument}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}`);
    }
    values[argument.slice(2)] = value;
    index += 1;
  }

  if (!values.date) throw new Error("Missing required --date");
  const range = dateRangeFromReportDate(values.date);
  return {
    ...range,
    outputDir: resolve(values["output-dir"] ?? DEFAULT_OUTPUT_DIR),
    projectId: values["project-id"] ?? DEFAULT_PROJECT_ID,
    projectName: values["project-name"] ?? DEFAULT_PROJECT_NAME,
    scope: values.scope ?? DEFAULT_SCOPE,
    vercelCli: process.env.VERCEL_CLI_PATH || "vercel",
  };
}

function endpoint(pathname, args, by = null) {
  const query = new URLSearchParams({
    projectId: args.projectId,
    since: `${args.startDate}T00:00:00.000Z`,
    until: args.until,
  });
  if (by) {
    query.set("by", by);
    query.set("limit", "100");
  }
  return `${pathname}?${query.toString()}`;
}

async function runVercelApi(args, pathname) {
  const { stdout } = await execFileAsync(
    args.vercelCli,
    ["api", pathname, "--scope", args.scope, "--raw"],
    { maxBuffer: 4 * 1024 * 1024 },
  );
  return JSON.parse(stdout);
}

function metric(value, label) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`Vercel Analytics ${label} must be a non-negative number`);
  }
  return value;
}

function aggregateRows(response, dimension) {
  if (!Array.isArray(response.data)) {
    throw new Error(`Vercel Analytics ${dimension} response is missing data rows`);
  }
  return response.data.map((row) => ({
    label: String(row[dimension] ?? ""),
    visitors: metric(row.visitors, `${dimension} visitors`),
    pageviews: metric(row.pageviews, `${dimension} pageviews`),
  }));
}

function csvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv(header, rows) {
  return [header, ...rows.map((row) => row.map(csvCell).join(",")), ""].join("\n");
}

function eventGate(error) {
  const detail = `${error.stderr ?? ""}\n${error.message ?? ""}`;
  if (/Enterprise or Pro plan|Pro or Enterprise plan|\b402\b/i.test(detail)) {
    return {
      status: "account-gated",
      reason: "Pro or Enterprise plan required",
    };
  }
  throw error;
}

async function fetchCustomEventStatus(args) {
  try {
    const response = await runVercelApi(
      args,
      endpoint("/v1/query/web-analytics/events/count", args),
    );
    return {
      status: "available",
      count: response.data?.events ?? response.data?.count ?? 0,
    };
  } catch (error) {
    return eventGate(error);
  }
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const [countResponse, pageResponse, referrerResponse, customEvents] = await Promise.all([
    runVercelApi(args, endpoint("/v1/query/web-analytics/visits/count", args)),
    runVercelApi(
      args,
      endpoint("/v1/query/web-analytics/visits/aggregate", args, "requestPath"),
    ),
    runVercelApi(
      args,
      endpoint("/v1/query/web-analytics/visits/aggregate", args, "referrerHostname"),
    ),
    fetchCustomEventStatus(args),
  ]);
  const totals = {
    visitors: metric(countResponse.data?.visitors, "total visitors"),
    pageviews: metric(countResponse.data?.pageviews, "total pageviews"),
  };
  const pages = aggregateRows(pageResponse, "requestPath");
  const referrers = aggregateRows(referrerResponse, "referrerHostname");

  await mkdir(args.outputDir, { recursive: true });
  await Promise.all([
    writeFile(
      join(args.outputDir, "vercel-pages.csv"),
      rowsToCsv(
        "Path,Visitors,Pageviews",
        pages.map((row) => [row.label || "/", row.visitors, row.pageviews]),
      ),
      "utf8",
    ),
    writeFile(
      join(args.outputDir, "vercel-referrers.csv"),
      rowsToCsv(
        "Referrer,Visitors,Pageviews",
        referrers.map((row) => [row.label || "(direct)", row.visitors, row.pageviews]),
      ),
      "utf8",
    ),
    writeFile(
      join(args.outputDir, "vercel-metadata.json"),
      `${JSON.stringify({
        source: "Vercel Web Analytics API",
        projectId: args.projectId,
        projectName: args.projectName,
        scope: args.scope,
        startDate: args.startDate,
        endDate: args.endDate,
        totals,
        customEvents,
        fetchedAt: new Date().toISOString(),
      }, null, 2)}\n`,
      "utf8",
    ),
  ]);

  console.log(JSON.stringify({
    outputDir: args.outputDir,
    startDate: args.startDate,
    endDate: args.endDate,
    totals,
    pageRows: pages.length,
    referrerRows: referrers.length,
    customEvents,
  }, null, 2));
}

run().catch((error) => {
  console.error(`[seo-vercel-fetch] ${error.message}`);
  process.exit(1);
});
