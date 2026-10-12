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
  "build-business-metric-definition-knowledge-base": "59fcdd76a171027ed179c5bd67f4da57335760fc9bd29312a334cefa04e8cc43",
  "build-client-project-knowledge-base-for-consulting": "3bed36c9e99f9f61fc7a7f4d82b6d00faa927da7e6992b996007a7f5ba97865d",
  "build-competitive-intelligence-knowledge-base": "47e927f4dde7df025d87c7d82f3b8bf5dbf623537b9ad17b1996789ef9262f7d",
  "build-course-wiki-from-lecture-notes": "47e56881f2b313f1280a1f0debb02d25809253d0fdc83be26958cdb947b131c9",
  "build-customer-support-answer-knowledge-base": "efe2dcf94e46da0763cf349723e3c353169fa5a531b25fd1f1cc00a5ce110068",
  "build-ict-supplier-due-diligence-evidence-pack": "f87bb9ab6c29c47d48bd37b318c2abad02cd20d1d0665556f985ed4085695a86",
  "build-investment-research-knowledge-base": "e4d6a6b8cf0d40aecaa4634227f6bd8d84115317752e984eb07ad5c83ad41f19",
  "build-local-ai-knowledge-base-from-documents": "c0c2f3879fd7e4e25225f1ddfdb837114af9cb1d182ad477a10ad3d54ce26fc2",
  "build-product-research-knowledge-base-for-prd": "58bd1a4183fdb2989d472afdb1c6efb4da069d599f779c022a9ea414b64c6737",
  "build-sre-incident-knowledge-base": "94d122374f0e5440dcf37f4afbc434d9898a3beede14d02f6fabf2be33c99299",
  "choose-ai-knowledge-base-tool": "2b92eb998906cc626414fa6edf4757bb1dc32a42efdfc8c69f6a6af25a460e1d",
  "coding-agent-source-backed-knowledge-base": "95f80e8939e7b88ea9bbd0e3a849d91f552bdd88c93b8ce7694631c95eb75b42",
  "distilled-wiki-pages-ai-memory": "838df5ef4aab9b72733e8bb726765627de5fd2f84a648d63199d5b11398f2786",
  "fix-pdf-ingestion-ai-knowledge-base": "11122d0d14bca5ffd10015654f2fe624be69082cae43788e9af30d44184c4a8a",
  "prevent-multi-agent-knowledge-conflicts": "3253299b8e8f1a5ae2420db73d5e689b6b24ce560bfaf99f54764bd9152b1438",
  "source-backed-research-knowledge-base": "1948a8c1a9b71eb25c71895242ef7895659a13dfaa26f11dc115a1ce3bf35d41",
  "source-backed-wiki-pages-ai-work": "d9e50ab76776db557f677419df558b383bb5d28487158cbf7c54564f7ebf16c3",
  "test-ai-knowledge-base-retrieval-after-changes": "a4b76d947c40c77ef36a5237d867860868fcc46dbd4e35f3f5c990e18853f44e",
  "verify-ai-knowledge-base-citations": "211a961081e699144031758c2a2a0535adf13422c0d45d8122801cb2382b269b",
  "wenlan-vs-obsidian-ai-memory": "68ffe74781ff5eff15252cea5f2e4032e58e09ed1ad0f81a398f8702a3b7efe4",
  "when-ai-agent-should-query-knowledge-base": "abc1e82cfff784bc15e39f11937dd295dad993590c50aee1eb15a9a9ee635c14",
} as const;

export type HashedLearnArticleSlug = keyof typeof LEARN_ARTICLE_SOURCE_HASHES;
