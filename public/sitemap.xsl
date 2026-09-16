<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Wenlan sitemap</title>
        <style>
          :root {
            --warm: #d4884a;
            --bg: #14110f;
            --card: #1c1917;
            --text: #f5f0e8;
            --muted: #a09488;
            --line: #2e2825;
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg: #faf7f2;
              --card: #ffffff;
              --text: #1c1917;
              --muted: #6b6259;
              --line: #e7ded2;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 40px 16px;
            background: var(--bg);
            color: var(--text);
            font: 15px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          main { max-width: 1100px; margin: 0 auto; }
          h1 { margin: 0 0 6px; font-size: 24px; letter-spacing: -0.01em; }
          p.lede { margin: 0 0 24px; color: var(--muted); font-size: 14px; }
          .count { color: var(--warm); font-variant-numeric: tabular-nums; }
          .wrap {
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 10px;
            overflow-x: auto;
          }
          table { width: 100%; border-collapse: collapse; }
          th, td {
            text-align: left;
            padding: 10px 14px;
            border-bottom: 1px solid var(--line);
            white-space: nowrap;
          }
          th {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--muted);
            font-weight: 600;
          }
          tr:last-child td { border-bottom: 0; }
          td.url { white-space: normal; word-break: break-word; }
          a { color: var(--warm); text-decoration: none; }
          a:hover { text-decoration: underline; }
          td.num { font-variant-numeric: tabular-nums; color: var(--muted); }
          .alt {
            display: inline-block;
            margin-right: 4px;
            padding: 1px 6px;
            border: 1px solid var(--line);
            border-radius: 4px;
            font-size: 11px;
            color: var(--muted);
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Wenlan sitemap</h1>
          <p class="lede">
            <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/></span>
            <xsl:text> URLs. This table is a stylesheet for humans; crawlers read the underlying XML.</xsl:text>
          </p>
          <div class="wrap">
            <table>
              <tr>
                <th>URL</th>
                <th>Languages</th>
                <th>Last modified</th>
                <th>Change freq.</th>
                <th>Priority</th>
              </tr>
              <xsl:for-each select="s:urlset/s:url">
                <xsl:sort select="s:priority" order="descending" data-type="number"/>
                <tr>
                  <td class="url">
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                  </td>
                  <td>
                    <xsl:for-each select="xhtml:link[@rel='alternate']">
                      <span class="alt"><xsl:value-of select="@hreflang"/></span>
                    </xsl:for-each>
                  </td>
                  <td class="num"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></td>
                  <td class="num"><xsl:value-of select="s:changefreq"/></td>
                  <td class="num"><xsl:value-of select="s:priority"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
