import type { Locale } from "@/i18n/locales";
import type { DemoNote } from "./wiki-demo-library";
import { NativeRailIcon } from "./wiki-demo-shell";

export type DemoSpace = { id: string; title: string; notes: DemoNote[] };

export function WikiDemoSpaces({ locale, spaces, selected, onSelect, onOpenNote }: {
  locale: Locale;
  spaces: DemoSpace[];
  selected: DemoSpace | undefined;
  onSelect: (id: string | null) => void;
  onOpenNote: (id: string) => void;
}) {
  const all = locale === "en" ? "All spaces" : locale === "zh-TW" ? "所有空間" : "所有空间";
  const pageCount = (count: number) => locale === "en" ? `${count} ${count === 1 ? "page" : "pages"}` : `${count} ${locale === "zh-TW" ? "個頁面" : "个页面"}`;
  return selected ? <div data-demo-space-content={selected.id}>
    <button type="button" className="wiki-demo-space-back" onClick={() => onSelect(null)}>← {all}</button>
    <header className="wiki-demo-space-heading"><NativeRailIcon name="spaces" /><h3>{selected.title}</h3><span>{pageCount(selected.notes.length)}</span></header>
    <ul className="wiki-demo-space-notes">
      {selected.notes.map((note) => <li key={note.id}><button type="button" data-space-note={note.id} onClick={() => onOpenNote(note.id)}><NativeRailIcon name="wiki" size={18} /><span>{note.title}</span><span aria-hidden="true">↗</span></button></li>)}
    </ul>
  </div> : <div className="wiki-demo-space-cards" data-demo-spaces>
    {spaces.map((space) => <button key={space.id} type="button" data-demo-space={space.id} className="wiki-demo-space-card" onClick={() => onSelect(space.id)}>
      <span className="wiki-demo-space-mark"><NativeRailIcon name="spaces" size={14} /></span>
      <span className="wiki-demo-space-title">{space.title}</span>
      <span className="wiki-demo-space-preview">{space.notes.slice(0, 2).map((note) => note.title).join(" · ")}</span>
      <span className="wiki-demo-space-count">{pageCount(space.notes.length)}</span>
    </button>)}
  </div>;
}
