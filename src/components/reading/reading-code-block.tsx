"use client";

import { useEffect, useRef, useState } from "react";
import { CodeBlock, type CodeBlockProps } from "fumadocs-ui/components/codeblock";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { Check, Clipboard } from "lucide-react";
import { copyTextSafely } from "@/lib/copy-text";

/** Keep Fumadocs' frame/scrolling while retaining Wenlan's clipboard-denial fallback. */
export function ReadingCodeBlock({children, ...props}: Omit<CodeBlockProps, "Actions" | "allowCopy">) {
  const figure = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {locale} = useI18n();
  const text = locale === "zh-TW" ? {copy: "複製", copied: "已複製", failed: "無法複製。請選取上方文字手動複製。"} : locale === "zh-CN" ? {copy: "复制", copied: "已复制", failed: "无法复制。请选择上方文字手动复制。"} : {copy: "Copy Text", copied: "Copied Text", failed: "Copy unavailable. Select the text above to copy it."};
  useEffect(() => () => {if (timer.current) clearTimeout(timer.current);}, []);
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    const code = figure.current?.querySelector("pre")?.textContent;
    if (code === undefined || code === null) return;
    const copied = await copyTextSafely(code, value => navigator.clipboard.writeText(value));
    setState(copied ? "copied" : "failed");
    if (copied) timer.current = setTimeout(() => setState("idle"), 2000);
  }
  return <><CodeBlock {...props} ref={figure} allowCopy={false} Actions={({className}) => (
    <button type="button" className={`inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-fd-ring ${className ?? ""}`} onClick={copy} aria-label={state === "copied" ? text.copied : text.copy}>
      {state === "copied" ? <Check size={15} /> : <Clipboard size={15} />}
    </button>
  )}>
    {children}
  </CodeBlock>
    <p role="status" className={state === "failed" ? "px-4 pt-3 text-xs text-fd-foreground" : "sr-only"}>{state === "failed" ? text.failed : state === "copied" ? text.copied : ""}</p>
  </>;
}
