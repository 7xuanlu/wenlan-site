# Course Wiki authority-path gate — 2026-09-01

## Decision

`REJECT the original target. SUBMIT the approved replacement proposal, then wait for the maintainer.`

The predeclared target, `sohailakhtar01/awesome-ai-tools-for-students`, has relevant categories and contribution wording, but its source-native maintenance record does not support treating it as a credible authority path. No pull request, issue, or maintainer message was created.

## Source-native evidence

Captured at `2026-09-01T07:13:17Z` from the GitHub repository API and the repository's current `README.md` and `CONTRIBUTING.md`.

| Check | Native observation | Decision use |
| --- | --- | --- |
| Repository state | Not archived; default branch `main`; last repository push `2026-05-10T20:08:43Z` | Accessible, but not proof of active curation |
| Audience fit | README contains `AI Study & Learning Tools` and `AI Note-Taking Tools` | Wenlan's Course Wiki task could fit the stated audience |
| Submission rules | Contributions require an actively maintained tool, a clear student use case, a real free tier, non-duplication, genuine incremental value, first-hand use, honest limitations, and affiliation disclosure | A proposal would require a substantial neutral listing and disclosure |
| Repository reach | `0` stars and `3` forks | No demonstrated audience reach |
| Commit history | One commit: `1a847db9`, `Initial commit: Production-ready AI tools repository`, dated `2026-05-10T20:00:06Z` | No demonstrated ongoing curation |
| Pull-request history | `0` merged pull requests | No demonstrated acceptance path |
| Open pull requests | #1 open since `2026-06-01`; #2 open since `2026-06-02`; #4 draft since `2026-07-31`; none has a later update | The README's claimed `7–14 days` review process is not supported by repository behavior |
| Duplicate check | No Wenlan entry was found in the current README | Clean duplicate state does not overcome the maintenance failure |

These are repository-native counts and timestamps, not GSC data, search volume, referral traffic, backlink value, or causal evidence.

## Gate result

- Audience and category fit: pass.
- Submission-format clarity: pass.
- Duplicate check: pass.
- Visible reach: fail.
- Recent maintainer activity: fail.
- Demonstrated review or merge cadence: fail.
- Overall authority-path gate: fail.

The target is recorded as `rejected-inactive`. It must not be retried unless source-native activity materially changes.

## Replacement requirements

Research the next student, course-material, or LLM-Wiki authority surface only if it has all of the following:

1. Direct audience fit for students, course notes, source-backed study material, or LLM Wiki workflows.
2. Recent maintainer activity visible in the source repository or directory.
3. Demonstrated review or merge cadence, not only a `PRs welcome` badge.
4. A non-duplicate category where Wenlan's maintained course-wiki workflow adds standalone value.
5. A neutral submission format that permits affiliation disclosure and honest limitations.

Any replacement submission, maintainer contact, or external publication remains separately approval-gated.

## Replacement comparison

Captured from GitHub at `2026-09-01T07:13:17Z`.

| Candidate | Audience and intent | Reach and maintenance | Source-native decision |
| --- | --- | --- | --- |
| `bydeng01/student-gpt-tools` | Direct student and researcher tool list; `General Study` and `Research Assistance` are clean sections | 85 stars, 15 forks, six merged pull requests; external tool PRs #9, #10, and #12 were merged; last merge and push `2026-06-17`; two newer submissions remain open | `CONDITIONAL PASS` — best audience match and a demonstrated external merge path, but current review timing is unknown |
| `0x11c11e/awesome-ai-research-tools` | Active research-tool list with `Notes & Knowledge Management` | 68 stars, 22 forks, ten merged pull requests; latest observed merge `2026-08-15` | `REJECT FOR THIS PAGE` — stronger current maintenance, but Course Wiki is a study-material task rather than the list's required research-focused task; consider it only for Wenlan's separate research knowledge-base owner |
| `IssacW228/student-llm-wiki` | Exact student LLM-Wiki audience and task | 173 stars, four forks, six merged pull requests; latest push `2026-06-16` | `REJECT AS LISTING TARGET` — this is a standalone workflow project, not a tool directory with a third-party listing contract |

## Prepared replacement proposal

Target: `bydeng01/student-gpt-tools`, `Learning and Studying` → `General Study`.

Exact one-row README diff:

```markdown
| [Wenlan](https://wenlan.app/learn/build-course-wiki-from-lecture-notes) | Free and open-source; local desktop app. | Turn supported lecture notes, Markdown, text, and text-extractable PDFs into a maintained course wiki with source citations, concept links, revision state, and human review. |
```

Proposed pull-request disclosure:

> Affiliation disclosure: this entry is submitted by a Wenlan project maintainer. Wenlan is a local, open-source knowledge system. The linked guide describes the bounded student Course Wiki workflow; Wenlan does not generate quizzes, flashcards, audio, transcripts, grades, tutoring answers, or exam plans.

This proposal is deliberately one row, uses the repository's existing three-column format, links the exact Course Wiki owner, and does not claim endorsement, acceptance, traffic, ranking, or superiority.

## Approved submission result

- The user explicitly approved the Wenlan control-plane publication and the external listing submission.
- GitHub identity was verified as `Qi-Xuan Lu` (`7xuanlu`).
- Fork: `7xuanlu/student-gpt-tools`.
- Commit: `052c297b2b811f2221dc9c03e6eee05becbe47a8` (`Add Wenlan course wiki tool`).
- Upstream pull request: `bydeng01/student-gpt-tools#18`, opened at `2026-09-01T08:11:06Z`.
- Source-native state at capture: open, non-draft, mergeable, no review decision, and no status checks.
- The exact destination returned HTTP 200 before submission.

The pull request is not a merged listing, rendered backlink, referral, crawl, indexing, rank, impression, click, visitor, star, or causal result. Authority counts only if the row is merged and visibly rendered upstream. Do not contact the maintainer again or poll repeatedly without a due Goal boundary or new approval.
