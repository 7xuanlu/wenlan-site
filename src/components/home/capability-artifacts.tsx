"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/locales";
import { BookOpenIcon, CheckIcon, ObsidianBrandIcon, ClaudeBrandIcon, CursorBrandIcon, OpenAiBrandIcon, VSCodeBrandIcon, AntigravityBrandIcon } from "@/components/icons";
import { LocalizedLink } from "@/i18n/navigation";
import { TopicOverviewArtifact, WebAccessArtifact } from "./capability-extensions";
import { KnowledgePageIcon, SpaceMark } from "./capability-native-icons";
import { NativeRailIcon } from "./wiki-demo-shell";

// Illustrative examples, not native captures or a live execution trace.
const copyByLocale = {
  en: {
    steep: {"source": "Sources", "memory": "Memories", "flow": "Sources and memories enter Steep: find connections, grow new pages and detect conflicts. Capability illustration.", "items": [{"id": "link", "label": "Connections", "note": "Classification, search cues and graph links add context to the original memory."}, {"id": "emerge", "label": "New pages", "note": "Eligible related sources and memories can become a new, cited knowledge page, written by your AI tool with /wenlan steep or by a synthesis model in Automatic."}, {"id": "conflict", "label": "Conflicts", "note": "Advanced reconciliation must be enabled separately. Protected conflicts go to review; history stays available."}], "review": "Review", "shown": "Shown"},
    sources: {"label": "Bring in your sources", "rows": [["PDF", "Research paper.pdf", "Text-based PDF"], ["MD", "Reading notes.md", "Markdown, text & folders"], ["ZIP", "ChatGPT · Claude", "Conversation exports"], ["URL", "Saved web excerpt", "Content + original URL"]], "note": "Scanned PDFs need text extraction first.", "link": "Import guide"},
    obsidian: {"label": "My Obsidian vault", "folder": "Reading & research", "files": ["Attention and learning.md", "Reading notes.md"], "connection": "Read-only source", "result": "Search and cite in Wenlan", "refresh": "Followed in the background", "link": "Connection guide"},
    tools: {"label": "Plugins & MCP", "link": "Connection guide"},
    spaces: { label: "Choose a Space", note: "Retrieve within this scope", names: ["Product design", "Reading & research", "Personal"], pages: ["Reading layout decisions", "Attention and learning", "Weekly reflection"], result: "In this Space" },
    history: {"label": "Version history", "page": "Knowledge page", "memory": "Memory", "pageTitle": "Delivery checklist", "memoryTitle": "Display preference", "previous": "Earlier", "current": "Current", "correction": "Replaces earlier memory", "pageBase": "Pass the tests.", "pageLead": "Pass the tests", "pageAdded": ", then check desktop and mobile views.", "memoryBefore": "Use dark mode by default.", "memoryAfter": "Follow my system theme instead."},
  },
  "zh-TW": {
    steep: {"source": "來源", "memory": "記憶", "flow": "來源與記憶進入 Steep：找出關聯、長出新頁、找出矛盾。能力示意。", "items": [{"id": "link", "label": "找出關聯", "note": "為原記憶補上分類、搜尋線索與圖譜關聯。"}, {"id": "emerge", "label": "長出新頁", "note": "符合條件的相關來源與記憶可整理成有引用的新知識頁：由你的 AI 工具執行 /wenlan steep，或在「自動」模式由頁面合成模型完成。"}, {"id": "conflict", "label": "找出矛盾", "note": "需另行啟用進階整理；受保護的矛盾留待審閱，歷史仍保留。"}], "review": "待審", "shown": "已呈現"},
    sources: {"label": "把素材帶進來", "rows": [["PDF", "研究論文.pdf", "文字型 PDF"], ["MD", "閱讀筆記.md", "Markdown、文字檔與資料夾"], ["ZIP", "ChatGPT · Claude", "AI 對話匯出"], ["URL", "網頁摘錄", "內容與原網址"]], "note": "掃描 PDF 需先擷取文字。", "link": "匯入指南"},
    obsidian: {"label": "我的 Obsidian 筆記庫", "folder": "閱讀與研究", "files": ["注意力與學習.md", "閱讀筆記.md"], "connection": "唯讀來源", "result": "在 Wenlan 搜尋與引用", "refresh": "在背景自動跟進變更", "link": "連接指南"},
    tools: {"label": "外掛與 MCP", "link": "連接指南"},
    spaces: { label: "選擇 Space", note: "在選定範圍內檢索", names: ["產品設計", "閱讀與研究", "個人生活"], pages: ["閱讀版面決策", "注意力與學習", "每週回顧"], result: "此空間的知識" },
    history: {"label": "版本歷史", "page": "知識頁", "memory": "記憶", "pageTitle": "功能交付準則", "memoryTitle": "顯示偏好", "previous": "先前", "current": "目前", "correction": "取代先前記憶", "pageBase": "通過測試。", "pageLead": "通過測試", "pageAdded": "，再檢查桌面與手機畫面。", "memoryBefore": "預設使用深色模式。", "memoryAfter": "改為跟隨我的系統主題。"},
  },
  "zh-CN": {
    steep: {"source": "来源", "memory": "记忆", "flow": "来源与记忆进入 Steep：找出关联、长出新页、找出矛盾。能力示意。", "items": [{"id": "link", "label": "找出关联", "note": "为原记忆补上分类、搜索线索与图谱关联。"}, {"id": "emerge", "label": "长出新页", "note": "符合条件的相关来源与记忆可整理成有引用的新知识页：由你的 AI 工具运行 /wenlan steep，或在“自动”模式由页面合成模型完成。"}, {"id": "conflict", "label": "找出矛盾", "note": "需另行启用进阶整理；受保护的矛盾留待审核，历史仍保留。"}], "review": "待审", "shown": "已呈现"},
    sources: {"label": "把素材带进来", "rows": [["PDF", "研究论文.pdf", "文本型 PDF"], ["MD", "阅读笔记.md", "Markdown、文本与文件夹"], ["ZIP", "ChatGPT · Claude", "AI 对话导出"], ["URL", "网页摘录", "内容与原网址"]], "note": "扫描 PDF 需先提取文本。", "link": "导入指南"},
    obsidian: {"label": "我的 Obsidian 笔记库", "folder": "阅读与研究", "files": ["注意力与学习.md", "阅读笔记.md"], "connection": "只读来源", "result": "在 Wenlan 搜索与引用", "refresh": "在后台自动跟进变更", "link": "连接指南"},
    tools: {"label": "插件与 MCP", "link": "连接指南"},
    spaces: { label: "选择 Space", note: "在选定范围内检索", names: ["产品设计", "阅读与研究", "个人生活"], pages: ["阅读版面决策", "注意力与学习", "每周回顾"], result: "此空间的知识" },
    history: {"label": "版本历史", "page": "知识页", "memory": "记忆", "pageTitle": "功能交付准则", "memoryTitle": "显示偏好", "previous": "先前", "current": "当前", "correction": "取代先前记忆", "pageBase": "通过测试。", "pageLead": "通过测试", "pageAdded": "，再检查桌面与手机画面。", "memoryBefore": "默认使用深色模式。", "memoryAfter": "改为跟随我的系统主题。"},
  },
} as const;

