import type { Locale } from "@/i18n/locales";
import type { DemoResource } from "./wiki-demo-data";

export type PersonalNote = DemoResource & {
  groupId: string;
  topicIds: readonly string[];
  sourceIds: readonly string[];
  relatedIds: readonly string[];
  version: number;
  updatedAt: string;
};

type Copy = {
  groups: { ai: string; personal: string; product: string };
  notes: Record<string, { title: string; body: string; tags: readonly string[] }>;
  memories: Record<string, { title: string; body: string }>;
};

const sourceIds = {
  layout: "mem_8434be7eda44",
  container: "mem_a5229d9e467d",
  acceptance: "mem_a0a619f5e4cb",
} as const;

const refs = {
  en: {
    "Agent Loop": "Agent Loop",
    "AI 工作方式": "Working with AI",
    "工作交接": "Work handoff",
    "重試策略": "Retry strategy",
    "Claude 與 Codex": "Claude and Codex",
    "每週回顧": "Weekly review",
    "寫作與思考": "Writing and thinking",
    "閱讀筆記": "Reading notes",
    "訪談洞察": "Interview insights",
    "介面驗收": "Interface review",
    "產品原則": "Product principles",
    [sourceIds.layout]: "Keep the article in place",
    [sourceIds.container]: "One reading container for four views",
    [sourceIds.acceptance]: "Check the sidebar in review",
  },
  "zh-TW": {
    "Agent Loop": "Agent Loop",
    "AI 工作方式": "AI 工作方式",
    "工作交接": "工作交接",
    "重試策略": "重試策略",
    "Claude 與 Codex": "Claude 與 Codex",
    "每週回顧": "每週回顧",
    "寫作與思考": "寫作與思考",
    "閱讀筆記": "閱讀筆記",
    "訪談洞察": "訪談洞察",
    "介面驗收": "介面驗收",
    "產品原則": "產品原則",
    [sourceIds.layout]: "側欄不推移正文",
    [sourceIds.container]: "四種頁面共用閱讀容器",
    [sourceIds.acceptance]: "驗收包含側欄開關",
  },
  "zh-CN": {
    "Agent Loop": "Agent Loop",
    "AI 工作方式": "AI 工作方式",
    "工作交接": "工作交接",
    "重試策略": "重试策略",
    "Claude 與 Codex": "Claude 与 Codex",
    "每週回顧": "每周回顾",
    "寫作與思考": "写作与思考",
    "閱讀筆記": "阅读笔记",
    "訪談洞察": "访谈洞察",
    "介面驗收": "界面验收",
    "產品原則": "产品原则",
    [sourceIds.layout]: "侧栏不推移正文",
    [sourceIds.container]: "四种页面共用阅读容器",
    [sourceIds.acceptance]: "验收包含侧栏开关",
  },
} as const;

