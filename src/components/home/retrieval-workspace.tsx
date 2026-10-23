"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import Image from "next/image";
import { ClaudeBrandIcon } from "@/components/icons";
import { ShellIcon } from "./wiki-demo-shell";
import { baselineDuration, BaselineOutcome, RetrievalOutcome } from "./retrieval-outcome";
import { WikiReaderContent } from "./wiki-reader-content";
import { knowledgeEdges, type KnowledgeNode } from "./knowledge-story-data";
import { knowledgeIds, knowledgeLanguage, knowledgeNodeIndexes, type KnowledgeLanguage } from "./knowledge-story-library";

const excerpt = (body: string) => body.replace(/^#+.*$/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\n+/g, " ").trim();
const ui = {
  "zh-TW": { tab:"搜尋與回答", library:"我的知識庫", tasks:"從一個問題開始", cases:["閱讀介面驗收", "接續 AI 的工作"], found:"這次用到的資料", all:"全部", keyword:"關鍵詞", semantic:"語義", graph:"Graph 關聯", results:"找到能接著用的知識", query:"你想知道的", matches:"在原文中找到相同字詞", same:"不同說法，相同意思", connected:"沿著知識之間的連結", original:"筆記原句", asked:"你的說法", open:"閱讀完整內容", back:"返回檢索結果", answer:"帶進 AI 的回答", with:"使用我的知識", without:"一般回答", based:"已帶入的依據", use:"採用這項依據", unused:"加入依據", used:"已採用", none:"選擇左側的依據，看看回答如何變得具體。", trace:"點引用回到原文", preview:"引用預覽", link:"已有連結", note:"以真實示範知識庫重現互動。回答與檢索結果為固定示例，非即時 AI 或成效實測。", queryValues:["側欄開關時，閱讀位置不要跳動。", "換一個 AI，怎麼接著做、不重講背景？"], keywords:["側欄", "換行"], handoffWords:["交接", "決定"], mapHint:"點選圓點，沿連結查看相關知識", noSearch:"不必從頭交代背景。每個建議，都能回到你的原文。", kind:{page:"頁面", memory:"記憶", file:"檔案", topic:"主題"}, baseline:["可以調整正文與側欄寬度，讓閱讀更順暢，再檢查不同視窗下的效果。", "整理目前進度與待辦事項，交給下一個 AI 繼續處理。"], intro:["按照你留下的排版決定，我會這樣驗收：", "下一個 AI 可以從你已經留下的決定接著做："], steps:[["開關側欄，確認正文左側起點不變；再縮窄視窗，檢查引用預覽。", "保留正在閱讀的位置，讓右側縮窄、文字自然換行。", "同步檢查 Memory、Topic、Wiki 與 Sources，共用字體、行距和正文容器。"],["先讀取目前採用的決定，附上原始資料與未完成事項。", "保留尚未解決的問題，以及下一個可直接開始的動作。", "保留原始網址、檔名與擷取日期，讓每項判斷都能查回依據。"]] },
  "zh-CN": { tab:"搜索与回答", library:"我的知识库", tasks:"从一个问题开始", cases:["阅读界面验收", "接续 AI 的工作"], found:"这次用到的资料", all:"全部", keyword:"关键词", semantic:"语义", graph:"Graph 关联", results:"找到能接着用的知识", query:"你想知道的", matches:"在原文中找到相同词语", same:"不同说法，相同意思", connected:"沿着知识之间的链接", original:"笔记原句", asked:"你的说法", open:"阅读完整内容", back:"返回检索结果", answer:"带入 AI 的回答", with:"使用我的知识", without:"一般回答", based:"已带入的依据", use:"采用这项依据", unused:"加入依据", used:"已采用", none:"选择左侧的依据，看看回答如何变得具体。", trace:"点引用回到原文", preview:"引用预览", link:"已有链接", note:"以真实示例知识库重现互动。回答与检索结果为固定示例，非实时 AI 或效果实测。", queryValues:["侧栏开关时，阅读位置不要跳动。", "换一个 AI，怎么接着做、不重讲背景？"], keywords:["側欄", "換行"], handoffWords:["交接", "決定"], mapHint:"点击圆点，沿链接查看相关知识", noSearch:"不必从头交代背景。每个建议，都能回到你的原文。", kind:{page:"页面", memory:"记忆", file:"文件", topic:"主题"}, baseline:["可以调整正文与侧栏宽度，让阅读更顺畅，再检查不同窗口下的效果。", "整理当前进度与待办事项，交给下一个 AI 继续处理。"], intro:["按照你留下的排版决定，我会这样验收：", "下一个 AI 可以从你已经留下的决定接着做："], steps:[["开关侧栏，确认正文左侧起点不变；再缩窄窗口，检查引用预览。", "保留正在阅读的位置，让右侧缩窄、文字自然换行。", "同步检查 Memory、Topic、Wiki 与 Sources，共用字体、行距和正文容器。"],["先读取当前采用的决定，附上原始资料与未完成事项。", "保留尚未解决的问题，以及下一个可直接开始的动作。", "保留原始网址、文件名与提取日期，让每项判断都能查回依据。"]] },
  en: { tab:"Search & answer", library:"My knowledge", tasks:"Start with a question", cases:["Reading acceptance", "Continue with another AI"], found:"Sources for this task", all:"All", keyword:"Keyword", semantic:"Semantic", graph:"Graph", results:"Find knowledge you can use", query:"Your question", matches:"The same words, in the original", same:"Different words. The same idea.", connected:"Follow connections in your knowledge", original:"From your note", asked:"Your words", open:"Read full content", back:"Back to search results", answer:"Context for your AI", with:"With my knowledge", without:"General answer", based:"Supporting context", use:"Use this source", unused:"Use source", used:"Included", none:"Select supporting sources to make this answer specific.", trace:"Follow any citation to its source", preview:"Citation preview", link:"Existing link", note:"Interactive recreation of a real demo library, shown in English. Answers and retrieval results are fixed examples, not live AI or measured improvements.", queryValues:["Keep my reading position steady when the sidebar opens.", "How can another AI continue without starting over?"], keywords:["sidebar", "wrapping"], handoffWords:["handoff", "decision"], mapHint:"Select a node to follow its connections", noSearch:"Less background to repeat. Each suggestion leads back to your own words.", kind:{page:"Page", memory:"Memory", file:"File", topic:"Topic"}, baseline:["Adjust the article and sidebar widths for easier reading, then test at different window sizes.", "Summarize your progress and remaining tasks, then pass them to the next AI."], intro:["Your saved layout decisions make the acceptance criteria specific:", "The next AI can continue from the decisions you already saved:"], steps:[["Toggle the sidebar, keep the reading origin fixed, and check citation previews in a narrow window.", "Keep your reading position steady while the right side narrows and the text reflows.", "Check Memory, Topic, Wiki, and Sources together: they share typography, spacing, and the reading container."],["Read the current decisions, original sources, and unfinished work first.", "Keep the open questions and the next actionable step in the handoff.", "Preserve original URLs, filenames, and capture dates so decisions remain traceable."]] },
};
// Scenarios pick their sources by id, so the same walkthrough runs on the
// Traditional Chinese library and on its English rendering.
const scenarioIds = [
  { evidence: [knowledgeIds.fileReadingReview, knowledgeIds.memNarrow, knowledgeIds.memContainer], center: knowledgeIds.agentLoop, other: knowledgeIds.principles, leaf: knowledgeIds.handoff },
  { evidence: [knowledgeIds.aiChecklist, knowledgeIds.memHandoff, knowledgeIds.sources], center: knowledgeIds.aiChecklist, other: knowledgeIds.taskBreakdown, leaf: knowledgeIds.handoff },
];
// phrase: how the person words it; matching: the sentence in the source that
// carries the same meaning; keywordBody: the passage shown for the keyword lane.
// The English keywords and handoffWords in `ui` occur in these passages.
const scenarioText: Record<KnowledgeLanguage, { phrase: string; matching: string; keywordBody: string[] }[]> = {
  zh: [
    { phrase:"閱讀位置不要跳動", matching:"正文的左側起點保持不變", keywordBody:["開關右側欄，正文的左側起點保持不變。", "在 Memory、Topic、Wiki、Sources 分別檢查字體、行距與換行。", "將視窗縮窄，再確認引用預覽沒有遮住閱讀中的段落。"] },
    { phrase:"接著做、不重講背景", matching:"下一個可直接開始的動作", keywordBody:["換一個 AI 工具，仍然能接著同一件工作。交接時先寫下目前採用的決定，再附上原始資料與未完成事項。"] },
  ],
  en: [
    { phrase:"keep my reading position steady", matching:"the article's left edge stays put", keywordBody:["Open and close the right sidebar; the article's left edge stays put.", "Check typography, line spacing, and wrapping in Memory, Topic, Wiki, and Sources.", "Narrow the window, then confirm the citation preview doesn't cover the paragraph being read."] },
    { phrase:"continue without starting over", matching:"a next step you can start on right away", keywordBody:["Switch to a different AI tool and still pick up the same work. In the handoff, write down the decision currently in use first, then attach the source material and the unfinished items."] },
  ],
};
const buildScenarios = (language: KnowledgeLanguage) => {
  const byId = knowledgeNodeIndexes[language];
  const get = (id: string) => byId.get(id)!;
  return scenarioIds.map((scenario, index) => ({ evidence: scenario.evidence.map(get), center: get(scenario.center), other: get(scenario.other), leaf: get(scenario.leaf), ...scenarioText[language][index] }));
};
const scenarioSets = { zh: buildScenarios("zh"), en: buildScenarios("en") };
// The reading-review file shows its file name; the reader strips the repeated
// first heading, which the sibling source record carries as its title.
const readingFileName: Record<KnowledgeLanguage, string> = { zh: "閱讀排版驗收.md", en: "reading-review.md" };
const titleOfFor = (language: KnowledgeLanguage) => (node: KnowledgeNode) => node.id === knowledgeIds.fileReadingReview ? readingFileName[language] : node.title;
const readerTitleFor = (language: KnowledgeLanguage) => (node: KnowledgeNode) => node.id === knowledgeIds.fileReadingReview ? knowledgeNodeIndexes[language].get(knowledgeIds.fileLayoutReview)!.title : node.title;
function Marked({ text, words, tone = "keyword" }: { text: string; words: string[]; tone?: string }) {
  // Latin words match whole words, ignoring case; CJK words match as written.
  const escaped = words.map(w => `${/^\w/.test(w) ? "\\b" : ""}${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${/\w$/.test(w) ? "\\b" : ""}`).join("|");
  const lower = new Set(words.map(w => w.toLowerCase()));
  return <>{text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) => lower.has(part.toLowerCase()) ? <mark key={i} className={`rw-mark-${tone}`}>{part}</mark> : part)}</>;
}
function SourceIcon({kind}: {kind:KnowledgeNode["kind"]}) { return <ShellIcon name={kind === "memory" ? "memories" : kind === "topic" ? "topics" : kind === "file" ? "sources" : "wiki"} />; }
function NodeMap({task, selected, onSelect, locale, tracing}: {task:number;selected:KnowledgeNode;onSelect:(n:KnowledgeNode, origin:HTMLElement)=>void;locale:Locale;tracing:boolean}) {
  const language=knowledgeLanguage(locale), scenarios=scenarioSets[language], byId=knowledgeNodeIndexes[language], titleOf=titleOfFor(language);
  const d=scenarios[task], c=ui[locale];
  const nodes=task===0 ? [d.evidence[0],d.center,d.other,d.evidence[2],d.leaf] : [d.evidence[1],d.center,d.other,d.evidence[2],d.leaf];
  const positions=[[12,43],[45,40],[77,14],[82,68],[34,78]];
  const ids=new Set(nodes.map(n=>n.id));
  const seen=new Set<string>();
  const edges=knowledgeEdges.filter(e=>{const key=[e.from,e.to].sort().join('|');if(!ids.has(e.from)||!ids.has(e.to)||seen.has(key))return false;seen.add(key);return true;});
  const queue: string[][]=[[nodes[0].id]], visited=new Set<string>(); let path:string[]=[];
  while(queue.length){const route=queue.shift()!,last=route.at(-1)!; if(last===selected.id){path=route;break;} if(visited.has(last))continue;visited.add(last);for(const edge of edges){const next=edge.from===last?edge.to:edge.to===last?edge.from:null;if(next&&!visited.has(next))queue.push([...route,next]);}}
  return <div className="rw-map-block" data-tracing={tracing}><div className="rw-map" aria-label={c.graph}>
    <svg viewBox="0 0 500 205" preserveAspectRatio="none" aria-hidden="true">{edges.map(e=>{const a=positions[nodes.findIndex(n=>n.id===e.from)],b=positions[nodes.findIndex(n=>n.id===e.to)]; const active=path.some((id,i)=>i<path.length-1&&((id===e.from&&path[i+1]===e.to)||(id===e.to&&path[i+1]===e.from)));return <line key={e.from+e.to} x1={a[0]*5} y1={a[1]*2.05} x2={b[0]*5} y2={b[1]*2.05} data-active={active} vectorEffect="non-scaling-stroke"/>;})}</svg>
    {nodes.map((node,i)=><button key={node.id} type="button" aria-label={`${c.kind[node.kind]}: ${titleOf(node)}`} aria-pressed={selected.id===node.id} className="rw-node" data-kind={node.kind} data-on-path={path.includes(node.id)} style={{left:`${positions[i][0]}%`,top:`${positions[i][1]}%`}} onClick={(event)=>onSelect(node,event.currentTarget)}><span className="rw-dot"/><span>{titleOf(node)}</span><span className="rw-node-preview" role="tooltip">{excerpt(node.body).slice(0,110)}</span></button>)}
    </div><div className="rw-path">{path.map((id,i)=><span key={id}>{i>0&&<b>›</b>}<button type="button" onClick={(event)=>onSelect(byId.get(id)!,event.currentTarget)}>{titleOf(byId.get(id)!)}</button></span>)}</div></div>;
}

