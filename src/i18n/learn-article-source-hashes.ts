// Hash of each English Learn article that has Chinese translations, as of the
// last time the translations were reviewed against it.
//
// The core content dictionaries carry a per-unit `sourceHash` (see
// content/zh-TW.ts); Learn articles are plain LearnArticle objects with no room
// for one, so their hashes live here instead. `hashEnglishLearnArticle` ignores
// slug, publishedAt and updatedAt, so a date bump alone does not register as
// drift but a changed sentence, bullet or link does.
//
// When the contract test fails: re-read the English article, update the zh-TW
// and zh-CN translations in learn-articles.ts to match, then replace the hash
// here in the same commit. Updating the hash without touching the translation
// silences the check rather than resolving it.
//
// BASELINE NOTE: these values were captured from the English articles as they
// stood when the check was introduced. They record where drift detection
// starts, not a verification that every translation was current at that moment.
// The one drift known at capture time, `distilled-wiki-pages-ai-memory`
// (English 2026-09-13, translations 2026-09-08), was reconciled on 2026-09-16.
export const LEARN_ARTICLE_SOURCE_HASHES = {
  "build-business-metric-definition-knowledge-base": "796d5ca12aed683f79967f78f46eb4f80956682d40f15b98b8fa830b7b255c5a",
  "build-client-project-knowledge-base-for-consulting": "6f6ced533082323bb0d715e1b765820271b07b77798e7d051fcb1eb85e6e0271",
  "build-competitive-intelligence-knowledge-base": "3259f247fd304f772212b1b9fb075df6fc0545dadb8a06d797c4b4df61904a55",
  "build-course-wiki-from-lecture-notes": "db76d920e69c269456b0d27aac6953ae3efaa5ea6b79c0a7420efca1d7657170",
  "build-customer-support-answer-knowledge-base": "e5887f72ea9fb0e67b3c65f4fe1086db221ed69960cbbd685e6769f2c7b4324e",
  "build-ict-supplier-due-diligence-evidence-pack": "c6ea14775d8a7ad6a2f79d1e48b85b2b30c18141a853877305b9fe88968f5966",
  "build-investment-research-knowledge-base": "95328f9574c5a6d49490614c74cebc3161eb821b8374378dc77f64d306a7ea08",
  "build-local-ai-knowledge-base-from-documents": "4727d7f4abddc7bd64f2861ee8f1c7e251162e33ae01399ae12a19ca23a774a0",
  "build-product-research-knowledge-base-for-prd": "5308cbe327a39e499d0c617360f4a2ba3e6c159fd3736e2c48e512db657aac1c",
  "build-sre-incident-knowledge-base": "4e6e42103452e76aa79fcd4cc2c02c15d53bf9a5a89b4f0db5188859ee34d37e",
  "choose-ai-knowledge-base-tool": "1083c41f085af4978646f06297632c3e9487c182c3522ef7a8e10267ea5fa701",
  "coding-agent-source-backed-knowledge-base": "28476a768226b64ebf21ecd4d7bfe54395574a5dcefc4a4aa4b6f877c74ac6b5",
  "distilled-wiki-pages-ai-memory": "44a32dde3fc55df9a550d89bdb38e3cfab43a0b8c55859db6be35ac5a9d92b08",
  "fix-pdf-ingestion-ai-knowledge-base": "dfaa3ad43e1ad997b86d2e269032fd52dd7f6be8b765e3d14a95e9440a3c0857",
  "prevent-multi-agent-knowledge-conflicts": "94179eb777509453d9db2d95978222dec4914661d2595b57c814922f1faf4bc8",
  "source-backed-research-knowledge-base": "ad6420c51e642b9786afd2506bb03f26aaf09a785cb89eacc8c68d0bcca83489",
  "source-backed-wiki-pages-ai-work": "506c7a22aba14adee38a1e2dc18def8836201ab57a8e9e6df854aa3b1f75a770",
  "test-ai-knowledge-base-retrieval-after-changes": "590430bb5ad71ecc051ee23d0135b4410c90012b689fef5cc22d14fbc918d265",
  "verify-ai-knowledge-base-citations": "8e882525342d952d5806f666fb2fd13d6dc657da278a7e9943fce9e08eef6b9b",
  "wenlan-vs-obsidian-ai-memory": "c7dadabe9bc3ac955e2301c289946ce464cb15585aec36060f6cbe646f4c867a",
  "when-ai-agent-should-query-knowledge-base": "abc1e82cfff784bc15e39f11937dd295dad993590c50aee1eb15a9a9ee635c14",
} as const;

export type HashedLearnArticleSlug = keyof typeof LEARN_ARTICLE_SOURCE_HASHES;
