// Audited source/documentation snapshot and cold-cache fallback only.
// Live download UI resolves the latest complete stable release in release-server.ts.
// Updating this snapshot is NOT required for publishing future App releases.
const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/wenlan-app/wenlan/releases/download/v0.19.3";

export const WENLAN_RELEASE = {
  version: "0.19.3",
  tag: "v0.19.3",
  publishedAt: "2026-10-21T19:46:04Z",
  releaseUrl: "https://github.com/wenlan-app/wenlan/releases/tag/v0.19.3",
  setupGuideUrl:
    "https://github.com/wenlan-app/wenlan/blob/v0.19.3/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.19.3_x64-setup.exe`,
      format: "EXE",
      size: "57.1 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.19.3/README.md#desktop-app",
    },
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "78.1 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.19.3_aarch64.dmg`,
      format: "DMG",
      size: "79.3 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.19.3/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "54.5 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "67.6 MiB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "67.4 MiB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
