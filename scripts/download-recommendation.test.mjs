import assert from "node:assert/strict";
import test from "node:test";

import { recommendedReleaseAssetId } from "../src/lib/platform-recommendation.ts";

test("desktop user agents map to one explicit published release asset", () => {
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    ),
    "windows-x64",
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Macintosh; arm64 Mac OS X 14_6) AppleWebKit/605.1.15",
    ),
    "macos-arm64",
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    ),
    "linux-x64",
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36",
    ),
    "linux-arm64",
  );
});

test("mobile, architecture-ambiguous, and unknown user agents fall back to the complete download hub", () => {
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36",
    ),
    null,
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
    ),
    null,
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    ),
    null,
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
    ),
    null,
  );
  assert.equal(
    recommendedReleaseAssetId(
      "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36",
    ),
    null,
  );
  assert.equal(recommendedReleaseAssetId("curl/8.0"), null);
  assert.equal(recommendedReleaseAssetId(""), null);
});
