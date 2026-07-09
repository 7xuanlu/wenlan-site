#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const GROUPS = [
  {
    name: "Brand/entity",
    patterns: [/\bwenlan\b/i, /useorigin/i],
    page: "/",
  },
  {
    name: "MCP memory",
    patterns: [/\bmcp\b/i, /memory server/i],
    page: "/learn/mcp-memory-server",
  },
  {
    name: "Claude Code",
    patterns: [/claude code/i, /claude.*memory/i, /\/memory/i],
    page: "/learn/claude-code-memory",
  },
  {
    name: "Cursor/Codex workflows",
    patterns: [/cursor/i, /codex/i, /vs code/i, /gemini cli/i],
    page: "/learn/how-to-add-mcp-memory-to-cursor",
  },
  {
    name: "Setup/troubleshooting",
    patterns: [/setup/i, /install/i, /7878/i, /localhost/i, /where.*store/i, /add memory/i],
    page: "/docs/troubleshooting",
  },
  {
    name: "Comparisons",
    patterns: [/ vs /i, /alternative/i, /compare/i, /basic memory/i, /claude-mem/i, /mem0/i, /chatgpt/i, /superlocal/i],
    page: "/learn/wenlan-vs-basic-memory",
  },
  {
    name: "Obsidian/knowledge-base adjacent",
    patterns: [/obsidian/i, /knowledge base/i, /markdown/i, /notion/i],
    page: "/learn/wenlan-vs-obsidian-ai-memory",
  },
  {
    name: "Architecture/trust",
    patterns: [/provenance/i, /local-first/i, /local first/i, /private/i, /git history/i, /review/i, /trust/i],
    page: "/learn/local-first-ai-memory",
  },
  {
    name: "AI work memory",
    patterns: [/ai work memory/i, /agent memory/i, /persistent memory/i, /context/i, /handoff/i],
    page: "/learn/ai-work-memory",
  },
];

const ACTION_PRIORITY = {
  "technical-check": 1,
  "title-meta-refresh": 2,
  "quick-answer-refresh": 3,
  "internal-link-refresh": 4,
  "new-article-candidate": 5,
  distribution: 6,
  wait: 7,
};

const MIN_QUERY_ACTION_IMPRESSIONS = 3;
const MIN_PAGE_INTERNAL_LINK_IMPRESSIONS = 20;
const PRESERVED_SECTION_HEADINGS = [
  "Account-Gated Evidence Notes",
  "Deployed Technical SEO Checks",
  "Local Changes Made",
];
const DO_NOT_WRITE_GATE_HEADING = "## Do Not Write Yet Gate";
const AI_REFERRER_PATTERNS = [
  /chatgpt/i,
  /openai/i,
  /claude/i,
  /anthropic/i,
  /perplexity/i,
  /copilot/i,
  /gemini/i,
  /\bbard\b/i,
  /poe\.com/i,
  /you\.com/i,
];
const UMAMI_PAGE_METRIC_KEYS = [
  "views",
  "pageviews",
  "page_views",
  "visits",
  "visitors",
  "sessions",
  "count",
  "events",
];
const UMAMI_REFERRER_METRIC_KEYS = [
  "visitors",
  "visits",
  "views",
  "sessions",
  "count",
  "events",
];
const UMAMI_EVENT_METRIC_KEYS = [
  "count",
  "events",
  "visits",
  "views",
  "total",
];

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

  for (const key of ["queries", "pages", "date"]) {
    if (!args[key]) throw new Error(`Missing required --${key}`);
  }

  return {
    queriesPath: resolve(process.cwd(), args.queries),
    pagesPath: resolve(process.cwd(), args.pages),
    umamiPagesPath: args["umami-pages"]
      ? resolve(process.cwd(), args["umami-pages"])
      : null,
    umamiReferrersPath: args["umami-referrers"]
      ? resolve(process.cwd(), args["umami-referrers"])
      : null,
    umamiEventsPath: args["umami-events"]
      ? resolve(process.cwd(), args["umami-events"])
      : null,
    gscMetadataPath: args["gsc-metadata"]
      ? resolve(process.cwd(), args["gsc-metadata"])
      : null,
    date: args.date,
    outputPath: args.output
      ? resolve(process.cwd(), args.output)
      : resolve(REPO_ROOT, "docs/seo-audits", `${args.date}-weekly-seo.md`),
  };
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

