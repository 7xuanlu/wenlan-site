#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const LOCALES = ["en", "zh-TW", "zh-CN"];
const PLANNER_SOURCE = "authenticated Google Ads Keyword Planner UI";
const GSC_SOURCES = new Set(["Search Console API", "authenticated GSC UI export"]);
const DECISION_STATUSES = new Set(["investigate", "candidate", "hold", "reject"]);

function fail(path, message) {
  throw new Error(`${path}: ${message}`);
}

function objectAt(value, path) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(path, "must be an object");
  return value;
}

function stringAt(value, path) {
  if (typeof value !== "string" || !value.trim()) fail(path, "must be a non-empty string");
  return value.trim();
}

function arrayAt(value, path) {
  if (!Array.isArray(value)) fail(path, "must be an array");
  return value;
}

function validDate(value, path, capturedDate) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(path, "must be a real YYYY-MM-DD date");
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) fail(path, "must be a real YYYY-MM-DD date");
  if (capturedDate && value > capturedDate) fail(path, "cannot be after capturedAt");
  return value;
}

function absoluteUrl(value, path, { host } = {}) {
  let url;
  try { url = new URL(value); } catch { fail(path, "must be an absolute URL"); }
  if (url.protocol !== "https:" || (host && url.host !== host) || url.username || url.password) {
    fail(path, `must be an https URL${host ? ` on ${host}` : ""}`);
  }
  return url;
}

export function normalizeKeyword(keyword) {
  return String(keyword).trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

function parseVolumeBound(value) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*([KMB])?$/i);
  if (!match) return null;
  const multiplier = { "": 1, K: 1_000, M: 1_000_000, B: 1_000_000_000 }[match[2]?.toUpperCase() ?? ""];
  return Number(match[1]) * multiplier;
}

export function parseMonthlyRange(value) {
  if (typeof value !== "string") return null;
  const parts = value.trim().split(/\s*[–—-]\s*/);
  if (parts.length !== 2) return null;
  const lower = parseVolumeBound(parts[0]);
  const upper = parseVolumeBound(parts[1]);
  if (lower === null || upper === null || lower > upper) return null;
  return { lower, upper, label: value.trim() };
}

export function localeForPage(page) {
  const path = new URL(page).pathname;
  if (path === "/zh-TW" || path.startsWith("/zh-TW/")) return "zh-TW";
  if (path === "/zh-CN" || path.startsWith("/zh-CN/")) return "zh-CN";
  return "en";
}

export function validateManifest(input) {
  const manifest = objectAt(input, "manifest");
  if (manifest.schemaVersion !== 1) fail("schemaVersion", "must be 1");
  if (typeof manifest.capturedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(manifest.capturedAt) || !Number.isFinite(Date.parse(manifest.capturedAt))) {
    fail("capturedAt", "must be an ISO timestamp with timezone");
  }
  validDate(manifest.capturedAt.slice(0, 10), "capturedAt date");
  const capturedDate = new Date(manifest.capturedAt).toISOString().slice(0, 10);
  const cohorts = arrayAt(manifest.cohorts, "cohorts");
  const ids = new Set();
  cohorts.forEach((raw, index) => {
    const path = `cohorts[${index}]`;
    const cohort = objectAt(raw, path);
    const id = stringAt(cohort.id, `${path}.id`);
    if (ids.has(id)) fail(`${path}.id`, "must be unique");
    ids.add(id);
    if (!LOCALES.includes(cohort.locale)) fail(`${path}.locale`, `must be one of ${LOCALES.join(", ")}`);
    stringAt(cohort.market, `${path}.market`);
    stringAt(cohort.language, `${path}.language`);
    if (cohort.network !== "Google") fail(`${path}.network`, "must be Google");
    if (cohort.source !== PLANNER_SOURCE) fail(`${path}.source`, `must be ${PLANNER_SOURCE}`);
    const periodStart = validDate(cohort.periodStart, `${path}.periodStart`, capturedDate);
    const periodEnd = validDate(cohort.periodEnd, `${path}.periodEnd`, capturedDate);
    if (periodStart > periodEnd) fail(path, "periodStart must not be after periodEnd");
    const seeds = arrayAt(cohort.seeds, `${path}.seeds`);
    if (!seeds.length) fail(`${path}.seeds`, "must contain at least one seed");
    seeds.forEach((seed, seedIndex) => stringAt(seed, `${path}.seeds[${seedIndex}]`));
    const observations = arrayAt(cohort.observations, `${path}.observations`);
    observations.forEach((rawObservation, observationIndex) => {
      const observationPath = `${path}.observations[${observationIndex}]`;
      const observation = objectAt(rawObservation, observationPath);
      stringAt(observation.keyword, `${observationPath}.keyword`);
      if (observation.state === "observed") {
        if (parseMonthlyRange(observation.monthlyRange) === null) fail(`${observationPath}.monthlyRange`, "observed volumes must be a UI range such as 100 – 1K, not a scalar or midpoint");
      } else if (observation.state === "unavailable") {
        if (observation.monthlyRange !== null) fail(`${observationPath}.monthlyRange`, "must be null when state is unavailable");
      } else fail(`${observationPath}.state`, "must be observed or unavailable");
      if (observation.adsCompetition !== undefined && typeof observation.adsCompetition !== "string") fail(`${observationPath}.adsCompetition`, "must be a string when supplied");
    });
    if (cohort.gsc !== undefined) validateGsc(cohort.gsc, `${path}.gsc`, capturedDate);
    if (cohort.trends !== undefined) validateTrends(cohort.trends, `${path}.trends`, capturedDate);
    if (cohort.decisions !== undefined) validateDecisions(cohort.decisions, `${path}.decisions`, cohort.locale);
  });
  return manifest;
}

