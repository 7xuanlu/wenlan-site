# OpenSEO evaluation — 2026-08-01

## Decision

Use OpenSEO as an optional demand-discovery and live-SERP lane. Do not replace
authenticated GSC, Google Trends, Vercel, Umami, GitHub, or Resend with it.

The test found useful English and Taiwan seed-query evidence, but its related
keyword expansion became noisy for broad AI terms and it returned no usable
Simplified Chinese result for the tested Singapore proxy. OpenSEO therefore
improves candidate nomination and competitor/SERP inspection; it is not a
single source of truth and does not solve the Simplified Chinese evidence gap.

## Test contract

- Product: OpenSEO hosted web app, whose result surface identifies keyword,
  volume, CPC, competition, score, intent, related queries, a 12-month trend
  chart, and live SERP results.
- Underlying provider: DataForSEO, as documented by the
  [OpenSEO repository](https://github.com/every-app/open-seo) and
  [keyword-research feature page](https://openseo.so/features/keyword-research).
- Captured at: `2026-08-01T18:57:22Z`.
- Project domain: `wenlan.app`.
- Clickstream-refined volumes: off. The UI warns that Google groups similar
  keywords and that the refined option costs twice the credits.
- GSC: not connected. OpenSEO did not receive Search Console property access.
- Payment: none. The bounded test used trial credits only.
- Raw interpreted observations:
  `/tmp/wenlan-seo-demand/2026-08-01/openseo/observations.json`.

OpenSEO displayed volumes remain their own third-party native unit. They are
not authenticated Wenlan GSC impressions, clicks, Google Trends indices, or
forecast traffic.

## Results

| Query | Geography | OpenSEO displayed volume | Useful finding |
| --- | --- | ---: | --- |
| `llm wiki` | United States | 5,400 | Strongest seed; `karpathy llm wiki` 2,900, `llm wiki karpathy` 880, `llm wiki github` 320, `llm wiki obsidian` 90. Wenlan was absent from the observed top 10. |
| `AI knowledge base` | United States | 880 | Valid cluster, with smaller builder, examples, open-source, tools, GitHub, and free modifiers. Broad expansion was partly polluted by Google AI and Glean terms. |
| `obsidian claude code` | United States | 210 | Clean workflow cluster: inverse wording 170, plugin 110, skill 90, MCP variants 50 each, CLI 40, how-to 30. |
| `chatgpt knowledge base` | United States | 50 | Real but smaller cluster; company connectors 20 and custom/internal/private/how-to modifiers 10 each. |
| `codex knowledge base` | United States | unavailable | Intent collision: OpenSEO normalized the seed toward Elite Dangerous. `codex compact context` 30 and `codex instructions md` 20 are useful candidate phrases, but the direct seed is not usable evidence. |
| `AI 知識庫` | Taiwan | 210 | Exact seed is useful. The observed third result joins AI 知識庫, Obsidian, and Karpathy in one intent. Wenlan was absent from the observed top 10. The 150-row expansion was mostly generic AI noise. |
| `AI 知识库` | Singapore | unavailable | OpenSEO reported insufficient data. This is not evidence about mainland-China demand. |

The United States `llm wiki` SERP was led by Karpathy's gist, the
`nashsu/llm_wiki` repository, implementation articles, Reddit, and adjacent
knowledge-base sites. The Taiwan `AI 知識庫` SERP was led by explanatory and
implementation guides; result three explicitly framed an AI knowledge base as
the Karpathy pattern without requiring Obsidian. That overlap supports one
acquisition family rather than three unrelated priorities.

## Priority implication

1. Keep LLM Wiki, Karpathy, and AI knowledge base as one top acquisition
   family. The current Wenlan source-backed implementation guides and localized
   knowledge-base pages are the correct canonical assets to strengthen.
2. Keep Obsidian + Claude Code/MCP as a workflow subcluster. Its modifier set is
   much cleaner than generic `Obsidian` and maps to the existing comparison
   route rather than requiring a new generic article.
3. Keep ChatGPT knowledge-base wording as a smaller monitored lane. Do not
   promote it above the two stronger families without GSC or other independent
   evidence.
4. Do not target bare `codex knowledge base`. Use task-qualified Codex/context,
   instructions, MCP, or workflow language only after independent evidence
   passes the candidate gate.
5. Continue Simplified Chinese discovery through authenticated GSC, inspectable
   Trends where available, and Chinese-community observations with provenance.
   OpenSEO did not close that gap.

## Tool verdict

OpenSEO is more actionable than Trends for exact English query volumes,
modifier discovery, and current SERP composition. Trends remains better for
relative direction and geography comparisons, while GSC remains the only
authority for Wenlan's actual impressions, clicks, pages, and query visibility
gap. For Mandarin, OpenSEO requires strict filtering and cannot be used alone.

No new article or website experiment is launched by this evaluation. The
current download/signup measurement correction retains the single website
change slot until it is production-verified.
