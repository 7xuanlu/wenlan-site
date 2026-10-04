"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import { ArrowRightIcon, BookOpenIcon } from "@/components/icons";
import { trackAnalyticsEvent } from "@/components/tracked-link";
import type { Locale } from "@/i18n/locales";
import { retryPolicySourceExcerpts } from "@/lib/llm-wiki-source-fixture";
import { extraScenarios, extraAnswerHighlights } from "./hero-scenario-extras";

type ScenarioId = "engineering" | "client" | "learning" | "writing" | "meetings" | "product";

type ScenarioSource = {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly excerpt: string;
  readonly excerptLabel?: string;
  readonly url?: string;
};

export type Scenario = {
  readonly id: ScenarioId;
  readonly tabLabel: string;
  readonly title: string;
  readonly knowledgeSummary: {
    readonly outcome: string;
    readonly facts: readonly { readonly label: string; readonly value: string; readonly sources: readonly number[] }[];
    readonly nextUpdate: string;
  };
  readonly sourceContext: string;
  readonly capturedLabel: string;
  readonly captured: string;
  readonly questionLabel: string;
  readonly question: string;
  readonly nextStepLabel: string;
  readonly nextStep: string;
  readonly sentenceSources: readonly (readonly number[])[];
  readonly sourcesLabel: string;
  readonly sourcesHint: string;
  readonly sources: readonly ScenarioSource[];
};

type HeroScenariosCopy = {
  readonly sectionLabel: string;
  readonly eyebrow: string;
  readonly disclaimer: string;
  readonly tablistLabel: string;
  readonly citationLabel: string;
  readonly sourceExcerptLabel: string;
  readonly originalSourceLabel: string;
  readonly knowledgePageLabel: string;
  readonly viewKnowledgeLabel: string;
  readonly hideKnowledgeLabel: string;
  readonly askAiLabel: string;
  readonly consultWenlanLabel: string;
  readonly aiAnswerLabel: string;
  readonly scenes: readonly Scenario[];
};

