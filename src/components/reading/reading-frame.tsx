"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/locales";

export type ReadingItem = { href: string; label: string; english?: boolean; searchText?: string };
export type ReadingGroup = { id: string; label: string; items: ReadingItem[] };
export type TocItem = { id: string; label: string };
export type ReadingFrameProps = {
  locale: Locale;
  currentPath: string;
  groups: ReadingGroup[];
  toc?: TocItem[];
  children: ReactNode;
  index?: boolean;
};

type Chrome = {
  library: string; contents: string; search: string;
  searchPlaceholder: string; noResults: string; english: string; close: string;
  openLibrary: string; articles: string;
};

const COPY: Record<Locale, Chrome> = {
  en: { library: "Library", contents: "On this page", search: "Search articles", searchPlaceholder: "Find an article…", noResults: "No matching articles.", english: "English", close: "Close", openLibrary: "Browse articles", articles: "articles" },
  "zh-TW": { library: "文章索引", contents: "本文章節", search: "搜尋文章", searchPlaceholder: "搜尋文章…", noResults: "找不到符合的文章。", english: "英文", close: "關閉", openLibrary: "文章索引", articles: "篇文章" },
  "zh-CN": { library: "文章索引", contents: "本文章节", search: "搜索文章", searchPlaceholder: "搜索文章…", noResults: "没有找到匹配的文章。", english: "英文", close: "关闭", openLibrary: "文章索引", articles: "篇文章" },
};

export default function ReadingFrame({ locale, currentPath, groups, toc = [], children, index = false }: ReadingFrameProps) {
  const copy = COPY[locale];
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(true);
  const totalCount = groups.reduce((sum, group) => sum + group.items.length, 0);
  const normalizedCurrent = (pathname || currentPath).replace(/\/$/, "") || "/";

  const filteredGroups = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    if (!needle) return groups;
    return groups.map(group => ({ ...group, items: group.items.filter(item => `${item.label} ${item.searchText ?? ""}`.toLocaleLowerCase(locale).includes(needle)) })).filter(group => group.items.length > 0);
  }, [groups, locale, query]);

  const openDialog = () => {
    setLibraryOpen(true);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const closeDialog = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    if (dialogRef.current?.open) dialogRef.current.close();
    setLibraryOpen(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setLibraryOpen(false);
      if (restoreFocusRef.current) requestAnimationFrame(() => openerRef.current?.focus());
      restoreFocusRef.current = true;
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!libraryOpen) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = priorOverflow; };
  }, [libraryOpen]);

  useEffect(() => {
    if (!toc.length) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const targets = toc.map(item => ({ item, node: document.getElementById(item.id) })).filter((entry): entry is { item: TocItem; node: HTMLElement } => entry.node instanceof HTMLElement);
        let active = targets[0];
        for (const target of targets) {
          if (target.node.getBoundingClientRect().top <= 160) active = target;
          else break;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = targets.at(-1) ?? active;
        if (active) setActiveId(active.item.id);
      });
    };
    if (window.location.hash) {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (toc.some(item => item.id === hash)) setActiveId(hash);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [toc]);

  useEffect(() => {
    if (!activeId || libraryOpen) return;
    const list = document.querySelector<HTMLElement>(".reading-desktop-toc .reading-toc ul");
    const link = list?.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!list || !link) return;
    const listBounds = list.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    if (linkBounds.top < listBounds.top) list.scrollTop -= listBounds.top - linkBounds.top;
    else if (linkBounds.bottom > listBounds.bottom) list.scrollTop += linkBounds.bottom - listBounds.bottom;
  }, [activeId, libraryOpen]);

  const library = (mobile = false) => <nav className="reading-library" aria-label={copy.library}>
    <div className="reading-library-heading"><h2>{copy.library}</h2><span>{totalCount} {copy.articles}</span></div>
    <label className="reading-search"><span className="reading-visually-hidden">{copy.search}</span><svg aria-hidden="true" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} /></label>
    <div className="reading-groups">
      {filteredGroups.length ? filteredGroups.map(group => {
        const currentGroup = group.items.some(item => item.href.replace(/\/$/, "") === normalizedCurrent);
        return <details key={group.id} open={query.length > 0 || currentGroup || index}>
          <summary>{group.label}<span>{group.items.length}</span></summary>
          <ul>{group.items.map(item => <li key={item.href}><Link href={item.href} title={item.searchText ?? item.label} prefetch={false} aria-current={item.href.replace(/\/$/, "") === normalizedCurrent ? "page" : undefined} onClick={mobile ? () => closeDialog(false) : undefined}>{item.label}{item.english && locale !== "en" && <small>{copy.english}</small>}</Link></li>)}</ul>
        </details>;
      }) : <p className="reading-empty">{copy.noResults}</p>}
    </div>
  </nav>;

  const contents = () => <nav className="reading-toc" aria-label={copy.contents}>
    <h2>{copy.contents}</h2>
    <ul>{toc.map(item => <li key={item.id}><a href={`#${encodeURIComponent(item.id)}`} aria-current={activeId === item.id ? "location" : undefined}>{item.label}</a></li>)}</ul>
  </nav>;

  return <div className={`reading-frame${index ? " reading-frame-index" : ""}${toc.length ? " reading-frame-has-toc" : ""}`}>
    <aside className="reading-desktop-library">{library()}</aside>
    <div className="reading-mobile-bar">
      <button ref={openerRef} type="button" aria-haspopup="dialog" aria-expanded={libraryOpen} aria-controls="reading-navigation-dialog" onClick={openDialog}><span>{copy.openLibrary}</span><svg aria-hidden="true" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" /></svg></button>
    </div>
    <div className="reading-main"><div className="reading-content">{children}</div></div>
    {toc.length > 0 && <aside className="reading-desktop-toc">{contents()}</aside>}
    <dialog id="reading-navigation-dialog" className="reading-dialog" aria-label={copy.library} ref={dialogRef} onClick={event => { if (event.target === dialogRef.current) closeDialog(); }}>
      <div className="reading-dialog-inner"><div className="reading-dialog-header"><span>{copy.library}</span><button type="button" onClick={() => closeDialog()} aria-label={copy.close}>×</button></div>{library(true)}</div>
    </dialog>
  </div>;
}
