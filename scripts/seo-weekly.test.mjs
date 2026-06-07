import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
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
    assert.match(report, /\| Total clicks \| 1 \|/);
    assert.match(report, /\| Total impressions \| 69 \|/);
    assert.match(report, /\| Average CTR \| 1\.45% \|/);
    assert.match(report, /\| Average position \| 16\.0 \|/);

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
    assert.match(report, /Verify `\/sitemap\.xml` includes changed canonical URLs\./);
    assert.doesNotMatch(report, /gsc-queries\.csv/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});
