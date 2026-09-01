# Wenlan next-scenario demand comparison — 2026-08-31

## Decision

Select `course-slides-source-backed-llm-wiki` as the next trilingual scenario
family to prepare. The page task is narrow: turn one course's readable lecture
slides, notes, and PDFs into a maintained, source-backed course wiki with
concept links, prerequisite links, citations, source revisions, and human
review.

Do not position Wenlan as a general AI tutor or a NotebookLM replacement. The
family explicitly excludes flashcards, quizzes, audio, transcription, OCR,
grading, homework solving, exam planning, and automatic academic judgment.

This record authorizes research and local control-plane updates only. It does
not authorize page implementation, commit, push, PR, merge, deployment,
request indexing, GSC validation, analytics mutation, directory submission,
maintainer contact, paid action, or any other external publication.

## Method and provenance

- Capture date: `2026-08-31`.
- Research window wording: current sources and the exact Google Trends period
  `2025-08-31..2026-08-31` (`Past 12 months`).
- Exa search workstreams: RFP / tender answer library, employee onboarding /
  training knowledge base, and student lecture / PDF study knowledge base,
  each across English, zh-TW, and zh-CN, plus focused OSS, community, and
  authority-path searches.
- `sources_reviewed`: `160`, calculated as the sum of requested `numResults`
  across 19 Exa searches. Three Reddit-domain searches returned no results;
  later natural-language community searches supplied inspectable discussion
  evidence. Twelve promising pages were fetched for full-text validation.
- Google Trends values below remain request-relative `0-100` indices. They are
  not monthly search volume and values from different comparison requests are
  not converted or combined.
- OpenSEO was inspected in the signed-in `Qi-Xuan Lu` account. Its keyword
  research is unavailable because the current account has no credits. The GSC
  surface shows an existing `llm wiki` row for Wenlan, but its selected date
  range was not unambiguously exposed in the page text, so that row is used
  only as topical-adjacency evidence and not as the demand ranking input.

## Cross-scenario Google Trends observations

### United States

Query set: `RFP response; proposal writing; employee onboarding; new hire
training; AI study guide`.

- Native average indices: `4; 11; 33; 7; 27`.
- Interpretation: onboarding and study demand are broader than RFP-response
  demand in this request. The terms are not equally specific and do not prove
  Wenlan-fit demand.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=RFP%20response,proposal%20writing,employee%20onboarding,new%20hire%20training,AI%20study%20guide>

### Taiwan

Query set: `標案; 投標文件; 新人訓練; 員工培訓; AI 筆記`.

- Native average indices: `54; 2; 0; 0; 5`.
- Interpretation: the broad procurement term is much larger than the narrow
  knowledge-work terms in this request. It does not show that users want an
  RFP answer library rather than tender notices, forms, or procurement rules.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=TW&q=%E6%A8%99%E6%A1%88,%E6%8A%95%E6%A8%99%E6%96%87%E4%BB%B6,%E6%96%B0%E4%BA%BA%E8%A8%93%E7%B7%B4,%E5%93%A1%E5%B7%A5%E5%9F%B9%E8%A8%93,AI%20%E7%AD%86%E8%A8%98>

### Simplified-Chinese / China Trends surface

Query set: `招标; 投标文件; 新员工培训; 员工培训; AI 笔记`.

- Native average indices: `38; 1; 0; 2; 1`.
- Interpretation: `招标` is broad and ambiguous. Google usage and Trends
  coverage are limited in mainland China, so this is one source-native signal,
  not population demand.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=CN&q=%E6%8B%9B%E6%A0%87,%E6%8A%95%E6%A0%87%E6%96%87%E4%BB%B6,%E6%96%B0%E5%91%98%E5%B7%A5%E5%9F%B9%E8%AE%AD,%E5%91%98%E5%B7%A5%E5%9F%B9%E8%AE%AD,AI%20%E7%AC%94%E8%AE%B0>

## Candidate comparison after hard gates

| Candidate | Demand evidence | Clean task and Wenlan proof | Main mismatch | Decision |
| --- | --- | --- | --- | --- |
| Course slides / source-backed LLM Wiki | US study terms and NotebookLM are visible; Taiwan and China queries are strongly branded around NotebookLM; a bilingual student LLM Wiki has `172` stars; Georgia Tech TokenSmith has `7` stars and `26` forks; separate student and Chinese OSS workflows repeat the task | Clean gap between the existing paper-literature-matrix owner, generic document ingestion, and the general LLM Wiki guide. Wenlan proves readable PDF/folder/Obsidian sources, incremental sync, source-backed Pages, citations, wikilinks, stale refresh, revisions, and lint | Broad results expect flashcards, quizzes, audio, transcription, OCR, and exam planning. The page must not promise these | **Selected**, narrowed to a maintained course wiki |
| Reusable RFP / tender answer library | Independent English OSS, Taiwan tender analysis, and Simplified-Chinese proposal-material workflows repeat source reuse, stale answers, evidence, and review. Broad `標案` and `招标` terms are large in their own Trends comparisons | A small-team answer library can use Wenlan's sources, citations, stale state, and review. No current Wenlan owner owns this exact task | Exact knowledge-base phrases have little Trends data; SERPs heavily expect response generation, Word export, approvals, CRM, permissions, compliance automation, and bid management. It also starts a new topical cluster with no current Wenlan GSC visibility | Keep as a future high-intent candidate; do not choose ahead of the LLM Wiki adjacency |
| Employee training / new-hire onboarding knowledge base | US `employee onboarding` is strong in the cross-scenario request; a Taiwan 104 article reports `4,053` source-native views; Atlassian community and Chinese enterprise guidance repeat current instructions and repeated questions | Wenlan can maintain a private source-backed manual or policy knowledge base | Searchers commonly require multi-user access, HR permissions, LMS/HRIS integration, training video, quizzes, progress tracking, certification, and employee self-service. Wenlan does not prove that delivery surface | Reject the broad onboarding page. Reconsider only a single-operator documentation-maintenance task with a distinct SERP |

