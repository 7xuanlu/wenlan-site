# Business metric definition knowledge base demand gate — 2026-08-31

## Decision

Promote `business-metric-definition-knowledge-base` as the strongest next
candidate after the published Course Wiki family. Its demand, semantic-owner,
result-shape, first-party-proof, standalone-utility, and bounded-distribution
checks pass for one narrow task. The clean Wenlan-shaped task is narrower than
the dominant data-catalog SERP: turn approved Markdown, text, and
text-extractable PDF metric specifications into reviewable metric-definition
wiki records with citations, source revisions, supersession, and human review.

This record supports local preparation only. It does not authorize commit,
push, PR, merge, deployment, indexing requests, analytics changes, source
README changes, external submissions, or maintainer contact.

## Research coverage

- Capture date: `2026-08-31`.
- Exa coverage: `130` requested result slots across English, zh-TW, and zh-CN
  searches; `14` promising pages fetched for full-text inspection. These are
  search-result slots, not unique sources, search volume, or Wenlan demand.
- Candidate comparison: security-questionnaire answer library, business metric
  glossary / data dictionary, and maintenance troubleshooting knowledge base.
- Raw Google Trends capture:
  `/tmp/wenlan-seo-demand/2026-08-31/trends/google-trends-comparisons.json`.
  It contains the complete 53-week series, query order, geography, period, and
  capture timestamp.

## Google Trends observations

All values are request-relative `0-100` indices from Google Trends, Web Search,
past 12 months. They are not search volume; separate requests are not combined.

| Locale / geography | Query set in column order | Average indices |
| --- | --- | --- |
| English / United States | `business glossary`; `data dictionary`; `metric definition`; `security questionnaire`; `maintenance knowledge base` | `3; 28; 10; 6; 0` |
| zh-TW / Taiwan | `指標定義`; `資料字典`; `指標口徑`; `資安問卷`; `維修知識庫` | `12; 0; 0; 0; 0` |
| Simplified-Chinese phrases / Worldwide | `指标定义`; `数据字典`; `指标口径`; `安全问卷`; `维修知识库` | `31; 8; 2; 2; 0` |

The worldwide Simplified-Chinese comparison is not a mainland-China demand
measurement. The strongest natural discovery handles are therefore `data
dictionary` in English and `指標定義` / `指标定义` in Mandarin, while the page
task must remain an inspectable definition wiki rather than a live data catalog.

## Candidate comparison after hard gates

| Candidate | Evidence | Product and overlap result | Decision |
| --- | --- | --- | --- |
| Business metric definitions / data dictionary | Independent standards, OSS docs, practitioner guidance, and all three Trends comparisons repeat definitions, terms, stewardship, and maintenance | No current owner owns the same KPI-conflict to reviewed-definition-wiki task. Wenlan can prove source-backed text records, citations, revisions, lint, and review, but not warehouse or BI integration | **Passed as a bounded files-first candidate** |
| Security-questionnaire answer library | The task is real in English and appears in Mandarin vendor material | It overlaps the published support-answer pack and supplier due-diligence evidence pack; much of the SERP expects automation, compliance, permissions, and response delivery | Do not create a new owner now |
| Maintenance troubleshooting knowledge base | Manuals and troubleshooting demand are independently visible | The dominant result shape expects OCR, diagrams, CAD, equipment diagnosis, and physical-safety judgment that Wenlan does not prove | Reject for current product scope |

## Retained sources

### English

- DataHub business glossary documentation:
  <https://github.com/datahub-project/datahub/blob/master/docs/glossary/business-glossary.md>
- OpenDataDiscovery business glossary documentation:
  <https://docs.opendatadiscovery.org/features/data-glossary/business-glossary>
- Atlan glossary maintenance guide:
  <https://atlan.com/know/how-to-keep-a-business-glossary-up-to-date/>

### zh-TW / Taiwan

- Ministry of Digital Affairs AI-Ready Data metadata framework:
  <https://www-api.moda.gov.tw/File/Get/moda/zh-tw/ae1g6Uvj4fUa4a3>
- Taiwan dataset metadata standard guide:
  <https://file.data.gov.tw/content/%E8%B3%87%E6%96%99%E9%9B%86%E8%A9%AE%E9%87%8B%E8%B3%87%E6%96%99%E6%A8%99%E6%BA%96%E6%8C%87%E5%BC%95.pdf>
- iThome practitioner article on business glossary work:
  <https://ithelp.ithome.com.tw/articles/10399352>

### Simplified Chinese

- National Data Standards System guide:
  <https://www.nda.gov.cn/sjj/zwgk/zcfb/1009/ff808081-9227485f-0192-6f0e5943-0764.pdf>
