import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import {
  buildGithubMetadata,
  collectReleasePages,
  githubHeaders,
  releaseContract,
} from "./seo-github-fetch.mjs";

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const fixtureRoot = resolve(__dirname, "fixtures/seo-weekly");

const currentAssets = [
  ["wenlan-cli-darwin-arm64.tar.gz", 0],
  ["wenlan-darwin-arm64.tar.gz", 7],
  ["wenlan-linux-arm64.tar.gz", 3],
  ["wenlan-linux-x64.tar.gz", 11],
  ["wenlan-mcp-darwin-arm64.tar.gz", 2],
  ["wenlan-windows-x64.zip", 4],
  ["Wenlan_0.17.3_aarch64.dmg", 2],
  ["Wenlan_0.17.3_x64-setup.exe", 1],
].map(([name, download_count], index) => ({
  name,
  size: 1_000 + index,
  download_count,
}));

test("GitHub fetch records stars and cumulative website release downloads", async () => {
  const outputRoot = await mkdtemp(join(tmpdir(), "wenlan-github-evidence-"));
  try {
    const source = await readFile(resolve(repoRoot, "src/lib/releases.ts"), "utf8");
    const metadata = buildGithubMetadata({
      repository: { stargazers_count: 47 },
      releases: [
          {
            tag_name: "v0.17.3",
            published_at: "2026-08-27T22:15:26Z",
            assets: currentAssets,
          },
          {
            tag_name: "v0.15.1",
            published_at: "2026-07-30T00:00:00Z",
            assets: [{ name: "older.zip", size: 100, download_count: 5 }],
          },
        ],
      contract: releaseContract(source),
      date: "2026-08-01",
      capturedAt: "2026-08-01T15:00:00.000Z",
    });
    const metadataPath = join(outputRoot, "github-metadata.json");
    await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
    assert.equal(metadata.stars, 47);
    assert.equal(metadata.currentRelease.tag, "v0.17.3");
    assert.equal(metadata.currentRelease.websiteAssetDownloads, 28);
    assert.equal(metadata.currentRelease.assetDownloads, 30);
    assert.equal(metadata.allReleaseAssetDownloads, 35);

    const reportPath = join(outputRoot, "weekly.md");
    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--queries",
        resolve(fixtureRoot, "gsc-queries.csv"),
        "--pages",
        resolve(fixtureRoot, "gsc-pages.csv"),
        "--date",
        "2026-08-01",
        "--github-metadata",
        metadataPath,
        "--output",
        reportPath,
      ],
      { cwd: repoRoot },
    );
    const report = await readFile(reportPath, "utf8");
    assert.match(report, /GitHub stars \| 47/);
    assert.match(report, /Website-linked v0\.17\.3 asset downloads \| 28/);
    assert.match(report, /All release asset downloads \| 35/);
    assert.match(report, /GitHub Release Evidence/);
    assert.match(report, /cumulative point-in-time counters/);
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("GitHub credentials are attached only to the official API origin", () => {
  const previousToken = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = "must-not-leak";
  try {
    assert.equal(
      githubHeaders("https://api.github.com/repos/7xuanlu/wenlan").Authorization,
      "Bearer must-not-leak",
    );
    assert.equal(
      githubHeaders("https://example.com/repos/7xuanlu/wenlan").Authorization,
      undefined,
    );
  } finally {
    if (previousToken === undefined) delete process.env.GITHUB_TOKEN;
    else process.env.GITHUB_TOKEN = previousToken;
  }
});

test("GitHub release pagination fails closed at the safety cap", async () => {
  let calls = 0;
  await assert.rejects(
    collectReleasePages(async () => {
      calls += 1;
      return Array.from({ length: 100 }, (_, index) => ({ id: index }));
    }),
    /exceeds the 1000 release safety cap/,
  );
  assert.equal(calls, 10);
});
