import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile, symlink, link } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import {
  buildDemandReport,
  localeForPage,
  normalizeKeyword,
  parseMonthlyRange,
  summarizeTrendPoints,
  validateManifest,
} from "./seo-demand-report.mjs";

const execFileAsync = promisify(execFile);
const scriptPath = resolve(fileURLToPath(new URL("./seo-demand-report.mjs", import.meta.url)));
const repoRoot = resolve(dirname(scriptPath), "..");

const base = {
  schemaVersion: 1,
  capturedAt: "2026-10-07T15:00:00-07:00",
  cohorts: [{
    id: "us-en",
    locale: "en",
    market: "United States",
    language: "English",
    network: "Google",
    periodStart: "2025-09-01",
    periodEnd: "2026-08-31",
    source: "authenticated Google Ads Keyword Planner UI",
    seeds: ["AI knowledge base"],
    observations: [
      { keyword: " AI  knowledge base ", monthlyRange: "100 – 1K", state: "observed", adsCompetition: "Medium" },
      { keyword: "quiet query", monthlyRange: null, state: "unavailable" },
      { keyword: "small query", monthlyRange: "0–10", state: "observed" },
    ],
    gsc: {
      source: "Search Console API",
      siteUrl: "sc-domain:wenlan.app",
      startDate: "2026-09-01",
      endDate: "2026-09-28",
      rows: [
        { query: "ai knowledge base", page: "https://wenlan.app/learn/ai-knowledge-base", clicks: 2, impressions: 10, position: 12 },
        { query: "AI   knowledge   base", page: "https://wenlan.app/learn/llm-wiki", clicks: 1, impressions: 30, position: 8 },
        { query: "AI knowledge base", page: "https://wenlan.app/zh-TW/learn/ai-knowledge-base", clicks: 0, impressions: 100, position: 1 },
      ],
    },
    decisions: [{
      keyword: "AI knowledge base",
      ownerUrl: "https://wenlan.app/learn/ai-knowledge-base",
      status: "investigate",
      rationale: "Review the current SERP before prioritizing.",
      serpEvidenceUrls: ["https://www.google.com/search?q=AI+knowledge+base"],
      nextAction: "Inspect the top results and compare intent.",
    }],
  }],
};

test("parses only observed monthly bands, including the 0-10 band", () => {
  assert.deepEqual(parseMonthlyRange("100 – 1K"), { lower: 100, upper: 1_000, label: "100 – 1K" });
  assert.deepEqual(parseMonthlyRange("0–10"), { lower: 0, upper: 10, label: "0–10" });
  assert.equal(parseMonthlyRange("500"), null);
  assert.equal(parseMonthlyRange(500), null);
});

test("report preserves 0-10 as a nonzero range and unavailable as unknown", () => {
  const report = buildDemandReport(base);
  assert.match(report, /\| small query \| 0–10 \|/);
  assert.match(report, /unavailable \(unknown; not zero\)/);
  assert.match(report, /unqueried \|/);
});

test("exact normalized query joins only same-locale pages and retains all page owners", () => {
  assert.equal(normalizeKeyword(" AI   Knowledge   Base "), "ai knowledge base");
  assert.equal(localeForPage("https://wenlan.app/zh-TW/learn/example"), "zh-TW");
  const report = buildDemandReport(base);
  assert.match(report, /https:\/\/wenlan\.app\/learn\/ai-knowledge-base: 2 clicks \/ 10 impressions \/ pos 12/);
  assert.match(report, /https:\/\/wenlan\.app\/learn\/llm-wiki: 1 clicks \/ 30 impressions \/ pos 8/);
  assert.match(report, /Impressions-weighted position \|[\s\S]*?\| 9\.00 \|/);
  assert.match(report, /same query also appears on other-locale page/);
  assert.doesNotMatch(report, /https:\/\/wenlan\.app\/zh-TW\/learn\/ai-knowledge-base: 0 clicks/);
  const keywordRow = report.split("\n").find(line => line.startsWith("|  AI  knowledge base "));
  assert.match(keywordRow ?? "", /investigate; see decision note/);
  assert.doesNotMatch(keywordRow ?? "", /Review the current SERP/);
  assert.equal(report.split("Review the current SERP before prioritizing.").length - 1, 1);

  const otherLocaleOnly = structuredClone(base);
  otherLocaleOnly.cohorts[0].gsc.rows = [base.cohorts[0].gsc.rows[2]];
  assert.match(buildDemandReport(otherLocaleOnly), /same query was observed only on other-locale page/);
});

test("warns when GSC country is absent or differs and when date windows differ", () => {
  const report = buildDemandReport(base);
  assert.match(report, /未提供國家範圍/);
  assert.match(report, /時間範圍未對齊/);
  const withCountry = structuredClone(base);
  withCountry.cohorts[0].gsc.country = "United States";
  assert.doesNotMatch(buildDemandReport(withCountry), /GSC 未提供國家範圍/);
  withCountry.cohorts[0].gsc.country = "Taiwan";
  assert.match(buildDemandReport(withCountry), /GSC 國家為 Taiwan/);
});

test("renders Google Trends relative indices separately and keeps index zero distinct from zero searches", () => {
  const withTrends = structuredClone(base);
  withTrends.cohorts[0].trends = [
    {
      query: "AI knowledge base",
      sourceUrl: "https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=AI%20knowledge%20base",
      geography: "United States",
      timeRange: "Past 12 months",
      searchType: "Web Search",
      status: "observed",
      points: [{ date: "2026-09-01", index: 0 }, { date: "2026-10-01", index: 100 }],
      note: "Relative interest series",
    },
    {
      query: "AI wiki",
      sourceUrl: "https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=AI%20wiki",
      geography: "United States",
      timeRange: "Past 12 months",
      searchType: "Web Search",
      status: "insufficient-data",
      note: "Low volume",
    },
  ];
  const report = buildDemandReport(withTrends);
  assert.match(report, /Google Trends context/);
  assert.match(report, /Relative-interest summary/);
  assert.match(report, /2026-09-01: 0/);
  assert.match(report, /Index 0 is not evidence of zero searches/);
  assert.match(report, /insufficient-data/);
  assert.match(report, /unknown \(no index points\)/);
  assert.match(report, /not used to rank or score/);

  withTrends.cohorts[0].trends[0].points[0].index = 100.1;
  assert.throws(() => validateManifest(withTrends), /index from 0 through 100/);
});

