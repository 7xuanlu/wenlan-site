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
  "build-business-metric-definition-knowledge-base": "35a5d9bd23d358996df4719ad95a5ff6664d53c4850175adfb371377dc2d7923",
  "build-client-project-knowledge-base-for-consulting": "30d12e1b7f4585646ee11475e3559fef4484dbac435ad95c11ecd16404f792a6",
  "build-competitive-intelligence-knowledge-base": "befa1737e1dd839a5ea0e441dcbd993b2f289d780e9cb00ae49232e3857059f3",
  "build-course-wiki-from-lecture-notes": "f5b920fa65ef22a7cd2a4cba896fa2c56611df7df19fcba8cc81b8139ba77bce",
  "build-customer-support-answer-knowledge-base": "ceed47fec1cc3ef10a18aac0ec13e8855f89a779fd5f2d29e8675daa57a2c58e",
  "build-ict-supplier-due-diligence-evidence-pack": "a2f5050933e295d8c0692de622058780c8d899db7fef61a7e6cb7c2829357ea1",
  "build-investment-research-knowledge-base": "74ced2e7990360cb46b7341751bc23eaeb5da38ab5a3f63d248bc63eda539d41",
  "build-local-ai-knowledge-base-from-documents": "beb6a95bc51b1334067625d218c610bc326ec9ee3d224c88a15b68e3340f4ad1",
  "build-product-research-knowledge-base-for-prd": "eb0b7828f030dc81cab200acf580f5917fcd665e49b30e82385568d8cca509a3",
  "build-sre-incident-knowledge-base": "9e3c948fa6deff7477666a0981ebbd70b49f22dbc5272b4407d5af37f4e92f32",
  "choose-ai-knowledge-base-tool": "cefc219acf0c6b655e20c6c4f378afe835307b1eb27403645c743a3463dd53e0",
  "coding-agent-source-backed-knowledge-base": "d95576c60e33bc42c38d21e5f1ed3609ccceaf20b1eb1ea57dc2d783751a74cd",
  "distilled-wiki-pages-ai-memory": "d7c8e7d4d350d96c9b960369824560754e4d888b9e83abb1baab1628ee304406",
  "fix-pdf-ingestion-ai-knowledge-base": "11122d0d14bca5ffd10015654f2fe624be69082cae43788e9af30d44184c4a8a",
  "prevent-multi-agent-knowledge-conflicts": "fd2b272a5e00e736ea5b35491f091a979dba245621cb4b0bccbebd4d9b55c8ba",
  "source-backed-research-knowledge-base": "efc3cafb5f2dd23ee8e31a6069f6c4ba0d1c0728bd0fb6a2b26682228a7f02d9",
  "source-backed-wiki-pages-ai-work": "78027dd63e216458e2289b63cdf657d33b40a92e5a4cac6ad1f41c855f1023f2",
  "test-ai-knowledge-base-retrieval-after-changes": "a4b76d947c40c77ef36a5237d867860868fcc46dbd4e35f3f5c990e18853f44e",
  "verify-ai-knowledge-base-citations": "53f0ce1d113b2fce657babaac73b44555cd611014fdc79f897bfee89939943f3",
  "wenlan-vs-obsidian-ai-memory": "ea39a2f53939abccf78707845365a7612ac735781e6b57a0044bfe30ae6e69cb",
  "when-ai-agent-should-query-knowledge-base": "efee2bceb78841522d30a4aaeafaaa25dde28bf709f33725b29686148a653fb5",
} as const;

export type HashedLearnArticleSlug = keyof typeof LEARN_ARTICLE_SOURCE_HASHES;
