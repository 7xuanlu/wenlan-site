#!/usr/bin/env node
// Enforces docs/seo-growth-loop.md#recrawl-after-page-changes.
// One entrypoint serves the Claude and Codex hooks (`hook`, event read from
// stdin), CI (`check-pr`) and people (`changed`, `pending`, `mark`).

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { appendFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { getAccessToken, getQuotaProject } from "./gsc-auth.mjs";

export const ORIGIN = "https://wenlan.app";
export const REPO = "7xuanlu/wenlan-site";
export const SECTION_HEADING = "## Recrawl after deploy";
export const REQUESTED_LABEL = "recrawl-requested";
// Marks a PR comment that records URLs already requested in Search Console.
export const REQUESTED_MARKER = "<!-- seo-recrawl:requested -->";
const TRUSTED_AUTHORS = new Set(["OWNER", "MEMBER", "COLLABORATOR"]);
// PRs merged before the rule existed carry no section and are not tracked.
export const ENFORCED_SINCE = "2026-10-10T00:00:00Z";
export const PROCEDURE = "docs/seo-growth-loop.md#recrawl-after-page-changes";
// Home pages carry the site name, so their structured data matters on its own.
export const HOME_URLS = new Set([ORIGIN, `${ORIGIN}/zh-TW`, `${ORIGIN}/zh-CN`]);
const SEARCH_CONSOLE_SITE = "sc-domain:wenlan.app";
const INSPECT_ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const CACHE_TTL_MS = 10 * 60 * 1000;
const DEFAULT_STATE_DIR = join(tmpdir(), "wenlan-seo-recrawl");

const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] !== "#") return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    const hex = entity[1].toLowerCase() === "x";
    return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
  });
}

export function normalizeUrl(raw) {
  const url = new URL(raw.replace(/[.,;:!?]+$/, ""));
  return `${ORIGIN}${url.pathname.replace(/\/+$/, "")}`;
}

export function parseRecrawlSection(body) {
  const lines = String(body ?? "").replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => /^##\s+recrawl after deploy\s*$/i.test(line.trim()));
  if (start === -1) return { present: false, urls: [], none: false };
  const end = lines.findIndex((line, index) => index > start && /^#{1,2}\s/.test(line.trim()));
  const section = lines
    .slice(start + 1, end === -1 ? undefined : end)
    .join("\n")
    .replace(/<!--[\s\S]*?-->/g, "");
  const urls = [...section.matchAll(/https:\/\/wenlan\.app(?:\/[^\s)>\]`"'<]*)?/g)].map((match) =>
    normalizeUrl(match[0]),
  );
  return { present: true, urls: [...new Set(urls)], none: /^\s*[-*]?\s*`?none\b/im.test(section) };
}

export function sectionProblem(section) {
  if (!section.present) return `the PR body has no "${SECTION_HEADING}" section`;
  if (section.urls.length === 0 && !section.none) {
    return `"${SECTION_HEADING}" lists no https://wenlan.app URL and does not say "none"`;
  }
  return null;
}

function tagAttributes(source) {
  const attributes = {};
  for (const match of source.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)) {
    attributes[match[1].toLowerCase()] = decodeEntities(match[2]);
  }
  return attributes;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "gi"))].map((match) => tagAttributes(match[1]));
}