type Copy = (typeof copyByLocale)[Locale];

function SteepResult({ kind, review }: { kind: string; review: string }) {
  return <svg viewBox="0 0 84 72" aria-hidden="true" className="wc-steepResult">
    {kind === "link" ? <>
      <path d="M18 34C36 34 40 18 62 18M18 34C36 34 40 50 62 50" pathLength="1" className="wc-steepWire wc-steepDraw" />
      <path d="M62 18V50" pathLength="1" className="wc-steepWire wc-steepDraw wc-steepDrawLast" />
      <circle cx="18" cy="34" r="7" className="wc-steepMemoryNode" />
      <circle cx="62" cy="18" r="7" className="wc-steepPageNode" />
      <circle cx="62" cy="50" r="7" className="wc-steepMemoryNode" />
    </> : kind === "emerge" ? <>
      <path d="M12 16C26 16 23 33 34 33M12 33h22M12 50C26 50 23 33 34 33" pathLength="1" className="wc-steepWire wc-steepDraw" />
      <circle cx="12" cy="16" r="4" className="wc-steepMemoryNode" />
      <circle cx="12" cy="33" r="4" className="wc-steepMemoryNode" />
      <circle cx="12" cy="50" r="4" className="wc-steepMemoryNode" />
      <g className="wc-steepInsert">
        <path d="M38 10H61L72 21V53Q72 57 68 57H38Q34 57 34 53V14Q34 10 38 10Z" className="wc-steepPaper wc-steepEmergentPage" />
        <path d="M61 10V21H72" className="wc-steepFold" />
        <path d="M42 24h13M42 31h22M42 38h18" className="wc-steepTextLine" />
        <circle cx="44" cy="46" r="2" className="wc-steepMemoryNode" />
        <circle cx="52" cy="46" r="2" className="wc-steepMemoryNode" />
        <circle cx="69" cy="54" r="8" className="wc-steepNewBadge" />
        <path d="M65.5 54h7M69 50.5v7" className="wc-steepNewInk" />
      </g>
    </> : <>
      <rect x="5" y="9" width="29" height="34" rx="3" className="wc-steepPaper" />
      <rect x="50" y="9" width="29" height="34" rx="3" className="wc-steepPaper" />
      <path d="M12 19h15M12 25h10M57 19h15M57 25h10" className="wc-steepTextLine" />
      <path d="m12 33 3 3 6-6" className="wc-steepNewInk" />
      <path d="m58 31 6 6m0-6-6 6" className="wc-steepWarningInk" />
      <g className="wc-steepWarningGroup">
        <path d="m42 20 10 17H32Z" className="wc-steepWarning" />
        <path d="M42 26v4m0 3v.5" className="wc-steepWarningInk" />
      </g>
      <g className="wc-steepReview">
        <rect x="19" y="49" width="46" height="19" rx="4" />
        <text x="42" y="62">{review}</text>
      </g>
    </>}
  </svg>;
}

