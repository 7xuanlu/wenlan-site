# Wenlan source README to LLM Wiki guide authority publication

Date: 2026-08-26

## Published scope

The user pre-approved the exact Wenlan source README authority bridge through
commit, push, pull request, merge, and post-merge verification. The change was
published in `7xuanlu/wenlan` as pull request
[`#599`](https://github.com/7xuanlu/wenlan/pull/599) and squash-merged to
`main` at `2026-08-26T04:57:49Z`.

- Publication branch: `codex/llm-wiki-readme-authority`
- Branch commit: `0509d470199e01163cf9cc5c6592dcd394c4f13f`
- Integrated `main` commit: `2f36e4203414edba2ef8dc20d21201d4f6fd8aba`
- Base observed before merge: `7c96f3303a9fbb05f22b334199498f9625f27e72`

The merged diff changes exactly four files:

- `README.md` links the English LLM-wiki explanation to
  `https://wenlan.app/learn/distilled-wiki-pages-ai-memory`.
- `README.zh-Hant.md` links the natural Traditional Chinese explanation to
  `https://wenlan.app/zh-TW/learn/distilled-wiki-pages-ai-memory`.
- `README.zh-Hans.md` links the natural Simplified Chinese explanation to
  `https://wenlan.app/zh-CN/learn/distilled-wiki-pages-ai-memory`.
- `README.es-ES.md` changes only the translation-sync marker required by the
  repository contract; no Spanish acquisition copy was added.

## Verification

Before publication:

- The current Wenlan-site Goal verifier passed on current `origin/main`:
  `pnpm seo:goal:check`.
- `git diff --check origin/main...HEAD` passed in the Wenlan publication clone.
- `python3 scripts/check-readme-translations.py` passed.
- `bash scripts/check-readme-translations.test.sh` passed with `selftest ok`.
- All three destination guide URLs returned HTTP `200`.
- GitHub rendered the English, zh-TW, and zh-CN branch READMEs with the expected
  natural text and exact locale destination.

After merge:

- The integrated commit was fetched and checked directly; its fresh merged
  diff remained the same four-file scope and `git show --check` passed.
- Translation sync and its self-test passed again on integrated `main`.
- All three destination guide URLs still returned HTTP `200`.
- GitHub rendered the English, zh-TW, and zh-CN `main` READMEs with the expected
  text and exact locale destination.
- Main-commit documentation checks passed.
- Release Please run
  [`32932260085`](https://github.com/7xuanlu/wenlan/actions/runs/32932260085)
  completed successfully; the tested-main and release-PR maintenance jobs
  passed, while the validated release-tag job was correctly skipped.

## Evidence boundary

This publication is one inspectable first-party authority bridge from the
Wenlan source repository to the matching implementation guides. It is not
evidence of ranking, impressions, clicks, visitors, downloads, or stars, and
no causal lift is attributed to it.

This scope did not change the Wenlan website, request indexing, submit GSC
validation, mutate analytics, publish an external directory entry, or contact
an external maintainer. The publication branch was not deleted.