// What Google indexes from a page: head signals plus the visible text of <main>.
// Scripts other than JSON-LD, styles and comments are framework output, not content.
export function extractRendered(html) {
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1].trim())
    .sort();
  const clean = html
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const meta = (name) => tags(clean, "meta").find((tag) => tag.name === name)?.content ?? "";
  const links = tags(clean, "link");
  const main = clean.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? clean.match(/<body\b[\s\S]*<\/body>/i)?.[0] ?? clean;
  return {
    title: decodeEntities(clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim(),
    description: meta("description"),
    robots: meta("robots"),
    canonical: links.find((tag) => tag.rel === "canonical")?.href ?? "",
    alternates: links
      .filter((tag) => tag.rel === "alternate" && tag.hreflang)
      .map((tag) => `${tag.hreflang} ${tag.href}`)
      .sort(),
    jsonLd,
    text: decodeEntities(main.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(),
  };
}

export function diffRendered(local, live) {
  return Object.keys(local).filter((key) => JSON.stringify(local[key]) !== JSON.stringify(live[key]));
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// Returns null when production has no page at the URL yet (404 or redirect).
async function fetchLive(url, fetchImpl) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        headers: { "user-agent": "wenlan-seo-recrawl" },
        redirect: "manual",
      });
      if (response.status === 404 || (response.status >= 300 && response.status < 400)) return null;
      if (response.status === 200) return await response.text();
      throw new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      if (attempt >= 3) throw error;
      await new Promise((done) => setTimeout(done, 500 * attempt));
    }
  }
}

// Compares every sitemap URL in a local build with production.
export async function findChangedUrls({ builtDir = ".next", fetchImpl = fetch, concurrency = 8 } = {}) {
  const appDir = join(builtDir, "server", "app");
  const sitemap = await readFile(join(appDir, "sitemap.xml.body"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    normalizeUrl(decodeEntities(match[1].trim())),
  );
  const results = await mapLimit(urls, concurrency, async (url) => {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    const local = extractRendered(await readFile(join(appDir, `${path || "index"}.html`), "utf8"));
    const live = await fetchLive(url, fetchImpl);
    if (live === null) return { url, fields: ["new page"] };
    const fields = diffRendered(local, extractRendered(live));
    return fields.length ? { url, fields } : null;
  });
  return results.filter(Boolean);
}

// A change only to structured data off the home pages (usually a node in the
// shared layout) reaches Google through the sitemap and normal crawling; it
// does not spend the daily request quota.
export function needsRequest(item) {
  return !(item.fields.length === 1 && item.fields[0] === "jsonLd" && !HOME_URLS.has(item.url));
}

export function compareSection(section, changed) {
  const listed = new Set(section.urls);
  const changedUrls = new Set(changed.map((item) => item.url));
  return {
    missing: changed.filter((item) => needsRequest(item) && !listed.has(item.url)),
    unchanged: section.urls.filter((url) => !changedUrls.has(url)),
  };
}

async function github(path, { fetchImpl = fetch, token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN } = {}) {
  const response = await fetchImpl(`https://api.github.com/repos/${REPO}${path}`, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "wenlan-seo-recrawl",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`GitHub ${path} returned HTTP ${response.status}`);
  return response.json();
}

// Start times of successful production deployments, newest first, back to the
// first one that started before `since`.
async function productionDeploys(since, options) {
  const deployments = await github("/deployments?environment=Production&per_page=10", options);
  const times = [];
  for (const deployment of deployments) {
    const statuses = await github(`/deployments/${deployment.id}/statuses?per_page=10`, options);
    if (!statuses.some((status) => status.state === "success")) continue;
    times.push(deployment.created_at);
    if (deployment.created_at < since) break;
  }
  return times;
}

// Google's last crawl of each URL from the read-only URL Inspection API, or
// null without Search Console credentials (GSC_ACCESS_TOKEN or gcloud
// application-default login). A lookup takes seconds, so only `pending` calls
// it; hooks read the times it saved.
async function searchConsoleLastCrawl(fetchImpl = fetch) {
  let token;
  let quotaProject;
  try {
    token = await getAccessToken();
    quotaProject = await getQuotaProject();
  } catch {
    return null;
  }
  return async (url) => {
    const response = await fetchImpl(INSPECT_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        ...(quotaProject ? { "x-goog-user-project": quotaProject } : {}),
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SEARCH_CONSOLE_SITE }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`URL Inspection returned HTTP ${response.status}`);
    return (await response.json()).inspectionResult?.indexStatusResult?.lastCrawlTime ?? null;
  };
}

