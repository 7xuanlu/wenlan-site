"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "./evidence-image";

const copyByLocale = {
  en: {
    title: "A decision changed. See what changes with it.",
    description: "The email assistant now needs one extra rule: drafts mentioning prices or delivery commitments need the project owner's review before sending.",
    controls: ["Review changes", "Updated page"],
    states: [
      "Compare the agent's proposed edit with the original. In this example, the page stays unchanged until the edit is accepted.",
      "The accepted page adds the new rule, keeps the earlier version and links the new decision as a source. Automatic sending is still unapproved.",
    ],
    captions: ["Wenlan revision review", "Wenlan page after acceptance"],
    evidence: "Fictional case · Actual product capture",
    alts: ["Wenlan review dialog comparing the original email-assistant scope with a proposed pricing and delivery review rule, with Approve and Dismiss controls", "Updated email-assistant knowledge page showing the new review rule, versions 3 and 2, and four linked source records"],
  },
  "zh-TW": {
    title: "決定改了，先看清楚再更新。",
    description: "同一個郵件助理，新增一項決定：提到報價或交期承諾的草稿，須先由專案負責人核對。",
    controls: ["核對修改", "更新後"],
    states: [
      "對照 Agent 提出的修改與原文。這個案例中，接受修改之前，知識頁會維持原樣。",
      "接受後，新規則進入知識頁，舊版紀錄與新增來源都留下來。「自動寄信」仍然尚未核准。",
    ],
    captions: ["文瀾修改審查", "接受修改後的知識頁"],
    evidence: "虛構案例 · 實機截圖，介面為英文",
    alts: ["文瀾修改審查畫面，左右對照郵件助理原本範圍與新增的報價、交期核對規則，並顯示接受與捨棄操作", "更新後的郵件助理知識頁，顯示新增核對規則、第 3 與第 2 版紀錄，以及四筆來源"],
  },
  "zh-CN": {
    title: "决定改了，先看清楚再更新。",
    description: "同一个邮件助手，新增一项决定：涉及报价或交付时间承诺的草稿，须先由项目负责人核对。",
    controls: ["核对修改", "更新后"],
    states: [
      "对照 Agent 提出的修改与原文。在这个案例中，接受修改之前，知识页会保持原样。",
      "接受后，新规则进入知识页，旧版记录和新增来源都保留下来。“自动发送”仍然尚未批准。",
    ],
    captions: ["文澜修改审核", "接受修改后的知识页"],
    evidence: "虚构案例 · 实机截图，界面为英文",
    alts: ["文澜修改审核界面，左右对照邮件助手原本范围与新增的报价、交付时间核对规则，并显示接受与放弃操作", "更新后的邮件助手知识页，显示新增核对规则、第 3 与第 2 版记录，以及四条来源"],
  },
} as const;

export function KnowledgeUpdateProof({ locale }: { readonly locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const copy = copyByLocale[locale];

  return (
    <section id="knowledge-updates" aria-labelledby="knowledge-updates-heading" className="scroll-mt-24 px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
        <div>
          <h2 id="knowledge-updates-heading" className="font-serif text-3xl font-medium tracking-tight text-balance text-[var(--o-text)] sm:text-4xl sm:leading-tight">{copy.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-pretty text-[var(--o-text-secondary)]">{copy.description}</p>
          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label={copy.title}>
            {copy.controls.map((label, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={selected === index}
                aria-controls="knowledge-update-view"
                onClick={() => setSelected(index)}
                className={`min-h-11 rounded-md border px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] ${selected === index ? "border-[var(--o-text)] bg-[var(--o-text)] text-[var(--o-bg)]" : "border-[var(--o-border)] text-[var(--o-text-secondary)] hover:text-[var(--o-text)]"}`}
              >{label}</button>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-pretty text-[var(--o-text-secondary)] lg:min-h-[7rem]" aria-live="polite">{copy.states[selected]}</p>
        </div>
        <div id="knowledge-update-view" className="min-w-0">
          <EvidenceImage
            key={selected}
            src={`/images/product-evidence/wenlan-mail-${selected === 0 ? "review" : "updated"}-${locale}.jpg`}
            width={1000}
            height={selected === 0 ? 1000 : 1100}
            alt={copy.alts[selected]}
            caption={`${copy.captions[selected]} · ${copy.evidence}`}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