const copy: Record<Locale, HeroScenariosCopy> = {
  en: {
    sectionLabel: "Source-backed scenario view",
    eyebrow: "Illustrative scenarios",
    disclaimer: "Illustrative workflow · not live product output",
    tablistLabel: "Choose an illustrative scenario",
    citationLabel: "Jump to supplied source",
    sourceExcerptLabel: "Supplied excerpt",
    originalSourceLabel: "Read the study",
    knowledgePageLabel: "Wiki page",
    viewKnowledgeLabel: "Expand",
    hideKnowledgeLabel: "Collapse",
    askAiLabel: "You ask AI",
    consultWenlanLabel: "AI consults Wenlan",
    aiAnswerLabel: "AI answers from the wiki",
    scenes: [
      {
        id: "engineering",
        tabLabel: "Engineering",
        title: "API retry policy",
        knowledgeSummary: {
          outcome: "Three records, one retry policy.",
          facts: [
            { label: "Read requests", value: "Retry GET up to 3 times.", sources: [1] },
            { label: "Write requests", value: "Never retry POST automatically.", sources: [2] },
            { label: "Still open", value: "Timeout duration.", sources: [3] },
          ],
          nextUpdate: "Next update: add the timeout once a decision is recorded.",
        },
        sourceContext: "Compiled from API docs, decisions and runbook notes.",
        capturedLabel: "Previously",
        captured: "We already confirmed that reads and writes need different retry rules.",
        questionLabel: "This time",
        question: "This request failed. How should we retry it?",
        nextStepLabel: "Build on it",
        nextStep:
          "Retry failed GET requests up to 3 times; never retry POST automatically. The timeout boundary is still unspecified.",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "View sources",
        sourcesHint: "Expand to read the excerpts",
        sources: [
          {
            id: "api-v1",
            label: "api-v1.md",
            detail: "API retry rule",
            excerpt: retryPolicySourceExcerpts.en.api,
          },
          {
            id: "decision-07",
            label: "decision-07.md",
            detail: "Client decision",
            excerpt: retryPolicySourceExcerpts.en.decision,
          },
          {
            id: "runbook-v1",
            label: "runbook-v1.md",
            detail: "Logging and timeouts",
            excerpt: retryPolicySourceExcerpts.en.runbook,
          },
        ],
      },
      {
        id: "client",
        tabLabel: "Projects",
        title: "Client delivery scope",
        knowledgeSummary: {
          outcome: "Three records, one clear delivery scope.",
          facts: [
            { label: "Phase one includes", value: "Sign-in and payments.", sources: [1] },
            { label: "Outside phase one", value: "Data export.", sources: [1] },
            { label: "To confirm", value: "Export approval, added scope and delivery date.", sources: [2, 3] },
          ],
          nextUpdate: "Next update: record the export scope and date if it is approved.",
        },
        sourceContext: "Compiled from project conversations, scope docs and decisions.",
        capturedLabel: "Previously",
        captured: "Phase one covers sign-in and payments; data export is a separate discussion.",
        questionLabel: "This time",
        question: "The client asked about data export again. Did we promise it?",
        nextStepLabel: "Build on it",
        nextStep: "Phase one covers sign-in and payments; export is not committed. The project owner must approve new scope before setting a delivery date.",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "View sources",
        sourcesHint: "Expand to read the excerpts",
        sources: [
          {
            id: "scope-v2",
            label: "scope-v2.md",
            detail: "Scope boundary",
            excerpt: "Phase one includes sign-in and payments; data export is outside this scope.",
          },
          {
            id: "meeting-notes",
            label: "meeting-notes.md",
            detail: "Meeting note",
            excerpt: "The client asked whether data export could be added; delivery is not confirmed.",
          },
          {
            id: "decision-log",
            label: "decision-log.md",
            detail: "Decision log",
            excerpt: "New scope needs the project owner’s approval; delivery timing for the added item is not decided.",
          },
        ],
      },
      {
        id: "learning",
        tabLabel: "Research",
        title: "Remote-work research",
        knowledgeSummary: {
          outcome: "Two studies and a reading note, organized for comparison.",
          facts: [
            { label: "Call-centre trial", value: "Higher output when working from home.", sources: [1] },
            { label: "Hybrid-work trial", value: "No meaningful difference in performance reviews.", sources: [2] },
            { label: "Compare by", value: "Job type, work arrangement and performance measure.", sources: [3] },
          ],
          nextUpdate: "Next update: add studies from other industries and compare their settings.",
        },
        sourceContext: "Compiled from two studies and a reading note.",
        capturedLabel: "Previously",
        captured: "Two studies and a reading note, brought together for a report.",
        questionLabel: "This time",
        question: "Does remote work improve productivity? What do my readings say?",
        nextStepLabel: "Build on it",
        nextStep: "Not necessarily: compare job types and work arrangements. The call-centre trial found higher output at home; the hybrid-work trial found no meaningful performance change.",
        sentenceSources: [[1, 2, 3], [1, 2]],
        sourcesLabel: "View sources",
        sourcesHint: "Expand to read the excerpts",
        sources: [
          {
            id: "remote-work-2015",
            label: "Call-centre study (2015)",
            detail: "Bloom et al. · QJE",
            excerpt: "The Ctrip experiment found a 13% increase in performance among call-centre employees assigned to work from home, compared with office staff.",
            excerptLabel: "Study summary (paraphrased)",
            url: "https://economics.stanford.edu/publications/does-working-home-work-evidence-chinese-experiment",
          },
          {
            id: "hybrid-work-2024",
            label: "Hybrid-work study (2024)",
            detail: "Bloom, Han & Liang · Nature",
            excerpt: "At Trip.com, employees could work from home two days a week. The trial found no effect on performance-review grades.",
            excerptLabel: "Study summary (paraphrased)",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11208135/",
          },
          {
            id: "research-notes",
            label: "Reading note (example)",
            detail: "Comparison checklist",
            excerpt: "Record the job type, days working from home and how performance was measured. These studies examine different settings; do not treat their findings as interchangeable.",
            excerptLabel: "Illustrative reading note",
          },
        ],
      },
    ],
  },
  "zh-TW": {
    sectionLabel: "有來源依據的情境檢視",
    eyebrow: "示意情境",
    disclaimer: "流程示意，非即時產品輸出",
    tablistLabel: "選擇示意情境",
    citationLabel: "跳至提供的來源",
    sourceExcerptLabel: "提供的摘錄",
    originalSourceLabel: "閱讀原研究",
    knowledgePageLabel: "知識頁",
    viewKnowledgeLabel: "展開",
    hideKnowledgeLabel: "收起",
    askAiLabel: "你問 AI",
    consultWenlanLabel: "AI 查閱文瀾",
    aiAnswerLabel: "AI 根據知識頁回答",
    scenes: [
      {
        id: "engineering",
        tabLabel: "工程",
        title: "API 重試規則",
        knowledgeSummary: {
          outcome: "把三份紀錄整理成一頁重試規則。",
          facts: [
            { label: "讀取請求", value: "GET 最多重試 3 次。", sources: [1] },
            { label: "寫入請求", value: "不要自動重試 POST。", sources: [2] },
            { label: "待確認", value: "逾時秒數尚未決定。", sources: [3] },
          ],
          nextUpdate: "下次更新：逾時決議確認後，補上秒數。",
        },
        sourceContext: "整理自：API 文件、決策紀錄與操作筆記。",
        capturedLabel: "上次留下",
        captured: "上次已確認讀取與寫入要用不同的重試規則。",
        questionLabel: "這次要做",
        question: "這次請求失敗，該怎麼重試？",
        nextStepLabel: "接著往前",
        nextStep: "失敗的 GET 請求最多重試 3 次；不要自動重試 POST。逾時邊界仍未指定。",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "查看來源",
        sourcesHint: "展開閱讀原文",
        sources: [
          {
            id: "api-v1",
            label: "api-v1.md",
            detail: "API 重試規則",
            excerpt: retryPolicySourceExcerpts["zh-TW"].api,
          },
          {
            id: "decision-07",
            label: "decision-07.md",
            detail: "客戶端決定",
            excerpt: retryPolicySourceExcerpts["zh-TW"].decision,
          },
          {
            id: "runbook-v1",
            label: "runbook-v1.md",
            detail: "記錄與逾時",
            excerpt: retryPolicySourceExcerpts["zh-TW"].runbook,
          },
        ],
      },
      {
        id: "client",
        tabLabel: "專案",
        title: "專案交付範圍",
        knowledgeSummary: {
          outcome: "三份紀錄，整理成一份清楚的交付範圍。",
          facts: [
            { label: "第一期已確認", value: "登入與付款。", sources: [1] },
            { label: "第一期不包含", value: "資料匯出。", sources: [1] },
            { label: "待確認", value: "匯出是否核准、新增範圍與交期。", sources: [2, 3] },
          ],
          nextUpdate: "下次更新：匯出核准後，補上範圍與交期。",
        },
        sourceContext: "整理自：專案對話、需求文件與決策紀錄。",
        capturedLabel: "上次留下",
        captured: "第一期只做登入與付款，資料匯出另議。",
        questionLabel: "這次要做",
        question: "客戶又問資料匯出，我們答應過嗎？",
        nextStepLabel: "接著往前",
        nextStep: "第一期包含登入與付款，資料匯出尚未承諾。新增範圍需負責人確認，再決定交期。",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "查看來源",
        sourcesHint: "展開閱讀原文",
        sources: [
          {
            id: "scope-v2",
            label: "scope-v2.md",
            detail: "範圍界線",
            excerpt: "第一期包含登入與付款；資料匯出不在這次範圍。",
          },
          {
            id: "meeting-notes",
            label: "meeting-notes.md",
            detail: "會議筆記",
            excerpt: "客戶詢問能否加入資料匯出，目前沒有確認交付。",
          },
          {
            id: "decision-log",
            label: "decision-log.md",
            detail: "決策記錄",
            excerpt: "新增範圍需專案負責人確認；新增項目的交期尚未決定。",
          },
        ],
      },
      {
        id: "learning",
        tabLabel: "研究",
        title: "遠端工作研究",
        knowledgeSummary: {
          outcome: "把兩篇研究與閱讀筆記，整理成可比較的重點。",
          facts: [
            { label: "客服實驗", value: "居家工作產出較高。", sources: [1] },
            { label: "混合辦公實驗", value: "績效評等未見明顯差異。", sources: [2] },
            { label: "比較條件", value: "工作類型、辦公方式與績效指標。", sources: [3] },
          ],
          nextUpdate: "下次更新：補入不同產業的研究與比較條件。",
        },
        sourceContext: "整理自：兩篇研究與一則閱讀筆記。",
        capturedLabel: "上次留下",
        captured: "把兩篇研究與一則閱讀筆記，整理成寫報告時可用的依據。",
        questionLabel: "這次要做",
        question: "遠端工作效率更高嗎？讀過的研究怎麼說？",
        nextStepLabel: "接著往前",
        nextStep: "不一定，要分清工作類型與辦公方式。客服實驗發現居家工作產出較高；混合辦公研究則未發現績效明顯差異。",
        sentenceSources: [[1, 2, 3], [1, 2]],
        sourcesLabel: "查看來源",
        sourcesHint: "展開閱讀原文",
        sources: [
          {
            id: "remote-work-2015",
            label: "客服居家工作研究（2015）",
            detail: "Bloom 等 · QJE",
            excerpt: "Ctrip 的實驗中，分派到居家工作的客服人員，工作績效比辦公室組高 13%。",
            excerptLabel: "研究摘要（意譯）",
            url: "https://economics.stanford.edu/publications/does-working-home-work-evidence-chinese-experiment",
          },
          {
            id: "hybrid-work-2024",
            label: "混合辦公研究（2024）",
            detail: "Bloom、Han 與 Liang · Nature",
            excerpt: "Trip.com 的實驗允許員工每週兩天在家工作，未發現績效評等受到影響。",
            excerptLabel: "研究摘要（意譯）",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11208135/",
          },
          {
            id: "research-notes",
            label: "閱讀筆記（示例）",
            detail: "研究比較重點",
            excerpt: "比較時記下工作類型、每週在家天數與績效衡量方式。兩篇研究的情境不同，不宜把結論直接套用到所有工作。",
            excerptLabel: "示意閱讀筆記",
          },
        ],
      },
    ],
  },
  "zh-CN": {
    sectionLabel: "有来源依据的情境查看",
    eyebrow: "示意情境",
    disclaimer: "流程示意，非实时产品输出",
    tablistLabel: "选择示意情境",
    citationLabel: "跳至提供的来源",
    sourceExcerptLabel: "提供的摘录",
    originalSourceLabel: "阅读原研究",
    knowledgePageLabel: "知识页",
    viewKnowledgeLabel: "展开",
    hideKnowledgeLabel: "收起",
    askAiLabel: "你问 AI",
    consultWenlanLabel: "AI 查阅文澜",
    aiAnswerLabel: "AI 根据知识页回答",
    scenes: [
      {
        id: "engineering",
        tabLabel: "工程",
        title: "API 重试规则",
        knowledgeSummary: {
          outcome: "把三份记录整理成一页重试规则。",
          facts: [
            { label: "读取请求", value: "GET 最多重试 3 次。", sources: [1] },
            { label: "写入请求", value: "不要自动重试 POST。", sources: [2] },
            { label: "待确认", value: "超时秒数尚未决定。", sources: [3] },
          ],
          nextUpdate: "下次更新：超时规则确认后，补上秒数。",
        },
        sourceContext: "整理自：API 文档、决策记录与操作笔记。",
        capturedLabel: "上次留下",
        captured: "上次已经确认读取和写入要使用不同的重试规则。",
        questionLabel: "这次要做",
        question: "这次请求失败，该怎么重试？",
        nextStepLabel: "接着往前",
        nextStep: "失败的 GET 请求最多重试 3 次；不要自动重试 POST。超时边界仍未指定。",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "查看来源",
        sourcesHint: "展开阅读原文",
        sources: [
          {
            id: "api-v1",
            label: "api-v1.md",
            detail: "API 重试规则",
            excerpt: retryPolicySourceExcerpts["zh-CN"].api,
          },
          {
            id: "decision-07",
            label: "decision-07.md",
            detail: "客户端决定",
            excerpt: retryPolicySourceExcerpts["zh-CN"].decision,
          },
          {
            id: "runbook-v1",
            label: "runbook-v1.md",
            detail: "日志与超时",
            excerpt: retryPolicySourceExcerpts["zh-CN"].runbook,
          },
        ],
      },
      {
        id: "client",
        tabLabel: "项目",
        title: "项目交付范围",
        knowledgeSummary: {
          outcome: "三份记录，整理成一份清楚的交付范围。",
          facts: [
            { label: "第一期已确认", value: "登录与付款。", sources: [1] },
            { label: "第一期不包含", value: "数据导出。", sources: [1] },
            { label: "待确认", value: "导出是否批准、新增范围与交付时间。", sources: [2, 3] },
          ],
          nextUpdate: "下次更新：导出获批后，补上范围与交付时间。",
        },
        sourceContext: "整理自：项目对话、需求文档与决策记录。",
        capturedLabel: "上次留下",
        captured: "第一期只做登录和付款，数据导出另议。",
        questionLabel: "这次要做",
        question: "客户又问数据导出，我们答应过吗？",
        nextStepLabel: "接着往前",
        nextStep: "第一期包含登录和付款，数据导出尚未承诺。新增范围需负责人确认，再决定交付时间。",
        sentenceSources: [[1, 2], [3]],
        sourcesLabel: "查看来源",
        sourcesHint: "展开阅读原文",
        sources: [
          {
            id: "scope-v2",
            label: "scope-v2.md",
            detail: "范围界线",
            excerpt: "第一期包含登录和付款；数据导出不在这次范围。",
          },
          {
            id: "meeting-notes",
            label: "meeting-notes.md",
            detail: "会议笔记",
            excerpt: "客户询问能否加入数据导出，目前没有确认交付。",
          },
          {
            id: "decision-log",
            label: "decision-log.md",
            detail: "决策记录",
            excerpt: "新增范围需项目负责人确认；新增项目的交付时间尚未决定。",
          },
        ],
      },
      {
        id: "learning",
        tabLabel: "研究",
        title: "远程办公研究",
        knowledgeSummary: {
          outcome: "把两篇研究与阅读笔记，整理成可比较的要点。",
          facts: [
            { label: "客服实验", value: "居家办公产出较高。", sources: [1] },
            { label: "混合办公实验", value: "绩效评级未见明显差异。", sources: [2] },
            { label: "比较条件", value: "工作类型、办公方式与绩效指标。", sources: [3] },
          ],
          nextUpdate: "下次更新：补入不同行业的研究与比较条件。",
        },
        sourceContext: "整理自：两篇研究与一则阅读笔记。",
        capturedLabel: "上次留下",
        captured: "把两篇研究与一则阅读笔记，整理成写报告时可用的依据。",
        questionLabel: "这次要做",
        question: "远程办公效率更高吗？读过的研究怎么说？",
        nextStepLabel: "接着往前",
        nextStep: "不一定，要分清工作类型与办公方式。客服实验发现居家办公产出较高；混合办公研究则未发现绩效明显差异。",
        sentenceSources: [[1, 2, 3], [1, 2]],
        sourcesLabel: "查看来源",
        sourcesHint: "展开阅读原文",
        sources: [
          {
            id: "remote-work-2015",
            label: "客服居家办公研究（2015）",
            detail: "Bloom 等 · QJE",
            excerpt: "Ctrip 的实验中，分配到居家办公的客服人员，工作绩效比办公室组高 13%。",
            excerptLabel: "研究摘要（意译）",
            url: "https://economics.stanford.edu/publications/does-working-home-work-evidence-chinese-experiment",
          },
          {
            id: "hybrid-work-2024",
            label: "混合办公研究（2024）",
            detail: "Bloom、Han 与 Liang · Nature",
            excerpt: "Trip.com 的实验允许员工每周两天在家办公，未发现绩效评级受到影响。",
            excerptLabel: "研究摘要（意译）",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11208135/",
          },
          {
            id: "research-notes",
            label: "阅读笔记（示例）",
            detail: "研究比较要点",
            excerpt: "比较时记下工作类型、每周在家天数与绩效衡量方式。两篇研究的情境不同，不宜把结论直接套用到所有工作。",
            excerptLabel: "示意阅读笔记",
          },
        ],
      },
    ],
  },
};

