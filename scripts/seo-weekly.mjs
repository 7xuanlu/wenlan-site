#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const GROUPS = [
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
    page: "/learn/origin-vs-basic-memory",
  },
  {
    name: "Obsidian/knowledge-base adjacent",
    patterns: [/obsidian/i, /knowledge base/i, /markdown/i, /notion/i],
    page: "/learn/origin-vs-obsidian-ai-memory",
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
  {
    name: "Brand/entity",
    patterns: [/useorigin/i, /\borigin\b/i],
    page: "/",
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

function parseMetric(value) {
  if (!value) return 0;
  return Number(String(value).replace(/[% ,]/g, "")) || 0;
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
    clicks: parseMetric(row.clicks),
    impressions: parseMetric(row.impressions),
    position: parseMetric(row.position),
  };
}

function normalizePage(row) {
  const rawPage = row.top_pages || row.page || "";
  return {
    page: toPath(rawPage),
    clicks: parseMetric(row.clicks),
    impressions: parseMetric(row.impressions),
    position: parseMetric(row.position),
  };
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
  const match = GROUPS.find((group) =>
    group.patterns.some((pattern) => pattern.test(query)),
  );
  if (!match) return { group: "Other", page: "-" };

  if (/claude code.*\/memory|\/memory/i.test(query)) {
    return {
      group: "Claude Code",
      page: "/learn/claude-code-memory-command-vs-origin",
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
      action: row.impressions > 0 ? "new-article-candidate" : "wait",
      diagnosis:
        "No mapped page answers this query cluster cleanly. Validate recurrence before writing.",
    };
  }

  if (row.clicks === 0 && row.impressions > 0 && row.position >= 8 && row.position <= 30) {
    return {
      action: "title-meta-refresh",
      diagnosis:
        "Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer.",
    };
  }

  if (row.position >= 8 && row.position <= 30) {
    return {
      action: "internal-link-refresh",
      diagnosis:
        "Page has demand but needs stronger internal links and supporting context.",
    };
  }

  if (row.clicks === 0 && row.impressions > 0) {
    return {
      action: "distribution",
      diagnosis:
        "Useful page exists but visibility is weak. Consider value-first distribution after page quality check.",
    };
  }

  return {
    action: "wait",
    diagnosis:
      "No immediate content action. Keep measuring before changing the page.",
  };
}

function classifyPageAction(row) {
  if (row.page.startsWith("/guides/") || row.page.startsWith("/docs/guides/")) {
    return {
      action: "technical-check",
      diagnosis:
        "Old guide URL should remain redirected; verify canonical Learn URL is indexed.",
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

function makeMarkdown({ date, queries, pages }) {
  const totalClicks = queries.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = queries.reduce((sum, row) => sum + row.impressions, 0);
  const groups = groupTotals(queries);
  const rankedQueries = rankRows(queries);
  const rankedPages = rankRows(pages);
  const topActions = rankRows([...queries, ...pages])
    .filter((row) => row.action !== "wait")
    .slice(0, 8);
  const topPage = [...pages].sort((a, b) => b.impressions - a.impressions)[0];
  const nextDate = addDays(date, 7);

  return `# Weekly SEO/GEO Audit — ${date}

Generated from Google Search Console CSV exports. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | ${date} |
| Date range | Last 28 days |
| GSC data source | CSV export |
| Total clicks | ${totalClicks} |
| Total impressions | ${totalImpressions} |
| Average CTR | ${pct(totalClicks, totalImpressions)} |
| Average position | ${oneDecimal(weightedAverage(queries))} |
| Top query groups | ${groups.slice(0, 4).map((group) => `${group.name} (${group.impressions})`).join(", ") || "-"} |
| Top page | ${topPage?.page ?? "-"} |
| Umami sessions | manual |
| AI referrals | manual |
| Reddit referrals | manual |

## Top Actions

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

- [ ] Record before/after GSC snapshot for changed pages.
- [ ] Verify \`/sitemap.xml\` includes changed canonical URLs.
- [ ] Verify old \`/guides/*\` URLs redirect to \`/learn/*\`.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Next measurement date: ${nextDate}.
`;
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
  const [queryText, pageText] = await Promise.all([
    readFile(args.queriesPath, "utf8"),
    readFile(args.pagesPath, "utf8"),
  ]);

  const queries = enrichQueries(parseCsv(queryText).map(normalizeQuery));
  const pages = enrichPages(parseCsv(pageText).map(normalizePage));
  const markdown = makeMarkdown({ date: args.date, queries, pages });

  await mkdir(dirname(args.outputPath), { recursive: true });
  await writeFile(args.outputPath, markdown, "utf8");
  console.log(`[seo-weekly] wrote ${args.outputPath}`);
}

run().catch((err) => {
  console.error(`[seo-weekly] ${err.message}`);
  process.exit(1);
});
