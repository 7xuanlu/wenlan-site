#!/usr/bin/env node

import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const execFileAsync = promisify(execFile);

const SITE_FILES = {
  releases: "src/lib/releases.ts",
  i18n: [
    "src/i18n/content/en.ts",
    "src/i18n/content/zh-CN.ts",
    "src/i18n/content/zh-TW.ts",
  ],
  docs: "src/app/(en)/docs/docs.ts",
  aboutOg: "src/app/(en)/about/opengraph-image.tsx",
  sitemap: "src/app/sitemap.ts",
};

const GH_REPOSITORY = "7xuanlu/wenlan";
const RELEASE_ASSET_IDS = [
  "windows-desktop-x64",
  "windows-x64",
  "macos-arm64",
  "macos-runtime-arm64",
  "linux-x64",
  "linux-arm64",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function formatAssetSize(bytes) {
  if (!Number.isSafeInteger(bytes) || bytes <= 0) {
    throw new Error(`Cannot format asset size: ${bytes}`);
  }
  return `${(bytes / 1048576).toFixed(1)} MiB`;
}

export function parseArgs(argv) {
  const args = { apply: false, force: false, repo: null, wenlanRoot: null };
  const takeValue = (flag, inlineValue, position) => {
    if (inlineValue !== undefined && inlineValue !== "") return inlineValue;
    const next = argv[position + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for ${flag}`);
    }
    return { consume: true, value: next };
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") {
      args.apply = true;
      continue;
    }
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    const eq = arg.indexOf("=");
    const flag = eq === -1 ? arg : arg.slice(0, eq);
    const inlineValue = eq === -1 ? undefined : arg.slice(eq + 1);
    if (flag !== "--repo" && flag !== "--wenlan-root") {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    const taken = takeValue(flag, inlineValue, index);
    if (typeof taken === "object") index += 1;
    args[flag === "--repo" ? "repo" : "wenlanRoot"] =
      typeof taken === "object" ? taken.value : taken;
  }
  if (!args.repo) args.repo = resolve(__dirname, "..");
  return args;
}

function wenlanCheckoutRoot(siteRoot, override) {
  if (override) return resolve(override);
  if (process.env.WENLAN_REPO_ROOT) return resolve(process.env.WENLAN_REPO_ROOT);
  return resolve(siteRoot, "../wenlan");
}

async function gitStdout(wenlanRoot, gitArgs) {
  const { stdout } = await execFileAsync("git", ["-C", wenlanRoot, ...gitArgs]);
  return stdout;
}

/** Authoritative release: highest v* tag in the sibling wenlan checkout. */
export async function readAuthoritativeRelease(wenlanRoot) {
  const tagStdout = await gitStdout(wenlanRoot, [
    "tag",
    "--list",
    "v[0-9]*",
    "--sort=-v:refname",
  ]);
  const tag = tagStdout.split("\n").find(Boolean);
  if (!tag) throw new Error(`No version tags found in ${wenlanRoot}`);
  const version = tag.startsWith("v") ? tag.slice(1) : tag;
  const [versionAtTag, changelog] = await Promise.all([
    gitStdout(wenlanRoot, ["show", `${tag}:version.txt`]).then((out) =>
      out.trim(),
    ),
    gitStdout(wenlanRoot, ["show", `${tag}:CHANGELOG.md`]),
  ]);
  if (versionAtTag !== version) {
    throw new Error(
      `Tag ${tag} carries version.txt ${versionAtTag}; refusing to guess`,
    );
  }
  const dateMatch = changelog.match(
    new RegExp(`^## \\[${escapeRegExp(version)}\\].*\\((\\d{4}-\\d{2}-\\d{2})\\)`, "m"),
  );
  if (!dateMatch) {
    throw new Error(`No dated CHANGELOG entry for ${version} at ${tag}`);
  }
  return { version, tag, date: dateMatch[1] };
}

export function readPinnedRelease(releasesSource) {
  const version = releasesSource.match(/version: "(\d+\.\d+\.\d+)"/)?.[1];
  const tag = releasesSource.match(/tag: "(v\d+\.\d+\.\d+)"/)?.[1];
  const publishedAt = releasesSource.match(
    /publishedAt: "(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}Z)?)"/,
  )?.[1];
  if (!version || !tag || !publishedAt) {
    throw new Error("Could not parse the pinned release from src/lib/releases.ts");
  }
  return { version, tag, date: publishedAt.slice(0, 10), publishedAt };
}

async function fetchReleaseFacts(tag) {
  let parsed;
  try {
    const { stdout } = await execFileAsync("gh", [
      "release",
      "view",
      tag,
      "--repo",
      GH_REPOSITORY,
      "--json",
      "assets,publishedAt",
    ]);
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(
      `Could not read GitHub release facts for ${tag} (gh CLI required): ${error.message}`,
    );
  }
  if (!parsed.publishedAt) {
    throw new Error(`GitHub release ${tag} has no publishedAt timestamp`);
  }
  const sizes = {};
  for (const asset of parsed.assets ?? []) {
    sizes[asset.name] = asset.size;
  }
  return { sizes, publishedAt: parsed.publishedAt };
}

function sizeForAssetHref(hrefBasename, sizes) {
  const bytes = sizes[hrefBasename];
  if (bytes === undefined) {
    throw new Error(`GitHub release has no asset named ${hrefBasename}`);
  }
  return formatAssetSize(bytes);
}

/**
 * Mechanical rewrite rules. Full `vX.Y.Z` strings denote the current release
 * by convention; release history uses the `vX.x` form and is never touched.
 * Every rule asserts its expected match count so a silent no-op is impossible.
 */
export function planProseEdits({ oldVersion, newVersion, oldDate, date }) {
  const rules = [];
  for (const file of SITE_FILES.i18n) {
    rules.push({
      file,
      find: `v${oldVersion}`,
      replace: `v${newVersion}`,
      minMatches: 1,
    });
  }
  rules.push(
    {
      file: SITE_FILES.docs,
      find: `"Wenlan version ${oldVersion}"`,
      replace: `"Wenlan version ${newVersion}"`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.docs,
      find: `is v${oldVersion}, dated ${oldDate}`,
      replace: `is v${newVersion}, dated ${date}`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.docs,
      find: `current stable ${oldVersion} line`,
      replace: `current stable ${newVersion} line`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.docs,
      find: `After v${oldVersion}, main-branch`,
      replace: `After v${newVersion}, main-branch`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.aboutOg,
      find: `v${oldVersion} · Apache-2.0`,
      replace: `v${newVersion} · Apache-2.0`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.sitemap,
      find: `ABOUT_UPDATED_AT = "${oldDate}"`,
      replace: `ABOUT_UPDATED_AT = "${date}"`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.sitemap,
      find: `DOWNLOAD_UPDATED_AT = "${oldDate}"`,
      replace: `DOWNLOAD_UPDATED_AT = "${date}"`,
      minMatches: 1,
    },
    {
      file: SITE_FILES.sitemap,
      find: `GET_STARTED_UPDATED_AT = "${oldDate}"`,
      replace: `GET_STARTED_UPDATED_AT = "${date}"`,
      minMatches: 1,
    },
  );
  return rules;
}

export function applyRule(source, rule) {
  const matches = source.split(rule.find).length - 1;
  if (matches < (rule.minMatches ?? 1)) {
    throw new Error(
      `Rule matched ${matches}x (expected at least ${rule.minMatches ?? 1}): ${rule.file} :: ${rule.find.slice(0, 80)}`,
    );
  }
  return { text: source.split(rule.find).join(rule.replace), matches };
}

function findRuleMatches(source, find) {
  const lines = [];
  source.split("\n").forEach((line, index) => {
    if (line.includes(find)) lines.push(index + 1);
  });
  return lines;
}

/** Rewrites the pinned release file; asset sizes come from the live release. */
export function rewriteReleasesFile(source, { oldVersion, oldPublishedAt, release, sizes }) {
  let text = source;
  const fixed = [
    [`releases/download/v${oldVersion}`, `releases/download/v${release.version}`],
    [`version: "${oldVersion}"`, `version: "${release.version}"`],
    [`tag: "v${oldVersion}"`, `tag: "v${release.version}"`],
    [`publishedAt: "${oldPublishedAt}"`, `publishedAt: "${release.publishedAt}"`],
    [`releases/tag/v${oldVersion}`, `releases/tag/v${release.version}`],
    [`blob/v${oldVersion}/`, `blob/v${release.version}/`],
  ];
  for (const [find, replace] of fixed) {
    const result = applyRule(text, { file: SITE_FILES.releases, find, replace, minMatches: 1 });
    text = result.text;
  }
  // Desktop installer filenames embed the version (Wenlan_0.18.0_aarch64.dmg).
  const versionedNames = applyRule(text, {
    file: SITE_FILES.releases,
    find: `_${oldVersion}_`,
    replace: `_${release.version}_`,
    minMatches: 1,
  });
  text = versionedNames.text;
  for (const id of RELEASE_ASSET_IDS) {
    const hrefPattern =
      "id: \"" + id + "\",\\s*href: `\\$\\{WENLAN_RELEASE_DOWNLOAD_BASE\\}/([^`\"]+)[`\"]";
    const hrefMatch = text.match(new RegExp(hrefPattern));
    if (!hrefMatch) {
      throw new Error(`Could not find download href for asset ${id}`);
    }
    const size = sizeForAssetHref(hrefMatch[1], sizes);
    const sizeRule = {
      file: SITE_FILES.releases,
      find: `id: "${id}"`,
      replace: `id: "${id}"`,
      minMatches: 1,
    };
    const sizePattern = new RegExp(
      `(id: "${escapeRegExp(id)}",[\\s\\S]{0,220}?size: ")[^"]+(")`,
    );
    if (!sizePattern.test(text)) {
      throw new Error(`Could not find size field for asset ${id}`);
    }
    applyRule(text, sizeRule);
    text = text.replace(sizePattern, `$1${size}$2`);
  }
  return text;
}

/** Computes English content-unit hashes via tsx (content modules are TypeScript). */
export async function computeEnglishHashes(siteRoot) {
  const evalScript = `
const [{ enContent }, { hashEnglishContentUnit }] = await Promise.all([
  import(process.env.WN_SITE_ROOT + "/src/i18n/content/index.ts"),
  import(process.env.WN_SITE_ROOT + "/src/i18n/hash.ts"),
]);
const out = {};
for (const key of Object.keys(enContent)) {
  out[key] = hashEnglishContentUnit(enContent[key].content);
}
console.log(JSON.stringify(out));
`;
  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      ["--import", "tsx", "--eval", evalScript],
      {
        cwd: siteRoot,
        env: { ...process.env, WN_SITE_ROOT: siteRoot },
      },
    );
    return JSON.parse(stdout);
  } catch (error) {
    throw new Error(`Could not compute English content hashes (tsx required): ${error.message}`);
  }
}

