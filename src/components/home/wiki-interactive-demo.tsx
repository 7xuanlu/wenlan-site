"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/locales";
import { getDemoLibrary, libraryCopy } from "./wiki-demo-library";
import { demoCopy, inspectorCopy, getDemoSourcePreview, type DemoKind, type DemoResource } from "./wiki-demo-data";
import { WikiDemoGraph } from "./wiki-demo-graph";
import { WikiReaderContent } from "./wiki-reader-content";
import { DemoIconRail, NativeRailIcon, ShellIcon, shellCopy, type DemoDestination } from "./wiki-demo-shell";
import { WikiDemoSpaces } from "./wiki-demo-spaces";
import { WikiDemoSources, isDemoSource, type DemoSourceFilter } from "./wiki-demo-sources";
import { WikiDemoTopics, type TopicFilter } from "./wiki-demo-topics";
import { WikiLibraryGraph } from "./wiki-library-graph";
import { getDemoGraphEdges, getDemoGraphNeighbors } from "./wiki-library-graph-data";

function TypeIcon({ kind }: { kind: DemoKind }) {
  if (kind === "topic") return <NativeRailIcon name="topics" size={15} className="inline-block shrink-0 align-[-2px]" />;
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" className="inline-block size-[15px] shrink-0 align-[-2px]">
    {kind === "tag" ? <path d="M7 3 5 17M14 3l-2 14M3 7h14M2 13h14" /> : kind === "page" ? <><rect x="3" y="2.5" width="14" height="15" rx="1.5" /><path d="M6 3v14m3-10h5m-5 3h5" /></>
      : kind === "file" ? <><path d="M5 2.5h7l4 4v11H5zM12 3v4h4M8 11h5m-5 3h5" /></>
      : kind === "url" ? <><circle cx="10" cy="10" r="7" /><ellipse cx="10" cy="10" rx="3" ry="7" /><path d="M3 10h14" /></>
      : kind === "obsidian" ? <path d="m10 2 5 3 2 9-7 4-6-6 2-7 4-3zm0 0-1 7 8 5M9 9l1 9M4 12l5-3" />
      : <><path d="M10 4C7 1 3 4 4 7c-3 2-2 6 1 6 0 4 4 5 5 2m0-11c3-3 7 0 6 3 3 2 2 6-1 6 0 4-4 5-5 2V4Z" /><path d="m6 7 2 2m6-2-2 2m-6 4 2-1m6 1-2-1" /></>}
  </svg>;
}

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e58c8]";

type Preview = { resource: DemoResource; anchor: HTMLElement; left: number; top: number; width: number; above: boolean };

