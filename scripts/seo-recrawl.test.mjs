import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  compareSection,
  diffRendered,
  extractRendered,
  findChangedUrls,
  findPendingRecrawls,
  parseRecrawlSection,
  pendingMessage,
  prBodyProblem,
  REQUESTED_MARKER,
  runHook,
  sectionProblem,
} from "./seo-recrawl.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const page = ({ title = "Wenlan", description = "Desc", main = "<p>Body</p>", footer = "" } = {}) =>
  `<!DOCTYPE html><html><head><title>${title}</title><meta name="description" content="${description}"/>` +
  `<link rel="canonical" href="https://wenlan.app/learn"/>` +
  `<script type="application/ld+json">{"@type":"WebPage"}</script></head>` +
  `<body><main>${main}<script>self.__next_f.push([1,"${Math.random()}"])</script></main>${footer}</body></html>`;

test("recrawl section parsing normalizes URLs and stops at the next section", () => {
  const section = parseRecrawlSection(
    [
      "## What changed",
      "https://wenlan.app/about",
      "## Recrawl after deploy",
      "<!-- https://wenlan.app/ignored -->",
      "- https://wenlan.app/",
      "- https://wenlan.app/zh-TW/learn/.",
      "https://wenlan.app/zh-TW/learn",
      "### Note",
      "https://wenlan.app/learn?x=1",
      "## Verification",
      "https://wenlan.app/docs",
    ].join("\r\n"),
  );
  assert.deepEqual(section.urls, ["https://wenlan.app", "https://wenlan.app/zh-TW/learn", "https://wenlan.app/learn"]);
  assert.equal(sectionProblem(section), null);
});

test("recrawl section must exist and list URLs or say none", () => {
  assert.match(sectionProblem(parseRecrawlSection("## What changed\nx")), /no "## Recrawl after deploy" section/);
  assert.match(sectionProblem(parseRecrawlSection("## Recrawl after deploy\n\n<!-- none -->\n")), /does not say "none"/);
  assert.equal(sectionProblem(parseRecrawlSection("## Recrawl after deploy\n\nnone (docs only)\n")), null);
});