function validateTrends(raw, path, capturedDate) {
  arrayAt(raw, path).forEach((rawTrend, index) => {
    const trendPath = `${path}[${index}]`;
    const trend = objectAt(rawTrend, trendPath);
    stringAt(trend.query, `${trendPath}.query`);
    const sourceUrl = absoluteUrl(stringAt(trend.sourceUrl, `${trendPath}.sourceUrl`), `${trendPath}.sourceUrl`);
    if (sourceUrl.hostname !== "trends.google.com") fail(`${trendPath}.sourceUrl`, "must link to Google Trends");
    stringAt(trend.geography, `${trendPath}.geography`);
    stringAt(trend.timeRange, `${trendPath}.timeRange`);
    if (trend.searchType !== "Web Search") fail(`${trendPath}.searchType`, "must be Web Search");
    if (!["observed", "insufficient-data", "unavailable"].includes(trend.status)) fail(`${trendPath}.status`, "must be observed, insufficient-data, or unavailable");
    if (trend.note !== undefined && typeof trend.note !== "string") fail(`${trendPath}.note`, "must be a string");
    const points = trend.points === undefined ? [] : arrayAt(trend.points, `${trendPath}.points`);
    if (trend.status === "observed" && points.length === 0) fail(`${trendPath}.points`, "observed Trends data must contain at least one point");
    if (trend.status !== "observed" && points.length > 0) fail(`${trendPath}.points`, "non-observed Trends states cannot contain numeric points");
    points.forEach((rawPoint, pointIndex) => {
      const pointPath = `${trendPath}.points[${pointIndex}]`;
      const point = objectAt(rawPoint, pointPath);
      validDate(point.date, `${pointPath}.date`, capturedDate);
      if (typeof point.index !== "number" || !Number.isFinite(point.index) || point.index < 0 || point.index > 100) fail(`${pointPath}.index`, "must be a finite Google Trends index from 0 through 100");
    });
  });
}

