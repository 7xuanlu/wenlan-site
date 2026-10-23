"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/locales";
import { WikiReaderContent } from "./wiki-reader-content";
import { type KnowledgeNode } from "./knowledge-story-data";
import { knowledgeIds } from "./knowledge-story-ids";
import { knowledgeLanguage } from "./knowledge-story-library";
import { graphNodes, graphNodesEn, graphEdges as knowledgeEdges, graphPoints, graphPointsEn, communityRegions, researchBridges, uniqueGraphEdges, overviewEdgeKeys, graphEdgeKey, graphSeed, nodeRevealAt, edgeRevealAt, regionRevealAt, graphGrowthBeats, graphGrowthEnd, pathToProductDesign } from "./knowledge-graph-communities";

const labels = {
  "zh-TW": {
    library: "我的知識庫", assistant: "正在使用的 AI 助理", sample: "互動示範", sources: "從既有資料開始", sourceNote: "可接入的來源", keyword: "關鍵詞", semantic: "語義", graph: "關聯", matches: "找到相關脈絡", use: "帶進工作清單", used: "已帶入示範清單", output: "帶著依據，接著做", outputNote: "示範產出 · 可點開每項依據", inspect: "查看依據", close: "關閉內容", related: "相連的知識", replay: "重播連結生長", filter: "搜尋圖中的筆記或記憶", clear: "顯示全部", seed: "一則記憶", connect: "連到相關頁面", grow: "看見知識區域", hover: "滑過預覽、點選閱讀；＋可放大", captured: "查看原生 App 圖譜", evidence: "沿用實機素材，另加入研究筆記示例；群組與新增連結為示意，動畫非實際建立時間。", retrievalNote: "固定案例演示關鍵詞、語義與關聯的互補；非即時搜尋或 AI 執行紀錄。", topic: "主題", page: "頁面", memory: "記憶", file: "檔案", empty: "沒有符合的節點，試試「側欄」或「交接」。", context: "內容保留示範知識庫原文", material: "來源說明", zoom: "放大圖譜", reset: "縮放至完整圖譜", pdf: "可匯入含可擷取文字的 PDF。這組實機素材使用網址與 Markdown，未加入 PDF 範例。", obsidian: "接入既有 Obsidian 筆記庫作為唯讀來源，延續原本的筆記；不代表雙向同步。", url: "Agent Loop 引用了 W3C 的文字重排說明，可從正文回到原始網址。", markdown: "真實素材中的閱讀排版驗收清單。點開檔案，直接閱讀排版後的內容。", readFile: "閱讀驗收檔案", readWeb: "開啟原始網址", prompt: "從一個任務開始", detail: "閱讀內容", scope: "符合文字與直接相連的節點", result: "準備好的工作清單", ready: "選擇任務，看看哪些既有知識能派上用場。",
  },
  "zh-CN": {
    library: "我的知识库", assistant: "正在使用的 AI 助理", sample: "互动演示", sources: "从已有资料开始", sourceNote: "可接入的来源", keyword: "关键词", semantic: "语义", graph: "关联", matches: "找到相关背景", use: "带入工作清单", used: "已带入演示清单", output: "带着依据，接着做", outputNote: "示例产出 · 可点开每项依据", inspect: "查看依据", close: "关闭内容", related: "相连的知识", replay: "重播连接生长", filter: "搜索图中的笔记或记忆", clear: "显示全部", seed: "一则记忆", connect: "连到相关页面", grow: "看见知识区域", hover: "悬停预览、点击阅读；＋可放大", captured: "查看原生 App 图谱", evidence: "沿用实机素材，另加入研究笔记示例；群组与新增链接为示意，动画非实际建立时间。", retrievalNote: "固定案例演示关键词、语义与关联的互补；非实时搜索或 AI 执行记录。", topic: "主题", page: "页面", memory: "记忆", file: "文件", empty: "没有匹配的节点，试试「侧栏」或「交接」。", context: "内容保留示例知识库原文", material: "来源说明", zoom: "放大图谱", reset: "缩放至完整图谱", pdf: "可导入含可提取文字的 PDF。这组实机素材使用网址与 Markdown，未加入 PDF 示例。", obsidian: "接入已有 Obsidian 笔记库作为只读来源，延续原来的笔记；不代表双向同步。", url: "Agent Loop 引用了 W3C 的文字重排说明，可从正文回到原始网址。", markdown: "真实素材中的阅读排版验收清单。打开文件，直接阅读排版后的内容。", readFile: "阅读验收文件", readWeb: "打开原始网址", prompt: "从一个任务开始", detail: "阅读内容", scope: "匹配文字及直接相连的节点", result: "准备好的工作清单", ready: "选择任务，看看哪些已有知识能派上用场。",
  },
  en: {
    library: "My knowledge", assistant: "The AI assistant you use", sample: "Interactive example", sources: "Start with what you already have", sourceNote: "Supported sources", keyword: "Keywords", semantic: "Meaning", graph: "Connections", matches: "Find the context that matters", use: "Build the task checklist", used: "Added to this example", output: "Put that context to work", outputNote: "Example output · Open any supporting page", inspect: "View evidence", close: "Close reader", related: "Connected knowledge", replay: "Replay the connections", filter: "Find a page or memory in the graph", clear: "Show all", seed: "A saved memory", connect: "Connected pages", grow: "Areas of knowledge", hover: "Hover to preview. Select to read. + to zoom.", captured: "View the native App graph", evidence: "Product-demo material with authored research examples. Groups and added links are illustrative; animation does not show creation history.", retrievalNote: "A fixed example explains complementary search signals; this is not a live search or an AI execution trace.", topic: "Topic", page: "Page", memory: "Memory", file: "File", empty: "No matching nodes. Try “Agent” or “Claude”.", context: "Sample pages from the demo library.", material: "About this source", zoom: "Zoom into the graph", reset: "Fit the full graph", pdf: "Import PDFs with extractable text. This recorded library uses URLs and Markdown; it does not contain a PDF example.", obsidian: "Connect an existing Obsidian vault as a read-only source and keep using your notes. This is not two-way sync.", url: "Agent Loop cites W3C guidance on text reflow. Follow its reference back to the original URL.", markdown: "The reading-layout checklist from the real demo library. Open the file to read its formatted content.", readFile: "Read the checklist file", readWeb: "Open the original URL", prompt: "Start with a task", detail: "Read content", scope: "Text matches and their direct connections", result: "Your task checklist", ready: "Choose a task to see which existing knowledge can help.",
  },
};
// One graph view per language: same ids, edges and coordinates, different text.
const graphViews = {
  zh: { nodeById: new Map(graphNodes.map((node) => [node.id, node])), plotted: graphPoints },
  en: { nodeById: new Map(graphNodesEn.map((node) => [node.id, node])), plotted: graphPointsEn },
};
const clip = (body: string, length = 100) => body.replace(/^#+\s+.*$/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim().slice(0, length);
const nearby = (id: string) => [...new Set(knowledgeEdges.flatMap((edge) => edge.from === id ? [edge.to] : edge.to === id ? [edge.from] : []))];

function Reference({ node, onOpen, locale }: { node: KnowledgeNode; onOpen: (id: string) => void; locale: Locale }) {
  return <span className="ks-reference-wrap"><button type="button" className="ks-reference" onClick={() => onOpen(node.id)}><i data-kind={node.kind} />{node.title}</button><span className="ks-reference-preview" role="tooltip"><small>{labels[locale][node.kind]}</small><strong>{node.title}</strong><span>{clip(node.body)}</span></span></span>;
}
function ReaderDialog({ id, onClose, onSelect, locale, extraNode, extraNodeLabel }: { extraNode?: KnowledgeNode; extraNodeLabel?: string; id: string | null; onClose: () => void; onSelect: (id: string) => void; locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();
  const nodeById = graphViews[knowledgeLanguage(locale)].nodeById;
  const node = id ? nodeById.get(id) ?? (extraNode?.id === id ? extraNode : undefined) : undefined;
  useEffect(() => { if (node && !dialog.current?.open) dialog.current?.showModal(); else if (!node && dialog.current?.open) dialog.current.close(); }, [node]);
  return <dialog ref={dialog} className="ks-dialog knowledge-story" aria-labelledby={heading} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {node && <><header><span>{node.id === extraNode?.id ? extraNodeLabel ?? labels[locale][node.kind] : labels[locale][node.kind]}</span><button type="button" autoFocus aria-label={labels[locale].close} onClick={onClose}>×</button></header><div className="ks-dialog-body"><h3 id={heading}>{node.title}</h3><WikiReaderContent title={node.title} body={node.body} renderReference={(target, title) => nodeById.has(target) ? <Reference node={{ ...nodeById.get(target)!, title }} onOpen={onSelect} locale={locale} /> : <span>{title}</span>} /><div className="ks-related"><small>{labels[locale].related}</small>{nearby(node.id).map((target) => <Reference key={target} node={nodeById.get(target)!} onOpen={onSelect} locale={locale} />)}</div></div></>}
  </dialog>;
}

export { RetrievalWorkspace as RetrievalStory } from "./retrieval-workspace";

const pointViews = { zh: new Map(graphPoints.map(node => [node.id, node])), en: new Map(graphPointsEn.map(node => [node.id, node])) };
const left = 0, top = 0, width = 1200, height = 960;
const graphLabelLines = (title: string) => {
  if (/^[\x00-\x7F]+$/.test(title)) {
    // Latin titles break at spaces into short, balanced lines (at most three).
    if (title.length <= 16) return [title];
    const count = title.length > 34 ? 3 : 2, target = Math.ceil(title.length / count);
    const lines: string[] = [""];
    for (const word of title.split(" ")) {
      const last = lines[lines.length - 1];
      if (last && last.length + 1 + word.length > target && lines.length < count) lines.push(word);
      else lines[lines.length - 1] = last ? `${last} ${word}` : word;
    }
    return lines;
  }
  if (title.length <= 8) return [title];
  const split = Math.ceil(title.length / 2);
  return [title.slice(0, split), title.slice(split)];
};
const seed = graphSeed;
const growthBeats = graphGrowthBeats;
const restingNode = knowledgeIds.agentLoop;
const prominentIds: readonly string[] = [knowledgeIds.agentLoop, knowledgeIds.sources];
// The closing overview follows the note: decision, validation, then handoff.
const restingTargets = [knowledgeIds.principles, knowledgeIds.interfaceReview, knowledgeIds.handoff];
const restingEdges = new Set(restingTargets.map(to => graphEdgeKey({from:restingNode,to})));
const relationQuestion = (reason: string) => reason.match(/^.*?[？?]/)?.[0] ?? reason;
const relationDetail = (reason: string) => reason.replace(/^.*?[？?]\s*/, "");

const normalizeSearch = (value: string) => value.toLowerCase().replaceAll("侧", "側").replaceAll("栏", "欄").replaceAll("验", "驗").replaceAll("记", "記").replaceAll("忆", "憶").replaceAll("页", "頁").replaceAll("识", "識").replaceAll("阅", "閱").replaceAll("读", "讀").trim();

export function KnowledgeGraphStory({ locale }: { locale: Locale }) {
  const c = labels[locale];
  const { nodeById, plotted } = graphViews[knowledgeLanguage(locale)];
  const points = pointViews[knowledgeLanguage(locale)];
  const leadGroup = useId();
  const [selected, setSelected] = useState(seed);
  const [hovered, setHovered] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [play, setPlay] = useState(0);
  const [growthIndex, setGrowthIndex] = useState<number | null>(-1);
  const [exploring, setExploring] = useState(false);
  const [restingOverview, setRestingOverview] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [reader, setReader] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setPlay(1); observer.disconnect(); } }, { threshold: 0.3 }); if (root.current) observer.observe(root.current); return () => observer.disconnect(); }, []);
  useEffect(() => {
    if (!play || exploring) { setGrowthIndex(null); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSelected(restingNode); setGrowthIndex(null); setRestingOverview(true); setExploring(true); return; }
    setGrowthIndex(-1);
    const timers = growthBeats.map((beat,index)=>window.setTimeout(()=>{setGrowthIndex(index);setSelected(beat.edge.to);},beat.at));
    timers.push(window.setTimeout(()=>{setSelected(restingNode);setGrowthIndex(null);setRestingOverview(true);setExploring(true);},graphGrowthEnd));
    return ()=>timers.forEach(window.clearTimeout);
  },[play,exploring]);
  const growing = play>0 && !exploring && growthIndex!==null;
  const growthBeat = growing && growthIndex>=0 ? growthBeats[growthIndex] : null;
  const growthEdge = growthBeat?.edge ?? null;
  // Research pairs lead playback; the finished graph returns to Agent Loop.
  const storyBridge = growthEdge;
  const needle = normalizeSearch(query);
  const matched = new Set(plotted.filter((node) => needle && normalizeSearch(node.title + " " + node.body).includes(needle)).map((node) => node.id));
  const route = exploring && !restingOverview && !needle ? pathToProductDesign(selected) : [];
  const routeEndpoints = new Set(route.length ? [route.find(id=>points.get(id)?.kind==='topic'&&points.get(id)?.community===points.get(selected)?.community)!,route[route.length-1]] : []);
  const routeEdges = new Set(route.slice(1).map((to,index)=>graphEdgeKey({from:route[index],to})));
  const routeGroups = [...new Set(route.map(id=>points.get(id)!.community))].map(id=>communityRegions.find(group=>group.id===id)!);
  const routeBridges = route.slice(1).flatMap((to,index)=>researchBridges.filter(edge=>graphEdgeKey(edge)===graphEdgeKey({from:route[index],to})));
  const focusedId = restingOverview || route.length ? selected : hovered ?? selected;
  const focus = growing ? new Set(growthEdge?[growthEdge.from,growthEdge.to]:[seed]) : route.length ? new Set(route) : restingOverview ? new Set([restingNode,...restingTargets]) : storyBridge && !hovered ? new Set([storyBridge.from,storyBridge.to]) : needle ? new Set([...matched].flatMap((id) => [id, ...nearby(id)])) : new Set([focusedId, ...nearby(focusedId)]);
  const active = nodeById.get(selected)!;
  const leads = researchBridges.filter(edge=>edge.from===selected||edge.to===selected);
  const leadTargets = new Set(leads.map(edge=>edge.from===selected?edge.to:edge.from));
  const peek = hovered ? nodeById.get(hovered) : undefined;
  const viewBox = zoom ? `${points.get(selected)!.px - width * .27} ${points.get(selected)!.py - height * .3} ${width * .54} ${height * .6}` : `${left} ${top} ${width} ${height}`;
  const choose = (id: string) => { setRestingOverview(false); setExploring(true); setSelected(id); setHovered(null); setQuery(""); };
  return <figure data-product-media="graph" data-media-status="interactive" className="min-w-0">
    <div ref={root} className="knowledge-story ks-graph" data-graph-demo>
      <div className="ks-topbar"><span className="ks-mark">W</span><span>{c.library}</span><small>{c.sample}</small></div>
      <div className="ks-graph-toolbar"><label><span aria-hidden="true">⌕</span><input aria-label={c.filter} placeholder={c.filter} value={query} onChange={(event) => { setRestingOverview(false); setExploring(true); setQuery(event.target.value); }} /></label><button type="button" className="ks-text-button" onClick={() => { setZoom(false); setQuery(""); setSelected(seed); setHovered(null); setExploring(false); setRestingOverview(false); setGrowthIndex(-1); setPlay((value) => value + 1); }}>{c.replay} ↻</button></div>
      <div className="ks-graph-layout"><div className="ks-map"><div className="ks-legend">{(["page", "topic", "memory", "file"] as const).map((kind) => <span key={kind}><i data-kind={kind} />{c[kind]}</span>)}</div>
        <svg key={play} data-growing={growing} className={play && !exploring ? "ks-map-svg ks-growing" : "ks-map-svg"} viewBox={viewBox} aria-label={c.library} role="group">
          <g className="ks-communities" aria-hidden="true">{communityRegions.map(group => <g key={group.id} className="ks-community" data-route-endpoint={plotted.some(node=>node.community===group.id&&routeEndpoints.has(node.id))} style={{"--region-delay":`${regionRevealAt(group.id)}ms`} as CSSProperties} data-active={plotted.some(n=>n.community===group.id&&focus.has(n.id))}>
            <path d={group.path} pathLength="1"/>
            <text x={group.labelX} y={group.labelY} textAnchor="middle">{locale==='en'?group.en:locale==='zh-CN'?group.cn:group.title}</text>
          </g>)}</g>
          <g aria-hidden="true">{uniqueGraphEdges.map((edge, index) => { const a = points.get(edge.from)!; const b = points.get(edge.to)!; const on = growing ? !!growthEdge && graphEdgeKey(edge)===graphEdgeKey(growthEdge) : route.length ? routeEdges.has(graphEdgeKey(edge)) : restingOverview ? restingEdges.has(graphEdgeKey(edge)) : storyBridge && !hovered ? graphEdgeKey(edge)===graphEdgeKey(storyBridge) : needle ? focus.has(a.id) && focus.has(b.id) : a.id === focusedId || b.id === focusedId; if (!on && !(route.length && (a.id===selected||b.id===selected)) && !overviewEdgeKeys.has(graphEdgeKey(edge)) && !(growing && (a.id===seed||b.id===seed))) return null; const bend = Math.min(55, Math.hypot(b.px-a.px,b.py-a.py)*.09); const length = Math.hypot(b.px-a.px,b.py-a.py)||1; const cx=(a.px+b.px)/2-(b.py-a.py)/length*bend, cy=(a.py+b.py)/2+(b.px-a.px)/length*bend; return <path key={`${edge.from}-${edge.to}-${index}`} className="ks-edge" data-bridge={researchBridges.some(bridge=>graphEdgeKey(bridge)===graphEdgeKey(edge))} data-route={routeEdges.has(graphEdgeKey(edge))} data-membership={edge.kind==='about'} data-growing-active={growing&&on} data-active={on} data-muted={!on} data-from={edge.from} data-to={edge.to} d={nodeRevealAt(a.id)<=nodeRevealAt(b.id)?`M ${a.px} ${a.py} Q ${cx} ${cy} ${b.px} ${b.py}`:`M ${b.px} ${b.py} Q ${cx} ${cy} ${a.px} ${a.py}`} pathLength="1" style={{ "--delay": `${edgeRevealAt(edge)}ms` } as CSSProperties} />; })}</g>
          {plotted.map((node) => { const prominent = prominentIds.includes(node.id) || (node.id.startsWith("research-") && node.community!=="design"); const on = focus.has(node.id); return <g key={node.id} role="button" tabIndex={0} aria-label={`${c[node.kind]}${locale === "en" ? ": " : "："}${node.title}`} aria-pressed={selected === node.id} className="ks-node" data-kind={node.kind} data-route={route.includes(node.id)} data-route-endpoint={routeEndpoints.has(node.id)} data-selected={selected === node.id} data-neighbor={on} data-growing-active={growing&&on} data-prominent={prominent} data-muted={!on} style={{ "--delay": `${nodeRevealAt(node.id)}ms` } as CSSProperties} onClick={() => choose(node.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(node.id); } }} onMouseEnter={() => { if (!growing) setHovered(node.id); }} onMouseLeave={() => setHovered(null)} onFocus={() => { setExploring(true); setHovered(node.id); }} onBlur={() => setHovered(null)}>
            <circle className="ks-node-hit" cx={node.px} cy={node.py} r="23" /><circle className="ks-node-ring" cx={node.px} cy={node.py} r="19" /><circle className="ks-node-dot" cx={node.px} cy={node.py} r={node.kind === "memory" ? 7 : node.kind === "file" ? 8 : node.kind === "topic" ? 14 : 11} />
            {((node.kind !== "topic" || routeEndpoints.has(node.id)) && (routeEndpoints.has(node.id) || prominent || (growing && on) || (on && node.kind === "page") || selected === node.id || hovered === node.id || matched.has(node.id))) && <text x={node.px} y={node.py + 32} textAnchor="middle">{graphLabelLines(node.title).map((line, i) => <tspan key={i} x={node.px} dy={i ? 25 : 0}>{line}</tspan>)}</text>}
          </g>; })}
          {growthBeat && <foreignObject key={growthIndex} className="ks-growth-reason" x={growthBeat.caption.x-215} y={growthBeat.caption.y-22} width="430" height="90" aria-hidden="true"><div>{relationQuestion(growthBeat.edge.reason[locale])}</div></foreignObject>}
        </svg>
        {peek && <div className="ks-graph-peek" role="tooltip"><small>{c[peek.kind]}</small><strong>{peek.title}</strong><p>{clip(peek.body, 92)}</p></div>}
        <div className="ks-map-controls"><button type="button" aria-label={c.zoom} aria-pressed={zoom} onClick={() => { setExploring(true); setZoom(!zoom); }}>{locale === "en" ? "+" : "＋"}</button><button type="button" aria-label={c.reset} onClick={() => { setZoom(false); setQuery(""); }}>⤢</button></div>
        <div className="ks-map-note" aria-live="polite">{needle ? matched.size ? `${matched.size} · ${c.scope}` : c.empty : restingOverview ? (locale==="en"?"Select a node to see all its connections":locale==="zh-CN"?"点选节点，查看完整关系":"點選節點，查看完整關係") : c.hover}{needle && <button type="button" onClick={() => setQuery("")}>{c.clear}</button>}</div>
      </div><aside className="ks-inspector" aria-live="polite" data-story-focus={storyBridge ? graphEdgeKey(storyBridge) : undefined}>{play>0 && !exploring ? <div className="ks-growth-inspector">
        <small>{storyBridge ? (locale==='en'?'A shared research question':locale==='zh-CN'?'共同研究的问题':'共同研究的問題') : c.seed}</small>
        {storyBridge ? <><div className="ks-growth-pair"><Reference node={nodeById.get(storyBridge.from)!} onOpen={choose} locale={locale}/><span aria-hidden="true">↔</span><Reference node={nodeById.get(storyBridge.to)!} onOpen={choose} locale={locale}/></div><p>{relationDetail(storyBridge.reason[locale])}</p><small className="ks-example-note">{locale==='en'?'Research example · select a page to explore':locale==='zh-CN'?'研究示例 · 点选笔记查看':'研究示例 · 點選筆記查看'}</small></> : <><h3>{nodeById.get(seed)!.title}</h3><p>{clip(nodeById.get(seed)!.body,65)}</p></>}
      </div> : <><small><i data-kind={active.kind} />{c[active.kind]}</small><h3>{active.title}</h3>{active.id.startsWith("research-")&&<p className="ks-example-note">{locale==="en"?"Authored research example":locale==="zh-CN"?"研究笔记示例":"研究筆記示例"}</p>}{route.length>0&&<div className="ks-route-summary">
        <small>{locale==='en'?'Path to product design':locale==='zh-CN'?'连到产品设计':'連到產品設計'}</small>
        <nav aria-label={locale==='en'?'Connected knowledge areas':locale==='zh-CN'?'相连的知识区域':'相連的知識區域'}>{routeGroups.map((group,index)=><span key={group.id}>{index>0&&<i aria-hidden="true">→</i>}<button type="button" onClick={()=>choose(group.topicId)}>{locale==='en'?group.en:locale==='zh-CN'?group.cn:group.title}</button></span>)}</nav>
        <details key={selected}><summary>{locale==='en'?'Why these connections?':locale==='zh-CN'?'查看沿途关联':'查看沿途關聯'}</summary><p>{locale==='en'?'Dashed: within a topic. Solid: a shared research question, not a causal claim.':locale==='zh-CN'?'虚线是同主题内的延伸；实线是共同研究问题，不代表因果。':'虛線是同主題內的延伸；實線是共同研究問題，不代表因果。'}</p><ol>{routeBridges.map(edge=><li key={graphEdgeKey(edge)}><div><Reference node={nodeById.get(edge.from)!} onOpen={choose} locale={locale}/><span aria-hidden="true"> ↔ </span><Reference node={nodeById.get(edge.to)!} onOpen={choose} locale={locale}/></div><p>{edge.reason[locale]}</p></li>)}</ol></details>
      </div>}<div className="ks-inspector-body"><WikiReaderContent title={active.title} body={active.body} renderReference={(id, title) => nodeById.has(id) ? <Reference node={{ ...nodeById.get(id)!, title }} onOpen={choose} locale={locale} /> : <span>{title}</span>} /></div><button type="button" className="ks-text-button" onClick={() => setReader(active.id)}>{c.detail} ↗</button>{leads.length>0&&!route.length&&<div className="ks-research-leads"><small>{locale==="en"?"Across disciplines · questions to explore":locale==="zh-CN"?"跨学科线索 · 待查证":"跨學科線索 · 待查證"}</small>{leads.map(edge=>{const target=edge.from===selected?edge.to:edge.from;return <details key={`${selected}-${target}`} name={leadGroup}><summary><span>{edge.summary[locale]}</span><small>{nodeById.get(target)!.title}</small></summary><div><p>{edge.reason[locale]}</p><Reference node={nodeById.get(target)!} onOpen={choose} locale={locale}/></div></details>;})}</div>}<div className="ks-related"><small>{c.related}</small>{(restingOverview ? restingTargets : nearby(active.id).filter(id=>!leadTargets.has(id)).slice(0, 6)).map((id) => <Reference key={id} node={nodeById.get(id)!} onOpen={choose} locale={locale} />)}</div></>}</aside></div>
      <div className="ks-growth-caption"><span><b>01</b>{c.seed}</span><span aria-hidden="true">→</span><span><b>02</b>{c.connect}</span><span aria-hidden="true">→</span><span><b>03</b>{c.grow}</span></div>
    </div><figcaption className="ks-caption">{c.evidence} {locale !== "zh-TW" && c.context}<a href="/images/home/personal-knowledge/kb-native-v10.png" target="_blank" rel="noopener noreferrer">{c.captured} ↗</a></figcaption>
    <ReaderDialog id={reader} onClose={() => setReader(null)} onSelect={setReader} locale={locale} />
  </figure>;
}
