import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";

const repoRoot = resolve(import.meta.dirname, "..");
const execFileAsync = promisify(execFile);

const englishRouteGroupAliases = new Map([
  ["src/app/llms-full.txt/route.ts", "src/app/(en)/llms-full.txt/route.ts"],
]);

function sourcePath(path) {
  if (englishRouteGroupAliases.has(path)) {
    return englishRouteGroupAliases.get(path);
  }
  if (path.startsWith("src/app/docs/")) {
    return path.replace("src/app/docs/", "src/app/(en)/docs/");
  }

  return path;
}

async function readRepo(path) {
  return readFile(resolve(repoRoot, sourcePath(path)), "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function repositoryUrl(value) {
  return value.replace(/^git\+/, "").replace(/\.git$/, "");
}

function cargoVersion(cargoToml) {
  const match = cargoToml.match(/^version = "([^"]+)"/m);
  assert.ok(match, "app/Cargo.toml is missing a package version");
  return match[1];
}

async function latestVersionTag(repo) {
  const { stdout } = await execFileAsync("git", [
    "-C",
    repo,
    "tag",
    "--list",
    "v[0-9]*",
    "--sort=-v:refname",
  ]);
  return stdout.split("\n").find(Boolean);
}

function appBackendPin(pinFile) {
  const lines = pinFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const keyed = lines.some((line) => line.includes("="));
  if (!keyed) {
    assert.equal(lines.length, 2, "legacy backend pin must contain exactly tag and sha256");
    return {
      tag: lines[0],
      sha256: lines[1],
    };
  }

  assert.ok(
    lines.every((line) => line.includes("=")),
    "keyed backend pin cannot mix key/value and bare lines",
  );
  const entries = Object.fromEntries(
    lines.map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator), line.slice(separator + 1)];
    }),
  );
  assert.equal(
    Object.keys(entries).length,
    lines.length,
    "keyed backend pin cannot contain duplicate fields",
  );
  assert.ok(entries.backend_tag, ".wenlan-backend-version is missing backend_tag");
  assert.ok(
    entries.backend_darwin_arm64_sha256,
    ".wenlan-backend-version is missing backend_darwin_arm64_sha256",
  );

  return {
    tag: entries.backend_tag,
    sha256: entries.backend_darwin_arm64_sha256,
  };
}

async function readTaggedFile(repo, tag, path) {
  const { stdout } = await execFileAsync("git", ["-C", repo, "show", `${tag}:${path}`], {
    maxBuffer: 10 * 1024 * 1024,
  });
  return stdout;
}

async function currentWenlanAppRelease() {
  const appRoot = process.env.WENLAN_APP_REPO_ROOT
    ? resolve(process.env.WENLAN_APP_REPO_ROOT)
    : resolve(repoRoot, "../wenlan-app");
  const packagePath = resolve(appRoot, "package.json");
  try {
    await access(packagePath);
  } catch {
    throw new Error(
      [
        `WENLAN_APP_REPO_ROOT does not contain a wenlan-app checkout: ${appRoot}`,
        "Set WENLAN_APP_REPO_ROOT to an explicit wenlan-app checkout before validating public app facts.",
      ].join(" "),
    );
  }

  const releaseRef = await latestVersionTag(appRoot);
  assert.ok(
    releaseRef,
    "wenlan-app checkout has no version tag; fetch tags before validating published app facts",
  );
  const [packageJsonText, tauriText, cargoToml, backendPinText] = await Promise.all([
    readTaggedFile(appRoot, releaseRef, "package.json"),
    readTaggedFile(appRoot, releaseRef, "app/tauri.conf.json"),
    readTaggedFile(appRoot, releaseRef, "app/Cargo.toml"),
    readTaggedFile(appRoot, releaseRef, ".wenlan-backend-version"),
  ]);
  const packageJson = JSON.parse(packageJsonText);
  const tauri = JSON.parse(tauriText);
  const pin = appBackendPin(backendPinText);
  const version = packageJson.version;

  assert.equal(packageJson.name, "wenlan-app");
  assert.equal(repositoryUrl(packageJson.repository.url), "https://github.com/7xuanlu/wenlan-app");
  assert.equal(tauri.productName, "Wenlan");
  assert.equal(tauri.identifier, "com.wenlan.desktop");
  assert.equal(tauri.version, version);
  assert.equal(cargoVersion(cargoToml), version);
  assert.equal(pin.tag, `v${version}`);
  assert.match(pin.sha256, /^[a-f0-9]{64}$/);
  assert.ok(
    ["binaries/wenlan", "binaries/wenlan-server", "binaries/wenlan-mcp"].every((path) =>
      tauri.bundle.externalBin.includes(path),
    ),
  );
  assert.ok(
    tauri.plugins.updater.endpoints.includes(
      "https://github.com/7xuanlu/wenlan-app/releases/latest/download/latest.json",
    ),
  );

  return {
    root: appRoot,
    releaseRef,
    version,
    tag: pin.tag,
    repository: repositoryUrl(packageJson.repository.url),
    updaterEndpoint: tauri.plugins.updater.endpoints[0],
  };
}

test("wenlan-app backend pin parser accepts released and keyed manifests", () => {
  assert.deepEqual(
    appBackendPin(
      [
        "v0.14.0",
        "667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
      ].join("\n"),
    ),
    {
      tag: "v0.14.0",
      sha256: "667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
    },
  );
  assert.deepEqual(
    appBackendPin(
      [
        "backend_tag=v0.14.1",
        "backend_darwin_arm64_sha256=667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
        "backend_windows_x64_sha256=94c0e49e69e9b2e2de13acd4518592a899918ebdae50367878dc0edc57e10e4c",
      ].join("\n"),
    ),
    {
      tag: "v0.14.1",
      sha256: "667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
    },
  );
});

