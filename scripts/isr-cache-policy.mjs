// Only these pages render a live GitHub release. Keep editorial pages and
// generated assets static; a shared cache dependency can otherwise silently
// turn the entire site into ISR even without a layout-level revalidate export.
export const RELEASE_PAGE_PATHS = ["", "/zh-TW", "/zh-CN"].flatMap((prefix) =>
  ["", "/about", "/download", "/docs/get-started"].map((path) => `${prefix}${path}` || "/"),
);

export function assertIsrCachePolicy(manifest, indexablePaths = []) {
  const routes = manifest.routes ?? {};
  const releasePages = new Set(RELEASE_PAGE_PATHS);
  const failures = [];
  for (const path of indexablePaths) {
    if (!Object.hasOwn(routes, path)) {
      failures.push(`${path}: indexable page missing from prerender manifest`);
    }
  }
  for (const path of releasePages) {
    if (routes[path]?.initialRevalidateSeconds !== 300) {
      failures.push(`${path}: release page must retry after 300s, including a cold-cache fallback`);
    }
  }
  for (const [path, route] of Object.entries(routes)) {
    if (!releasePages.has(path) && route.initialRevalidateSeconds !== false) {
      failures.push(`${path}: unexpected timed ISR (${route.initialRevalidateSeconds})`);
    }
  }
  if (failures.length) {
    throw new Error(`ISR cache policy failed (${failures.length} routes): ${failures.slice(0, 8).join("; ")}`);
  }
  return { timed: releasePages.size, static: Object.keys(routes).length - releasePages.size };
}
