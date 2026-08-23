import type { WenlanReleaseAssetId } from "./releases";

export function recommendedReleaseAssetId(
  userAgent: string,
): WenlanReleaseAssetId | null {
  if (!userAgent || /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent)) {
    return null;
  }

  if (/Windows NT/i.test(userAgent)) {
    return /Win64|x64|WOW64|amd64/i.test(userAgent)
      ? "windows-desktop-x64"
      : null;
  }

  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return /arm64|aarch64/i.test(userAgent) ? "macos-arm64" : null;
  }

  if (/Linux/i.test(userAgent)) {
    if (/aarch64|arm64/i.test(userAgent)) {
      return "linux-arm64";
    }
    if (/x86_64|x64|amd64/i.test(userAgent)) {
      return "linux-x64";
    }
  }

  return null;
}