export function refreshSourceHashes(source, hashes) {
  let text = source;
  let updated = 0;
  for (const [unit, hash] of Object.entries(hashes)) {
    const pattern = new RegExp(
      `(${escapeRegExp(unit)}: \\{\\s*status: "[^"]*",\\s*sourceHash: ")[a-f0-9]{64}(")`,
    );
    const matches = text.match(pattern);
    if (!matches) continue;
    if (!matches[0].includes(hash)) {
      text = text.replace(pattern, `$1${hash}$2`);
      updated += 1;
    }
  }
  return { text, updated };
}

/** Suggests editorial input: feature bullets between the two tags. */
export function extractChangelogFeatures(changelog, newVersion, oldVersion) {
  const range = changelog.split(new RegExp(`^## \\[${escapeRegExp(oldVersion)}\\]`, "m"))[0];
  return range
    .split("\n")
    .filter((line) => line.startsWith("* **"))
    .slice(0, 12);
}

async function collectPlan(siteRoot, wenlanRoot) {
  const releasesSource = await readFile(resolve(siteRoot, SITE_FILES.releases), "utf8");
  const pinned = readPinnedRelease(releasesSource);
  const authoritative = await readAuthoritativeRelease(wenlanRoot);
  return { pinned, authoritative, releasesSource };
}

