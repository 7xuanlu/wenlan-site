// Every release asset the website can link to. Dependency-free so client
// analytics can validate ids without loading the release manifest.
// Linux desktop builds are optional: a release without them still resolves,
// and the site then shows only the Linux runtime archives.
export const RELEASE_ASSET_IDS = [
  "windows-desktop-x64",
  "windows-x64",
  "macos-arm64",
  "macos-runtime-arm64",
  "linux-appimage-x64",
  "linux-deb-x64",
  "linux-x64",
  "linux-arm64",
] as const;

export const OPTIONAL_RELEASE_ASSET_IDS = [
  "linux-appimage-x64",
  "linux-deb-x64",
] as const;

export type WenlanReleaseAssetId = (typeof RELEASE_ASSET_IDS)[number];
