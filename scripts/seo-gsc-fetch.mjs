#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const DEFAULT_SITE_URL = "sc-domain:wenlan.app";
const DEFAULT_OUTPUT_DIR = "/tmp/wenlan-seo";
const DEFAULT_QUOTA_PROJECT = "wenlan-500502";
const DEFAULT_SOURCE = "Search Console API";
const DEFAULT_API_BASE_URL = "https://searchconsole.googleapis.com/webmasters/v3";
const DAY_MS = 24 * 60 * 60 * 1000;
const execFileAsync = promisify(execFile);

function assertIsoDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    throw new Error(`${label} must be YYYY-MM-DD`);
  }
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function rangeFromReportDate(date) {
  assertIsoDate(date, "--date");
  const reportDate = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(reportDate.valueOf())) throw new Error("--date must be YYYY-MM-DD");
  const end = new Date(reportDate.valueOf() - DAY_MS);
  const start = new Date(end.valueOf() - 27 * DAY_MS);
  return {
    startDate: formatIsoDate(start),
    endDate: formatIsoDate(end),
  };
}

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

  const hasReportDate = Boolean(args.date);
  const hasStartDate = Boolean(args["start-date"]);
  const hasEndDate = Boolean(args["end-date"]);
  if (hasReportDate && (hasStartDate || hasEndDate)) {
    throw new Error("Use either --date or --start-date/--end-date, not both");
  }
  if (!hasReportDate && (!hasStartDate || !hasEndDate)) {
    throw new Error("Missing required --date or --start-date/--end-date");
  }

  const dateRange = hasReportDate
    ? rangeFromReportDate(args.date)
    : {
        startDate: args["start-date"],
        endDate: args["end-date"],
      };
  assertIsoDate(dateRange.startDate, "--start-date");
  assertIsoDate(dateRange.endDate, "--end-date");

  const fixtureDir = args["fixture-dir"] ? resolve(process.cwd(), args["fixture-dir"]) : null;

  return {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    siteUrl: args.site ?? DEFAULT_SITE_URL,
    outputDir: resolve(
      process.cwd(),
      args["output-dir"] || process.env.SEO_WEEKLY_INPUT_DIR || DEFAULT_OUTPUT_DIR,
    ),
    fixtureDir,
    source: fixtureDir ? `${DEFAULT_SOURCE} fixture` : DEFAULT_SOURCE,
    apiBaseUrl: (process.env.GSC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, ""),
  };
}

async function adcQuotaProject() {
  const credentialsPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    (process.env.HOME
      ? join(process.env.HOME, ".config", "gcloud", "application_default_credentials.json")
      : null);
  if (!credentialsPath) return null;

  try {
    const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
    return credentials.quota_project_id || null;
  } catch {
    return null;
  }
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv({ kind, rows, startDate, endDate, source }) {
  const firstHeader = kind === "query" ? "Query" : "Page";
  const lines = [
    [
      firstHeader,
      "Clicks",
      "Impressions",
      "CTR",
      "Position",
      "Start date",
      "End date",
      "Source",
    ].join(","),
  ];

  for (const row of rows ?? []) {
    const key = row.keys?.[0] ?? "";
    const clicks = Math.round(row.clicks ?? 0);
    const impressions = Math.round(row.impressions ?? 0);
    const ctr = `${((row.ctr ?? 0) * 100).toFixed(2)}%`;
    const position = Number(row.position ?? 0).toFixed(1);
    lines.push(
      [
        key,
        clicks,
        impressions,
        ctr,
        position,
        startDate,
        endDate,
        source,
      ]
        .map(csvEscape)
        .join(","),
    );
  }

  lines.push("");
  return lines.join("\n");
}

async function readFixture(fixtureDir, name) {
  return JSON.parse(await readFile(join(fixtureDir, `${name}.json`), "utf8"));
}

async function getAccessToken() {
  const envToken = process.env.GSC_ACCESS_TOKEN?.trim();
  if (envToken) return envToken;

  const { stdout } = await execFileAsync(
    "gcloud",
    ["auth", "application-default", "print-access-token"],
    { maxBuffer: 1024 * 1024 },
  );
  const adcToken = stdout.trim();
  if (!adcToken) {
    throw new Error("gcloud auth application-default print-access-token returned an empty token");
  }
  return adcToken;
}

async function getQuotaProject() {
  return (
    process.env.GSC_QUOTA_PROJECT?.trim() ||
    process.env.GOOGLE_CLOUD_QUOTA_PROJECT?.trim() ||
    await adcQuotaProject() ||
    DEFAULT_QUOTA_PROJECT
  );
}

async function gscRequest({ token, path, apiBaseUrl, quotaProject, options = {} }) {
  const quotaHeaders = quotaProject ? { "x-goog-user-project": quotaProject } : {};
  const response = await fetch(
    `${apiBaseUrl}/${path}`,
    {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
        accept: "application/json",
        "content-type": "application/json",
        ...quotaHeaders,
        ...(options.headers ?? {}),
      },
    },
  );
  const text = await response.text();
  if (!response.ok) {
    const scopeHint = text.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT")
      ? " Active token lacks Search Console scope; reauthorize with https://www.googleapis.com/auth/webmasters.readonly."
      : "";
    const quotaHint = text.includes("requires a quota project")
      ? " Set GSC_QUOTA_PROJECT or use gcloud auth application-default login so ADC has quota_project_id."
      : "";
    const serviceHint = text.includes("SERVICE_DISABLED")
      ? " Enable the Search Console API for the configured quota project, then retry after propagation."
      : "";
    throw new Error(
      `GSC API ${response.status} ${response.statusText}: ${text}${scopeHint}${quotaHint}${serviceHint}`,
    );
  }
  return text ? JSON.parse(text) : {};
}

