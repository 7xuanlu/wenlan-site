/**
 * English rendering of the sanitized sample library in knowledge-story-data.ts.
 *
 * Only `title` and `body` are written here. Every other field (id, kind, x, y,
 * nativeX, nativeY, topicId) is taken from the Traditional Chinese record with
 * the same id, so layout, membership and links cannot drift between languages.
 * `#demo:<id>` link targets are identical to the source records; only the
 * visible link text is translated, and it matches the target's English title.
 *
 * The same English library is meant to be seeded into the native app later.
 */
import { knowledgeNodes, type KnowledgeNode } from './knowledge-story-data';
import { knowledgeIds } from './knowledge-story-ids';

const id = knowledgeIds;

type Entry = { title: string; body: string };

// Memory titles and bodies. The "Lessons kept" section of a page repeats the
// body of the memory it cites, exactly as in the source library.
const memory = {
  narrow: {
    title: "Narrow windows keep the article's left edge",
    body: "When the sidebar opens, the article's left edge stays put and the right side narrows so the text wraps naturally. Review the wide window, the narrow window, and the sidebar toggle together; a single screenshot is not enough.",
  },
  review: {
    title: 'Review pages still in use first',
    body: "Each week, review the pages you cited most recently first, fix broken links, merge duplicate decisions, and then connect reusable conclusions to the related topics. Don't rewrite everything just to tidy up.",
  },
  criteria: {
    title: 'Write acceptance criteria first',
    body: 'Before asking an AI to change the reading layout, list the acceptance criteria you can observe: the same typography in all four views, the first line staying put when the sidebar toggles, and text that wraps naturally in a narrow window. Each small task maps to one result you can check.',
  },
  inPlace: {
    title: 'Keep the article in place',
    body: "When the right sidebar opens, keep the article's left edge where it is. Narrow only the right side so the text wraps naturally. Readers shouldn't have to find the start of the line again.",
  },
  sidebarCheck: {
    title: 'Check the sidebar in review',
    body: 'Every time you adjust the reading layout, open all four views, toggle the right sidebar, and check wrapping and citation previews in a narrow window.',
  },
  container: {
    title: 'One reading container for four views',
    body: "Memory, Topic, Wiki, and Sources share the same typography, line spacing, and article container. When you fix the layout, don't fix only the page you happen to be looking at.",
  },
  clipping: {
    title: 'Clippings keep the URL and date',
    body: 'Keep the original URL and capture date with every web clipping, and write the quoted text separately from your own judgment. That way you can tell what changed after the source is updated.',
  },
  preview: {
    title: 'Keep previews off the text being read',
    body: "Put the citation preview in the white space near the citation so it doesn't cover the paragraph being read. Readers should see the citing sentence and the source preview together, and be able to click back to the original material.",
  },
  handoff: {
    title: 'Handoffs keep evidence and next step',
    body: "A work handoff should include the decisions adopted, links to the source material, the questions still open, and a next step you can start on right away. That way, when you switch between Claude and Codex, the next tool doesn't have to guess at the background.",
  },
} satisfies Record<string, Entry>;

const link = (text: string, target: string) => `[${text}](#demo:${target})`;
const cited = (entry: Entry, target: string) => `Cited memory: ${link(entry.title, target)}`;

// The English file content, also published as reading-review.en.md.
export const readingReviewMarkdownEn = `# Reading layout review

This is the review checklist for the demo library.

- Open and close the right sidebar; the article's left edge stays put.
- Check typography, line spacing, and wrapping in Memory, Topic, Wiki, and Sources.
- Narrow the window, then confirm the citation preview doesn't cover the paragraph being read.

Reference: W3C WCAG 2.2, Reflow. This checklist is not a full WCAG conformance certification.`;

