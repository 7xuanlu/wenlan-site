import Image from "next/image";
import type { Locale } from "@/i18n/locales";

const copy: Record<Locale, {
  stages: [string, string, string, string];
  help: [string, string, string, string];
  alt: string;
  caption: string;
  sources: string;
}> = {
  en: {
    stages: ["1 · Save what matters", "2 · Connect your notes", "3 · Pull out the insight", "4 · Put it to use"],
    help: ["AI: transcribe your ideas", "AI: suggest useful links", "AI: synthesize across notes", "AI: help draft the work"],
    alt: "Four illustrated PKM activities: save a passage, connect notes to a project, extract key ideas, and create a finished piece. Indigo microphone, links, magnifier and draft show where AI can help. Human hands select, organize and revise throughout.",
    caption: "The PKM cycle stays. AI can share the work; you choose what to keep and use. Save the useful result so it can inform the next project.",
    sources: "Concept illustration, drawing on",
  },
  "zh-TW": {
    stages: ["1 · 留下有用的想法", "2 · 串起相關筆記", "3 · 提煉關鍵重點", "4 · 變成實際成果"],
    help: ["AI 幫忙：語音轉成筆記", "AI 幫忙：建議內容關聯", "AI 幫忙：綜合多份資料", "AI 幫忙：用筆記起草"],
    alt: "個人知識管理的四個畫面：保存書中片段、把筆記連到專案、提煉重點、完成作品。靛藍色的麥克風、連線、放大鏡與草稿表示 AI 可以幫忙之處；人的雙手仍在選擇、整理和修改。",
    caption: "PKM 的循環還在。AI 可以分擔工作；留什麼、怎麼用，仍由你決定。有用的成果存回去，下個專案就能接著用。",
    sources: "概念示意，參考",
  },
  "zh-CN": {
    stages: ["1 · 留下有用的想法", "2 · 串起相关笔记", "3 · 提炼关键重点", "4 · 变成实际成果"],
    help: ["AI 帮忙：语音转成笔记", "AI 帮忙：建议内容关联", "AI 帮忙：综合多份资料", "AI 帮忙：用笔记起草"],
    alt: "个人知识管理的四个画面：保存书中片段、把笔记连到项目、提炼重点、完成作品。靛蓝色的麦克风、连线、放大镜与草稿表示 AI 可以帮忙之处；人的双手仍在选择、整理和修改。",
    caption: "PKM 的循环还在。AI 可以分担工作；留什么、怎么用，仍由你决定。有用的成果存回去，下个项目就能接着用。",
    sources: "概念示意，参考",
  },
};

export function SecondBrainConcept({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <figure data-second-brain-concept className="mx-auto mt-7 max-w-[680px]">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src="/images/illustrations/second-brain-pkm-ai.png"
          width={1254}
          height={1254}
          alt={text.alt}
          sizes="(max-width: 640px) calc(100vw - 32px), 680px"
          className="h-auto w-full"
        />
        {text.stages.map((stage, i) => (
          <p key={stage} className="absolute w-1/2 px-1 text-center text-sm font-semibold leading-tight text-[#34352f] sm:text-base" style={{ left: i % 2 ? "50%" : 0, top: i < 2 ? "1%" : "50%" }}>{stage}</p>
        ))}
        {text.help.map((help, i) => (
          <p key={help} className="absolute w-1/2 px-1 text-center text-xs font-medium leading-tight text-[#283b8e] sm:text-sm" style={{ left: i % 2 ? "50%" : 0, top: i < 2 ? "44%" : "94%" }}>{help}</p>
        ))}
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-[var(--o-text-muted)]">
        <p>{text.caption}</p>
        <p className="mt-2 text-xs">{text.sources}{" "}<a className="underline underline-offset-4" href="https://fortelabs.com/blog/basboverview/">{locale === "en" ? "Tiago Forte’s CODE" : "Tiago Forte 的 CODE"}</a>{" · "}<a className="underline underline-offset-4" href="https://www.ronforbes.com/blog/building-your-ai-second-brain">Ron Forbes</a></p>
      </figcaption>
    </figure>
  );
}