// A direct /inspect?id= link returns 404 on a fresh load, so start from the property home.
export const SEARCH_CONSOLE_HOME = `https://search.google.com/search-console?resource_id=${encodeURIComponent("sc-domain:wenlan.app")}`;

// URLs recorded as requested by `mark` comments from people with write access.
export function requestedUrls(comments) {
  const urls = new Set();
  for (const comment of comments) {
    if (!TRUSTED_AUTHORS.has(comment.author_association) || !comment.body?.includes(REQUESTED_MARKER)) continue;
    for (const match of comment.body.matchAll(/https:\/\/wenlan\.app(?:\/[^\s)>\]`"'<]*)?/g)) urls.add(normalizeUrl(match[0]));
  }
  return urls;
}

// Merged PRs with listed URLs not yet requested (a partial batch leaves the
// rest pending). A PR counts as deployed once a successful production
// deployment started after its merge. A URL Google has crawled since that
// deployment needs no request; without a `lastCrawl` lookup every listed URL
// stays.
export async function findPendingRecrawls(options = {}) {
  const pulls = await github("/pulls?state=closed&sort=updated&direction=desc&per_page=50", options);
  const listed = pulls
    .filter((pr) => pr.merged_at && pr.merged_at >= ENFORCED_SINCE)
    .filter((pr) => !pr.labels.some((label) => label.name === REQUESTED_LABEL))
    .map((pr) => ({ number: pr.number, title: pr.title, mergedAt: pr.merged_at, urls: parseRecrawlSection(pr.body).urls }))
    .filter((pr) => pr.urls.length > 0)
    .sort((a, b) => a.mergedAt.localeCompare(b.mergedAt));
  const candidates = [];
  for (const pr of listed) {
    const done = requestedUrls(await github(`/issues/${pr.number}/comments?per_page=100`, options));
    const urls = pr.urls.filter((url) => !done.has(url));
    if (urls.length) candidates.push({ ...pr, urls });
  }
  if (candidates.length === 0) return [];
  const deploys = await productionDeploys(candidates[0].mergedAt, options);
  const lastCrawl = options.lastCrawl;
  const pending = [];
  for (const pr of candidates) {
    const deployedAt = deploys.filter((time) => time >= pr.mergedAt).at(-1);
    let urls = pr.urls;
    if (deployedAt && lastCrawl) {
      const crawled = await mapLimit(urls, 8, (url) => lastCrawl(url).catch(() => null));
      urls = urls.filter((url, index) => !(crawled[index] && Date.parse(crawled[index]) > Date.parse(deployedAt)));
    }
    if (urls.length) pending.push({ ...pr, urls, deployed: Boolean(deployedAt) });
  }
  return pending;
}

export function pendingMessage(pending) {
  const lines = [`Google recrawl requests are owed for merged page changes (${PROCEDURE}):`];
  for (const pr of pending) {
    const state = pr.deployed ? "deployed, request now" : "merged, wait for the Vercel production deploy";
    lines.push(`- PR #${pr.number} ${pr.title} (${state})`, ...pr.urls.map((url) => `  ${url}`));
  }
  lines.push(
    "Required for deployed PRs, in this order. With Search Console credentials, run `pnpm seo:recrawl:pending`",
    "first: it drops URLs Google has crawled since the deploy.",
    "1. Ask the user once to confirm this batch. Do not click Request indexing before that confirmation.",
    `2. In the user's signed-in browser (Claude in Chrome, or the host's equivalent), open ${SEARCH_CONSOLE_HOME}`,
    "   and type each URL into \"Inspect any URL\". Check the box holds the URL before pressing Enter: after a dialog",
    "   closes, focus can sit on Request again. Click Request indexing and wait for \"Indexing requested\".",
    "   Stop at a sign-in page, CAPTCHA or quota message.",
    "3. Run `pnpm seo:recrawl:mark -- --pr <number> --url <URL>` for each URL that was requested (omit --url when all were).",
    "If no such browser is available, or the browser step is blocked, give the user the URLs and record what they report.",
  );
  return lines.join("\n");
}

async function readCrawlTimes(stateDir) {
  try {
    return JSON.parse(await readFile(join(stateDir, "crawled.json"), "utf8"));
  } catch {
    return {};
  }
}

async function cachedPending(stateDir, options) {
  const file = join(stateDir, "pending.json");
  try {
    const cached = JSON.parse(await readFile(file, "utf8"));
    if (Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.pending;
  } catch {
    // No usable cache; fetch below.
  }
  const crawlTimes = await readCrawlTimes(stateDir);
  const pending = await findPendingRecrawls({ ...options, lastCrawl: async (url) => crawlTimes[url] ?? null });
  await mkdir(stateDir, { recursive: true });
  await writeFile(file, JSON.stringify({ fetchedAt: Date.now(), pending }));
  return pending;
}

const COMMAND_START = String.raw`(?:^|[;&|(\n]\s*|\$\(\s*)(?:[A-Z_][A-Z0-9_]*=\S*\s+)*`;
const GH_PR_WRITE = new RegExp(`${COMMAND_START}gh\\s+pr\\s+(create|edit)\\b`);

// Returns a problem when a PR create/edit would publish a body without a valid
// recrawl section; null when the tool call is not such a write.
export function prBodyProblem(input, readText = (path) => readFileSync(path, "utf8")) {
  const tool = String(input.tool_name ?? "");
  const toolInput = input.tool_input ?? {};
  let text;
  if (tool === "Bash") {
    const command = String(toolInput.command ?? "");
    const write = command.match(GH_PR_WRITE);
    if (!write) return null;
    const bodyFile = command.match(/(?:--body-file|\s-F)(?:\s+|=)(?:"([^"]+)"|'([^']+)'|(\S+))/);
    const inlineBody = /--body(?:\s|=)|\s-b\s/.test(command);
    if (!bodyFile && !inlineBody) {
      if (write[1] === "edit") return null;
      return `gh pr create needs an explicit --body or --body-file with a "${SECTION_HEADING}" section`;
    }
    const path = bodyFile && (bodyFile[1] ?? bodyFile[2] ?? bodyFile[3]);
    text = path && path !== "-" ? readText(resolve(input.cwd ?? ".", path)) : command;
  } else if (/__(create|update)_pull_request$/.test(tool)) {
    if (tool.endsWith("update_pull_request") && toolInput.body === undefined) return null;
    text = String(toolInput.body ?? "");
  } else {
    return null;
  }
  return sectionProblem(parseRecrawlSection(text));
}

export async function runHook(input, deps = {}) {
  const stateDir = deps.stateDir ?? DEFAULT_STATE_DIR;
  const pending = deps.pending ?? (() => cachedPending(stateDir));
  switch (input.hook_event_name) {
    case "PreToolUse": {
      let problem;
      try {
        problem = prBodyProblem(input, deps.readText);
      } catch (error) {
        problem = `could not read the PR body (${error.message})`;
      }
      if (!problem) return {};
      const reason =
        `Blocked: ${problem}. Add "${SECTION_HEADING}" listing every changed indexable canonical URL ` +
        `(one absolute https://wenlan.app URL per line, each locale separately), or "none" when no indexable ` +
        `page changed. After \`pnpm build\`, \`pnpm seo:recrawl:changed\` lists them. See ${PROCEDURE}.`;
      return {
        stdout: JSON.stringify({
          hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
        }),
      };
    }
    case "SessionStart": {
      let context;
      try {
        const owed = await pending();
        if (owed.length === 0) return {};
        context = pendingMessage(owed);
      } catch (error) {
        context = `Could not check pending Google recrawl requests (${error.message}). Run \`pnpm seo:recrawl:pending\`.`;
      }
      return {
        stdout: JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: context } }),
      };
    }
    case "Stop": {
      if (input.stop_hook_active) return {};
      let owed;
      try {
        owed = (await pending()).filter((pr) => pr.deployed);
      } catch (error) {
        return { stderr: `seo-recrawl: could not check pending recrawl requests (${error.message})` };
      }
      if (owed.length === 0) return {};
      // Once per session for the same list, so the reminder reaches the user
      // without trapping every later turn.
      const key = createHash("sha256")
        .update(JSON.stringify([input.session_id ?? "", owed.map((pr) => [pr.number, pr.urls])]))
        .digest("hex")
        .slice(0, 24);
      const marker = join(stateDir, `stop-${key}`);
      if (existsSync(marker)) return {};
      await mkdir(stateDir, { recursive: true });
      await writeFile(marker, new Date().toISOString());
      return { stdout: JSON.stringify({ decision: "block", reason: pendingMessage(owed) }) };
    }
    default:
      return {};
  }
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--") continue;
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const [key, inline] = token.slice(2).split(/=(.*)/s);
    let value = true;
    if (inline !== undefined) value = inline;
    else if (argv[index + 1] && !argv[index + 1].startsWith("--")) value = argv[++index];
    args[key] = key in args ? [].concat(args[key], value) : value;
  }
  return args;
}

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

