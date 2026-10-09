import { Fragment, type ReactNode } from "react";

export function ArticleTitleText({
  title,
  renderText = (text) => text,
}: {
  title: string;
  renderText?: (text: string) => ReactNode;
}) {
  return title.split(/((?:Claude Code|連接筆記|连接笔记|核對答案|核对答案)[，、：:！？!?]?)/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="inline-block whitespace-nowrap">{part}</span>
    ) : (
      <Fragment key={index}>{renderText(part)}</Fragment>
    ),
  );
}
