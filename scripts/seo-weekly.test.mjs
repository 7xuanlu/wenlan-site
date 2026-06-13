import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const fixtureRoot = resolve(__dirname, "fixtures/seo-weekly");
const builtCheckerScript = resolve(repoRoot, "scripts/seo-built-technical-check.mjs");
const deployedCheckerScript = resolve(repoRoot, "scripts/seo-deployed-technical-check.mjs");
const aiVisibilityScript = resolve(repoRoot, "scripts/seo-ai-visibility-worksheet.mjs");
const pipelineScript = resolve(repoRoot, "scripts/seo-weekly-pipeline.mjs");
const umamiFetcherScript = resolve(repoRoot, "scripts/seo-umami-fetch.mjs");
const requiredBuiltRedirects = [
  { source: "/learn/ai-memory-app", destination: "/learn/ai-work-memory", statusCode: 308 },
  { source: "/guides/ai-memory-app", destination: "/learn/ai-work-memory", statusCode: 308 },
  { source: "/guides", destination: "/learn", statusCode: 308 },
  { source: "/guides/:slug", destination: "/learn/:slug", statusCode: 308 },
  { source: "/docs/guides", destination: "/learn", statusCode: 308 },
  {
    source: "/docs/guides/ai-memory-app",
    destination: "/learn/ai-work-memory",
    statusCode: 308,
  },
  { source: "/docs/guides/:slug", destination: "/learn/:slug", statusCode: 308 },
];
const requiredBuiltHeaders = [
  {
    source: "/llms.txt",
    headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
  },
  {
    source: "/llms-full.txt",
    headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
  },
  {
    source: "/feed.xml",
    headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
  },
  {
    source: "/.well-known/security.txt",
    headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
  },
  {
    source: "/_next/static/media/:path*",
    headers: [{ key: "X-Robots-Tag", value: "noindex" }],
  },
];
const requiredBuiltSitemapLocs = [
  "https://useorigin.app",
  "https://useorigin.app/learn",
  "https://useorigin.app/learn/claude-code-memory",
  "https://useorigin.app/learn/mcp-memory-server",
  "https://useorigin.app/learn/how-to-add-mcp-memory-to-cursor",
  "https://useorigin.app/learn/ai-work-memory",
  "https://useorigin.app/learn/origin-vs-superlocal-memory",
  "https://useorigin.app/docs/configuration",
];
const requiredBuiltHtmlPages = [
  { path: "index.html", canonical: "https://useorigin.app", type: "SoftwareApplication" },
  { path: "learn.html", canonical: "https://useorigin.app/learn", type: "CollectionPage" },
  {
    path: "learn/claude-code-memory.html",
    canonical: "https://useorigin.app/learn/claude-code-memory",
    type: "Article",
  },
  {
    path: "learn/mcp-memory-server.html",
    canonical: "https://useorigin.app/learn/mcp-memory-server",
    type: "Article",
    requiredLinks: [
      {
        href: "/learn/claude-code-memory",
        label: "Read the Claude Code memory guide",
      },
    ],
  },
  {
    path: "learn/how-to-add-mcp-memory-to-cursor.html",
    canonical: "https://useorigin.app/learn/how-to-add-mcp-memory-to-cursor",
    type: "Article",
  },
  {
    path: "learn/ai-work-memory.html",
    canonical: "https://useorigin.app/learn/ai-work-memory",
    type: "Article",
  },
  {
    path: "learn/origin-vs-superlocal-memory.html",
    canonical: "https://useorigin.app/learn/origin-vs-superlocal-memory",
    type: "Article",
  },
  {
    path: "docs/configuration.html",
    canonical: "https://useorigin.app/docs/configuration",
    type: "TechArticle",
    requiredLinks: [
      {
        href: "/learn/claude-code-memory",
        label: "Read the Claude Code memory guide",
      },
    ],
  },
];
const allowedRobotsTxt = "User-agent: *\nAllow: /\nSitemap: https://useorigin.app/sitemap.xml\n";
const requiredDeployedUrls = [
  "/",
  "/learn",
  "/learn/claude-code-memory",
  "/learn/mcp-memory-server",
  "/learn/how-to-add-mcp-memory-to-cursor",
  "/learn/ai-work-memory",
  "/learn/origin-vs-superlocal-memory",
  "/docs/configuration",
];
const requiredDeployedUtilityUrls = [
  "/llms.txt",
  "/llms-full.txt",
  "/feed.xml",
  "/.well-known/security.txt",
];
const deployedRedirects = [
  ["/learn/ai-memory-app", "/learn/ai-work-memory"],
  ["/guides", "/learn"],
  ["/guides/claude-code-memory", "/learn/claude-code-memory"],
  ["/guides/mcp-memory-server", "/learn/mcp-memory-server"],
  ["/guides/local-first-ai-memory", "/learn/local-first-ai-memory"],
  ["/guides/ai-memory-app", "/learn/ai-work-memory"],
  ["/docs/guides", "/learn"],
  ["/docs/guides/claude-code-memory", "/learn/claude-code-memory"],
  ["/docs/guides/ai-memory-app", "/learn/ai-work-memory"],
];

function builtHtmlPage(page, overrides = {}) {
  const { canonical, type, requiredLinks = [] } = page;
  const typeName = overrides.type ?? type;
  const canonicalHref = overrides.canonical ?? canonical;
  const robots = overrides.robots ?? "index, follow";
  const extraSchema = overrides.extraSchema ?? "";
  const extraHead = overrides.extraHead ?? "";
  const body =
    overrides.body ??
    (requiredLinks.length
      ? requiredLinks
          .map((link) => `<a href="${link.href}">${link.label}</a>`)
          .join("")
      : "ok");

  return [
    "<!DOCTYPE html><html><head>",
    `<link rel="canonical" href="${canonicalHref}"/>`,
    `<meta name="robots" content="${robots}"/>`,
    `<script type="application/ld+json">{"@context":"https://schema.org","@type":"${typeName}"}</script>`,
    extraSchema,
    extraHead,
    `</head><body>${body}</body></html>`,
  ].join("");
}

function deployedHtmlPage(path, overrides = {}) {
  const canonical =
    overrides.canonical ??
    `https://useorigin.app${path === "/" ? "" : path}`;
  const robots = overrides.robots ?? "index, follow";
  const type =
    overrides.type ??
    (path === "/"
      ? "SoftwareApplication"
      : path === "/learn"
        ? "CollectionPage"
        : path === "/docs/configuration"
          ? "TechArticle"
          : "Article");
  const requiredLinks = {
    "/learn/mcp-memory-server": [
      '<a href="/learn/claude-code-memory">Read the Claude Code memory guide</a>',
    ],
    "/docs/configuration": [
      '<a href="/learn/claude-code-memory">Read the Claude Code memory guide</a>',
    ],
  };
  const body = overrides.body ?? (requiredLinks[path] ?? ["ok"]).join("");
  const extraSchema = overrides.extraSchema ?? "";
  const extraHead = overrides.extraHead ?? "";

  return [
    "<!DOCTYPE html><html><head>",
    `<link rel="canonical" href="${canonical}"/>`,
    `<meta name="robots" content="${robots}"/>`,
    `<script type="application/ld+json">{"@context":"https://schema.org","@type":"${type}"}</script>`,
    extraSchema,
    extraHead,
    `</head><body>${body}</body></html>`,
  ].join("");
}

function deployedSitemap(overrides = {}) {
  const locs =
    overrides.locs ??
    requiredDeployedUrls.map((path) => `https://useorigin.app${path === "/" ? "" : path}`);

  return ["<urlset>", ...locs.map((loc) => `<url><loc>${loc}</loc></url>`), "</urlset>"].join(
    "",
  );
}

