# Core acquisition product evidence — 2026-09-08

## Decision

The current source-update workflow is demonstrable, but a claim that Wenlan
correctly preserves numbers and exposes conflicting sources did **not** pass
this local test. This result is a product-quality finding, not an explanation
of low Google rankings, a growth outcome, or authority to publish.

The missing acquisition asset is an inspectable, reproducible answer to a real
maintenance task: what happens when a source changes while an older decision
still disagrees? Another conceptual explanation of LLM Wiki would add little
to the existing owners. Existing Wenlan guides already include real sanitized
product frames, source links, and stale-state evidence; those are not missing.

## Discovery comparison

These are inspected task/reference sources, **not a measured Google top-results
sample**, search volumes, or evidence of comparative ranking.

| Source | Existing utility | Evidence Wenlan still needs |
| --- | --- | --- |
| [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Raw sources, maintained wiki, schema, ingest/query/lint, contradictions | Actual generated output and a source-update trace, beyond repeating the architecture |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | Ingestion, retrieval, review, queue, API/MCP and agent workflow | A fair comparison with direct file use on the same task; do not imply alternatives lack automation or MCP |
| [Bedrock KB setup](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html) and [retrieval](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html) | Concrete setup, sync, retrieval, answer and source chunks | Reproducible task completion, source inspection and update behavior |
| [Google Cloud Agent Assist KB](https://docs.cloud.google.com/gemini-enterprise-cx/agent-assist/knowledge-base) | Document types, language and ingestion steps | Natural localized setup instructions backed by exercised behavior, not translation alone |

This is consistent with Google's [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
emphasis on original, useful content. It does not guarantee first-page placement
or inclusion in an AI answer.

## Tested state and method

- Test date: September 8 PDT / September 9 UTC, 2026.
- Latest stable release checked: [Wenlan v0.18.4](https://github.com/7xuanlu/wenlan/releases/tag/v0.18.4),
  tag commit `b47fd45241d0d46c02e931dad0bd5dbfaf0a2e35`.
- Official macOS arm64 archive SHA256 matched the published checksum:
  `1fb1b7b7e2d548c90f33457b634883cefb8718a55bcd7dc5d996cc669b95bbce`.
- Fresh isolated database, local daemon, no watched directories, no clipboard
  or screen capture, no cloud model, no customer data. No installed product
  was replaced. The test model actually loaded and generated output.
- Qwen3 4B Instruct 2507 Q4_K_M, model SHA256
  `3605803b982cb64aead44f6c1b2ae36e3acdb41d8e46c8a94c6533bc4c67e597`.
- Three short fictional sources were inserted through the memory API. A page
  containing their verbatim extracts was created, then rebuilt by the real
  model through `/api/distill` with `force: true`.
- The API specification was updated **in place** while the older decision
  remained. Staleness was observed before a second explicit forced rebuild.
- Five English, Traditional Chinese and Simplified Chinese queries exercised
  `/api/search`. The generated prose and fixture sources were English.

This tested model-backed recompilation of a source-extract page. It did not
test watched-folder ingestion, autonomous page creation, automatic rebuild
scheduling, human approval, or a complete desktop UI journey.

## Source facts and observed results

Initial API: after the first failed `GET /reports`, allow up to **3 retries**.
That means **4 total attempts**. Updated API: at most **1 retry**, or **2 total
attempts**. The unchanged decision still says 3 retries. Both prohibit automatic
`POST /payments` retries; the decision explains duplicate-payment risk. The
runbook requires endpoint, attempt number and final failure in the log, and
says the timeout has not been decided.

| Check | v0.18.4 observation | Interpretation |
| --- | --- | --- |
| Initial retry arithmetic | Says three retries, then “maximum attempt count is explicitly set at 3” | Incorrect: four total attempts |
| Source update tracking | `source_updated`, `pending_rebuild`, updated-source count 1 | Exercised successfully |
| Explicit rebuild | Version 2 → 3; stale flag clears; all three source links remain | Exercised successfully; not proof of semantic correctness |
| Conflicting versions | Calls the new one-retry limit compatible with a broader three-retry cap | Invents a scope distinction; does not disclose the actual disagreement |
| Unsupported requirements | Adds mandatory manual validation before payment-related actions | Not present in any of the three sources |
| Known and unknown facts | Retains POST safety rationale, log fields and unknown timeout | Useful facts retained in this run |
| Retrieval | All five queries return the three current raw memories | Basic source recall exercised; no answer-quality or corpus-scale claim |

The English GET query ranked the old decision first and the updated API second.
Both were returned. A consumer must inspect both; ranking alone does not resolve
the conflict. No page was returned, but the page remained `unconfirmed`, so this
is not evidence that confirmed-page retrieval is broken.

## Why citation badges did not prevent the error

The initial wrong attempt-count sentence has citation occurrence 3, marker 2,
status `verified`, scope `paragraph`, score approximately 0.538. The page was
saved with four verified and four unverified citation occurrences. The changed
page was saved with six verified and four unverified occurrences. These counts
are citation annotations, **not counts of true and false claims**.

The release-tag implementation uses lexical overlap in
[`citations.rs`](https://github.com/7xuanlu/wenlan/blob/v0.18.4/crates/wenlan-core/src/citations.rs#L126),
with a paragraph fallback. It is not semantic entailment or arithmetic checking.
The [refresh gate](https://github.com/7xuanlu/wenlan/blob/v0.18.4/crates/wenlan-core/src/synthesis/distill.rs#L1472)
rejects zero verified citations or a majority of unverified citations; a tie
passes. The invented compatibility sentence has no marker of its own. Do not
claim every unsupported sentence individually received a verified badge.

The [built-in prompt](https://github.com/7xuanlu/wenlan/blob/v0.18.4/crates/wenlan-core/src/prompts/defaults.rs#L187)
already asks for contradictions in Open Questions and preservation of exact
numbers. Therefore “add a prompt instruction” is not yet a proven remedy.

## Direct-files baseline and limits

The direct-files run used the identical GGUF weights through Ollama with an
explicit task checklist, temperature 0, seed 42 and the model's official ChatML
format. Wenlan used its own built-in prompt and runtime (refresh temperature
0.1). Same weights are not identical experimental conditions.

- Initial direct-files answer correctly stated 3 retries / 4 attempts and the
  other supplied facts.
- Updated direct-files answer correctly stated 1 retry / 2 attempts and exposed
  the conflicting older decision, but called that decision incorrect and chose
  the API despite an instruction not to invent a resolution. This is a partial
  result, not a clean baseline win.
- Earlier default-template Ollama outputs were invalid preflights: imported
  GGUF used plain text continuation. Those outputs are retained but excluded.
- An unrelated placeholder page rejected at creation and a pre-model-load
  skipped rebuild are also preflight outcomes, not generation failures.
- Preliminary v0.18.3 results are retained separately. Latest-version claims
  above refer only to the fresh v0.18.4 run.

One valid generation per phase is enough to exhibit this failure, not to
estimate its frequency. No comparative speed, accuracy percentage, large-corpus
performance, real-person utility, adoption, Google ranking lift, or AI citation
increase follows from this fixture.

## Reproduction and repair acceptance

The evidence packet preserves sources, exact API requests/responses, model and
release receipts, original scripts, generated pages, release-tag implementation
snapshots, and a SHA256 manifest. The scripts use task-specific temporary paths
and loopback ports; the packet README describes their isolation assumptions.
Protocol contents were defined before the valid runs, but the script rewrites
the protocol file on invocation; its filesystem timestamp is not independent
proof of preregistration.

A product fix must be assessed against held-out numeric, negation and version
conflict cases as well as this fixture. For this case, acceptance requires:

1. Preserve 3 retries / 4 total attempts initially and 1 retry / 2 attempts in
   the new API after update.
2. Name the older three-retry decision and explicitly preserve the disagreement;
   do not invent a general-versus-endpoint rule to reconcile it.
3. Preserve supplied log fields and unknown timeout; add no manual-validation
   requirement or other unsupported operational fact.
4. Do not present an incorrect numeric claim as semantically verified. Preserve
   a reviewable previous state when a candidate fails the chosen integrity gate.
5. Retain source identities, update/stale behavior, review state and retrieval
   visibility. Test generation and citation validation separately; use the same
   built-in prompt for a model/runtime comparison before assigning causality.

This is a concrete product repair candidate. No product implementation, website
publication, indexing request or external outreach was performed in this step.
The SEO content opportunity remains a reproducible source-update walkthrough
with honest limitations; a reliability superiority claim is not ready.
