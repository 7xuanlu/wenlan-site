"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getPersonalLibrary } from "./wiki-personal-data";
import { ShellIcon } from "./wiki-demo-shell";

const copy = {
  "zh-TW": {
    ready:"把依據做成可以操作的功能", kind:"互動原型", open:"開啟原型", close:"關閉原型", example:"成果示意", based:"功能依據", reset:"重設", titles:["閱讀工作台", "工作接續台"],
    descriptions:["開關來源側欄，正文仍從同一位置開始。", "切換工作階段，保留決定、來源與下一步。"],
    sidebar:"來源側欄", narrow:"窄視窗", wide:"寬視窗", views:["Wiki", "Memory", "Topic", "Sources"],
    hint:"試著開關側欄或縮窄視窗，留意正文的左側起點。", topic:"主題中的筆記", source:"引用依據", show:"查看來源", tabs:["待處理", "進行中", "已完成"], start:"開始處理", complete:"標記完成", reopen:"重新開啟", empty:"這個階段沒有工作", decisions:"已採用的決定", next:"接著做", tasks:["確認四種閱讀頁的正文起點", "檢查窄視窗的引用預覽", "把驗收結果接回原始資料"],
    note:"可操作的成果示意，使用前文的示範素材。",
  },
  "zh-CN": {
    ready:"把依据做成可以操作的功能", kind:"交互原型", open:"打开原型", close:"关闭原型", example:"成果示意", based:"功能依据", reset:"重置", titles:["阅读工作台", "工作接续台"],
    descriptions:["开关来源侧栏，正文仍从同一位置开始。", "切换工作阶段，保留决定、来源与下一步。"],
    sidebar:"来源侧栏", narrow:"窄视窗", wide:"宽视窗", views:["Wiki", "Memory", "Topic", "Sources"],
    hint:"试着开关侧栏或缩窄视窗，留意正文的左侧起点。", topic:"主题中的笔记", source:"引用依据", show:"查看来源", tabs:["待处理", "进行中", "已完成"], start:"开始处理", complete:"标记完成", reopen:"重新打开", empty:"这个阶段没有工作", decisions:"已采用的决定", next:"接着做", tasks:["确认四种阅读页的正文起点", "检查窄视窗的引用预览", "把验收结果接回原始资料"],
    note:"可操作的成果示意，使用前文的示例素材。",
  },
  en: {
    ready:"Turn the context into a working feature", kind:"Interactive prototype", open:"Open prototype", close:"Close prototype", example:"Illustrative result", based:"Built from", reset:"Reset", titles:["Reading workspace", "Handoff workspace"],
    descriptions:["Toggle sources while the reading origin stays fixed.", "Move work forward without losing decisions, sources, or next steps."],
    sidebar:"Source sidebar", narrow:"Narrow view", wide:"Wide view", views:["Wiki", "Memory", "Topic", "Sources"],
    hint:"Toggle the sidebar or narrow the view. Watch the left edge of the article.", topic:"Notes in this topic", source:"Supporting source", show:"View source", tabs:["To do", "In progress", "Done"], start:"Start work", complete:"Mark done", reopen:"Reopen", empty:"No work in this stage", decisions:"Current decisions", next:"Next action", tasks:["Check the reading origin across all four views", "Check citation previews in a narrow view", "Connect acceptance results to their original sources"],
    note:"Interactive result illustration using the preceding demo material.",
  },
};
const libraries = { en:getPersonalLibrary("en"), "zh-TW":getPersonalLibrary("zh-TW"), "zh-CN":getPersonalLibrary("zh-CN") };
const plain = (body:string) => body.replace(/^#+.*$/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").trim().split("\n").filter(Boolean)[0] ?? "";

const effects = {
  "zh-TW": {labels:[["起點固定","自然換行","共用排版"],["保留決定","接著執行","來源可查"]], explanations:[["關鍵詞 → 側欄開關時，正文起點不動。","語義 → 視窗縮窄，文字在原位自然換行。","Graph → 四種內容沿用同一套閱讀排版。"],["關鍵詞 → 把已採用的決定帶進工作。","語義 → 每項工作都有可直接開始的下一步。","Graph → 工作保留可回查的原始資料。"]], original:"查看依據", inline:"根據三項依據完成 · 互動示意", sourceTitle:"共用閱讀容器", origin:"正文起點", decision:"正文起點固定，側欄只使用右側空間。", nextTask:"檢查側欄開關與窄視窗的閱讀位置。"},
  "zh-CN": {labels:[["起点固定","自然换行","共用排版"],["保留决定","接着执行","来源可查"]], explanations:[["关键词 → 侧栏开关时，正文起点不动。","语义 → 视窗缩窄，文字在原位自然换行。","Graph → 四种内容沿用同一套阅读排版。"],["关键词 → 把已采用的决定带进工作。","语义 → 每项工作都有可直接开始的下一步。","Graph → 工作保留可回查的原始资料。"]], original:"查看依据", inline:"根据三项依据完成 · 交互示意", sourceTitle:"共用阅读容器", origin:"正文起点", decision:"正文起点固定，侧栏只使用右侧空间。", nextTask:"检查侧栏开关与窄视窗的阅读位置。"},
  en: {labels:[["Fixed origin","Text reflow","Shared layout"],["Decisions","Next action","Provenance"]], explanations:[["Keyword → Opening the sidebar keeps the article’s left edge fixed.","Semantic → A narrower view reflows the text in place.","Graph → All four content types share the reading layout."],["Keyword → Current decisions stay with the work.","Semantic → Each task has an actionable next step.","Graph → Original sources stay traceable."]], original:"View source", inline:"Built from three sources · Interactive illustration", sourceTitle:"Shared reading layout", origin:"Reading origin", decision:"Keep the article’s origin fixed; use the right side for sources.", nextTask:"Check the reading position with the sidebar and a narrow viewport."},
};

function ReadingApp({locale,active,stage,onSource,onInspect}:{locale:Locale;active:number;stage:number;onSource:(index:number)=>void;onInspect:(index:number)=>void}) {
  const c=copy[locale], e=effects[locale], library=libraries[locale];
  const readingPage=library.notes.find(n=>n.id==='page-agent-loop')!;
  const readingMemory=library.resources.find(n=>n.id==='mem_a5229d9e467d')!;
  const readingTopic=library.resources.find(n=>n.id==='topic-ai')!;
  const readingFile=library.resources.find(n=>n.id==='file-reading-review')!;
  const [selectedView,setView]=useState<number|null>(null);
  const view=selectedView??(stage===2?1:0);
  const [manualLayout,setManualLayout]=useState<{sidebar:boolean;narrow:boolean}|null>(null);
  // The same selected evidence drives both panels; no second timer or effect.
  const sidebar=manualLayout?.sidebar??(active>=0||stage>=3);
  const narrow=manualLayout?.narrow??(active===1||active===2);
  const [pageId,setPage]=useState(readingPage.id);
  const page=library.notes.find(n=>n.id===pageId)??readingPage;
  const node=view===1?readingMemory:view===3?readingFile:page;
  const topicPages=library.notes.filter(n=>n.topicIds.includes(readingTopic.id));
  const decision=node.id===readingPage.id?node.body.split('\n## ')[2]:undefined;
  const decisionTitle=decision?.split('\n')[0];
  const decisionBody=decision?plain(decision.slice(decision.indexOf('\n'))):undefined;
  const viewIcons=["wiki","memories","topics","sources"] as const;
  return <div className="ro-reading" data-effect={active} onClickCapture={event=>{
    if (!(event.target instanceof Element) || !event.target.closest('button')) return;
    // Preserve the visible layout when a click ends autoplay. Evidence tracing
    // must not also change the reader's width, sidebar or selected content.
    setManualLayout(current=>current??{sidebar,narrow});
    setView(current=>current??view);
  }}>
    <div className="ro-controls">
      <div className="ro-type-switch" role="group" aria-label={locale==='en'?'Content type':locale==='zh-CN'?'内容类型':'內容類型'}>
        {c.views.map((label,i)=><button key={label} type="button" aria-label={label} title={label} aria-pressed={view===i} data-effect-target={view===i?"2":undefined} onClick={()=>{onSource(2);setView(i);}}><ShellIcon name={viewIcons[i]}/></button>)}
        <span className="ro-selected-type">{c.views[view]}</span>
      </div>
      <div className="ro-view-options">
        <button type="button" aria-label={c.sidebar} title={c.sidebar} aria-pressed={sidebar} onClick={()=>{onSource(0);setManualLayout({sidebar:!sidebar,narrow});}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 4v16"/></svg></button>
        <button type="button" aria-label={c.narrow} title={c.narrow} aria-pressed={narrow} onClick={()=>{onSource(1);setManualLayout({sidebar,narrow:!narrow});}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 4v16M20 4v16M9 8l4 4-4 4M8 12h8"/></svg></button>
      </div>
    </div>
    <div className="ro-reader-stage"><div className="ro-reader-viewport" data-narrow={narrow}>
      <div className="ro-reader-layout" data-sidebar={sidebar}>
        <div className="ro-reader-main" data-reading-origin>
          <small className="ro-origin" title={e.origin} aria-label={e.origin} data-effect-target="0"><span aria-hidden="true">⌜</span></small>
          {view===2?<><h3>{readingTopic.title}</h3><div className="ro-topic-pages" data-effect-target="1">{topicPages.map(n=><button type="button" key={n.id} onClick={()=>{setPage(n.id);setView(0);}}>{n.title} <span>↗</span></button>)}</div></>:<><h3>{node.title}</h3><p className="ro-reader-intro" data-effect-target={decision?undefined:"1"}>{plain(node.body)}</p>{decision&&<section className="ro-reader-decision"><h4>{decisionTitle}</h4><p data-effect-target="1">{decisionBody}</p></section>}</>}
        </div>
        {sidebar&&<aside className="ro-reader-sources"><ShellIcon name="sources"/><strong>{readingFile.title}</strong><button type="button" onClick={()=>onInspect(0)}>{c.show} ↗</button></aside>}
      </div>
    </div></div>
  </div>;
}

export const baselineDuration=2600;
const baselineCopy = {
  "zh-TW": {draft:"排版草稿", handoff:"交接草稿", pending:"背景待補", ask:"開始前，還需要確認：", questions:[["哪些頁面要改？","先前決定怎麼排版？"],["之前決定了什麼？","下一步從哪裡開始？"]], placeholder:"內容與依據待補"},
  "zh-CN": {draft:"排版草稿", handoff:"交接草稿", pending:"背景待补", ask:"开始前，还需要确认：", questions:[["哪些页面要改？","先前决定怎么排版？"],["之前决定了什么？","下一步从哪里开始？"]], placeholder:"内容与依据待补"},
  en: {draft:"Layout draft", handoff:"Handoff draft", pending:"Needs context", ask:"Before I start, can you clarify:", questions:[["Which views need changing?","What layout was already agreed?"],["What was already decided?","Where should I start?"]], placeholder:"Content and sources needed"},
};

export function BaselineOutcome({locale,task}:{locale:Locale;task:number}) {
  const b=baselineCopy[locale];
  return <div className="rw-baseline-scene" data-baseline-stage="draft">
    <div className="rw-baseline-questions"><p>{b.ask}</p><ul>{b.questions[task].map(question=><li key={question}>{question}</li>)}</ul></div>
    <section className="rw-outcome rw-baseline-outcome" aria-label={task===0?b.draft:b.handoff}>
      <header className="ro-card-label"><ShellIcon name="wiki"/><strong>{task===0?b.draft:b.handoff}</strong><small>{b.pending}</small></header>
      <div className="ro-scaffold" role="img" aria-label={b.placeholder}>
        <div className="ro-scaffold-nav" aria-hidden="true"><i/><i/><i/></div>
        <div className="ro-scaffold-body" aria-hidden="true"><i className="ro-scaffold-title"/><i/><i/><i/><div className="ro-scaffold-empty"><span>?</span></div></div>
        <div className="ro-scaffold-source" aria-hidden="true"><ShellIcon name="sources"/><span>?</span></div>
      </div>
      <p className="ro-scaffold-caption">{b.placeholder}</p>
    </section>
  </div>;
}

function HandoffApp({locale,active,onSource}:{locale:Locale;active:number;onSource:(index:number)=>void}) {
  const c=copy[locale], e=effects[locale];
  const readingFile=libraries[locale].resources.find(n=>n.id==='file-reading-review')!;
  const [status,setStatus]=useState(0);
  return <div className="ro-handoff">
    <div className="ro-work-status"><span>{c.tabs[status]}</span><button type="button" onClick={()=>setStatus(0)}>{c.reset}</button></div>
    <h3>{c.tasks[0]}</h3>
    <div className="ro-work-detail" data-current={active===0}><small>{c.decisions}</small><p>{e.decision}</p></div>
    <div className="ro-work-detail" data-current={active===1}><small>{c.next}</small><p>{e.nextTask}</p></div>
    <div className="ro-work-detail" data-current={active===2}><small>{c.source}</small><button type="button" className="ro-inline-reference" onClick={()=>onSource(2)}>{readingFile.title} · Agent Loop</button></div>
    <button type="button" className="ro-task-action" onClick={()=>{onSource(1);setStatus(v=>(v+1)%3);}}>{status===0?c.start:status===1?c.complete:c.reopen} →</button>
  </div>;
}

// The parent owns the single walkthrough clock and highlighted evidence.
export function RetrievalOutcome({locale,task,activeEvidence,stage,onSource,onHighlight}:{locale:Locale;task:number;activeEvidence?:number;stage:number;onSource:(index:number)=>void;onHighlight:(index:number|null)=>void}) {
  const c=copy[locale], active=activeEvidence!==undefined&&activeEvidence>=0&&activeEvidence<3?activeEvidence:-1;
  const operate=(index:number)=>onHighlight(index);
  return <section className="rw-outcome rw-refined-outcome" aria-label={c.titles[task]} data-formation-stage={stage}>
    <header className="ro-card-label"><ShellIcon name="wiki"/><strong>{c.titles[task]}</strong></header>
    {task===0?<ReadingApp locale={locale} active={active} stage={stage} onSource={operate} onInspect={onSource}/>:<HandoffApp locale={locale} active={active} onSource={operate}/>}
  </section>;
}