const traceCopy = {
  "zh-TW": {hint:"點選原文片段或圖譜圓點，看它對應哪一段回答。", answer:"對應回答", more:"延伸脈絡 · 尚未作為回答依據", excluded:"這項依據尚未採用", view:"查看對應回答", from:"查看這段回答的依據"},
  "zh-CN": {hint:"点击原文片段或图谱圆点，看它对应哪一段回答。", answer:"对应回答", more:"延伸背景 · 尚未作为回答依据", excluded:"这项依据尚未采用", view:"查看对应回答", from:"查看这段回答的依据"},
  en: {hint:"Select a passage or graph node to follow it into the answer.", answer:"Answer passage", more:"Related context · not used in this answer", excluded:"This source is not included", view:"View the matching answer", from:"Trace this answer to its source"},
};

const assistantCopy = {
  "zh-TW": {
    demo:"對話示意", before:"未接入文瀾", after:"接上文瀾", read:"已查閱相關資料", context:"文瀾帶回的依據", connected:"已連接文瀾", disconnected:"尚未連接文瀾", connect:"讓文瀾補齊背景", next:["試試工作交接","試試閱讀驗收"], missing:"缺少已定下的背景", ready:"點左側依據，看它如何進入回答。",
    baseline:["讓正文隨側欄一起重新置中，再調整目前頁面的寬度。", "開一個新對話，重新說明專案背景，再列出所有待辦事項。"],
    gap:["漏掉了「正文起點不動」，也沒有一起檢查其他頁面。", "沒有接上已採用的決定、未解問題與下一步。"],
    caption:"Claude 介面、前後回答與互動成果為情境示意，非實測紀錄。文瀾素材來自真實示範知識庫；點引用可查看原文。",
  },
  "zh-CN": {
    demo:"对话示意", before:"未接入文澜", after:"接入文澜", read:"已查阅相关资料", context:"文澜带回的依据", connected:"已连接文澜", disconnected:"尚未连接文澜", connect:"让文澜补齐背景", next:["试试工作交接","试试阅读验收"], missing:"缺少已确定的背景", ready:"点击左侧依据，看它如何进入回答。",
    baseline:["让正文随侧栏一起重新居中，再调整当前页面的宽度。", "开一个新对话，重新说明项目背景，再列出所有待办事项。"],
    gap:["漏掉了“正文起点不动”，也没有一起检查其他页面。", "没有接上已采用的决定、未解决的问题与下一步。"],
    caption:"Claude 界面、前后回答与交互成果为场景示意，并非实测记录。文澜素材来自真实示例知识库；点击引用可查看原文。",
  },
  en: {
    demo:"Illustrative chat", before:"Without Wenlan", after:"With Wenlan", read:"Reviewed related material", context:"Context from Wenlan", connected:"Wenlan connected", disconnected:"Wenlan not connected", connect:"Bring in my knowledge", next:["Try a work handoff","Try a reading review"], missing:"A decision is missing", ready:"Select a source on the left to follow it into the answer.",
    baseline:["Recenter the article when the sidebar opens, then adjust the current page’s width.", "Start a new chat, explain the project background again, and list all outstanding tasks."],
    gap:["Misses the fixed reading origin and checks only one page.", "Misses your current decisions, open questions, and next action."],
    caption:"Illustrative Claude interface, answers, and interactive outcomes, not a measured test. Wenlan sources come from a real demo library; follow citations to inspect them.",
  },
};


