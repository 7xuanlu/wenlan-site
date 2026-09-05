import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  applyRule,
  computeEnglishHashes,
  extractChangelogFeatures,
  formatAssetSize,
  parseArgs,
  planProseEdits,
  refreshSourceHashes,
  rewriteReleasesFile,
} from "./release-bump.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const SAMPLE_RELEASES = `const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/7xuanlu/wenlan/releases/download/v0.15.3";

export const WENLAN_RELEASE = {
  version: "0.15.3",
  tag: "v0.15.3",
  publishedAt: "2026-08-01T08:47:47Z",
  releaseUrl: "https://github.com/7xuanlu/wenlan/releases/tag/v0.15.3",
  setupGuideUrl:
    "https://github.com/7xuanlu/wenlan/blob/v0.15.3/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.15.3_x64-setup.exe\`,
      format: "EXE",
      size: "58.1 MiB",
    },
    {
      id: "windows-x64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip\`,
      format: "ZIP",
      size: "72.0 MiB",
    },
    {
      id: "macos-arm64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.15.3_aarch64.dmg\`,
      format: "DMG",
      size: "81.2 MiB",
    },
    {
      id: "macos-runtime-arm64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz\`,
      format: "TAR.GZ",
      size: "50.0 MiB",
    },
    {
      id: "linux-x64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz\`,
      format: "TAR.GZ",
      size: "61.7 MiB",
    },
    {
      id: "linux-arm64",
      href: \`\${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz\`,
      format: "TAR.GZ",
      size: "55.4 MiB",
    },
  ],
} as const;
`;

const SAMPLE_SIZES = {
  "Wenlan_0.18.0_x64-setup.exe": 62216804,
  "Wenlan_0.18.0_aarch64.dmg": 87693821,
  "wenlan-windows-x64.zip": 77249623,
  "wenlan-darwin-arm64.tar.gz": 52480381,
  "wenlan-linux-x64.tar.gz": 65592541,
  "wenlan-linux-arm64.tar.gz": 65822923,
};

test("asset sizes render as one-decimal MiB values", () => {
  assert.equal(formatAssetSize(77249623), "73.7 MiB");
  assert.equal(formatAssetSize(52480381), "50.0 MiB");
  assert.equal(formatAssetSize(65592541), "62.6 MiB");
  assert.equal(formatAssetSize(65822923), "62.8 MiB");
  assert.throws(() => formatAssetSize(0), /Cannot format asset size/);
  assert.throws(() => formatAssetSize(-4), /Cannot format asset size/);
});

test("argument parsing supports check-by-default with opt-in apply", () => {
  assert.deepEqual(parseArgs([]), {
    apply: false,
    force: false,
    repo: repoRoot,
    wenlanRoot: null,
  });
  assert.equal(parseArgs(["--apply"]).apply, true);
  assert.equal(parseArgs(["--apply", "--force"]).force, true);
  assert.equal(parseArgs(["--repo=/tmp/site"]).repo, "/tmp/site");
  assert.equal(parseArgs(["--repo", "/tmp/site"]).repo, "/tmp/site");
  assert.equal(
    parseArgs(["--wenlan-root=/tmp/wenlan"]).wenlanRoot,
    "/tmp/wenlan",
  );
  assert.equal(
    parseArgs(["--wenlan-root", "/tmp/wenlan"]).wenlanRoot,
    "/tmp/wenlan",
  );
  assert.throws(() => parseArgs(["--bogus"]), /Unexpected argument/);
  assert.throws(() => parseArgs(["--repo"]), /Missing value for --repo/);
  assert.throws(() => parseArgs(["--repo="]), /Missing value for --repo/);
});

test("rule application replaces every occurrence and rejects silent no-ops", () => {
  const result = applyRule("v1 and v1 again", {
    file: "sample",
    find: "v1",
    replace: "v2",
    minMatches: 1,
  });
  assert.equal(result.text, "v2 and v2 again");
  assert.equal(result.matches, 2);
  assert.throws(
    () =>
      applyRule("nothing here", {
        file: "sample",
        find: "v9",
        replace: "v10",
        minMatches: 1,
      }),
    /Rule matched 0x/,
  );
});

test("prose plan covers every mechanical surface", () => {
  const rules = planProseEdits({
    oldVersion: "0.15.3",
    newVersion: "0.18.0",
    oldDate: "2026-08-01",
    date: "2026-09-04",
  });
  const files = new Set(rules.map((rule) => rule.file));
  assert.ok(files.has("src/i18n/content/en.ts"));
  assert.ok(files.has("src/i18n/content/zh-CN.ts"));
  assert.ok(files.has("src/i18n/content/zh-TW.ts"));
  assert.ok(files.has("src/app/(en)/docs/docs.ts"));
  assert.ok(files.has("src/app/(en)/about/opengraph-image.tsx"));
  assert.ok(files.has("src/app/sitemap.ts"));
  assert.ok(!files.has("scripts/seo-github-fetch.test.mjs"));
  const quickAnswer = rules.find((rule) =>
    rule.find.includes("dated 2026-08-01"),
  );
  assert.equal(quickAnswer.replace, "is v0.18.0, dated 2026-09-04");
});

test("release file rewrite bumps pin, URLs, and real asset sizes", () => {
  const text = rewriteReleasesFile(SAMPLE_RELEASES, {
    oldVersion: "0.15.3",
    oldPublishedAt: "2026-08-01T08:47:47Z",
    release: {
      version: "0.18.0",
      tag: "v0.18.0",
      date: "2026-09-04",
      publishedAt: "2026-09-04T20:31:03Z",
    },
    sizes: SAMPLE_SIZES,
  });
  assert.match(text, /version: "0.18.0"/);
  assert.match(text, /tag: "v0.18.0"/);
  assert.match(text, /publishedAt: "2026-09-04T20:31:03Z"/);
  assert.match(text, /releases\/download\/v0\.18\.0/);
  assert.match(text, /releases\/tag\/v0\.18\.0/);
  assert.match(text, /blob\/v0\.18\.0\/docs/);
  assert.match(text, /size: "59\.3 MiB"/);
  assert.match(text, /size: "83\.6 MiB"/);
  assert.match(text, /size: "73\.7 MiB"/);
  assert.match(text, /size: "50\.0 MiB"/);
  assert.match(text, /size: "62\.6 MiB"/);
  assert.match(text, /size: "62\.8 MiB"/);
  assert.match(text, /Wenlan_0\.18\.0_x64-setup\.exe/);
  assert.match(text, /Wenlan_0\.18\.0_aarch64\.dmg/);
  assert.doesNotMatch(text, /0\.15\.3/);
});

test("release file rewrite refuses a release missing a website asset", () => {
  assert.throws(
    () =>
      rewriteReleasesFile(SAMPLE_RELEASES, {
        oldVersion: "0.15.3",
        oldPublishedAt: "2026-08-01T08:47:47Z",
        release: {
          version: "0.18.0",
          tag: "v0.18.0",
          date: "2026-09-04",
          publishedAt: "2026-09-04T20:31:03Z",
        },
        sizes: { "wenlan-windows-x64.zip": 10 },
      }),
    /no asset named Wenlan_0\.18\.0_x64-setup\.exe/,
  );
});

test("source hash refresh updates only stale units", () => {
  const source = [
    "  home: {",
    '    status: "translated",',
    `    sourceHash: "${"0".repeat(64)}",`,
    "  about: {",
    '    status: "translated",',
    `    sourceHash: "${"a".repeat(64)}",`,
  ].join("\n");
  const { text, updated } = refreshSourceHashes(source, {
    home: "f".repeat(64),
    about: "a".repeat(64),
  });
  assert.equal(updated, 1);
  assert.ok(text.includes(`sourceHash: "${"f".repeat(64)}"`));
  assert.ok(text.includes(`sourceHash: "${"a".repeat(64)}"`));
});

test("changelog feature extraction stays within the release range", () => {
  const changelog = [
    "# Changelog",
    "",
    "## [0.18.0](https://example.com/compare) (2026-09-04)",
    "",
    "### Features",
    "",
    "* **app:** one home page for every library",
    "",
    "### Bug Fixes",
    "",
    "* **app:** keep starting when taken",
    "",
    "## [0.15.3](https://example.com/compare) (2026-08-01)",
    "",
    "* **core:** old news",
  ].join("\n");
  const features = extractChangelogFeatures(changelog, "0.18.0", "0.15.3");
  assert.deepEqual(features, [
    "* **app:** one home page for every library",
    "* **app:** keep starting when taken",
  ]);
});

test("hash subprocess agrees with the TypeScript hash module", async () => {
  const [{ enContent }] = await Promise.all([
    import("../src/i18n/content/index.ts"),
  ]);
  const { hashEnglishContentUnit } = await import("../src/i18n/hash.ts");
  const hashes = await computeEnglishHashes(repoRoot);
  for (const key of Object.keys(enContent)) {
    assert.equal(
      hashes[key],
      hashEnglishContentUnit(enContent[key].content),
      `hash parity for ${key}`,
    );
  }
});
