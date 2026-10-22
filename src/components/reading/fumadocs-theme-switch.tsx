"use client";
import { useTheme } from "@/app/theme-provider";
import { Moon, Sun } from "lucide-react";
export function FumadocsThemeSwitch({locale}: {locale: string}) {
  const { theme, toggle } = useTheme();
  return <button type="button" aria-label={locale === "en" ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : locale === "zh-TW" ? (theme === "dark" ? "切換淺色模式" : "切換深色模式") : (theme === "dark" ? "切换浅色模式" : "切换深色模式")} onClick={toggle} className="inline-flex size-9 items-center justify-center rounded-md border border-fd-border text-fd-muted-foreground hover:bg-fd-accent">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>;
}
