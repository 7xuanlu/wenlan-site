import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

async function currentWenlanVersion() {
  const wenlanRoot = process.env.WENLAN_REPO_ROOT
    ? resolve(process.env.WENLAN_REPO_ROOT)
    : resolve(repoRoot, "../wenlan");
  return (await readFile(resolve(wenlanRoot, "version.txt"), "utf8")).trim();
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
  const [packageJsonText, tauriText, cargoToml, backendPinText] = await Promise.all([
    readFile(resolve(appRoot, "package.json"), "utf8"),
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
    version,
    tag: pin.tag,
    repository: repositoryUrl(packageJson.repository.url),
    updaterEndpoint: tauri.plugins.updater.endpoints[0],
  };
}

test("wenlan-app release metadata pins the authoritative Wenlan daemon release", async () => {
  const [wenlanVersion, app] = await Promise.all([
    currentWenlanVersion(),
    currentWenlanAppRelease(),
  ]);

  assert.equal(app.version, wenlanVersion);
  assert.equal(app.tag, `v${wenlanVersion}`);
  assert.equal(app.repository, "https://github.com/7xuanlu/wenlan-app");
  assert.equal(
    app.updaterEndpoint,
    "https://github.com/7xuanlu/wenlan-app/releases/latest/download/latest.json",
  );
});

test("public desktop-app surfaces track wenlan-app source facts", async () => {
  const app = await currentWenlanAppRelease();
  const escapedVersion = escapeRegExp(app.version);
  const docs = await readRepo("src/app/docs/docs.ts");
  const structuredData = await readRepo("src/app/structured-data.ts");
  const llms = await readRepo("public/llms.txt");
  const llmsFull = await readRepo("src/app/llms-full.txt/route.ts");

  assert.match(docs, /href: "https:\/\/github\.com\/7xuanlu\/wenlan-app"/);
  assert.match(docs, /Tauri 2 \+ React 19/);
  assert.match(docs, /localhost:7878/);
  assert.match(docs, new RegExp(`desktop app release ${escapedVersion}`));
  assert.match(docs, new RegExp(`daemon v${escapedVersion}`));
  assert.doesNotMatch(docs, /origin-app/);

  assert.match(structuredData, /github\.com\/7xuanlu\/wenlan-app/);
  assert.match(structuredData, /Tauri 2 \+ React 19/);
  assert.match(structuredData, /localhost:7878/);

  assert.match(llms, /Wenlan desktop app repository/);
  assert.match(llms, /github\.com\/7xuanlu\/wenlan-app/);
  assert.match(llmsFull, /github\.com\/7xuanlu\/wenlan-app/);
});
