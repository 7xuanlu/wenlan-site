#!/usr/bin/env node

import { createHash } from "node:crypto";
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
    patterns: [/obsidian/i, /markdown/i, /notion/i],
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

const COMPARISON_TARGETS = [
  {
    pattern: /\bbasic\s*memory\b/i,
    page: "/learn/wenlan-vs-basic-memory",
  },
  {
    pattern: /\bclaude-mem\b/i,
    page: "/learn/wenlan-vs-claude-mem",
  },
  {
    pattern: /\bmem0\b/i,
    page: "/learn/wenlan-vs-mem0",
  },
  {
    pattern: /\bchatgpt\b/i,
    page: "/learn/wenlan-vs-chatgpt-memory",
  },
  {
    pattern: /\bobsidian\b/i,
    page: "/learn/wenlan-vs-obsidian-ai-memory",
  },
  {
    pattern: /\bnotion(?:\s+ai)?\b/i,
    page: "/learn/wenlan-vs-notion-ai",
  },
];

const KNOWLEDGE_BASE_WIKI_TARGETS = [
  {
    pattern:
      /\bsource[-\s]backed(?:\s+(?:ai|llm))?\s+(?:wiki|knowledge[-\s]?base)\b/i,
    page: "/learn/source-backed-wiki-pages-ai-work",
  },
  {
    pattern: /\b(?:llm|ai)\s+wiki\b/i,
    page: "/learn/distilled-wiki-pages-ai-memory",
  },
  {
    pattern: /AI\s*知識庫/i,
    page: "/zh-TW/learn/distilled-wiki-pages-ai-memory",
  },
  {
    pattern: /AI\s*知识库/i,
    page: "/zh-CN/learn/distilled-wiki-pages-ai-memory",
  },
  {
    pattern:
      /\b(?:ai\s+)?knowledge[-\s]?base(?:\s+for\s+(?:ai\s+)?agents?)?\b/i,
    page: "/learn/ai-work-memory-vs-knowledge-base",
  },
];

const ACTION_PRIORITY = {
  "technical-check": 1,
  "query-page-review": 2,
  "title-meta-refresh": 3,
  "quick-answer-refresh": 4,
  "internal-link-refresh": 5,
  "new-article-candidate": 6,
  distribution: 7,
  wait: 8,
};

const MIN_QUERY_ACTION_IMPRESSIONS = 3;
const MIN_PAGE_INTERNAL_LINK_IMPRESSIONS = 20;
const REPORT_SCHEMA_VERSION = 4;
const EXPECTED_GSC_SITE_URL = "sc-domain:wenlan.app";
const ACQUISITION_PRIORITY_GROUPS = new Set([
  "AI knowledge base / wiki",
]);
const QUALIFIED_CLICK_GROUPS = new Set([
  "AI knowledge base / wiki",
  "MCP memory",
  "Claude Code",
  "Cursor/Codex workflows",
  "Setup/troubleshooting",
  "Comparisons",
  "Obsidian/knowledge-base adjacent",
  "Architecture/trust",
  "AI work memory",
]);
const ACQUISITION_PRIORITY_PAGE =
  /^\/(?:(?:zh-TW|zh-CN)\/)?learn(?:\/(?:ai-work-memory-vs-knowledge-base|source-backed-wiki-pages-ai-work|distilled-wiki-pages-ai-memory))?$/;
const GENERATED_SECTION_HEADINGS = new Set([
  "Snapshot",
  "Vercel Analytics Evidence",
  "Umami Evidence",
  "Top Actions",
  "Query Action Queue",
  "GSC Click Opportunity Queue",
  "Page Action Queue",
  "Do Not Write Yet Gate",
]);
const FOLLOW_UP_HEADING = "## Follow-Up";
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
    vercelPagesPath: args["vercel-pages"]
      ? resolve(process.cwd(), args["vercel-pages"])
      : null,
    vercelReferrersPath: args["vercel-referrers"]
      ? resolve(process.cwd(), args["vercel-referrers"])
      : null,
    vercelMetadataPath: args["vercel-metadata"]
      ? resolve(process.cwd(), args["vercel-metadata"])
      : null,
    gscMetadataPath: args["gsc-metadata"]
      ? resolve(process.cwd(), args["gsc-metadata"])
      : null,
    queryPagesPath: args["query-pages"]
      ? resolve(process.cwd(), args["query-pages"])
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

function extractPropertyTotals(gscMetadata) {
  const totals = gscMetadata?.propertyTotals;
  if (!totals) return null;
  if (totals.aggregationType !== "byProperty") {
    throw new Error("GSC property totals aggregationType must be byProperty");
  }
  for (const field of ["clicks", "impressions"]) {
    if (!Number.isSafeInteger(totals[field]) || totals[field] < 0) {
      throw new Error(`GSC property totals ${field} must be a non-negative integer`);
    }
  }
  if (totals.impressions === 0) {
    if (totals.clicks !== 0) {
      throw new Error("GSC property totals clicks require impressions");
    }
    if (totals.ctr !== null || totals.position !== null) {
      throw new Error("GSC empty property totals must use null CTR and position");
    }
    return totals;
  }
  if (!Number.isFinite(totals.ctr) || totals.ctr < 0) {
    throw new Error("GSC property totals ctr must be a non-negative number");
  }
  if (!Number.isFinite(totals.position) || totals.position <= 0) {
    throw new Error("GSC property totals position must be a positive number");
  }
  if (totals.clicks > totals.impressions) {
    throw new Error("GSC property totals clicks cannot exceed impressions");
  }
  const expectedCtr = totals.clicks / totals.impressions;
  if (Math.abs(totals.ctr - expectedCtr) > 1e-12) {
    throw new Error("GSC propertyTotals CTR must equal clicks divided by impressions");
  }
  return totals;
}