test("summarizes long Trends series compactly without dropping input points", () => {
  const points = Array.from({ length: 89 }, (_, index) => ({
    date: new Date(Date.UTC(2026, 9, 7) - (88 - index) * 86_400_000).toISOString().slice(0, 10),
    index: index === 0 ? 0 : index === 1 ? 100 : index,
  }));
  const before = structuredClone(points);
  const withLongSeries = structuredClone(base);
  withLongSeries.cohorts[0].trends = [{
    query: "long series",
    sourceUrl: "https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=long",
    geography: "United States",
    timeRange: "Past 12 months",
    searchType: "Web Search",
    status: "observed",
    points,
  }];

  const report = buildDemandReport(withLongSeries);
  const trendRow = report.split("\n").find(line => line.startsWith("| long series |"));
  assert.ok(trendRow);
  assert.ok(trendRow.length < 500, `Trends table row unexpectedly long: ${trendRow.length}`);
  assert.match(trendRow, /89 points; 88 nonzero; min 0, max 100/);
  assert.match(trendRow, /first 2026-07-11: 0/);
  assert.match(trendRow, /last 2026-10-07: 88/);
  assert.doesNotMatch(trendRow, /2026-08-15/);
  assert.deepEqual(withLongSeries.cohorts[0].trends[0].points, before);
  assert.equal(summarizeTrendPoints([]), "unknown (no index points)");
});

test("rejects invalid provenance, future dates, scalar volume, and negative positions", () => {
  const invalidSource = structuredClone(base);
  invalidSource.cohorts[0].source = "CSV midpoint";
  assert.throws(() => validateManifest(invalidSource), /source: must be authenticated Google Ads Keyword Planner UI/);

  const future = structuredClone(base);
  future.cohorts[0].periodEnd = "2027-01-01";
  assert.throws(() => validateManifest(future), /cannot be after capturedAt/);

  const scalar = structuredClone(base);
  scalar.cohorts[0].observations[0].monthlyRange = "500";
  assert.throws(() => validateManifest(scalar), /not a scalar or midpoint/);

  const negative = structuredClone(base);
  negative.cohorts[0].gsc.rows[0].position = -1;
  assert.throws(() => validateManifest(negative), /finite non-negative number/);

  const invalidCount = structuredClone(base);
  invalidCount.cohorts[0].gsc.rows[0].clicks = 1.5;
  assert.throws(() => validateManifest(invalidCount), /clicks and impressions must be integers/);

  const invalidCaptureDate = structuredClone(base);
  invalidCaptureDate.capturedAt = "2026-02-30T15:00:00Z";
  assert.throws(() => validateManifest(invalidCaptureDate), /capturedAt date: must be a real/);
});

test("rejects reversed windows and decision owners on a different locale path", () => {
  const reversed = structuredClone(base);
  reversed.cohorts[0].gsc.startDate = "2026-10-01";
  assert.throws(() => validateManifest(reversed), /startDate must not be after endDate/);

  const wrongOwner = structuredClone(base);
  wrongOwner.cohorts[0].decisions[0].ownerUrl = "https://wenlan.app/zh-CN/learn/ai-knowledge-base";
  assert.throws(() => validateManifest(wrongOwner), /page path must match cohort locale en/);
});

test("direct and pnpm CLI read the local manifest and write the requested report", async () => {
  const directory = await mkdtemp(join(tmpdir(), "wenlan-demand-report-"));
  try {
    const input = join(directory, "manifest.json");
    const directOutput = join(directory, "direct-report.md");
    const pnpmOutput = join(directory, "pnpm-report.md");
    await writeFile(input, JSON.stringify(base), "utf8");
    const direct = await execFileAsync(process.execPath, [scriptPath, "--", "--input", input, "--output", directOutput]);
    const viaPnpm = await execFileAsync("pnpm", ["seo:demand:report", "--", "--input", input, "--output", pnpmOutput], { cwd: repoRoot });
    assert.match(direct.stdout, /Wrote .*direct-report\.md/);
    assert.match(viaPnpm.stdout, /Wrote .*pnpm-report\.md/);
    assert.match(await readFile(directOutput, "utf8"), /Keyword demand and GSC comparison/);
    assert.match(await readFile(pnpmOutput, "utf8"), /Keyword demand and GSC comparison/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});


test("CLI never overwrites input, file aliases, or an existing report", async () => {
  const directory = await mkdtemp(join(tmpdir(), "wenlan-demand-preserve-"));
  try {
    const input = join(directory, "manifest.json");
    const original = JSON.stringify(base);
    await writeFile(input, original);
    const symbolic = join(directory, "alias.json");
    const hard = join(directory, "hard.json");
    const existing = join(directory, "existing.md");
    await symlink(input, symbolic);
    await link(input, hard);
    await writeFile(existing, "previous report");
    for (const output of [input, symbolic, hard, existing]) {
      await assert.rejects(execFileAsync(process.execPath, [scriptPath, "--input", input, "--output", output]), /EEXIST/);
      assert.equal(await readFile(input, "utf8"), original);
    }
    assert.equal(await readFile(existing, "utf8"), "previous report");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
