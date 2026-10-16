import { createHmac, timingSafeEqual } from "node:crypto";

import { TRANSLATED_LOCALES } from "../i18n/locales";
import type { WenlanRelease } from "./release-manifest";

// GitHub calls this when a wenlan-app/wenlan release is published, so the live
// download surfaces stop waiting for the hourly release cache to expire.
export const RELEASE_CACHE_TAG = "wenlan-release";

const RELEASE_PAGE_PATHS = ["/", "/download", "/docs/get-started", "/about"] as const;

export const RELEASE_REVALIDATE_PATHS: readonly string[] = [
  ...RELEASE_PAGE_PATHS,
  ...TRANSLATED_LOCALES.flatMap((locale) =>
    RELEASE_PAGE_PATHS.map((path) => (path === "/" ? `/${locale}` : `/${locale}${path}`)),
  ),
];

const RELEASE_ACTIONS = new Set(["published", "released", "edited"]);
const STABLE_TAG_PATTERN = /^v\d+\.\d+\.\d+$/;
// GitHub's releases/latest can trail the webhook briefly; an expired cache
// refilled with the old release would then hold it for another hour.
const LATEST_POLL_ATTEMPTS = 6;
const LATEST_POLL_DELAY_MS = 2000;

export function verifyGitHubSignature(
  secret: string,
  body: string,
  signature: string | null,
): boolean {
  if (!signature?.startsWith("sha256=")) return false;
  const expected = Buffer.from(
    `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`,
  );
  const received = Buffer.from(signature);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export interface ReleaseWebhookDeps {
  secret: string | undefined;
  fetchLatest: () => Promise<WenlanRelease>;
  revalidate: (paths: readonly string[]) => void;
  sleep?: (ms: number) => Promise<void>;
}

function json(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}

export async function handleReleaseWebhook(
  request: Request,
  deps: ReleaseWebhookDeps,
): Promise<Response> {
  if (!deps.secret) return json(503, { error: "release webhook is not configured" });

  const body = await request.text();
  if (!verifyGitHubSignature(deps.secret, body, request.headers.get("x-hub-signature-256"))) {
    return json(401, { error: "invalid signature" });
  }

  const event = request.headers.get("x-github-event");
  if (event === "ping") return json(200, { ok: true, event });
  if (event !== "release") return json(202, { ignored: `event ${event ?? "missing"}` });

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return json(400, { error: "body is not JSON" });
  }
  const action = (payload as { action?: unknown })?.action;
  const release = (payload as { release?: { tag_name?: unknown; draft?: unknown; prerelease?: unknown } })
    ?.release;
  const tag = release?.tag_name;
  if (
    typeof action !== "string" ||
    !RELEASE_ACTIONS.has(action) ||
    typeof tag !== "string" ||
    !STABLE_TAG_PATTERN.test(tag) ||
    release?.draft !== false ||
    release?.prerelease !== false
  ) {
    return json(202, { ignored: "not a published stable release" });
  }

  const sleep = deps.sleep ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));
  let latestTag: string | null = null;
  for (let attempt = 0; attempt < LATEST_POLL_ATTEMPTS; attempt += 1) {
    if (attempt > 0) await sleep(LATEST_POLL_DELAY_MS);
    try {
      latestTag = (await deps.fetchLatest()).tag;
    } catch {
      latestTag = null;
    }
    if (latestTag === tag) break;
  }

  deps.revalidate(RELEASE_REVALIDATE_PATHS);
  return json(200, { ok: true, tag, latest: latestTag, revalidated: RELEASE_REVALIDATE_PATHS });
}