function extractEvidenceMetadata(queryRecords = [], pageRecords = [], gscMetadata = null) {
  if (queryRecords.length === 0 && !gscMetadata) assertGscRows(queryRecords, "queries");
  if (pageRecords.length === 0 && !gscMetadata) assertGscRows(pageRecords, "pages");

  if (Number.isInteger(gscMetadata?.queryRows) && gscMetadata.queryRows !== queryRecords.length) {
    throw new Error(
      `GSC query row count disagrees with metadata: rows=${queryRecords.length}; metadata=${gscMetadata.queryRows}`,
    );
  }
  if (Number.isInteger(gscMetadata?.pageRows) && gscMetadata.pageRows !== pageRecords.length) {
    throw new Error(
      `GSC page row count disagrees with metadata: rows=${pageRecords.length}; metadata=${gscMetadata.pageRows}`,
    );
  }

  const metadataDateRange = extractGscMetadataDateRange(gscMetadata);
  const metadataSource = extractGscMetadataSource(gscMetadata);
  const queryRowDateRange =
    queryRecords.length > 0 ? extractGscDateRange(queryRecords, "queries") : null;
  const pageRowDateRange =
    pageRecords.length > 0 ? extractGscDateRange(pageRecords, "pages") : null;
  const queryRowSource = queryRecords.length > 0 ? extractGscSource(queryRecords, "queries") : null;
  const pageRowSource = pageRecords.length > 0 ? extractGscSource(pageRecords, "pages") : null;
  if (metadataDateRange && queryRowDateRange && metadataDateRange !== queryRowDateRange) {
    throw new Error(
      `GSC queries date range disagrees with metadata: rows=${queryRowDateRange}; metadata=${metadataDateRange}`,
    );
  }
  if (metadataDateRange && pageRowDateRange && metadataDateRange !== pageRowDateRange) {
    throw new Error(
      `GSC pages date range disagrees with metadata: rows=${pageRowDateRange}; metadata=${metadataDateRange}`,
    );
  }
  if (metadataSource && queryRowSource && metadataSource !== queryRowSource) {
    throw new Error(
      `GSC queries source disagrees with metadata: rows=${queryRowSource}; metadata=${metadataSource}`,
    );
  }
  if (metadataSource && pageRowSource && metadataSource !== pageRowSource) {
    throw new Error(
      `GSC pages source disagrees with metadata: rows=${pageRowSource}; metadata=${metadataSource}`,
    );
  }
  const queryDateRange =
    queryRowDateRange ?? metadataDateRange;
  const pageDateRange =
    pageRowDateRange ?? metadataDateRange;
  const querySource =
    queryRowSource ?? metadataSource;
  const pageSource =
    pageRowSource ?? metadataSource;

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
  const propertyTotals = extractPropertyTotals(gscMetadata);

  return {
    dateRange,
    source,
    propertyTotals,
    intro:
      source === "CSV export"
        ? "Generated from Google Search Console CSV exports. Raw exports stay outside git."
        : `Generated from ${source}. Raw exports stay outside git.`,
  };
}