function sourceAnchorId(prefix: string, sceneId: ScenarioId, sourceId: string): string {
  return `${prefix}-${sceneId}-source-${sourceId}`;
}

// Number references by their first appearance in the answer, not input-file order.
// Keep the source IDs unchanged so each claim still opens its original evidence.
function sourcesInCitationOrder(scene: Scenario): readonly ScenarioSource[] {
  return [...new Set(scene.sentenceSources.flat())].map((number) => scene.sources[number - 1]);
}

const answerHighlights: Record<Locale, Record<ScenarioId, readonly string[]>> = {
  en: { ...extraAnswerHighlights.en, engineering: ["GET requests", "3 times", "never retry POST"], client: ["not committed"], learning: ["Not necessarily", "higher output"] },
  "zh-TW": { ...extraAnswerHighlights["zh-TW"], engineering: ["GET 請求", "重試 3 次", "不要自動重試 POST"], client: ["尚未承諾"], learning: ["不一定", "產出較高"] },
  "zh-CN": { ...extraAnswerHighlights["zh-CN"], engineering: ["GET 请求", "重试 3 次", "不要自动重试 POST"], client: ["尚未承诺"], learning: ["不一定", "产出较高"] },
};

// Keep intentional reading units stable across Node and browser ICU versions.
// Intl.Segmenter disagrees on tokens such as Trip.com and breaks hydration.
const sourceReadingUnits = /(資料匯出|数据导出|遠端工作|远程办公|混合辦公|混合办公|知識頁|知识页|第一期|負責人|负责人|交付範圍|交付范围|專案|项目|研究|客服|實驗|实验|績效|绩效|產出|产出|工作類型|工作类型|辦公方式|办公方式|閱讀筆記|阅读笔记|重試|重试|逾時|超时|來源|来源|決策|决策|登入|登录|付款|確認|确认|[A-Za-z0-9]+(?:[._/-][A-Za-z0-9]+)*)/g;