function parseGscMetric(value, label, field, { integer = false } = {}) {
  const text = String(value ?? "").trim();
  if (!text) {
    throw new Error(`Missing GSC ${label} ${field} metric`);
  }

  const normalized = text.replace(/[ ,]/g, "");
  const validShape = integer
    ? /^\d+$/.test(normalized)
    : /^(?:\d+|\d*\.\d+)$/.test(normalized);
  const parsed = Number(normalized);

  if (!validShape || !Number.isFinite(parsed)) {
    throw new Error(`Invalid GSC ${label} ${field} metric "${text}"`);
  }

  if (integer && !Number.isSafeInteger(parsed)) {
    throw new Error(`Invalid GSC ${label} ${field} metric "${text}"`);
  }

  return parsed;
}

function extractEvidenceMetadata(queryRecords = [], pageRecords = [], gscMetadata = null) {
  if (queryRecords.length === 0 && !gscMetadata) assertGscRows(queryRecords, "queries");
  if (pageRecords.length === 0 && !gscMetadata) assertGscRows(pageRecords, "pages");

  const metadataDateRange = extractGscMetadataDateRange(gscMetadata);
  const metadataSource = extractGscMetadataSource(gscMetadata);
  const queryDateRange = queryRecords.length > 0
    ? extractGscDateRange(queryRecords, "queries")
    : metadataDateRange;
  const pageDateRange = pageRecords.length > 0
    ? extractGscDateRange(pageRecords, "pages")
    : metadataDateRange;
  const querySource = queryRecords.length > 0
    ? extractGscSource(queryRecords, "queries")
    : metadataSource;
  const pageSource = pageRecords.length > 0
    ? extractGscSource(pageRecords, "pages")
    : metadataSource;

  if (queryDateRange && pageDateRange && queryDateRange !== pageDateRange) {
    throw new Error(
      `Mismatched GSC date ranges: queries=${queryDateRange}; pages=${pageDateRange}`,
    );
  }
  if ((queryDateRange && !pageDateRange) || (!queryDateRange && pageDateRange)) {
    throw new Error(
      `One-sided GSC date metadata: queries=${queryDateRange ?? "unknown"}; pages=${pageDateRange ?? "unknown"}`,
    );
  }

  const dateRange = queryDateRange ?? pageDateRange ?? "Last 28 days";
  if (querySource && pageSource && querySource !== pageSource) {
    throw new Error(
      `Mismatched GSC data sources: queries=${querySource}; pages=${pageSource}`,
    );
  }
  if ((querySource && !pageSource) || (!querySource && pageSource)) {
    throw new Error(
      `One-sided GSC source metadata: queries=${querySource ?? "unknown"}; pages=${pageSource ?? "unknown"}`,
    );
  }

  const source = querySource ?? pageSource ?? "CSV export";

  return {
    dateRange,
    source,
    intro:
      source === "CSV export"
        ? "Generated from Google Search Console CSV exports. Raw exports stay outside git."
        : `Generated from ${source}. Raw exports stay outside git.`,
  };
}

function assertGscRows(records, label) {
  if (records.length === 0) {
    throw new Error(`GSC ${label} export has no data rows`);
  }
}

function extractGscMetadataDateRange(metadata) {
  if (!metadata) return null;
  const start = String(metadata.startDate ?? "").trim();
  const end = String(metadata.endDate ?? "").trim();
  if (!start || !end) {
    throw new Error("Incomplete GSC metadata date range");
  }
  return `${start} to ${end}`;
}

function extractGscMetadataSource(metadata) {
  if (!metadata) return null;
  const source = String(metadata.source ?? "").trim();
  if (!source) {
    throw new Error("Missing GSC metadata source");
  }
  return source;
}