const noteMeta = [
  { id: "page-agent-loop", titleKey: "Agent Loop", groupId: "group-ai", pathTags: ["AI 協作", "工作方法"], related: ["產品原則", "介面驗收", "工作交接"], sourceIds: [sourceIds.layout, sourceIds.container, sourceIds.acceptance, "url-reflow", "file-reading-review"], version: 8, updatedAt: "2026-10-13T02:55:26.284623+00:00" },
  { id: "ai-work-style", titleKey: "AI 工作方式", groupId: "group-ai", pathTags: ["AI 協作", "工作方法"], related: ["Agent Loop", "產品原則", "介面驗收"], sourceIds: [sourceIds.layout, sourceIds.container, sourceIds.acceptance], version: 4, updatedAt: "2026-10-13T01:42:01.518018+00:00" },
  { id: "work-handoff", titleKey: "工作交接", groupId: "group-ai", pathTags: ["AI 協作", "工作方法"], related: ["Agent Loop", "每週回顧"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.487945+00:00" },
  { id: "retry-strategy", titleKey: "重試策略", groupId: "group-ai", pathTags: ["AI 協作", "工作方法"], related: ["Agent Loop"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.415784+00:00" },
  { id: "claude-codex", titleKey: "Claude 與 Codex", groupId: "group-ai", pathTags: ["AI 協作", "工具觀察"], related: ["工作交接", "Agent Loop"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.549893+00:00" },
  { id: "weekly-review", titleKey: "每週回顧", groupId: "group-personal", pathTags: ["個人知識", "日常系統"], related: ["工作交接", "產品原則"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.328430+00:00" },
  { id: "writing-thinking", titleKey: "寫作與思考", groupId: "group-personal", pathTags: ["個人知識", "閱讀與學習"], related: ["閱讀筆記", "訪談洞察"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.171159+00:00" },
  { id: "reading-notes", titleKey: "閱讀筆記", groupId: "group-personal", pathTags: ["個人知識", "閱讀與學習"], related: ["寫作與思考", "每週回顧"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.103878+00:00" },
  { id: "interview-insights", titleKey: "訪談洞察", groupId: "group-product", pathTags: ["產品研究", "使用者研究"], related: ["工作交接", "Claude 與 Codex"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.745463+00:00" },
  { id: "interface-review", titleKey: "介面驗收", groupId: "group-product", pathTags: ["產品研究", "設計決策"], related: ["Agent Loop", "產品原則"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.681884+00:00" },
  { id: "product-principles", titleKey: "產品原則", groupId: "group-product", pathTags: ["產品研究", "設計決策"], related: ["訪談洞察", "介面驗收"], sourceIds: [], version: 2, updatedAt: "2026-10-12T23:28:55.617212+00:00" },
] as const;

const copy: Record<Locale, Copy> = {
  en: {
    groups: { ai: "AI collaboration", personal: "Personal knowledge", product: "Product research" },
    notes: {
      "Agent Loop": { title: "Agent Loop", tags: ["AI collaboration", "Working methods"], body: `# Agent Loop\n\nHow a layout fix became reusable knowledge for next time.\n\n## How the issue surfaced\n\nOpening the right sidebar shifted the first line of the article to the left. Each page calculated its width separately: Wiki was fixed, while Memory and Topic were missed.\n\n## Keep a decision that can be reused\n\nKeep the article's left edge fixed. When the sidebar opens, reduce only the available width on the right so text wraps naturally; use one shared container across all four reading views.\n\nConnect this decision to [[產品原則]], record the review steps in [[介面驗收]], and carry them into the next change with [[工作交接]].\n\n**Memories kept from this work**\n\n[${refs.en[sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs.en[sourceIds.container]}](#demo:${sourceIds.container}) · [${refs.en[sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "AI 工作方式": { title: "Working with AI", tags: ["AI collaboration", "Working methods"], body: `# Working with AI\n\nStart from the specific decision recorded in [[Agent Loop]], so the project context does not need to be rebuilt every time.\n\nThe reading-layout fix is recorded in [[產品原則]], and the review steps are in [[介面驗收]].\n\n**Related memories**\n\n[${refs.en[sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs.en[sourceIds.container]}](#demo:${sourceIds.container}) · [${refs.en[sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "工作交接": { title: "Work handoff", tags: ["AI collaboration", "Working methods"], body: "# Work handoff\n\nKeep what is finished, why a decision was made, and what remains unresolved.\n\nLet the next [[Agent Loop]] start from work already done; use [[每週回顧]] to bring it together each week." },
      "重試策略": { title: "Retry strategy", tags: ["AI collaboration", "Working methods"], body: "# Retry strategy\n\nWhen the same error happens twice, look for its cause first.\n\nA retry in [[Agent Loop]] should use new evidence. Repeating the same action is not a new attempt." },
      "Claude 與 Codex": { title: "Claude and Codex", tags: ["AI collaboration", "Tool notes"], body: "# Claude and Codex\n\nLet different tools continue from the same note.\n\nRead [[工作交接]] before starting [[Agent Loop]]. When the work is done, write the new judgment back to the original page." },
      "每週回顧": { title: "Weekly review", tags: ["Personal knowledge", "Daily system"], body: "# Weekly review\n\nEach week, keep one question worth carrying forward, one judgment that changed, and the next step.\n\nConnect [[工作交接]] back to this week's [[產品原則]]." },
      "寫作與思考": { title: "Writing and thinking", tags: ["Personal knowledge", "Reading and learning"], body: "# Writing and thinking\n\nWrite down your own judgment first, then add the reasons.\n\n[[閱讀筆記]] provides material; [[訪談洞察]] reminds me which assumptions still need checking." },
      "閱讀筆記": { title: "Reading notes", tags: ["Personal knowledge", "Reading and learning"], body: "# Reading notes\n\nReading with a question in mind makes it easier to keep your own understanding than collecting summaries.\n\nMove useful passages into [[寫作與思考]], then connect them to current work through [[每週回顧]]." },
      "訪談洞察": { title: "Interview insights", tags: ["Product research", "User research"], body: "# Interview insights\n\nPeople want to switch AI tools without explaining the whole project again.\n\nThat makes [[工作交接]] and [[Claude 與 Codex]] two sides of the same problem." },
      "介面驗收": { title: "Interface review", tags: ["Product research", "Design decisions"], body: "# Interface review\n\nPassing a test is not enough; the screen needs to be reviewed too.\n\nCheck text, alignment, links, and spacing on desktop and narrow screens. Bring what you learn back to [[Agent Loop]] and [[產品原則]]." },
      "產品原則": { title: "Product principles", tags: ["Product research", "Design decisions"], body: "# Product principles\n\nHelp people understand first, then help them act faster.\n\n[[訪談洞察]] is the starting point for design; [[介面驗收]] is the last step before it is done." },
    },
    memories: {
      [sourceIds.layout]: { title: "Keep the article in place", body: "When the right sidebar opens, keep the article's left edge fixed. Reduce only the available width on the right so the text wraps naturally; readers should not have to find the first line again." },
      [sourceIds.container]: { title: "One reading container for four views", body: "Memory, Topic, Wiki, and Sources share typography, line spacing, and the article container. When fixing layout, do not fix only the page currently in view." },
      [sourceIds.acceptance]: { title: "Check the sidebar in review", body: "For each reading-layout change, open all four views, toggle the right sidebar, and check wrapping and reference previews at a narrow viewport." },
    },
  },
  "zh-TW": {
    groups: { ai: "AI 協作", personal: "個人知識", product: "產品研究" },
    notes: {
      "Agent Loop": { title: "Agent Loop", tags: ["AI 協作", "工作方法"], body: `# Agent Loop\n\n一次排版修復，如何變成下次能直接用的經驗。\n\n## 問題是怎麼發現的\n\n打開右側欄後，文章的句首向左跳動。各頁面分別計算寬度，修好 Wiki，卻漏掉 Memory 和 Topic。\n\n## 留下可重用的決定\n\n固定正文的左側起點。側欄開啟時只縮小右側寬度，讓文字自然換行；四種閱讀頁共用同一個容器。\n\n這項決定連到 [[產品原則]]，檢查方式寫進 [[介面驗收]]，再由 [[工作交接]] 帶到下一次修改。\n\n**留下的記憶**\n\n[${refs["zh-TW"][sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs["zh-TW"][sourceIds.container]}](#demo:${sourceIds.container}) · [${refs["zh-TW"][sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "AI 工作方式": { title: "AI 工作方式", tags: ["AI 協作", "工作方法"], body: `# AI 工作方式\n\n從 [[Agent Loop]] 留下的具體決定開始，不必每次重建脈絡。\n\n閱讀排版的修正記在 [[產品原則]]，檢查流程放在 [[介面驗收]]。\n\n**相關記憶**\n\n[${refs["zh-TW"][sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs["zh-TW"][sourceIds.container]}](#demo:${sourceIds.container}) · [${refs["zh-TW"][sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "工作交接": { title: "工作交接", tags: ["AI 協作", "工作方法"], body: "# 工作交接\n\n保存已完成的事、做決定的理由，以及尚未解決的問題。\n\n讓下一次 [[Agent Loop]] 從已有成果開始；每週再透過 [[每週回顧]] 整理。" },
      "重試策略": { title: "重試策略", tags: ["AI 協作", "工作方法"], body: "# 重試策略\n\n同一種錯誤出現兩次，就先查原因。\n\n在 [[Agent Loop]] 裡，重試應該帶著新的證據；重複執行同一個動作，不算新的嘗試。" },
      "Claude 與 Codex": { title: "Claude 與 Codex", tags: ["AI 協作", "工具觀察"], body: "# Claude 與 Codex\n\n讓不同工具接著同一份筆記工作。\n\n先讀 [[工作交接]]，再開始 [[Agent Loop]]。完成後，把新的判斷寫回原本的頁面。" },
      "每週回顧": { title: "每週回顧", tags: ["個人知識", "日常系統"], body: "# 每週回顧\n\n每週留下一個值得延續的問題、一個改變的判斷，以及下一步。\n\n把 [[工作交接]] 接回本週的 [[產品原則]]。" },
      "寫作與思考": { title: "寫作與思考", tags: ["個人知識", "閱讀與學習"], body: "# 寫作與思考\n\n先寫下自己的判斷，再補上理由。\n\n[[閱讀筆記]] 提供材料，[[訪談洞察]] 提醒我哪些假設仍需要查證。" },
      "閱讀筆記": { title: "閱讀筆記", tags: ["個人知識", "閱讀與學習"], body: "# 閱讀筆記\n\n帶著問題閱讀，比收集摘要更容易留下自己的理解。\n\n把重要的段落放進 [[寫作與思考]]，再用 [[每週回顧]] 連回正在做的事。" },
      "訪談洞察": { title: "訪談洞察", tags: ["產品研究", "使用者研究"], body: "# 訪談洞察\n\n使用者希望換一個 AI 工具時，不必重新解釋整個專案。\n\n這讓 [[工作交接]] 與 [[Claude 與 Codex]] 成為同一個問題的兩面。" },
      "介面驗收": { title: "介面驗收", tags: ["產品研究", "設計決策"], body: "# 介面驗收\n\n測試通過之外，也要實際看過畫面。\n\n檢查桌面與窄螢幕的文字、對齊、連結與空白；把發現帶回 [[Agent Loop]] 和 [[產品原則]]。" },
      "產品原則": { title: "產品原則", tags: ["產品研究", "設計決策"], body: "# 產品原則\n\n先讓使用者理解，再讓操作更快。\n\n[[訪談洞察]] 是設計的起點，[[介面驗收]] 是完成前的最後一站。" },
    },
    memories: {
      [sourceIds.layout]: { title: "側欄不推移正文", body: "開啟右側欄時，保留正文的左側起點；只縮小右側寬度，讓文字自然換行。讀者不必重新找句首。" },
      [sourceIds.container]: { title: "四種頁面共用閱讀容器", body: "Memory、Topic、Wiki 與 Sources 共用字體、行距與正文容器。修正排版時，不能只修正在看的那一頁。" },
      [sourceIds.acceptance]: { title: "驗收包含側欄開關", body: "每次調整閱讀排版，都要實際打開四種頁面，切換右側欄，並檢查窄視窗下的換行與引用預覽。" },
    },
  },
  "zh-CN": {
    groups: { ai: "AI 协作", personal: "个人知识", product: "产品研究" },
    notes: {
      "Agent Loop": { title: "Agent Loop", tags: ["AI 协作", "工作方法"], body: `# Agent Loop\n\n一次排版修复，如何变成下次能直接用的经验。\n\n## 问题是怎么发现的\n\n打开右侧栏后，文章的句首向左跳动。各页面分别计算宽度，修好 Wiki，却漏掉 Memory 和 Topic。\n\n## 留下可重复使用的决定\n\n固定正文左侧的起点。侧栏打开时只缩小右侧宽度，让文字自然换行；四种阅读页共用同一个容器。\n\n这项决定连接到 [[產品原則]]，检查方式写进 [[介面驗收]]，再由 [[工作交接]] 带到下一次修改。\n\n**留下的记忆**\n\n[${refs["zh-CN"][sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs["zh-CN"][sourceIds.container]}](#demo:${sourceIds.container}) · [${refs["zh-CN"][sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "AI 工作方式": { title: "AI 工作方式", tags: ["AI 协作", "工作方法"], body: `# AI 工作方式\n\n从 [[Agent Loop]] 留下的具体决定开始，不必每次重建上下文。\n\n阅读排版的修正记在 [[產品原則]]，检查流程放在 [[介面驗收]]。\n\n**相关记忆**\n\n[${refs["zh-CN"][sourceIds.layout]}](#demo:${sourceIds.layout}) · [${refs["zh-CN"][sourceIds.container]}](#demo:${sourceIds.container}) · [${refs["zh-CN"][sourceIds.acceptance]}](#demo:${sourceIds.acceptance})` },
      "工作交接": { title: "工作交接", tags: ["AI 协作", "工作方法"], body: "# 工作交接\n\n保存已完成的事、做决定的理由，以及尚未解决的问题。\n\n让下一次 [[Agent Loop]] 从已有成果开始；每周再通过 [[每週回顧]] 整理。" },
      "重試策略": { title: "重试策略", tags: ["AI 协作", "工作方法"], body: "# 重试策略\n\n同一种错误出现两次，就先查原因。\n\n在 [[Agent Loop]] 里，重试应该带着新的证据；重复执行同一个动作，不算新的尝试。" },
      "Claude 與 Codex": { title: "Claude 与 Codex", tags: ["AI 协作", "工具观察"], body: "# Claude 与 Codex\n\n让不同工具接着同一份笔记工作。\n\n先读 [[工作交接]]，再开始 [[Agent Loop]]。完成后，把新的判断写回原来的页面。" },
      "每週回顧": { title: "每周回顾", tags: ["个人知识", "日常系统"], body: "# 每周回顾\n\n每周留下一个值得延续的问题、一个改变的判断，以及下一步。\n\n把 [[工作交接]] 接回本周的 [[產品原則]]。" },
      "寫作與思考": { title: "写作与思考", tags: ["个人知识", "阅读与学习"], body: "# 写作与思考\n\n先写下自己的判断，再补上理由。\n\n[[閱讀筆記]] 提供材料，[[訪談洞察]] 提醒我哪些假设仍需查证。" },
      "閱讀筆記": { title: "阅读笔记", tags: ["个人知识", "阅读与学习"], body: "# 阅读笔记\n\n带着问题阅读，比收集摘要更容易留下自己的理解。\n\n把重要段落放进 [[寫作與思考]]，再用 [[每週回顧]] 连回正在做的事。" },
      "訪談洞察": { title: "访谈洞察", tags: ["产品研究", "用户研究"], body: "# 访谈洞察\n\n用户希望换一个 AI 工具时，不必重新解释整个项目。\n\n这让 [[工作交接]] 与 [[Claude 與 Codex]] 成为同一个问题的两面。" },
      "介面驗收": { title: "界面验收", tags: ["产品研究", "设计决策"], body: "# 界面验收\n\n测试通过之外，也要实际看过画面。\n\n检查桌面与窄屏的文字、对齐、链接与留白；把发现带回 [[Agent Loop]] 和 [[產品原則]]。" },
      "產品原則": { title: "产品原则", tags: ["产品研究", "设计决策"], body: "# 产品原则\n\n先让用户理解，再让操作更快。\n\n[[訪談洞察]] 是设计的起点，[[介面驗收]] 是完成前的最后一步。" },
    },
    memories: {
      [sourceIds.layout]: { title: "侧栏不推移正文", body: "打开右侧栏时，保留正文左侧的起点；只缩小右侧宽度，让文字自然换行。读者不必重新寻找句首。" },
      [sourceIds.container]: { title: "四种页面共用阅读容器", body: "Memory、Topic、Wiki 与 Sources 共用字体、行距和正文容器。修正排版时，不能只修正在看的那一页。" },
      [sourceIds.acceptance]: { title: "验收包含侧栏开关", body: "每次调整阅读排版，都要实际打开四种页面，切换右侧栏，并检查窄视窗下的换行与引用预览。" },
    },
  },
};


// v8 snapshot from readme-personal-kb-20261012/pages/AI 協作/工作方法/agent-loop.md.
// Display IDs replace machine-local paths; file contents and URL summary follow the fixture.
const agentLoopBody: Record<Locale, string> = {
  "zh-TW": `# Agent Loop

一次排版修復，如何變成下次能直接用的經驗。

## 從來源找到依據

[W3C 文字重排](#demo:url-reflow) 說明：縮窄視窗時，文字應自然換行，避免逐行左右捲動。

[閱讀排版驗收.md](#demo:file-reading-review) 記下了檢查方式：開關側欄、比較四種頁面，確認句首不會跳動。

## 留下可重用的決定

固定正文的左側起點；側欄開啟時只縮小右側寬度。這是我們根據閱讀與驗收經驗留下的設計決定。

決定寫進 [[產品原則]]，以 [[介面驗收]] 檢查，再由 [[工作交接]] 帶到下一次修改。

留下的記憶：[側欄不推移正文](#demo:mem_8434be7eda44) · [共用閱讀容器](#demo:mem_a5229d9e467d) · [側欄開關也要驗收](#demo:mem_a0a619f5e4cb)`,
  "zh-CN": `# Agent Loop

一次排版修复，如何变成下次能直接用的经验。

## 从来源找到依据

[W3C 文字重排](#demo:url-reflow) 说明：缩窄窗口时，文字应自然换行，避免逐行左右滚动。

[阅读排版验收.md](#demo:file-reading-review) 记录了检查方式：开关侧栏、比较四种页面，确认句首不会跳动。

## 留下可重复使用的决定

固定正文左侧的起点；侧栏打开时只缩小右侧宽度。这是我们根据阅读与验收经验留下的设计决定。

决定写进 [[產品原則]]，用 [[介面驗收]] 检查，再由 [[工作交接]] 带到下一次修改。

留下的记忆：[侧栏不推移正文](#demo:mem_8434be7eda44) · [共用阅读容器](#demo:mem_a5229d9e467d) · [验收包含侧栏开关](#demo:mem_a0a619f5e4cb)`,
  en: `# Agent Loop

How a layout fix became reusable knowledge for next time.

## Find the evidence

[W3C Reflow](#demo:url-reflow) explains that text should wrap in a narrower viewport, avoiding horizontal scrolling on every line.

[Reading layout review.md](#demo:file-reading-review) records the checks: toggle the sidebar, compare four reading views, and confirm that the start of each line stays in place.

## Keep a decision that can be reused

Keep the article’s left edge fixed; opening the sidebar reduces only the width on the right. This is our design decision, informed by reading and review.

Record it in [[產品原則]], check it through [[介面驗收]], and carry it into the next change with [[工作交接]].

Memories kept: [Keep the article in place](#demo:mem_8434be7eda44) · [One shared reading container](#demo:mem_a5229d9e467d) · [Check the sidebar in review](#demo:mem_a0a619f5e4cb)`,
};

function agentLoopSources(locale: Locale): DemoResource[] {
  const labels = {
    en: { web: "W3C · Reflow and reading", file: "Reading layout review.md", tag: "Reading layout" },
    "zh-TW": { web: "W3C · 文字重排與閱讀", file: "閱讀排版驗收.md", tag: "閱讀排版" },
    "zh-CN": { web: "W3C · 文字重排与阅读", file: "阅读排版验收.md", tag: "阅读排版" },
  }[locale];
  // The captured sources retain their original Traditional Chinese text in every locale.
  return [
    { id: "url-reflow", kind: "url", title: labels.web,
      location: "w3.org · WCAG 2.2 · Reflow", href: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
      body: "# Reflow：文字重排與閱讀\n\n此為根據 W3C WCAG 2.2 Understanding SC 1.4.10 撰寫的中文摘要，並非原文全文。\n\n放大文字或縮窄視窗時，一般文字內容應在可視範圍內重新換行，避免讀者逐行左右捲動。地圖、圖表等需要二維排版的內容有例外。\n\n示範筆記：這份參考協助我們檢視側欄開啟時的換行；固定句首則是本產品的額外閱讀體驗決定。",
      tags: [labels.tag], relatedIds: ["page-agent-loop"] },
    { id: "file-reading-review", kind: "file", title: labels.file,
      location: "reading / reading-review.md", href: "/images/home/personal-knowledge/reading-review.md",
      body: "# 閱讀排版驗收\n\n這是示範知識庫的驗收筆記。\n\n- 開關右側欄，正文的左側起點保持不變。\n- 在 Memory、Topic、Wiki、Sources 分別檢查字體、行距與換行。\n- 將視窗縮窄，再確認引用預覽沒有遮住閱讀中的段落。\n\n參考：W3C WCAG 2.2 的 Reflow 說明。此檢查清單不等同完整的 WCAG 符合性認證。",
      tags: [labels.tag], relatedIds: ["page-agent-loop"] },
  ];
}

const localizedTitle = (locale: Locale, titleKey: string) => copy[locale].notes[titleKey].title;
const noteIdByTitle: Readonly<Record<string, string>> = Object.fromEntries(noteMeta.map((note) => [note.titleKey, note.id]));
const groupForLocale = (locale: Locale) => [
  { id: "group-ai", title: copy[locale].groups.ai, topicId: "topic-ai", groupKey: "ai" as const },
  { id: "group-personal", title: copy[locale].groups.personal, topicId: "topic-personal", groupKey: "personal" as const },
  { id: "group-product", title: copy[locale].groups.product, topicId: "topic-product", groupKey: "product" as const },
];

// Static, sanitized content from the local readme-personal-kb-20261012 fixture.
// Page titles, groups, links, source IDs, version and modified dates follow the current Markdown projections;
// Agent Loop follows the v8 Markdown projection, including its imported URL and file sources. Three linked memory bodies come from the fixture's read-only local memory database.
export function getPersonalLibrary(locale: Locale): { notes: PersonalNote[]; resources: DemoResource[]; groups: { id: string; title: string }[] } {
  const notes: PersonalNote[] = noteMeta.map((meta) => {
    const translated = copy[locale].notes[meta.titleKey];
    const body = (meta.id === "page-agent-loop" ? agentLoopBody[locale] : translated.body).replace(/\[\[([^\]]+)\]\]/g, (_match, target: string) => {
      const id = noteIdByTitle[target];
      return id ? `[${localizedTitle(locale, target)}](#demo:${id})` : target;
    });
    const relatedIds = meta.related.map((title) => noteIdByTitle[title]).filter((id): id is string => Boolean(id));
    const topicId = meta.groupId === "group-ai" ? "topic-ai" : meta.groupId === "group-personal" ? "topic-personal" : "topic-product";
    return {
      id: meta.id,
      kind: "page",
      title: translated.title,
      body,
      groupId: meta.groupId,
      topicIds: [topicId],
      sourceIds: meta.sourceIds,
      relatedIds,
      version: meta.version,
      updatedAt: meta.updatedAt,
      tags: translated.tags,
    };
  });

  const groups = groupForLocale(locale);
  const memoryResources: DemoResource[] = Object.entries(copy[locale].memories).map(([id, memory]) => ({
    id,
    kind: "memory",
    title: memory.title,
    body: memory.body,
    tags: [copy[locale].groups.ai, locale === "en" ? "Reading layout" : locale === "zh-CN" ? "阅读排版" : "閱讀排版"],
    relatedIds: notes.filter((note) => note.sourceIds.includes(id)).map((note) => note.id),
  }));
  const topicResources: DemoResource[] = groups.map((group) => {
    const members = notes.filter((note) => note.groupId === group.id);
    const description = locale === "en"
      ? `${members.length} notes connected through ${group.title.toLowerCase()}.`
      : locale === "zh-CN"
        ? `${members.length} 篇笔记，围绕${group.title}彼此连接。`
        : `${members.length} 篇筆記，圍繞${group.title}彼此連結。`;
    return { id: group.topicId, kind: "topic", title: group.title, body: description, tags: [], relatedIds: members.map((note) => note.id) };
  });

  return { notes, resources: [...notes, ...memoryResources, ...topicResources, ...agentLoopSources(locale)], groups: groups.map(({ id, title }) => ({ id, title })) };
}
