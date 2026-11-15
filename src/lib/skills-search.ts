// Skill search go-between for the Wenlan app.
//
// The app searches skills.sh's open search address directly. When that
// address fails, it falls back to this route, which calls the documented
// skills.sh API. That API only accepts a Vercel OIDC token, which exists only
// inside a Vercel deployment, so the app cannot call it itself.
// Docs: https://skills.sh/docs/api

export const SKILLS_SH_SEARCH_URL = "https://skills.sh/api/v1/skills/search";
export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 100;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 50;
const UPSTREAM_TIMEOUT_MS = 8000;

export type SkillSearchHit = {
  id: string;
  slug: string;
  name: string;
  source: string;
  installs: number;
};

export type SkillSearchResult =
  | { ok: true; status: 200; body: { query: string; skills: SkillSearchHit[] } }
  | { ok: false; status: 400 | 502 | 503; body: { error: string } };

export type SearchParams = { query: string; limit: number };

export function parseSearchParams(url: URL): SearchParams | { error: string } {
  const query = (url.searchParams.get("q") ?? "").trim();
  if (query.length < MIN_QUERY_LENGTH || query.length > MAX_QUERY_LENGTH) {
    return { error: `q must be ${MIN_QUERY_LENGTH}-${MAX_QUERY_LENGTH} characters` };
  }
  const rawLimit = url.searchParams.get("limit");
  let limit = DEFAULT_LIMIT;
  if (rawLimit !== null) {
    const parsed = Number(rawLimit);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_LIMIT) {
      return { error: `limit must be an integer from 1 to ${MAX_LIMIT}` };
    }
    limit = parsed;
  }
  return { query, limit };
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 && value.length <= 300 ? value : null;
}

// Keep only the fields the app needs, so an upstream shape change cannot
// pass unexpected data through to the app.
export function normalizeHits(payload: unknown): SkillSearchHit[] | null {
  if (!payload || typeof payload !== "object") return null;
  const list = (payload as { skills?: unknown }).skills;
  if (!Array.isArray(list)) return null;
  const hits: SkillSearchHit[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const slug = asString(record.slug);
    const source = asString(record.source);
    if (!slug || !source) continue;
    const id = asString(record.id) ?? `${source}/${slug}`;
    const name = asString(record.name) ?? slug;
    const installs =
      typeof record.installs === "number" && Number.isFinite(record.installs) && record.installs >= 0
        ? Math.floor(record.installs)
        : 0;
    hits.push({ id, slug, name, source, installs });
  }
  return hits;
}

export async function searchSkills(
  params: SearchParams,
  token: string | null | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<SkillSearchResult> {
  if (!token) {
    return { ok: false, status: 503, body: { error: "skill search is not configured" } };
  }
  const upstream = new URL(SKILLS_SH_SEARCH_URL);
  upstream.searchParams.set("q", params.query);
  upstream.searchParams.set("limit", String(params.limit));
  let response: Response;
  try {
    response = await fetchImpl(upstream, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, status: 502, body: { error: "skills.sh did not answer" } };
  }
  if (!response.ok) {
    return { ok: false, status: 502, body: { error: `skills.sh answered ${response.status}` } };
  }
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return { ok: false, status: 502, body: { error: "skills.sh answered with unreadable data" } };
  }
  const skills = normalizeHits(payload);
  if (!skills) {
    return { ok: false, status: 502, body: { error: "skills.sh answered in an unknown shape" } };
  }
  return { ok: true, status: 200, body: { query: params.query, skills } };
}
