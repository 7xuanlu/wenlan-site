// Audited source/documentation snapshot and cold-cache fallback only.
// Live download UI resolves the latest complete stable release in release-server.ts.
// Updating this snapshot is NOT required for publishing future App releases.
const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/wenlan-app/wenlan/releases/download/v0.20.2";

export const WENLAN_RELEASE = {
  version: "0.20.2",
  tag: "v0.20.2",
  publishedAt: "2026-10-27T03:08:26Z",
  releaseUrl: "https://github.com/wenlan-app/wenlan/releases/tag/v0.20.2",
  setupGuideUrl:
    "https://github.com/wenlan-app/wenlan/blob/v0.20.2/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.20.2_x64-setup.exe`,
      format: "EXE",
      size: "60.5 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.20.2/README.md#desktop-app",
    },
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "81.1 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.20.2_aarch64.dmg`,
      format: "DMG",
      size: "83.4 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.20.2/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "57.3 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "70.7 MiB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "70.4 MiB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