function extractGscDateRange(records, label) {
  let datedRows = 0;
  const ranges = uniqueValues(
    records.map((row) => {
      const start = String(row.start_date ?? "").trim();
      const end = String(row.end_date ?? "").trim();
      if (!start && !end) return "";
      if (!start || !end) {
        throw new Error(`Incomplete GSC date metadata in ${label} export`);
      }
      datedRows += 1;
      return `${start} to ${end}`;
    }),
  ).sort();

  if (datedRows > 0 && datedRows < records.length) {
    throw new Error(`Partial GSC date metadata in ${label} export`);
  }

  if (ranges.length > 1) {
    throw new Error(`Mixed GSC date ranges in ${label} export: ${ranges.join("; ")}`);
  }

  return ranges[0] ?? null;
}

function extractGscSource(records, label) {
  let sourcedRows = 0;
  const sources = uniqueValues(
    records.map((row) => {
      const source = String(row.source ?? "").trim();
      if (!source) return "";
      sourcedRows += 1;
      return source;
    }),
  ).sort();

  if (sourcedRows > 0 && sourcedRows < records.length) {
    throw new Error(`Partial GSC source metadata in ${label} export`);
  }

  if (sources.length > 1) {
    throw new Error(`Mixed GSC source metadata in ${label} export: ${sources.join("; ")}`);
  }

  return sources[0] ?? null;
}

function uniqueValues(values) {
  return [...new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))];
}

function pct(clicks, impressions) {
  if (!impressions) return "0.00%";
  return `${((clicks / impressions) * 100).toFixed(2)}%`;
}

function oneDecimal(value) {
  return (Math.round(value * 10) / 10).toFixed(1);
}

function weightedAverage(rows) {
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  if (!impressions) return 0;
  const weighted = rows.reduce(
    (sum, row) => sum + row.position * row.impressions,
    0,
  );
  return weighted / impressions;
}

function normalizeQuery(row) {
  return {
    query: row.top_queries || row.query || "",
    clicks: parseGscMetric(row.clicks, "queries", "clicks", { integer: true }),
    impressions: parseGscMetric(row.impressions, "queries", "impressions", {
      integer: true,
    }),
    position: parseGscMetric(row.position, "queries", "position"),
  };
}

function normalizePage(row) {
  const rawPage = row.top_pages || row.page || "";
  return {
    page: toPath(rawPage),
    clicks: parseGscMetric(row.clicks, "pages", "clicks", { integer: true }),
    impressions: parseGscMetric(row.impressions, "pages", "impressions", {
      integer: true,
    }),
    position: parseGscMetric(row.position, "pages", "position"),
  };
}

function normalizeUmamiPage(row) {
  const rawPage =
    row.path ||
    row.page ||
    row.url ||
    row.landing_page ||
    row.top_pages ||
    row.route ||
    row.pathname ||
    "";

  return {
    page: toPath(rawPage),
    views: parseFirstMetric(row, UMAMI_PAGE_METRIC_KEYS),
  };
}

function normalizeUmamiReferrer(row) {
  const referrer = String(
    row.referrer ||
      row.source ||
      row.referrer_domain ||
      row.domain ||
      row.website ||
      row.host ||
      row.url ||
      row.name ||
      "",
  ).trim();

  return {
    referrer: referrer || "(direct)",
    visits: parseFirstMetric(row, UMAMI_REFERRER_METRIC_KEYS),
    channel: classifyReferrer(referrer),
  };
}

function normalizeUmamiEvent(row) {
  const event = String(
    row.event || row.event_name || row.name || row.event_type || "",
  ).trim();
  const rawPage =
    row.url ||
    row.path ||
    row.page ||
    row.target ||
    row.href ||
    row.pathname ||
    "";

  return {
    event: event || "-",
    page: toPath(rawPage),
    count: parseFirstMetric(row, UMAMI_EVENT_METRIC_KEYS),
  };
}

