const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/7xuanlu/wenlan/releases/download/v0.15.8";

export const WENLAN_RELEASE = {
  version: "0.15.8",
  tag: "v0.15.8",
  publishedAt: "2026-08-09",
  releaseUrl: "https://github.com/7xuanlu/wenlan/releases/tag/v0.15.8",
  setupGuideUrl:
    "https://github.com/7xuanlu/wenlan/blob/v0.15.8/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "73.3 MiB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/Wenlan_0.15.8_aarch64.dmg`,
      format: "DMG",
      size: "82.3 MiB",
      guideHref:
        "https://github.com/7xuanlu/wenlan/blob/v0.15.8/README.md#desktop-app",
    },
    {
      id: "macos-runtime-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "49.8 MiB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "63.9 MiB",
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
