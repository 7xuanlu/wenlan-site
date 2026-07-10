import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");

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

function appBackendPin(pinFile) {
  const lines = pinFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  assert.ok(lines[0], ".wenlan-backend-version is missing a daemon tag");
  assert.ok(lines[1], ".wenlan-backend-version is missing a sha256");

  return {
    tag: lines[0],
    sha256: lines[1],
  };
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

  const [packageJsonText, tauriText, cargoToml, backendPinText] = await Promise.all([
    readFile(packagePath, "utf8"),
    readFile(resolve(appRoot, "app/tauri.conf.json"), "utf8"),
    readFile(resolve(appRoot, "app/Cargo.toml"), "utf8"),
    readFile(resolve(appRoot, ".wenlan-backend-version"), "utf8"),
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
    version,
    tag: pin.tag,
    repository: repositoryUrl(packageJson.repository.url),
    updaterEndpoint: tauri.plugins.updater.endpoints[0],
  };
}

test("wenlan-app release metadata exposes its bundled daemon pin", async () => {
  const app = await currentWenlanAppRelease();

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
  const [remotePanel, remoteRuntime, docs, english, simplified, traditional] = await Promise.all([
    readFile(resolve(app.root, "src/components/memory/RemoteAccessPanel.tsx"), "utf8"),
    readFile(resolve(app.root, "app/src/remote_access.rs"), "utf8"),
    readRepo("src/app/docs/docs.ts"),
    readRepo("src/i18n/content/en.ts"),
    readRepo("src/i18n/content/zh-CN.ts"),
    readRepo("src/i18n/content/zh-TW.ts"),
  ]);

  assert.doesNotMatch(remotePanel, /secure tunnel/i);
  assert.match(remotePanel, /no authentication/i);
  assert.match(remotePanel, /Anyone with the URL can access Wenlan/i);
  assert.match(remotePanel, /turn Remote Access off when unused/i);
  assert.doesNotMatch(remotePanel, /rotateRemoteToken|function TokenRow/);
  assert.match(remotePanel, /Enable Developer mode/);
  assert.match(remoteRuntime, /https:\/\/claude\.ai,https:\/\/chatgpt\.com/);
  assert.match(remoteRuntime, /"--no-auth"/);
  assert.match(docs, /ChatGPT/);
  assert.match(docs, /Remote Access/);
  assert.match(docs, /Developer mode/);
  assert.match(docs, /--no-auth/);
  assert.match(docs, /possession of the URL grants access/i);
  assert.doesNotMatch(docs, /secure (?:URL|tunnel)/i);
  assert.doesNotMatch(english, /secure Streamable HTTP MCP URL/i);
  assert.doesNotMatch(simplified, /安全的 Streamable HTTP MCP URL/);
  assert.doesNotMatch(traditional, /安全的 Streamable HTTP MCP URL/);
});