function hasMetric(row, keys) {
  return keys.some((key) => parseOptionalMetric(row[key]) !== null);
}

function hasCompleteMetrics(records, keys) {
  return records.length > 0 && records.every((row) => hasMetric(row, keys));
}

function parseFirstMetric(row, keys) {
  for (const key of keys) {
    const metric = parseOptionalMetric(row[key]);
    if (metric !== null) {
      return metric;
    }
  }
  return 0;
}

function parseOptionalMetric(value) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  if (!text) return null;
  if (text.includes("%") || text.startsWith("-")) return null;
  const normalized = text.replace(/[ ,]/g, "");
  if (!/^(?:\d+|\d*\.\d+)$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function classifyReferrer(referrer) {
  if (/reddit\.com/i.test(referrer)) return "Reddit";
  if (AI_REFERRER_PATTERNS.some((pattern) => pattern.test(referrer))) {
    return "AI referral";
  }
  return "Other";
}

function summarizeUmami({ pageRecords, referrerRecords, eventRecords }) {
  const hasPageExport = pageRecords.length > 0;
  const hasReferrerExport = referrerRecords.length > 0;
  const hasEventExport = eventRecords.length > 0;
  const hasExport =
    hasPageExport ||
    hasReferrerExport ||
    hasEventExport;
  const hasPageData = hasCompleteMetrics(pageRecords, UMAMI_PAGE_METRIC_KEYS);
  const hasReferrerData = hasCompleteMetrics(referrerRecords, UMAMI_REFERRER_METRIC_KEYS);
  const hasEventData = hasCompleteMetrics(eventRecords, UMAMI_EVENT_METRIC_KEYS);
  const hasLlmsData =
    (hasPageExport || hasEventExport) &&
    (!hasPageExport || hasPageData) &&
    (!hasEventExport || hasEventData);
  const landingPages = pageRecords
    .map(normalizeUmamiPage)
    .filter((row) => row.page !== "-" && row.views > 0)
    .sort((a, b) => b.views - a.views);
  const referrers = referrerRecords
    .map(normalizeUmamiReferrer)
    .filter((row) => row.referrer && row.visits > 0)
    .sort((a, b) => b.visits - a.visits);
  const events = eventRecords
    .map(normalizeUmamiEvent)
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count);
  const aiReferrers = referrers.filter((row) => row.channel === "AI referral");
  const redditReferrers = referrers.filter((row) => row.channel === "Reddit");
  const llmsPageHits = landingPages
    .filter((row) => isLlmsTarget(row.page))
    .reduce((sum, row) => sum + row.views, 0);
  const llmsEventHits = events
    .filter((row) => isLlmsTarget(row.page) || isLlmsTarget(row.event))
    .reduce((sum, row) => sum + row.count, 0);

  return {
    hasData: hasExport,
    hasPageData,
    hasReferrerData,
    hasLlmsData,
    landingPages,
    referrers,
    events,
    totalLandingViews: landingPages.reduce((sum, row) => sum + row.views, 0),
    aiReferrerVisits: aiReferrers.reduce((sum, row) => sum + row.visits, 0),
    aiReferrerCount: aiReferrers.length,
    redditVisits: redditReferrers.reduce((sum, row) => sum + row.visits, 0),
    redditReferrerCount: redditReferrers.length,
    llmsHits: llmsPageHits + llmsEventHits,
  };
}

function isLlmsTarget(value) {
  return /\/llms(?:-full)?\.txt\b/i.test(String(value));
}

function toPath(urlOrPath) {
  if (!urlOrPath) return "-";
  try {
    return new URL(urlOrPath).pathname || "/";
  } catch {
    return urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  }
}

