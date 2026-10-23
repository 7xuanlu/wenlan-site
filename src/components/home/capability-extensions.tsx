"use client";

import { useId, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { ClaudeBrandIcon, OpenAiBrandIcon, ShieldCheckIcon } from "@/components/icons";
import { EvidenceImage } from "./evidence-image";
import { WorkflowHelp } from "./workflow-help";
import { topicContextIcons } from "./topic-context-icons";
import { topicContexts } from "./topic-context-data";

// The graph is an authored capability illustration based on the native sidebar.
// The separate App reference retains the original, smaller captured example library.
// Web Access remains an explanatory illustration, not a live connection.
const copyByLocale = {
  en: {
    topic: {"caption": "Example library", "expand": "App reference", "path": "Genes and evolution contains Natural selection and Gene variants. Natural selection links to Selection chapter under On the Origin of Species. AI development separately gathers Agent Loop and RAG retrieval.", "names": ["Genes & evolution", "AI development", "Origin of Species"], "pages": [["Natural selection", "Gene variants"], ["Agent Loop", "RAG retrieval"], ["Selection chapter", "Common descent"]], "alts": ["Native Wenlan topic inspector for Genes and evolution, containing Natural selection and Gene variants. Authored Traditional Chinese example library.", "Native Wenlan topic inspector for AI development, containing Agent Loop and RAG retrieval. Authored Traditional Chinese example library.", "Native Wenlan topic inspector for On the Origin of Species, containing Selection chapter and Common descent. Authored Traditional Chinese example library."]},
    web: { browser: "Web AI", permission: "With your permission", computer: "Your computer", details: "Access scope", note: "Your computer must stay online. Only the Space you approve is shared, and an app can write only if you allow it; you can revoke access in Wenlan. Queries, results, and writes pass through the relay and the connected AI provider.", link: "Set up Web Access", label: "Connection illustration: supported web AI clients access one approved Wenlan Space on your connected computer." },
  },
  "zh-TW": {
    topic: {"caption": "示例知識庫", "expand": "實機參考", "path": "基因與演化聚合自然選擇、基因變異；自然選擇連到《物種起源》的自然選擇章筆記。AI 開發則聚合 Agent Loop 與 RAG 檢索，保留獨立的研究脈絡。", "names": ["基因與演化", "AI 開發", "《物種起源》"], "pages": [["自然選擇", "基因變異"], ["Agent Loop", "RAG 檢索"], ["自然選擇章", "共同祖先"]], "alts": ["文瀾原生基因與演化主題：自然選擇與基因變異。內容為手動建立的示例筆記。", "文瀾原生 AI 開發主題：Agent Loop 與 RAG 檢索。內容為手動建立的示例筆記。", "文瀾原生《物種起源》主題：自然選擇章與共同祖先。內容為手動建立的示例讀書筆記。"]},
    web: { browser: "網頁 AI", permission: "經你授權", computer: "你的電腦", details: "存取範圍", note: "使用時電腦須保持在線。只開放你授權的 Space，經你允許才可寫入，可隨時在 Wenlan 撤銷。查詢、結果與寫入內容會經過中繼服務及連接的 AI 服務商。", link: "查看連接方式", label: "連線示意：支援的網頁 AI 透過授權，查閱在線電腦中指定的 Wenlan Space。" },
  },
  "zh-CN": {
    topic: {"caption": "示例知识库", "expand": "实机参考", "path": "基因与演化聚合自然选择、基因变异；自然选择连到《物种起源》的自然选择章笔记。AI 开发则聚合 Agent Loop 与 RAG 检索，保留独立的研究脉络。", "names": ["基因与演化", "AI 开发", "《物种起源》"], "pages": [["自然选择", "基因变异"], ["Agent Loop", "RAG 检索"], ["自然选择章", "共同祖先"]], "alts": ["文澜原生基因与演化主题（繁体中文）：自然选择与基因变异。内容为手动建立的示例笔记。", "文澜原生 AI 开发主题（繁体中文）：Agent Loop 与 RAG 检索。内容为手动建立的示例笔记。", "文澜原生《物种起源》主题（繁体中文）：自然选择章与共同祖先。内容为手动建立的示例读书笔记。"]},
    web: { browser: "网页 AI", permission: "经你授权", computer: "你的电脑", details: "访问范围", note: "使用时电脑须保持在线。只开放你授权的 Space，经你允许才可写入，可随时在 Wenlan 撤销。查询、结果与写入内容会经过中继服务及连接的 AI 服务商。", link: "查看连接方式", label: "连接示意：支持的网页 AI 通过授权，查阅在线电脑中指定的 Wenlan Space。" },
  },
} as const;

const topicGroups = ["biology", "development", "book"] as const;

function ContextIcon({ name }: { name: keyof typeof topicContextIcons }) {
  return <svg className="wc-topicFocusIcon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    {topicContextIcons[name].map((d, index) => <path key={index} d={d} />)}
  </svg>;
}

// Five related items make each subject legible without turning the card into a list.
// Native semantic icons and restrained type colors carry the hierarchy.
export function TopicOverviewArtifact({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale].topic;
  const relationId = useId();
  const [topic, setTopic] = useState<typeof topicGroups[number]>("book");
  const [focused, setFocused] = useState<string | null>(null);
  const languageIndex = locale === "en" ? 0 : locale === "zh-TW" ? 1 : 2;
  const neighbors = topicContexts[topic];
  const activeIndex = topicGroups.indexOf(topic);
  const positions = [{ x: 50, y: 12 }, { x: 82, y: 34 }, { x: 74, y: 79 }, { x: 26, y: 79 }, { x: 18, y: 34 }];
  const chooseLabel = locale === "en" ? "Explore a topic" : locale === "zh-TW" ? "查看主題" : "查看主题";
  const topicLabels = locale === "en" ? ["Evolution", "AI development", "Reading"] : locale === "zh-TW" ? ["演化", "AI 開發", "閱讀"] : ["演化", "AI 开发", "阅读"];
  const selectedNode = neighbors.find((node) => node.id === focused);
  const changeTopic = (index: number) => { setTopic(topicGroups[index]); setFocused(null); };
  const description = locale === "en" ? "Illustrative topic context. Select a related item to see its role; the App reference shows the original captured library." : locale === "zh-TW" ? "主題脈絡示意。點選相關內容查看它的角色；實機參考保留原始截圖資料。" : "主题背景示意。点选相关内容查看它的角色；实机参考保留原始截图资料。";

  return <div className="wc-topicOverview wc-withFooter" lang={locale}>
    <p id={relationId} className="sr-only">{description}</p>
    <div className="wc-artifactBody">
    <div className="wc-topicFocus" data-focused={focused !== null} role="group" aria-describedby={relationId} aria-label={copy.names[activeIndex]}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {neighbors.map((node, index) => <line key={`${topic}-${node.id}`} data-tone={node.tone} data-active={focused === node.id}
          x1="50" y1="50" x2={positions[index].x} y2={positions[index].y} />)}
      </svg>
      <div className="wc-topicFocusCenter" key={topic} data-tone={topic === "book" ? "source" : topic === "development" ? "tool" : "concept"}>
        <ContextIcon name={topic === "book" ? "BookOpen" : topic === "development" ? "Shapes" : "Lightbulb"} />
        <span className="wc-topicFocusTitle" aria-live="polite">{copy.names[activeIndex]}</span>
        <span className="wc-topicNodeRole" aria-live="polite">{selectedNode?.relation[languageIndex]}</span>
      </div>
      {neighbors.map((node, index) => <button type="button" key={`${topic}-${node.id}`} data-tone={node.tone}
        data-active={focused === node.id} aria-pressed={focused === node.id}
        className="wc-topicFocusNode" style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
        onClick={() => setFocused((value) => value === node.id ? null : node.id)} aria-label={`${node.label[languageIndex]} · ${node.relation[languageIndex]}`}>
        <ContextIcon name={node.icon} />
        <span className="wc-topicNodeName">{node.label[languageIndex]}</span>
      </button>)}
    </div>
      <div className="wc-topicSwitcher" role="group" aria-label={chooseLabel}>
        {([2, 0, 1] as const).map((index) => <button type="button" key={topicGroups[index]}
          onClick={() => changeTopic(index)} aria-pressed={activeIndex === index}
          aria-label={copy.names[index]} title={copy.names[index]}>
          {topicLabels[index]}
        </button>)}
      </div>
    </div>
      <div className="wc-artifactFooter wc-topicOriginal">
      <EvidenceImage src={`/images/home/capabilities/topic-${topic}-native.jpg`}
        width={1280} height={720} locale={locale} alt={copy.alts[activeIndex]}
        caption={copy.expand} expandLabel={copy.expand} showCaption={false} showExpandAction={false}
        mobileZoomWidth={1280} detailZoomWidth={1280}
        preview={<span className="wc-topicOriginalLabel">{copy.expand}<span aria-hidden="true">↗</span></span>} />
      </div>
  </div>;
}

export function WebAccessArtifact({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale].web;
  return <div className="wc-webAccess wc-withFooter">
    <div className="wc-artifactBody">
      <div className="wc-webConnection" role="group" aria-label={copy.label}>
        <div className="wc-webBrowser">
          <div className="wc-webBrowserLabel">{copy.browser}</div>
          <div className="wc-webClients"><span><OpenAiBrandIcon className="wc-brand" />ChatGPT</span><span><ClaudeBrandIcon className="wc-brand" />Claude</span></div>
        </div>
        <div className="wc-webBridge">
          <i aria-hidden="true" />
          <div className="wc-webPermission">
            <ShieldCheckIcon className="wc-icon" />
            <WorkflowHelp name={copy.permission} label={`${copy.permission} · ${copy.details}`}>{copy.note}</WorkflowHelp>
          </div>
          <i aria-hidden="true" />
        </div>
        <div className="wc-webComputer">
          <div className="wc-webDevice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2" /><path d="M9 21h6M12 16v5" /></svg>
            <span>{copy.computer}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="wc-artifactFooter">
      <LocalizedLink className="wc-detailLink" href="/docs/mcp-clients" locale={locale}>{copy.link}<span aria-hidden="true">↗</span></LocalizedLink>
    </div>
  </div>;
}