- EasyData metric dictionary documentation:
  <https://study.sf.163.com/documents/read/easydatav9.0-update03/easyindex_index.md>
- China Banking Association data dictionary guide:
  <https://www.china-cba.net/Index/show/catid/251/id/45936.html>

## Wenlan v0.17.6 product proof and limits

- `crates/wenlan-core/src/sources/directory.rs` supports `.md`, `.txt`, and
  text-extractable `.pdf` sources, with explicit size limits and image-only PDF
  skipping. It does not prove CSV, YAML, SQL, warehouse, or BI ingestion.
- `crates/wenlan-core/src/citations.rs` records claim-level citations,
  verification state, external-file source kind, and source revisions.
- `crates/wenlan-core/src/lint/pages/provenance_checks.rs` checks evidence
  coverage and citation partitions.
- `app/src/page_review.rs` binds review to exact content bytes and version.

The safe first-party workflow is therefore approved metric-definition files to
reviewable wiki records. It is not a data catalog, metric computation engine,
lineage system, data-quality monitor, approval service, or access-control layer.

## Scenario contract

- Audience: data, analytics, product, finance, and operations teams whose AI
  agents repeatedly encounter conflicting KPI definitions.
- Trigger: the same metric name has different formulas, grains, exclusions, or
  owners across documents and dashboards.
- User task: consolidate approved metric specifications into a source-backed
  metric-definition wiki that agents and humans can inspect.
- Record shape: metric name; business definition; formula as non-executable
  text; grain; dimensions; exclusions; owner; source IDs and revisions; review
  state; supersedes relation.
- Desired outcome: retrieval returns the current definition with citations and
  exposes version and review state instead of silently mixing definitions.
- English query family: `data dictionary`; `metric definition`; `business
  glossary`; `metrics glossary`.
- zh-TW query family: `指標定義`; `資料字典`; `指標口徑`; `商業詞彙表`.
- zh-CN query family: `指标定义`; `数据字典`; `指标口径`; `业务术语表`.

### Search intent by user group

| User group | Immediate problem | Page answer boundary |
| --- | --- | --- |
| Data and analytics | Two dashboards or documents use the same metric name with different formulas, grains, or exclusions | Show how to turn approved definition files into one cited, versioned record; do not claim warehouse discovery or metric computation |
| Product and finance | A KPI review cannot establish which definition and owner are current | Show owner, source revision, review state, and supersession; do not claim an approval workflow or governance service |
| Operations and AI-agent users | Agents repeatedly retrieve and combine stale or conflicting definitions | Show retrieval from a reviewed source-backed wiki and expose conflicts; do not claim automatic reconciliation |

The common search task is definition lookup and conflict resolution. These are
not three separate landing pages: they share one owner because the expected
answer and resulting record are the same. Locale copy may lead with different
natural queries, but it must keep this one-task boundary.

## Exact future first-party authority path

After the three locale pages are live and production-verified, propose one
same-locale guide link in the existing `Learn more` / `Workflow guides` list in
each maintained Wenlan source README:

| Source file | Future guide URL | Natural link label |
| --- | --- | --- |
| `README.md` | `https://wenlan.app/learn/build-business-metric-definition-knowledge-base` | `Build a source-backed business metric dictionary` |
| `README.zh-Hant.md` | `https://wenlan.app/zh-TW/learn/build-business-metric-definition-knowledge-base` | `建立有來源支撐的商業指標定義知識庫` |
| `README.zh-Hans.md` | `https://wenlan.app/zh-CN/learn/build-business-metric-definition-knowledge-base` | `建立有来源支撑的业务指标定义知识库` |

This is a maintained first-party discovery link, not an assumed backlink. It
must not be added before the target pages return production `200` responses.
Any Wenlan source-repository commit, push, PR, merge, or release remains a
separate approval-gated action and must keep the three README translations in
sync. No source-repository change is authorized by this research record.

## Final semantic gate

The exact-phrase and semantic-owner pass found only a financial-research page
that mentions comparing changed metric definitions; no current owner answers
the same KPI-conflict to reviewed-definition-wiki task. English results also
contained an independent KPI-spec workflow whose useful artifact is a document
with definition, formula, grain, inclusions, exclusions, sources, owner, review
status, and change log. Taiwan and Simplified-Chinese results repeat definition,
ownership, version, and review work, although commercial BI and governance
platforms dominate much of the result set.

The family therefore passes only with the files-first boundary above.
Predeclared internal paths are the same-locale source-backed wiki, citation
verification, and multi-agent conflict owners. The bounded distribution path
is the separately approval-gated same-locale `Workflow guides` README link.
No external acceptance, backlink, or traffic is assumed.
