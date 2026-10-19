// Audited source/documentation snapshot and cold-cache fallback only.
// Live download UI resolves the latest complete stable release in release-server.ts.
// Updating this snapshot is NOT required for publishing future App releases.
const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/wenlan-app/wenlan/releases/download/v0.19.2";

export const WENLAN_RELEASE = {
  version: "0.19.2",
  tag: "v0.19.2",
  publishedAt: "2026-10-19T05:50:26Z",
  releaseUrl: "https://github.com/wenlan-app/wenlan/releases/tag/v0.19.2",
  setupGuideUrl:
    "https://github.com/wenlan-app/wenlan/blob/v0.19.2/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.19.2_x64-setup.exe`,
      format: "EXE",
      size: "56.2 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.19.2/README.md#desktop-app",
    },
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "76.8 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.19.2_aarch64.dmg`,
      format: "DMG",
      size: "77.7 MiB",
      guideHref:
        "https://github.com/wenlan-app/wenlan/blob/v0.19.2/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "53.2 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "66.2 MiB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "66.1 MiB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