async function searchAnalytics({
  token,
  siteUrl,
  startDate,
  endDate,
  dimension,
  apiBaseUrl,
  quotaProject,
}) {
  return gscRequest({
    token,
    path: `sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    apiBaseUrl,
    quotaProject,
    options: {
      method: "POST",
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: [dimension],
        rowLimit: 25000,
        startRow: 0,
      }),
    },
  });
}

async function fetchGscData(args) {
  if (args.fixtureDir) {
    const [queries, pages, sitemaps] = await Promise.all([
      readFixture(args.fixtureDir, "searchanalytics-query"),
      readFixture(args.fixtureDir, "searchanalytics-page"),
      readFixture(args.fixtureDir, "sitemaps"),
    ]);
    return { queries, pages, sitemaps };
  }

  const token = await getAccessToken();
  const quotaProject = await getQuotaProject();

  const [queries, pages, sitemaps] = await Promise.all([
    searchAnalytics({ ...args, token, quotaProject, dimension: "query" }),
    searchAnalytics({ ...args, token, quotaProject, dimension: "page" }),
    gscRequest({
      token,
      path: `sites/${encodeURIComponent(args.siteUrl)}/sitemaps`,
      apiBaseUrl: args.apiBaseUrl,
      quotaProject,
    }).catch((error) => ({ error: error.message })),
  ]);
  return { queries, pages, sitemaps };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const { queries, pages, sitemaps } = await fetchGscData(args);

  await mkdir(args.outputDir, { recursive: true });
  await writeFile(
    join(args.outputDir, "gsc-queries.csv"),
    rowsToCsv({
      kind: "query",
      rows: queries.rows ?? [],
      startDate: args.startDate,
      endDate: args.endDate,
      source: args.source,
    }),
    "utf8",
  );
  await writeFile(
    join(args.outputDir, "gsc-pages.csv"),
    rowsToCsv({
      kind: "page",
      rows: pages.rows ?? [],
      startDate: args.startDate,
      endDate: args.endDate,
      source: args.source,
    }),
    "utf8",
  );
  await writeFile(
    join(args.outputDir, "gsc-metadata.json"),
    JSON.stringify(
      {
        siteUrl: args.siteUrl,
        startDate: args.startDate,
        endDate: args.endDate,
        source: args.source,
        queryRows: queries.rows?.length ?? 0,
        pageRows: pages.rows?.length ?? 0,
        sitemaps,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        outputDir: args.outputDir,
        startDate: args.startDate,
        endDate: args.endDate,
        queryRows: queries.rows?.length ?? 0,
        pageRows: pages.rows?.length ?? 0,
        sitemapCount: sitemaps.sitemap?.length ?? 0,
        sitemapError: sitemaps.error ?? null,
      },
      null,
      2,
    ),
  );
}

run().catch((err) => {
  console.error(`[seo-gsc-fetch] ${err.message}`);
  process.exit(1);
});