function validateGsc(raw, path, capturedDate) {
  const gsc = objectAt(raw, path);
  if (!GSC_SOURCES.has(gsc.source)) fail(`${path}.source`, `must be one of ${[...GSC_SOURCES].join(" or ")}`);
  if (gsc.siteUrl !== "sc-domain:wenlan.app") fail(`${path}.siteUrl`, "must be sc-domain:wenlan.app");
  const start = validDate(gsc.startDate, `${path}.startDate`, capturedDate);
  const end = validDate(gsc.endDate, `${path}.endDate`, capturedDate);
  if (start > end) fail(path, "startDate must not be after endDate");
  if (gsc.country !== undefined) stringAt(gsc.country, `${path}.country`);
  if (gsc.scopeNote !== undefined && typeof gsc.scopeNote !== "string") fail(`${path}.scopeNote`, "must be a string");
  arrayAt(gsc.rows, `${path}.rows`).forEach((rawRow, index) => {
    const rowPath = `${path}.rows[${index}]`;
    const row = objectAt(rawRow, rowPath);
    stringAt(row.query, `${rowPath}.query`);
    absoluteUrl(stringAt(row.page, `${rowPath}.page`), `${rowPath}.page`, { host: "wenlan.app" });
    for (const field of ["clicks", "impressions", "position"]) {
      if (typeof row[field] !== "number" || !Number.isFinite(row[field]) || row[field] < 0) fail(`${rowPath}.${field}`, "must be a finite non-negative number");
    }
    if (!Number.isInteger(row.clicks) || !Number.isInteger(row.impressions)) fail(rowPath, "GSC clicks and impressions must be integers");
    if (row.clicks > row.impressions) fail(rowPath, "clicks cannot exceed impressions");
    if (row.position === 0) fail(`${rowPath}.position`, "GSC average position must be greater than zero");
  });
}

function validateDecisions(raw, path, locale) {
  arrayAt(raw, path).forEach((rawDecision, index) => {
    const decisionPath = `${path}[${index}]`;
    const decision = objectAt(rawDecision, decisionPath);
    stringAt(decision.keyword, `${decisionPath}.keyword`);
    const owner = absoluteUrl(stringAt(decision.ownerUrl, `${decisionPath}.ownerUrl`), `${decisionPath}.ownerUrl`, { host: "wenlan.app" });
    if (localeForPage(owner.href) !== locale) fail(`${decisionPath}.ownerUrl`, `page path must match cohort locale ${locale}`);
    if (!DECISION_STATUSES.has(decision.status)) fail(`${decisionPath}.status`, `must be one of ${[...DECISION_STATUSES].join(", ")}`);
    stringAt(decision.rationale, `${decisionPath}.rationale`);
    stringAt(decision.nextAction, `${decisionPath}.nextAction`);
    arrayAt(decision.serpEvidenceUrls, `${decisionPath}.serpEvidenceUrls`).forEach((url, urlIndex) => absoluteUrl(stringAt(url, `${decisionPath}.serpEvidenceUrls[${urlIndex}]`), `${decisionPath}.serpEvidenceUrls[${urlIndex}]`));
  });
}

