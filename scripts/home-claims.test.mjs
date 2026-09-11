import assert from "node:assert/strict";
import test from "node:test";
import { enContent } from "../src/i18n/content/en.ts";
import { zhCNContent } from "../src/i18n/content/zh-CN.ts";
import { zhTWContent } from "../src/i18n/content/zh-TW.ts";

const dictionaryByLocale = {
  en: enContent,
  "zh-TW": zhTWContent,
  "zh-CN": zhCNContent,
};

const acquisitionLinks = [
  { id: "llm-wiki", href: "/learn/distilled-wiki-pages-ai-memory" },
  { id: "ai-knowledge-base", href: "/learn/source-backed-wiki-pages-ai-work" },
];

const comparisonLinks = [
  "/learn/distilled-wiki-pages-ai-memory",
  "/learn/source-backed-wiki-pages-ai-work",
  "/learn/choose-ai-knowledge-base-tool",
  "/learn/wenlan-vs-obsidian-ai-memory",
];

const oldClaims = {
  en: [
    "every claim cited",
    "stale facts superseded",
    "Every page stays cited, linked, and current",
    "No sources, no recall, no upkeep",
    "enriched while you sleep",
    "Every claim keeps its source",
    "every distilled claim cites",
    "never bleeds",
    "Every MCP client reads",
    "96% fewer tokens",
  ],
  "zh-TW": [
    "每個 claim 都有引用",
    "過時事實自動被取代",
    "每一頁都保持有引用、有連結、跟得上現況",
    "沒有來源、沒有 recall、沒有維護",
    "在你睡覺時持續 enrich",
    "每個 claim 都留著來源",
    "每個蒸餾出的 claim 都引用",
    "永遠不會滲進",
    "每個 MCP client 都透過",
    "少 96% tokens",
  ],
  "zh-CN": [
    "每个 claim 都有引用",
    "过时事实自动被取代",
    "每一页都保持有引用、有链接、跟得上现况",
    "没有来源、没有 recall、没有维护",
    "在你睡觉时持续 enrich",
    "每个 claim 都留着来源",
    "每个蒸馏出的 claim 都引用",
    "永远不会渗进",
    "每个 MCP client 都通过",
    "少 96% tokens",
  ],
};

function faqById(home, id) {
  return home.faqs.items.find((item) => item.id === id);
}

test("homepage copy makes bounded claims and describes fair alternatives in every locale", () => {
  for (const [locale, dictionary] of Object.entries(dictionaryByLocale)) {
    const home = dictionary.home.content;
    const serialized = JSON.stringify(home);
    for (const claim of oldClaims[locale]) {
      assert.doesNotMatch(serialized, new RegExp(claim.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${locale} still contains: ${claim}`);
    }

    assert.deepEqual(
      home.hero.metaLinks.map(({ id, href }) => ({ id, href })),
      acquisitionLinks,
      `${locale} acquisition links changed`,
    );
    assert.equal(home.redesign.hero.description.split(/\s+/).filter(Boolean).length <= 20, true);
    assert.match(home.redesign.hero.worksWithNote, /Obsidian/);
    assert.match(home.redesign.hero.worksWithNote, /MCP client|MCP 用戶端|MCP 客户端/);

    const alternativeText = home.redesign.pains.generations.map((generation) => `${generation.name} ${generation.body}`).join(" ");
    assert.match(alternativeText, /Markdown/);
    assert.match(alternativeText, /Obsidian/);
    assert.match(alternativeText, /source|來源|来源/i);
    assert.match(alternativeText, /small|stable|小型|穩定|稳定|一個 collection|一个 collection/);

    const currentBody = home.redesign.pains.current.body;
    assert.match(currentBody, /source-backed|有來源|有来源/i);
    assert.match(currentBody, /review|審核|审核/);
    assert.match(currentBody, /configured|設定|配置/);
    assert.match(currentBody, /does not guarantee correctness|不保證內容正確|不保证内容正确/i);
    assert.match(currentBody, /eliminate upkeep|消除維護工作|消除维护工作/i);

    assert.deepEqual(
      home.redesign.pipeline.stages.map((stage) => stage.id),
      ["capture", "distill", "brief"],
      `${locale} pipeline stage IDs changed`,
    );
    const pipelineTitles = home.redesign.pipeline.stages.map((stage) => stage.title).join(" ");
    assert.match(pipelineTitles, /decision|決策|决策/i);
    assert.match(pipelineTitles, /page|頁面|页面/i);
    assert.match(pipelineTitles, /next|下一|下一个|下次/i);
    assert.match(home.redesign.pipeline.intro, /setup|設定|配置/);

    const bentoText = home.redesign.bento.cells.map((cell) => `${cell.title} ${cell.body}`).join(" ");
    assert.match(bentoText, /source|來源|来源/i);
    assert.match(bentoText, /review|審核|审核/);
    assert.match(bentoText, /configured|設定|配置/);
    assert.match(bentoText, /source link.*prove every claim|來源連結本身不代表每個 claim|来源链接本身不代表每个 claim/i);

    const tradeoffText = home.redesign.storage.tradeoffs.map((tradeoff) => `${tradeoff.title} ${tradeoff.body}`).join(" ");
    assert.match(tradeoffText, /small|穩定|稳定|小型/);
    assert.match(tradeoffText, /source|來源|来源/i);
    assert.match(tradeoffText, /review|審核|审核/);
    assert.doesNotMatch(tradeoffText, /database alone|只有資料庫|只有数据库/);

    assert.match(home.redesign.metrics.title, /retrieval|檢索|检索/i);
    assert.doesNotMatch(home.redesign.metrics.title, /96%/);
    assert.match(home.redesign.metrics.footnote, /retrieval-only|Retrieval-only/);
    assert.match(home.redesign.metrics.footnote, /general|一般|通用/);
    assert.match(home.redesign.metrics.footnote, /compare|比較|比较/);

    const setupFaq = faqById(home, "setup");
    const notesFaq = faqById(home, "not-notes");
    assert.ok(setupFaq && notesFaq, `${locale} setup and Obsidian FAQs are required`);
    assert.match(setupFaq.a, /model|模型|模型/);
    assert.match(setupFaq.a, /client|用戶端|客户端/);
    assert.match(notesFaq.a, /read-only|唯讀|只读/);
    assert.match(notesFaq.a, /Markdown|\.pdf|PDF/);

    const learnLinks = dictionaryByLocale[locale].footer.content.groups.find((group) => group.id === "learn")?.links ?? [];
    assert.deepEqual(learnLinks.map((link) => link.href), comparisonLinks, `${locale} footer comparison links changed`);
  }
});