async function withDeployedFixture(overrides, callback) {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-deployed-fixture-"));
  const responses = {};

  for (const [source, destination] of overrides.redirects ?? deployedRedirects) {
    responses[source] = {
      status: 308,
      headers: { location: destination },
      body: "",
    };
  }

  responses["/robots.txt"] = {
    status: 200,
    headers: { "content-type": "text/plain" },
    body:
      overrides.robotsTxt ??
      allowedRobotsTxt,
  };

  responses["/sitemap.xml"] = {
    status: 200,
    headers: {
      "content-type": "application/xml",
      ...(overrides.sitemapHeaders ?? {}),
    },
    body: overrides.sitemap ?? deployedSitemap(overrides),
  };

  for (const path of requiredDeployedUtilityUrls) {
    responses[path] = {
      status: 200,
      headers: overrides.utilityHeaders?.[path] ?? {
        "x-robots-tag": "noindex, follow",
      },
      body: "ok",
    };
  }

  const deployedPagePaths = [
    ...new Set([
      ...requiredDeployedUrls,
      ...(overrides.redirects ?? deployedRedirects).map(([, destination]) => destination),
    ]),
  ];

  for (const path of deployedPagePaths) {
    if (responses[path]) continue;
    const pageOverrides = overrides.pages?.[path] ?? {};
    responses[path] = {
      status: 200,
      headers: pageOverrides.headers ?? {},
      body: deployedHtmlPage(path, pageOverrides),
    };
  }

  await writeFile(
    join(outputRoot, "responses.json"),
    JSON.stringify(responses, null, 2),
    "utf8",
  );

  try {
    return await callback(outputRoot);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
}

async function writeUmamiMetricFixture(outputRoot, metricsByType) {
  const fixtureDir = join(outputRoot, "umami-api-fixture");
  await mkdir(fixtureDir, { recursive: true });
  for (const [type, rows] of Object.entries(metricsByType)) {
    await writeFile(join(fixtureDir, `${type}.json`), JSON.stringify(rows), "utf8");
  }
  return fixtureDir;
}

async function writeBuiltSeoFixture(outputRoot, overrides = {}) {
  const buildDir = join(outputRoot, ".next");
  await mkdir(join(buildDir, "server/app"), { recursive: true });
  await writeFile(
    join(buildDir, "routes-manifest.json"),
    JSON.stringify({
      redirects: overrides.redirects ?? requiredBuiltRedirects,
      headers: overrides.headers ?? requiredBuiltHeaders,
    }),
    "utf8",
  );
  await writeFile(
    join(buildDir, "server/app/sitemap.xml.body"),
    [
      "<urlset>",
      ...(overrides.locs ?? requiredBuiltSitemapLocs).map(
        (loc) => `<url><loc>${loc}</loc></url>`,
      ),
      "</urlset>",
    ].join(""),
    "utf8",
  );
  await writeFile(
    join(buildDir, "server/app/robots.txt.body"),
    overrides.robotsTxt ?? allowedRobotsTxt,
    "utf8",
  );
  for (const page of requiredBuiltHtmlPages) {
    const pageOverrides = overrides.htmlPages?.[page.path] ?? {};
    const htmlPath = join(buildDir, "server/app", page.path);
    await mkdir(dirname(htmlPath), { recursive: true });
    await writeFile(htmlPath, builtHtmlPage(page, pageOverrides), "utf8");
  }
  return buildDir;
}

test("weekly SEO template labels partial GSC rows as table metrics", async () => {
  const template = await readFile(
    resolve(repoRoot, "docs/seo-audits/weekly-template.md"),
    "utf8",
  );

  assert.match(template, /\| Query table clicks \| - \|/);
  assert.match(template, /\| Query table impressions \| - \|/);
  assert.match(template, /\| Query table CTR \| - \|/);
  assert.match(template, /\| Query table average position \| - \|/);
  assert.doesNotMatch(template, /\| Total (clicks|impressions) \|/);
  assert.doesNotMatch(template, /\| Average (CTR|position) \|/);
});

test("package scripts include AI visibility worksheet generator", async () => {
  const packageJson = JSON.parse(await readFile(resolve(repoRoot, "package.json"), "utf8"));

  assert.equal(
    packageJson.scripts["seo:ai-visibility"],
    "node scripts/seo-ai-visibility-worksheet.mjs",
  );
});

test("AI visibility worksheet generator turns measurement prompts into manual rows", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-"));
  try {
    const promptsDoc = join(outputRoot, "measurement.md");
    const outputPath = join(outputRoot, "ai-visibility.md");

    await writeFile(
      promptsDoc,
      [
        "# Measurement",
        "",
        "## AI Visibility Prompts",
        "",
        "Run the same prompts monthly.",
        "",
        "1. What is the best AI work memory for people who use Claude Code and Cursor?",
        "2. What MCP memory server should I use for persistent memory across Claude Code and Cursor?",
        "",
        "## Next Section",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        aiVisibilityScript,
        "--",
        "--date",
        "2026-06-13",
        "--prompts-doc",
        promptsDoc,
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const worksheet = await readFile(outputPath, "utf8");

    assert.match(worksheet, /^# AI Visibility Worksheet — 2026-06-13/m);
    assert.match(worksheet, /Do not infer results/);
    assert.match(
      worksheet,
      /\| 1 \| What is the best AI work memory for people who use Claude Code and Cursor\? \| Claude \| manual \| manual \| manual \| manual \| manual \| manual \|/,
    );
    assert.match(
      worksheet,
      /\| 2 \| What MCP memory server should I use for persistent memory across Claude Code and Cursor\? \| Perplexity \| manual \| manual \| manual \| manual \| manual \| manual \|/,
    );
    assert.doesNotMatch(worksheet, /\| 3 \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator rejects docs with no prompts", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-empty-"));
  try {
    const promptsDoc = join(outputRoot, "measurement.md");
    await writeFile(promptsDoc, "# Measurement\n\n## AI Visibility Prompts\n\n", "utf8");

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          aiVisibilityScript,
          "--",
          "--date",
          "2026-06-13",
          "--prompts-doc",
          promptsDoc,
          "--output",
          join(outputRoot, "ai-visibility.md"),
        ],
        { cwd: repoRoot },
      ),
      /No AI visibility prompts found/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator requires an explicit date", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-date-"));
  try {
    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          aiVisibilityScript,
          "--",
          "--output",
          join(outputRoot, "ai-visibility.md"),
        ],
        { cwd: repoRoot },
      ),
      /Missing required --date/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator does not overwrite existing worksheets without force", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-clobber-"));
  try {
    const outputPath = join(outputRoot, "ai-visibility.md");
    await writeFile(outputPath, "filled manual results\n", "utf8");

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          aiVisibilityScript,
          "--",
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /Refusing to overwrite existing worksheet/,
    );

    assert.equal(await readFile(outputPath, "utf8"), "filled manual results\n");
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator supports explicit force overwrite", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-force-"));
  try {
    const outputPath = join(outputRoot, "ai-visibility.md");
    await writeFile(outputPath, "filled manual results\n", "utf8");

    await execFileAsync(
      process.execPath,
      [
        aiVisibilityScript,
        "--",
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
        "--force",
        "true",
      ],
      { cwd: repoRoot },
    );

    const worksheet = await readFile(outputPath, "utf8");
    assert.match(worksheet, /^# AI Visibility Worksheet — 2026-06-13/m);
    assert.doesNotMatch(worksheet, /filled manual results/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator rejects non-contiguous prompt numbering", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-numbering-"));
  try {
    const promptsDoc = join(outputRoot, "measurement.md");
    await writeFile(
      promptsDoc,
      [
        "# Measurement",
        "",
        "## AI Visibility Prompts",
        "",
        "1. First prompt?",
        "3. Third prompt?",
        "",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          aiVisibilityScript,
          "--",
          "--date",
          "2026-06-13",
          "--prompts-doc",
          promptsDoc,
          "--output",
          join(outputRoot, "ai-visibility.md"),
        ],
        { cwd: repoRoot },
      ),
      /AI visibility prompt numbering must be contiguous/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("AI visibility worksheet generator reads the current 24-prompt measurement list", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-ai-visibility-current-"));
  try {
    const outputPath = join(outputRoot, "ai-visibility.md");

    await execFileAsync(
      process.execPath,
      [
        aiVisibilityScript,
        "--",
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const worksheet = await readFile(outputPath, "utf8");
    const rows = worksheet
      .split("\n")
      .filter((line) => /^\| \d+ \|/.test(line));

    assert.equal(rows.length, 96);
    assert.match(worksheet, /Generated from `docs\/seo-measurement\.md`\./);
    assert.doesNotMatch(worksheet, new RegExp(repoRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(worksheet, /\| 24 \| What should I capture in AI work memory\? \| Perplexity \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("package scripts include deployed technical SEO checker", async () => {
  const packageJson = JSON.parse(await readFile(resolve(repoRoot, "package.json"), "utf8"));

  assert.equal(
    packageJson.scripts["seo:technical:deployed"],
    "node scripts/seo-deployed-technical-check.mjs",
  );
});

test("deployed technical SEO checker verifies robots, sitemap, key pages, utilities, and redirects", async () => {
  await withDeployedFixture({}, async (fixtureDir) => {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        deployedCheckerScript,
        "--",
        "--fixture-dir",
        fixtureDir,
      ],
      { cwd: repoRoot },
    );

    assert.match(stdout, /robots ok/);
    assert.match(stdout, /sitemap locs ok: 8/);
    assert.match(stdout, /key pages ok: 8/);
    assert.match(stdout, /utility noindex headers ok: 4/);
    assert.match(stdout, /redirects ok: 9/);
    assert.match(stdout, /old URLs absent from sitemap/);
  });
});

test("deployed technical SEO checker rejects robots.txt that disallows crawlers", async () => {
  await withDeployedFixture(
    {
      robotsTxt: "User-agent: *\nDisallow: /\nSitemap: https://useorigin.app/sitemap.xml\n",
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /robots\.txt blocks crawling with Disallow: \//,
      );
    },
  );
});

test("deployed technical SEO checker rejects robots.txt without the production sitemap", async () => {
  await withDeployedFixture(
    {
      robotsTxt: "User-agent: *\nAllow: /\n",
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /robots\.txt missing production sitemap URL/,
      );
    },
  );
});

test("deployed technical SEO checker does not require unshipped local internal links", async () => {
  await withDeployedFixture(
    {
      pages: {
        "/learn/mcp-memory-server": {
          body: "currently deployed MCP memory article",
        },
        "/docs/configuration": {
          body: "currently deployed configuration docs",
        },
      },
    },
    async (fixtureDir) => {
      const { stdout } = await execFileAsync(
        process.execPath,
        [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
        { cwd: repoRoot },
      );

      assert.match(stdout, /key pages ok: 8/);
    },
  );
});

test("deployed technical SEO checker rejects old guide URLs in the sitemap", async () => {
  await withDeployedFixture(
    {
      locs: [
        "https://useorigin.app",
        "https://useorigin.app/learn",
        "https://useorigin.app/learn/claude-code-memory",
        "https://useorigin.app/learn/mcp-memory-server",
        "https://useorigin.app/learn/how-to-add-mcp-memory-to-cursor",
        "https://useorigin.app/learn/ai-work-memory",
        "https://useorigin.app/learn/origin-vs-superlocal-memory",
        "https://useorigin.app/docs/configuration",
        "https://useorigin.app/guides/claude-code-memory",
      ],
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /old sitemap URLs present: https:\/\/useorigin\.app\/guides\/claude-code-memory/,
      );
    },
  );
});

test("deployed technical SEO checker rejects docs guide URLs and legacy learn URLs in the sitemap", async () => {
  const oldUrlCases = [
    "https://useorigin.app/docs/guides/claude-code-memory",
    "https://useorigin.app/learn/ai-memory-app",
  ];

  for (const oldUrl of oldUrlCases) {
    await withDeployedFixture(
      {
        locs: [
          "https://useorigin.app",
          "https://useorigin.app/learn",
          "https://useorigin.app/learn/claude-code-memory",
          "https://useorigin.app/learn/mcp-memory-server",
          "https://useorigin.app/learn/how-to-add-mcp-memory-to-cursor",
          "https://useorigin.app/learn/ai-work-memory",
          "https://useorigin.app/learn/origin-vs-superlocal-memory",
          "https://useorigin.app/docs/configuration",
          oldUrl,
        ],
      },
      async (fixtureDir) => {
        await assert.rejects(
          execFileAsync(
            process.execPath,
            [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
            { cwd: repoRoot },
          ),
          new RegExp(`old sitemap URLs present: ${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
        );
      },
    );
  }
});

test("deployed technical SEO checker rejects key pages with blocking robots signals or FAQPage schema", async () => {
  await withDeployedFixture(
    {
      pages: {
        "/learn": {
          robots: "noindex, nofollow",
          extraSchema:
            '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>',
        },
      },
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /page robots invalid: \/learn/,
      );
    },
  );
});

test("deployed technical SEO checker rejects FAQPage JSON-LD without a robots failure", async () => {
  await withDeployedFixture(
    {
      pages: {
        "/learn": {
          extraSchema:
            '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>',
        },
      },
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /FAQPage JSON-LD present: \/learn/,
      );
    },
  );
});

test("deployed technical SEO checker rejects utility URLs without noindex headers", async () => {
  await withDeployedFixture(
    {
      utilityHeaders: {
        "/llms.txt": {},
      },
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /utility X-Robots-Tag invalid: \/llms\.txt/,
      );
    },
  );
});

test("deployed technical SEO checker rejects old guide redirects that miss the canonical destination", async () => {
  await withDeployedFixture(
    {
      redirects: deployedRedirects.map(([source, destination]) =>
        source === "/guides/mcp-memory-server" ? [source, "/learn/wrong"] : [source, destination],
      ),
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /redirect final destination invalid: \/guides\/mcp-memory-server -> \/learn\/wrong/,
      );
    },
  );
});

test("deployed technical SEO checker rejects old guide redirects to a different origin", async () => {
  await withDeployedFixture(
    {
      redirects: deployedRedirects.map(([source, destination]) =>
        source === "/guides/mcp-memory-server"
          ? [source, "https://wrong.example/learn/mcp-memory-server"]
          : [source, destination],
      ),
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
          { cwd: repoRoot },
        ),
        /redirect origin invalid: \/guides\/mcp-memory-server -> https:\/\/wrong\.example\/learn\/mcp-memory-server/,
      );
    },
  );
});

test("deployed technical SEO checker allows legacy ai-memory redirect hops by default", async () => {
  await withDeployedFixture(
    {
      redirects: deployedRedirects.map(([source, destination]) =>
        source === "/guides/ai-memory-app" ? [source, "/learn/ai-memory-app"] : [source, destination],
      ),
    },
    async (fixtureDir) => {
      const { stdout } = await execFileAsync(
        process.execPath,
        [deployedCheckerScript, "--", "--fixture-dir", fixtureDir],
        { cwd: repoRoot },
      );

      assert.match(stdout, /redirects ok: 9/);
    },
  );
});

test("deployed technical SEO checker strict mode requires changed ai-memory redirects to be direct", async () => {
  await withDeployedFixture(
    {
      redirects: deployedRedirects.map(([source, destination]) =>
        source === "/guides/ai-memory-app" || source === "/docs/guides/ai-memory-app"
          ? [source, "/learn/ai-memory-app"]
          : [source, destination],
      ),
    },
    async (fixtureDir) => {
      await assert.rejects(
        execFileAsync(
          process.execPath,
          [
            deployedCheckerScript,
            "--",
            "--fixture-dir",
            fixtureDir,
            "--require-direct-changed-redirects",
            "true",
          ],
          { cwd: repoRoot },
        ),
        /redirect should be direct after deployment: \/guides\/ai-memory-app -> \/learn\/ai-work-memory/,
      );
    },
  );
});

test("deployed technical SEO checker strict mode passes when changed ai-memory redirects are direct", async () => {
  await withDeployedFixture({}, async (fixtureDir) => {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        deployedCheckerScript,
        "--",
        "--fixture-dir",
        fixtureDir,
        "--require-direct-changed-redirects",
        "true",
      ],
      { cwd: repoRoot },
    );

    assert.match(stdout, /direct changed redirects ok: 2/);
  });
});

test("built technical SEO checker verifies compiled redirects, headers, and sitemap", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-check-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot);

    const { stdout } = await execFileAsync(
      process.execPath,
      [
        builtCheckerScript,
        "--",
        "--build-dir",
        buildDir,
      ],
      { cwd: repoRoot },
    );

    assert.match(stdout, /redirects ok: 7/);
    assert.match(stdout, /noindex headers ok: 5/);
    assert.match(stdout, /sitemap required locs ok: 8/);
    assert.match(stdout, /html page checks ok: 8/);
    assert.match(stdout, /all html FAQPage absent ok: 8/);
    assert.match(stdout, /old URLs absent from sitemap/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects robots.txt output that disallows crawlers", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-robots-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      robotsTxt: "User-agent: *\nDisallow: /\nSitemap: https://useorigin.app/sitemap.xml\n",
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /robots\.txt blocks crawling with Disallow: \//,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects robots.txt output without the production sitemap", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-robots-sitemap-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      robotsTxt: "User-agent: *\nAllow: /\n",
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /robots\.txt missing production sitemap URL/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects stale build output", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-stale-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot);
    const sourceRoot = join(outputRoot, "source");
    const sourcePath = join(sourceRoot, "src/app/page.tsx");
    await mkdir(dirname(sourcePath), { recursive: true });
    await writeFile(sourcePath, "export default function Page() { return null; }\n", "utf8");

    const future = new Date(Date.now() + 60_000);
    await utimes(sourcePath, future, future);

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          builtCheckerScript,
          "--",
          "--build-dir",
          buildDir,
          "--source-root",
          sourceRoot,
        ],
        { cwd: repoRoot },
      ),
      /stale build output: run `pnpm build` before `pnpm seo:technical:built`/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects generic guide redirects before specific legacy redirects", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-order-"));
  try {
    const redirects = [
      { source: "/learn/ai-memory-app", destination: "/learn/ai-work-memory", statusCode: 308 },
      { source: "/guides", destination: "/learn", statusCode: 308 },
      { source: "/guides/:slug", destination: "/learn/:slug", statusCode: 308 },
      { source: "/guides/ai-memory-app", destination: "/learn/ai-work-memory", statusCode: 308 },
      { source: "/docs/guides", destination: "/learn", statusCode: 308 },
      { source: "/docs/guides/:slug", destination: "/learn/:slug", statusCode: 308 },
      {
        source: "/docs/guides/ai-memory-app",
        destination: "/learn/ai-work-memory",
        statusCode: 308,
      },
    ];
    const buildDir = await writeBuiltSeoFixture(outputRoot, { redirects });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /redirect order invalid/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker requires the legacy learn ai-memory-app redirect", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-learn-redirect-"));
  try {
    const redirects = requiredBuiltRedirects.filter(
      (redirect) => redirect.source !== "/learn/ai-memory-app",
    );
    const buildDir = await writeBuiltSeoFixture(outputRoot, { redirects });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /required redirects missing: \/learn\/ai-memory-app -> \/learn\/ai-work-memory/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects empty or incomplete sitemaps", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-sitemap-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      locs: ["https://useorigin.app"],
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /required sitemap URLs missing:/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects key pages with wrong canonical URLs", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-canonical-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "learn/claude-code-memory.html": {
          canonical: "https://useorigin.app/learn/wrong",
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /page canonical invalid: learn\/claude-code-memory\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects FAQPage JSON-LD on checked pages", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-faqpage-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "learn.html": {
          extraSchema:
            '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>',
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /FAQPage JSON-LD present: learn\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects FAQPage JSON-LD on any built HTML page", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-faqpage-any-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot);
    const uncheckedHtmlPath = join(buildDir, "server/app/docs/faq.html");
    await mkdir(dirname(uncheckedHtmlPath), { recursive: true });
    await writeFile(
      uncheckedHtmlPath,
      [
        "<!DOCTYPE html><html><head>",
        '<link rel="canonical" href="https://useorigin.app/docs/faq"/>',
        '<meta name="robots" content="index, follow"/>',
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>',
        "</head><body>faq</body></html>",
      ].join(""),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /FAQPage JSON-LD present: docs\/faq\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects FAQPage JSON-LD outside app HTML", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-faqpage-pages-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot);
    const legacyHtmlPath = join(buildDir, "server/pages/404.html");
    await mkdir(dirname(legacyHtmlPath), { recursive: true });
    await writeFile(
      legacyHtmlPath,
      [
        "<!DOCTYPE html><html><head>",
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>',
        "</head><body>not found</body></html>",
      ].join(""),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /FAQPage JSON-LD present: pages\/404\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects blocking X-Robots-Tag headers on key pages", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-header-block-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      headers: [
        ...requiredBuiltHeaders,
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        },
      ],
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /blocking X-Robots-Tag header on key pages:/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects schema type strings outside JSON-LD", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-schema-text-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "learn.html": {
          type: "BreadcrumbList",
          body: '"@type":"CollectionPage"',
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /page schema missing CollectionPage: learn\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker rejects duplicate conflicting canonical and robots tags", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-duplicates-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "learn/mcp-memory-server.html": {
          extraHead:
            '<link rel="canonical" href="https://useorigin.app/learn/wrong"/><meta name="robots" content="noindex, nofollow"/>',
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /page canonical invalid: learn\/mcp-memory-server\.html/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker requires configuration docs to link to Claude Code memory", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-internal-link-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "docs/configuration.html": {
          body: "configuration page without the guide link",
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /required internal link missing: docs\/configuration\.html -> \/learn\/claude-code-memory/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("built technical SEO checker requires the MCP memory article to link to Claude Code memory", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-built-mcp-link-"));
  try {
    const buildDir = await writeBuiltSeoFixture(outputRoot, {
      htmlPages: {
        "learn/mcp-memory-server.html": {
          body: "MCP memory article without the Claude Code guide link",
        },
      },
    });

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [builtCheckerScript, "--", "--build-dir", buildDir],
        { cwd: repoRoot },
      ),
      /required internal link missing: learn\/mcp-memory-server\.html -> \/learn\/claude-code-memory/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator turns GSC exports into a ranked Markdown action report", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-weekly-"));
  try {
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /^# Weekly SEO\/GEO Audit — 2026-06-07/m);
    assert.match(report, /\| Query table clicks \| 1 \|/);
    assert.match(report, /\| Query table impressions \| 69 \|/);
    assert.match(report, /\| Query table CTR \| 1\.45% \|/);
    assert.match(report, /\| Query table average position \| 16\.0 \|/);
    assert.doesNotMatch(report, /\| Total impressions \|/);

    assert.match(report, /## Top Actions/);
    assert.match(report, /title-meta-refresh/);
    assert.match(report, /internal-link-refresh/);
    assert.match(report, /new-article-candidate/);
    assert.match(report, /technical-check/);

    assert.match(
      report,
      /\| `claude code memory` \| Claude Code \| `\/learn\/claude-code-memory` \| 12 \| 0 \| 0\.00% \| 12\.4 \| title-meta-refresh \|/,
    );
    assert.match(
      report,
      /\| `cursor memory mcp` \| Cursor\/Codex workflows \| `\/learn\/how-to-add-mcp-memory-to-cursor` \| 6 \| 0 \| 0\.00% \| 18\.2 \| title-meta-refresh \|/,
    );
    assert.match(
      report,
      /\| `origin vs basic memory` \| Comparisons \| `\/learn\/origin-vs-basic-memory` \| 5 \| 0 \| 0\.00% \| 14\.0 \| title-meta-refresh \|/,
    );
    assert.match(
      report,
      /\| `unknown agent recall` \| Other \| - \| 3 \| 0 \| 0\.00% \| 31\.5 \| new-article-candidate \|/,
    );
    assert.match(
      report,
      /\| `\/guides\/mcp-memory-server` \| 6 \| 0 \| 0\.00% \| 18\.5 \| technical-check \| Old guide URL should remain redirected; verify canonical Learn URL is indexed\. \|/,
    );

    assert.match(report, /Do not create a new Learn page unless/);
    assert.match(report, /Record pre-change GSC snapshot for changed pages in this worksheet\./);
    assert.match(report, /Record post-change GSC snapshot after deployment and the next GSC read\./);
    assert.match(
      report,
      /Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema\./,
    );
    assert.match(
      report,
      /Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema\./,
    );
    assert.match(
      report,
      /Verify old `\/guides\/\*` and `\/docs\/guides\/\*` URLs redirect to canonical `\/learn\/\*` URLs\./,
    );
    assert.match(
      report,
      /Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`\./,
    );
    assert.match(
      report,
      /Fetch or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms\.txt` hits\./,
    );
    assert.match(
      report,
      /Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD` and manually check whether AI assistants mention Origin accurately for the tracked prompts in `docs\/seo-measurement\.md`\./,
    );
    assert.doesNotMatch(report, /Record before\/after GSC snapshot for changed pages\./);
    assert.doesNotMatch(report, /Verify `\/sitemap\.xml` includes changed canonical URLs\./);
    assert.doesNotMatch(report, /gsc-queries\.csv/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly pipeline trigger runs from a standard input directory", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-pipeline-"));
  try {
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly-pipeline.mjs"),
        "--",
        "--input-dir",
        fixtureRoot,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /^# Weekly SEO\/GEO Audit — 2026-06-07/m);
    assert.match(report, /\| Query table impressions \| 69 \|/);
    assert.match(report, /origin vs basic memory/);
    assert.match(report, /Do not create a new Learn page unless/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator summarizes optional Umami CSV exports", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-"));
  try {
    const umamiPagesPath = join(outputRoot, "umami-pages.csv");
    const umamiReferrersPath = join(outputRoot, "umami-referrers.csv");
    const umamiEventsPath = join(outputRoot, "umami-events.csv");
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await writeFile(
      umamiPagesPath,
      [
        "Path,Views",
        "/learn,42",
        "/learn/claude-code-memory,31",
        "/llms.txt,4",
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      umamiReferrersPath,
      [
        "Referrer,Visitors",
        "chatgpt.com,8",
        "perplexity.ai,7",
        "reddit.com,9",
        "google.com,22",
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      umamiEventsPath,
      ["Event,URL,Count", "request,/llms-full.txt,3", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--umami-pages",
        umamiPagesPath,
        "--umami-referrers",
        umamiReferrersPath,
        "--umami-events",
        umamiEventsPath,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Umami data source \| local CSV exports \|/);
    assert.match(report, /\| Umami landing page visits \| 77 across 3 rows \|/);
    assert.match(report, /\| AI referrals \| 15 visits from 2 referrers \|/);
    assert.match(report, /\| Reddit referrals \| 9 visits from 1 referrer \|/);
    assert.match(report, /\| llms\.txt hits \| 7 \|/);
    assert.match(report, /## Umami Evidence/);
    assert.match(report, /\| `\/learn` \| 42 \|/);
    assert.match(report, /\| chatgpt\.com \| 8 \| AI referral \|/);
    assert.match(report, /\| reddit\.com \| 9 \| Reddit \|/);
    assert.doesNotMatch(report, /\| Umami sessions \| manual \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator reports zero AI and Reddit referrals from Umami exports", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-zero-"));
  try {
    const umamiPagesPath = join(outputRoot, "umami-pages.csv");
    const umamiReferrersPath = join(outputRoot, "umami-referrers.csv");
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await writeFile(umamiPagesPath, ["Path,Views", "/learn,10", ""].join("\n"), "utf8");
    await writeFile(
      umamiReferrersPath,
      ["Referrer,Visitors", "google.com,22", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--umami-pages",
        umamiPagesPath,
        "--umami-referrers",
        umamiReferrersPath,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Umami data source \| local CSV exports \|/);
    assert.match(report, /\| AI referrals \| 0 visits from 0 referrers \|/);
    assert.match(report, /\| Reddit referrals \| 0 visits from 0 referrers \|/);
    assert.doesNotMatch(report, /\| AI referrals \| manual \|/);
    assert.doesNotMatch(report, /\| Reddit referrals \| manual \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator keeps referrer metrics manual when only Umami page exports exist", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-pages-only-"));
  try {
    const umamiPagesPath = join(outputRoot, "umami-pages.csv");
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await writeFile(
      umamiPagesPath,
      ["Path,Views", "/learn,10", "/llms.txt,2", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--umami-pages",
        umamiPagesPath,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Umami data source \| local CSV exports \|/);
    assert.match(report, /\| Umami landing page visits \| 12 across 2 rows \|/);
    assert.match(report, /\| AI referrals \| manual \|/);
    assert.match(report, /\| Reddit referrals \| manual \|/);
    assert.match(report, /\| llms\.txt hits \| 2 \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator keeps referrer metrics manual for unparseable Umami referrer exports", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-referrers-unparseable-"));
  try {
    const umamiReferrersPath = join(outputRoot, "umami-referrers.csv");
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");

    await writeFile(
      umamiReferrersPath,
      ["Referrer,Percentage", "chatgpt.com,40%", "reddit.com,20%", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--umami-referrers",
        umamiReferrersPath,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Umami data source \| local CSV exports \|/);
    assert.match(report, /\| Umami landing page visits \| manual \|/);
    assert.match(report, /\| AI referrals \| manual \|/);
    assert.match(report, /\| Reddit referrals \| manual \|/);
    assert.match(report, /### Referrers\n\nManual \/ not exported or missing a recognized metric column\./);
    assert.doesNotMatch(report, /\| AI referrals \| 0 visits from 0 referrers \|/);
    assert.doesNotMatch(report, /\| Reddit referrals \| 0 visits from 0 referrers \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator keeps referrer metrics manual for malformed Umami metric cells", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-referrers-malformed-"));
  try {
    const cases = [
      {
        name: "all-malformed",
        rows: ["Referrer,Visitors", "chatgpt.com,n/a", "reddit.com,unknown", ""],
      },
      {
        name: "mixed-valid-malformed",
        rows: ["Referrer,Visitors", "chatgpt.com,8", "reddit.com,n/a", ""],
      },
      {
        name: "percent-not-count",
        rows: ["Referrer,Visitors", "chatgpt.com,40%", "reddit.com,20%", ""],
      },
      {
        name: "negative-not-count",
        rows: ["Referrer,Visitors", "chatgpt.com,-1", "reddit.com,2", ""],
      },
    ];

    for (const malformedCase of cases) {
      const caseRoot = join(outputRoot, malformedCase.name);
      await mkdir(caseRoot, { recursive: true });
      const umamiReferrersPath = join(caseRoot, "umami-referrers.csv");
      const outputPath = join(caseRoot, "2026-06-07-weekly-seo.md");

      await writeFile(umamiReferrersPath, malformedCase.rows.join("\n"), "utf8");

      await execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          resolve(fixtureRoot, "gsc-queries.csv"),
          "--pages",
          resolve(fixtureRoot, "gsc-pages.csv"),
          "--umami-referrers",
          umamiReferrersPath,
          "--date",
          "2026-06-07",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      );

      const report = await readFile(outputPath, "utf8");

      assert.match(report, /\| Umami data source \| local CSV exports \|/);
      assert.match(report, /\| AI referrals \| manual \|/);
      assert.match(report, /\| Reddit referrals \| manual \|/);
      assert.match(report, /### Referrers\n\nManual \/ not exported or missing a recognized metric column\./);
      assert.doesNotMatch(report, /\| AI referrals \| 0 visits from 0 referrers \|/);
      assert.doesNotMatch(report, /\| Reddit referrals \| 0 visits from 0 referrers \|/);
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator keeps llms hits manual when any contributing Umami export is malformed", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-llms-malformed-"));
  try {
    const cases = [
      {
        name: "malformed-event",
        eventCount: "n/a",
      },
      {
        name: "percent-event",
        eventCount: "40%",
      },
      {
        name: "negative-event",
        eventCount: "-1",
      },
    ];

    for (const malformedCase of cases) {
      const caseRoot = join(outputRoot, malformedCase.name);
      await mkdir(caseRoot, { recursive: true });
      const umamiPagesPath = join(caseRoot, "umami-pages.csv");
      const umamiEventsPath = join(caseRoot, "umami-events.csv");
      const outputPath = join(caseRoot, "2026-06-07-weekly-seo.md");

      await writeFile(
        umamiPagesPath,
        ["Path,Views", "/llms.txt,4", ""].join("\n"),
        "utf8",
      );
      await writeFile(
        umamiEventsPath,
        ["Event,URL,Count", `request,/llms-full.txt,${malformedCase.eventCount}`, ""].join("\n"),
        "utf8",
      );

      await execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          resolve(fixtureRoot, "gsc-queries.csv"),
          "--pages",
          resolve(fixtureRoot, "gsc-pages.csv"),
          "--umami-pages",
          umamiPagesPath,
          "--umami-events",
          umamiEventsPath,
          "--date",
          "2026-06-07",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      );

      const report = await readFile(outputPath, "utf8");

      assert.match(report, /\| Umami data source \| local CSV exports \|/);
      assert.match(report, /\| Umami landing page visits \| 4 across 1 row \|/);
      assert.match(report, /\| llms\.txt hits \| manual \|/);
      assert.doesNotMatch(report, /\| llms\.txt hits \| 4 \|/);
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly pipeline trigger auto-detects optional Umami CSV exports", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-pipeline-umami-"));
  try {
    const inputDir = join(outputRoot, "input");
    const outputPath = join(outputRoot, "2026-06-07-weekly-seo.md");
    await mkdir(inputDir, { recursive: true });
    await writeFile(
      join(inputDir, "gsc-queries.csv"),
      await readFile(resolve(fixtureRoot, "gsc-queries.csv"), "utf8"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "gsc-pages.csv"),
      await readFile(resolve(fixtureRoot, "gsc-pages.csv"), "utf8"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "umami-pages.csv"),
      ["Page,Views", "/learn,10", "/llms.txt,2", ""].join("\n"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "umami-referrers.csv"),
      ["Source,Visits", "claude.ai,5", "old.reddit.com,4", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly-pipeline.mjs"),
        "--",
        "--input-dir",
        inputDir,
        "--date",
        "2026-06-07",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /## Umami Evidence/);
    assert.match(report, /\| Umami landing page visits \| 12 across 2 rows \|/);
    assert.match(report, /\| AI referrals \| 5 visits from 1 referrer \|/);
    assert.match(report, /\| Reddit referrals \| 4 visits from 1 referrer \|/);
    assert.match(report, /\| llms\.txt hits \| 2 \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo Umami fetcher exports API metrics to weekly CSV schema", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-fetch-"));
  try {
    const fixtureDir = await writeUmamiMetricFixture(outputRoot, {
      entry: [
        { name: "/learn", y: 999, pageviews: 80, visits: 42 },
        { name: "/learn/claude-code-memory", y: 999, pageviews: 70, visits: 31 },
        { name: "/llms.txt", y: 999, pageviews: 2, visits: 2 },
      ],
      referrer: [
        { name: "chatgpt.com", y: 999, pageviews: 20, visits: 8 },
        { name: "old.reddit.com", y: 999, pageviews: 10, visits: 4 },
      ],
      path: [
        { name: "/llms.txt", y: 999, pageviews: 2, visits: 1 },
        { name: "/llms-full.txt", y: 999, pageviews: 3, visits: 1 },
        { name: "/learn", y: 999, pageviews: 40, visits: 12 },
      ],
    });

    const { stdout } = await execFileAsync(
      process.execPath,
      [
        umamiFetcherScript,
        "--",
        "--start-date",
        "2026-05-15",
        "--end-date",
        "2026-06-11",
        "--output-dir",
        outputRoot,
        "--fixture-dir",
        fixtureDir,
        "--website-id",
        "test-website",
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          UMAMI_API_KEY: "test-key",
          UMAMI_AUTH_TOKEN: "",
        },
      },
    );

    assert.match(stdout, /\[seo-umami-fetch\] wrote 2 landing pages/);
    assert.equal(
      await readFile(join(outputRoot, "umami-pages.csv"), "utf8"),
      [
        "Page,Visits,Start date,End date,Source",
        "/learn,42,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "/learn/claude-code-memory,31,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "",
      ].join("\n"),
    );
    assert.equal(
      await readFile(join(outputRoot, "umami-referrers.csv"), "utf8"),
      [
        "Referrer,Visits,Start date,End date,Source",
        "chatgpt.com,8,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "old.reddit.com,4,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "",
      ].join("\n"),
    );
    assert.equal(
      await readFile(join(outputRoot, "umami-events.csv"), "utf8"),
      [
        "Event,URL,Count,Start date,End date,Source",
        "pageview,/llms.txt,2,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "pageview,/llms-full.txt,3,2026-05-15,2026-06-11,Umami metrics/expanded API",
        "",
      ].join("\n"),
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo Umami fetcher can skip cleanly when credentials are absent", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-skip-"));
  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        umamiFetcherScript,
        "--",
        "--start-date",
        "2026-05-15",
        "--end-date",
        "2026-06-11",
        "--output-dir",
        outputRoot,
        "--website-id",
        "test-website",
        "--skip-if-missing",
        "true",
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          UMAMI_API_KEY: "",
          UMAMI_AUTH_TOKEN: "",
        },
      },
    );

    assert.match(stdout, /skipped: missing Umami API credentials/);
    await assert.rejects(readFile(join(outputRoot, "umami-pages.csv"), "utf8"), {
      code: "ENOENT",
    });
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly pipeline fetches Umami data when credentials and GSC date metadata exist", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-pipeline-umami-fetch-"));
  try {
    const fixtureDir = await writeUmamiMetricFixture(outputRoot, {
      entry: [
        { name: "/learn", y: 999, visits: 42 },
        { name: "/learn/claude-code-memory", y: 999, visits: 31 },
        { name: "/llms.txt", y: 999, visits: 2 },
      ],
      referrer: [
        { name: "claude.ai", y: 999, visits: 5 },
        { name: "old.reddit.com", y: 999, visits: 4 },
      ],
      path: [
        { name: "/llms.txt", y: 999, pageviews: 2, visits: 1 },
        { name: "/llms-full.txt", y: 999, pageviews: 3, visits: 1 },
      ],
    });
    const inputDir = join(outputRoot, "input");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");
    const source = "authenticated GSC UI normalized";
    await mkdir(inputDir, { recursive: true });
    await writeFile(
      join(inputDir, "gsc-queries.csv"),
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,${source}`,
        `mcp memory server,1,20,5%,9.8,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "gsc-pages.csv"),
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `https://useorigin.app/learn,0,40,0%,11.2,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        pipelineScript,
        "--",
        "--input-dir",
        inputDir,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          UMAMI_API_KEY: "test-key",
          UMAMI_AUTH_TOKEN: "",
          UMAMI_WEBSITE_ID: "test-website",
          NEXT_PUBLIC_UMAMI_WEBSITE_ID: "",
          UMAMI_FIXTURE_DIR: fixtureDir,
        },
      },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Date range \| 2026-05-15 to 2026-06-11 \|/);
    assert.match(report, /\| Umami data source \| local CSV exports \|/);
    assert.match(report, /\| Umami landing page visits \| 73 across 2 rows \|/);
    assert.match(report, /\| AI referrals \| 5 visits from 1 referrer \|/);
    assert.match(report, /\| Reddit referrals \| 4 visits from 1 referrer \|/);
    assert.match(report, /\| llms\.txt hits \| 5 \|/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly pipeline ignores undated Umami CSVs when GSC date metadata exists", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-pipeline-umami-stale-"));
  try {
    const inputDir = join(outputRoot, "input");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");
    const source = "authenticated GSC UI normalized";
    await mkdir(inputDir, { recursive: true });
    await writeFile(
      join(inputDir, "gsc-queries.csv"),
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "gsc-pages.csv"),
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `https://useorigin.app/learn,0,40,0%,11.2,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      join(inputDir, "umami-pages.csv"),
      ["Page,Visits", "/stale-from-last-week,999", ""].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        pipelineScript,
        "--",
        "--input-dir",
        inputDir,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          UMAMI_API_KEY: "",
          UMAMI_AUTH_TOKEN: "",
          UMAMI_WEBSITE_ID: "",
          NEXT_PUBLIC_UMAMI_WEBSITE_ID: "",
          UMAMI_FIXTURE_DIR: "",
        },
      },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Umami data source \| manual \/ account-gated \|/);
    assert.match(report, /\| Umami landing page visits \| manual \|/);
    assert.doesNotMatch(report, /stale-from-last-week/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects Umami CSV metadata outside the GSC date range", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-umami-metadata-mismatch-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const umamiPagesPath = join(outputRoot, "umami-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");
    const source = "authenticated GSC UI normalized";

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `https://useorigin.app/learn,0,40,0%,11.2,2026-05-15,2026-06-11,${source}`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      umamiPagesPath,
      [
        "Page,Visits,Start date,End date,Source",
        "/learn,42,2026-04-15,2026-05-12,Umami metrics/expanded API",
        "",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          queriesPath,
          "--pages",
          pagesPath,
          "--umami-pages",
          umamiPagesPath,
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /Mismatched Umami date range/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator reports CSV evidence source and date range when available", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-metadata-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");
    const source =
      "authenticated GSC UI normalized; CSV download unavailable in Codex in-app Browser";

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,${source}`,
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        `https://useorigin.app/learn,0,54,0%,4.2,2026-05-15,2026-06-11,${source}`,
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, new RegExp(`Generated from ${source}`));
    assert.match(report, /\| Date range \| 2026-05-15 to 2026-06-11 \|/);
    assert.match(report, new RegExp(`\\| GSC data source \\| ${source} \\|`));
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects mismatched GSC query and page date ranges", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-mismatch-range-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "https://useorigin.app/learn,0,54,0%,4.2,2026-05-01,2026-05-28,normalized GSC export",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          queriesPath,
          "--pages",
          pagesPath,
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /Mismatched GSC date ranges: queries=2026-05-15 to 2026-06-11; pages=2026-05-01 to 2026-05-28/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects one-sided GSC date metadata", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-one-sided-range-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Source",
        "https://useorigin.app/learn,0,54,0%,4.2,normalized GSC export",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          queriesPath,
          "--pages",
          pagesPath,
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /One-sided GSC date metadata: queries=2026-05-15 to 2026-06-11; pages=unknown/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects mismatched GSC source metadata", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-mismatch-source-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "https://useorigin.app/learn,0,54,0%,4.2,2026-05-15,2026-06-11,visible UI copy",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          queriesPath,
          "--pages",
          pagesPath,
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /Mismatched GSC data sources: queries=normalized GSC export; pages=visible UI copy/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects one-sided GSC source metadata", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-one-sided-source-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date",
        "https://useorigin.app/learn,0,54,0%,4.2,2026-05-15,2026-06-11",
      ].join("\n"),
      "utf8",
    );

    await assert.rejects(
      execFileAsync(
        process.execPath,
        [
          resolve(repoRoot, "scripts/seo-weekly.mjs"),
          "--",
          "--queries",
          queriesPath,
          "--pages",
          pagesPath,
          "--date",
          "2026-06-13",
          "--output",
          outputPath,
        ],
        { cwd: repoRoot },
      ),
      /One-sided GSC source metadata: queries=normalized GSC export; pages=unknown/,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects partial and mixed GSC metadata within one export", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-internal-metadata-"));
  try {
    const pagesCsv = [
      "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
      "https://useorigin.app/learn,0,54,0%,4.2,2026-05-15,2026-06-11,normalized GSC export",
    ].join("\n");

    const cases = [
      {
        name: "partial-date",
        queryRows: [
          "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
          "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
          "mcp memory server,0,3,0%,3.3,,,normalized GSC export",
        ],
        error: /Partial GSC date metadata in queries export/,
      },
      {
        name: "mixed-date",
        queryRows: [
          "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
          "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
          "mcp memory server,0,3,0%,3.3,2026-05-01,2026-05-28,normalized GSC export",
        ],
        error: /Mixed GSC date ranges in queries export: 2026-05-01 to 2026-05-28; 2026-05-15 to 2026-06-11/,
      },
      {
        name: "partial-source",
        queryRows: [
          "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
          "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
          "mcp memory server,0,3,0%,3.3,2026-05-15,2026-06-11,",
        ],
        error: /Partial GSC source metadata in queries export/,
      },
      {
        name: "mixed-source",
        queryRows: [
          "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
          "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,normalized GSC export",
          "mcp memory server,0,3,0%,3.3,2026-05-15,2026-06-11,visible UI copy",
        ],
        error: /Mixed GSC source metadata in queries export: normalized GSC export; visible UI copy/,
      },
    ];

    for (const metadataCase of cases) {
      const caseRoot = join(outputRoot, metadataCase.name);
      await mkdir(caseRoot, { recursive: true });
      const queriesPath = join(caseRoot, "gsc-queries.csv");
      const pagesPath = join(caseRoot, "gsc-pages.csv");
      const outputPath = join(caseRoot, "2026-06-13-weekly-seo.md");
      await writeFile(queriesPath, metadataCase.queryRows.join("\n"), "utf8");
      await writeFile(pagesPath, pagesCsv, "utf8");

      await assert.rejects(
        execFileAsync(
          process.execPath,
          [
            resolve(repoRoot, "scripts/seo-weekly.mjs"),
            "--",
            "--queries",
            queriesPath,
            "--pages",
            pagesPath,
            "--date",
            "2026-06-13",
            "--output",
            outputPath,
          ],
          { cwd: repoRoot },
        ),
        metadataCase.error,
      );
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects malformed GSC metric cells", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-malformed-gsc-"));
  try {
    const validQueries = [
      "Query,Clicks,Impressions,CTR,Position",
      "claude code memory,0,12,0%,12.4",
      "",
    ].join("\n");
    const validPages = [
      "Page,Clicks,Impressions,CTR,Position",
      "https://useorigin.app/learn,0,54,0%,4.2",
      "",
    ].join("\n");
    const cases = [
      {
        name: "query-clicks-na",
        queries: ["Query,Clicks,Impressions,CTR,Position", "claude code memory,n/a,12,0%,12.4", ""].join("\n"),
        pages: validPages,
        error: /Invalid GSC queries clicks metric "n\/a"/,
      },
      {
        name: "query-impressions-percent",
        queries: ["Query,Clicks,Impressions,CTR,Position", "claude code memory,0,12%,0%,12.4", ""].join("\n"),
        pages: validPages,
        error: /Invalid GSC queries impressions metric "12%"/,
      },
      {
        name: "query-position-missing",
        queries: ["Query,Clicks,Impressions,CTR,Position", "claude code memory,0,12,0%,", ""].join("\n"),
        pages: validPages,
        error: /Missing GSC queries position metric/,
      },
      {
        name: "page-clicks-negative",
        queries: validQueries,
        pages: ["Page,Clicks,Impressions,CTR,Position", "https://useorigin.app/learn,-1,54,0%,4.2", ""].join("\n"),
        error: /Invalid GSC pages clicks metric "-1"/,
      },
      {
        name: "page-position-negative",
        queries: validQueries,
        pages: ["Page,Clicks,Impressions,CTR,Position", "https://useorigin.app/learn,0,54,0%,-4.2", ""].join("\n"),
        error: /Invalid GSC pages position metric "-4.2"/,
      },
    ];

    for (const malformedCase of cases) {
      const caseRoot = join(outputRoot, malformedCase.name);
      await mkdir(caseRoot, { recursive: true });
      const queriesPath = join(caseRoot, "gsc-queries.csv");
      const pagesPath = join(caseRoot, "gsc-pages.csv");
      const outputPath = join(caseRoot, "2026-06-13-weekly-seo.md");

      await writeFile(queriesPath, malformedCase.queries, "utf8");
      await writeFile(pagesPath, malformedCase.pages, "utf8");

      await assert.rejects(
        execFileAsync(
          process.execPath,
          [
            resolve(repoRoot, "scripts/seo-weekly.mjs"),
            "--",
            "--queries",
            queriesPath,
            "--pages",
            pagesPath,
            "--date",
            "2026-06-13",
            "--output",
            outputPath,
          ],
          { cwd: repoRoot },
        ),
        malformedCase.error,
      );
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator rejects empty GSC exports", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-empty-gsc-"));
  try {
    const validQueries = [
      "Query,Clicks,Impressions,CTR,Position",
      "claude code memory,0,12,0%,12.4",
      "",
    ].join("\n");
    const validPages = [
      "Page,Clicks,Impressions,CTR,Position",
      "https://useorigin.app/learn,0,54,0%,4.2",
      "",
    ].join("\n");
    const cases = [
      {
        name: "blank-queries",
        queries: "",
        pages: validPages,
        error: /GSC queries export has no data rows/,
      },
      {
        name: "header-only-queries",
        queries: "Query,Clicks,Impressions,CTR,Position\n",
        pages: validPages,
        error: /GSC queries export has no data rows/,
      },
      {
        name: "blank-pages",
        queries: validQueries,
        pages: "",
        error: /GSC pages export has no data rows/,
      },
      {
        name: "header-only-pages",
        queries: validQueries,
        pages: "Page,Clicks,Impressions,CTR,Position\n",
        error: /GSC pages export has no data rows/,
      },
    ];

    for (const emptyCase of cases) {
      const caseRoot = join(outputRoot, emptyCase.name);
      await mkdir(caseRoot, { recursive: true });
      const queriesPath = join(caseRoot, "gsc-queries.csv");
      const pagesPath = join(caseRoot, "gsc-pages.csv");
      const outputPath = join(caseRoot, "2026-06-13-weekly-seo.md");

      await writeFile(queriesPath, emptyCase.queries, "utf8");
      await writeFile(pagesPath, emptyCase.pages, "utf8");

      await assert.rejects(
        execFileAsync(
          process.execPath,
          [
            resolve(repoRoot, "scripts/seo-weekly.mjs"),
            "--",
            "--queries",
            queriesPath,
            "--pages",
            pagesPath,
            "--date",
            "2026-06-13",
            "--output",
            outputPath,
          ],
          { cwd: repoRoot },
        ),
        emptyCase.error,
      );
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator preserves manual audit sections when regenerating", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-preserve-manual-"));
  try {
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      outputPath,
      [
        "# Weekly SEO/GEO Audit — 2026-06-13",
        "",
        "stale generated body",
        "",
        "## Snapshot",
        "",
        "| Field | Value |",
        "| --- | --- |",
        "| Date range | Last 28 days |",
        "| GSC data source | CSV export |",
        "",
        "## Account-Gated Evidence Notes",
        "",
        "- Preserve captured GSC indexing details.",
        "",
        "## Deployed Technical SEO Checks",
        "",
        "- Preserve deployed robots and canonical checks.",
        "",
        "## Local Changes Made",
        "",
        "- Preserve local change notes.",
        "",
        "## Do Not Write Yet Gate",
        "",
        "stale gate",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /^# Weekly SEO\/GEO Audit — 2026-06-13/m);
    assert.doesNotMatch(report, /stale generated body/);
    assert.doesNotMatch(report, /stale gate/);
    assert.match(report, /## Account-Gated Evidence Notes\n\n- Preserve captured GSC indexing details\./);
    assert.match(report, /## Deployed Technical SEO Checks\n\n- Preserve deployed robots and canonical checks\./);
    assert.match(report, /## Local Changes Made\n\n- Preserve local change notes\./);
    assert.ok(report.indexOf("## Local Changes Made") < report.indexOf("## Do Not Write Yet Gate"));
    assert.equal(report.match(/## Account-Gated Evidence Notes/g)?.length, 1);
    assert.equal(report.match(/## Deployed Technical SEO Checks/g)?.length, 1);
    assert.equal(report.match(/## Local Changes Made/g)?.length, 1);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator refreshes preserved visible-table counts from current CSVs", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-refresh-preserved-counts-"));
  try {
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      outputPath,
      [
        "# Weekly SEO/GEO Audit — 2026-06-13",
        "",
        "## Snapshot",
        "",
        "| Field | Value |",
        "| --- | --- |",
        "| Date range | Last 28 days |",
        "| GSC data source | CSV export |",
        "",
        "## Account-Gated Evidence Notes",
        "",
        "- Normalized visible Search results tables: 999 query rows covering 88 clicks and 777 impressions; 555 page rows covering 44 clicks and 333 impressions. The visible tables are action-queue evidence, not full-property totals.",
        "- Preserve captured GSC indexing details.",
        "",
        "## Do Not Write Yet Gate",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.doesNotMatch(report, /999 query rows/);
    assert.match(
      report,
      /- Normalized visible Search results tables: 7 query rows covering 1 click and 69 impressions; 5 page rows covering 1 click and 99 impressions\. The visible tables are action-queue evidence, not full-property totals\./,
    );
    assert.match(report, /- Preserve captured GSC indexing details\./);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator drops preserved manual sections when old report lacks evidence metadata", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-metadata-less-manual-"));
  try {
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      outputPath,
      [
        "# Weekly SEO/GEO Audit — 2026-06-13",
        "",
        "## Account-Gated Evidence Notes",
        "",
        "- stale metadata-less manual note",
        "",
        "## Local Changes Made",
        "",
        "- stale metadata-less change note",
        "",
        "## Do Not Write Yet Gate",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.doesNotMatch(report, /stale metadata-less manual note/);
    assert.doesNotMatch(report, /stale metadata-less change note/);
    assert.doesNotMatch(report, /## Account-Gated Evidence Notes/);
    assert.doesNotMatch(report, /## Local Changes Made/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator drops preserved manual sections when evidence metadata changes", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-stale-manual-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "claude code memory,0,12,0%,12.4,2026-05-15,2026-06-11,fresh full GSC CSV export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position,Start date,End date,Source",
        "https://useorigin.app/learn,0,54,0%,4.2,2026-05-15,2026-06-11,fresh full GSC CSV export",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      outputPath,
      [
        "# Weekly SEO/GEO Audit — 2026-06-13",
        "",
        "## Snapshot",
        "",
        "| Field | Value |",
        "| --- | --- |",
        "| Date range | 2026-04-01 to 2026-04-28 |",
        "| GSC data source | stale visible UI copy |",
        "",
        "## Account-Gated Evidence Notes",
        "",
        "- stale visible-row caveat",
        "",
        "## Do Not Write Yet Gate",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(report, /\| Date range \| 2026-05-15 to 2026-06-11 \|/);
    assert.match(report, /\| GSC data source \| fresh full GSC CSV export \|/);
    assert.doesNotMatch(report, /stale visible-row caveat/);
    assert.doesNotMatch(report, /## Account-Gated Evidence Notes/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator maps Superlocal queries to the Superlocal comparison page", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-superlocal-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position",
        "superlocal memory,0,3,0%,9.0",
        "super local memory,0,1,0%,37.0",
        "super local app,0,1,0%,31.0",
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position",
        "https://useorigin.app/learn/origin-vs-superlocal-memory,0,3,0%,9.0",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(
      report,
      /\| `superlocal memory` \| Comparisons \| `\/learn\/origin-vs-superlocal-memory` \| 3 \| 0 \| 0\.00% \| 9\.0 \| title-meta-refresh \|/,
    );
    assert.match(
      report,
      /\| `super local memory` \| Comparisons \| `\/learn\/origin-vs-superlocal-memory` \| 1 \| 0 \| 0\.00% \| 37\.0 \| wait \|/,
    );
    assert.match(
      report,
      /\| `super local app` \| Other \| - \| 1 \| 0 \| 0\.00% \| 31\.0 \| wait \|/,
    );
    assert.doesNotMatch(report, /superlocal memory` \| Comparisons \| `\/learn\/origin-vs-basic-memory`/);
    assert.doesNotMatch(report, /super local memory` \| Other \| -/);
    assert.doesNotMatch(report, /super local app` \| Comparisons/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator treats guide root URLs as redirect technical checks", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-guides-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      ["Query,Clicks,Impressions,CTR,Position", "origin guides,0,1,0%,12.0", ""].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position",
        "https://useorigin.app/guides,0,7,0%,12.0",
        "https://useorigin.app/docs/guides,0,2,0%,14.0",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(
      report,
      /\| `\/guides` \| 7 \| 0 \| 0\.00% \| 12\.0 \| technical-check \| Old guide URL should remain redirected; verify canonical Learn URL is indexed\. \|/,
    );
    assert.match(
      report,
      /\| `\/docs\/guides` \| 2 \| 0 \| 0\.00% \| 14\.0 \| technical-check \| Old guide URL should remain redirected; verify canonical Learn URL is indexed\. \|/,
    );
    assert.doesNotMatch(report, /`\/guides` .* title-meta-refresh/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator flags strong-rank no-click Learn hub pages for SERP copy refresh", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-learn-hub-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      ["Query,Clicks,Impressions,CTR,Position", "origin memory,1,3,33.3%,5.7", ""].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position",
        "https://useorigin.app/learn,0,54,0%,4.2",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(
      report,
      /\| `\/learn` \| 54 \| 0 \| 0\.00% \| 4\.2 \| quick-answer-refresh \| Learn hub ranks strongly but earns no clicks\. Sharpen SERP title, description, and first-screen search-path copy\. \|/,
    );
    assert.match(
      report,
      /quick-answer-refresh.*`\/learn`: Learn hub ranks strongly but earns no clicks\./,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator flags high-impression weak-rank Learn pages for internal links", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-weak-learn-page-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    await writeFile(
      queriesPath,
      ["Query,Clicks,Impressions,CTR,Position", "claude code memory,0,6,0%,41.2", ""].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position",
        "https://useorigin.app/learn/claude-code-memory,0,37,0%,33.1",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(
      report,
      /\| `\/learn\/claude-code-memory` \| 37 \| 0 \| 0\.00% \| 33\.1 \| internal-link-refresh \| Existing Learn page has search demand but weak ranking\. Add links from stronger related pages before rewriting content\. \|/,
    );
    assert.match(
      report,
      /internal-link-refresh.*`\/learn\/claude-code-memory`: Existing Learn page has search demand but weak ranking\./,
    );
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("seo weekly generator maps existing AI memory app and filtered brand queries", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "origin-seo-brand-"));
  try {
    const queriesPath = join(outputRoot, "gsc-queries.csv");
    const pagesPath = join(outputRoot, "gsc-pages.csv");
    const outputPath = join(outputRoot, "2026-06-13-weekly-seo.md");

    const filteredBrandQuery =
      '"origin app" -"blue origin" -"a trusted origin" -site:reddit.com';

    await writeFile(
      queriesPath,
      [
        "Query,Clicks,Impressions,CTR,Position",
        "ai memory app,0,1,0%,98.0",
        "claude code memory,0,6,0%,41.2",
        `"${filteredBrandQuery.replace(/"/g, '""')}",0,19,0%,1.7`,
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      pagesPath,
      [
        "Page,Clicks,Impressions,CTR,Position",
        "https://useorigin.app/learn/ai-work-memory,0,1,0%,98.0",
        "https://useorigin.app/,0,19,0%,1.7",
        "",
      ].join("\n"),
      "utf8",
    );

    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        queriesPath,
        "--pages",
        pagesPath,
        "--date",
        "2026-06-13",
        "--output",
        outputPath,
      ],
      { cwd: repoRoot },
    );

    const report = await readFile(outputPath, "utf8");

    assert.match(
      report,
      /\| `ai memory app` \| AI work memory \| `\/learn\/ai-work-memory` \| 1 \| 0 \| 0\.00% \| 98\.0 \| wait \|/,
    );
    assert.match(
      report,
      /\| `claude code memory` \| Claude Code \| `\/learn\/claude-code-memory` \| 6 \| 0 \| 0\.00% \| 41\.2 \| wait \|/,
    );
    assert.match(
      report,
      /\| `"origin app" -"blue origin" -"a trusted origin" -site:reddit\.com` \| Brand\/entity \| `\/` \| 19 \| 0 \| 0\.00% \| 1\.7 \| wait \|/,
    );
    assert.doesNotMatch(report, /`ai memory app` \| Other \| -/);
    assert.doesNotMatch(report, /`"origin app" .* \| Architecture\/trust \| `\/learn\/local-first-ai-memory`/);
    assert.doesNotMatch(report, /visibility is weak/i);
    assert.doesNotMatch(report, /distribution/i);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("guide ai-memory-app redirects stay ahead of generic guide catchalls", async () => {
  const config = await readFile(resolve(repoRoot, "next.config.ts"), "utf8");

  const guidesSpecific = config.indexOf('source: "/guides/ai-memory-app"');
  const guidesCatchall = config.indexOf('source: "/guides/:slug"');
  const docsSpecific = config.indexOf('source: "/docs/guides/ai-memory-app"');
  const docsCatchall = config.indexOf('source: "/docs/guides/:slug"');

  assert.notEqual(guidesSpecific, -1);
  assert.notEqual(guidesCatchall, -1);
  assert.notEqual(docsSpecific, -1);
  assert.notEqual(docsCatchall, -1);
  assert.ok(guidesSpecific < guidesCatchall);
  assert.ok(docsSpecific < docsCatchall);
  assert.match(
    config.slice(guidesSpecific, guidesCatchall),
    /destination: "\/learn\/ai-work-memory"/,
  );
  assert.match(
    config.slice(docsSpecific, docsCatchall),
    /destination: "\/learn\/ai-work-memory"/,
  );
});

test("refreshed SEO pages preserve original publication dates", async () => {
  const learnArticles = await readFile(resolve(repoRoot, "src/app/learn/articles.ts"), "utf8");
  const docs = await readFile(resolve(repoRoot, "src/app/docs/docs.ts"), "utf8");
  const learnTemplate = await readFile(
    resolve(repoRoot, "src/app/learn/[slug]/page.tsx"),
    "utf8",
  );
  const docsTemplate = await readFile(resolve(repoRoot, "src/app/docs/[slug]/page.tsx"), "utf8");

  assert.match(
    learnArticles,
    /slug: "origin-vs-superlocal-memory"[\s\S]*publishedAt: "2026-05-27",[\s\S]*updatedAt: "2026-06-13"/,
  );
  assert.match(
    docs,
    /slug: "configuration"[\s\S]*publishedAt: "2026-06-01",[\s\S]*updatedAt: "2026-06-13"/,
  );
  assert.match(learnTemplate, /publishedTime: article\.publishedAt \?\? article\.updatedAt/);
  assert.match(learnTemplate, /datePublished: article\.publishedAt \?\? article\.updatedAt/);
  assert.match(learnTemplate, /modifiedTime: article\.updatedAt/);
  assert.match(learnTemplate, /dateModified: article\.updatedAt/);
  assert.match(docsTemplate, /publishedTime: page\.publishedAt \?\? page\.updatedAt/);
  assert.match(docsTemplate, /datePublished: page\.publishedAt \?\? page\.updatedAt/);
  assert.match(docsTemplate, /modifiedTime: page\.updatedAt/);
  assert.match(docsTemplate, /dateModified: page\.updatedAt/);
});

test("rss feed uses original publication dates for refreshed articles", async () => {
  const feedRoute = await readFile(resolve(repoRoot, "src/app/feed.xml/route.ts"), "utf8");

  assert.match(
    feedRoute,
    /<pubDate>\$\{rfc822Date\(article\.publishedAt \?\? article\.updatedAt\)\}<\/pubDate>/,
  );
  assert.match(feedRoute, /const latest = sorted\[0\]\?\.updatedAt/);
});

test("Superlocal comparison scopes missing benchmark evidence to checked sources", async () => {
  const learnArticles = await readFile(resolve(repoRoot, "src/app/learn/articles.ts"), "utf8");

  assert.doesNotMatch(learnArticles, /Superlocal Memory has not published LME numbers/);
  assert.match(
    learnArticles,
    /I did not find LongMemEval numbers on SuperLocalMemory's official site during the 2026-06-13 refresh/,
  );
  assert.match(
    learnArticles,
    /memory, cache, prompt compression, KV-cache alignment, and LLM cost optimization/,
  );
  assert.match(
    learnArticles,
    /local reliability layer spanning memory, cache, compression, and cost optimization/,
  );
});

test("Learn index SERP copy leads with Origin and AI work memory guides", async () => {
  const learnPage = await readFile(resolve(repoRoot, "src/app/learn/page.tsx"), "utf8");
  const learnOgImage = await readFile(
    resolve(repoRoot, "src/app/learn/opengraph-image.tsx"),
    "utf8",
  );

  assert.match(
    learnPage,
    /title: "Origin Learn: AI Work Memory Guides for Claude Code, Cursor, MCP"/,
  );
  assert.match(
    learnPage,
    /Find Origin guides for Claude Code memory, MCP memory servers, Cursor\/Codex workflows, local AI work context, setup, trust, and comparisons\./,
  );
  assert.match(learnPage, />\s*Origin AI work memory guides\.\s*</);
  assert.doesNotMatch(learnPage, /Before you add memory to AI work\./);
  assert.match(learnOgImage, /title="Origin AI work memory guides\."/);
  assert.doesNotMatch(learnOgImage, /Before you add memory to AI work\./);
});

test("homepage links directly to the Claude Code memory guide", async () => {
  const homepage = await readFile(resolve(repoRoot, "src/app/page.tsx"), "utf8");

  assert.match(homepage, /href="\/learn\/claude-code-memory"/);
  assert.match(homepage, /Claude Code memory/);
  assert.match(homepage, /href="\/learn\/mcp-memory-server"/);
  assert.match(homepage, /MCP server/);
});

test("configuration docs link to the Claude Code memory guide", async () => {
  const docs = await readFile(resolve(repoRoot, "src/app/docs/docs.ts"), "utf8");

  assert.match(
    docs,
    /slug: "configuration"[\s\S]*label: "Read the Claude Code memory guide"[\s\S]*href: "\/learn\/claude-code-memory"/,
  );
});

test("MCP memory article links contextually to the Claude Code memory guide", async () => {
  const articles = await readFile(resolve(repoRoot, "src/app/learn/articles.ts"), "utf8");
  const articlePage = await readFile(
    resolve(repoRoot, "src/app/learn/[slug]/page.tsx"),
    "utf8",
  );

  assert.match(
    articles,
    /slug: "mcp-memory-server"[\s\S]*label: "Read the Claude Code memory guide"[\s\S]*href: "\/learn\/claude-code-memory"/,
  );
  assert.match(articles, /export type LearnArticleSection = \{[\s\S]*link\?: \{/);
  assert.match(articlePage, /\{section\.link && \(/);
  assert.match(articlePage, /href=\{section\.link\.href\}/);
});

test("root layout declares intentional smooth scroll behavior", async () => {
  const layout = await readFile(resolve(repoRoot, "src/app/layout.tsx"), "utf8");
  const globals = await readFile(resolve(repoRoot, "src/app/globals.css"), "utf8");

  assert.match(globals, /scroll-behavior:\s*smooth/);
  assert.match(layout, /data-scroll-behavior="smooth"/);
});

test("learn article layout allows comparison content to shrink on mobile", async () => {
  const articlePage = await readFile(
    resolve(repoRoot, "src/app/learn/[slug]/page.tsx"),
    "utf8",
  );

  assert.match(articlePage, /className="min-w-0 space-y-14"/);
  assert.match(articlePage, /className="min-w-0 space-y-6 lg:sticky/);
});