const playbackCopy = {
  "zh-TW": {play:"播放流程",pause:"暫停",paused:"已暫停",resume:"繼續播放",replay:"重播流程",waiting:"從一次提問開始",reading:"正在查看這次對話",thinking:"正在查看這次對話…",connecting:"正在接上文瀾，找回已留下的決定…",connectionContext:"帶入你已留下的決定與依據",previous:"初次回答漏掉了什麼？",steps:["查看對話","背景待補","接上文瀾","依據做成成果"], phases:["正在查看對話","正在確認背景","草稿 · 等待補充背景","正在接上文瀾","關鍵詞 · 找到原文","語義 · 補上原意","Graph · 補齊關聯","成果已完成，可以操作"]},
  "zh-CN": {play:"播放流程",pause:"暂停",paused:"已暂停",resume:"继续播放",replay:"重播流程",waiting:"从一次提问开始",reading:"正在查看这次对话",thinking:"正在查看这次对话…",connecting:"正在接入文澜，找回已保存的决定…",connectionContext:"带入你已保存的决定与依据",previous:"初次回答漏掉了什么？",steps:["查看对话","背景待补","接入文澜","依据做成成果"],phases:["正在查看对话","正在确认背景","草稿 · 等待补充背景","正在接入文澜","关键词 · 找到原文","语义 · 补上原意","Graph · 补齐关联","成果已完成，可以操作"]},
  en: {play:"Play walkthrough",pause:"Pause",paused:"Paused",resume:"Resume",replay:"Replay",waiting:"Start with a question",reading:"Reviewing this conversation",thinking:"Reviewing this conversation…",connecting:"Connecting Wenlan to retrieve your saved decisions…",connectionContext:"Bringing in your saved decisions and sources",previous:"What did the first answer miss?",steps:["Review chat","Missing context","Connect Wenlan","Build with sources"],phases:["Reviewing this conversation","Checking the available context","Draft · waiting for context","Connecting Wenlan","Keyword · original passage","Semantic · intended context","Graph · related knowledge","Ready to try"]},
};
const additionCopy = {
  "zh-TW": {original:"初次回答",complete:"已補齊的重點",missing:"原本漏掉的重點",added:"補上",pending:"待補",done:"已補",items:[["正文起點","閱讀位置","四種頁面"],["已採用的決定","未解問題與下一步","來源與日期"]]},
  "zh-CN": {original:"初次回答",complete:"已补齐的重点",missing:"原本漏掉的重点",added:"补上",pending:"待补",done:"已补",items:[["正文起点","阅读位置","四种页面"],["已采用的决定","未解问题与下一步","来源与日期"]]},
  en: {original:"First answer",complete:"Context now included",missing:"What was missing",added:"Added",pending:"Missing",done:"Added",items:[["Reading origin","Reading position","All four page types"],["Current decisions","Open questions & next step","Sources & dates"]]},
};
const hierarchyCopy = {
  "zh-TW": {process:"查看查找過程與依據",source:"對應原文",answer:"補完整的回答"},
  "zh-CN": {process:"查看查找过程与依据",source:"对应原文",answer:"补完整的回答"},
  en: {process:"Review the search and sources",source:"Supporting passage",answer:"Completed answer"},
};
// Keep setup brief; leave time to read each piece of evidence.
const playbackDurations = [400, 700, baselineDuration, 1200, 2200, 2200, 2200];