const STEEP_STEPS = ["link", "emerge", "conflict"] as const;
const STEEP_INPUT_MS = 850;
const STEEP_STEP_MS = 1400;
const STEEP_REVEAL_MS = 720;

function Steep({ copy }: { copy: Copy["steep"] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stopPlayback = useRef<() => void>(() => {});
  const [entered, setEntered] = useState(false);
  const [step, setStep] = useState(-1);
  const [focused, setFocused] = useState<string | null>(null);
  const active = focused ?? STEEP_STEPS[step] ?? null;
  const played = STEEP_STEPS.slice(0, step + 1);
  // Each stationary arc, outgoing branch and result shares one reveal beat.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];
    let started = false;
    let observer: IntersectionObserver | undefined;
    const clearTimers = () => timers.forEach(window.clearTimeout);
    const finish = () => {
      started = true;
      observer?.disconnect();
      clearTimers();
      setEntered(true);
      setStep(STEEP_STEPS.length);
    };
    stopPlayback.current = finish;
    const start = () => {
      if (started) return;
      started = true;
      observer?.disconnect();
      if (reducedMotion.matches) {
        finish();
        return;
      }
      setEntered(true);
      // Input traces arrive first; each arc, branch and result then reveals together.
      for (let index = 0; index <= STEEP_STEPS.length; index++) {
        timers.push(window.setTimeout(() => setStep(index), STEEP_INPUT_MS + index * STEEP_STEP_MS));
      }
    };
    const handleMotionChange = () => {
      if (reducedMotion.matches) finish();
    };
    if (reducedMotion.matches || typeof IntersectionObserver === "undefined") {
      finish();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) start();
      }, { threshold: 0.6 });
      observer.observe(root);
    }
    reducedMotion.addEventListener("change", handleMotionChange);
    return () => {
      stopPlayback.current = () => {};
      observer?.disconnect();
      clearTimers();
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <div ref={rootRef} className="wc-steep" data-steep-flow data-entered={entered} data-started={step >= 0}
    data-complete={step === STEEP_STEPS.length} data-active={active ?? "none"}
    style={{ "--steep-reveal": `${STEEP_REVEAL_MS}ms`, "--steep-input": `${STEEP_INPUT_MS}ms` } as CSSProperties}>
    <svg viewBox="0 0 320 208" role="img" aria-label={copy.flow} className="wc-steepMap">
      <g className="wc-steepInputs">
        <rect x="52" y="11" width="39" height="45" rx="4" className="wc-steepPaper" />
        <path d="M61 23h19M61 30h19M61 37h13" className="wc-steepTextLine" />
        <text x="72" y="75">{copy.source}</text>
        <rect x="231" y="8" width="37" height="39" rx="4" className="wc-steepOldPage" />
        <rect x="225" y="17" width="37" height="39" rx="4" className="wc-steepPaper" />
        <circle cx="234" cy="29" r="3" className="wc-steepMemoryNode" />
        <path d="M242 29h12M233 38h20M233 45h14" className="wc-steepTextLine" />
        <text x="244" y="75">{copy.memory}</text>
      </g>
      <path d="M72 83C72 110 100 119 125 119M244 83C244 110 218 119 195 119" className="wc-steepWire" />
      <path d="M72 83C72 110 100 119 125 119" pathLength="1" className="wc-steepInputTrace" />
      <path d="M244 83C244 110 218 119 195 119" pathLength="1" className="wc-steepInputTrace" />
      <circle cx="160" cy="119" r="35" className="wc-steepOrbit" />
      <circle cx="160" cy="119" r="31" className="wc-steepTrack" />
      {STEEP_STEPS.map((id, index) => <circle key={id} cx="160" cy="119" r="31" pathLength="1"
        className="wc-steepRing" data-played={played.includes(id)} data-active={active === id}
        transform={`rotate(${162 - index * 120} 160 119)`} />)}
      <text x="160" y="124" className="wc-steepName">Steep</text>
      <path d="M160 154V174" className="wc-steepWire" />
      <path d="M160 154V174" className="wc-steepTrunkTrace" />
      {STEEP_STEPS.map((id, index) => {
        const d = ["M160 174C160 190 53 184 53 204", "M160 174v30", "M160 174C160 190 267 184 267 204"][index];
        return <g key={id} data-branch={id}>
          <path d={d} className="wc-steepBranch" />
          <path d={d} pathLength="1" className="wc-steepBranchTrace" data-played={played.includes(id)} />
        </g>;
      })}
    </svg>
    <div className="wc-steepOutcomes">
      {copy.items.map((item) => <button key={item.id} type="button" data-outcome={item.id}
        data-played={played.includes(item.id)} data-active={active === item.id} aria-pressed={focused === item.id}
        aria-label={`${item.label}${played.includes(item.id) ? ` · ${copy.shown}` : ""}`} title={item.note}
        onClick={() => {
          stopPlayback.current();
          setFocused(focused === item.id ? null : item.id);
        }}>
        <SteepResult kind={item.id} review={copy.review} /><span>{item.label}</span>
      </button>)}
    </div>
  </div>;
}