function extractQueryPageEvidence(payload, evidence, gscMetadata) {
  if (!payload) {
    return {
      hasData: false,
      rows: [],
      byQuery: new Map(),
      byPage: new Map(),
    };
  }

  if (payload.siteUrl !== EXPECTED_GSC_SITE_URL) {
    throw new Error(
      `GSC query-page property must be ${EXPECTED_GSC_SITE_URL}; received ${payload.siteUrl ?? "missing"}`,
    );
  }
  if (
    !Array.isArray(payload.dimensions) ||
    payload.dimensions.length !== 2 ||
    payload.dimensions[0] !== "query" ||
    payload.dimensions[1] !== "page"
  ) {
    throw new Error('GSC query-page dimensions must be ["query", "page"]');
  }
  if (payload.responseAggregationType !== "byPage") {
    throw new Error("GSC query-page responseAggregationType must be byPage");
  }

  const dateRange = `${String(payload.startDate ?? "").trim()} to ${String(payload.endDate ?? "").trim()}`;
  if (dateRange !== evidence.dateRange) {
    throw new Error(
      `GSC query-page date range disagrees with report evidence: query-pages=${dateRange}; evidence=${evidence.dateRange}`,
    );
  }
  if (String(payload.source ?? "").trim() !== evidence.source) {
    throw new Error(
      `GSC query-page source disagrees with report evidence: query-pages=${payload.source ?? "missing"}; evidence=${evidence.source}`,
    );
  }
  if (!Array.isArray(payload.rows)) {
    throw new Error("GSC query-page rows must be an array");
  }
  if (!Number.isInteger(payload.rowCount) || payload.rowCount !== payload.rows.length) {
    throw new Error(
      `GSC query-page row count disagrees with payload: rows=${payload.rows.length}; rowCount=${payload.rowCount ?? "missing"}`,
    );
  }
  if (
    Number.isInteger(gscMetadata?.queryPageRows) &&
    gscMetadata.queryPageRows !== payload.rows.length
  ) {
    throw new Error(
      `GSC query-page row count disagrees with metadata: rows=${payload.rows.length}; metadata=${gscMetadata.queryPageRows}`,
    );
  }

  const seen = new Set();
  const rows = payload.rows.map((row, index) => {
    if (!Array.isArray(row.keys) || row.keys.length !== 2) {
      throw new Error(`GSC query-page row ${index + 1} must contain query and page keys`);
    }
    const query = String(row.keys[0] ?? "").trim();
    const page = toPath(String(row.keys[1] ?? "").trim());
    if (!query || page === "-") {
      throw new Error(`GSC query-page row ${index + 1} requires a non-empty query and page`);
    }
    const key = `${query}\u0000${page}`;
    if (seen.has(key)) {
      throw new Error(`GSC query-page rows contain duplicate mapping: ${query} -> ${page}`);
    }
    seen.add(key);

    const clicks = parseGscMetric(row.clicks, "query-page", "clicks", {
      integer: true,
    });
    const impressions = parseGscMetric(
      row.impressions,
      "query-page",
      "impressions",
      { integer: true },
    );
    const ctr = parseGscMetric(row.ctr, "query-page", "ctr");
    const position = parseGscMetric(row.position, "query-page", "position");
    if (impressions <= 0 || position <= 0 || clicks > impressions) {
      throw new Error(`GSC query-page row ${index + 1} has invalid native metrics`);
    }
    if (Math.abs(ctr - clicks / impressions) > 1e-12) {
      throw new Error(`GSC query-page row ${index + 1} CTR must equal clicks divided by impressions`);
    }
    return { query, page, clicks, impressions, ctr, position };
  });

  const byQuery = new Map();
  const byPage = new Map();
  for (const row of rows) {
    byQuery.set(row.query, [...(byQuery.get(row.query) ?? []), row]);
    byPage.set(row.page, [...(byPage.get(row.page) ?? []), row]);
  }
  const sortEvidenceRows = (candidates) =>
    candidates.sort(
      (a, b) =>
        b.impressions - a.impressions ||
        b.clicks - a.clicks ||
        a.position - b.position ||
        a.page.localeCompare(b.page),
    );
  for (const candidates of byQuery.values()) sortEvidenceRows(candidates);
  for (const candidates of byPage.values()) sortEvidenceRows(candidates);

  return { hasData: true, rows, byQuery, byPage };
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

function summarizeVercel({ pageRecords, referrerRecords, metadata }) {
  if (metadata?.source && metadata.source !== "Vercel Web Analytics API") {
    throw new Error(`Unsupported Vercel Analytics source: ${metadata.source}`);
  }
  const pages = pageRecords
    .map((row) => ({
      page: toPath(row.path || row.page || row.request_path || row.requestpath || ""),
      visitors: parseFirstMetric(row, ["visitors"]),
      pageviews: parseFirstMetric(row, ["pageviews", "page_views", "views"]),
    }))
    .filter((row) => row.page !== "-" && (row.visitors > 0 || row.pageviews > 0))
    .sort((a, b) => b.pageviews - a.pageviews);
  const referrers = referrerRecords
    .map((row) => {
      const referrer = row.referrer || row.source || row.referrer_hostname || "";
      return {
        referrer,
        visitors: parseFirstMetric(row, ["visitors", "visits"]),
        pageviews: parseFirstMetric(row, ["pageviews", "page_views", "views"]),
        channel: classifyReferrer(referrer),
      };
    })
    .filter((row) => row.referrer && (row.visitors > 0 || row.pageviews > 0))
    .sort((a, b) => b.visitors - a.visitors);
  const totals = metadata?.totals ?? null;
  if (totals) {
    for (const field of ["visitors", "pageviews"]) {
      if (!Number.isFinite(totals[field]) || totals[field] < 0) {
        throw new Error(`Vercel metadata totals.${field} must be a non-negative number`);
      }
    }
  }
  const customEvents = metadata?.customEvents ?? {
    status: "manual",
    reason: "not fetched",
  };
  const aiReferrers = referrers.filter((row) => row.channel === "AI referral");
  const redditReferrers = referrers.filter((row) => row.channel === "Reddit");

  return {
    hasData: pages.length > 0 || referrers.length > 0 || Boolean(metadata),
    source: metadata?.source ?? "Vercel Web Analytics API",
    dateRange:
      metadata?.startDate && metadata?.endDate
        ? `${metadata.startDate} to ${metadata.endDate}`
        : "manual / unavailable",
    totals,
    customEvents,
    pages,
    referrers,
    hasReferrerData: referrerRecords.length > 0,
    aiReferrerVisits: aiReferrers.reduce((sum, row) => sum + row.visitors, 0),
    aiReferrerCount: aiReferrers.length,
    redditVisits: redditReferrers.reduce((sum, row) => sum + row.visitors, 0),
    redditReferrerCount: redditReferrers.length,
    llmsHits: pages
      .filter((row) => isLlmsTarget(row.page))
      .reduce((sum, row) => sum + row.pageviews, 0),
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

  if (
    /\bobsidian\b/i.test(query) &&
    !/\b(?:vs|versus|alternative|compare|comparison)\b/i.test(query)
  ) {
    return {
      group: "Obsidian/knowledge-base adjacent",
      page: "/learn/wenlan-vs-obsidian-ai-memory",
    };
  }

  const comparisonTarget = COMPARISON_TARGETS.find(({ pattern }) =>
    pattern.test(query),
  );
  if (comparisonTarget) {
    return {
      group: "Comparisons",
      page: comparisonTarget.page,
    };
  }

  if (/\bwenlan\b/i.test(query) || /useorigin/i.test(query)) {
    return {
      group: "Brand/entity",
      page: "/",
    };
  }

  const knowledgeBaseWikiTarget = KNOWLEDGE_BASE_WIKI_TARGETS.find(
    ({ pattern }) => pattern.test(query),
  );
  if (knowledgeBaseWikiTarget) {
    return {
      group: "AI knowledge base / wiki",
      page: knowledgeBaseWikiTarget.page,
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
  if (row.mappingMismatch) {
    return {
      action: "query-page-review",
      diagnosis:
        "Observed GSC page differs from configured target. Inspect query intent, internal links, titles, and locale routing before editing.",
    };
  }

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

function enrichQueries(rows, queryPageEvidence) {
  return rows.map((row) => {
    const classified = classifyQuery(row.query);
    const observedPages = queryPageEvidence.byQuery.get(row.query) ?? [];
    const observedPage = observedPages[0]?.page ?? "-";
    const configuredTarget = classified.page;
    const mappingMismatch =
      observedPage !== "-" &&
      configuredTarget !== "-" &&
      !observedPages.some((candidate) => candidate.page === configuredTarget);
    const enriched = {
      ...row,
      group: classified.group,
      page: observedPage === "-" ? configuredTarget : observedPage,
      configuredTarget,
      observedPage,
      observedPages,
      queryPageEvidenceAvailable: queryPageEvidence.hasData,
      mappingMismatch,
    };
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

function isTopActionCandidate(row) {
  if (row.action === "technical-check") return true;
  if (ACQUISITION_PRIORITY_GROUPS.has(row.group)) return true;
  if (
    row.group === "Obsidian/knowledge-base adjacent" &&
    /\bobsidian\b/i.test(row.query ?? "") &&
    /\b(?:claude(?:\s+code)?|mcp)\b/i.test(row.query ?? "")
  ) {
    return true;
  }
  if (row.query) return false;
  return ACQUISITION_PRIORITY_PAGE.test(row.page ?? "");
}

function isProtectedAcquisitionQuery(query) {
  const classified = classifyQuery(query);
  if (ACQUISITION_PRIORITY_GROUPS.has(classified.group)) return true;
  return (
    classified.group === "Obsidian/knowledge-base adjacent" &&
    /\bobsidian\b/i.test(query) &&
    /\b(?:claude(?:\s+code)?|mcp)\b/i.test(query)
  );
}

function makeEvidenceFingerprint({
  date,
  queries,
  pages,
  queryPages,
  evidence,
  umami,
  vercel,
}) {
  const payload = {
    reportSchemaVersion: REPORT_SCHEMA_VERSION,
    date,
    queries,
    pages,
    queryPages: queryPages.rows,
    evidence,
    umami,
    vercel,
  };
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex")}`;
}

function makeMarkdown({
  date,
  queries,
  pages,
  queryPages,
  evidence,
  umami,
  vercel,
}) {
  const evidenceMetadata =
    evidence ??
    extractEvidenceMetadata();
  const umamiSummary = umami ?? summarizeUmami({
    pageRecords: [],
    referrerRecords: [],
    eventRecords: [],
  });
  const vercelSummary = vercel ?? summarizeVercel({
    pageRecords: [],
    referrerRecords: [],
    metadata: null,
  });
  if (
    vercelSummary.hasData &&
    vercelSummary.dateRange !== "manual / unavailable" &&
    evidenceMetadata.dateRange !== "Last 28 days" &&
    vercelSummary.dateRange !== evidenceMetadata.dateRange
  ) {
    throw new Error(
      `Vercel Analytics date range must match GSC: analytics=${vercelSummary.dateRange}; GSC=${evidenceMetadata.dateRange}`,
    );
  }
  const queryTableClicks = queries.reduce((sum, row) => sum + row.clicks, 0);
  const queryTableImpressions = queries.reduce(
    (sum, row) => sum + row.impressions,
    0,
  );
  const pageTableClicks = pages.reduce((sum, row) => sum + row.clicks, 0);
  const pageTableImpressions = pages.reduce((sum, row) => sum + row.impressions, 0);
  const propertyTotals = evidenceMetadata.propertyTotals;
  if (
    propertyTotals &&
    (queryTableClicks > propertyTotals.clicks ||
      queryTableImpressions > propertyTotals.impressions)
  ) {
    throw new Error(
      "Visible GSC query rows cannot exceed the byProperty clicks or impressions",
    );
  }
  const unavailable = "manual / unavailable";
  const queryVisibilityGap = propertyTotals
    ? `${propertyTotals.clicks - queryTableClicks} clicks; ${propertyTotals.impressions - queryTableImpressions} impressions`
    : unavailable;
  const groups = groupTotals(queries);
  const rankedQueries = rankRows(queries);
  const rankedPages = rankRows(pages);
  const clickOpportunities = makeClickOpportunities(pages, queryPages);
  const topActions = rankRows([...queries, ...pages])
    .filter((row) => row.action !== "wait" && isTopActionCandidate(row))
    .slice(0, 8);
  const topPage = [...pages].sort((a, b) => b.impressions - a.impressions)[0];
  const nextDate = addDays(date, 7);
  const evidenceFingerprint = makeEvidenceFingerprint({
    date,
    queries,
    pages,
    queryPages,
    evidence: evidenceMetadata,
    umami: umamiSummary,
    vercel: vercelSummary,
  });
  const analyticsSnapshot = vercelSummary.hasData
    ? `| Analytics data source | ${escapePipe(vercelSummary.source)} |
| Analytics date range | ${escapePipe(vercelSummary.dateRange)} |
| Analytics visitors | ${vercelSummary.totals?.visitors ?? "manual"} |
| Analytics pageviews | ${vercelSummary.totals?.pageviews ?? "manual"} |
| AI referrals | ${formatReferrerSummary(vercelSummary.aiReferrerVisits, vercelSummary.aiReferrerCount, vercelSummary.hasReferrerData)} |
| Reddit referrals | ${formatReferrerSummary(vercelSummary.redditVisits, vercelSummary.redditReferrerCount, vercelSummary.hasReferrerData)} |
| llms.txt hits | ${vercelSummary.pages.length > 0 ? vercelSummary.llmsHits : "manual"} |
| CTA custom events | ${formatCustomEventStatus(vercelSummary.customEvents)} |`
    : `| Umami data source | ${umamiSummary.hasData ? "local CSV exports" : "manual / account-gated"} |
| Umami landing page views | ${formatUmamiLandingViews(umamiSummary)} |
| AI referrals | ${formatReferrerSummary(umamiSummary.aiReferrerVisits, umamiSummary.aiReferrerCount, umamiSummary.hasReferrerData)} |
| Reddit referrals | ${formatReferrerSummary(umamiSummary.redditVisits, umamiSummary.redditReferrerCount, umamiSummary.hasReferrerData)} |
| llms.txt hits | ${umamiSummary.hasLlmsData ? umamiSummary.llmsHits : "manual"} |`;
  const analyticsEvidence = vercelSummary.hasData
    ? `${makeVercelMarkdown(vercelSummary)}\n\n`
    : umamiSummary.hasData
      ? `${makeUmamiMarkdown(umamiSummary)}\n\n`
      : "";

  return `# Weekly SEO/GEO Audit — ${date}

${evidenceMetadata.intro}

## Snapshot

| Field | Value |
| --- | --- |
| Week of | ${date} |
| Date range | ${escapePipe(evidenceMetadata.dateRange)} |
| GSC data source | ${escapePipe(evidenceMetadata.source)} |
| Evidence fingerprint | ${evidenceFingerprint} |
| Property clicks | ${propertyTotals?.clicks ?? unavailable} |
| Property impressions | ${propertyTotals?.impressions ?? unavailable} |
| Property CTR | ${propertyTotals?.ctr != null ? `${(propertyTotals.ctr * 100).toFixed(2)}%` : unavailable} |
| Property average position | ${propertyTotals?.position != null ? oneDecimal(propertyTotals.position) : unavailable} |
| Visible query table clicks | ${queryTableClicks} |
| Visible query table impressions | ${queryTableImpressions} |
| Visible query table CTR | ${pct(queryTableClicks, queryTableImpressions)} |
| Visible query table average position | ${oneDecimal(weightedAverage(queries))} |
| Query visibility gap | ${queryVisibilityGap} |
| Visible page table clicks | ${pageTableClicks} |
| Visible page table impressions | ${pageTableImpressions} |
| Top query groups | ${groups.slice(0, 4).map((group) => `${group.name} (${group.impressions})`).join(", ") || "-"} |
| Top page | ${topPage?.page ?? "-"} |
${analyticsSnapshot}

${analyticsEvidence}## Top Actions

Within this authenticated GSC report, only technical blockers, protected AI knowledge-base/wiki rows, and visible Obsidian + Claude/Claude Code/MCP query rows are nominated here. Generic Obsidian and other rows remain visible in the complete queues as measurement evidence. Separately, inspectable Trends plus independent corroboration may nominate a pre-GSC campaign candidate through the full candidate gate.

${topActions.length ? topActions.map((row, index) => `${index + 1}. **${row.action}** — ${row.query ? `\`${row.query}\`` : `\`${row.page}\``}: ${row.diagnosis}`).join("\n") : "No immediate action. Keep measuring."}

## Query Action Queue

${queryPages.hasData
    ? `| Query | Query group | Observed GSC page | Configured target | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |`
    : `| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |`}
${rankedQueries.map(queryRow).join("\n")}

${queryPages.hasData ? makeClickOpportunityMarkdown(clickOpportunities) : ""}

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
${rankedPages.map(pageRow).join("\n")}

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

The acquisition queue centers AI knowledge bases, LLM wiki, source-backed wiki, and knowledge bases for AI agents. In this GSC-derived queue, Obsidian enters Top Actions only when a visible query pairs it with Claude, Claude Code, or MCP. The campaign may still act earlier when inspectable Trends, independent corroboration, a clean coverage gap, maintained Wenlan proof, and standalone utility pass the complete candidate gate. Generic memory rows remain visible evidence and measuring cohorts, but they do not nominate the next acquisition experiment.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run \`pnpm seo:technical:deployed\` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run \`pnpm build\` and \`pnpm seo:technical:built\` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old \`/guides/*\` and \`/docs/guides/*\` URLs redirect to canonical \`/learn/*\` URLs.
- [ ] Recheck changed redirects after deployment with \`pnpm seo:technical:deployed -- --require-direct-changed-redirects true\`.
- [ ] Run \`pnpm seo:vercel:fetch -- --date YYYY-MM-DD\` before the weekly report; keep custom CTA events marked account-gated when the Vercel plan blocks them.
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
  return `${visits} ${plural(visits, "visit")} from ${count} ${plural(count, "referrer")}`;
}

function formatCustomEventStatus(customEvents) {
  if (customEvents.status === "available") {
    return `${customEvents.count ?? 0} events`;
  }
  return `${customEvents.status}: ${customEvents.reason ?? "manual"}`;
}

function makeVercelMarkdown(vercel) {
  const pageRows = vercel.pages
    .slice(0, 12)
    .map((row) => `| ${formatPage(row.page)} | ${row.visitors} | ${row.pageviews} |`)
    .join("\n");
  const referrerRows = vercel.referrers
    .slice(0, 12)
    .map((row) => `| ${escapePipe(row.referrer)} | ${row.visitors} | ${row.pageviews} | ${row.channel} |`)
    .join("\n");

  return `## Vercel Analytics Evidence

Authenticated Web Analytics API data for the linked Wenlan Vercel project. Property totals come from the count endpoint; tables show the top aggregate rows returned by the API.

### Pages

| Page | Visitors | Pageviews |
| --- | ---: | ---: |
${pageRows || "| - | 0 | 0 |"}

### Referrers

| Referrer | Visitors | Pageviews | Channel |
| --- | ---: | ---: | --- |
${referrerRows || "| - | 0 | 0 | - |"}`;
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

function extractMarkdownSections(markdown) {
  const lines = markdown.split("\n");
  const sections = [];
  let current = null;
  let fence = null;
  let inHtmlComment = false;

  for (const line of lines) {
    const blocked = Boolean(fence) || inHtmlComment;
    const heading = !blocked ? line.match(/^## (.+)$/) : null;
    if (heading) {
      if (current) sections.push(current);
      current = {
        heading: heading[1].trim(),
        lines: [line],
      };
    } else if (current) {
      current.lines.push(line);
    }

    const fenceMarker = !inHtmlComment
      ? line.match(/^\s*(`{3,}|~{3,})(.*)$/)
      : null;
    if (fenceMarker) {
      const marker = fenceMarker[1];
      if (!fence) {
        fence = {
          character: marker[0],
          length: marker.length,
        };
      } else if (
        marker[0] === fence.character &&
        marker.length >= fence.length &&
        fenceMarker[2].trim() === ""
      ) {
        fence = null;
      }
    }

    if (!fence) {
      if (!inHtmlComment && line.includes("<!--") && !line.includes("-->")) {
        inHtmlComment = true;
      } else if (inHtmlComment && line.includes("-->")) {
        inHtmlComment = false;
      }
    }
  }

  if (current) sections.push(current);
  return sections.map(({ heading, lines: sectionLines }) => ({
    heading,
    section: sectionLines.join("\n").trim(),
  }));
}

function replaceMarkdownSection(markdown, heading, replacement) {
  const section = extractMarkdownSections(markdown).find(
    (candidate) => candidate.heading === heading,
  );
  if (!section) return markdown;

  const start = markdown.indexOf(section.section);
  const end = start + section.section.length;
  return `${markdown.slice(0, start).trimEnd()}\n\n${replacement.trim()}\n\n${markdown
    .slice(end)
    .trimStart()}`.trimEnd() + "\n";
}

function extractSnapshotValue(markdown, field) {
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`\\| ${escapedField} \\| ([^|]+) \\|`));
  return match?.[1]?.trim() ?? "";
}

function canPreserveManualSections(existingMarkdown, markdown) {
  const existingFingerprint = extractSnapshotValue(
    existingMarkdown,
    "Evidence fingerprint",
  );
  const currentFingerprint = extractSnapshotValue(markdown, "Evidence fingerprint");
  return Boolean(existingFingerprint) && existingFingerprint === currentFingerprint;
}

function followUpItemKey(line) {
  const match = line.match(/^- \[[ xX]\] (.+)$/);
  if (!match) return null;

  const text = match[1]
    .replace(/\d{4}-\d{2}-\d{2}/g, "YYYY-MM-DD")
    .replace(/\s+/g, " ")
    .trim();
  return `text:${text}`;
}

function mergeFollowUpSections(generatedSection, existingSection) {
  const generatedLines = generatedSection.split("\n");
  const existingLines = existingSection.split("\n");
  const existingItems = new Map(
    existingLines
      .map((line) => [followUpItemKey(line), line])
      .filter(([key]) => Boolean(key)),
  );
  const generatedKeys = new Set();

  const mergedLines = generatedLines.map((line) => {
    const key = followUpItemKey(line);
    if (!key) return line;
    generatedKeys.add(key);
    const existingLine = existingItems.get(key);
    if (!existingLine) return line;

    let mergedLine = existingLine.startsWith("- [x]")
      ? line.replace(/^- \[[ xX]\]/, "- [x]")
      : line;
    const existingDate = existingLine.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
    if (existingDate) {
      mergedLine = mergedLine.replace("YYYY-MM-DD", existingDate);
    }
    return mergedLine;
  });

  const generatedText = new Set(
    generatedLines.map((line) => line.trim()).filter(Boolean),
  );
  const manualAdditions = existingLines
    .slice(1)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      const key = followUpItemKey(line);
      return key ? !generatedKeys.has(key) : !generatedText.has(trimmed);
    });

  return [
    ...mergedLines,
    ...(manualAdditions.length ? ["", ...manualAdditions] : []),
  ].join("\n").trim();
}

function preserveManualSections(markdown, existingMarkdown) {
  if (!canPreserveManualSections(existingMarkdown, markdown)) {
    return markdown;
  }

  const existingSections = extractMarkdownSections(existingMarkdown);
  const preservedSections = existingSections
    .filter(
      ({ heading }) =>
        !GENERATED_SECTION_HEADINGS.has(heading) &&
        heading !== "Follow-Up",
    )
    .map(({ section }) => section)
    .filter(Boolean);
  const existingFollowUp = existingSections.find(
    ({ heading }) => heading === "Follow-Up",
  );
  const generatedFollowUp = extractMarkdownSections(markdown).find(
    ({ heading }) => heading === "Follow-Up",
  );
  const generatedMarkdown =
    existingFollowUp && generatedFollowUp
      ? replaceMarkdownSection(
          markdown,
          "Follow-Up",
          mergeFollowUpSections(generatedFollowUp.section, existingFollowUp.section),
        )
    : markdown;

  if (!preservedSections.length) return generatedMarkdown;

  const insert = preservedSections.join("\n\n");
  const followUpIndex = generatedMarkdown.indexOf(FOLLOW_UP_HEADING);

  if (followUpIndex === -1) {
    return `${generatedMarkdown.trimEnd()}\n\n${insert}\n`;
  }

  return `${generatedMarkdown.slice(0, followUpIndex).trimEnd()}\n\n${insert}\n\n${generatedMarkdown
    .slice(followUpIndex)
    .trimStart()}`.trimEnd() + "\n";
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

function makeClickOpportunities(pages, queryPageEvidence) {
  const movePriority = new Map([
    ["query-page-review", 1],
    ["title-meta-refresh", 2],
    ["serp-intent-review", 3],
    ["internal-link-refresh", 4],
    ["evidence-gap-review", 5],
  ]);

  return pages
    .filter((page) => page.impressions > 0 && page.action !== "technical-check")
    .map((page) => {
      const observedRows = queryPageEvidence.byPage.get(page.page) ?? [];
      const visibleQualifiedRows = observedRows.filter(
        (row) =>
          row.clicks === 0 &&
          QUALIFIED_CLICK_GROUPS.has(classifyQuery(row.query).group),
      );
      const mismatchedRows = visibleQualifiedRows.filter((row) => {
        const configuredTarget = classifyQuery(row.query).page;
        return configuredTarget !== "-" && configuredTarget !== page.page;
      });
      const visibleQualifiedImpressions = visibleQualifiedRows.reduce(
        (sum, row) => sum + row.impressions,
        0,
      );
      const campaignLane =
        ACQUISITION_PRIORITY_PAGE.test(page.page) ||
        visibleQualifiedRows.some((row) => isProtectedAcquisitionQuery(row.query))
          ? "eligible"
          : "measuring-only";

      let nextMove = "evidence-gap-review";
      let diagnosis =
        "Page impressions are present, but qualified zero-click query evidence is hidden or absent. Inspect the privacy-visible join before editing.";
      if (mismatchedRows.length > 0) {
        nextMove = "query-page-review";
        diagnosis =
          "A visible qualified query lands on a different page than its configured target. Resolve intent and internal-link routing before editing copy.";
      } else if (visibleQualifiedImpressions > 0 && page.position >= 8 && page.position <= 30) {
        nextMove = "title-meta-refresh";
        diagnosis =
          "Visible qualified demand is in striking distance with zero query clicks. Review title, description, and first answer.";
      } else if (visibleQualifiedImpressions > 0 && page.position < 8) {
        nextMove = "serp-intent-review";
        diagnosis =
          "Visible qualified demand ranks on page one but earns no query clicks. Inspect SERP intent and snippet alignment.";
      } else if (visibleQualifiedImpressions > 0) {
        nextMove = "internal-link-refresh";
        diagnosis =
          "Visible qualified demand ranks beyond striking distance with zero query clicks. Strengthen relevant internal links before rewriting copy.";
      }

      return {
        ...page,
        visibleQualifiedRows,
        visibleQualifiedImpressions,
        campaignLane,
        nextMove,
        diagnosis,
      };
    })
    .filter(
      (row) =>
        row.visibleQualifiedImpressions > 0 ||
        (row.clicks === 0 && row.position <= 30),
    )
    .sort(
      (a, b) =>
        (a.campaignLane === "eligible" ? 0 : 1) -
          (b.campaignLane === "eligible" ? 0 : 1) ||
        (movePriority.get(a.nextMove) ?? 99) -
          (movePriority.get(b.nextMove) ?? 99) ||
        b.visibleQualifiedImpressions - a.visibleQualifiedImpressions ||
        b.impressions - a.impressions ||
        a.page.localeCompare(b.page),
    );
}

function makeClickOpportunityMarkdown(rows) {
  const tableRows = rows.slice(0, 12).map((row, index) => {
    const observedQueries = row.visibleQualifiedRows
      .slice(0, 3)
      .map((candidate) => `\`${escapePipe(candidate.query)}\` (${candidate.impressions})`)
      .join("<br>");
    return `| ${index + 1} | ${formatPage(row.page)} | ${row.campaignLane} | ${row.impressions} | ${row.clicks} | ${pct(row.clicks, row.impressions)} | ${oneDecimal(row.position)} | ${row.visibleQualifiedImpressions} | ${observedQueries || "-"} | ${row.nextMove} | ${row.diagnosis} |`;
  });

  return `## GSC Click Opportunity Queue

Deterministic order: protected AI knowledge-base/wiki and modifier-qualified Obsidian acquisition rows first; within each lane, zero-click query-page mismatches precede striking-distance pages, page-one snippet reviews, internal-link candidates, and evidence gaps. Existing generic-memory cohorts remain \`measuring-only\`; \`Brand/entity\` and unclassified \`Other\` rows remain visible in the full query table but do not nominate this queue. Metrics remain in native GSC units; this is not a forecast or composite score.

| Rank | Page | Campaign lane | Page impressions | Page clicks | Page CTR | Avg position | Qualified zero-click query impressions | Observed visible queries | Next move | Why |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
${tableRows.join("\n") || "| - | - | - | 0 | 0 | 0.00% | 0.0 | 0 | - | wait | No zero-click page opportunity is visible. |"}`;
}

function queryRow(row) {
  if (row.queryPageEvidenceAvailable) {
    return `| \`${escapePipe(row.query)}\` | ${row.group} | ${formatObservedPages(row.observedPages)} | ${formatPage(row.configuredTarget)} | ${row.impressions} | ${row.clicks} | ${pct(row.clicks, row.impressions)} | ${oneDecimal(row.position)} | ${row.action} | ${row.diagnosis} |`;
  }
  return `| \`${escapePipe(row.query)}\` | ${row.group} | ${formatPage(row.page)} | ${row.impressions} | ${row.clicks} | ${pct(row.clicks, row.impressions)} | ${oneDecimal(row.position)} | ${row.action} | ${row.diagnosis} |`;
}

function formatObservedPages(rows) {
  if (!rows.length) return "-";
  return rows
    .map((row) => `${formatPage(row.page)}${rows.length > 1 ? ` (${row.impressions})` : ""}`)
    .join("<br>");
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
    vercelPageRecords,
    vercelReferrerRecords,
    vercelMetadata,
    gscMetadata,
    queryPagesPayload,
  ] = await Promise.all([
    readFile(args.queriesPath, "utf8"),
    readFile(args.pagesPath, "utf8"),
    readOptionalCsv(args.umamiPagesPath),
    readOptionalCsv(args.umamiReferrersPath),
    readOptionalCsv(args.umamiEventsPath),
    readOptionalCsv(args.vercelPagesPath),
    readOptionalCsv(args.vercelReferrersPath),
    readOptionalJson(args.vercelMetadataPath),
    readOptionalJson(args.gscMetadataPath),
    readOptionalJson(args.queryPagesPath),
  ]);

  const queryRecords = parseCsv(queryText);
  const pageRecords = parseCsv(pageText);
  const evidence = extractEvidenceMetadata(queryRecords, pageRecords, gscMetadata);
  const queryPages = extractQueryPageEvidence(
    queryPagesPayload,
    evidence,
    gscMetadata,
  );
  const queries = enrichQueries(queryRecords.map(normalizeQuery), queryPages);
  const pages = enrichPages(pageRecords.map(normalizePage));
  const umami = summarizeUmami({
    pageRecords: umamiPageRecords,
    referrerRecords: umamiReferrerRecords,
    eventRecords: umamiEventRecords,
  });
  const vercel = summarizeVercel({
    pageRecords: vercelPageRecords,
    referrerRecords: vercelReferrerRecords,
    metadata: vercelMetadata,
  });
  let markdown = makeMarkdown({
    date: args.date,
    queries,
    pages,
    queryPages,
    evidence,
    umami,
    vercel,
  });

  await mkdir(dirname(args.outputPath), { recursive: true });
  try {
    const existingMarkdown = await readFile(args.outputPath, "utf8");
    markdown = preserveManualSections(markdown, existingMarkdown);
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