function classifyQuery(query) {
  if (/"origin app"|"origin"\s+"app"|\borigin app\b/i.test(query)) {
    return {
      group: "Brand/entity",
      page: "/",
    };
  }

  if (/\bai memory app\b/i.test(query)) {
    return {
      group: "AI work memory",
      page: "/learn/ai-work-memory",
    };
  }

  if (/\bsuperlocal\b|\bsuper\s+local\s+memory\b/i.test(query)) {
    return {
      group: "Comparisons",
      page: "/learn/wenlan-vs-superlocal-memory",
    };
  }

  const match = GROUPS.find((group) =>
    group.patterns.some((pattern) => pattern.test(query)),
  );
  if (!match) return { group: "Other", page: "-" };

  if (/claude code.*\/memory|\/memory/i.test(query)) {
    return {
      group: "Claude Code",
      page: "/learn/claude-code-memory-command-vs-wenlan",
    };
  }

  if (/cursor/i.test(query)) {
    return {
      group: "Cursor/Codex workflows",
      page: "/learn/how-to-add-mcp-memory-to-cursor",
    };
  }

  return { group: match.name, page: match.page };
}

function classifyQueryAction(row) {
  if (row.page === "-") {
    return {
      action:
        row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS
          ? "new-article-candidate"
          : "wait",
      diagnosis:
        row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS
          ? "No mapped page answers this query cluster cleanly. Validate recurrence before writing."
          : "Too little query evidence for a new page. Keep tracking before changing content.",
    };
  }

  if (
    row.clicks === 0 &&
    row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS &&
    row.position >= 8 &&
    row.position <= 30
  ) {
    return {
      action: "title-meta-refresh",
      diagnosis:
        "Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer.",
    };
  }

  if (
    row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS &&
    row.position >= 8 &&
    row.position <= 30
  ) {
    return {
      action: "internal-link-refresh",
      diagnosis:
        "Page has demand but needs stronger internal links and supporting context.",
    };
  }

  if (
    row.clicks === 0 &&
    row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS &&
    row.position < 8
  ) {
    return {
      action: "wait",
      diagnosis:
        "Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy.",
    };
  }

  if (
    row.clicks === 0 &&
    row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS &&
    row.position > 30
  ) {
    return {
      action: "wait",
      diagnosis:
        "Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links.",
    };
  }

  return {
    action: "wait",
    diagnosis:
      "No immediate content action. Keep measuring before changing the page.",
  };
}

function classifyPageAction(row) {
  if (
    row.page === "/guides" ||
    row.page === "/docs/guides" ||
    row.page.startsWith("/guides/") ||
    row.page.startsWith("/docs/guides/")
  ) {
    return {
      action: "technical-check",
      diagnosis:
        "Old guide URL should remain redirected; verify canonical Learn URL is indexed.",
    };
  }

  if (
    row.page === "/learn" &&
    row.clicks === 0 &&
    row.impressions >= MIN_QUERY_ACTION_IMPRESSIONS &&
    row.position < 8
  ) {
    return {
      action: "quick-answer-refresh",
      diagnosis:
        "Learn hub ranks strongly but earns no clicks. Sharpen SERP title, description, and first-screen search-path copy.",
    };
  }

  if (row.clicks === 0 && row.impressions > 0 && row.position >= 8 && row.position <= 30) {
    const action = row.page === "/learn" ? "quick-answer-refresh" : "title-meta-refresh";
    return {
      action,
      diagnosis:
        row.page === "/learn"
          ? "Learn hub earns impressions with no clicks. Sharpen search-path copy and first-screen answer."
          : "Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.",
    };
  }

  if (
    row.page.startsWith("/learn/") &&
    row.clicks === 0 &&
    row.impressions >= MIN_PAGE_INTERNAL_LINK_IMPRESSIONS &&
    row.position > 30
  ) {
    return {
      action: "internal-link-refresh",
      diagnosis:
        "Existing Learn page has search demand but weak ranking. Add links from stronger related pages before rewriting content.",
    };
  }

  if (row.position >= 8 && row.position <= 30) {
    return {
      action: "internal-link-refresh",
      diagnosis:
        "Page has search demand. Add internal links from stronger related pages.",
    };
  }

  return {
    action: "wait",
    diagnosis:
      "No immediate page-level change. Keep tracking before editing.",
  };
}