const completionCopy = {
  "zh-TW": {review:"查看過程", history:"最初草稿", full:"完整回答", intro:["結合三項依據，已做好閱讀工作台。","結合三項依據，已做好工作接續台。"], short:[["側欄開關，正文起點不動。","視窗縮窄，文字原位換行。","四種內容，共用閱讀排版。"],["沿用已採用的決定。","保留可直接執行的下一步。","工作能追溯到原始資料。"]]},
  "zh-CN": {review:"查看过程", history:"最初草稿", full:"完整回答", intro:["结合三项依据，已做好阅读工作台。","结合三项依据，已做好工作接续台。"], short:[["侧栏开关，正文起点不动。","视窗缩窄，文字原位换行。","四种内容，共用阅读排版。"],["沿用已采用的决定。","保留可直接执行的下一步。","工作能追溯到原始资料。"]]},
  en: {review:"View process", history:"Initial draft", full:"Full answer", intro:["Three sources, brought together in a working reader.","Three sources, brought together in a handoff workspace."], short:[["The sidebar keeps the reading origin fixed.","A narrow view reflows the text in place.","Four content types share one reading layout."],["Keep the current decisions.","Carry forward the next actionable step.","Trace the work back to its original sources."]]},
};

type EvidenceTrace = {index:number;line?:number;seq:number;graph:boolean};