function SourceExcerpt({ text, locale }: { text: string; locale: Locale }) {
  if (locale === "en") return text;
  return text.split(sourceReadingUnits).map((part, index) =>
    index % 2 === 1 ? <span key={index} className="whitespace-nowrap">{part}</span> : part);
}

function revealSource(event: MouseEvent<HTMLAnchorElement>, anchorId: string) {
  event.preventDefault();
  const sourceElement = document.getElementById(anchorId);
  if (sourceElement instanceof HTMLDetailsElement) {
    const sourceList = sourceElement.closest<HTMLDetailsElement>("details[data-source-list]");
    if (sourceList) sourceList.open = true;
    sourceElement.open = true;
    sourceElement.querySelector("summary")?.focus({ preventScroll: true });
    sourceElement.scrollIntoView({ block: "nearest" });
  }
}

function AnswerCharacters({ text, offset, interval }: { text: string; offset: number; interval: number }) {
  let characterIndex = offset;
  // Retain word wrapping and reserve the finished answer's full layout while typing.
  return text.split(sourceReadingUnits).map((part, partIndex) => (
    <span key={partIndex} className={partIndex % 2 === 1 ? "whitespace-nowrap" : undefined}>
      {Array.from(part).map((character) => {
        const index = characterIndex++;
        return <span key={index} data-answer-character style={{ "--answer-delay": `${2200 + index * interval}ms` } as CSSProperties}>{character}</span>;
      })}
    </span>
  ));
}