test("PR body gate covers gh pr create/edit and GitHub MCP writes only", () => {
  const bash = (command) => ({ tool_name: "Bash", cwd: "/repo", tool_input: { command } });
  const valid = "## Recrawl after deploy\n\nhttps://wenlan.app/zh-TW\n";
  assert.match(prBodyProblem(bash('gh pr create --title x --body "## What changed"')), /no "## Recrawl/);
  assert.match(prBodyProblem(bash("gh pr create --fill")), /explicit --body/);
  assert.equal(prBodyProblem(bash(`cd /repo && gh pr create --title x --body "$(cat <<'EOF'\n${valid}EOF\n)"`)), null);
  assert.equal(prBodyProblem(bash("gh pr edit 12 --add-label seo")), null);
  assert.equal(prBodyProblem(bash('grep -n "gh pr create" docs/a.md')), null);
  assert.equal(prBodyProblem(bash("git status")), null);

  const files = { "/repo/body.md": valid, "/tmp/bad.md": "## What changed\n" };
  const readText = (path) => files[path];
  assert.equal(prBodyProblem(bash("gh pr edit 12 --body-file body.md"), readText), null);
  assert.match(prBodyProblem(bash("gh pr create -F /tmp/bad.md"), readText), /no "## Recrawl/);

  assert.match(prBodyProblem({ tool_name: "mcp__github__create_pull_request", tool_input: { body: "x" } }), /no "## Recrawl/);
  assert.equal(prBodyProblem({ tool_name: "mcp__github__update_pull_request", tool_input: { title: "x" } }), null);
  assert.equal(prBodyProblem({ tool_name: "mcp__github__update_pull_request", tool_input: { body: valid } }), null);
});

test("PreToolUse hook denies with a reason both hosts accept", async () => {
  const result = await runHook({ hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "gh pr create --fill" } });
  const output = JSON.parse(result.stdout).hookSpecificOutput;
  assert.equal(output.hookEventName, "PreToolUse");
  assert.equal(output.permissionDecision, "deny");
  assert.match(output.permissionDecisionReason, /seo:recrawl:changed/);
  assert.deepEqual(await runHook({ hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "ls" } }), {});
});

test("rendered comparison ignores framework scripts and content outside main", () => {
  const before = extractRendered(page({ footer: "<footer>Old footer</footer>" }));
  const after = extractRendered(page({ footer: "<footer>New footer</footer>" }));
  assert.deepEqual(diffRendered(before, after), []);
  assert.deepEqual(diffRendered(before, extractRendered(page({ title: "Wenlan &amp; wiki" }))), ["title"]);
  assert.deepEqual(diffRendered(before, extractRendered(page({ main: "<p>Changed</p>" }))), ["text"]);
});

test("changed URLs compare each sitemap page in the build with production", async () => {
  const built = await mkdtemp(join(tmpdir(), "seo-recrawl-"));
  const app = join(built, "server", "app");
  await mkdir(join(app, "zh-TW"), { recursive: true });
  const locs = ["https://wenlan.app", "https://wenlan.app/zh-TW/learn", "https://wenlan.app/learn/new-guide"];
  await writeFile(join(app, "sitemap.xml.body"), locs.map((loc) => `<url><loc>${loc}</loc></url>`).join(""));
  await writeFile(join(app, "index.html"), page());
  await writeFile(join(app, "zh-TW", "learn.html"), page({ description: "新描述" }));
  await mkdir(join(app, "learn"), { recursive: true });
  await writeFile(join(app, "learn", "new-guide.html"), page());
  const live = { "https://wenlan.app": page(), "https://wenlan.app/zh-TW/learn": page({ description: "舊描述" }) };
  const fetchImpl = async (url) =>
    live[url] ? new Response(live[url], { status: 200 }) : new Response("missing", { status: 404 });

  const changed = await findChangedUrls({ builtDir: built, fetchImpl });
  assert.deepEqual(changed, [
    { url: "https://wenlan.app/zh-TW/learn", fields: ["description"] },
    { url: "https://wenlan.app/learn/new-guide", fields: ["new page"] },
  ]);
  const { missing, unchanged } = compareSection(
    parseRecrawlSection("## Recrawl after deploy\nhttps://wenlan.app/zh-TW/learn\nhttps://wenlan.app/about"),
    changed,
  );
  assert.deepEqual(missing.map((item) => item.url), ["https://wenlan.app/learn/new-guide"]);
  assert.deepEqual(unchanged, ["https://wenlan.app/about"]);
});

test("pending recrawls skip requested, pre-rule and URL-less PRs and track deploys", async () => {
  const body = "## Recrawl after deploy\n\nhttps://wenlan.app/zh-TW\n";
  const pulls = [
    { number: 5, title: "after deploy", merged_at: "2026-10-12T00:00:00Z", labels: [], body },
    { number: 4, title: "deployed", merged_at: "2026-10-11T00:00:00Z", labels: [], body },
    { number: 3, title: "requested", merged_at: "2026-10-11T00:00:00Z", labels: [{ name: "recrawl-requested" }], body },
    { number: 2, title: "docs", merged_at: "2026-10-11T00:00:00Z", labels: [], body: "## Recrawl after deploy\nnone" },
    { number: 1, title: "old", merged_at: "2026-10-01T00:00:00Z", labels: [], body },
    { number: 6, title: "closed", merged_at: null, labels: [], body },
  ];
  const responses = {
    "/pulls?state=closed&sort=updated&direction=desc&per_page=50": pulls,
    "/deployments?environment=Production&per_page=5": [
      { id: 20, created_at: "2026-10-12T00:05:00Z" },
      { id: 10, created_at: "2026-10-11T00:05:00Z" },
    ],
    "/deployments/20/statuses?per_page=10": [{ state: "in_progress" }],
    "/deployments/10/statuses?per_page=10": [{ state: "success" }],
    "/issues/4/comments?per_page=100": [
      { author_association: "OWNER", body: `${REQUESTED_MARKER}\nRequested:\n\nhttps://wenlan.app/zh-TW` },
      { author_association: "NONE", body: `${REQUESTED_MARKER}\nhttps://wenlan.app/zh-CN` },
    ],
    "/issues/5/comments?per_page=100": [],
    "/issues/7/comments?per_page=100": [
      { author_association: "COLLABORATOR", body: `${REQUESTED_MARKER}\nhttps://wenlan.app/zh-TW` },
    ],
  };
  pulls[1].body = `${body}https://wenlan.app/zh-CN\n`;
  pulls.push({ number: 7, title: "done by comment", merged_at: "2026-10-11T00:00:00Z", labels: [], body });
  const fetchImpl = async (url) => {
    const path = url.replace("https://api.github.com/repos/7xuanlu/wenlan-site", "");
    assert.ok(path in responses, path);
    return new Response(JSON.stringify(responses[path]), { status: 200 });
  };
  const pending = await findPendingRecrawls({ fetchImpl, token: "" });
  assert.deepEqual(
    pending.map((pr) => [pr.number, pr.deployed, pr.urls]),
    [
      [4, true, ["https://wenlan.app/zh-CN"]],
      [5, false, ["https://wenlan.app/zh-TW"]],
    ],
  );
});

test("reminder gives the confirm, browser and record steps from the property home", () => {
  const message = pendingMessage([{ number: 4, title: "t", urls: ["https://wenlan.app"], deployed: true }]);
  assert.match(message, /1\. Ask the user once to confirm this batch/);
  assert.match(message, /2\. In the user's signed-in browser/);
  assert.match(message, /open https:\/\/search\.google\.com\/search-console\?resource_id=sc-domain%3Awenlan\.app\n/);
  assert.match(message, /Check the box holds the URL before pressing Enter/);
  assert.match(message, /3\. Run `pnpm seo:recrawl:mark -- --pr <number> --url <URL>`/);
});

test("Stop hook blocks once per session for deployed debt; SessionStart injects the list", async () => {
  const stateDir = await mkdtemp(join(tmpdir(), "seo-recrawl-state-"));
  const owed = [
    { number: 4, title: "titles", urls: ["https://wenlan.app/zh-TW"], deployed: true },
    { number: 5, title: "next", urls: ["https://wenlan.app/learn"], deployed: false },
  ];
  const deps = { stateDir, pending: async () => owed };
  const stop = (sessionId, active = false) =>
    runHook({ hook_event_name: "Stop", session_id: sessionId, stop_hook_active: active }, deps);

  const first = JSON.parse((await stop("a")).stdout);
  assert.equal(first.decision, "block");
  assert.match(first.reason, /PR #4 titles \(deployed, request now\)\n {2}https:\/\/wenlan\.app\/zh-TW/);
  assert.doesNotMatch(first.reason, /PR #5/);
  assert.deepEqual(await stop("a"), {});
  assert.deepEqual(await stop("b", true), {});
  assert.equal(JSON.parse((await stop("b")).stdout).decision, "block");

  const start = JSON.parse((await runHook({ hook_event_name: "SessionStart" }, deps)).stdout);
  assert.match(start.hookSpecificOutput.additionalContext, /PR #5 next \(merged, wait for the Vercel production deploy\)/);
  assert.match(start.hookSpecificOutput.additionalContext, /seo:recrawl:mark -- --pr <number> --url <URL>/);

  const failing = { stateDir, pending: async () => Promise.reject(new Error("offline")) };
  assert.deepEqual(Object.keys(await runHook({ hook_event_name: "Stop", session_id: "c" }, failing)), ["stderr"]);
  assert.match(
    JSON.parse((await runHook({ hook_event_name: "SessionStart" }, failing)).stdout).hookSpecificOutput.additionalContext,
    /Could not check pending Google recrawl requests \(offline\)/,
  );
});

test("Claude and Codex register the same recrawl hooks, and CI checks every PR body", async () => {
  const claude = JSON.parse(await readFile(join(root, ".claude", "settings.json"), "utf8"));
  const codex = JSON.parse(await readFile(join(root, ".codex", "hooks.json"), "utf8"));
  assert.deepEqual(claude.hooks, codex.hooks);
  for (const event of ["SessionStart", "PreToolUse", "Stop"]) {
    const command = codex.hooks[event][0].hooks[0].command;
    assert.match(command, /S=scripts\/seo-recrawl\.mjs;/, event);
    assert.match(command, /node "\$R\/\$S" hook;/, event);
  }
  const matcher = new RegExp(`^(?:${codex.hooks.PreToolUse[0].matcher})$`);
  for (const tool of ["Bash", "mcp__github__create_pull_request", "mcp__github__update_pull_request"]) {
    assert.match(tool, matcher);
  }

  const template = await readFile(join(root, ".github", "pull_request_template.md"), "utf8");
  assert.equal(parseRecrawlSection(template).present, true);
  const ci = await readFile(join(root, ".github", "workflows", "ci.yml"), "utf8");
  assert.match(ci, /types: \[opened, synchronize, reopened, edited\]/);
  assert.match(ci, /run: pnpm seo:recrawl:check-pr/);
});