function describeDrift(plan) {
  const { pinned, authoritative } = plan;
  if (pinned.version === authoritative.version) return [];
  const lines = [
    `Pinned release is v${pinned.version} (${pinned.date}); authoritative release is v${authoritative.version} (${authoritative.date}).`,
  ];
  for (const rule of planProseEdits({
    oldVersion: pinned.version,
    newVersion: authoritative.version,
    oldDate: pinned.date,
    date: authoritative.date,
  })) {
    lines.push(`  rule: ${rule.file} :: ${rule.find.slice(0, 70)}`);
  }
  lines.push(`  rule: ${SITE_FILES.releases} (pin, URLs, asset sizes)`);
  lines.push("  editorial: rewrite the docs highlights section from the CHANGELOG range");
  return lines;
}

async function main(argv) {
  const args = parseArgs(argv);
  const siteRoot = resolve(args.repo);
  const wenlanRoot = wenlanCheckoutRoot(siteRoot, args.wenlanRoot);
  const plan = await collectPlan(siteRoot, wenlanRoot);
  const { pinned, authoritative } = plan;

  if (pinned.version === authoritative.version) {
    console.log(`Site already tracks the authoritative release v${authoritative.version}.`);
    return 0;
  }

  if (!args.apply) {
    console.log("Release drift detected:");
    for (const line of describeDrift(plan)) console.log(line);
    console.log('Run with --apply to rewrite the mechanical surfaces (docs highlights stay manual).');
    return 1;
  }

  const targetFiles = [
    SITE_FILES.releases,
    ...SITE_FILES.i18n,
    SITE_FILES.docs,
    SITE_FILES.aboutOg,
    SITE_FILES.sitemap,
  ];
  if (!args.force) {
    const { stdout } = await execFileAsync("git", [
      "-C",
      siteRoot,
      "status",
      "--short",
      "--",
      ...targetFiles,
    ]);
    if (stdout.trim()) {
      console.error(
        `Refusing to rewrite with uncommitted changes in target files (use --force):\n${stdout.trim()}`,
      );
      return 2;
    }
  }

  const { sizes, publishedAt } = await fetchReleaseFacts(authoritative.tag);
  const release = { ...authoritative, publishedAt };
  const sources = new Map();
  for (const file of targetFiles) {
    sources.set(file, await readFile(resolve(siteRoot, file), "utf8"));
  }

  const next = new Map(sources);
  next.set(
    SITE_FILES.releases,
    rewriteReleasesFile(sources.get(SITE_FILES.releases), {
      oldVersion: pinned.version,
      oldPublishedAt: pinned.publishedAt,
      release,
      sizes,
    }),
  );
  for (const rule of planProseEdits({
    oldVersion: pinned.version,
    newVersion: authoritative.version,
    oldDate: pinned.date,
    date: authoritative.date,
  })) {
    const result = applyRule(next.get(rule.file), rule);
    next.set(rule.file, result.text);
  }

  for (const [file, text] of next) {
    if (text !== sources.get(file)) {
      await writeFile(resolve(siteRoot, file), text);
      console.log(`Updated ${file}`);
    }
  }

  const hashes = await computeEnglishHashes(siteRoot);
  for (const file of ["src/i18n/content/zh-CN.ts", "src/i18n/content/zh-TW.ts"]) {
    const source = await readFile(resolve(siteRoot, file), "utf8");
    const { text, updated } = refreshSourceHashes(source, hashes);
    if (text !== source) {
      await writeFile(resolve(siteRoot, file), text);
      console.log(`Refreshed ${updated} source hash(es) in ${file}`);
    }
  }

  const changelog = await gitStdout(wenlanRoot, ["show", `${authoritative.tag}:CHANGELOG.md`]);
  const features = extractChangelogFeatures(changelog, authoritative.version, pinned.version);
  console.log(`\nPinned v${authoritative.version}. Editorial remainder (manual):`);
  console.log(`- Rewrite the docs highlights section for v${authoritative.version}; preserve the old one as v${pinned.version.split(".").slice(0, 2).join(".")}.x.`);
  console.log("- Candidate CHANGELOG lines to condense:");
  for (const line of features) console.log(`  ${line.slice(0, 140)}`);
  console.log("- Then run: pnpm lint && pnpm test:seo && node --import tsx --test scripts/i18n-contract.test.mjs");
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (error) => {
      console.error(`release-bump failed: ${error.message}`);
      process.exit(1);
    },
  );
}
