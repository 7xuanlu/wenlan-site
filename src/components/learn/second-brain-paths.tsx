"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "./evidence-image";

type PathId = "stay-in-obsidian" | "use-app" | "build-with-an-agent";
type Path = {
  id: PathId;
  title: string;
  button: string;
  image: { src: string; width: number; height: number; alt: string; caption: string };
  imageSourceLabel: string;
  imageSourceHref: string;
  scenario: [string, string];
  fit: string;
  upkeep: string;
  sourceLabel: string;
  sourceHref: string;
  details: string;
  secondLink?: { label: string; href: string };
  optionalPlugin?: { title: string; body: string; image: Path["image"]; sourceLabel: string; sourceHref: string; imageSourceHref: string };
};
type Copy = {
  ariaLabel: string;
  tabsLabel: string;
  choiceLabel: string;
  scenarioLabels: [string, string, string];
  detailsLabel: string;
  provenance: string;
  paths: [Path, Path, Path];
};

const copyByLocale: Record<Locale, Copy> = {
  "en": {
    "ariaLabel": "Compare three second brain workflows",
    "tabsLabel": "Choose where you work",
    "choiceLabel": "Choose this if",
    "scenarioLabels": [
      "When a note changes",
      "Where the result stays",
      "Your ongoing work"
    ],
    "detailsLabel": "Setup details",
    "provenance": "Each screen shows a separate example. Select a path to see how it works.",
    "paths": [
      {
        "id": "build-with-an-agent",
        "title": "Claude Code / Codex",
        "button": "Tell AI what to do with your files",
        "fit": "you want to control how AI reads, writes and organizes your files.",
        "scenario": [
          "Give the agent the changed note and ask it to update the project summary.",
          "Markdown files in your folder, ready to open or edit."
        ],
        "upkeep": "Keep your instructions and file organization useful; review AI edits.",
        "details": "Give the agent access to a folder and tell it what to read and write. A kit can provide ready-made commands and conventions, but you don’t need one to start.",
        "image": {
          "src": "/images/comparison/second-brain/obsidian-agent-save-official.png",
          "width": 1000,
          "height": 600,
          "caption": "Optional kit example: /obsidian-save turns one instruction into linked notes.",
          "alt": "Claude Code terminal output listing linked Markdown notes saved in a fictional vault with an optional kit."
        },
        "imageSourceLabel": "Author’s demo",
        "imageSourceHref": "https://github.com/eugeniughelbur/obsidian-second-brain/blob/fe84aa94ea75a46a213d94304fe9f0501c18f109/media/obsidian-save.gif",
        "sourceLabel": "Claude Code quickstart",
        "sourceHref": "https://code.claude.com/docs/en/quickstart",
        "secondLink": { "label": "Codex", "href": "https://developers.openai.com/codex/cli" }
      },
      {
        "id": "stay-in-obsidian",
        "title": "Obsidian",
        "button": "Write and connect your own notes",
        "fit": "you like deciding how your notes fit together.",
        "scenario": [
          "Write and link notes yourself. For an AI draft, paste selected notes into a chat.",
          "Save the checked draft back in your Obsidian vault."
        ],
        "upkeep": "Keep summaries current yourself. Copilot can add AI inside Obsidian.",
        "details": "Create a vault, write notes and link related ideas. Obsidian works without an AI model or plugin. Add Copilot only if you want AI assistance inside it.",
        "image": {
          "src": "/images/product-evidence/obsidian-cedar-approved.jpg",
          "width": 2048,
          "height": 1600,
          "caption": "A separate project-note example in plain Obsidian, without an AI plugin.",
          "alt": "An original project decision note open in Obsidian with the vault file list beside it."
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "Write and link notes in Obsidian",
        "sourceHref": "https://help.obsidian.md/",
        "optionalPlugin": {
          "title": "Optional: add AI chat with Copilot",
          "body": "Copilot adds an AI panel beside your notes. Choose the notes or folder to use, ask a question, then check the answer against them. The plugin and its model need separate setup.",
          "image": {
            "src": "/images/comparison/second-brain/copilot-chat-official.png",
            "width": 2940,
            "height": 1838,
            "alt": "Obsidian with optional Copilot chat beside a project note.",
            "caption": "Copilot’s published demo: the note stays on the left; AI answers on the right."
          },
          "sourceLabel": "Copilot setup and documentation",
          "sourceHref": "https://docs.obsidiancopilot.com/context-and-mentions/",
          "imageSourceHref": "https://github.com/logancyang/obsidian-copilot/blob/9027998a13b14aa1f1f7688c028cf9748a3e73eb/images/Chat-Mode.png"
        }
      },
      {
        "id": "use-app",
        "title": "Wenlan",
        "button": "Let the app maintain your Wiki",
        "fit": "you want related notes organized into a Wiki without assembling that workflow yourself.",
        "scenario": [
          "After source sync, Wenlan prepares updates for affected Wiki pages.",
          "Wiki pages with references to the original notes."
        ],
        "upkeep": "Choose models; review proposed changes to pages you wrote, edited, or locked.",
        "details": "Connect a source, choose an AI service, assign models to background organization and Wiki page generation, and enable background upkeep. Keep Wenlan running; updates aren’t immediate.",
        "image": {
          "src": "/images/product-evidence/wenlan-recorded-wiki-source-hover.webp",
          "width": 2880,
          "height": 1800,
          "caption": "A separate Wenlan example: project notes in a Wiki page. Hovering a citation previews its source; Open memory opens the full note.",
          "alt": "Real Wenlan recording of a project Wiki with a citation popover showing a source summary and Open memory action."
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "How automatic updates work",
        "sourceHref": "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/steep.md#automatic-update-or-review"
      }
    ]
  },
  "zh-TW": {
    "ariaLabel": "比較三種第二大腦做法",
    "tabsLabel": "選擇工作方式",
    "choiceLabel": "選擇理由",
    "scenarioLabels": [
      "筆記更新時",
      "結果存放位置",
      "你持續要做的事"
    ],
    "detailsLabel": "設定細節",
    "provenance": "每張畫面是不同的使用例子。選一種做法，查看它怎麼運作。",
    "paths": [
      {
        "id": "build-with-an-agent",
        "title": "Claude Code / Codex",
        "button": "指示 AI 處理你的檔案",
        "fit": "你想自己決定 AI 如何讀取、編寫和整理檔案。",
        "scenario": [
          "把改過的筆記交給 Agent，請它更新專案摘要。",
          "資料夾裡的 Markdown 檔，可以直接開啟或編輯。"
        ],
        "upkeep": "維護指示與檔案整理方式，檢查 AI 的修改。",
        "details": "讓 Agent 讀取資料夾，再告訴它要讀什麼、寫什麼。工具包可提供現成指令與整理規則，但不是開始使用的必要條件。",
        "image": {
          "src": "/images/comparison/second-brain/obsidian-agent-save-official.png",
          "width": 1000,
          "height": 600,
          "caption": "選用工具包的示範：/obsidian-save 將一段指示存成互相連結的筆記。",
          "alt": "Claude Code 使用選用工具包，把內容存進虛構 Obsidian 筆記庫並建立連結。"
        },
        "imageSourceLabel": "作者示範",
        "imageSourceHref": "https://github.com/eugeniughelbur/obsidian-second-brain/blob/fe84aa94ea75a46a213d94304fe9f0501c18f109/media/obsidian-save.gif",
        "sourceLabel": "Claude Code 入門",
        "sourceHref": "https://code.claude.com/docs/en/quickstart",
        "secondLink": { "label": "Codex", "href": "https://developers.openai.com/codex/cli" }
      },
      {
        "id": "stay-in-obsidian",
        "title": "Obsidian",
        "button": "自己寫筆記、建立連結",
        "fit": "你喜歡自己決定筆記之間怎麼組織。",
        "scenario": [
          "自己寫筆記、建立連結。需要 AI 草稿時，把選好的筆記貼進聊天工具。",
          "核對草稿後，存回 Obsidian vault。"
        ],
        "upkeep": "自己維護摘要；Copilot 可把 AI 協助帶進 Obsidian。",
        "details": "建立 vault、寫筆記，並連結相關想法。Obsidian 不需要 AI 模型或外掛就能使用。想在裡面用 AI 協助時，再加 Copilot。",
        "image": {
          "src": "/images/product-evidence/obsidian-cedar-approved.jpg",
          "width": 2048,
          "height": 1600,
          "caption": "另一個專案筆記的例子：原生 Obsidian，沒有使用 AI 外掛。",
          "alt": "Obsidian 開啟一份原始專案決策筆記，旁邊是 vault 的檔案列表。"
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "在 Obsidian 寫筆記與建立連結",
        "sourceHref": "https://help.obsidian.md/",
        "optionalPlugin": {
          "title": "選用：加上 Copilot AI 聊天",
          "body": "Copilot 在筆記旁加入 AI 面板。選擇要用的筆記或資料夾，提出問題，再對照來源核對答案。外掛與模型需要另外設定。",
          "image": {
            "src": "/images/comparison/second-brain/copilot-chat-official.png",
            "width": 2940,
            "height": 1838,
            "alt": "Obsidian 搭配選用的 Copilot 聊天外掛，筆記旁顯示 AI 回答。",
            "caption": "Copilot 官方示範：左側仍是筆記，右側才是外掛的 AI 回答。"
          },
          "sourceLabel": "Copilot 設定與文件",
          "sourceHref": "https://docs.obsidiancopilot.com/context-and-mentions/",
          "imageSourceHref": "https://github.com/logancyang/obsidian-copilot/blob/9027998a13b14aa1f1f7688c028cf9748a3e73eb/images/Chat-Mode.png"
        }
      },
      {
        "id": "use-app",
        "title": "文瀾 Wenlan",
        "button": "讓 App 維護你的 Wiki",
        "fit": "你想把相關筆記整理成 Wiki，不想自己組合這套流程。",
        "scenario": [
          "來源同步後，文瀾會為受影響的 Wiki 頁面準備更新。",
          "附有原始筆記來源的 Wiki 頁面。"
        ],
        "upkeep": "設定模型；你寫過、改過或鎖定的頁面，由你審查變更。",
        "details": "連接來源、選擇 AI 服務，為背景整理與 Wiki 頁面生成指定模型，再啟用背景維護。文瀾需保持執行，更新不會立即完成。",
        "image": {
          "src": "/images/product-evidence/wenlan-recorded-wiki-source-hover.webp",
          "width": 2880,
          "height": 1800,
          "caption": "另一個文瀾例子：專案筆記整理成 Wiki 頁面。移到引用上可預覽來源，再用 Open memory 開啟完整筆記。",
          "alt": "文瀾實際錄影：專案 Wiki 的引用浮層，顯示來源摘要與 Open memory 操作。"
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "自動更新如何運作",
        "sourceHref": "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/steep.md#automatic-update-or-review"
      }
    ]
  },
  "zh-CN": {
    "ariaLabel": "比较三种第二大脑做法",
    "tabsLabel": "选择工作方式",
    "choiceLabel": "选择理由",
    "scenarioLabels": [
      "笔记更新时",
      "结果存放位置",
      "你持续要做的事"
    ],
    "detailsLabel": "设置细节",
    "provenance": "每张画面是不同的使用例子。选一种做法，查看它怎么运作。",
    "paths": [
      {
        "id": "build-with-an-agent",
        "title": "Claude Code / Codex",
        "button": "指示 AI 处理你的文件",
        "fit": "你想自己决定 AI 如何读取、编写和整理文件。",
        "scenario": [
          "把改过的笔记交给 Agent，请它更新项目摘要。",
          "文件夹里的 Markdown 文件，可以直接打开或编辑。"
        ],
        "upkeep": "维护指令和文件整理方式，检查 AI 的修改。",
        "details": "让 Agent 读取文件夹，再告诉它要读什么、写什么。工具包可提供现成命令和整理规则，但不是开始使用的必要条件。",
        "image": {
          "src": "/images/comparison/second-brain/obsidian-agent-save-official.png",
          "width": 1000,
          "height": 600,
          "caption": "选用工具包的演示：/obsidian-save 将一段指令存成互相链接的笔记。",
          "alt": "Claude Code 使用选用工具包，把内容存进虚构 Obsidian 笔记库并建立链接。"
        },
        "imageSourceLabel": "作者演示",
        "imageSourceHref": "https://github.com/eugeniughelbur/obsidian-second-brain/blob/fe84aa94ea75a46a213d94304fe9f0501c18f109/media/obsidian-save.gif",
        "sourceLabel": "Claude Code 入门",
        "sourceHref": "https://code.claude.com/docs/en/quickstart",
        "secondLink": { "label": "Codex", "href": "https://developers.openai.com/codex/cli" }
      },
      {
        "id": "stay-in-obsidian",
        "title": "Obsidian",
        "button": "自己写笔记、建立链接",
        "fit": "你喜欢自己决定笔记之间怎么组织。",
        "scenario": [
          "自己写笔记、建立链接。需要 AI 草稿时，把选好的笔记贴进聊天工具。",
          "核对草稿后，存回 Obsidian vault。"
        ],
        "upkeep": "自己维护摘要；Copilot 可把 AI 帮助带进 Obsidian。",
        "details": "创建 vault、写笔记，并链接相关想法。Obsidian 不需要 AI 模型或插件就能使用。想在里面用 AI 帮助时，再加 Copilot。",
        "image": {
          "src": "/images/product-evidence/obsidian-cedar-approved.jpg",
          "width": 2048,
          "height": 1600,
          "caption": "另一个项目笔记的例子：原生 Obsidian，没有使用 AI 插件。",
          "alt": "Obsidian 打开一份原始项目决策笔记，旁边是 vault 的文件列表。"
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "在 Obsidian 写笔记与建立链接",
        "sourceHref": "https://help.obsidian.md/",
        "optionalPlugin": {
          "title": "选用：加上 Copilot AI 聊天",
          "body": "Copilot 在笔记旁加入 AI 面板。选择要用的笔记或文件夹，提出问题，再对照来源核对答案。插件和模型需要另外设置。",
          "image": {
            "src": "/images/comparison/second-brain/copilot-chat-official.png",
            "width": 2940,
            "height": 1838,
            "alt": "Obsidian 搭配选用的 Copilot 聊天插件，笔记旁显示 AI 回答。",
            "caption": "Copilot 官方演示：左侧仍是笔记，右侧才是插件的 AI 回答。"
          },
          "sourceLabel": "Copilot 设置与文档",
          "sourceHref": "https://docs.obsidiancopilot.com/context-and-mentions/",
          "imageSourceHref": "https://github.com/logancyang/obsidian-copilot/blob/9027998a13b14aa1f1f7688c028cf9748a3e73eb/images/Chat-Mode.png"
        }
      },
      {
        "id": "use-app",
        "title": "文澜 Wenlan",
        "button": "让 App 维护你的 Wiki",
        "fit": "你想把相关笔记整理成 Wiki，不想自己组合这套流程。",
        "scenario": [
          "来源同步后，文澜会为受影响的 Wiki 页面准备更新。",
          "带有原始笔记来源的 Wiki 页面。"
        ],
        "upkeep": "设置模型；你写过、改过或锁定的页面，由你审核更改。",
        "details": "连接来源、选择 AI 服务，为后台整理与 Wiki 页面生成指定模型，再启用后台维护。文澜需保持运行，更新不会立即完成。",
        "image": {
          "src": "/images/product-evidence/wenlan-recorded-wiki-source-hover.webp",
          "width": 2880,
          "height": 1800,
          "caption": "另一个文澜例子：项目笔记整理成 Wiki 页面。移到引用上可预览来源，再用 Open memory 打开完整笔记。",
          "alt": "文澜实际录像：项目 Wiki 的引用浮层，显示来源摘要和 Open memory 操作。"
        },
        "imageSourceLabel": "",
        "imageSourceHref": "",
        "sourceLabel": "自动更新如何运作",
        "sourceHref": "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/steep.md#automatic-update-or-review"
      }
    ]
  }
};

export function SecondBrainPaths({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [activeId, setActiveId] = useState<PathId>("build-with-an-agent");
  useEffect(() => {
    const selectHash = () => {
      const id = window.location.hash.slice(1);
      if (copy.paths.some((path) => path.id === id)) setActiveId(id as PathId);
    };
    selectHash();
    window.addEventListener("hashchange", selectHash);
    return () => window.removeEventListener("hashchange", selectHash);
  }, [copy.paths]);

  return (
    <section data-second-brain-paths aria-label={copy.ariaLabel} className="my-8 min-w-0">
      <div role="group" aria-label={copy.tabsLabel} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {copy.paths.map((path, index) => (
          <button key={path.id} type="button" id={path.id} aria-pressed={activeId === path.id} aria-controls={`${path.id}-panel`} onClick={() => setActiveId(path.id)} className={`grid min-h-20 grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 rounded-lg border p-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] sm:block sm:p-2 ${activeId === path.id ? "border-[var(--o-text)] bg-[var(--o-bg-alt)]" : "border-[var(--o-border)] hover:bg-[var(--o-bg-alt)]"}`}>
            <Image src={path.image.src} alt="" aria-hidden="true" width={path.image.width} height={path.image.height} sizes="(max-width: 639px) 88px, (max-width: 1023px) 30vw, 280px" className="h-14 w-[5.5rem] rounded object-cover object-center sm:mb-2 sm:h-24 sm:w-full" />
            <span className="min-w-0"><span className="block text-[0.68rem] leading-snug text-[var(--o-text-secondary)]">{index + 1}. {path.button}</span><span className="mt-0.5 block font-serif text-sm font-medium leading-snug text-[var(--o-text)] sm:text-base">{path.title}</span></span>
          </button>
        ))}
      </div>
      {copy.paths.map((path) => <div key={path.id} id={`${path.id}-panel`} role="region" aria-labelledby={path.id} hidden={activeId !== path.id} className="mt-4 scroll-mt-24 overflow-hidden rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)]">
        <div className="grid gap-3 p-4 sm:p-5">
          <p className="m-0 text-sm leading-relaxed text-[var(--o-text-secondary)]"><strong className="font-medium text-[var(--o-text)]">{copy.choiceLabel}: </strong>{path.fit}</p>
          <div className="grid gap-3 text-sm leading-relaxed sm:grid-cols-3 sm:gap-4">
            {path.scenario.map((item, index) => <p key={copy.scenarioLabels[index]} className="m-0 text-[var(--o-text-secondary)]"><strong className="font-medium text-[var(--o-text)]">{copy.scenarioLabels[index]}: </strong>{item}</p>)}
            <p className="m-0 text-[var(--o-text-secondary)]"><strong className="font-medium text-[var(--o-text)]">{copy.scenarioLabels[2]}: </strong>{path.upkeep}</p>
          </div>
        </div>
        <figure className="m-0">{path.id === "build-with-an-agent" && <p className="px-4 pb-3 text-xs font-medium text-[var(--o-text)] sm:px-5">{locale === "en" ? "Optional kit demo" : locale === "zh-TW" ? "選用工具包的示範" : "选用工具包的演示"}</p>}{path.id === "build-with-an-agent" ? (activeId === path.id ? <video controls playsInline preload="none" poster={path.image.src} width={1000} height={600} aria-label={path.image.alt} className="block h-auto w-full" onPlay={(event) => { if (activeId !== path.id) event.currentTarget.pause(); }}><source src="/images/comparison/second-brain/obsidian-agent-save-official.mp4" type="video/mp4" /><a href="/images/comparison/second-brain/obsidian-agent-save-official.mp4">{path.imageSourceLabel}</a></video> : <Image src={path.image.src} alt={path.image.alt} width={1000} height={600} className="h-auto w-full" />) : <EvidenceImage key={path.image.src} image={path.image} locale={locale} loading={activeId === path.id ? "eager" : "lazy"} presentation="overlay" />}<figcaption className="px-4 pt-3 text-xs leading-relaxed text-[var(--o-text-secondary)] sm:px-5">{path.image.caption}{path.imageSourceHref && <span className="mt-1 flex flex-wrap gap-x-3"><a className="underline underline-offset-4" href={path.imageSourceHref}>{path.imageSourceLabel}</a><a className="underline underline-offset-4" href="/images/comparison/second-brain/third-party-notices.txt">{locale === "en" ? "Attribution and license" : locale === "zh-TW" ? "素材來源與授權" : "素材来源与授权"}</a></span>}</figcaption></figure>
        <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-3 sm:px-5">
          <a href={path.sourceHref} className="w-fit text-sm font-medium text-[var(--o-text)] underline decoration-[var(--o-border)] underline-offset-4">{path.sourceLabel} ↗</a>
          {path.secondLink && <a href={path.secondLink.href} className="text-sm font-medium text-[var(--o-text)] underline decoration-[var(--o-border)] underline-offset-4">{path.secondLink.label} ↗</a>}
        </div>
        {path.optionalPlugin && <details className="px-4 py-4 sm:px-5" data-optional-plugin>
          <summary className="cursor-pointer text-sm font-medium text-[var(--o-text)]">{path.optionalPlugin.title}</summary>
          <p className="my-3 text-sm leading-relaxed text-[var(--o-text-secondary)]">{path.optionalPlugin.body}</p>
          <figure className="m-0">
            <EvidenceImage image={path.optionalPlugin.image} locale={locale} loading="lazy" presentation="overlay" />
            <figcaption className="mt-2 text-xs leading-relaxed text-[var(--o-text-secondary)]">{path.optionalPlugin.image.caption}</figcaption>
          </figure>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs underline underline-offset-4">
            <a href={path.optionalPlugin.sourceHref}>{path.optionalPlugin.sourceLabel}</a>
            <a href={path.optionalPlugin.imageSourceHref}>{locale === "en" ? "Image source" : locale === "zh-TW" ? "圖片來源" : "图片来源"}</a>
            <a href="/images/comparison/second-brain/third-party-notices.txt">{locale === "en" ? "Attribution and license" : locale === "zh-TW" ? "素材來源與授權" : "素材来源与授权"}</a>
          </div>
        </details>}
        <details className="px-4 py-3 text-sm"><summary className="cursor-pointer text-[var(--o-text)]">{copy.detailsLabel}</summary><p className="mt-2 max-w-prose leading-relaxed text-[var(--o-text-secondary)]">{path.details}</p></details>
      </div>)}
      <p className="mt-2 text-xs leading-relaxed text-[var(--o-text-secondary)]">{copy.provenance}</p>
    </section>
  );
}