function Sources({ copy, locale }: { copy: Copy["sources"]; locale: Locale }) {
  return <div className="wc-sources wc-withFooter">
    <div className="wc-artifactBody">
    <ul className="wc-sourceFiles" aria-label={copy.label}>{copy.rows.map(([format, name, type]) => <li key={format}>
        <MaterialThumbnail format={format} />
        <div><strong>{name}</strong><small>{type}</small></div>
    </li>)}</ul>
    </div>
    <div className="wc-artifactFooter">
    <p className="wc-sourceNote">{copy.note}</p>
    <LocalizedLink className="wc-detailLink" href="/learn/build-local-ai-knowledge-base-from-documents" locale={locale}>{copy.link}<span aria-hidden="true">↗</span></LocalizedLink>
    </div>
  </div>;
}

function MaterialThumbnail({ format }: { format: string }) {
  return <span className="wc-materialThumbnail" data-format={format} aria-hidden="true">
    <span className="wc-materialArtwork">
      {format === "ZIP" ? <><OpenAiBrandIcon className="wc-miniBrand" /><ClaudeBrandIcon className="wc-miniBrand" /></>
        : format === "URL" ? <span className="wc-linkSymbol">↗</span>
          : <BookOpenIcon className="wc-icon" />}
    </span>
    <span className="wc-fileFormat">{format}</span>
  </span>;
}

function Obsidian({ copy, locale }: { copy: Copy["obsidian"]; locale: Locale }) {
  return <div className="wc-obsidian wc-withFooter">
    <div className="wc-artifactBody">
    <div className="wc-vault">
      <div className="wc-vaultTitle"><ObsidianBrandIcon className="wc-brand" /><strong>{copy.label}</strong></div>
      <div className="wc-vaultTree">
        <div className="wc-vaultFolder"><span className="wc-folder" aria-hidden="true" />{copy.folder}</div>
        <ul>{copy.files.map((file) => <li key={file}><BookOpenIcon className="wc-icon" /><span>{file}</span></li>)}</ul>
      </div>
      <div className="wc-vaultConnection"><span className="wc-readOnlyMark" aria-hidden="true" />{copy.connection}</div>
    </div>
    <p className="wc-vaultResult"><KnowledgePageIcon />{copy.result}</p>
    </div>
    <div className="wc-artifactFooter"><LocalizedLink className="wc-detailLink" href="/learn/migrate-obsidian-vault-to-llm-wiki" locale={locale}>{copy.link}<span aria-hidden="true">↗</span></LocalizedLink></div>
  </div>;
}