function enrichQueries(rows) {
  return rows.map((row) => {
    const classified = classifyQuery(row.query);
    const enriched = { ...row, ...classified };
    return { ...enriched, ...classifyQueryAction(enriched) };
  });
}

function enrichPages(rows) {
  return rows.map((row) => ({ ...row, ...classifyPageAction(row) }));
}

function rankRows(rows) {
  return [...rows].sort((a, b) => {
    const priority =
      (ACTION_PRIORITY[a.action] ?? 99) - (ACTION_PRIORITY[b.action] ?? 99);
    if (priority !== 0) return priority;
    return b.impressions - a.impressions;
  });
}

function makeMarkdown({ date, queries, pages, evidence, umami }) {
  const evidenceMetadata =
    evidence ??
    extractEvidenceMetadata();
  const umamiSummary = umami ?? summarizeUmami({
    pageRecords: [],
    referrerRecords: [],
    eventRecords: [],
  });
  const queryTableClicks = queries.reduce((sum, row) => sum + row.clicks, 0);
  const queryTableImpressions = queries.reduce(
    (sum, row) => sum + row.impressions,
    0,
  );
  const groups = groupTotals(queries);
  const rankedQueries = rankRows(queries);
  const rankedPages = rankRows(pages);
  const topActions = rankRows([...queries, ...pages])
    .filter((row) => row.action !== "wait")
    .slice(0, 8);
  const topPage = [...pages].sort((a, b) => b.impressions - a.impressions)[0];
  const nextDate = addDays(date, 7);

  return `# Weekly SEO/GEO Audit — ${date}

${evidenceMetadata.intro}

## Snapshot

| Field | Value |
| --- | --- |
| Week of | ${date} |
| Date range | ${escapePipe(evidenceMetadata.dateRange)} |
| GSC data source | ${escapePipe(evidenceMetadata.source)} |
| Query table clicks | ${queryTableClicks} |
| Query table impressions | ${queryTableImpressions} |
| Query table CTR | ${pct(queryTableClicks, queryTableImpressions)} |
| Query table average position | ${oneDecimal(weightedAverage(queries))} |
| Top query groups | ${groups.slice(0, 4).map((group) => `${group.name} (${group.impressions})`).join(", ") || "-"} |
| Top page | ${topPage?.page ?? "-"} |
| Umami data source | ${umamiSummary.hasData ? "local CSV exports" : "manual / account-gated"} |
| Umami landing page views | ${formatUmamiLandingViews(umamiSummary)} |
| AI referrals | ${formatReferrerSummary(umamiSummary.aiReferrerVisits, umamiSummary.aiReferrerCount, umamiSummary.hasReferrerData)} |
| Reddit referrals | ${formatReferrerSummary(umamiSummary.redditVisits, umamiSummary.redditReferrerCount, umamiSummary.hasReferrerData)} |
| llms.txt hits | ${umamiSummary.hasLlmsData ? umamiSummary.llmsHits : "manual"} |

${umamiSummary.hasData ? `${makeUmamiMarkdown(umamiSummary)}\n\n` : ""}## Top Actions

${topActions.length ? topActions.map((row, index) => `${index + 1}. **${row.action}** — ${row.query ? `\`${row.query}\`` : `\`${row.page}\``}: ${row.diagnosis}`).join("\n") : "No immediate action. Keep measuring."}

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
${rankedQueries.map(queryRow).join("\n")}

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
${rankedPages.map(pageRow).join("\n")}

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run \`pnpm seo:technical:deployed\` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run \`pnpm build\` and \`pnpm seo:technical:built\` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old \`/guides/*\` and \`/docs/guides/*\` URLs redirect to canonical \`/learn/*\` URLs.
- [ ] Recheck changed redirects after deployment with \`pnpm seo:technical:deployed -- --require-direct-changed-redirects true\`.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and \`llms.txt\` hits.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Generate \`pnpm seo:ai-visibility -- --date YYYY-MM-DD\` and manually check whether AI assistants mention Wenlan accurately for the tracked prompts in \`docs/seo-measurement.md\`.
- [ ] Next measurement date: ${nextDate}.
`;
}