function changedBlock(changed) {
  const requested = changed.filter(needsRequest);
  const sitemapOnly = changed.length - requested.length;
  return [
    SECTION_HEADING,
    "",
    ...(requested.length ? requested.map((item) => item.url) : ["none"]),
    ...(sitemapOnly
      ? ["", `<!-- ${sitemapOnly} more URL(s) changed only in structured data; the sitemap covers them. -->`]
      : []),
  ].join("\n");
}

async function prBodyFromEvent() {
  if (!process.env.GITHUB_EVENT_PATH) return undefined;
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
  return event.pull_request ? (event.pull_request.body ?? "") : undefined;
}

async function checkPr(args) {
  const body = args["body-file"] ? await readFile(args["body-file"], "utf8") : await prBodyFromEvent();
  if (body === undefined) {
    console.log("seo-recrawl: not a pull request; skipped");
    return 0;
  }
  const section = parseRecrawlSection(body);
  const changed = await findChangedUrls({ builtDir: args.built ?? ".next" });
  const { missing, unchanged } = compareSection(section, changed);
  const problems = [sectionProblem(section), missing.length ? `${missing.length} changed URL(s) are not listed` : null].filter(
    Boolean,
  );
  const report = [
    `Changed indexable URLs versus production (${changed.length}):`,
    ...changed.map((item) => `- ${item.url} (${item.fields.join(", ")}${needsRequest(item) ? "" : "; sitemap only"})`),
    ...(unchanged.length ? ["Listed but unchanged versus production (allowed):", ...unchanged.map((url) => `- ${url}`)] : []),
  ].join("\n");
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Recrawl list\n\n${report}\n`);
  if (problems.length === 0) return 0;
  console.error(
    [
      `seo-recrawl: ${problems.join("; ")}.`,
      "Add every changed URL that needs a request to the PR body (extra URLs are allowed):",
      "",
      changedBlock(changed),
      "",
      "If main has an undeployed change, wait for the Vercel production deploy and re-run this check.",
      `See ${PROCEDURE}.`,
    ].join("\n"),
  );
  return 1;
}

const run = promisify(execFile);

// Records URLs the user confirmed as requested; labels the PR once every listed
// URL is recorded.
async function mark(args, stateDir = DEFAULT_STATE_DIR) {
  const number = Number(args.pr);
  if (!Number.isInteger(number) || number <= 0) throw new Error("usage: seo-recrawl mark --pr <number> [--url <URL> ...]");
  const { stdout } = await run("gh", ["pr", "view", String(number), "--repo", REPO, "--json", "body,mergedAt"]);
  const pr = JSON.parse(stdout);
  if (!pr.mergedAt) throw new Error(`PR #${number} is not merged`);
  const listed = parseRecrawlSection(pr.body).urls;
  if (listed.length === 0) throw new Error(`PR #${number} lists no recrawl URL`);
  const urls = args.url ? [].concat(args.url).map(normalizeUrl) : listed;
  const unknown = urls.filter((url) => !listed.includes(url));
  if (unknown.length) throw new Error(`not listed in PR #${number}: ${unknown.join(", ")}`);
  const date = new Date().toISOString().slice(0, 10);
  await run("gh", [
    "pr", "comment", String(number), "--repo", REPO,
    "--body", `${REQUESTED_MARKER}\nRequested in Search Console on ${date}:\n\n${urls.join("\n")}`,
  ]);
  const comments = JSON.parse(
    (await run("gh", ["api", `repos/${REPO}/issues/${number}/comments?per_page=100`])).stdout,
  );
  const done = requestedUrls(comments);
  const remaining = listed.filter((url) => !done.has(url));
  if (remaining.length === 0) {
    await run("gh", [
      "label", "create", REQUESTED_LABEL, "--repo", REPO, "--force",
      "--color", "0e8a16", "--description", "Google recrawl requested in Search Console",
    ]);
    await run("gh", ["pr", "edit", String(number), "--repo", REPO, "--add-label", REQUESTED_LABEL]);
  }
  await rm(join(stateDir, "pending.json"), { force: true });
  console.log(
    `PR #${number}: recorded ${urls.length} URL(s); ` +
      (remaining.length ? `${remaining.length} still to request.` : `all requested, labeled ${REQUESTED_LABEL}.`),
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  switch (args._[0]) {
    case "hook": {
      const raw = await readStdin();
      let input = {};
      try {
        input = JSON.parse(raw || "{}");
      } catch {
        return 0;
      }
      const result = await runHook(input);
      if (result.stdout) process.stdout.write(`${result.stdout}\n`);
      if (result.stderr) process.stderr.write(`${result.stderr}\n`);
      return 0;
    }
    case "changed": {
      const changed = await findChangedUrls({ builtDir: args.built ?? ".next" });
      if (args.json) console.log(JSON.stringify(changed, null, 2));
      else console.log(changedBlock(changed));
      return 0;
    }
    case "check-pr":
      return checkPr(args);
    case "pending": {
      const crawlTimes = await readCrawlTimes(DEFAULT_STATE_DIR);
      const live = await searchConsoleLastCrawl();
      if (!live) console.error("seo-recrawl: no Search Console credentials; URLs Google already crawled are not dropped.");
      const lastCrawl = async (url) => {
        if (live) crawlTimes[url] = (await live(url)) ?? crawlTimes[url] ?? null;
        return crawlTimes[url] ?? null;
      };
      const pending = await findPendingRecrawls({ lastCrawl });
      await mkdir(DEFAULT_STATE_DIR, { recursive: true });
      await writeFile(join(DEFAULT_STATE_DIR, "crawled.json"), JSON.stringify(crawlTimes));
      await writeFile(join(DEFAULT_STATE_DIR, "pending.json"), JSON.stringify({ fetchedAt: Date.now(), pending }));
      if (args.json) console.log(JSON.stringify(pending, null, 2));
      else console.log(pending.length ? pendingMessage(pending) : "No pending recrawl requests.");
      return 0;
    }
    case "mark":
      await mark(args);
      return 0;
    default:
      console.error("usage: seo-recrawl <hook|changed|check-pr|pending|mark> [options]");
      return 2;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // exitCode instead of exit(): macOS pipes are asynchronous, and hook output
  // must not be cut off.
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      console.error(`seo-recrawl: ${error.message}`);
      process.exitCode = 1;
    },
  );
}
