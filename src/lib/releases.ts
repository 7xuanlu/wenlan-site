const WENLAN_RELEASE_DOWNLOAD_BASE =
  "https://github.com/7xuanlu/wenlan/releases/download/v0.15.2";

export const WENLAN_RELEASE = {
  version: "0.15.2",
  tag: "v0.15.2",
  publishedAt: "2026-07-31",
  releaseUrl: "https://github.com/7xuanlu/wenlan/releases/tag/v0.15.2",
  setupGuideUrl:
    "https://github.com/7xuanlu/wenlan/blob/v0.15.2/docs/setup-with-ai.md#install-the-runtime",
  assets: [
    {
      id: "windows-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-windows-x64.zip`,
      format: "ZIP",
      size: "72.0 MB",
    },
    {
      id: "macos-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-darwin-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "49.9 MB",
    },
    {
      id: "linux-x64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-x64.tar.gz`,
      format: "TAR.GZ",
      size: "61.7 MB",
    },
    {
      id: "linux-arm64",
      href: `${WENLAN_RELEASE_DOWNLOAD_BASE}/wenlan-linux-arm64.tar.gz`,
      format: "TAR.GZ",
      size: "55.4 MB",
    },
  ],
} as const;

export type WenlanReleaseAssetId =
  (typeof WENLAN_RELEASE.assets)[number]["id"];