const english: Record<string, Entry> = {
  [id.claudeCodex]: {
    title: 'Claude and Codex',
    body: `# Claude and Codex\n\nLet different tools keep working from the same page.\n\nRead ${link('Work handoff', id.handoff)} first, then start the ${link('Agent Loop', id.agentLoop)}. When you finish, write the new judgment back to the original page.`,
  },
  [id.aiWorkStyle]: {
    title: 'Working with AI',
    body: `# Working with AI\n\nStart from the specific decisions left in ${link('Agent Loop', id.agentLoop)} so you don't have to rebuild the context every time.\n\nThe reading layout fix is recorded in ${link('Product principles', id.principles)}, and the review steps live in ${link('Interface review', id.interfaceReview)}.`,
  },
  [id.weeklyKnowledge]: {
    title: 'Weekly knowledge review',
    body: `# Weekly knowledge review\n\nStart with the pages you actually used this week and check which conclusions still hold. Merge duplicate decisions, update sources that have gone stale, and leave the questions to chase next week.\n\n## Lessons kept\n\n${memory.review.body}\n\n${cited(memory.review, id.memReview)}\n\n## Related work\n\nCheck ${link('Source management', id.sources)} first, then add the work still in progress to the ${link('AI handoff checklist', id.aiChecklist)}.`,
  },
  [id.retry]: {
    title: 'Retry strategy',
    body: `# Retry strategy\n\nWhen the same error shows up twice, find the cause first.\n\nInside the ${link('Agent Loop', id.agentLoop)}, a retry should bring new evidence. Repeating the same action doesn't count as a new attempt.`,
  },
  [id.readingNotes]: {
    title: 'Reading notes',
    body: `# Reading notes\n\nReading with a question in mind helps you keep your own understanding better than collecting summaries does.\n\nMove the passages that matter into ${link('Writing and thinking', id.writing)}, then use ${link('Weekly review', id.weeklyReview)} to tie them back to what you're working on.`,
  },
  [id.writing]: {
    title: 'Writing and thinking',
    body: `# Writing and thinking\n\nWrite down your own judgment first, then fill in the reasons.\n\n${link('Reading notes', id.readingNotes)} supplies the material, and ${link('Interview insights', id.interviews)} reminds me which assumptions still need checking.`,
  },
  [id.weeklyReview]: {
    title: 'Weekly review',
    body: `# Weekly review\n\nEach week, leave one question worth carrying forward, one judgment that changed, and the next step.\n\nConnect ${link('Work handoff', id.handoff)} back to this week's ${link('Product principles', id.principles)}.`,
  },
  [id.clipping]: {
    title: 'From clipping to note',
    body: `# From clipping to note\n\nSaving a passage from an article is not the end of organizing it. Record the original URL and the capture date first, then say in your own words why the passage is worth keeping.\n\n## Lessons kept\n\n${memory.clipping.body}\n\n${cited(memory.clipping, id.memClipping)}\n\n## Related work\n\nGo back to the original material through ${link('Source management', id.sources)}; use ${link('Citation preview design', id.citationPreview)} to check that citations are easy to read.`,
  },
  [id.handoff]: {
    title: 'Work handoff',
    body: `# Work handoff\n\nKeep what is finished, why each decision was made, and the questions still open.\n\nLet the next ${link('Agent Loop', id.agentLoop)} start from what's already done; tidy it up each week through ${link('Weekly review', id.weeklyReview)}.`,
  },
  [id.interfaceReview]: {
    title: 'Interface review',
    body: `# Interface review\n\nPassing tests isn't enough; look at the actual screen too.\n\nCheck text, alignment, links, and spacing on desktop and on a narrow screen, and bring what you find back to ${link('Agent Loop', id.agentLoop)} and ${link('Product principles', id.principles)}.`,
  },
  [id.agentLoop]: {
    title: 'Agent Loop',
    body: `# Agent Loop\n\nHow one layout fix becomes experience you can use directly next time.\n\n## Find the evidence\n\n[W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) explains that when the window narrows, text should wrap naturally instead of making readers scroll sideways line by line.\n\n${link('reading-review.md', id.fileReadingReview)} records how to check it: open and close the sidebar, compare the four views, and confirm the first line doesn't jump.\n\n## Keep a decision that can be reused\n\nFix the article's left edge; when the sidebar opens, narrow only the right side. This is a design decision we made from reading and review.\n\nThe decision goes into ${link('Product principles', id.principles)}, gets checked in ${link('Interface review', id.interfaceReview)}, and is carried into the next change through ${link('Work handoff', id.handoff)}.\n\nMemories kept: ${link(memory.inPlace.title, id.memInPlace)} · ${link(memory.container.title, id.memContainer)} · ${link(memory.sidebarCheck.title, id.memSidebarCheck)}`,
  },
  [id.principles]: {
    title: 'Product principles',
    body: `# Product principles\n\nHelp people understand first, then make the action faster.\n\n${link('Interview insights', id.interviews)} is where design starts, and ${link('Interface review', id.interfaceReview)} is the last stop before anything is done.`,
  },
  [id.taskBreakdown]: {
    title: 'Task breakdown',
    body: `# Task breakdown\n\nBreak the reading layout changes into small tasks that can each be checked on their own. Fix the article position first, then verify the sidebar toggle, and handle citation previews last.\n\n## Lessons kept\n\n${memory.criteria.body}\n\n${cited(memory.criteria, id.memCriteria)}\n\n## Related work\n\nUse the concrete steps in ${link('Sidebar review', id.sidebarReview)} as the definition of done, and log the result in the ${link('AI handoff checklist', id.aiChecklist)}.`,
  },
  [id.sidebarReview]: {
    title: 'Sidebar review',
    body: `# Sidebar review\n\nOpen the same page in a wide window and a narrow one. Toggle the right sidebar and watch whether the first line moves, then check that long URLs and citations wrap naturally.\n\n## Lessons kept\n\n${memory.narrow.body}\n\n${cited(memory.narrow, id.memNarrow)}\n\n## Related work\n\nWrite the result back to ${link('Reading layout design', id.layoutDesign)}, and handle the items that haven't passed yet separately in ${link('Task breakdown', id.taskBreakdown)}.`,
  },
  [id.layoutDesign]: {
    title: 'Reading layout design',
    body: `# Reading layout design\n\nThe goal of the reading area is that readers never have to hunt for the next line. The article's left edge is fixed, and the sidebar takes its space from the right.\n\n## Lessons kept\n\n${memory.narrow.body}\n\n${cited(memory.narrow, id.memNarrow)}\n\n## Related work\n\nUse ${link('Sidebar review', id.sidebarReview)} to compare line starts before and after the toggle; for citations in the article, use ${link('Citation preview design', id.citationPreview)}.`,
  },
  [id.interviews]: {
    title: 'Interview insights',
    body: `# Interview insights\n\nPeople want to switch to a different AI tool without re-explaining the whole project.\n\nThat makes ${link('Work handoff', id.handoff)} and ${link('Claude and Codex', id.claudeCodex)} two sides of the same problem.`,
  },
  [id.citationPreview]: {
    title: 'Citation preview design',
    body: `# Citation preview design\n\nWhen readers look at a citation, they should keep the context of the article. Place the preview close to the citation and out of the way of the paragraph, so a reader can judge the source and then return to where they were reading.\n\n## Lessons kept\n\n${memory.preview.body}\n\n${cited(memory.preview, id.memPreview)}\n\n## Related work\n\nFor separating the original text from your own judgment, see ${link('From clipping to note', id.clipping)}; the checks are in ${link('Sidebar review', id.sidebarReview)}.`,
  },
  [id.sources]: {
    title: 'Source management',
    body: `# Source management\n\nKeep a traceable trail between files, web pages, and notes. Hold on to the original URL, file name, and capture date so anyone can look at the evidence again.\n\n## Lessons kept\n\n${memory.clipping.body}\n\n${cited(memory.clipping, id.memClipping)}\n\n## Related work\n\nTurn sources into ${link('From clipping to note', id.clipping)}, and use ${link('Weekly knowledge review', id.weeklyKnowledge)} to check that links and judgments still hold.`,
  },
  [id.aiChecklist]: {
    title: 'AI handoff checklist',
    body: `# AI handoff checklist\n\nSwitch to a different AI tool and still pick up the same work. In the handoff, write down the decision currently in use first, then attach the source material and the unfinished items.\n\n## Lessons kept\n\n${memory.handoff.body}\n\n${cited(memory.handoff, id.memHandoff)}\n\n## Related work\n\nKeep the evidence with ${link('Source management', id.sources)}, then connect the next step to ${link('Task breakdown', id.taskBreakdown)}; the full context stays in ${link('Work handoff', id.handoff)}.`,
  },
  // File nodes: the first is displayed as "reading-review.md" (the file name);
  // the second is the imported source record, titled by the file's heading.
  [id.fileReadingReview]: { title: 'reading-review', body: readingReviewMarkdownEn },
  [id.fileLayoutReview]: { title: 'Reading layout review', body: readingReviewMarkdownEn },
  [id.topicDesign]: { title: 'Product design', body: '' },
  [id.topicAi]: { title: 'AI collaboration', body: '' },
  [id.topicKnowledge]: { title: 'Knowledge management', body: '' },
  [id.memNarrow]: memory.narrow,
  [id.memReview]: memory.review,
  [id.memCriteria]: memory.criteria,
  [id.memInPlace]: memory.inPlace,
  [id.memSidebarCheck]: memory.sidebarCheck,
  [id.memContainer]: memory.container,
  [id.memClipping]: memory.clipping,
  [id.memPreview]: memory.preview,
  [id.memHandoff]: memory.handoff,
};

