// Keep short semantic units intact without locking whole CJK sentences to one line.
const keptPhrases = /(Claude、Codex 等|附上來源，並對照來源檢查。|附上来源，并对照来源检查。|持續更新的知識庫，|持续更新的知识库，|AI 對話|AI 对话|有什麼不同|有什么不同|內建|内置|另一個|另一个|分開嗎|分开吗|可重用|可复用|筆記|笔记|頁面|页面|memory MCP\s*[嗎吗]？|聊過什麼|聊过什么|存取|還原|结果|結果|自由探索|AGPL-3\.0-only|Apache-2\.0)/g;
// Use authored phrases on both server and client. Intl word boundaries vary
// between Node and browser ICU versions and can break hydration.

export function HomeReadableText({ children }: { children: string }) {
  return children.split(keptPhrases).map((part, index) =>
    index % 2 === 1 ? <span key={index} className="whitespace-nowrap">{part}</span> : part,
  );
}
