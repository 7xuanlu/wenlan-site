// Filter values are restricted to hostnames before constructing Vercel queries.
export function sourceReferrers(rows) {
  return [...new Set(rows.map(row => row.label).filter(host =>
    typeof host === "string" && host.length <= 253 &&
    /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9-]+$/i.test(host)
  ))].slice(0, 100);
}