function formatUmamiLandingViews(umami) {
  if (!umami.hasPageData) return "manual";
  return `${umami.totalLandingViews} across ${umami.landingPages.length} ${plural(umami.landingPages.length, "row")}`;
}

function formatReferrerSummary(visits, count, hasData) {
  if (!hasData) return "manual";
  return `${visits} visits from ${count} ${plural(count, "referrer")}`;
}

function makeUmamiMarkdown(umami) {
  const landingPageSection = umami.hasPageData
    ? `| Page | Views |
| --- | ---: |
${umami.landingPages.slice(0, 8).map(umamiPageRow).join("\n") || "| - | 0 |"}`
    : "Manual / not exported or missing a recognized metric column.";
  const referrerSection = umami.hasReferrerData
    ? `| Referrer | Visits | Channel |
| --- | ---: | --- |
${umami.referrers.slice(0, 8).map(umamiReferrerRow).join("\n") || "| - | 0 | - |"}`
    : "Manual / not exported or missing a recognized metric column.";

  return `## Umami Evidence

Local Umami CSV exports were present. Treat these as export-row totals, not full-property totals unless the exported rows are complete.

### Landing Pages

${landingPageSection}

### Referrers

${referrerSection}`;
}

function umamiPageRow(row) {
  return `| ${formatPage(row.page)} | ${row.views} |`;
}

function umamiReferrerRow(row) {
  return `| ${escapePipe(row.referrer)} | ${row.visits} | ${row.channel} |`;
}

function plural(count, singular) {
  return count === 1 ? singular : `${singular}s`;
}

function metricPhrase(count, singular) {
  return `${count} ${plural(count, singular)}`;
}

function extractMarkdownSection(markdown, heading) {
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start === -1) return null;

  const next = markdown.indexOf("\n## ", start + marker.length);
  return markdown.slice(start, next === -1 ? undefined : next).trim();
}

function extractSnapshotValue(markdown, field) {
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`\\| ${escapedField} \\| ([^|]+) \\|`));
  return match?.[1]?.trim() ?? "";
}

function canPreserveManualSections(existingMarkdown, evidenceMetadata) {
  const existingDateRange = extractSnapshotValue(existingMarkdown, "Date range");
  const existingSource = extractSnapshotValue(existingMarkdown, "GSC data source");

  return (
    Boolean(existingDateRange) &&
    Boolean(existingSource) &&
    existingDateRange === evidenceMetadata.dateRange &&
    existingSource === evidenceMetadata.source
  );
}

function preserveManualSections(markdown, existingMarkdown, evidenceMetadata, visibleTableStats) {
  if (!canPreserveManualSections(existingMarkdown, evidenceMetadata)) {
    return markdown;
  }

  const preservedSections = PRESERVED_SECTION_HEADINGS
    .map((heading) => extractMarkdownSection(existingMarkdown, heading))
    .map((section) => refreshPreservedSection(section, visibleTableStats))
    .filter(Boolean);

  if (!preservedSections.length) return markdown;

  const insert = `${preservedSections.join("\n\n")}\n\n`;
  const gateIndex = markdown.indexOf(DO_NOT_WRITE_GATE_HEADING);

  if (gateIndex === -1) {
    return `${markdown.trimEnd()}\n\n${insert}`;
  }

  return `${markdown.slice(0, gateIndex)}${insert}${markdown.slice(gateIndex)}`;
}

function refreshPreservedSection(section, visibleTableStats) {
  if (!section || !visibleTableStats) return section;
  if (!section.startsWith("## Account-Gated Evidence Notes")) return section;

  return section.replace(
    /^- Normalized visible Search results tables: .*$/m,
    formatVisibleTableStats(visibleTableStats),
  );
}

