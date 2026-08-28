# Research knowledge-base authority next action

Date: 2026-08-27 America/Los_Angeles  
Website production boundary: `2026-08-28T03:49:51Z`  
Website canonical family: `/learn/source-backed-research-knowledge-base`

## Decision

Do not submit another Awesome-list pull request now. Prepare one maintained
first-party source reference from the current Wenlan repository README family
to the new locale-aware research workflow, then return for explicit source-repo
publication approval.

This is an authority-path correction, not a claim of search growth. A live
Wenlan README link would be a maintained first-party reference; it would not be
independent third-party endorsement and would not prove impressions, clicks,
visitors, or stars.

## Why the earlier directory candidate is held

Current upstream observation for
`https://github.com/0x11c11e/awesome-ai-research-tools`:

- main commit: `ba84ff5343df7b78c1ad733f5c8878d0baade636`;
- public, non-archived, CC0-1.0, 67 GitHub stars;
- last upstream push: `2026-08-15T04:00:55Z`;
- contribution rule: the tool must be alive, research-focused, distinct, placed
  alphabetically, and described factually in fewer than 18 words;
- exact repository, issue, and pull-request searches found no Wenlan duplicate;
- the latest accepted analogous entry was ThoughtDAG PR #28, merged after a
  six-day review with an explicit maintainer disclosure;
- in closed PR #27, the owner explicitly rejected an undisclosed maintainer
  submission that added the same product to several Awesome lists because it
  read as promotion rather than a neutral suggestion.

Wenlan has several existing directory submissions from its maintainer account.
Another low-reach directory PR has a material promotion-risk signal and weak
expected leverage. The exact compliant line would be 13 words — `Local-first
source-backed knowledge base for research PDFs, citation checks, and inspectable
literature synthesis.` — but it remains deliberately unsubmitted.

## Preferred exact candidate

Current public Wenlan main used for the proposal:
`76a127bf3779b2aa5d9a6b7601159cf88b908499` (`v0.17.3`). The README already
names researchers as an audience and documents PDF ingestion, source-backed
Pages, citations, refresh, and review, but its Learn-more section has no direct
research workflow entry.

The local-only proposal adds one link under Concepts in every maintained README:

- English: `Research knowledge base from papers` links to the English guide.
- Traditional Chinese: `用論文建立研究知識庫` links to the zh-TW guide.
- Simplified Chinese: `用论文建立研究知识库` links to the zh-CN guide.
- Spanish: `Base de conocimiento para investigación` links to the English
  guide because no Spanish website route exists.

The Spanish README is included because Wenlan's translation-sync contract
requires every maintained README to match English prose changes. The proposal
also updates only the three generated `README_SYNC` hashes.

Exact patch:
`docs/seo-audits/2026-08-27-wenlan-research-readme-authority-proposal.patch`
with SHA-256
`f373d366e229de42e97e3b877370fee9c88574c0746d3167409fbb79206f9003`.

## Verification completed

- `python3 scripts/check-readme-translations.py --write-markers`
- `python3 scripts/check-readme-translations.py`
- `bash scripts/check-readme-translations.test.sh`
- `git diff --check`
- reverse `git apply --check` against the exact current-main proposal

All passed in an isolated clone. The candidate is four README files, seven
insertions and three generated-hash replacements. It is not committed, pushed,
merged, or published.

## Approval boundary

Separate explicit approval is required before applying this proposal to the
Wenlan source repository, committing, pushing, opening or merging a pull
request, or relying on automatic publication. Request indexing, GSC validation,
maintainer messages, synthetic analytics events, and any third-party directory
submission remain excluded.