export function RetrievalWorkspace({locale}: {locale:Locale}) {
  const language=knowledgeLanguage(locale), scenarios=scenarioSets[language], byId=knowledgeNodeIndexes[language], titleOf=titleOfFor(language), readerTitle=readerTitleFor(language), stop=language==="en"?".":"。";
  const c=ui[locale], tc=traceCopy[locale], ac=assistantCopy[locale], pc=playbackCopy[locale], additions=additionCopy[locale], hc=hierarchyCopy[locale], cc=completionCopy[locale];
  const [task,setTask]=useState(0), [mode,setMode]=useState("all"), [reader,setReader]=useState<KnowledgeNode|null>(null);
  const [selected,setSelected]=useState(scenarios[0].evidence[2]), [included,setIncluded]=useState([true,true,true]), [manualEnhanced,setEnhanced]=useState(true);
  const [layoutTick,setLayoutTick]=useState(0);
  const [mobileEvidence,setMobileEvidence]=useState<number|null>(null);
  const [detailLane,setDetailLane]=useState<number|null>(null);
  const [manualTrace,setTrace]=useState<EvidenceTrace|null>(null);
  const [reviewView,setReviewView]=useState<"draft"|"answer">("answer");
  const [connector,setConnector]=useState<string|null>(null);
  const [outcomeInterrupted,setOutcomeInterrupted]=useState(false), [answerExpanded,setAnswerExpanded]=useState(false);
  const connectorMarker=useId();
  const root=useRef<HTMLDivElement>(null), origin=useRef<HTMLElement|null>(null), readerReturn=useRef<HTMLElement|null>(null);
  const [demo,setDemo]=useState({step:-1,running:false,active:true});
  const trace=useMemo<EvidenceTrace|null>(()=>demo.active&&demo.step>=4&&demo.step<7&&!outcomeInterrupted
    ?{index:demo.step-4,seq:demo.step,graph:demo.step===6}
    :manualTrace,[demo.active,demo.step,outcomeInterrupted,manualTrace]);
  const [inView,setInView]=useState(false), [pageVisible,setPageVisible]=useState(true);
  const enhanced=demo.active?demo.step>=4:manualEnhanced;
  const searching=demo.active&&demo.step<2;
  const visibleEvidence=included.map((value,index)=>value&&(!demo.active||demo.step>=4));
  const completeEvidence=visibleEvidence.every(Boolean);
  const partialEvidence=visibleEvidence.some(Boolean)&&!completeEvidence;
  const finished=demo.step===7;
  const settled=finished&&trace===null;
  const focusedLane=demo.active&&demo.step<4?-1:(trace?.index??-1);
  const laneExpanded=(index:number)=>mode!=="all"||focusedLane===index;
  const finishDemo=()=>setDemo({step:7,running:false,active:false});
  const playDemo=()=>{
    origin.current=null;setReader(null);setMode('all');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setTrace(null);setConnector(null);setOutcomeInterrupted(false);setDemo({step:7,running:false,active:false});return;}
    if(!demo.active||demo.step===7||demo.step<0){setOutcomeInterrupted(false);setAnswerExpanded(false);setDetailLane(null);setMobileEvidence(null);setConnector(null);setTrace(null);setIncluded([true,true,true]);setDemo({step:0,running:true,active:true});}
    else setDemo(prev=>({...prev,running:!prev.running}));
  };
  useEffect(()=>{
    const target=root.current?.querySelector('.rw-claude-window');
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.15});
    if(target)observer.observe(target);
    const visibility=()=>setPageVisible(document.visibilityState==='visible');
    visibility();document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[]);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectMotion=()=>{if(media.matches){setTrace(null);setConnector(null);setDemo({step:7,running:false,active:false});}};
    respectMotion();media.addEventListener('change',respectMotion);
    return()=>media.removeEventListener('change',respectMotion);
  },[]);
  useEffect(()=>{
    if(!inView||!pageVisible||!demo.active||demo.step!==-1)return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) setDemo({step:7,running:false,active:false});
    else setDemo({step:0,running:true,active:true});
  },[inView,pageVisible,demo.active,demo.step]);
  useEffect(()=>{
    if(!demo.active||!demo.running||!inView||!pageVisible||demo.step<0||demo.step>=7)return;
    const timer=window.setTimeout(()=>setDemo(prev=>({...prev,step:prev.step+1,running:prev.step<6})),playbackDurations[demo.step]);
    return()=>window.clearTimeout(timer);
  },[demo,inView,pageVisible]);
  const activate=(index:number, element:HTMLElement|null, line?:number, graph=false)=>{
    finishDemo();setMobileEvidence(index);origin.current=element;setConnector(null);setEnhanced(true);
    setTrace(prev=>({index,line,graph,seq:(prev?.seq??0)+1}));
  };
  useLayoutEffect(()=>{
    let frame=0;
    const measure=()=>{
      const shell=root.current;
      const manualSource=(!demo.active||outcomeInterrupted)&&origin.current?.isConnected?origin.current:null;
      const source=manualSource??shell?.querySelector<HTMLElement>(`[data-trace-source="${trace?.index}"]`);
      const control=`[data-effect-target="${trace?.index}"]`;
      const answer=!answerExpanded&&completeEvidence&&enhanced?(shell?.querySelector<HTMLElement>(task===0?control??'.rw-outcome':'.ro-work-detail[data-current="true"]')):shell?.querySelector<HTMLElement>(`[data-answer-index="${trace?.index}"]`);
      if(!shell||!source||!answer||!trace||!enhanced||window.innerWidth<768){setConnector(null);return;}
      const box=shell.getBoundingClientRect(),a=source.getBoundingClientRect(),b=answer.getBoundingClientRect();
      const x=a.right-box.left+4,y=a.top+a.height/2-box.top,tx=b.left-box.left-6,ty=b.top+b.height/2-box.top;
      if(x>=tx||a.height===0||b.height===0){setConnector(null);return;}
      const bend=Math.max(18,(tx-x)*.5);
      setConnector(`M${x},${y} C${x+bend},${y} ${tx-bend},${ty} ${tx},${ty}`);
    };
    // Follow the source reveal and reader reflow through their short transitions.
    const schedule=()=>{
      cancelAnimationFrame(frame);
      const until=performance.now()+650;
      const tick=()=>{measure();if(performance.now()<until)frame=requestAnimationFrame(tick);};
      frame=requestAnimationFrame(tick);
    };
    const shell=root.current;
    const observer=new ResizeObserver(schedule);
    if(shell){observer.observe(shell);shell.querySelectorAll('.rw-evidence-body,.rw-outcome,.rw-answer-extras').forEach(element=>observer.observe(element));}
    measure();schedule();window.addEventListener('resize',schedule);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',schedule);};
  },[trace,reader,mode,enhanced,included,layoutTick,demo.step,demo.active,outcomeInterrupted,answerExpanded,reviewView,task]);
  const d=scenarios[task], words=task===0?c.keywords:c.handoffWords;
  const sourceList=[...new Map([...d.evidence,d.center,d.other].map(n=>[n.id,n])).values()];
  const navigate=(view:string)=>{finishDemo();setEnhanced(true);setReader(null);setMode(view);setTrace(null);setConnector(null);};
  const selectTask=(index:number)=>{origin.current=null;setOutcomeInterrupted(false);setAnswerExpanded(false);setDetailLane(null);setMobileEvidence(null);const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;setDemo({step:reduced?7:0,running:!reduced,active:!reduced});setTask(index);setTrace(null);setConnector(null);setReader(null);setMode('all');setSelected(scenarios[index].evidence[2]);setIncluded([true,true,true]);setEnhanced(true);};
  const open=(node:KnowledgeNode)=>{readerReturn.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDemo(prev=>({...prev,running:false}));setReader(node);setConnector(null);};
  const closeReader=()=>{
    setReader(null);
    if(window.innerWidth<768)requestAnimationFrame(()=>{
      const target=readerReturn.current?.isConnected?readerReturn.current:root.current?.querySelector('.rw-document');
      target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    });
  };
  useEffect(()=>{
    if(!reader||window.innerWidth>=768)return;
    const frame=requestAnimationFrame(()=>root.current?.querySelector('.rw-reader')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}));
    return()=>cancelAnimationFrame(frame);
  },[reader]);
  const reference=(node:KnowledgeNode,label?:ReactNode,onTrace?:()=>void)=><span className="rw-reference"><button type="button" aria-label={onTrace?`${tc.from}: ${titleOf(node)}`:undefined} onClick={onTrace??(()=>open(node))}><SourceIcon kind={node.kind}/>{label??titleOf(node)}</button><span role="tooltip"><small>{c.kind[node.kind]}</small><strong>{titleOf(node)}</strong><span>{excerpt(node.body).slice(0,150)}</span></span></span>;
  const toggle=(index:number)=>{const wasVisible=visibleEvidence[index];activate(index,root.current?.querySelector<HTMLElement>(`[data-trace-source="${index}"]`)??null);setIncluded(prev=>prev.map((v,i)=>i===index?!wasVisible:v));setEnhanced(true);};
  const useButton=(index:number)=><button type="button" className="rw-use" aria-label={`${c.use}: ${titleOf(d.evidence[index])}`} aria-pressed={visibleEvidence[index]} onClick={()=>toggle(index)}>{visibleEvidence[index]?"✓":"+"}<span>{visibleEvidence[index]?c.used:c.unused}</span></button>;
  const sectionHead=(index:number,label:string)=><div className="rw-result-label"><h4 className="rw-lane-title"><button type="button" aria-expanded={laneExpanded(index)} onClick={()=>{if(laneExpanded(index)){setDemo(prev=>({...prev,running:false}));setOutcomeInterrupted(true);setTrace(null);setDetailLane(null);setMode('all');}else backtrace(index,false);}}><SourceIcon kind={d.evidence[index].kind}/>{label}<span aria-hidden="true">{laneExpanded(index)?'−':'+'}</span></button></h4></div>;
  const selectGraph=(node:KnowledgeNode,element:HTMLElement)=>{setDetailLane(2);setSelected(node);activate(d.evidence.findIndex(item=>item.id===node.id),element,undefined,true);};
  const backtrace=(index:number,revealAnswer=true)=>{setOutcomeInterrupted(true);setReviewView("answer");setAnswerExpanded(revealAnswer);if(window.innerWidth<768)requestAnimationFrame(()=>{const target=root.current?.querySelector<HTMLElement>(`[data-answer-index="${index}"]`);target?.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});setDemo(prev=>({...prev,running:false}));setReader(null);setMode('all');setDetailLane(index);setMobileEvidence(index);origin.current=null;setConnector(null);if(index===2)setSelected(d.evidence[2]);setTrace(prev=>({index,graph:index===2,seq:(prev?.seq??0)+1}));};
  const highlightOutcome=useCallback((index:number|null)=>{
    origin.current=null;
    if(index===null){setTrace(null);setConnector(null);return;}
    if(index===2)setSelected(scenarios[task].evidence[2]);
    setTrace(prev=>({index,graph:index===2,seq:(prev?.seq??0)+1}));
  },[task]);
  const interruptOutcome=(target:EventTarget)=>{
    if(enhanced&&target instanceof Element&&target.closest('button,a,summary,input,select')&&!target.closest('.rw-playback-toolbar')){setOutcomeInterrupted(true);setDemo(prev=>({...prev,step:7,running:false}));}
  };
  const mobileAnswer=(index:number)=>!demo.active&&trace?.index===index&&included[index]&&<div className="rw-mobile-answer"><p>{c.steps[task][index]}</p><button type="button" onClick={()=>root.current?.querySelector(`[data-answer-index="${index}"]`)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'})}>{tc.view} [{index+1}] ↓</button></div>;
  const inlineEvidence=(index:number)=><div className="rw-inline-evidence"><button type="button" className="rw-inline-toggle" aria-expanded={mobileEvidence===index} onClick={()=>{setDemo(prev=>({...prev,running:false}));origin.current=null;setConnector(null);
    if(mobileEvidence===index){setMobileEvidence(null);setTrace(null);}
    else {setDetailLane(index);setMobileEvidence(index);setMode('all');if(index===2)setSelected(d.evidence[2]);setTrace(prev=>({index,graph:index===2,seq:(prev?.seq??0)+1}));}}}>{hc.source}<span>{mobileEvidence===index?'−':'+'}</span></button>{mobileEvidence===index&&<div className="rw-inline-passage"><small>{[c.keyword,c.semantic,c.graph][index]} · {titleOf(d.evidence[index])}</small><p>{index===0?d.keywordBody[0]:index===1?d.matching+stop:excerpt(d.evidence[index].body)}</p>{index===2&&<div className="rw-inline-path">{titleOf(d.center)} → {titleOf(d.evidence[2])}</div>}{reference(d.evidence[index],c.open+' ↗')}</div>}</div>;
  const evidenceDetails=(index:number,node:KnowledgeNode=d.evidence[index])=>(detailLane===index||mode!=="all")&&<div className="rw-source-details" data-evidence-detail={index}>
    <header><small>{c.kind[node.kind]} · {titleOf(node)}</small><button type="button" aria-label={locale==='en'?'Close source details':locale==='zh-CN'?'收起来源详情':'收起來源詳情'} onClick={()=>{setDetailLane(null);setMobileEvidence(null);setMode('all');}}>×</button></header>
    <WikiReaderContent compact title={readerTitle(node)} body={node.body} renderReference={(id,label)=>byId.has(id)?reference(byId.get(id)!,label):label}/>
    <footer>{reference(node,c.open+' ↗')}{node.id===d.evidence[index].id&&useButton(index)}</footer>
  </div>;
  const answerSteps=c.steps[task].map((step,i)=>visibleEvidence[i]&&<div className="rw-answer-step" key={step} data-answer-index={i} data-linked={trace?.index===i}><span className="rw-addition-label">{additions.added} {i+1} · {[c.keyword,c.semantic,c.graph][i]}</span><button type="button" className="rw-answer-text" aria-label={`${tc.from}: ${i+1}`} aria-pressed={trace?.index===i} onClick={()=>backtrace(i)}>{step}</button> {reference(d.evidence[i],<sup>{i+1}</sup>,()=>backtrace(i))}{inlineEvidence(i)}</div>);
  return <figure data-product-media="ai" data-media-status="interactive" className="min-w-0">
    <div ref={root} onClickCapture={event=>interruptOutcome(event.target)} onChangeCapture={event=>interruptOutcome(event.target)} className="rw-shell rw-dual-stage" data-enhanced={enhanced} data-scene={demo.step<3?"before":demo.step===3?"connect":"after"} data-settled={settled} data-finished={finished} data-demo-step={demo.active?demo.step:"manual"} data-demo-running={demo.running&&inView&&pageVisible} data-retrieval-demo data-trace-lane={trace?.index} data-trace-tick={(trace?.seq??0)%2}>
      <aside className="rw-answer rw-claude-window" aria-label="Claude">
        <header><ClaudeBrandIcon className="rw-claude-glyph"/><strong>Claude</strong><div className="rw-playback-toolbar"><button type="button" onClick={playDemo}><span aria-hidden="true">{demo.running?'Ⅱ':demo.step===7?'↻':'▷'}</span>{!demo.active||demo.step===7?pc.replay:demo.running?pc.pause:demo.step<0?pc.play:pc.resume}</button></div></header>
        <div className="rw-chat-scroll">

        <div className="rw-answer-body" key={`${task}-${demo.step<3?"before":"after"}`}>
          {demo.step<3&&<p className="rw-scene-heading">{ac.before}</p>}
          {demo.step!==2&&<div className="rw-question"><p>{c.queryValues[task]}</p></div>}

          <div className="rw-response">
            {demo.step===3?<div className="rw-scene-connect"><div className="rw-connection-pair" aria-hidden="true"><Image src="/logo.svg" width={28} height={28} alt=""/><span>Wenlan</span><span className="rw-brand-join">+</span><ClaudeBrandIcon className="rw-claude-glyph"/><span>Claude</span></div><p>{pc.connectionContext}</p></div>:searching?<div className="rw-pending-answer"><span>{demo.step<0?pc.waiting:pc.thinking}</span></div>:<>
              {demo.step===2&&<BaselineOutcome locale={locale} task={task}/>}

              {enhanced&&visibleEvidence.every(v=>!v)&&<p>{c.none}</p>}

            </>}
          </div>
        </div>
        {enhanced&&completeEvidence&&<RetrievalOutcome key={`outcome-${task}`} locale={locale} task={task} activeEvidence={trace?.index} stage={demo.active?Math.max(-1,demo.step-4):3} onSource={index=>backtrace(index,false)} onHighlight={highlightOutcome}/>}
        {enhanced&&<div className="rw-answer-extras">
          {partialEvidence&&<div className="rw-partial-answer">{answerSteps}</div>}
          {completeEvidence&&<details className="rw-process-review" open={answerExpanded} onToggle={event=>{setAnswerExpanded(event.currentTarget.open);setLayoutTick(v=>v+1);}}>
            <summary>{cc.review}<span aria-hidden="true">↗</span></summary>
            <div className="rw-review-switch" role="group" aria-label={cc.review}>
              <button type="button" aria-pressed={reviewView==='draft'} onClick={()=>setReviewView('draft')}>{cc.history}</button>
              <button type="button" aria-pressed={reviewView==='answer'} onClick={()=>setReviewView('answer')}>{cc.full}</button>
            </div>
            {reviewView==='draft'?<BaselineOutcome locale={locale} task={task}/>:<div className="rw-full-answer">{answerSteps}</div>}
          </details>}
        </div>}

        </div>
        <footer><div className="rw-connection-status" data-connected={enhanced}>{enhanced&&<Image src="/logo.svg" width={18} height={18} alt=""/>}{enhanced?ac.connected:ac.disconnected}</div><button type="button" className="rw-next-question" onClick={()=>selectTask(task===0?1:0)}><span>{ac.next[task]}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></footer>
      </aside>
      <div className="wiki-demo-shell rw-knowledge-window"><header className="wiki-demo-header"><strong className="rw-wenlan-brand"><Image src="/logo.svg" width={22} height={22} alt=""/>Wenlan</strong><span className="rw-traffic" aria-hidden="true"><i/><i/><i/></span><button type="button" className="rw-back" aria-label={c.back} disabled={!reader&&mode==='all'} onClick={()=>navigate('all')}><ShellIcon name="back"/></button><span className="rw-window-tab">{reader?titleOf(reader):c.tab}</span></header>
      <nav className="wiki-demo-rail" aria-label={c.tab}>{([{icon:'search',view:'all',label:c.all},{icon:'wiki',view:'keyword',label:c.keyword},{icon:'memories',view:'semantic',label:c.semantic},{icon:'graph',view:'graph',label:c.graph}] as const).map(item=><button type="button" key={item.view} className="wiki-demo-rail-button" aria-label={item.label} title={item.label} aria-current={!reader&&mode===item.view?'page':undefined} onClick={()=>navigate(item.view)}><ShellIcon name={item.icon}/></button>)}<span className="rw-avatar">W</span></nav>
      <nav className="wiki-demo-directory rw-directory" aria-label={c.library}><div className="wiki-demo-directory-heading">{c.library}</div><small>{c.tasks}</small>{c.cases.map((title,i)=><button key={title} type="button" className="wiki-demo-note" aria-current={task===i?'page':undefined} onClick={()=>selectTask(i)}><ShellIcon name="search"/><span>{title}</span></button>)}<div className="rw-source-heading">{c.found}<span>{sourceList.length}</span></div><div className="rw-source-list">{sourceList.map(node=><button key={node.id} type="button" className="wiki-demo-note" data-linked={trace?d.evidence[trace.index]?.id===node.id:false} aria-current={reader?.id===node.id?'page':undefined} onClick={()=>open(node)}><SourceIcon kind={node.kind}/><span>{titleOf(node)}</span></button>)}</div></nav>
      <div className="wiki-demo-document rw-document">
      {reader?<article className="rw-reader" key={reader.id}><div className="rw-reader-top"><button type="button" onClick={closeReader}>← {c.back}</button><small>{c.kind[reader.kind]}</small></div><h3>{titleOf(reader).replace(/\.md$/, '')}</h3><WikiReaderContent title={readerTitle(reader)} body={reader.body} renderReference={(id,label)=>byId.has(id)?reference(byId.get(id)!,label):label}/><div className="rw-reader-related"><small>{c.connected}</small>{knowledgeEdges.filter(e=>e.from===reader.id&&byId.has(e.to)).slice(0,5).map(e=><div key={e.to}>{reference(byId.get(e.to)!)}</div>)}</div></article>:<>
        <div className="rw-search-heading"><h3>{c.queryValues[task]}</h3></div>
        <div className="rw-results" data-mode={mode} key={`${task}-${mode}`}>
          {(mode==='all'||mode==='keyword')&&<section className="rw-result rw-keyword" data-expanded={laneExpanded(0)} data-linked={trace?.index===0}>
            {sectionHead(0,c.keyword)}
            <div className="rw-evidence-body" aria-hidden={!laneExpanded(0)} inert={!laneExpanded(0)}><div className="rw-evidence-inner">
              <div className="rw-source-title">{reference(d.evidence[0],undefined,()=>backtrace(0))}</div>
              <div className="rw-document-excerpt"><button type="button" className="rw-fragment" data-trace-source="0" data-linked={trace?.index===0} aria-pressed={trace?.index===0} onClick={event=>activate(0,event.currentTarget,0)}><span><Marked text={d.keywordBody[0]} words={words}/></span><span className="rw-fragment-arrow" aria-hidden="true">↗</span></button></div>
              {evidenceDetails(0)}{mobileAnswer(0)}
            </div></div>
          </section>}
          {(mode==='all'||mode==='semantic')&&<section className="rw-result rw-semantic" data-expanded={laneExpanded(1)} data-linked={trace?.index===1}>
            {sectionHead(1,c.semantic)}
            <div className="rw-evidence-body" aria-hidden={!laneExpanded(1)} inert={!laneExpanded(1)}><div className="rw-evidence-inner">
              <div className="rw-source-title">{reference(d.evidence[1],undefined,()=>backtrace(1))}</div>
              <button type="button" className="rw-meaning-pair rw-semantic-fragment" data-trace-source="1" data-linked={trace?.index===1} aria-pressed={trace?.index===1} onClick={event=>activate(1,event.currentTarget)}><div><small>{c.asked}</small><p>“{d.phrase}”</p></div><span aria-hidden="true">≈</span><div><small>{c.original}</small><p><Marked text={d.matching+stop} words={[d.matching]} tone="meaning"/></p></div></button>
              {evidenceDetails(1)}{mobileAnswer(1)}
            </div></div>
          </section>}
          {(mode==='all'||mode==='graph')&&<section className="rw-result rw-graph" data-expanded={laneExpanded(2)} data-linked={trace?.index===2}>
            {sectionHead(2,c.graph)}
            <div className="rw-evidence-body" aria-hidden={!laneExpanded(2)} inert={!laneExpanded(2)}><div className="rw-evidence-inner">
              <div data-trace-source="2"><NodeMap task={task} selected={demo.active&&demo.step===6?d.evidence[2]:selected} onSelect={selectGraph} locale={locale} tracing={trace?.graph??false}/></div>
              {evidenceDetails(2,selected)}{mobileAnswer(2)}
            </div></div>
          </section>}
        </div></>}
      </div>
      </div>

      {connector&&<svg className="rw-evidence-connector" aria-hidden="true" key={trace?.seq}><defs><marker id={connectorMarker} viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" markerUnits="userSpaceOnUse"><circle cx="4" cy="4" r="3" fill="currentColor"/></marker></defs><path className="rw-connector-base" d={connector} markerStart={`url(#${connectorMarker})`} markerEnd={`url(#${connectorMarker})`}/><path className="rw-connector-travel" d={connector} pathLength="1"/><circle r="3" className="rw-connector-dot"><animateMotion dur=".8s" path={connector} fill="freeze"/></circle></svg>}
    </div><figcaption className="ks-caption">{ac.caption}</figcaption>
  </figure>;
}
