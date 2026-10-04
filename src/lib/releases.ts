// Audited source/documentation snapshot and cold-cache fallback only.
// Live download UI resolves the latest complete stable release in release-server.ts.
// Updating this snapshot is NOT required for publishing future App releases.
const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/7xuanlu/wenlan/releases/download/v0.18.16";

export const WENLAN_RELEASE = {
  version: "0.18.16",
  tag: "v0.18.16",
  publishedAt: "2026-10-04T01:49:31Z",
  releaseUrl: "https://github.com/7xuanlu/wenlan/releases/tag/v0.18.16",
  setupGuideUrl:
    "https://github.com/7xuanlu/wenlan/blob/v0.18.16/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.18.16_x64-setup.exe`,
      format: "EXE",
      size: "48.6 MiB",
      guideHref:
        "https://github.com/7xuanlu/wenlan/blob/v0.18.16/README.md#desktop-app",
    },
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "75.1 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.18.16_aarch64.dmg`,
      format: "DMG",
      size: "68.6 MiB",
      guideHref:
        "https://github.com/7xuanlu/wenlan/blob/v0.18.16/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "51.6 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "64.4 MiB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "64.3 MiB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
