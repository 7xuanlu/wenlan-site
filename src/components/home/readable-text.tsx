// Keep short semantic units intact without locking whole CJK sentences to one line.
const keptPhrases = /(有什麼不同|有什么不同|內建|内置|另一個|另一个|分開嗎|分开吗|可重用|可复用|筆記|笔记|頁面|页面|memory MCP\s*[嗎吗]？|聊過什麼|聊过什么|存取|還原|结果|結果|自由探索|AGPL-3\.0-only|Apache-2\.0)/g;
// Use authored phrases on both server and client. Intl word boundaries vary
// between Node and browser ICU versions and can break hydration.

export function HomeReadableText({ children }: { children: string }) {
  return children.split(keptPhrases).map((part, index) =>
    index % 2 === 1 ? <span key={index} className="whitespace-nowrap">{part}</span> : part,
  );
}
