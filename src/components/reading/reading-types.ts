export type ReadingItem = { href: string; label: string; english?: boolean; searchText?: string };
export type ReadingGroup = { id: string; label: string; items: ReadingItem[] };
export type TocItem = { id: string; label: string };