const clients = [
  { name: "Claude Code", Icon: ClaudeBrandIcon },
  { name: "Codex", Icon: OpenAiBrandIcon },
  { name: "Cursor", Icon: CursorBrandIcon },
  { name: "Claude Desktop", Icon: ClaudeBrandIcon },
  { name: "VS Code", Icon: VSCodeBrandIcon },
  { name: "Antigravity", Icon: AntigravityBrandIcon, href: "https://antigravity.google/docs/mcp" },
];
function Tools({ copy, locale }: { copy: Copy["tools"]; locale: Locale }) {
  return <div className="wc-tools wc-withFooter">
    <div className="wc-artifactBody">
    <div className="sr-only">{copy.label}</div>
    <ul className="wc-toolsGrid">{clients.map(({ name, Icon, href }) => <li key={name}>{href ? <a href={href}><Icon className="wc-brand" /><span>{name}</span></a> : <span><Icon className="wc-brand" /><span>{name}</span></span>}</li>)}</ul>
    </div>
    <div className="wc-artifactFooter"><LocalizedLink className="wc-detailLink" href="/docs" locale={locale}>{copy.link}<span aria-hidden="true">↗</span></LocalizedLink></div>
  </div>;
}


function Spaces({ copy }: { copy: Copy["spaces"] }) {
  const [selected, setSelected] = useState(0);
  return <div className="wc-spaces">
    <div>
      <div className="wc-spaceChoices" role="group" aria-label={copy.label}>
        {copy.names.map((name, index) => <button type="button" className="wc-spaceRow" key={name} data-space={index} aria-pressed={selected === index} onClick={() => setSelected(index)}>
          <SpaceMark /><strong>{name}</strong><span className="wc-spaceSelected">{selected === index && <CheckIcon className="wc-icon" />}</span>
        </button>)}
      </div>
      <div className="wc-spaceResult" aria-live="polite"><small>{copy.result}</small><span><KnowledgePageIcon />{copy.pages[selected]}</span></div>
    </div>
  </div>;
}

function History({ copy }: { copy: Copy["history"] }) {
  const [kind, setKind] = useState<"page" | "memory">("page");
  return <div className="wc-history">
    <div className="wc-historyKinds" role="group" aria-label={copy.label}>
      {(["page", "memory"] as const).map((item) => <button type="button" key={item} aria-pressed={kind === item} onClick={() => setKind(item)}>{copy[item]}</button>)}
    </div>
    <div className="wc-historyPanels" aria-live="polite">
      {(["page", "memory"] as const).map((item) => (
        <div className="wc-historyContent" key={item} data-kind={item} data-active={kind === item} aria-hidden={kind !== item} inert={kind !== item}>
          <h4>{item === "page" ? <KnowledgePageIcon /> : <NativeRailIcon name="memories" size={16} className="wc-icon" />}{item === "page" ? copy.pageTitle : copy.memoryTitle}</h4>
          <ol className="wc-revisions">
            <li>
              <i aria-hidden="true" />
              <small>{item === "page" ? `v2 · ${copy.previous}` : copy.previous}</small>
              <p>{item === "page" ? copy.pageBase : copy.memoryBefore}</p>
            </li>
            <li>
              <i aria-hidden="true" />
              <small>{item === "page" ? `v3 · ${copy.current}` : copy.correction}</small>
              <p>{item === "page" ? <>{copy.pageLead}<ins>{copy.pageAdded}</ins></> : copy.memoryAfter}</p>
            </li>
          </ol>
        </div>
      ))}
    </div>
  </div>;
}

export function CapabilityArtifact({ id, locale }: { id: string; locale: Locale }) {
  const copy = copyByLocale[locale];
  switch (id) {
    case "steep": return <Steep copy={copy.steep} />;
    case "topics": return <TopicOverviewArtifact locale={locale} />;
    case "web-access": return <WebAccessArtifact locale={locale} />;
    case "sources": return <Sources copy={copy.sources} locale={locale} />;
    case "obsidian": return <Obsidian copy={copy.obsidian} locale={locale} />;
    case "tools": return <Tools copy={copy.tools} locale={locale} />;
    case "spaces": return <Spaces copy={copy.spaces} />;
    case "history": return <History copy={copy.history} />;
    default: return null;
  }
}
