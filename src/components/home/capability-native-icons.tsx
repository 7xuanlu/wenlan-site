import { topicContextIcons } from "./topic-context-icons";

export function KnowledgePageIcon() {
  return <svg className="wc-icon wc-knowledgePageIcon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    {topicContextIcons.Notebook.map((d, index) => <path key={index} d={d} />)}
  </svg>;
}

// Same mark as the App's memory/navigation/SpaceMark.tsx.
export function SpaceMark() {
  return <svg aria-hidden="true" className="wc-spaceMark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
    <path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  </svg>;
}