function ScenarioAnswer({ scene, locale, idPrefix, citationLabel, animate }: {
  scene: Scenario; locale: Locale; idPrefix: string; citationLabel: string; animate: boolean;
}) {
  const orderedSources = sourcesInCitationOrder(scene);
  const interval = Math.min(24, 1600 / Array.from(scene.nextStep).length);
  let offset = 0;
  function characters(text: string) {
    const start = offset;
    offset += Array.from(text).length;
    // Hidden panels still reserve their final height, without hundreds of
    // per-character elements for animations the visitor cannot see.
    return animate ? <AnswerCharacters text={text} offset={start} interval={interval} /> : <SourceExcerpt text={text} locale={locale} />;
  }
  const highlights = answerHighlights[locale][scene.id].map((phrase) => phrase.replace(/[.!?。！？]$/u, ""));
  const matcher = new RegExp(`(${highlights.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return scene.nextStep.split(/(?<=[.!?。！？])\s*/u).filter(Boolean).map((sentence, sentenceIndex) => {
    const body = sentence.replace(/[.!?。！？]$/u, "");
    const punctuation = sentence.slice(body.length);
    return (
    <span key={sentenceIndex} data-answer-sentence className={locale !== "en" && sentence.length <= 14 ? "whitespace-nowrap" : undefined}>
      {sentenceIndex > 0 && locale === "en" ? " " : null}
      {body.split(matcher).map((part, index) => highlights.includes(part)
        ? <span key={index} className="whitespace-nowrap font-medium text-[var(--o-warm)]">{characters(part)}</span>
        : <span key={index}>{characters(part)}</span>)}
      {"\u2060"}
      <sup className="relative -top-[0.3em] whitespace-nowrap align-baseline text-[0.75em] leading-none" data-answer-character style={{ "--answer-delay": `${2200 + offset * interval}ms` } as CSSProperties}>
        {scene.sentenceSources[sentenceIndex].map((sourceNumber) => {
          const source = scene.sources[sourceNumber - 1];
          const number = orderedSources.findIndex((item) => item.id === source.id) + 1;
          return (
            <a
              key={source.id}
              href={`#${sourceAnchorId(idPrefix, scene.id, source.id)}`}
              data-source-number={number}
              onClick={(event) => revealSource(event, sourceAnchorId(idPrefix, scene.id, source.id))}
              className="home-scenario-citation rounded-sm px-px font-mono text-[var(--o-warm)] first:pl-0 last:pr-0 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
              aria-label={`[${number}] ${citationLabel}: ${source.label}`}
            >[{number}]</a>
          );
        })}
      </sup>
      {characters(punctuation)}
    </span>
    );
  });
}