function makeVisibleTableStats(queries, pages) {
  return {
    queryRows: queries.length,
    queryClicks: queries.reduce((sum, row) => sum + row.clicks, 0),
    queryImpressions: queries.reduce((sum, row) => sum + row.impressions, 0),
    pageRows: pages.length,
    pageClicks: pages.reduce((sum, row) => sum + row.clicks, 0),
    pageImpressions: pages.reduce((sum, row) => sum + row.impressions, 0),
  };
}

function formatVisibleTableStats(stats) {
  return [
    "- Normalized visible Search results tables:",
    metricPhrase(stats.queryRows, "query row"),
    "covering",
    metricPhrase(stats.queryClicks, "click"),
    "and",
    `${metricPhrase(stats.queryImpressions, "impression")};`,
    metricPhrase(stats.pageRows, "page row"),
    "covering",
    metricPhrase(stats.pageClicks, "click"),
    "and",
    `${metricPhrase(stats.pageImpressions, "impression")}.`,
    "The visible tables are action-queue evidence, not full-property totals.",
  ].join(" ");
}

function groupTotals(rows) {
  const totals = new Map();
  for (const row of rows) {
    const current = totals.get(row.group) ?? { name: row.group, impressions: 0, clicks: 0 };
    current.impressions += row.impressions;
    current.clicks += row.clicks;
    totals.set(row.group, current);
  }
  return [...totals.values()].sort((a, b) => b.impressions - a.impressions);
}

function queryRow(row) {
  return `| \`${escapePipe(row.query)}\` | ${row.group} | ${formatPage(row.page)} | ${row.impressions} | ${row.clicks} | ${pct(row.clicks, row.impressions)} | ${oneDecimal(row.position)} | ${row.action} | ${row.diagnosis} |`;
}

function pageRow(row) {
  return `| ${formatPage(row.page)} | ${row.impressions} | ${row.clicks} | ${pct(row.clicks, row.impressions)} | ${oneDecimal(row.position)} | ${row.action} | ${row.diagnosis} |`;
}

function formatPage(page) {
  return page === "-" ? "-" : `\`${escapePipe(page)}\``;
}

function escapePipe(value) {
  return String(value).replace(/\|/g, "\\|");
}

function addDays(date, days) {
  const parsed = new Date(`${date}T00:00:00Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const [
    queryText,
    pageText,
    umamiPageRecords,
    umamiReferrerRecords,
    umamiEventRecords,
    gscMetadata,
  ] = await Promise.all([
    readFile(args.queriesPath, "utf8"),
    readFile(args.pagesPath, "utf8"),
    readOptionalCsv(args.umamiPagesPath),
    readOptionalCsv(args.umamiReferrersPath),
    readOptionalCsv(args.umamiEventsPath),
    readOptionalJson(args.gscMetadataPath),
  ]);

  const queryRecords = parseCsv(queryText);
  const pageRecords = parseCsv(pageText);
  const evidence = extractEvidenceMetadata(queryRecords, pageRecords, gscMetadata);
  const queries = enrichQueries(queryRecords.map(normalizeQuery));
  const pages = enrichPages(pageRecords.map(normalizePage));
  const umami = summarizeUmami({
    pageRecords: umamiPageRecords,
    referrerRecords: umamiReferrerRecords,
    eventRecords: umamiEventRecords,
  });
  const visibleTableStats = makeVisibleTableStats(queries, pages);
  let markdown = makeMarkdown({ date: args.date, queries, pages, evidence, umami });

  await mkdir(dirname(args.outputPath), { recursive: true });
  try {
    const existingMarkdown = await readFile(args.outputPath, "utf8");
    markdown = preserveManualSections(markdown, existingMarkdown, evidence, visibleTableStats);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  await writeFile(args.outputPath, markdown, "utf8");
  console.log(`[seo-weekly] wrote ${args.outputPath}`);
}

async function readOptionalCsv(path) {
  if (!path) return [];
  return parseCsv(await readFile(path, "utf8"));
}

async function readOptionalJson(path) {
  if (!path) return null;
  return JSON.parse(await readFile(path, "utf8"));
}

run().catch((err) => {
  console.error(`[seo-weekly] ${err.message}`);
  process.exit(1);
});