export const knowledgeNodesEn: KnowledgeNode[] = knowledgeNodes.map((node) => {
  const entry = english[node.id];
  if (!entry) throw new Error(`Missing English copy for knowledge node ${node.id}`);
  return { ...node, title: entry.title, body: entry.body };
});

// Authored research and design examples. These mirror the structure of the
// Traditional Chinese examples in knowledge-graph-communities.ts (same ids,
// same order, same links).
const research = [
  ['cognition', 'Cognition & learning', 'attention', 'Attention and learning', "Does a shifting layout interrupt reading? Compare line-start position, re-orientation time, and comprehension before and after the sidebar opens.", 'sleep', 'Sleep and memory', 'How are sleep and memory performance measured? Compare nighttime temperature, sleep timing, and sample differences, and check for other explanations.'],
  ['ecology', 'Ecology & climate', 'city', 'Urban heat islands', 'How do nighttime temperatures differ between neighborhoods? Keep the measurement site, time of day, and built environment, then pose a research question about sleep.', 'biodiversity', 'Biodiversity', 'When and where were species recorded? Compare changes in distribution and possible movement routes, and separate documented records from speculation.'],
  ['history', 'History & culture', 'evidence', 'Cross-checking sources', 'How do the author, date, and preservation context shape a historical source? Set records that support each other beside records that conflict.', 'trade', 'Ancient trade routes', 'How do maps, archaeological material, and written records corroborate trade routes? Compare the dates of species records along the route, and mark what is conjecture and which segments still need checking.'],
] as const;

