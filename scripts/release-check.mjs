import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { WENLAN_RELEASE } from "../src/lib/releases.ts";

export const RELEASE_API = "https://api.github.com/repos/7xuanlu/wenlan/releases/latest";

// Local contracts inspect the selected source tag. Only the live check proves
// published/stable status: a newer Git tag may still be a prerelease.
export function selectedReleaseTag(release = WENLAN_RELEASE) {
  assert.match(release.version, /^\d+\.\d+\.\d+$/);
  assert.equal(release.tag, `v${release.version}`);
  return release.tag;
}

export function verifyPublishedRelease(published, release = WENLAN_RELEASE) {
  assert.equal(published.draft, false, "GitHub release is a draft");
  assert.equal(published.prerelease, false, "GitHub release is a prerelease");
  assert.equal(published.tag_name, selectedReleaseTag(release), "Website does not match GitHub latest stable release");
  assert.equal(published.published_at, release.publishedAt, "Release publication timestamp differs");
  assert.equal(published.html_url, release.releaseUrl, "Release URL differs");
  for (const asset of release.assets) {
    const upstream = published.assets.find((item) => item.browser_download_url === asset.href);
    assert.ok(upstream, `Missing published download: ${asset.id}`);
    assert.equal(upstream.state, "uploaded", `Download is not uploaded: ${asset.id}`);
    assert.ok(upstream.size > 0, `Empty download: ${asset.id}`);
    assert.equal(`${(upstream.size / 1024 ** 2).toFixed(1)} MiB`, asset.size, `Download size differs: ${asset.id}`);
  }
  for (const name of ["latest.json", "SHA256SUMS", "Wenlan_aarch64.app.tar.gz", "Wenlan_aarch64.app.tar.gz.sig", `Wenlan_${release.version}_x64-setup.exe.sig`]) {
    assert.ok(published.assets.some((asset) => asset.name === name && asset.state === "uploaded" && asset.size > 0), `Missing release support asset: ${name}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const response = await fetch(RELEASE_API, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "wenlan-site-release-check" },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`GitHub release evidence unavailable: HTTP ${response.status}`);
    const published = await response.json();
    verifyPublishedRelease(published);
    console.log(`[release-check] PASS ${published.tag_name}: stable release, ${WENLAN_RELEASE.assets.length} website downloads and updater/checksum assets verified at ${new Date().toISOString()}`);
  } catch (error) {
    console.error(`[release-check] FAIL ${error.message}`);
    process.exitCode = 1;
  }
}
