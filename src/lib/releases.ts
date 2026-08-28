const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/7xuanlu/wenlan/releases/download/v0.17.3";

export const WENLAN_RELEASE = {
  version: "0.17.3",
  tag: "v0.17.3",
  publishedAt: "2026-08-27",
  releaseUrl: "https://github.com/7xuanlu/wenlan/releases/tag/v0.17.3",
  setupGuideUrl:
    "https://github.com/7xuanlu/wenlan/blob/v0.17.3/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-desktop-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.17.3_x64-setup.exe`,
      format: "EXE",
      size: "59.3 MiB",
      guideHref:
        "https://github.com/7xuanlu/wenlan/blob/v0.17.3/README.md#desktop-app",
    },
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "73.6 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.17.3_aarch64.dmg`,
      format: "DMG",
      size: "83.5 MiB",
      guideHref:
        "https://github.com/7xuanlu/wenlan/blob/v0.17.3/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "49.9 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "62.5 MiB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "62.7 MiB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
