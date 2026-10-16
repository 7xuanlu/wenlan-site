import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { fetchPublishedRelease } from "../src/lib/release-manifest.ts";
import {
  RELEASE_CACHE_TAG,
  RELEASE_REVALIDATE_PATHS,
  handleReleaseWebhook,
  verifyGitHubSignature,
} from "../src/lib/release-webhook.ts";

const SECRET = "test-secret";

function sign(body, secret = SECRET) {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
}

function webhook(payload, { event = "release", signature } = {}) {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  return new Request("https://wenlan.app/api/release/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-github-event": event,
      "x-hub-signature-256": signature ?? sign(body),
    },
    body,
  });
}

function released(tag = "v0.19.1", overrides = {}) {
  return { action: "released", release: { tag_name: tag, draft: false, prerelease: false, ...overrides } };
}

function deps({ tags = ["v0.19.1"], secret = SECRET } = {}) {
  const calls = { fetches: 0, revalidated: [], sleeps: [] };
  return {
    calls,
    deps: {
      secret,
      fetchLatest: async () => {
        const tag = tags[Math.min(calls.fetches, tags.length - 1)];
        calls.fetches += 1;
        if (tag instanceof Error) throw tag;
        return { tag };
      },
      revalidate: (paths) => calls.revalidated.push(paths),
      sleep: async (ms) => {
        calls.sleeps.push(ms);
      },
    },
  };
}

test("verifyGitHubSignature accepts only the exact HMAC of the raw body", () => {
  const body = JSON.stringify(released());
  assert.equal(verifyGitHubSignature(SECRET, body, sign(body)), true);
  assert.equal(verifyGitHubSignature(SECRET, body, sign(body, "other")), false);
  assert.equal(verifyGitHubSignature(SECRET, `${body} `, sign(body)), false);
  assert.equal(verifyGitHubSignature(SECRET, body, sign(body).replace("sha256=", "sha1=")), false);
  assert.equal(verifyGitHubSignature(SECRET, body, null), false);
});

test("an unconfigured or unsigned webhook changes nothing", async () => {
  const unconfigured = deps({ secret: "" });
  assert.equal((await handleReleaseWebhook(webhook(released()), unconfigured.deps)).status, 503);
  const forged = deps();
  const response = await handleReleaseWebhook(
    webhook(released(), { signature: sign("{}") }),
    forged.deps,
  );
  assert.equal(response.status, 401);
  for (const { calls } of [unconfigured, forged]) {
    assert.equal(calls.fetches, 0);
    assert.deepEqual(calls.revalidated, []);
  }
});

test("ping, other events, drafts, prereleases and unstable tags are acknowledged without revalidating", async () => {
  const cases = [
    [webhook({ zen: "hi" }, { event: "ping" }), 200],
    [webhook({ action: "opened" }, { event: "issues" }), 202],
    [webhook({ ...released(), action: "created" }), 202],
    [webhook(released("v0.20.0", { prerelease: true })), 202],
    [webhook(released("v0.20.0", { draft: true })), 202],
    [webhook(released("v0.20.0-rc.1")), 202],
    [webhook("{", { event: "release" }), 400],
  ];
  for (const [request, status] of cases) {
    const { deps: d, calls } = deps();
    assert.equal((await handleReleaseWebhook(request, d)).status, status);
    assert.deepEqual(calls.revalidated, []);
  }
});

test("a stable release revalidates every live release page once GitHub reports it as latest", async () => {
  const { deps: d, calls } = deps({ tags: ["v0.19.0", new Error("HTTP 403"), "v0.19.1"] });
  const response = await handleReleaseWebhook(webhook(released("v0.19.1")), d);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.tag, "v0.19.1");
  assert.equal(body.latest, "v0.19.1");
  assert.equal(calls.fetches, 3);
  assert.equal(calls.sleeps.length, 2);
  assert.deepEqual(calls.revalidated, [RELEASE_REVALIDATE_PATHS]);
});

test("revalidation still happens when GitHub's latest never catches up", async () => {
  const { deps: d, calls } = deps({ tags: ["v0.19.0"] });
  const response = await handleReleaseWebhook(webhook(released("v0.19.1")), d);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).latest, "v0.19.0");
  assert.equal(calls.fetches, 6);
  assert.equal(calls.revalidated.length, 1);
});

test("revalidated paths cover the four live release pages in every locale", () => {
  assert.deepEqual([...RELEASE_REVALIDATE_PATHS].sort(), [
    "/",
    "/about",
    "/docs/get-started",
    "/download",
    "/zh-CN",
    "/zh-CN/about",
    "/zh-CN/docs/get-started",
    "/zh-CN/download",
    "/zh-TW",
    "/zh-TW/about",
    "/zh-TW/docs/get-started",
    "/zh-TW/download",
  ]);
});

test("the cached release resolution carries the webhook tag and the route expires it immediately", async () => {
  const server = await readFile(new URL("../src/lib/release-server.ts", import.meta.url), "utf8");
  assert.match(server, /tags: \[RELEASE_CACHE_TAG\]/);
  const route = await readFile(new URL("../src/app/api/release/revalidate/route.ts", import.meta.url), "utf8");
  assert.match(route, /export async function POST/);
  assert.match(route, /revalidateTag\(RELEASE_CACHE_TAG, \{ expire: 0 \}\)/);
  assert.match(route, /revalidatePath\(path\)/);
  assert.match(route, /process\.env\.RELEASE_WEBHOOK_SECRET/);
  assert.equal(RELEASE_CACHE_TAG, "wenlan-release");
});

test("fetchPublishedRelease sends a GitHub token only when one is configured", async () => {
  const seen = [];
  const capture = async (_input, init) => {
    seen.push(init.headers);
    return new Response("rate limited", { status: 403, headers: { "x-ratelimit-remaining": "0" } });
  };
  await assert.rejects(fetchPublishedRelease(capture, undefined), /HTTP 403 \(rate limit remaining 0\)/);
  await assert.rejects(fetchPublishedRelease(capture, "token-123"), /HTTP 403/);
  assert.equal(Object.hasOwn(seen[0], "Authorization"), false);
  assert.equal(seen[1].Authorization, "Bearer token-123");
});
