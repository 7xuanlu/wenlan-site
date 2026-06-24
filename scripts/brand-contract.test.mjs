import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const repoRoot = resolve(import.meta.dirname, "..");

async function readRepo(path) {
  return readFile(resolve(repoRoot, path), "utf8");
}

async function currentWenlanRelease() {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  const versionPath = resolve(wenlanRoot, "version.txt");
  const changelogPath = resolve(wenlanRoot, "CHANGELOG.md");
  const version = (await readFile(versionPath, "utf8")).trim();
  const changelog = await readFile(changelogPath, "utf8");
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
    if (
      entry.name === ".git" ||
      entry.name === ".next" ||
      entry.name === "node_modules" ||
      entry.name === "pnpm-lock.yaml"
    ) {
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

test("package metadata uses the wenlan-site identity", async () => {
  const packageJson = JSON.parse(await readRepo("package.json"));

  assert.equal(packageJson.name, "wenlan-site");
  assert.equal(packageJson.repository.url, "git+https://github.com/7xuanlu/wenlan-site.git");
  assert.equal(packageJson.bugs.url, "https://github.com/7xuanlu/wenlan-site/issues");
  assert.equal(packageJson.homepage, "https://github.com/7xuanlu/wenlan-site#readme");
  assert.match(packageJson.scripts["seo:weekly:sample"], /\/tmp\/wenlan-weekly-seo-sample\.md$/);
});

test("root metadata describes Wenlan on the current release surface", async () => {
  const layout = await readRepo("src/app/layout.tsx");

  assert.match(layout, /const siteTitle = "Wenlan \|/);
  assert.match(layout, /name: "Wenlan"/);
  assert.match(layout, /softwareVersion: "0\.9\.1"/);
  assert.match(layout, /installUrl: "https:\/\/github\.com\/7xuanlu\/wenlan#quickstart"/);
  assert.match(layout, /codeRepository: "https:\/\/github\.com\/7xuanlu\/wenlan"/);
});

test("public machine-readable surfaces use Wenlan names and packages", async () => {
  const manifest = JSON.parse(await readRepo("public/manifest.webmanifest"));
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.equal(manifest.name, "Wenlan");
  assert.equal(manifest.short_name, "Wenlan");
  assert.match(llms, /^# Wenlan/m);
  assert.match(llms, /living personal knowledge library for AI work/);
  assert.match(llms, /github\.com\/7xuanlu\/wenlan/);
  assert.match(llms, /wenlan-mcp/);
  assert.match(llms, /wenlan-types/);
  assert.match(llmsFull, /living personal knowledge library for AI work/);
  assert.doesNotMatch(llmsFull, /Wenlan is local-first memory for AI work/);
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
  const docs = await readRepo("src/app/docs/docs.ts");

  assert.doesNotMatch(docs, /acknowledgement within 48 hours/);
  assert.doesNotMatch(docs, /7-day fix-timeline/);
  assert.doesNotMatch(docs, /supported 0\.7\.x/);
  assert.match(docs, /acknowledgment within 72 hours/);
  assert.match(docs, /current stable 0\.9\.1/);
});


test("public current-release surfaces track the authoritative Wenlan release", async () => {
  const { version, date } = await currentWenlanRelease();
  const layout = await readRepo("src/app/layout.tsx");
  const aboutPage = await readRepo("src/app/about/page.tsx");
  const aboutOg = await readRepo("src/app/about/opengraph-image.tsx");
  const docs = await readRepo("src/app/docs/docs.ts");
  const seoMeasurement = await readRepo("docs/seo-measurement.md");
  const sitemap = await readRepo("src/app/sitemap.ts");

  const escapedVersion = escapeRegExp(version);

  assert.match(layout, new RegExp(`softwareVersion: "${escapedVersion}"`));
  assert.match(aboutPage, new RegExp(`"v${escapedVersion}"`));
  assert.match(aboutPage, new RegExp(`Wenlan v${escapedVersion} ships`));
  assert.match(aboutOg, new RegExp(`v${escapedVersion} · Apache-2\\.0`));
  assert.match(docs, new RegExp(`current stable ${escapedVersion}`));
  assert.match(docs, new RegExp(`Wenlan version ${escapedVersion}`));
  assert.match(docs, new RegExp(`v${escapedVersion}.*${escapeRegExp(date)}`));
  assert.match(seoMeasurement, new RegExp("softwareVersion` `" + escapedVersion + "`"));
  assert.match(sitemap, new RegExp(`ABOUT_UPDATED_AT = "${escapeRegExp(date)}"`));
  assert.match(sitemap, new RegExp(`GET_STARTED_UPDATED_AT = "${escapeRegExp(date)}"`));
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
    await readRepo("src/app/not-found.tsx"),
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