export function HeroScenarios({ locale }: { readonly locale: Locale }) {
  const sceneOrder: readonly ScenarioId[] = ["engineering", "product", "client", "learning", "writing", "meetings"];
  const strings = { ...copy[locale], scenes: [...copy[locale].scenes, ...extraScenarios[locale]]
    .sort((a, b) => sceneOrder.indexOf(a.id) - sceneOrder.indexOf(b.id)) };
  const idPrefix = useId().replaceAll(":", "");
  const [activeIndex, setActiveIndex] = useState(() => strings.scenes.findIndex((scene) => scene.id === "client"));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [flowReady, setFlowReady] = useState(false);
  const [replay, setReplay] = useState(0);
  const replayLabel = locale === "en" ? "Replay example" : locale === "zh-TW" ? "重播示範" : "重播示范";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFlowReady(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function selectScene(index: number, focus = true) {
    const nextIndex = (index + strings.scenes.length) % strings.scenes.length;
    if (nextIndex !== activeIndex) {
      // Returning to a scenario starts at the shared collapsed height.
      panelRefs.current[activeIndex]?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((details) => {
        details.open = false;
      });
      trackAnalyticsEvent({ eventName: "scenario_select", placement: "home-scenario", locale, context: "home", detail: strings.scenes[nextIndex].id });
    }
    setActiveIndex(nextIndex);
    if (focus) {
      tabRefs.current[nextIndex]?.focus();
    }
    tabRefs.current[nextIndex]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectScene(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectScene(index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectScene(0);
        break;
      case "End":
        event.preventDefault();
        selectScene(strings.scenes.length - 1);
        break;
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-label={strings.sectionLabel}
      data-hero-scenarios="true"
      data-flow-ready={flowReady}
      className="w-full max-w-[38rem] font-sans"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-[var(--o-text-muted)]">{strings.disclaimer}</p>
        <button type="button" onClick={() => setReplay((value) => value + 1)}
          className="min-h-8 shrink-0 rounded-sm text-xs text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] motion-reduce:hidden">
          {replayLabel}
        </button>
      </div>

      <div
        role="tablist"
        aria-label={strings.tablistLabel}
        className="home-scenario-tabs relative mt-1 flex gap-1 overflow-x-auto border-b border-[var(--o-border-subtle)]"
      >
        {strings.scenes.map((scene, index) => {
          const selected = index === activeIndex;
          const tabId = `${idPrefix}-tab-${scene.id}`;
          const panelId = `${idPrefix}-panel-${scene.id}`;
          return (
            <button
              key={scene.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-controls={panelId}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectScene(index, false)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`relative min-h-9 shrink-0 whitespace-nowrap rounded-sm px-2 py-2 text-center text-[0.8125rem] leading-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)] motion-reduce:transition-none ${
                selected
                  ? "font-medium text-[var(--o-text)]"
                  : "text-[var(--o-text-muted)] hover:text-[var(--o-text-secondary)]"
              }`}
            >
              {scene.tabLabel}
              <span aria-hidden="true" className="home-scenario-tab-indicator pointer-events-none absolute inset-x-2 bottom-0 h-0.5 rounded-full" />
            </button>
          );
        })}
      </div>

      <div className="relative mt-3 grid">
        {strings.scenes.map((scene, index) => {
          const selected = index === activeIndex;
          const tabId = `${idPrefix}-tab-${scene.id}`;
          const panelId = `${idPrefix}-panel-${scene.id}`;
          return (
            <article
              ref={(node) => { panelRefs.current[index] = node; }}
              key={`${scene.id}-${replay}`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              aria-hidden={!selected}
              inert={!selected}
              data-scene-id={scene.id}
              className={`home-scenario-panel col-start-1 row-start-1 w-full ${
                selected
                  ? "visible"
                  : "invisible pointer-events-none"
              }`}
            >
              <div className="home-scenario-conversation h-full px-1 py-4 sm:px-2 sm:py-5">
                <div data-flow-stage="question">
                  <p className="mb-2 text-xs font-medium text-[var(--o-text-secondary)]">{strings.askAiLabel}</p>
                  <h2 className="text-[1.25rem] leading-[1.45] font-medium tracking-tight text-pretty text-[var(--o-text)] sm:text-[1.4rem]">
                    <SourceExcerpt text={scene.question} locale={locale} />
                  </h2>
                </div>

                <div data-flow-stage="lookup" className="mt-4">
                  <p className="text-xs font-medium text-[var(--o-warm)]">{strings.consultWenlanLabel}</p>
                  <div className="home-consulted-page mt-2 rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] px-4 py-3" data-consulted-page>
                  <details data-knowledge-page className="group/wiki">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-[0.9375rem] font-medium leading-relaxed"><BookOpenIcon className="h-4 w-4 shrink-0 text-[var(--o-warm)]" /><span><SourceExcerpt text={scene.title} locale={locale} /></span></span>
                        <span className="mt-1 block text-xs leading-relaxed text-pretty text-[var(--o-text-secondary)]">{scene.sourceContext}</span>
                      </span>
                      <span className="inline-flex min-h-11 shrink-0 items-center gap-1 text-xs text-[var(--o-text-muted)] transition-colors duration-150 group-hover/wiki:text-[var(--o-warm)] group-open/wiki:text-[var(--o-warm)] motion-reduce:transition-none">
                        <span className="inline-grid whitespace-nowrap">
                          <span className="col-start-1 row-start-1 group-open/wiki:invisible">{strings.viewKnowledgeLabel}</span>
                          <span className="invisible col-start-1 row-start-1 group-open/wiki:visible">{strings.hideKnowledgeLabel}</span>
                        </span>
                        <ArrowRightIcon className="h-4 w-4 rotate-90 transition-transform duration-200 group-open/wiki:-rotate-90 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    <div className="mt-3 border-t border-[var(--o-border-subtle)] pb-3 pt-3" aria-label={`${strings.knowledgePageLabel}: ${scene.title}`}>
                      <p className="mt-1 text-sm leading-relaxed text-pretty text-[var(--o-text-secondary)]">{scene.knowledgeSummary.outcome}</p>
                      <dl className="mt-3 grid grid-cols-1 gap-x-3 gap-y-3 text-sm leading-relaxed sm:grid-cols-[fit-content(45%)_minmax(0,1fr)]">
                        {scene.knowledgeSummary.facts.map((fact) => (
                          <div key={fact.label} className="grid grid-cols-subgrid gap-y-1 sm:col-span-2">
                            <dt className="text-[var(--o-text-secondary)]">{fact.label}</dt>
                            <dd className="min-w-0 text-pretty text-[var(--o-text)]">
                              <SourceExcerpt text={fact.value.replace(/[.!?。！？]$/u, "")} locale={locale} />
                              {"\u2060"}
                              <sup className="whitespace-nowrap font-mono text-xs text-[var(--o-warm)]">
                                {fact.sources.map((sourceNumber) => {
                                  const source = scene.sources[sourceNumber - 1];
                                  const number = sourcesInCitationOrder(scene).findIndex((item) => item.id === source.id) + 1;
                                  const anchorId = sourceAnchorId(idPrefix, scene.id, source.id);
                                  return <a key={source.id} href={`#${anchorId}`} onClick={(event) => revealSource(event, anchorId)}
                                    className="rounded-sm px-px hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
                                    aria-label={`[${number}] ${strings.citationLabel}: ${source.label}`}>[{number}]</a>;
                                })}
                              </sup>
                              {fact.value.match(/[.!?。！？]$/u)?.[0]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-4 text-xs leading-relaxed text-pretty text-[var(--o-text-muted)]">{scene.knowledgeSummary.nextUpdate}</p>
                    </div>
                  </details>
                  <dl data-retrieved-facts className="mt-2 grid grid-cols-1 gap-x-3 gap-y-2 text-sm leading-relaxed min-[375px]:grid-cols-[fit-content(45%)_minmax(0,1fr)] min-[375px]:gap-y-1">
                    {scene.knowledgeSummary.facts.slice(0, 2).map((fact) => (
                      <div key={fact.label} className="grid grid-cols-subgrid gap-y-0.5 min-[375px]:col-span-2">
                        <dt className="text-xs leading-relaxed text-[var(--o-text-secondary)] sm:leading-[1.875]">{fact.label}</dt>
                        <dd className="min-w-0 text-pretty text-[var(--o-text)]">
                          <SourceExcerpt text={fact.value.replace(/[.!?。！？]$/u, "")} locale={locale} />
                          {"\u2060"}
                          <sup className="whitespace-nowrap font-mono text-xs text-[var(--o-warm)]">
                            {fact.sources.map((sourceNumber) => {
                              const source = scene.sources[sourceNumber - 1];
                              const number = sourcesInCitationOrder(scene).findIndex((item) => item.id === source.id) + 1;
                              const anchorId = sourceAnchorId(idPrefix, scene.id, source.id);
                              return <a key={source.id} href={`#${anchorId}`} onClick={(event) => revealSource(event, anchorId)}
                                className="rounded-sm px-px hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
                                aria-label={`[${number}] ${strings.citationLabel}: ${source.label}`}>[{number}]</a>;
                            })}
                          </sup>
                          {fact.value.match(/[.!?。！？]$/u)?.[0]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  </div>
                </div>

                <div data-flow-stage="answer" className="home-scenario-answer mt-4">
                  <p className="mb-2 text-xs font-medium text-[var(--o-text-secondary)]">{strings.aiAnswerLabel}</p>
                  <p className="text-sm leading-[1.7] text-pretty text-[var(--o-text)]">
                    <ScenarioAnswer scene={scene} locale={locale} idPrefix={idPrefix} citationLabel={strings.citationLabel} animate={selected} />
                  </p>
                </div>

                <details data-source-list className="mt-2 border-t border-[var(--o-border-subtle)]">
                  <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
                    {scene.sourcesLabel}
                    <span className="ml-2 font-mono text-xs text-[var(--o-text-muted)]">({scene.sources.length})</span>
                  </summary>
                  <p className="mb-2 text-sm leading-relaxed text-pretty text-[var(--o-text-muted)]">{scene.captured}</p>
                  <div className="home-scenario-sources">
                    {sourcesInCitationOrder(scene).map((source, sourceIndex) => {
                      const anchorId = sourceAnchorId(idPrefix, scene.id, source.id);
                      return (
                        <details
                          key={source.id}
                          onToggle={(event) => {
                            if (selected && event.currentTarget.open) trackAnalyticsEvent({ eventName: "source_expand", placement: "home-scenario", locale, context: "home", detail: scene.id });
                          }}
                          id={anchorId}
                          name={`${idPrefix}-${scene.id}-sources`}
                          className="home-scenario-source group scroll-mt-24 rounded-md px-2 transition-colors motion-reduce:transition-none"
                        >
                          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-sm text-[var(--o-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] [&::-webkit-details-marker]:hidden">
                            <span className="flex min-w-0 items-start gap-2">
                              <span className="pt-0.5 font-mono text-xs text-[var(--o-warm)]">[{sourceIndex + 1}]</span>
                              <span className="min-w-0">
                                <code className="break-words text-xs text-[var(--o-text)] sm:text-sm">{source.label}</code>
                                <span className="ml-2 inline-block text-xs text-[var(--o-text-muted)]">{source.detail}</span>
                              </span>
                            </span>
                            <span className="shrink-0 text-lg leading-none text-[var(--o-text-muted)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">
                              +
                            </span>
                          </summary>
                          <blockquote className="home-scenario-excerpt pb-4 pl-6 pr-2 text-sm leading-relaxed text-[var(--o-text-secondary)]">
                            <span className="mb-1 block text-xs text-[var(--o-warm)]">
                              {source.excerptLabel ?? strings.sourceExcerptLabel}
                            </span>
                            <SourceExcerpt text={source.excerpt} locale={locale} />
                            {source.url && <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-[var(--o-warm)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">
                              {strings.originalSourceLabel}
                            </a>}
                          </blockquote>
                        </details>
                      );
                    })}
                  </div>
                </details>

              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
