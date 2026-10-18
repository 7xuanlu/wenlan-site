import type { ReactNode } from "react";

type WikiReaderContentProps = {
  body: string;
  title?: string;
  compact?: boolean;
  renderReference?: (id: string, label: string) => ReactNode;
};

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string[] };

const headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const unorderedPattern = /^\s*[-*+]\s+(.+)$/;
const orderedPattern = /^\s*\d+[.)]\s+(.+)$/;
const blockStartPattern = /^(?:#{1,6}\s+|\s*[-*+]\s+|\s*\d+[.)]\s+|>\s?)/;

function isSafeHref(href: string): boolean {
  const value = href.trim();
  if (!value || /[\u0000-\u001f\u007f]/.test(value)) return false;
  if (/^(?:https?:|mailto:)/i.test(value)) return true;
  return /^(?:\/(?!\/)|#|\?)/.test(value);
}

function renderInline(text: string, renderReference?: WikiReaderContentProps["renderReference"]): ReactNode[] {
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]]+\]\([^)]+\))/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > cursor) output.push(text.slice(cursor, match.index));

    const token = match[0];
    const key = `${match.index}-${token}`;
    if (token.startsWith("`")) {
      output.push(
        <code key={key} className="rounded bg-black/[0.045] px-1 py-0.5 font-mono text-[0.92em] text-[#574f43]">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**") || token.startsWith("__")) {
      output.push(<strong key={key} className="font-semibold text-[var(--wiki-reader-heading,#292820)]">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") || token.startsWith("_")) {
      output.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      const label = linkMatch?.[1] ?? token;
      const href = linkMatch?.[2] ?? "";
      output.push(
        linkMatch && href.startsWith("#demo:") ? (
          <span key={key}>{renderReference?.(href.slice(6), label) ?? label}</span>
        ) : linkMatch && isSafeHref(href) ? (
          <a
            key={key}
            href={href}
            target={/^https?:/i.test(href) ? "_blank" : undefined}
            rel={/^https?:/i.test(href) ? "noreferrer noopener" : undefined}
            className="decoration-[#8c806e] underline decoration-dotted underline-offset-[3px] hover:text-[#665a4c]"
          >
            {label}
          </a>
        ) : (
          <span key={key}>{label}</span>
        ),
      );
    }
    cursor = match.index + token.length;
  }

  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

function parseBlocks(body: string): Block[] {
  const lines = body.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = headingPattern.exec(line);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote });
      continue;
    }

    const unordered = unorderedPattern.exec(line);
    const ordered = orderedPattern.exec(line);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const current = isOrdered ? orderedPattern.exec(lines[index]) : unorderedPattern.exec(lines[index]);
        if (!current) break;
        items.push(current[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered: isOrdered, items });
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !blockStartPattern.test(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function normalizeTitle(value: string): string {
  return value
    .replace(/\.md$/i, "")
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, "");
}

function withoutRepeatedTitle(blocks: Block[], title?: string): Block[] {
  if (!title) return blocks;
  const normalizedTitle = normalizeTitle(title);
  let isLeadingTitle = true;
  return blocks.filter((block) => {
    if (isLeadingTitle && block.type === "heading" && block.level === 1 && normalizeTitle(block.text) === normalizedTitle) {
      return false;
    }
    isLeadingTitle = false;
    return true;
  });
}

export function WikiReaderContent({ body, title, compact = false, renderReference }: WikiReaderContentProps) {
  const blocks = withoutRepeatedTitle(parseBlocks(body), title);
  const blockGap = compact ? "space-y-3" : "space-y-4";

  return (
    <article className={`min-w-0 text-[var(--wiki-reader-text,#46443d)] ${compact ? "text-[12px] leading-[1.65]" : "text-[13px] leading-[1.7]"}`}>
      <div className={blockGap}>
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            const headingClass = block.level === 2
              ? "mt-5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--wiki-reader-heading,#302e28)]"
              : block.level === 3
                ? "mt-4 text-[13px] font-semibold text-[var(--wiki-reader-heading,#302e28)]"
                : "mt-3 text-[12px] font-semibold text-[var(--wiki-reader-heading,#302e28)]";
            const HeadingTag = block.level === 1 ? "h2" : block.level === 2 ? "h3" : "h4";
            return <HeadingTag key={`heading-${index}`} className={headingClass}>{renderInline(block.text, renderReference)}</HeadingTag>;
          }

          if (block.type === "paragraph") {
            return <p key={`paragraph-${index}`} className="whitespace-pre-wrap">{renderInline(block.text, renderReference)}</p>;
          }

          if (block.type === "quote") {
            return (
              <blockquote key={`quote-${index}`} className="border-l-2 border-[#c9c1b5] pl-3 text-[#625e54]">
                {block.text.map((line, lineIndex) => <p key={lineIndex}>{renderInline(line, renderReference)}</p>)}
              </blockquote>
            );
          }

          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={`list-${index}`} className={block.ordered ? "list-decimal space-y-1 pl-5 marker:text-[#8b8377]" : "list-disc space-y-1 pl-5 marker:text-[#8b8377]"}>
              {block.items.map((item, itemIndex) => {
                const task = /^\[([ xX])\]\s+(.+)$/.exec(item);
                return (
                  <li key={itemIndex} className="pl-0.5">
                    {task ? (
                      <span className="inline-flex items-start gap-2">
                        <input type="checkbox" checked={task[1].toLowerCase() === "x"} readOnly disabled aria-label={task[2]} className="mt-[0.28em] size-3 accent-[#777061]" />
                        <span>{renderInline(task[2], renderReference)}</span>
                      </span>
                    ) : renderInline(item, renderReference)}
                  </li>
                );
              })}
            </ListTag>
          );
        })}
      </div>
    </article>
  );
}