export const researchExamplesEn: KnowledgeNode[] = research.flatMap(([topicKey, title, a, aTitle, aQuestion, b, bTitle, bQuestion]) => [
  {
    id: `research-${topicKey}`,
    kind: 'topic' as const,
    title,
    body: `# ${title}\n\nA cross-disciplinary research example.\n\nStart with ${link(aTitle, `research-${a}`)} and ${link(bTitle, `research-${b}`)}, and compare questions, research methods, and data sources.`,
    x: 0,
    y: 0,
  },
  ...([[a, aTitle, aQuestion], [b, bTitle, bQuestion]] as const).map(([key, name, question]) => ({
    id: `research-${key}`,
    kind: 'page' as const,
    title: name,
    topicId: `research-${topicKey}`,
    body: `# ${name}\n\n${question}\n\n## Keep while reading\n\n- The research question and the method used\n- Source material and citations you can trace back\n- Alternative explanations, limits, and next steps\n\nAn example research page; no paper evidence or research conclusions have been added yet.`,
    x: 0,
    y: 0,
  })),
]);

export const designExamplesEn: KnowledgeNode[] = [
  {
    id: 'research-heat-map',
    kind: 'page',
    title: 'Neighborhood heat map',
    topicId: id.topicDesign,
    x: 0,
    y: 0,
    body: `# Neighborhood heat map\n\nHow can people see when each neighborhood is hottest? Turn the sites, times, and measurement limits from ${link('Urban heat islands', 'research-city')} into comparison controls for the map.\n\n## What the design must answer\n\n- Switch between day and night with the same temperature scale\n- Select a neighborhood to see the measurement time and the original records\n- Mark areas with missing data clearly instead of passing estimates off as measurements\n\nAn example design page; no measured data or product validation has been added yet.`,
  },
  {
    id: 'research-trade-map',
    kind: 'page',
    title: 'Trade route timeline',
    topicId: id.topicDesign,
    x: 0,
    y: 0,
    body: `# Trade route timeline\n\nHow can you see trade routes from different periods? Turn the dates, places, and source differences from ${link('Ancient trade routes', 'research-trade')} into an interactive map and timeline.\n\n## What the design must answer\n\n- Drag the timeline to show only the segments recorded in that period\n- Select a segment to see map, archaeological, and written evidence side by side\n- Draw conjectured segments with dashed lines and keep conflicting records\n\nAn example design page; no historical evidence or product validation has been added yet.`,
  },
];