test("wenlan-app backend pin parser rejects mixed and incomplete manifests", () => {
  assert.throws(
    () =>
      appBackendPin(
        [
          "backend_tag=v0.14.1",
          "667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
        ].join("\n"),
      ),
    /cannot mix key\/value and bare lines/,
  );
  assert.throws(
    () => appBackendPin("backend_tag=v0.14.1"),
    /missing backend_darwin_arm64_sha256/,
  );
  assert.throws(
    () =>
      appBackendPin(
        [
          "backend_tag=v0.14.1",
          "backend_tag=v0.14.1",
          "backend_darwin_arm64_sha256=667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
        ].join("\n"),
      ),
    /duplicate fields/,
  );
  assert.throws(
    () =>
      appBackendPin(
        [
          "v0.14.0",
          "667e5cadafece24d520e098b1359e38d94adada8dbcf45913b836c925aa4c87e",
          "unexpected",
        ].join("\n"),
      ),
    /legacy backend pin must contain exactly tag and sha256/,
  );
});

test("wenlan-app release metadata exposes its bundled daemon pin", async () => {
  const app = await currentWenlanAppRelease();
  const publishedTag = await latestVersionTag(app.root);

  assert.equal(app.releaseRef, publishedTag);
  assert.equal(app.tag, publishedTag);
  assert.match(app.version, /^\d+\.\d+\.\d+$/);
  assert.match(app.tag, /^v\d+\.\d+\.\d+$/);
  assert.equal(app.repository, "https://github.com/7xuanlu/wenlan-app");
  assert.equal(
    app.updaterEndpoint,
    "https://github.com/7xuanlu/wenlan-app/releases/latest/download/latest.json",
  );
});

test("public desktop-app surfaces track wenlan-app source facts", async () => {
  const app = await currentWenlanAppRelease();
  const docs = await readRepo("src/app/docs/docs.ts");
  const structuredData = await readRepo("src/app/structured-data.ts");
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.match(docs, /href: "https:\/\/github\.com\/7xuanlu\/wenlan-app"/);
  assert.match(docs, /Tauri 2 \+ React 19/);
  assert.match(docs, /localhost:7878/);
  assert.match(docs, /\.wenlan-backend-version/);
  assert.match(docs, /app releases can trail the daemon release/);
  assert.doesNotMatch(docs, /origin-app/);

  assert.match(structuredData, /github\.com\/7xuanlu\/wenlan-app/);
  assert.match(structuredData, /Tauri 2 \+ React 19/);
  assert.match(structuredData, /localhost:7878/);
  assert.match(structuredData, /bundled daemon pin/);

  assert.match(llms, /Wenlan desktop app repository/);
  assert.match(llms, /github\.com\/7xuanlu\/wenlan-app/);
  assert.match(llmsFull, /github\.com\/7xuanlu\/wenlan-app/);
});

test("public web-client guidance tracks the released wenlan-app remote access boundary", async () => {
  const app = await currentWenlanAppRelease();
  const [
    remotePanel,
    remoteResources,
    remoteRuntime,
    docs,
    english,
    simplified,
    traditional,
  ] = await Promise.all([
    readTaggedFile(app.root, app.releaseRef, "src/components/memory/RemoteAccessPanel.tsx"),
    readTaggedFile(app.root, app.releaseRef, "src/i18n/resources.ts"),
    readTaggedFile(app.root, app.releaseRef, "app/src/remote_access.rs"),
    readRepo("src/app/docs/docs.ts"),
    readRepo("src/i18n/content/en.ts"),
    readRepo("src/i18n/content/zh-CN.ts"),
    readRepo("src/i18n/content/zh-TW.ts"),
  ]);

  assert.doesNotMatch(remotePanel, /secure tunnel/i);
  assert.match(remotePanel, /remoteAccess\.noAuthWarning/);
  assert.match(remoteResources, /no authentication/i);
  assert.match(remoteResources, /Anyone with the URL can access Wenlan/i);
  assert.match(remoteResources, /turn Remote Access off when unused/i);
  assert.doesNotMatch(remotePanel, /rotateRemoteToken|function TokenRow/);
  assert.match(remoteResources, /Settings → Plugins and create a New Plugin/);
  assert.match(remoteResources, /Under Connection choose Server URL/);
  assert.match(remoteResources, /Set Authentication to None/);
  assert.match(remoteResources, /Open Directory → Plugins → \+ Add marketplace/);
  assert.match(remoteResources, /Enter the marketplace repo 7xuanlu\/wenlan/);
  assert.doesNotMatch(remoteResources, /Enable Developer mode/);
  assert.match(remoteRuntime, /https:\/\/claude\.ai,https:\/\/chatgpt\.com/);
  assert.match(remoteRuntime, /"--no-auth"/);
  assert.match(docs, /ChatGPT/);
  assert.match(docs, /Remote Access/);
  assert.match(docs, /Settings > Plugins/);
  assert.match(docs, /Server URL/);
  assert.match(docs, /Authentication to None/);
  assert.doesNotMatch(docs, /Developer mode/);
  assert.match(docs, /--no-auth/);
  assert.match(docs, /possession of the URL grants access/i);
  assert.doesNotMatch(docs, /secure (?:URL|tunnel)/i);
  assert.doesNotMatch(english, /secure Streamable HTTP MCP URL/i);
  assert.doesNotMatch(simplified, /安全的 Streamable HTTP MCP URL/);
  assert.doesNotMatch(traditional, /安全的 Streamable HTTP MCP URL/);
});