Necessary gates are evaluated before ranking. The selected family passes
provenance, repeated demand, trilingual result shape, clean gap, first-party
proof, standalone utility, internal-link, and predeclared authority-path gates.
The other candidates cannot win merely from a higher broad Trends index when
their dominant result intent requires unsupported product capabilities.

## Selected family: locale intent

### English / United States

Chosen natural handles:

- `turn lecture slides into a course wiki`
- `source backed AI study notes`
- `student LLM wiki`

Focused Trends set: `AI study guide; AI notes; lecture notes; NotebookLM; study
guide` with native average indices `5; 27; 13; 30; 68`.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=AI%20study%20guide,AI%20notes,lecture%20notes,NotebookLM,study%20guide>

### zh-TW / Taiwan

Chosen natural handles:

- `把課堂講義整理成 AI 知識庫`
- `講義 PDF 轉可追溯學習筆記`
- `學生 LLM Wiki`

Focused Trends set: `AI 筆記; 學習筆記; 課堂講義; NotebookLM; 讀書筆記`
with native average indices `1; 0; 0; 66; 0`.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=TW&q=AI%20%E7%AD%86%E8%A8%98,%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98,%E8%AA%B2%E5%A0%82%E8%AC%9B%E7%BE%A9,NotebookLM,%E8%AE%80%E6%9B%B8%E7%AD%86%E8%A8%98>

### zh-CN / Simplified-Chinese sources

Chosen natural handles:

- `把课程讲义整理成 AI 知识库`
- `课件 PDF 转可追溯学习笔记`
- `学生 LLM Wiki`

Focused Trends set: `AI 笔记; 学习笔记; 课程讲义; NotebookLM; 读书笔记`
with native average indices `0; 0; 0; 51; 1`. Mainland Google coverage remains
a stated limitation.

Source:
<https://trends.google.com/trends/explore?date=today%2012-m&geo=CN&q=AI%20%E7%AC%94%E8%AE%B0,%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0,%E8%AF%BE%E7%A8%8B%E8%AE%B2%E4%B9%89,NotebookLM,%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0>

## Retained source evidence

- Student LLM Wiki, bilingual course-slide workflow, `172` stars and `4`
  forks at capture: <https://github.com/IssacW228/student-llm-wiki>
- Georgia Tech TokenSmith, local course-PDF and lecture-slide cited answers,
  `7` stars and `26` forks at capture:
  <https://github.com/georgia-tech-db/TokenSmith>
- Student community discussion about cited PDF study work, missing details,
  cross-source confusion, and broader quiz / flashcard expectations:
  <https://boredofstudies.org/threads/paper-notion-%C3%97-notebooklm-%C3%97-anki-study-tool-for-students.416434/>
- Taiwan NotebookLM study workflow and natural language:
  <https://www.theai.tw/guide/notebooklm-tutorial>
- Official Traditional-Chinese student surface:
  <https://notebooklm.google/students?hl=zh-TW>
- Simplified-Chinese course-material workflow:
  <https://github.com/WZYQAQ0v0/AutoCourseNote>
- RFP response accelerator, inspected as a product-boundary counterexample;
  it is archived and explicitly not production-ready:
  <https://github.com/microsoft/agent-for-rfp-response-solution-accelerator>
- Evidence-mapped RFP / DDQ OSS workflow:
  <https://github.com/mattdweigand-sketch/rfp-ddq-os>
- Taiwan tender-document verification workflow:
  <https://www.brocent.com/zh-tw/blog/posts/kimi-tender-document-analysis>
- Simplified-Chinese bid-material reuse workflow:
  <https://qingflow.com/knowledge/5179>
- Employee-onboarding repeated-question discussion:
  <https://community.atlassian.com/forums/Rovo-questions/Can-Rovo-help-reduce-repetitive-onboarding-questions-from-new/qaq-p/3272228>
- Taiwan onboarding guide, `4,053` source-native views at capture:
  <https://blog.104.com.tw/notebooklm-employee-onboarding-ai-tutorial/>
- Chinese enterprise knowledge-base standard surface:
  <https://ndls.cnis.ac.cn/standard/detail/f929cc75897bfb3c841bffddb4bc3cfe>

## Owner, links, and authority path

- Proposed owner slugs:
  - `/learn/build-course-wiki-from-lecture-notes`
  - `/zh-TW/learn/build-course-wiki-from-lecture-notes`
  - `/zh-CN/learn/build-course-wiki-from-lecture-notes`
- Contextual inbound owners in each locale:
  - `build-local-ai-knowledge-base-from-documents`
  - `distilled-wiki-pages-ai-memory`
  - `source-backed-research-knowledge-base`
- Conditional authority path:
  <https://github.com/sohailakhtar01/awesome-ai-tools-for-students>.
  After separate publication and external-action approval, propose one neutral,
  affiliation-disclosed entry in the AI Study and Learning Tools or AI
  Note-Taking section. Acceptance and any backlink are not assumed.

## Next action

Prepare the exact three-locale page family only after separate user approval.
The implementation brief must open with the course-material problem, preserve
Karpathy / LLM Wiki adjacency, show the real `wenlan sources add`, `/distill`,
`/pages`, `/lint`, and `/curate` workflow, and state every unsupported study
feature before any product CTA.
