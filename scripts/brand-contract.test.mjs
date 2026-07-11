import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";
import { promisify } from "node:util";

const repoRoot = resolve(import.meta.dirname, "..");
const execFileAsync = promisify(execFile);
const publicScanIgnoredNames = new Set([
  ".claude",
  ".git",
  ".next",
  ".omo",
  ".codegraph",
  ".worktrees",
  "node_modules",
  "pnpm-lock.yaml",
]);

const englishRouteGroupAliases = new Map([
  ["src/app/layout.tsx", "src/app/root-document.tsx"],
  ["src/app/page.tsx", "src/app/(en)/page.tsx"],
  ["src/app/opengraph-image.tsx", "src/app/(en)/opengraph-image.tsx"],
  ["src/app/feed.xml/route.ts", "src/app/(en)/feed.xml/route.ts"],
  ["src/app/llms-full.txt/route.ts", "src/app/(en)/llms-full.txt/route.ts"],
]);

const publicCommandGuidancePaths = [
  "public/llms.txt",
  "src/i18n/content/en.ts",
  "src/i18n/content/zh-CN.ts",
  "src/i18n/content/zh-TW.ts",
  "src/app/docs/docs.ts",
  "src/app/learn/articles.ts",
  "src/app/learn/seo-articles.ts",
  "docs/seo-measurement.md",
];

function sourcePath(path) {
  if (englishRouteGroupAliases.has(path)) {
    return englishRouteGroupAliases.get(path);
  }
  if (path.startsWith("src/app/about/")) {
    return path.replace("src/app/about/", "src/app/(en)/about/");
  }
  if (path.startsWith("src/app/docs/")) {
    return path.replace("src/app/docs/", "src/app/(en)/docs/");
  }
  if (path.startsWith("src/app/learn/")) {
    return path.replace("src/app/learn/", "src/app/(en)/learn/");
  }

  return path;
}

async function readRepo(path) {
  return readFile(resolve(repoRoot, sourcePath(path)), "utf8");
}

async function currentWenlanRelease() {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const taggedRelease = await currentWenlanTaggedRelease(wenlanRoot);
  if (taggedRelease) return taggedRelease;

  const versionPath = resolve(wenlanRoot, "version.txt");
  const changelogPath = resolve(wenlanRoot, "CHANGELOG.md");
  const version = (await readFile(versionPath, "utf8")).trim();
  const changelog = await readFile(changelogPath, "utf8");

  return parseRelease({ version, changelog, changelogPath });
}

async function currentWenlanTaggedRelease(wenlanRoot) {
  try {
    const { stdout: tagStdout } = await execFileAsync("git", [
      "-C",
      wenlanRoot,
      "tag",
      "--list",
      "v[0-9]*",
      "--sort=-v:refname",
    ]);
    const tag = tagStdout.split("\n").find(Boolean);
    if (!tag) return null;

    const [{ stdout: versionStdout }, { stdout: changelog }] = await Promise.all([
      execFileAsync("git", ["-C", wenlanRoot, "show", `${tag}:version.txt`]),
      execFileAsync("git", ["-C", wenlanRoot, "show", `${tag}:CHANGELOG.md`]),
    ]);

    return parseRelease({
      version: versionStdout.trim(),
      changelog,
      changelogPath: `${wenlanRoot}:${tag}:CHANGELOG.md`,
    });
  } catch {
    return null;
  }
}

function parseRelease({ version, changelog, changelogPath }) {
  const releasePattern = new RegExp(
    `^## \\[${escapeRegExp(version)}\\].*\\((\\d{4}-\\d{2}-\\d{2})\\)`,
    "m",
  );
  const releaseMatch = changelog.match(releasePattern);
  const releaseHeading = releaseMatch?.[0];
  const releaseDate = releaseMatch?.[1];

  assert.ok(
    releaseHeading,
    `Could not find ${version} release heading in ${changelogPath}`,
  );
  assert.ok(releaseDate, `Could not parse ${version} release date in ${changelogPath}`);

  return {
    version,
    date: releaseDate,
  };
}

async function* walkTextFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (shouldSkipPublicScanEntry(entry.name)) {
      continue;
    }

    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkTextFiles(fullPath);
      continue;
    }

    if (/\.(tsx?|mjs|md|txt|json|webmanifest|svg)$/.test(entry.name)) {
      yield fullPath;
    }
  }
}

function shouldSkipPublicScanEntry(name) {
  return publicScanIgnoredNames.has(name);
}

async function collectMatches(pattern) {
  const matches = [];
  for await (const file of walkTextFiles(repoRoot)) {
    const rel = relative(repoRoot, file);
    if (rel === "scripts/brand-contract.test.mjs") continue;
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(pattern)) {
      matches.push(`${rel}:${lineForOffset(text, match.index)}:${match[0]}`);
    }
  }
  return matches;
}