export function WikiInteractiveDemo({ locale }: { locale: Locale }) {
  const copy = demoCopy[locale];
  const shell = shellCopy[locale];
  const info = inspectorCopy[locale];
  const [allSources, setAllSources] = useState(false);
  const [destination, setDestination] = useState<DemoDestination>("wiki");
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<DemoSourceFilter>("all");
  const [sourceQuery, setSourceQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");
  const [topicQuery, setTopicQuery] = useState("");
  const [library] = useState(() => getDemoLibrary(locale));
  const { resources, notes, groups } = library;
  const labels = libraryCopy[locale];
  const [pageTrail, setPageTrail] = useState(["page-agent-loop"]);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [graphSelection, setGraphSelection] = useState("page-agent-loop");
  const graphInspectorRef = useRef<HTMLElement>(null);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const spaces = groups.map((group) => ({ id: group.id, title: group.id === "group-project" ? "Lumo 2.0" : group.title, notes: notes.filter((note) => note.groupId === group.id) }));
  const selectedSpace = spaces.find((space) => space.id === spaceId);
  const activeNote = notes.find((note) => note.id === pageTrail.at(-1))!;
  const [opened, setOpened] = useState<string[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const previewId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileScroll = useRef(0);
  const readerHeading = useRef<HTMLHeadingElement>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const focusReader = useRef(false);
  const keyboardPreview = useRef(false);
  const touchInteraction = useRef(false);
  const title = activeNote.title;
  const current = resources.find((resource) => resource.id === opened.at(-1));
  const attachedResources = resources.filter((resource) => activeNote.sourceIds.includes(resource.id));
  const sourceResources = attachedResources.filter(isDemoSource);
  const memoryResources = attachedResources.filter((resource) => resource.kind === "memory");
  const graphEdges = getDemoGraphEdges(resources, notes);
  const selectedGraphResource = resources.find((resource) => resource.id === graphSelection) ?? activeNote;
  const graphNeighbors = getDemoGraphNeighbors(selectedGraphResource.id, graphEdges);
  const connectionGroups = (neighborIds: readonly string[]) => [
    { label: copy.related, items: resources.filter((resource) => neighborIds.includes(resource.id) && resource.kind === "page") },
    { label: shell.topics, items: resources.filter((resource) => neighborIds.includes(resource.id) && resource.kind === "topic") },
    { label: shell.memories, items: resources.filter((resource) => neighborIds.includes(resource.id) && resource.kind === "memory") },
    { label: copy.sources, items: resources.filter((resource) => neighborIds.includes(resource.id) && isDemoSource(resource)) },
  ];
  const graphGroups = connectionGroups(graphNeighbors);
  const topicGroups = current?.kind === "topic" ? connectionGroups(getDemoGraphNeighbors(current.id, graphEdges)).filter((group) => group.items.length > 0) : [];
  const referencedBy = current ? notes.filter((note) => note.sourceIds.includes(current.id)) : [];
  const topics = resources.filter((resource) => resource.kind === "topic");
  const noteTopics = topics.filter((resource) => activeNote.topicIds.includes(resource.id));
  const graphIds = [...activeNote.relatedIds, ...activeNote.topicIds, ...activeNote.sourceIds];
  const filtered = sourceResources.filter((resource) => !tag || resource.tags.includes(tag));
  const topicNames = new Set(topics.map((topic) => topic.title.normalize("NFKC").trim().toLocaleLowerCase()));
  const uniqueTags = (values: readonly string[]) => [...new Set(values)].filter((value) => !topicNames.has(value.normalize("NFKC").trim().toLocaleLowerCase()));
  const tags = uniqueTags([...activeNote.tags, ...sourceResources.flatMap((resource) => resource.tags)]);

  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const dismiss = () => { cancelClose(); setPreview(null); };
  const scheduleClose = (anchor: HTMLElement) => { cancelClose(); closeTimer.current = setTimeout(() => setPreview((value) => value?.anchor === anchor ? null : value), 160); };
  const showPreview = (resource: DemoResource, anchor: HTMLElement) => {
    cancelClose();
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(310, window.innerWidth - 24);
    const above = window.innerHeight - rect.bottom < 270 && rect.top > 270;
    setPreview({ resource, anchor, width, left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)), top: above ? rect.top - 8 : rect.bottom + 8, above });
  };
  const selectNote = (id: string, remember = true) => {
    dismiss(); setOpened([]); setTag(null); setAllSources(false); setDestination("wiki"); setQuery(""); setDirectoryOpen(false);
    keyboardPreview.current = false;
    if (remember) setPageTrail((trail) => trail.at(-1) === id ? trail : [...trail, id]);
  };
  const openResource = (resource: DemoResource, anchor?: HTMLElement) => {
    if (destination === "wiki" && resource.kind === "page" && notes.some((note) => note.id === resource.id)) { selectNote(resource.id); return; }
    dismiss();
    keyboardPreview.current = false;
    if (!current) {
      originRef.current = anchor ?? null;
      mobileScroll.current = contentRef.current?.scrollTop ?? 0;
    }
    setOpened((stack) => [...stack, resource.id]);
    focusReader.current = true;
  };
  const closeReader = () => {
    dismiss();
    setOpened([]);
    // The inline trigger remains mounted on both responsive layouts.
    requestAnimationFrame(() => originRef.current?.focus({ preventScroll: true }));
  };
  const back = () => {
    dismiss();
    if (opened.length <= 1) closeReader();
    else { setOpened((stack) => stack.slice(0, -1)); focusReader.current = true; }
  };

  useEffect(() => {
    if (focusReader.current && current) {
      readerHeading.current?.focus({ preventScroll: true });
      focusReader.current = false;
    }
  }, [current]);
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    mobileScroll.current = 0;
  }, [activeNote.id, destination, spaceId]);
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    content.scrollTop = current ? 0 : mobileScroll.current;
  }, [current]);
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
  useEffect(() => {
    if (!preview) return;
    const position = (event: Event) => {
      // A scrolled-out reference should not leave a preview floating outside its pane.
      if (event.type === "scroll" && event.target instanceof Node && rootRef.current?.contains(event.target)) {
        setPreview(null);
        return;
      }
      setPreview((value) => {
        if (!value || !value.anchor.isConnected) return null;
        const rect = value.anchor.getBoundingClientRect();
        if ((rect.bottom < 64 || rect.top > window.innerHeight) && document.activeElement !== value.anchor) return null;
        const width = Math.min(310, window.innerWidth - 24);
        const above = window.innerHeight - rect.bottom < 270 && rect.top > 270;
        return { ...value, width, left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)), top: above ? rect.top - 8 : rect.bottom + 8, above };
      });
    };
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => { window.removeEventListener("resize", position); window.removeEventListener("scroll", position, true); };
  }, [preview?.anchor]);

  const reference = (id: string, label?: ReactNode, row = false) => {
    const resource = resources.find((item) => item.id === id);
    if (!resource) return null;
    return <button type="button" data-demo-reference={id} data-reference-kind={resource.kind}
      aria-describedby={preview?.resource.id === id ? previewId : undefined}
      onPointerEnter={(event) => { if (event.pointerType !== "touch" && !keyboardPreview.current) showPreview(resource, event.currentTarget); }}
      onPointerMove={(event) => { if (event.pointerType === "mouse" && keyboardPreview.current && (event.movementX || event.movementY)) { keyboardPreview.current = false; showPreview(resource, event.currentTarget); } }}
      onPointerLeave={(event) => { if (!keyboardPreview.current) scheduleClose(event.currentTarget); }}
      onFocus={(event) => { if (!touchInteraction.current) { keyboardPreview.current = true; showPreview(resource, event.currentTarget); } }}
      onBlur={(event) => scheduleClose(event.currentTarget)}
      onClick={(event) => openResource(resource, event.currentTarget)}
      className={`${focusClass} ${row ? "flex w-full items-start gap-2 rounded px-2 py-2 text-left text-[13px] leading-5 hover:bg-[#f1f1f3]" : resource.kind === "topic" ? "inline-flex items-center gap-1 rounded border border-[#e3e7ee] px-2 py-1 text-[11px] text-[#586174] hover:bg-[#f1f1f3]" : "inline cursor-pointer rounded-sm text-[#5e58c8] underline decoration-[#bab2d6] underline-offset-[4px] hover:decoration-[#5e58c8]"}`}>
      <span className={row ? "mt-0.5 text-[#7b8496]" : "mr-1"}><TypeIcon kind={resource.kind} /></span>
      {row ? <span className="min-w-0"><span className="block break-words">{label ?? resource.title}</span><span className="mt-0.5 block text-[10px] text-[#586174]">{copy.kind[resource.kind]}</span></span> : label ?? resource.title}
    </button>;
  };
  const tagButton = (value: string) => {
    const tagPreview: DemoResource = { id: `tag:${value}`, kind: "tag", title: `# ${value}`, body: sourceResources.filter((resource) => resource.tags.includes(value)).map((resource) => `- ${resource.title}`).join("\n"), tags: [] };
    return <button key={value} type="button" data-demo-tag={value} aria-pressed={tag === value}
      aria-describedby={preview?.resource.id === tagPreview.id ? previewId : undefined}
      onPointerEnter={(event) => { if (event.pointerType !== "touch" && !keyboardPreview.current) showPreview(tagPreview, event.currentTarget); }} onPointerLeave={(event) => { if (!keyboardPreview.current) scheduleClose(event.currentTarget); }}
      onPointerMove={(event) => { if (event.pointerType === "mouse" && keyboardPreview.current && (event.movementX || event.movementY)) { keyboardPreview.current = false; showPreview(tagPreview, event.currentTarget); } }}
      onFocus={(event) => { if (!touchInteraction.current) { keyboardPreview.current = true; showPreview(tagPreview, event.currentTarget); } }} onBlur={(event) => scheduleClose(event.currentTarget)}
      onClick={() => { dismiss(); setTag((old) => old === value ? null : value); if (current) closeReader(); }}
      className={`${focusClass} rounded border px-2 py-1 text-[11px] ${tag === value ? "border-[#bab2d6] bg-[#f0edf8] text-[#5e58c8]" : "border-[#e3e7ee] text-[#586174] hover:bg-[#f1f1f3]"}`}># {value}</button>;
  };

  const selectGraphNode = (id: string) => {
    dismiss(); setOpened([]); setGraphSelection(id);
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 767px)").matches && contentRef.current && graphInspectorRef.current) {
        const content = contentRef.current;
        content.scrollTop += graphInspectorRef.current.getBoundingClientRect().top - content.getBoundingClientRect().top;
      }
    });
  };
  const navigate = (next: DemoDestination) => { dismiss(); setOpened([]); setDestination(next); setSpaceId(null); setQuery(""); setDirectoryOpen(false); };
  const goBack = () => { if (current) back(); else if (destination === "spaces" && spaceId) setSpaceId(null); else if (destination !== "wiki") navigate("wiki"); else if (pageTrail.length > 1) { selectNote(pageTrail[pageTrail.length - 2], false); setPageTrail((trail) => trail.slice(0, -1)); } };
  const collection = resources.filter((resource) => destination === "memories" ? resource.kind === "memory" : destination === "sources" ? isDemoSource(resource) : destination === "spaces" ? resource.kind === "page" : true).filter((resource) => !query || `${resource.title} ${resource.body}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  return <div ref={rootRef} data-interactive-wiki className="min-w-0" onPointerDownCapture={(event) => { touchInteraction.current = event.pointerType === "touch"; }} onKeyDownCapture={(event) => {
    touchInteraction.current = false;
    if (event.key !== "Escape") return;
    if (directoryOpen) { event.preventDefault(); event.stopPropagation(); setDirectoryOpen(false); rootRef.current?.querySelector<HTMLButtonElement>("[data-directory-toggle]")?.focus({ preventScroll: true }); }
    else if (preview) { event.preventDefault(); event.stopPropagation(); dismiss(); }
    else if (current) { event.preventDefault(); event.stopPropagation(); back(); }
  }}>
    <div className="wiki-demo-shell" data-has-reader={Boolean(current)} data-destination={destination}>
      <header className="wiki-demo-header">
        <span aria-hidden="true" className="hidden shrink-0 gap-1.5 sm:flex"><span className="size-2.5 rounded-full bg-[#d7d7d9]" /><span className="size-2.5 rounded-full bg-[#d7d7d9]" /><span className="size-2.5 rounded-full bg-[#d7d7d9]" /></span>
        <button type="button" aria-label={shell.back} disabled={!current && destination === "wiki" && pageTrail.length === 1} onClick={goBack} className={`${focusClass} grid size-8 shrink-0 place-items-center rounded text-[#586174] hover:bg-[#f0f0f3] disabled:opacity-35`}><ShellIcon name="back" /></button>
        <span className="min-w-0 self-stretch rounded-t-lg bg-white px-3 pt-4 text-xs font-medium"><span className="block truncate">{destination === "wiki" ? title : shell[destination]}</span></span>
      </header>
      <DemoIconRail locale={locale} active={destination} onNavigate={navigate} />
      <nav className="wiki-demo-directory" aria-label={labels.library}>
        <div className="wiki-demo-directory-heading"><span>{labels.library}</span><span>{notes.length}</span></div>
        <button type="button" data-directory-toggle aria-expanded={directoryOpen} aria-controls={`${previewId}-directory`} onClick={() => setDirectoryOpen((value) => !value)} className={focusClass}>{labels.library}<span>{directoryOpen ? "−" : "+"}</span></button>
        <div id={`${previewId}-directory`} className="wiki-demo-directory-list" data-expanded={directoryOpen}>
          {groups.map((group) => <section key={group.id}>
            <button type="button" className={`wiki-demo-group ${focusClass}`} onClick={() => selectNote(notes.find((note) => note.groupId === group.id)!.id)}><TypeIcon kind="topic" />{group.title}</button>
            {notes.filter((note) => note.groupId === group.id).map((note) => <button key={note.id} type="button" data-demo-note={note.id} aria-current={activeNote.id === note.id && destination === "wiki" ? "page" : undefined} onClick={() => selectNote(note.id)} className={`wiki-demo-note ${focusClass}`}><TypeIcon kind="page" /><span>{note.title}</span></button>)}
          </section>)}
        </div>
      </nav>
      <div ref={contentRef} className="contents">
        <article key={`${activeNote.id}:${destination}:${spaceId ?? "all"}`} data-active-note={activeNote.id} aria-label={destination === "wiki" ? title : shell[destination]} className="wiki-demo-document px-4 py-8 text-[14px] leading-[1.85] sm:px-8 sm:py-12 lg:px-8">
        {destination !== "wiki" ? <div data-demo-collection={destination}>
          {!(destination === "spaces" && selectedSpace) && <h3 className="mb-7 font-serif text-[27px] font-semibold">{shell[destination]}</h3>}
          {destination === "search" && <input data-demo-search autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={shell.query} aria-label={shell.search} className="mb-5 w-full rounded-md border border-[#e3e7ee] bg-white px-3 py-2 text-sm outline-offset-2 focus:outline-[#5e58c8]" />}
          {destination === "spaces" ? <WikiDemoSpaces locale={locale} spaces={spaces} selected={selectedSpace} onSelect={setSpaceId} onOpenNote={selectNote} />
            : destination === "topics" ? <WikiDemoTopics locale={locale} topics={topics} filter={topicFilter} query={topicQuery} onFilterChange={(value) => { dismiss(); setOpened([]); setTopicFilter(value); }} onQueryChange={(value) => { dismiss(); setOpened([]); setTopicQuery(value); }} onOpen={openResource} />
            : destination === "sources" ? <WikiDemoSources locale={locale} resources={resources} reference={reference} filter={sourceFilter} query={sourceQuery} onFilterChange={(value) => { dismiss(); setOpened([]); setSourceFilter(value); }} onQueryChange={(value) => { dismiss(); setOpened([]); setSourceQuery(value); }} />
            : destination === "graph" ? <WikiLibraryGraph locale={locale} resources={resources} notes={notes} selectedId={selectedGraphResource.id} onSelect={selectGraphNode} onPreview={(id, anchor) => { const resource = resources.find((item) => item.id === id); if (resource && !touchInteraction.current) showPreview(resource, anchor); }} onPreviewEnd={scheduleClose} />
            : <ul className="divide-y divide-[#e3e7ee]">{collection.map((resource) => <li key={resource.id}>{reference(resource.id, undefined, true)}</li>)}{collection.length === 0 && <li className="py-6 text-sm text-[#586174]">{shell.none}</li>}</ul>}
        </div> : <>
          <h3 className="mb-8 font-serif text-[24px] leading-[1.45] font-semibold tracking-tight lg:text-[29px]">{title}</h3>
          <div className="wiki-demo-note-body"><WikiReaderContent body={activeNote.body} title={title} renderReference={(id, label) => reference(id, label)} /></div>
        </>}
        </article>
        {destination === "spaces" || ((destination === "sources" || destination === "topics") && !current) ? null : current ? <aside data-demo-reader={current.id} className="flex h-[650px] min-w-0 flex-col border-t border-[#e3e7ee] bg-[#fcfcfb] sm:h-[720px] sm:border-t-0 sm:border-l">
          <header className="flex items-center gap-2 border-b border-[#e3e7ee] px-3 py-2">
            <button type="button" data-reader-back aria-label={copy.back} onClick={back} className={`${focusClass} size-9 shrink-0 rounded hover:bg-[#f1f1f3]`}>←</button>
            <span className="flex flex-1 items-center gap-1.5 text-xs text-[#586174]"><TypeIcon kind={current.kind} />{copy.kind[current.kind]}</span>
            <button type="button" data-reader-close aria-label={copy.close} onClick={closeReader} className={`${focusClass} size-9 rounded text-lg hover:bg-[#f1f1f3]`}>×</button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6" data-reader-scroll>
            <h4 ref={readerHeading} tabIndex={-1} className="mb-3 break-words text-[18px] leading-7 font-semibold outline-none">{current.title.replace(/\.md$/, "")}</h4>
            {current.location && <p className="mb-4 break-all text-[11px] leading-5 text-[#586174]">{current.location}<span className="block">{copy.fixture}</span></p>}
            <div data-reader-body><WikiReaderContent body={current.body} title={current.title} renderReference={(id, label) => reference(id, label)} /></div>
            {topicGroups.map((group) => <section key={group.label} data-topic-content className="mt-6"><h5 className="mb-2 text-xs font-semibold">{group.label} · {group.items.length}</h5>{group.items.map((resource) => <div key={resource.id}>{reference(resource.id, undefined, true)}</div>)}</section>)}
            {current.tags.length > 0 && <div className="mt-7 flex flex-wrap gap-1.5" aria-label={copy.tags}>{uniqueTags(current.tags).map(tagButton)}</div>}
            {referencedBy.length > 0 && <div className="mt-6 border-t border-[#e3e7ee] pt-4"><p className="mb-2 text-[11px] text-[#586174]">{copy.usedIn}</p>{referencedBy.map((note) => <div key={note.id}>{reference(note.id)}</div>)}</div>}
            {current.id === "page-decision" && <div className="mt-5">{reference("file-beta", undefined, true)}{reference("memory-decision", undefined, true)}</div>}
            {current.id === "page-checklist" && <div className="mt-5">{reference("file-checklist", undefined, true)}</div>}
          </div>
          {current.href && <a href={current.href} target="_blank" rel="noopener noreferrer" className={`${focusClass} border-t border-[#e3e7ee] px-5 py-3 text-xs text-[#5e58c8] underline underline-offset-4`}>{copy.original} ↗</a>}
        </aside> : destination === "graph" ? <aside ref={graphInspectorRef} data-demo-graph-inspector={selectedGraphResource.id} aria-label={copy.info}>
          <div className="flex items-center justify-between px-5 py-3 text-xs font-semibold"><span>{copy.info}</span><button type="button" className={`${focusClass} text-[#5e58c8] sm:hidden`} onClick={() => { if (contentRef.current) contentRef.current.scrollTop = 0; }}>{shell.graph} ↑</button></div>
          <div className="wiki-demo-info-body">
            <section className="wiki-demo-graph-selection">
              <p className="mb-2 flex items-center gap-1.5 text-xs text-[#586174]"><TypeIcon kind={selectedGraphResource.kind} />{copy.kind[selectedGraphResource.kind]}</p>
              <h4 aria-live="polite" className="!text-base !leading-6">{selectedGraphResource.title}</h4>
              <button type="button" onClick={(event) => openResource(selectedGraphResource, event.currentTarget)} className={`${focusClass} mt-2 text-xs text-[#5e58c8] underline underline-offset-4`}>{copy.open} ↗</button>
            </section>
            {graphGroups.filter((group) => group.items.length > 0).map((group) => <section key={group.label} className="wiki-demo-graph-neighbors">
              <h4>{group.label} <span className="font-normal text-[#586174]">{group.items.length}</span></h4>
              {group.items.map((resource) => resource.kind === "page" || resource.kind === "topic" ? <button key={resource.id} type="button" data-graph-related={resource.id} onClick={() => selectGraphNode(resource.id)} className={`${focusClass} flex w-full items-start gap-2 rounded px-2 py-2 text-left text-[13px] leading-5 hover:bg-[#f1f1f3]`}><span className="text-[#7b8496]"><TypeIcon kind={resource.kind} /></span><span>{resource.title}</span></button> : <div key={resource.id}>{reference(resource.id, undefined, true)}</div>)}
            </section>)}
          </div>
        </aside> : <aside key={`info:${activeNote.id}`} data-note-info={activeNote.id} aria-label={copy.info} className="min-w-0 border-t border-[#e3e7ee] bg-[#fcfcfb] sm:max-h-[772px] sm:overflow-y-auto sm:border-t-0 sm:border-l">
          <div className="border-b border-[#e3e7ee] px-5 py-3 text-xs font-semibold">{copy.info}</div>
          <div className="wiki-demo-info-body">
            <section><h4>{info.details}</h4><p className="text-xs text-[#586174]">{info.wiki} · v{activeNote.version} · {sourceResources.length} {copy.sources}{memoryResources.length > 0 && <> · {memoryResources.length} {shell.memories}</>}</p></section>
            <section data-demo-local-graph>
              <div className="flex items-center justify-between"><h4>{info.graph}</h4><button type="button" onClick={() => { setGraphSelection(activeNote.id); navigate("graph"); }} className={`${focusClass} text-[11px] text-[#5e58c8] hover:underline`}>{info.openGraph} ↗</button></div>
              <WikiDemoGraph center={activeNote} ids={graphIds} resources={resources} reference={reference} compact />
            </section>
            <section className="wiki-demo-compact-links"><div className="flex items-center justify-between"><h4>{copy.sources} <span className="font-normal text-[#586174]">{filtered.length}</span></h4>{tag && <button data-clear-tag type="button" onClick={() => { setTag(null); setAllSources(false); }} className={`${focusClass} text-[10px] text-[#5e58c8] underline underline-offset-2`}>{copy.all}</button>}</div>
              {filtered.length === 0 && <p className="text-xs text-[#586174]">{labels.noSources}</p>}
              <ul data-demo-sources className={allSources ? "max-h-[200px] overflow-y-auto" : undefined}>{(allSources ? filtered : getDemoSourcePreview(filtered)).map((resource) => <li key={resource.id}>{reference(resource.id, undefined, true)}</li>)}</ul>
              {filtered.length > 3 && <button data-demo-expand-sources type="button" aria-expanded={allSources} onClick={() => { dismiss(); setAllSources((value) => !value); }} className={`${focusClass} mt-1 px-2 py-1 text-[11px] text-[#5e58c8] hover:underline`}>{allSources ? info.less : `${info.more} (${filtered.length})`} {allSources ? "↑" : "↓"}</button>}
            </section>
            {memoryResources.length > 0 && <section className="wiki-demo-compact-links" data-demo-memories><h4>{shell.memories} <span className="font-normal text-[#586174]">{memoryResources.length}</span></h4>{memoryResources.map((resource) => <div key={resource.id}>{reference(resource.id, undefined, true)}</div>)}</section>}
            <section data-demo-topics><h4>{shell.topics}</h4><div className="flex flex-wrap gap-1.5">{noteTopics.map((topic) => <span key={topic.id}>{reference(topic.id)}</span>)}</div></section>
            <section data-demo-tags><h4>{copy.tags}</h4><div className="flex flex-wrap gap-1.5">{tags.map(tagButton)}</div></section>
            <section className="wiki-demo-compact-links"><h4>{copy.related}</h4>{activeNote.relatedIds.map((id) => <div key={id}>{reference(id, undefined, true)}</div>)}</section>
            <section data-demo-history><h4>{info.history} <span className="font-normal text-[#586174]">{activeNote.revisions.length}</span></h4>
              <ol className="space-y-1">
                {activeNote.revisions.map((entry) => <li key={entry.version}><details className="wiki-demo-revision">
                  <summary className={focusClass}>
                    <span className="wiki-demo-revision-copy">
                      <span className="wiki-demo-revision-title"><span className="font-mono text-[#586174]">v{entry.version}</span><span className="wiki-demo-revision-status">{entry.version === activeNote.version ? labels.current : labels.previous}</span></span><span className="block mt-1">{entry.summary}</span>
                      <span className="wiki-demo-revision-meta"><span aria-label={`${info.editedBy}: ${entry.author}`}>{entry.author}</span><time dateTime={entry.at} title={entry.at} aria-label={`${activeNote.groupId === "group-project" ? info.updatedAt : labels.savedAt}: ${entry.at}`}>{entry.timeLabel}</time><span>{entry.sourceIds.length} {copy.sources}</span></span>
                    </span>
                  </summary>
                  <div className="wiki-demo-revision-sources"><p>{entry.detail}</p>
                    {entry.body && <div data-revision-body className="wiki-demo-revision-body"><h5>{labels.revisionContent}</h5><WikiReaderContent body={entry.body} title={entry.title ?? activeNote.title} renderReference={(id, label) => reference(id, label)} /></div>}
                    {entry.sourceIds.length > 0 && <div className="mt-3"><h5>{labels.revisionSources}</h5>{entry.sourceIds.map((id) => <div key={id}>{reference(id)}</div>)}</div>}
                    </div>
                </details></li>)}
              </ol>
              {activeNote.revisions.length === 1 && <p className="mt-1 text-[11px] text-[#586174]">{labels.noEarlier}</p>}
            </section>

          </div>
        </aside>}
      </div>
    </div>
    {preview && createPortal(<div id={previewId} role="tooltip" data-demo-hover={preview.resource.id} onPointerEnter={cancelClose} onPointerLeave={() => { if (!keyboardPreview.current) scheduleClose(preview.anchor); }}
      className="fixed z-[100] rounded-lg border border-[#e3e7ee] bg-[#ffffff] p-4 text-[#1a1a2e] shadow-[0_8px_30px_#1a1a2e12]"
      style={{ width: preview.width, left: preview.left, top: preview.top, transform: preview.above ? "translateY(-100%)" : undefined, maxHeight: "min(300px,70vh)", overflow: "auto" }}>
      <p className="mb-2 flex items-center gap-1.5 text-[10px] text-[#586174]"><TypeIcon kind={preview.resource.kind} />{copy.kind[preview.resource.kind]}</p>
      <p className="mb-2 text-sm leading-5 font-semibold">{preview.resource.title.replace(/\.md$/, "")}</p>
      {preview.resource.location && <p className="mb-2 break-all text-[10px] text-[#586174]">{preview.resource.location}</p>}
      <div className="line-clamp-5"><WikiReaderContent body={preview.resource.body} title={preview.resource.title} compact /></div>
      <p className="mt-3 border-t border-[#e3e7ee] pt-2 text-[10px] text-[#586174]">{preview.resource.kind === "tag" ? copy.filter : copy.open}</p>
    </div>, document.body)}
  </div>;
}
