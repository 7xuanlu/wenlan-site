import sitemapEntries from "../sitemap-entries";

// Next's built-in sitemap.ts cannot emit an <?xml-stylesheet?> instruction, so
// the XML is rendered here instead. The stylesheet is presentation only —
// crawlers ignore it and parse the XML — but it makes /sitemap.xml readable
// when a human opens it in a browser.
export const dynamic = "force-static";

const STYLESHEET_HREF = "/sitemap.xsl";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderUrl(entry: ReturnType<typeof sitemapEntries>[number]): string {
  const lines = [`<loc>${escapeXml(entry.url)}</loc>`];

  for (const [hreflang, href] of Object.entries(
    entry.alternates?.languages ?? {},
  )) {
    lines.push(
      `<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(String(href))}" />`,
    );
  }

  if (entry.lastModified) {
    lines.push(
      `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`,
    );
  }
  if (entry.changeFrequency) {
    lines.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
  }
  if (entry.priority !== undefined) {
    lines.push(`<priority>${entry.priority}</priority>`);
  }

  return `<url>\n${lines.join("\n")}\n</url>`;
}

export function GET() {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<?xml-stylesheet type="text/xsl" href="${STYLESHEET_HREF}"?>`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...sitemapEntries().map(renderUrl),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
