import { parseSearchParams, searchSkills } from "@/lib/skills-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_HEADERS = { "X-Robots-Tag": "noindex, nofollow" };

// Fallback skill search for the Wenlan app. See src/lib/skills-search.ts.
export async function GET(request: Request) {
  const params = parseSearchParams(new URL(request.url));
  if ("error" in params) {
    return Response.json(params, { status: 400, headers: { ...BASE_HEADERS, "Cache-Control": "no-store" } });
  }
  // Vercel passes the deployment's OIDC token on each function request when
  // OIDC federation is on; the env var covers local `vercel env pull`.
  const token = request.headers.get("x-vercel-oidc-token") ?? process.env.VERCEL_OIDC_TOKEN;
  const result = await searchSkills(params, token);
  return Response.json(result.body, {
    status: result.status,
    headers: {
      ...BASE_HEADERS,
      "Cache-Control": result.ok ? "public, s-maxage=300, stale-while-revalidate=600" : "no-store",
    },
  });
}