function esc(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function gscEvidenceFor(cohort, keyword) {
  if (!cohort.gsc) return { matching: [], otherLocale: [] };
  const key = normalizeKeyword(keyword);
  const exact = cohort.gsc.rows.filter(row => normalizeKeyword(row.query) === key);
  return {
    matching: exact.filter(row => localeForPage(row.page) === cohort.locale),
    otherLocale: exact.filter(row => localeForPage(row.page) !== cohort.locale),
  };
}

function weightedPosition(rows) {
  const impressions = rows.reduce((total, row) => total + row.impressions, 0);
  if (impressions === 0) return null;
  return rows.reduce((total, row) => total + row.position * row.impressions, 0) / impressions;
}

function sortByVolume(observations) {
  return [...observations].sort((a, b) => {
    const rangeA = parseMonthlyRange(a.monthlyRange);
    const rangeB = parseMonthlyRange(b.monthlyRange);
    if (!rangeA || !rangeB) return rangeA ? -1 : rangeB ? 1 : normalizeKeyword(a.keyword).localeCompare(normalizeKeyword(b.keyword));
    return rangeB.lower - rangeA.lower || rangeB.upper - rangeA.upper || normalizeKeyword(a.keyword).localeCompare(normalizeKeyword(b.keyword));
  });
}

function rangeTieNote(observation, observations) {
  const range = parseMonthlyRange(observation.monthlyRange);
  if (!range) return "";
  const peers = observations.filter(item => {
    const peer = parseMonthlyRange(item.monthlyRange);
    return peer && peer.lower === range.lower && peer.upper === range.upper;
  });
  return peers.length > 1 ? ` (同區間並列 ${peers.length} 詞；非精確排序)` : "";
}

function renderCohort(cohort) {
  const gsc = cohort.gsc;
  const scopeWarning = !gsc
    ? "未提供 GSC 範圍，不能比較市場查詢覆蓋。"
    : [
      !gsc.country || gsc.country.toLocaleLowerCase() !== cohort.market.toLocaleLowerCase()
        ? `市場範圍未對齊：Keyword Planner 為 ${cohort.market}，GSC ${gsc.country ? `國家為 ${gsc.country}` : "未提供國家範圍（可能為全球資料）"}；不得視為同一市場的直接比較。`
        : "Keyword Planner 與 GSC 國家欄位一致。",
      gsc.startDate !== cohort.periodStart || gsc.endDate !== cohort.periodEnd
        ? `時間範圍未對齊：Planner ${cohort.periodStart} 至 ${cohort.periodEnd}；GSC ${gsc.startDate} 至 ${gsc.endDate}。`
        : "Planner 與 GSC 日期範圍一致。",
      "搜尋量仍為估計值，GSC 仍只代表本站可見查詢。",
    ].join(" ");
  const lines = [
    `## ${cohort.id} (${cohort.locale}; ${cohort.market}; ${cohort.language}; ${cohort.network})`,
    "",
    `- Planner source: ${cohort.source}; period: ${cohort.periodStart} to ${cohort.periodEnd}.`,
    `- GSC: ${gsc ? `${gsc.source}, ${gsc.siteUrl}, ${gsc.startDate} to ${gsc.endDate}${gsc.country ? `, country ${gsc.country}` : ""}` : "not supplied"}.`,
    `- Scope: ${scopeWarning}`,
    gsc?.scopeNote ? `- GSC scope note: ${esc(gsc.scopeNote)}` : null,
    "",
    "| Keyword Planner UI keyword | Monthly search range | Ads competition | Exact same-locale GSC query/page evidence | Impressions-weighted position | Manual decision |",
    "| --- | --- | --- | --- | ---: | --- |",
  ].filter(line => line !== null);
  const sorted = sortByVolume(cohort.observations);
  for (const observation of sorted) {
    const evidence = gscEvidenceFor(cohort, observation.keyword);
    const rows = evidence.matching;
    const position = weightedPosition(rows);
    const details = rows.length
      ? rows.map(row => `${esc(row.page)}: ${row.clicks} clicks / ${row.impressions} impressions / pos ${row.position}`).join("<br>")
      : "not observed in supplied GSC rows (unknown; not rank 0)";
    const crossLocale = evidence.otherLocale.length
      ? `; same query ${rows.length ? "also appears" : "was observed only"} on other-locale page(s): ${evidence.otherLocale.map(row => esc(row.page)).join(", ")}`
      : "";
    const decision = (cohort.decisions ?? []).find(item => normalizeKeyword(item.keyword) === normalizeKeyword(observation.keyword));
    const manual = decision ? `${decision.status}; see decision note` : "no manual decision";
    const range = observation.state === "unavailable" ? "unavailable (unknown; not zero)" : `${esc(observation.monthlyRange)}${rangeTieNote(observation, cohort.observations)}`;
    const competition = observation.adsCompetition ? `${esc(observation.adsCompetition)} (ad-market metric; not organic difficulty)` : "not supplied";
    lines.push(`| ${esc(observation.keyword)} | ${range} | ${competition} | ${details}${crossLocale} | ${position === null ? "unavailable" : position.toFixed(2)} | ${manual} |`);
  }
  lines.push("", "### Candidate and evidence notes", "");
  if (!gsc) lines.push("- Missing evidence: GSC query/page rows were not supplied; no query absence or ranking conclusion is possible.");
  if (gsc && gsc.rows.length === 0) lines.push("- GSC export contains no rows. This means no rows were supplied, not zero demand or position.");
  if (!cohort.decisions?.length) lines.push("- No manual decisions were supplied. This report does not select an easiest keyword or assign priority.");
  if (cohort.observations.some(item => item.state === "unavailable")) lines.push("- One or more Planner volumes are unavailable; unavailable is unknown, not zero.");
  if (!cohort.observations.length) lines.push("- No Keyword Planner observations were supplied.");
  if (cohort.trends !== undefined) {
    lines.push("", "### Google Trends context", "", "Trends uses a normalized relative-interest index (0–100), not search volume. Index 0 is not evidence of zero searches; insufficient or missing data stays unknown. The compact summary is descriptive only and is not used to rank or score; complete points remain in the input manifest and linked source.", "", "| Query | Geography | Time range | Search type | Status | Relative-interest summary | Source | Note |", "| --- | --- | --- | --- | --- | --- | --- | --- |");
    for (const trend of cohort.trends) {
      const points = summarizeTrendPoints(trend.points ?? []);
      lines.push(`| ${esc(trend.query)} | ${esc(trend.geography)} | ${esc(trend.timeRange)} | ${esc(trend.searchType)} | ${trend.status} | ${points} | [Google Trends](${trend.sourceUrl}) | ${esc(trend.note ?? "")} |`);
    }
    if (!cohort.trends.length) lines.push("| — | — | — | — | no observations | unknown | — | No Trends rows supplied; not zero interest. |");
  }
  const noSerp = (cohort.decisions ?? []).filter(item => item.serpEvidenceUrls.length === 0);
  if (noSerp.length) lines.push(`- Missing evidence: ${noSerp.map(item => item.keyword).join(", ")} has no SERP evidence URL recorded; intent review remains open.`);
  for (const decision of cohort.decisions ?? []) {
    lines.push(`- Manual ${decision.status}: “${esc(decision.keyword)}” → ${esc(decision.ownerUrl)}. Reason: ${esc(decision.rationale)} Next: ${esc(decision.nextAction)}${decision.serpEvidenceUrls.length ? ` Evidence: ${decision.serpEvidenceUrls.map(url => `[SERP](${url})`).join(", ")}` : ""}`);
  }
  return lines.join("\n");
}

export function summarizeTrendPoints(points) {
  if (points.length === 0) return "unknown (no index points)";
  const ordered = [...points].sort((left, right) => left.date.localeCompare(right.date));
  const values = ordered.map(point => point.index);
  const stats = values.reduce((summary, value) => ({
    min: Math.min(summary.min, value),
    max: Math.max(summary.max, value),
    nonzero: summary.nonzero + Number(value !== 0),
  }), { min: Infinity, max: -Infinity, nonzero: 0 });
  const first = ordered[0];
  const last = ordered.at(-1);
  return `${ordered.length} points; ${stats.nonzero} nonzero; min ${stats.min}, max ${stats.max}; first ${first.date}: ${first.index}; last ${last.date}: ${last.index}`;
}

export function buildDemandReport(manifest) {
  validateManifest(manifest);
  const capturedAt = manifest.capturedAt;
  const queried = new Set(manifest.cohorts.map(cohort => cohort.locale));
  const coverage = LOCALES.map(locale => `| ${locale} | ${queried.has(locale) ? "queried" : "unqueried"} |`).join("\n");
  return [
    "# Keyword demand and GSC comparison",
    "",
    `Captured: ${capturedAt}`,
    "",
    "Keyword Planner estimates and Search Console observations have different roles and units. Query matching is exact after case and whitespace normalization only; no semantic matching is inferred. Search volume bands are ordered only within each cohort; ties are shown and never imply exact volume ranking. An unobserved query is unknown, not zero or rank 0. Ad competition is not organic difficulty. Priority and easiest-to-rank choices require explicit manual decisions backed by intent/SERP review.",
    "",
    "## Locale coverage",
    "",
    "| Locale | Research status |",
    "| --- | --- |",
    coverage,
    "",
    ...manifest.cohorts.map(renderCohort),
    "",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--") continue;
    if (!flag.startsWith("--") || !["--input", "--output"].includes(flag)) throw new Error(`Unexpected argument: ${flag}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${flag}`);
    args[flag.slice(2)] = value;
    index += 1;
  }
  if (!args.input || !args.output) throw new Error("Usage: node scripts/seo-demand-report.mjs --input <manifest.json> --output <report.md>");
  return { input: resolve(args.input), output: resolve(args.output) };
}

async function main(argv = process.argv.slice(2)) {
  const { input, output } = parseArgs(argv);
  const manifest = JSON.parse(await readFile(input, "utf8"));
  const report = buildDemandReport(manifest);
  await writeFile(output, report, { encoding: "utf8", flag: "wx" });
  process.stdout.write(`Wrote ${output}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
