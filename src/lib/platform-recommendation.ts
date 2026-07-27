import type { WenlanReleaseAssetId } from "./releases";

export function recommendedReleaseAssetId(
  userAgent: string,
): WenlanReleaseAssetId | null {
  if (!userAgent || /Android|iPhone|iPad|iPod/i.test(userAgent)) {
    return null;
  }

  if (/Windows NT/i.test(userAgent)) {
    return "windows-x64";
  }

  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return "macos-arm64";
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