function lineForOffset(text, offset) {
  return text.slice(0, offset).split("\n").length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectTypescriptStringValues(path) {
  const sourceText = await readRepo(path);
  const sourceFile = ts.createSourceFile(
    path,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const values = [];

  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      values.push({
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
        value: node.text,
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return values;
}

async function readPublicCommandGuidance() {
  return Promise.all(
    publicCommandGuidancePaths.map(async (path) => [path, await readRepo(path)]),
  );
}

async function renderedGuidanceFor(path, source) {
  return path.endsWith(".ts")
    ? (await collectTypescriptStringValues(path)).map(({ value }) => value).join("\n")
    : source;
}

test("package metadata uses the wenlan-site identity", async () => {
  const packageJson = JSON.parse(await readRepo("package.json"));

  assert.equal(packageJson.name, "wenlan-site");
  assert.equal(packageJson.description, "Public website and SEO/GEO surface for Wenlan, an LLM wiki for AI work.");
  assert.equal(packageJson.repository.url, "git+https://github.com/7xuanlu/wenlan-site.git");
  assert.equal(packageJson.bugs.url, "https://github.com/7xuanlu/wenlan-site/issues");
  assert.equal(packageJson.homepage, "https://wenlan.app");
  assert.match(packageJson.scripts["seo:weekly:sample"], /\/tmp\/wenlan-weekly-seo-sample\.md$/);
});

test("root document includes Vercel Web Analytics only on Vercel", async () => {
  const packageJson = JSON.parse(await readRepo("package.json"));
  const rootDocument = await readRepo("src/app/root-document.tsx");

  assert.ok(packageJson.dependencies["@vercel/analytics"]);
  assert.match(rootDocument, /import\s+\{\s*Analytics\s*\}\s+from\s+"@vercel\/analytics\/next"/);
  assert.match(rootDocument, /const vercelAnalyticsEnabled = process\.env\.VERCEL === "1"/);
  assert.match(rootDocument, /vercelAnalyticsEnabled\s*\?\s*<Analytics\s*\/>\s*:\s*null/);
});

test("primary acquisition links emit bounded Vercel CTA events", async () => {
  const trackedLink = await readRepo("src/components/tracked-link.tsx");
  const home = await readRepo("src/app/_pages/home.tsx");
  const learnIndex = await readRepo("src/app/learn/page.tsx");
  const learnArticle = await readRepo("src/app/learn/[slug]/page.tsx");
  const getStarted = await readRepo("src/app/_pages/get-started.tsx");

  assert.match(trackedLink, /import\s+\{\s*track\s*\}\s+from\s+"@vercel\/analytics"/);
  assert.match(trackedLink, /"Get Started Click"/);
  assert.match(trackedLink, /"GitHub Click"/);
  assert.match(trackedLink, /"Learn Article Click"/);
  assert.match(trackedLink, /"Setup Path Click"/);
  assert.doesNotMatch(
    trackedLink,
    /track\([^)]*\{[^}]*(?:query|email|url|href)\s*:/s,
  );
  assert.match(home, /TrackedLink/);
  assert.match(learnIndex, /TrackedLink/);
  assert.match(learnArticle, /TrackedLink/);
  assert.match(getStarted, /TrackedLocalizedLink/);
});

test("all evidence-backed no-click Docs targets have refreshed SERP copy and quick answers", async () => {
  const docs = await readRepo("src/app/docs/docs.ts");
  const englishContent = await readRepo("src/i18n/content/en.ts");

  for (const slug of [
    "data-and-privacy",
    "cli-and-service",
    "security",
    "agent-profiles",
    "memory-types",
  ]) {
    assert.match(
      docs,
      new RegExp(`slug: "${slug}"[\\s\\S]*summary: \\[[\\s\\S]*"Quick answer:`),
      slug,
    );
  }

  assert.match(
    englishContent,
    /title: "Install Wenlan for Claude Code, Codex, ChatGPT, and MCP"/,
  );
  assert.match(
    englishContent,
    /Choose one client path, connect it to the same local daemon, then verify a capture and recall round trip\./,
  );
});

test("agent guidance tracks the wenlan.app canonical launch property", async () => {
  const agents = await readRepo("AGENTS.md");
  const claude = await readRepo("CLAUDE.md");

  assert.match(agents, /canonical public site is https:\/\/wenlan\.app/);
  assert.match(agents, /useorigin\.app.*legacy redirect bridge/);
  assert.doesNotMatch(agents, /current deployed public property is still https:\/\/useorigin\.app/);
  assert.match(claude, /Single-page marketing site for \[Wenlan\]\(https:\/\/wenlan\.app\)/);
});

test("root metadata describes Wenlan on the current release surface", async () => {
  const { version } = await currentWenlanRelease();
  const metadata = await readRepo("src/i18n/metadata.ts");
  const englishContent = await readRepo("src/i18n/content/en.ts");
  const rootDocument = await readRepo("src/app/root-document.tsx");
  const structuredData = await readRepo("src/app/structured-data.ts");

  assert.match(englishContent, /title:\s*"Wenlan \|/);
  assert.match(metadata, /export function buildRootMetadata/);
  assert.match(metadata, /locale: LOCALE_CONFIG\[locale\]\.openGraphLocale/);
  assert.match(rootDocument, /softwareApplicationSchema\(locale\)/);
  assert.match(structuredData, /name: "Wenlan"/);
  assert.match(structuredData, new RegExp(`softwareVersion: "${escapeRegExp(version)}"`));
  assert.match(structuredData, /installUrl: "https:\/\/github\.com\/7xuanlu\/wenlan#quickstart"/);
  assert.match(structuredData, /codeRepository: "https:\/\/github\.com\/7xuanlu\/wenlan"/);
});

test("public machine-readable surfaces use Wenlan names and packages", async () => {
  const manifest = JSON.parse(await readRepo("public/manifest.webmanifest"));
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.equal(manifest.name, "Wenlan");
  assert.equal(manifest.short_name, "Wenlan");
  assert.match(llms, /^# Wenlan/m);
  assert.match(llms, /LLM wiki for AI work/);
  assert.match(llms, /github\.com\/7xuanlu\/wenlan/);
  assert.match(llms, /wenlan-mcp/);
  assert.match(llms, /wenlan-types/);
  assert.match(llmsFull, /LLM wiki for AI work/);
  assert.doesNotMatch(llmsFull, /Wenlan is local-first memory for AI work/);
});

test("LLM wiki acquisition surfaces route demand into one canonical hub", async () => {
  const hub = await readRepo("src/app/learn/articles.ts");
  const support = await readRepo("src/app/learn/seo-articles.ts");
  const home = await readRepo("src/i18n/content/en.ts");
  const learnIndex = await readRepo("src/app/learn/page.tsx");
  const structuredData = await readRepo("src/app/structured-data.ts");
  const seoMeasurement = await readRepo("docs/seo-measurement.md");
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.match(
    hub,
    /slug:\s*"distilled-wiki-pages-ai-memory"[\s\S]*?title:\s*"LLM Wiki for AI Work: Source-Backed Pages in Wenlan"/,
  );
  assert.match(
    hub,
    /slug:\s*"distilled-wiki-pages-ai-memory"[\s\S]*?metaTitle:\s*"LLM Wiki for AI Work \| Wenlan"/,
  );
  assert.match(hub, /source-backed AI work wiki/);
  assert.match(hub, /href:\s*"\/docs\/get-started"/);
  assert.match(hub, /href:\s*"\/docs\/daily-workflow"/);
  assert.match(hub, /href:\s*"\/docs\/data-and-privacy"/);
  assert.match(
    hub,
    /relatedSlugs:\s*\["source-backed-wiki-pages-ai-work",\s*"ai-memory-provenance",\s*"local-git-history-ai-memory"\]/,
  );
  assert.match(
    support,
    /slug:\s*"source-backed-wiki-pages-ai-work"[\s\S]*?relatedSlugs:\s*\["distilled-wiki-pages-ai-memory"/,
  );
  assert.match(home, /id:\s*"llm-wiki"/);
  assert.match(home, /href:\s*"\/learn\/distilled-wiki-pages-ai-memory"/);
  assert.match(learnIndex, /LLM wiki for AI work/);
  assert.match(structuredData, /LLM wiki for AI work/);
  assert.match(llms, /LLM wiki for AI work/);
  assert.match(llmsFull, /LLM wiki for AI work/);
  assert.match(seoMeasurement, /What is an LLM wiki for AI work\?/);
  assert.match(seoMeasurement, /What is the best LLM wiki for AI agents\?/);
  assert.match(seoMeasurement, /AI 工作的 LLM wiki 是什麼/);
  assert.match(seoMeasurement, /适合 AI 工作的 LLM wiki 是什么/);
});

test("postbuild URL discovery reads moved English route-group source files", async () => {
  const indexNow = await readRepo("scripts/indexnow-ping.mjs");

  assert.match(indexNow, /src\/app\/\(en\)\/learn\/articles\.ts/);
  assert.match(indexNow, /src\/app\/\(en\)\/docs\/docs\.ts/);
  assert.doesNotMatch(indexNow, /src\/app\/learn\/articles\.ts/);
  assert.doesNotMatch(indexNow, /src\/app\/docs\/docs\.ts/);
});

test("public eval surfaces publish the latest LME oracle and LME-S framing", async () => {
  const fullMetricSurfaces = [
    "public/llms.txt",
    "src/app/llms-full.txt/route.ts",
    "src/app/structured-data.ts",
    "src/i18n/content/en.ts",
    "src/app/docs/docs.ts",
    "src/app/learn/articles.ts",
    "docs/seo-measurement.md",
  ];

  for (const path of fullMetricSurfaces) {
    const source = await readRepo(path);
    assert.match(source, /LME_Oracle/, path);
    assert.match(source, /93\.6%/, path);
    assert.match(source, /0\.857/, path);
    assert.match(source, /0\.883/, path);
    assert.match(source, /LME_S/, path);
    assert.match(source, /N=90/, path);
    assert.match(source, /87\.7%/, path);
    assert.match(source, /0\.815/, path);
    assert.match(source, /0\.822/, path);
    assert.doesNotMatch(source, /Retrieval aggregate pending/, path);
  }

  const homepageContent = await readRepo("src/i18n/content/en.ts");
  assert.match(homepageContent, /Full replay/, "src/i18n/content/en.ts");
  assert.match(homepageContent, /No retrieval/, "src/i18n/content/en.ts");
  assert.match(homepageContent, /168 tokens \/ query/, "src/i18n/content/en.ts");

  const headlineMetricSurfaces = [
    "src/app/opengraph-image.tsx",
  ];

  for (const path of headlineMetricSurfaces) {
    const source = await readRepo(path);
    assert.match(source, /LME_Oracle/, path);
    assert.match(source, /93\.6/, path);
    assert.match(source, /0\.857/, path);
    assert.match(source, /0\.883/, path);
    assert.match(source, /LME_S/, path);
    assert.match(source, /N=90/, path);
    assert.match(source, /87\.7/, path);
    assert.match(source, /0\.815/, path);
    assert.match(source, /0\.822/, path);
  }

  const publicSources = (await Promise.all([
    ...fullMetricSurfaces,
    ...headlineMetricSurfaces,
  ].map((path) => readRepo(path)))).join("\n");

  assert.doesNotMatch(publicSources, /59\.5%/);
  assert.doesNotMatch(publicSources, /0\.589/);
  assert.doesNotMatch(publicSources, /0\.626/);
  assert.doesNotMatch(publicSources, /0\.747/);
  assert.doesNotMatch(publicSources, /0\.614/);
  assert.doesNotMatch(publicSources, /N=31/);
  assert.doesNotMatch(publicSources, /LME_oracle/);
  assert.doesNotMatch(publicSources, /70\.0%/);
  assert.doesNotMatch(publicSources, /4\.8[- ]points?/i);
});

test("public source contains no stale Origin package, repo, install, or local-path surfaces", async () => {
  const forbidden = [
    /@7xuanlu\/origin/g,
    /origin@7xuanlu/g,
    /github\.com\/7xuanlu\/origin(?!-app|-website)/g,
    /~\/\.origin/g,
    /\borigin-mcp\b/g,
    /\borigin-types\b/g,
    /\borigin-server\b/g,
    /\borigin-core\b/g,
    /\borigin-cli\b/g,
    /\bORIGIN_SPACE\b/g,
    /\bORIGIN_HOST\b/g,
    /\bORIGIN_BIND_ADDR\b/g,
    /\bORIGIN_DATA_DIR\b/g,
  ];

  const failures = [];
  for (const pattern of forbidden) {
    failures.push(...(await collectMatches(pattern)));
  }

  assert.deepEqual(failures, []);
});

test("public prose displays Wenlan instead of stale Origin branding", async () => {
  const matches = await collectMatches(/\bOrigin\b/g);
  const allowed = matches.filter((match) =>
    /wenlan-site|Origin header|allowed Origin|HTTP Origin/.test(match),
  );
  const failures = matches.filter((match) => !allowed.includes(match));

  assert.deepEqual(failures, []);
});

test("public TypeScript string literals do not render stale Origin copy", async () => {
  const files = ["src/app/docs/docs.ts", "src/app/learn/seo-articles.ts"];
  const forbidden = [
    /\bOrigin MCP\b/,
    /\borigin space\b/,
    /\borigin spaces\.toml\b/,
    /\borigin list --limit 10\b/,
    /\borigin forget <id>\b/,
  ];
  const failures = [];

  for (const file of files) {
    const strings = await collectTypescriptStringValues(file);
    for (const { line, value } of strings) {
      if (forbidden.some((pattern) => pattern.test(value))) {
        failures.push(`${file}:${line}:${value}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});

test("security docs align with the current Wenlan site policy", async () => {
  const { version } = await currentWenlanRelease();
  const docs = await readRepo("src/app/docs/docs.ts");

  assert.doesNotMatch(docs, /acknowledgement within 48 hours/);
  assert.doesNotMatch(docs, /7-day fix-timeline/);
  assert.doesNotMatch(docs, /supported 0\.7\.x/);
  assert.match(docs, /acknowledgment within 72 hours/);
  assert.match(docs, new RegExp(`current stable ${escapeRegExp(version)}`));
});


test("public current-release surfaces track the authoritative Wenlan release", async () => {
  const { version, date } = await currentWenlanRelease();
  const structuredData = await readRepo("src/app/structured-data.ts");
  const englishContent = await readRepo("src/i18n/content/en.ts");
  const simplifiedContent = await readRepo("src/i18n/content/zh-CN.ts");
  const traditionalContent = await readRepo("src/i18n/content/zh-TW.ts");
  const aboutOg = await readRepo("src/app/about/opengraph-image.tsx");
  const docs = await readRepo("src/app/docs/docs.ts");
  const learnArticles = await readRepo("src/app/learn/articles.ts");
  const seoMeasurement = await readRepo("docs/seo-measurement.md");
  const sitemap = await readRepo("src/app/sitemap.ts");

  const escapedVersion = escapeRegExp(version);

  assert.match(structuredData, new RegExp(`softwareVersion: "${escapedVersion}"`));
  assert.match(englishContent, new RegExp(`"v${escapedVersion}"`));
  assert.match(englishContent, new RegExp(`Wenlan v${escapedVersion} ships`));
  assert.match(simplifiedContent, new RegExp(`"版本 v${escapedVersion}"`));
  assert.match(simplifiedContent, new RegExp(`Wenlan v${escapedVersion} 支持`));
  assert.match(traditionalContent, new RegExp(`"版本 v${escapedVersion}"`));
  assert.match(traditionalContent, new RegExp(`Wenlan v${escapedVersion} 支援`));
  assert.match(aboutOg, new RegExp(`v${escapedVersion} · Apache-2\\.0`));
  assert.match(docs, new RegExp(`current stable ${escapedVersion}`));
  assert.match(docs, new RegExp(`Wenlan version ${escapedVersion}`));
  assert.match(docs, new RegExp(`v${escapedVersion}.*${escapeRegExp(date)}`));
  assert.match(learnArticles, new RegExp(`Wenlan v${escapedVersion} as of ${escapeRegExp(date)}`));
  assert.match(learnArticles, new RegExp(`Last release alignment: v${escapedVersion} on ${escapeRegExp(date)}`));
  assert.match(seoMeasurement, new RegExp("softwareVersion` `" + escapedVersion + "`"));
  assert.match(sitemap, new RegExp(`ABOUT_UPDATED_AT = "${escapeRegExp(date)}"`));
  const getStartedDate = sitemap.match(/GET_STARTED_UPDATED_AT = "(\d{4}-\d{2}-\d{2})"/)?.[1];
  assert.ok(getStartedDate, "sitemap must declare GET_STARTED_UPDATED_AT");
  assert.ok(
    new Date(getStartedDate) >= new Date(date),
    "get-started sitemap date must not predate the current release",
  );
});

test("public docs expose a product readiness matrix for users and platform boundaries", async () => {
  const docs = await readRepo("src/app/docs/docs.ts");
  const llms = await readRepo("public/llms.txt");
  const localizedIndexes = [
    [
      "src/i18n/content/en.ts",
      await readRepo("src/i18n/content/en.ts"),
      /id:\s*"product-matrix"[\s\S]*?Updated Jul 9, 2026 · 6 min read/,
    ],
    [
      "src/i18n/content/zh-CN.ts",
      await readRepo("src/i18n/content/zh-CN.ts"),
      /id:\s*"product-matrix"[\s\S]*?更新于 2026 年 7 月 9 日 · 6 分钟阅读/,
    ],
    [
      "src/i18n/content/zh-TW.ts",
      await readRepo("src/i18n/content/zh-TW.ts"),
      /id:\s*"product-matrix"[\s\S]*?更新於 2026 年 7 月 9 日 · 6 分鐘閱讀/,
    ],
  ];

  assert.match(docs, /slug:\s*"product-matrix"/);
  assert.match(docs, /title:\s*"Product Matrix"/);
  assert.match(llms, /\[Product Matrix\]\(https:\/\/wenlan\.app\/docs\/product-matrix\)/);
  for (const [path, source, metadataPattern] of localizedIndexes) {
    assert.match(source, /id:\s*"product-matrix"[\s\S]*?href:\s*"\/docs\/product-matrix"/, path);
    assert.match(source, metadataPattern, path);
  }

  for (const route of [
    "/docs/get-started",
    "/docs/daily-workflow",
    "/docs/core-concepts",
    "/docs/architecture",
    "/docs/packages-and-registries",
    "/docs/platforms",
    "/docs/mcp-clients",
    "/docs/desktop-app",
    "/docs/troubleshooting",
    "/docs/releases-and-versioning",
  ]) {
    assert.match(docs, new RegExp(`href: "${escapeRegExp(route)}"`), route);
  }

  for (const publicSurface of [
    "daemon/runtime",
    "CLI",
    "MCP connector",
    "Claude Code plugin",
    "Codex plugin",
    "ChatGPT and Claude.ai remote MCP",
    "other MCP clients",
    "optional desktop app",
    "source build",
    "eval/docs provenance",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(publicSurface), "i"), publicSurface);
  }

  assert.match(docs, /macOS Apple Silicon/);
  assert.match(docs, /macOS Intel.*no current prebuilt runtime/i);
  assert.match(docs, /Linux x86_64/);
  assert.match(docs, /Linux aarch64 glibc/);
  assert.match(docs, /Windows x86_64/);
  assert.match(docs, /desktop app.*aarch64-apple-darwin/is);
  assert.match(docs, /daemon owns the database, pages, sessions, and retrieval behavior/i);
});

test("public onboarding is Wenlan-first and distinguishes plugin, local MCP, and web MCP paths", async () => {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const mcpMain = await readFile(resolve(wenlanRoot, "crates/wenlan-mcp/src/main.rs"), "utf8");
  const englishContent = await readRepo("src/i18n/content/en.ts");
  const simplifiedContent = await readRepo("src/i18n/content/zh-CN.ts");
  const traditionalContent = await readRepo("src/i18n/content/zh-TW.ts");
  const docs = await readRepo("src/app/docs/docs.ts");
  const structuredData = await readRepo("src/app/structured-data.ts");
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.match(mcpMain, /Streamable HTTP MCP server for remote clients \(claude\.ai, ChatGPT\)/);
  assert.doesNotMatch(englishContent, /Install the local memory layer/);
  assert.doesNotMatch(simplifiedContent, /安装本地 memory layer/);
  assert.doesNotMatch(traditionalContent, /安裝本地 memory layer/);

  for (const [path, source] of [
    ["src/i18n/content/en.ts", englishContent],
    ["src/i18n/content/zh-CN.ts", simplifiedContent],
    ["src/i18n/content/zh-TW.ts", traditionalContent],
  ]) {
    assert.match(source, /Claude Code/, path);
    assert.match(source, /Codex/, path);
    assert.match(source, /ChatGPT/, path);
  }

  assert.match(docs, /Claude Code plugin/);
  assert.match(docs, /Codex plugin/);
  assert.match(docs, /ChatGPT/);
  assert.match(docs, /Streamable HTTP MCP/);
  assert.match(docs, /Developer mode/);
  assert.match(structuredData, /ChatGPT/);
  assert.match(structuredData, /Streamable HTTP MCP/);
  assert.match(llms, /ChatGPT/);
  assert.match(llms, /Streamable HTTP MCP/);
  assert.match(llms, /possession of the URL grants access/);
  assert.match(llms, /Stop Remote Access when unused/);
  assert.match(llmsFull, /ChatGPT/);
});

test("public framing stays LLM-wiki-first across footer, social images, and the legacy demo", async () => {
  const surfaces = [
    ["src/i18n/content/en.ts", await readRepo("src/i18n/content/en.ts")],
    ["src/app/learn/opengraph-image.tsx", await readRepo("src/app/learn/opengraph-image.tsx")],
    ["src/app/learn/[slug]/opengraph-image.tsx", await readRepo("src/app/learn/[slug]/opengraph-image.tsx")],
    ["src/app/docs/[slug]/opengraph-image.tsx", await readRepo("src/app/docs/[slug]/opengraph-image.tsx")],
  ];

  for (const [path, source] of surfaces) {
    assert.doesNotMatch(source, /Living personal knowledge library/, path);
    assert.match(source, /LLM wiki/, path);
  }

  assert.match(surfaces[0][1], /Historical Wenlan demo v0\.9/);
  assert.match(surfaces[1][1], /ChatGPT/);
});

test("public client setup tracks the released wenlan connect command", async () => {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const cliMain = await readFile(resolve(wenlanRoot, "crates/wenlan-cli/src/main.rs"), "utf8");
  const surfaces = await readPublicCommandGuidance();

  assert.match(cliMain, /Connect\(commands::mcp::ConnectArgs\)/);
  for (const [path, source] of surfaces) {
    const renderedGuidance = await renderedGuidanceFor(path, source);
    assert.doesNotMatch(renderedGuidance, /\bwenlan mcp add\b/, path);
  }

  const publicGuidance = surfaces.map(([, source]) => source).join("\n");
  assert.match(publicGuidance, /wenlan connect codex/);
  assert.match(publicGuidance, /wenlan connect cursor/);
  assert.match(publicGuidance, /wenlan connect claude-desktop/);
});

test("public CLI guidance tracks the current top-level command surface", async () => {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const cliSource = await readFile(
    resolve(wenlanRoot, "crates/wenlan-cli/src/main.rs"),
    "utf8",
  );

  for (const command of ["Background", "Capture", "Memories", "Spaces", "Models", "Keys"]) {
    assert.match(cliSource, new RegExp(`\\b${command}\\b`), command);
  }

  const surfaces = await Promise.all(
    publicCommandGuidancePaths.map(async (path) => [path, await readRepo(path)]),
  );
  const publicGuidance = surfaces.map(([path, source]) => `// ${path}\n${source}`).join("\n");

  for (const staleCommand of [
    /\bwenlan install\b/,
    /\bwenlan uninstall\b/,
    /\bwenlan store\b/,
    /\bwenlan list\b/,
    /\bwenlan space\b/,
    /\bwenlan model\b/,
    /\bwenlan key\b/,
    /\bwenlan reranker\b/,
  ]) {
    assert.doesNotMatch(publicGuidance, staleCommand, staleCommand.source);
  }

  for (const staleCliDescription of [
    /wenlan CLI[^"\n]*\bstore\b/,
    /wenlan CLI[^"\n]*\bmodel\b/,
    /wenlan CLI[^"\n]*\bkey\b/,
    /The CLI uses[^"\n]*\b(store|list|model|key)\b/,
    /The CLI can[^"\n]*\b(store|list)\b/,
    /use wenlan setup, install/,
  ]) {
    assert.doesNotMatch(publicGuidance, staleCliDescription, staleCliDescription.source);
  }

  for (const currentCommand of [
    /wenlan background on/,
    /wenlan background off/,
    /wenlan capture/,
    /wenlan memories/,
    /wenlan spaces/,
    /wenlan models/,
    /wenlan keys/,
    /wenlan models reranker/,
  ]) {
    assert.match(publicGuidance, currentCommand, currentCommand.source);
  }
});

test("public command guidance tracks the current plugin contract", async () => {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const contract = JSON.parse(
    await readFile(resolve(wenlanRoot, "plugin-contract.json"), "utf8"),
  );
  const sharedCommands = contract.skills
    .filter((skill) => skill.status === "shared_now")
    .map((skill) => skill.name)
    .sort();
  const surfaces = await readPublicCommandGuidance();
  const publicGuidance = surfaces.map(([, source]) => source).join("\n");

  assert.deepEqual(sharedCommands, [
    "brief",
    "capture",
    "curate",
    "distill",
    "forget",
    "handoff",
    "help",
    "pages",
    "recall",
    "setup",
  ]);
  for (const [path, source] of surfaces) {
    const renderedGuidance = await renderedGuidanceFor(path, source);
    assert.doesNotMatch(
      renderedGuidance,
      /(?<![A-Za-z0-9_-])\/(?:init|review|read|debrief)\b/,
      path,
    );
  }
  for (const command of sharedCommands) {
    assert.match(publicGuidance, new RegExp(`/${escapeRegExp(command)}\\b`), command);
  }
  const docs = surfaces.find(([path]) => path === "src/app/docs/docs.ts")?.[1] ?? "";
  assert.doesNotMatch(docs, /\/pages[^"\n]*(?:preview|inside the agent session|without leaving)/i);
  assert.match(docs, /\/pages: list recent pages or open a matching page in your editor\./);
  assert.doesNotMatch(docs, /review, distill, read, and handoff/);
});

test("public-copy scans exclude private work artifacts", async () => {
  assert.equal(shouldSkipPublicScanEntry(".omo"), true);
  assert.equal(shouldSkipPublicScanEntry(".codegraph"), true);
  assert.equal(shouldSkipPublicScanEntry("src"), false);
});

test("public platform surfaces track current release artifact boundaries", async () => {
  const surfaces = [
    ["src/app/structured-data.ts", await readRepo("src/app/structured-data.ts")],
    ["public/llms.txt", await readRepo("public/llms.txt")],
    ["src/app/llms-full.txt/route.ts", await readRepo("src/app/llms-full.txt/route.ts")],
    ["src/i18n/content/en.ts", await readRepo("src/i18n/content/en.ts")],
    ["src/i18n/content/zh-CN.ts", await readRepo("src/i18n/content/zh-CN.ts")],
    ["src/i18n/content/zh-TW.ts", await readRepo("src/i18n/content/zh-TW.ts")],
    ["src/app/docs/docs.ts", await readRepo("src/app/docs/docs.ts")],
  ];

  for (const [path, source] of surfaces) {
    assert.doesNotMatch(source, /macOS\s*\(arm64,\s*x64\)/i, path);
    assert.doesNotMatch(source, /macOS\s+arm64\/x64/i, path);
  }

  const structuredData = surfaces[0][1];
  const llms = surfaces[1][1];
  const llmsFull = surfaces[2][1];
  const englishContent = surfaces[3][1];
  const simplifiedContent = surfaces[4][1];
  const traditionalContent = surfaces[5][1];
  const docs = surfaces[6][1];

  assert.match(structuredData, /macOS Apple Silicon/);
  assert.match(structuredData, /Linux x86_64 or aarch64 \(glibc\)/);
  assert.match(structuredData, /Windows x86_64/);
  assert.match(llms, /macOS Apple Silicon/);
  assert.match(llms, /Linux \(x86_64, aarch64; glibc\)/);
  assert.match(llmsFull, /macOS Apple Silicon/);
  assert.match(llmsFull, /Linux \(x86_64, aarch64; glibc\)/);
  assert.match(englishContent, /macOS Apple Silicon/);
  assert.match(englishContent, /no current prebuilt macOS Intel runtime/i);
  assert.match(simplifiedContent, /macOS Apple Silicon/);
  assert.match(simplifiedContent, /目前没有 macOS Intel 预编译运行时/);
  assert.match(traditionalContent, /macOS Apple Silicon/);
  assert.match(traditionalContent, /目前沒有 macOS Intel 預編譯執行環境/);
  assert.match(docs, /macOS Apple Silicon, Linux x86_64\/aarch64 with glibc, and Windows x86_64/);
  assert.match(docs, /macOS Intel.*no current prebuilt runtime/i);
});

test("public source has no stale Wenlan product assertions", async () => {
  const forbidden = [
    /softwareVersion` `0\.7\.0`/g,
    /softwareVersion: "0\.(?:7|9)\.0"/g,
    /Wenlan is local-first memory for AI work/g,
    /Local-first memory for AI work/g,
    /where AI work compounds/g,
    /visible, editable/g,
    /visible and editable/g,
    /current stable 0\.9\.0/g,
    /current stable release in the repository changelog is v0\.9\.0/g,
    /Recent main-branch work after v0\.9\.0/g,
    /After v0\.9\.0, main-branch work should be treated/g,
    /Wenlan version 0\.9\.0/g,
    /Wenlan v0\.9\.0 ships/g,
    /Wenlan v0\.9\.0 as of 2026-05-27/g,
    /Last refresh: v0\.9\.0 on 2026-05-27/g,
    /Wenlan v0\.7 upgrade/g,
    /v0\.7\.x runtime shape/g,
    /v0\.7-era runtime shape/g,
    /After v0\.7\.0, main received/g,
    /real git versioning of every memory write/g,
    /readable artifact history/g,
    /Every write is a git commit/g,
    /every memory write is a git commit/g,
    /Every memory has a Markdown file/g,
    /git log path\/to\/memory\.md/g,
    /full history of a single fact/g,
    /commit that created the claim/g,
    /git-versioned audit on every write/g,
    /wenlan import vault/g,
    /Wenlan can import Markdown-style vault content/g,
    /vault import path reads Markdown files/g,
    /Obsidian-style importer/g,
    /\/api\/ingest\/memory/g,
    /Background distillation still happens/g,
    /Background distillery/g,
    /background distill cycles supplement/g,
    /background distill cycles/g,
    /daemon pulls the week's captures into a distill cycle/g,
    /periodic refinery phase/g,
    /memory chores between sessions/g,
    /Between sessions, Wenlan deduplicates repeat facts, links related ideas, distills wiki pages/g,
    /The database is the index\. Markdown is the record/g,
    /Markdown as the human-readable record/g,
    /Markdown is the record you can read/g,
    /Markdown is the durable record people can read/g,
    /Wenlan stores human-readable Markdown records/g,
    /human-readable records, MCP clients/g,
    /wenlan mcp add/g,
    /git blame`? a fact/g,
    /Markdown remains the human-readable record\. The local database is the index/g,
  ];

  const failures = [];
  for (const pattern of forbidden) {
    failures.push(...(await collectMatches(pattern)));
  }

  assert.deepEqual(failures, []);
});

test("TypeScript public-copy literals have no stale Wenlan assertions", async () => {
  const files = [
    "src/app/layout.tsx",
    "src/app/opengraph-image.tsx",
    "src/app/about/opengraph-image.tsx",
    "src/app/docs/opengraph-image.tsx",
    "src/app/docs/[slug]/opengraph-image.tsx",
    "src/app/learn/opengraph-image.tsx",
    "src/app/learn/[slug]/opengraph-image.tsx",
    "src/app/about/page.tsx",
    "src/app/llms-full.txt/route.ts",
    "src/app/docs/docs.ts",
    "src/app/learn/articles.ts",
    "src/app/learn/seo-articles.ts",
    "src/components/sections.tsx",
  ];
  const forbidden = [
    /0\.7-era runtime shape/,
    /Wenlan v0\.7 upgrade/,
    /current stable 0\.9\.0/,
    /Wenlan is local-first memory for AI work/,
    /Local-first memory for AI work/,
    /where AI work compounds/,
    /visible, editable/,
    /visible and editable/,
    /Wenlan version 0\.9\.0/,
    /real git versioning of every memory write/,
    /readable artifact history/,
    /every memory write is a git commit/,
    /Every memory has a Markdown file/,
    /commit that created the claim/,
    /git-versioned audit on every write/,
    /wenlan import vault/,
    /Obsidian-style importer/,
    /Background distillation still happens/,
    /Background distillery/,
    /background distill cycles/,
    /periodic refinery phase/,
    /memory chores between sessions/,
    /The database is the index\. Markdown is the record/,
    /Markdown as the human-readable record/,
    /Markdown is the record you can read/,
    /Markdown is the durable record people can read/,
    /Wenlan stores human-readable Markdown records/,
    /human-readable records, MCP clients/,
    /git blame`? a fact/,
    /Markdown remains the human-readable record\. The local database is the index/,
  ];
  const failures = [];

  for (const file of files) {
    const strings = await collectTypescriptStringValues(file);
    for (const { line, value } of strings) {
      if (forbidden.some((pattern) => pattern.test(value))) {
        failures.push(`${file}:${line}:${value}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});

test("Wenlan route slugs replace old Origin slugs with direct redirects", async () => {
  const articleSources = [
    await readRepo("src/app/learn/articles.ts"),
    await readRepo("src/app/learn/seo-articles.ts"),
  ].join("\n");
  const slugMatches = [...articleSources.matchAll(/\bslug:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );
  const staleSlugs = slugMatches.filter((slug) => /\borigin\b/.test(slug));

  assert.deepEqual(staleSlugs, []);

  const nextConfig = await readRepo("next.config.ts");
  const requiredRedirects = [
    ["/learn/origin-for-claude-code", "/learn/wenlan-for-claude-code"],
    [
      "/learn/claude-code-memory-command-vs-origin",
      "/learn/claude-code-memory-command-vs-wenlan",
    ],
    [
      "/learn/where-origin-stores-claude-code-memory",
      "/learn/where-wenlan-stores-claude-code-memory",
    ],
    ["/learn/origin-vs-basic-memory", "/learn/wenlan-vs-basic-memory"],
    ["/learn/origin-vs-claude-mem", "/learn/wenlan-vs-claude-mem"],
    ["/learn/origin-vs-superlocal-memory", "/learn/wenlan-vs-superlocal-memory"],
    ["/learn/origin-codex-workflow", "/learn/wenlan-codex-workflow"],
    ["/learn/origin-cursor-workflow", "/learn/wenlan-cursor-workflow"],
    [
      "/learn/origin-claude-desktop-workflow",
      "/learn/wenlan-claude-desktop-workflow",
    ],
    ["/learn/origin-gemini-cli-workflow", "/learn/wenlan-gemini-cli-workflow"],
    ["/learn/origin-vscode-mcp-workflow", "/learn/wenlan-vscode-mcp-workflow"],
    ["/learn/origin-vs-mcp-memory-service", "/learn/wenlan-vs-mcp-memory-service"],
    ["/learn/origin-vs-chatgpt-memory", "/learn/wenlan-vs-chatgpt-memory"],
    ["/learn/origin-vs-obsidian-ai-memory", "/learn/wenlan-vs-obsidian-ai-memory"],
    ["/learn/origin-vs-notion-ai", "/learn/wenlan-vs-notion-ai"],
    ["/learn/origin-vs-mem0", "/learn/wenlan-vs-mem0"],
  ];

  for (const [source, destination] of requiredRedirects) {
    assert.match(nextConfig, new RegExp(`source:\\s*"${source}"`));
    assert.match(nextConfig, new RegExp(`destination:\\s*"${destination}"`));
  }
});

test("public internal links point to Wenlan route slugs", async () => {
  const linkSources = [
    await readRepo("src/components/site-footer.tsx"),
    await readRepo("src/app/(en)/not-found.tsx"),
    await readRepo("src/app/learn/page.tsx"),
  ].join("\n");

  assert.doesNotMatch(linkSources, /href=["{]?"\/learn\/origin-/);
  assert.doesNotMatch(linkSources, /href=["{]?"\/learn\/claude-code-memory-command-vs-origin/);
  assert.doesNotMatch(linkSources, /href=["{]?"\/learn\/where-origin-stores/);
});

test("public docs and assets do not expose stale lower-case Origin surfaces", async () => {
  const checks = [
    ["src/app/docs/docs.ts", /"origin":\s*{/],
    ["src/app/docs/docs.ts", /~\/\.local\/share\/origin/],
    ["src/app/docs/docs.ts", /origin list --limit 10/],
    ["src/app/docs/docs.ts", /origin forget <id>/],
    ["src/app/docs/docs.ts", /\bservers\.origin\b/],
    ["src/app/docs/docs.ts", /\bmcp_origin_/],
    ["src/app/docs/docs.ts", /\bcd origin\b/],
    ["src/app/docs/docs.ts", /ORIGIN_[A-Z0-9_]+/],
    ["src/app/learn/articles.ts", /origin forget <id>/],
    ["src/app/learn/seo-articles.ts", /\bservers\.origin\b/],
    ["src/app/learn/seo-articles.ts", /\bmcp_origin_/],
    ["src/app/globals.css", /\borigin-(warm|amber|gold|indigo|sage)\b/],
    ["src/app/globals.css", /\bcard-origin\b/],
    ["src/app/globals.css", /:\s+hover\b/],
    ["src/app/about/opengraph-image.tsx", /\bv0\.7\.0\b/],
    ["src/app/about/page.tsx", /"v0\.7\.0"|Wenlan v0\.7\.0 ships/],
  ];

  const failures = [];
  for (const [path, pattern] of checks) {
    const text = await readRepo(path);
    if (pattern.test(text)) {
      failures.push(`${path}: ${pattern}`);
    }
  }

  assert.deepEqual(failures, []);
});

test("comparison row data model names the Wenlan column directly", async () => {
  const articleSources = [
    await readRepo("src/app/learn/articles.ts"),
    await readRepo("src/app/learn/seo-articles.ts"),
    await readRepo("src/app/learn/[slug]/page.tsx"),
    await readRepo("src/app/llms-full.txt/route.ts"),
  ].join("\n");

  assert.match(articleSources, /\bwenlan:\s*string;/);
  assert.doesNotMatch(articleSources, /\borigin:\s*string;/);
  assert.doesNotMatch(articleSources, /\borigin:\s*"/);
  assert.doesNotMatch(articleSources, /\brow\.origin\b/);
});

test("TypeScript article AST uses Wenlan fit identifiers", async () => {
  const sourceText = await readRepo("src/app/learn/seo-articles.ts");
  const sourceFile = ts.createSourceFile(
    "src/app/learn/seo-articles.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const identifiers = [];

  function visit(node) {
    if (ts.isIdentifier(node)) {
      identifiers.push(node.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  assert.equal(identifiers.includes("originFit"), false);
  assert.equal(identifiers.includes("wenlanFit"), true);
});

test("Learn article headers keep long Wenlan titles inside mobile viewports", async () => {
  const page = await readRepo("src/app/learn/[slug]/page.tsx");

  assert.match(page, /mt-12 grid min-w-0/);
  assert.match(page, /<div className="min-w-0">/);
  assert.match(page, /<h1 className="[^"]*\bbreak-words\b[^"]*text-\[2rem\][^"]*\[overflow-wrap:anywhere\][^"]*sm:text-7xl/);

  const visuals = await readRepo("src/app/learn/article-visuals.tsx");
  assert.match(visuals, /grid min-w-0 grid-cols-\[32px_minmax\(0,1fr\)\]/);
  assert.match(visuals, /<p className="min-w-0 break-words text-sm/);
});
