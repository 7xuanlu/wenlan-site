// Only these pages render a live GitHub release. Keep editorial pages and
// generated assets static; a shared cache dependency can otherwise silently
// turn the entire site into ISR even without a layout-level revalidate export.
export const RELEASE_PAGE_PATHS = ["", "/zh-TW", "/zh-CN"].flatMap((prefix) =>
  ["", "/about", "/download", "/docs/get-started"].map((path) => `${prefix}${path}` || "/"),
);

export const FINITE_DYNAMIC_ROUTE_PATHS = [
  "/[locale]",
  "/docs/[slug]",
  "/learn/[slug]",
  "/[locale]/learn/[slug]",
];

export const FINITE_DYNAMIC_OG_ROUTE_PATHS = [
  "/learn/[slug]/opengraph-image",
  "/docs/[slug]/opengraph-image",
  "/[locale]/learn/[slug]/opengraph-image",
  "/[locale]/docs/[slug]/opengraph-image",
];

function dynamicRoutePathMatches(actualPath, expectedPath) {
  return actualPath === expectedPath || actualPath.startsWith(`${expectedPath}-`);
}

export function assertIsrCachePolicy(manifest, indexablePaths = []) {
  const routes = manifest.routes ?? {};
  const dynamicRoutes = manifest.dynamicRoutes ?? {};
  const releasePages = new Set(RELEASE_PAGE_PATHS);
  const failures = [];
  for (const path of indexablePaths) {
    if (!Object.hasOwn(routes, path)) {
      failures.push(`${path}: indexable page missing from prerender manifest`);
    }
  }
  for (const path of releasePages) {
    if (routes[path]?.initialRevalidateSeconds !== 3600) {
      failures.push(`${path}: release page must retry after 3600s, including a cold-cache fallback`);
    }
  }
  for (const path of FINITE_DYNAMIC_ROUTE_PATHS) {
    if (!Object.hasOwn(dynamicRoutes, path)) {
      failures.push(`${path}: finite dynamic route missing from prerender manifest`);
    } else if (dynamicRoutes[path]?.fallback !== false) {
      failures.push(`${path}: dynamic routes must disable runtime fallback (fallback: false)`);
    }
  }
  for (const path of FINITE_DYNAMIC_OG_ROUTE_PATHS) {
    const manifestPath = Object.keys(dynamicRoutes).find((actualPath) =>
      dynamicRoutePathMatches(actualPath, path),
    );
    if (!manifestPath) {
      failures.push(`${path}: finite dynamic OG route missing from prerender manifest`);
    } else if (dynamicRoutes[manifestPath]?.fallback !== false) {
      failures.push(`${manifestPath}: OG route must disable runtime fallback (fallback: false)`);
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
