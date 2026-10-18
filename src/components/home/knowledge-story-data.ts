/**
 * Sanitized, static product-demo data sourced from the isolated personal knowledge fixture.
 * Node positions follow the native graph map; edge records follow captured page/entity/memory links.
 */
export type KnowledgeNode = {
  id: string;
  kind: 'page' | 'topic' | 'memory' | 'file';
  title: string;
  body: string;
  x: number;
  y: number;
  nativeX?: number;
  nativeY?: number;
  topicId?: string;
};

export const knowledgeNodes: KnowledgeNode[] = [
  {
    "id": "page_152a55e8-9127-4214-9a96-fce410f121c0",
    "kind": "page",
    "title": "Claude 與 Codex",
    "body": "# Claude 與 Codex\n\n讓不同工具接著同一份筆記工作。\n\n先讀 [工作交接](#demo:page_5714444c-cc05-454f-afa3-52304b7bd3d9)，再開始 [Agent Loop](#demo:page_6d21d730-c091-4197-9bfd-857f53b92511)。完成後，把新的判斷寫回原本的頁面。",
    "x": 31.95,
    "y": 33.91,
    "nativeX": 501.94,
    "nativeY": 335.32
  },
  {
    "id": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "kind": "page",
    "title": "AI 工作方式",
    "body": "# AI 工作方式\n\n從 [Agent Loop](#demo:page_6d21d730-c091-4197-9bfd-857f53b92511) 留下的具體決定開始，不必每次重建脈絡。\n\n閱讀排版的修正記在 [產品原則](#demo:page_708868a0-151b-4c1e-a42a-b415b12849d9)，檢查流程放在 [介面驗收](#demo:page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad)。",
    "x": 38.14,
    "y": 52.83,
    "nativeX": 615.07,
    "nativeY": 559.58,
    "topicId": "1440b02a-746f-45a8-96b0-77912d01b375"
  },
  {
    "id": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "kind": "page",
    "title": "每週知識回顧",
    "body": "# 每週知識回顧\n\n從這週實際用到的筆記開始，檢查哪些結論仍然有效。把重複的決定合併，更新已失效的來源，留下下一週要追的問題。\n\n## 留下的經驗\n\n每週先回顧最近實際引用的筆記，更新失效連結，合併重複的決定，再把可重用的結論連到相關主題。不要為了整理而重寫所有資料。\n\n引用記憶：[回顧先整理仍在使用的筆記](#demo:mem_2d378810db22)\n\n## 接到相關工作\n\n先核對 [來源管理](#demo:page_cee2d785-425f-40d9-8cea-a33b61edbdfa)，再將仍在進行的工作補進 [AI 交接清單](#demo:page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f)。",
    "x": 59.29,
    "y": 40.95,
    "nativeX": 1001.81,
    "nativeY": 418.78,
    "topicId": "43004489-2cdd-457b-bd50-0117f7fba5a7"
  },
  {
    "id": "page_325f789a-77f8-47a7-9604-d7b15d86248b",
    "kind": "page",
    "title": "重試策略",
    "body": "# 重試策略\n\n同一種錯誤出現兩次，就先查原因。\n\n在 [Agent Loop](#demo:page_6d21d730-c091-4197-9bfd-857f53b92511) 裡，重試應該帶著新的證據；重複執行同一個動作，不算新的嘗試。",
    "x": 29.33,
    "y": 56.49,
    "nativeX": 454.06,
    "nativeY": 602.86
  },
  {
    "id": "page_3592d2b4-c11c-4204-8add-977f72ca5999",
    "kind": "page",
    "title": "閱讀筆記",
    "body": "# 閱讀筆記\n\n帶著問題閱讀，比收集摘要更容易留下自己的理解。\n\n把重要的段落放進 [寫作與思考](#demo:page_3c3268e3-b0ae-4340-9791-d1e0b7b4de30)，再用 [每週回顧](#demo:page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401) 連回正在做的事。",
    "x": 24.53,
    "y": 15.38,
    "nativeX": 366.27,
    "nativeY": 115.69
  },
  {
    "id": "page_3c3268e3-b0ae-4340-9791-d1e0b7b4de30",
    "kind": "page",
    "title": "寫作與思考",
    "body": "# 寫作與思考\n\n先寫下自己的判斷，再補上理由。\n\n[閱讀筆記](#demo:page_3592d2b4-c11c-4204-8add-977f72ca5999) 提供材料，[訪談洞察](#demo:page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d) 提醒我哪些假設仍需要查證。",
    "x": 31.65,
    "y": 10.32,
    "nativeX": 496.5,
    "nativeY": 55.75
  },
  {
    "id": "page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401",
    "kind": "page",
    "title": "每週回顧",
    "body": "# 每週回顧\n\n每週留下一個值得延續的問題、一個改變的判斷，以及下一步。\n\n把 [工作交接](#demo:page_5714444c-cc05-454f-afa3-52304b7bd3d9) 接回本週的 [產品原則](#demo:page_708868a0-151b-4c1e-a42a-b415b12849d9)。",
    "x": 31.39,
    "y": 26.2,
    "nativeX": 491.68,
    "nativeY": 244.02
  },
  {
    "id": "page_47497134-1262-443a-b291-7f0afbfef652",
    "kind": "page",
    "title": "摘錄到筆記",
    "body": "# 摘錄到筆記\n\n保存一段文章不是整理的終點。先記錄原始網址與擷取日期，再用自己的話說明為什麼這段內容值得保留。\n\n## 留下的經驗\n\n每段網頁摘錄都保留原始網址和擷取日期，把引用原文與自己的判斷分開寫。網頁更新後，才能比較哪些內容已經改變。\n\n引用記憶：[摘錄附原始網址與日期](#demo:mem_da0d67b24285)\n\n## 接到相關工作\n\n透過 [來源管理](#demo:page_cee2d785-425f-40d9-8cea-a33b61edbdfa) 回到原始資料；用 [引用預覽設計](#demo:page_c11d3e58-e5c1-4cb9-b232-1237d497968c) 檢查引用是否容易閱讀。",
    "x": 67.85,
    "y": 57.1,
    "nativeX": 1158.43,
    "nativeY": 610.08,
    "topicId": "43004489-2cdd-457b-bd50-0117f7fba5a7"
  },
  {
    "id": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "page",
    "title": "工作交接",
    "body": "# 工作交接\n\n保存已完成的事、做決定的理由，以及尚未解決的問題。\n\n讓下一次 [Agent Loop](#demo:page_6d21d730-c091-4197-9bfd-857f53b92511) 從已有成果開始；每週再透過 [每週回顧](#demo:page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401) 整理。",
    "x": 40.69,
    "y": 34.82,
    "nativeX": 661.69,
    "nativeY": 346.11
  },
  {
    "id": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "kind": "page",
    "title": "介面驗收",
    "body": "# 介面驗收\n\n測試通過之外，也要實際看過畫面。\n\n檢查桌面與窄螢幕的文字、對齊、連結與空白；把發現帶回 [Agent Loop](#demo:page_6d21d730-c091-4197-9bfd-857f53b92511) 和 [產品原則](#demo:page_708868a0-151b-4c1e-a42a-b415b12849d9)。",
    "x": 28.53,
    "y": 51.24,
    "nativeX": 439.44,
    "nativeY": 540.68
  },
  {
    "id": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "page",
    "title": "Agent Loop",
    "body": "# Agent Loop\n\n一次排版修復，如何變成下次能直接用的經驗。\n\n## 從來源找到依據\n\n[W3C 文字重排](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) 說明：縮窄視窗時，文字應自然換行，避免逐行左右捲動。\n\n[閱讀排版驗收.md](#demo:src_c3b7468b864a02ab) 記下了檢查方式：開關側欄、比較四種頁面，確認句首不會跳動。\n\n## 留下可重用的決定\n\n固定正文的左側起點；側欄開啟時只縮小右側寬度。這是我們根據閱讀與驗收經驗留下的設計決定。\n\n決定寫進 [產品原則](#demo:page_708868a0-151b-4c1e-a42a-b415b12849d9)，以 [介面驗收](#demo:page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad) 檢查，再由 [工作交接](#demo:page_5714444c-cc05-454f-afa3-52304b7bd3d9) 帶到下一次修改。\n\n留下的記憶：[側欄不推移正文](#demo:mem_8434be7eda44) · [共用閱讀容器](#demo:mem_a5229d9e467d) · [側欄開關也要驗收](#demo:mem_a0a619f5e4cb)",
    "x": 34.92,
    "y": 44.69,
    "nativeX": 556.29,
    "nativeY": 463.03
  },
  {
    "id": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "kind": "page",
    "title": "產品原則",
    "body": "# 產品原則\n\n先讓使用者理解，再讓操作更快。\n\n[訪談洞察](#demo:page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d) 是設計的起點，[介面驗收](#demo:page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad) 是完成前的最後一站。",
    "x": 30.01,
    "y": 38.83,
    "nativeX": 466.4,
    "nativeY": 393.64
  },
  {
    "id": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "kind": "page",
    "title": "任務拆解",
    "body": "# 任務拆解\n\n把閱讀介面的調整拆成可以逐項驗收的小任務。先修正文位置，再驗證側欄切換，最後處理引用預覽。\n\n## 留下的經驗\n\n讓 AI 修改閱讀介面前，先列出可觀察的驗收條件：四種頁面字體一致、側欄切換時句首不跳動、窄視窗能自然換行。每個小任務只對應一項可檢查的結果。\n\n引用記憶：[拆任務時先寫驗收條件](#demo:mem_4d769cdfe303)\n\n## 接到相關工作\n\n以 [側欄驗收](#demo:page_8592693a-4539-4705-81d6-c911ce8afe60) 的具體步驟作為完成條件，結果記入 [AI 交接清單](#demo:page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f)。",
    "x": 54.74,
    "y": 61.51,
    "nativeX": 918.73,
    "nativeY": 662.35,
    "topicId": "1440b02a-746f-45a8-96b0-77912d01b375"
  },
  {
    "id": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "kind": "page",
    "title": "側欄驗收",
    "body": "# 側欄驗收\n\n同一篇筆記分別在寬視窗與窄視窗打開。切換右側欄，觀察句首是否移動，再檢查長網址與引用是否自然換行。\n\n## 留下的經驗\n\n開啟側欄時，正文的左側起點保持不變，右側縮窄後自然換行。驗收要同時看寬視窗、窄視窗與側欄開關，不能只看單一截圖。\n\n引用記憶：[窄視窗保留閱讀起點](#demo:mem_0f10ab356ad9)\n\n## 接到相關工作\n\n結果寫回 [閱讀版面設計](#demo:page_8593464d-e3ca-4673-b25e-f0eab4e2099d)，並在 [任務拆解](#demo:page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62) 中把尚未通過的項目分開處理。",
    "x": 59.75,
    "y": 75.04,
    "nativeX": 1010.28,
    "nativeY": 822.72,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "kind": "page",
    "title": "閱讀版面設計",
    "body": "# 閱讀版面設計\n\n閱讀區的目標是讓讀者不用反覆尋找下一行。正文左側起點固定，側欄佔用的是右侧寬度。\n\n## 留下的經驗\n\n開啟側欄時，正文的左側起點保持不變，右側縮窄後自然換行。驗收要同時看寬視窗、窄視窗與側欄開關，不能只看單一截圖。\n\n引用記憶：[窄視窗保留閱讀起點](#demo:mem_0f10ab356ad9)\n\n## 接到相關工作\n\n以 [側欄驗收](#demo:page_8592693a-4539-4705-81d6-c911ce8afe60) 比較開關前後的行首；正文引用則採用 [引用預覽設計](#demo:page_c11d3e58-e5c1-4cb9-b232-1237d497968c)。",
    "x": 65.84,
    "y": 80.86,
    "nativeX": 1121.69,
    "nativeY": 891.75,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d",
    "kind": "page",
    "title": "訪談洞察",
    "body": "# 訪談洞察\n\n使用者希望換一個 AI 工具時，不必重新解釋整個專案。\n\n這讓 [工作交接](#demo:page_5714444c-cc05-454f-afa3-52304b7bd3d9) 與 [Claude 與 Codex](#demo:page_152a55e8-9127-4214-9a96-fce410f121c0) 成為同一個問題的兩面。",
    "x": 34.66,
    "y": 24.26,
    "nativeX": 551.47,
    "nativeY": 220.97
  },
  {
    "id": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "kind": "page",
    "title": "引用預覽設計",
    "body": "# 引用預覽設計\n\n讀者查看引用時，應同時保有正文脈絡。預覽貼近引用、避開段落，讓人判斷來源後能回到原來的閱讀位置。\n\n## 留下的經驗\n\n引用預覽放在引用附近的空白處，避免遮住正在閱讀的段落。讀者應能同時看見引用句與來源預覽，並能點回原始資料。\n\n引用記憶：[預覽避開正在閱讀的段落](#demo:mem_de40733e305f)\n\n## 接到相關工作\n\n原文與個人判斷的區分可參考 [摘錄到筆記](#demo:page_47497134-1262-443a-b291-7f0afbfef652)；檢查方式放在 [側欄驗收](#demo:page_8592693a-4539-4705-81d6-c911ce8afe60)。",
    "x": 68.44,
    "y": 70.62,
    "nativeX": 1169.23,
    "nativeY": 770.3,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "kind": "page",
    "title": "來源管理",
    "body": "# 來源管理\n\n檔案、網頁與筆記之間要留得下可追溯的線索。保留原始網址、檔名與擷取日期，讓別人能重新查看依據。\n\n## 留下的經驗\n\n每段網頁摘錄都保留原始網址和擷取日期，把引用原文與自己的判斷分開寫。網頁更新後，才能比較哪些內容已經改變。\n\n引用記憶：[摘錄附原始網址與日期](#demo:mem_da0d67b24285)\n\n## 接到相關工作\n\n把來源轉成 [摘錄到筆記](#demo:page_47497134-1262-443a-b291-7f0afbfef652)，並在 [每週知識回顧](#demo:page_1944ec77-c2eb-43bf-817b-f164aa4d6adf) 檢查連結與判斷是否仍然有效。",
    "x": 60.79,
    "y": 49.09,
    "nativeX": 1029.25,
    "nativeY": 515.21,
    "topicId": "43004489-2cdd-457b-bd50-0117f7fba5a7"
  },
  {
    "id": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "kind": "page",
    "title": "AI 交接清單",
    "body": "# AI 交接清單\n\n換一個 AI 工具，仍然能接著同一件工作。交接時先寫下目前採用的決定，再附上原始資料與未完成事項。\n\n## 留下的經驗\n\n工作交接要包含已採用的決定、原始資料連結、尚未解決的問題，以及下一個可直接開始的動作。切換 Claude 與 Codex 時，下一個工具才不必重新猜背景。\n\n引用記憶：[交接保留依據與下一步](#demo:mem_fcc4d80c52c2)\n\n## 接到相關工作\n\n用 [來源管理](#demo:page_cee2d785-425f-40d9-8cea-a33b61edbdfa) 保存依據，再把下一步接到 [任務拆解](#demo:page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62)；完整脈絡保留在 [工作交接](#demo:page_5714444c-cc05-454f-afa3-52304b7bd3d9)。",
    "x": 50.94,
    "y": 45.57,
    "nativeX": 849.16,
    "nativeY": 473.54,
    "topicId": "1440b02a-746f-45a8-96b0-77912d01b375"
  },
  {
    "id": "src_c3b7468b864a02ab",
    "kind": "file",
    "title": "reading-review",
    "body": "# 閱讀排版驗收\n\n這是示範知識庫的驗收筆記。\n\n- 開關右側欄，正文的左側起點保持不變。\n- 在 Memory、Topic、Wiki、Sources 分別檢查字體、行距與換行。\n- 將視窗縮窄，再確認引用預覽沒有遮住閱讀中的段落。\n\n參考：W3C WCAG 2.2 的 Reflow 說明。此檢查清單不等同完整的 WCAG 符合性認證。",
    "x": 33.71,
    "y": 40.68,
    "nativeX": 534.14,
    "nativeY": 415.6
  },
  {
    "id": "src_f98e4721d6eb9517",
    "kind": "file",
    "title": "閱讀排版驗收",
    "body": "# 閱讀排版驗收\n\n這是示範知識庫的驗收筆記。\n\n- 開關右側欄，正文的左側起點保持不變。\n- 在 Memory、Topic、Wiki、Sources 分別檢查字體、行距與換行。\n- 將視窗縮窄，再確認引用預覽沒有遮住閱讀中的段落。\n\n參考：W3C WCAG 2.2 的 Reflow 說明。此檢查清單不等同完整的 WCAG 符合性認證。",
    "x": 33.97,
    "y": 49.35,
    "nativeX": 538.91,
    "nativeY": 518.25
  },
  {
    "id": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "topic",
    "title": "產品設計",
    "body": "",
    "x": 61.87,
    "y": 68.43,
    "nativeX": 1049.06,
    "nativeY": 744.36
  },
  {
    "id": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "topic",
    "title": "AI 協作",
    "body": "",
    "x": 51.17,
    "y": 57.5,
    "nativeX": 853.41,
    "nativeY": 614.88
  },
  {
    "id": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "topic",
    "title": "知識管理",
    "body": "",
    "x": 61.2,
    "y": 55.38,
    "nativeX": 1036.82,
    "nativeY": 589.8
  },
  {
    "id": "mem_0f10ab356ad9",
    "kind": "memory",
    "title": "窄視窗保留閱讀起點",
    "body": "開啟側欄時，正文的左側起點保持不變，右側縮窄後自然換行。驗收要同時看寬視窗、窄視窗與側欄開關，不能只看單一截圖。",
    "x": 64.16,
    "y": 71.03,
    "nativeX": 1090.97,
    "nativeY": 775.23,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "mem_2d378810db22",
    "kind": "memory",
    "title": "回顧先整理仍在使用的筆記",
    "body": "每週先回顧最近實際引用的筆記，更新失效連結，合併重複的決定，再把可重用的結論連到相關主題。不要為了整理而重寫所有資料。",
    "x": 59.44,
    "y": 58.54,
    "nativeX": 1004.7,
    "nativeY": 627.16,
    "topicId": "43004489-2cdd-457b-bd50-0117f7fba5a7"
  },
  {
    "id": "mem_4d769cdfe303",
    "kind": "memory",
    "title": "拆任務時先寫驗收條件",
    "body": "讓 AI 修改閱讀介面前，先列出可觀察的驗收條件：四種頁面字體一致、側欄切換時句首不跳動、窄視窗能自然換行。每個小任務只對應一項可檢查的結果。",
    "x": 48.33,
    "y": 57.58,
    "nativeX": 801.4,
    "nativeY": 615.78,
    "topicId": "1440b02a-746f-45a8-96b0-77912d01b375"
  },
  {
    "id": "mem_8434be7eda44",
    "kind": "memory",
    "title": "側欄不推移正文",
    "body": "開啟右側欄時，保留正文的左側起點；只縮小右側寬度，讓文字自然換行。讀者不必重新找句首。",
    "x": 37.9,
    "y": 42.03,
    "nativeX": 610.75,
    "nativeY": 431.5,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "mem_a0a619f5e4cb",
    "kind": "memory",
    "title": "驗收包含側欄開關",
    "body": "每次調整閱讀排版，都要實際打開四種頁面，切換右側欄，並檢查窄視窗下的換行與引用預覽。",
    "x": 31.31,
    "y": 43.46,
    "nativeX": 490.25,
    "nativeY": 448.44,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "mem_a5229d9e467d",
    "kind": "memory",
    "title": "四種頁面共用閱讀容器",
    "body": "Memory、Topic、Wiki 與 Sources 共用字體、行距與正文容器。修正排版時，不能只修正在看的那一頁。",
    "x": 37.18,
    "y": 49.66,
    "nativeX": 597.66,
    "nativeY": 522,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "mem_da0d67b24285",
    "kind": "memory",
    "title": "摘錄附原始網址與日期",
    "body": "每段網頁摘錄都保留原始網址和擷取日期，把引用原文與自己的判斷分開寫。網頁更新後，才能比較哪些內容已經改變。",
    "x": 61.07,
    "y": 44.85,
    "nativeX": 1034.5,
    "nativeY": 465,
    "topicId": "43004489-2cdd-457b-bd50-0117f7fba5a7"
  },
  {
    "id": "mem_de40733e305f",
    "kind": "memory",
    "title": "預覽避開正在閱讀的段落",
    "body": "引用預覽放在引用附近的空白處，避免遮住正在閱讀的段落。讀者應能同時看見引用句與來源預覽，並能點回原始資料。",
    "x": 61.26,
    "y": 63.66,
    "nativeX": 1037.95,
    "nativeY": 687.88,
    "topicId": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c"
  },
  {
    "id": "mem_fcc4d80c52c2",
    "kind": "memory",
    "title": "交接保留依據與下一步",
    "body": "工作交接要包含已採用的決定、原始資料連結、尚未解決的問題，以及下一個可直接開始的動作。切換 Claude 與 Codex 時，下一個工具才不必重新猜背景。",
    "x": 53.53,
    "y": 60.72,
    "nativeX": 896.55,
    "nativeY": 653.05,
    "topicId": "1440b02a-746f-45a8-96b0-77912d01b375"
  }
];

export const knowledgeEdges: { from: string; to: string; kind: string }[] = [
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "about"
  },
  {
    "from": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "about"
  },
  {
    "from": "page_47497134-1262-443a-b291-7f0afbfef652",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "about"
  },
  {
    "from": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "about"
  },
  {
    "from": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "about"
  },
  {
    "from": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "about"
  },
  {
    "from": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "about"
  },
  {
    "from": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "about"
  },
  {
    "from": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "about"
  },
  {
    "from": "page_152a55e8-9127-4214-9a96-fce410f121c0",
    "to": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "wikilink"
  },
  {
    "from": "page_152a55e8-9127-4214-9a96-fce410f121c0",
    "to": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "wikilink"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "kind": "wikilink"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "wikilink"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "kind": "wikilink"
  },
  {
    "from": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "to": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "kind": "wikilink"
  },
  {
    "from": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "to": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "kind": "wikilink"
  },
  {
    "from": "page_325f789a-77f8-47a7-9604-d7b15d86248b",
    "to": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "wikilink"
  },
  {
    "from": "page_3592d2b4-c11c-4204-8add-977f72ca5999",
    "to": "page_3c3268e3-b0ae-4340-9791-d1e0b7b4de30",
    "kind": "wikilink"
  },
  {
    "from": "page_3592d2b4-c11c-4204-8add-977f72ca5999",
    "to": "page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401",
    "kind": "wikilink"
  },
  {
    "from": "page_3c3268e3-b0ae-4340-9791-d1e0b7b4de30",
    "to": "page_3592d2b4-c11c-4204-8add-977f72ca5999",
    "kind": "wikilink"
  },
  {
    "from": "page_3c3268e3-b0ae-4340-9791-d1e0b7b4de30",
    "to": "page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d",
    "kind": "wikilink"
  },
  {
    "from": "page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401",
    "to": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "wikilink"
  },
  {
    "from": "page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401",
    "to": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "kind": "wikilink"
  },
  {
    "from": "page_47497134-1262-443a-b291-7f0afbfef652",
    "to": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "kind": "wikilink"
  },
  {
    "from": "page_47497134-1262-443a-b291-7f0afbfef652",
    "to": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "kind": "wikilink"
  },
  {
    "from": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "to": "page_42aebbc0-79cb-4cd3-b599-eef2a2ef6401",
    "kind": "wikilink"
  },
  {
    "from": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "to": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "wikilink"
  },
  {
    "from": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "to": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "kind": "wikilink"
  },
  {
    "from": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "to": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "kind": "wikilink"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "wikilink"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "kind": "wikilink"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "kind": "wikilink"
  },
  {
    "from": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "to": "page_5982d0f3-cf81-4eed-8f08-bbf1e3fc63ad",
    "kind": "wikilink"
  },
  {
    "from": "page_708868a0-151b-4c1e-a42a-b415b12849d9",
    "to": "page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d",
    "kind": "wikilink"
  },
  {
    "from": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "to": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "kind": "wikilink"
  },
  {
    "from": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "to": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "kind": "wikilink"
  },
  {
    "from": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "to": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "kind": "wikilink"
  },
  {
    "from": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "to": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "kind": "wikilink"
  },
  {
    "from": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "to": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "kind": "wikilink"
  },
  {
    "from": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "to": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "kind": "wikilink"
  },
  {
    "from": "page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d",
    "to": "page_152a55e8-9127-4214-9a96-fce410f121c0",
    "kind": "wikilink"
  },
  {
    "from": "page_94fe1dbf-de0a-4527-9ad1-ccd5feb2674d",
    "to": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "wikilink"
  },
  {
    "from": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "to": "page_47497134-1262-443a-b291-7f0afbfef652",
    "kind": "wikilink"
  },
  {
    "from": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "to": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "kind": "wikilink"
  },
  {
    "from": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "to": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "kind": "wikilink"
  },
  {
    "from": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "to": "page_47497134-1262-443a-b291-7f0afbfef652",
    "kind": "wikilink"
  },
  {
    "from": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "to": "page_5714444c-cc05-454f-afa3-52304b7bd3d9",
    "kind": "wikilink"
  },
  {
    "from": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "to": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "kind": "wikilink"
  },
  {
    "from": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "to": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "kind": "wikilink"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "mem_8434be7eda44",
    "kind": "cites"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "mem_a0a619f5e4cb",
    "kind": "cites"
  },
  {
    "from": "page_15e9f4ff-70a7-4e60-b922-85755bf5b198",
    "to": "mem_a5229d9e467d",
    "kind": "cites"
  },
  {
    "from": "page_1944ec77-c2eb-43bf-817b-f164aa4d6adf",
    "to": "mem_2d378810db22",
    "kind": "cites"
  },
  {
    "from": "page_47497134-1262-443a-b291-7f0afbfef652",
    "to": "mem_da0d67b24285",
    "kind": "cites"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "src_c3b7468b864a02ab",
    "kind": "cites"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "src_f98e4721d6eb9517",
    "kind": "cites"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "mem_8434be7eda44",
    "kind": "cites"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "mem_a0a619f5e4cb",
    "kind": "cites"
  },
  {
    "from": "page_6d21d730-c091-4197-9bfd-857f53b92511",
    "to": "mem_a5229d9e467d",
    "kind": "cites"
  },
  {
    "from": "page_81ec011b-a671-4893-8ddd-ed2d9a9d2d62",
    "to": "mem_4d769cdfe303",
    "kind": "cites"
  },
  {
    "from": "page_8592693a-4539-4705-81d6-c911ce8afe60",
    "to": "mem_0f10ab356ad9",
    "kind": "cites"
  },
  {
    "from": "page_8593464d-e3ca-4673-b25e-f0eab4e2099d",
    "to": "mem_0f10ab356ad9",
    "kind": "cites"
  },
  {
    "from": "page_c11d3e58-e5c1-4cb9-b232-1237d497968c",
    "to": "mem_de40733e305f",
    "kind": "cites"
  },
  {
    "from": "page_cee2d785-425f-40d9-8cea-a33b61edbdfa",
    "to": "mem_da0d67b24285",
    "kind": "cites"
  },
  {
    "from": "page_d1608dbc-fec3-4202-89c4-4dd7ff28ba5f",
    "to": "mem_fcc4d80c52c2",
    "kind": "cites"
  },
  {
    "from": "mem_0f10ab356ad9",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "memory_links"
  },
  {
    "from": "mem_2d378810db22",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "memory_links"
  },
  {
    "from": "mem_4d769cdfe303",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "memory_links"
  },
  {
    "from": "mem_8434be7eda44",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "memory_links"
  },
  {
    "from": "mem_8434be7eda44",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "memory_links"
  },
  {
    "from": "mem_a0a619f5e4cb",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "memory_links"
  },
  {
    "from": "mem_a0a619f5e4cb",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "memory_links"
  },
  {
    "from": "mem_a5229d9e467d",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "memory_links"
  },
  {
    "from": "mem_a5229d9e467d",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "memory_links"
  },
  {
    "from": "mem_da0d67b24285",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "memory_links"
  },
  {
    "from": "mem_de40733e305f",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "memory_links"
  },
  {
    "from": "mem_fcc4d80c52c2",
    "to": "1440b02a-746f-45a8-96b0-77912d01b375",
    "kind": "memory_links"
  },
  {
    "from": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "related_to"
  },
  {
    "from": "1440b02a-746f-45a8-96b0-77912d01b375",
    "to": "a09e3cbe-1b64-4b77-874d-2a5e6dd9cd1c",
    "kind": "related_to"
  },
  {
    "from": "1440b02a-746f-45a8-96b0-77912d01b375",
    "to": "43004489-2cdd-457b-bd50-0117f7fba5a7",
    "kind": "related_to"
  }
];

export const knowledgeProvenance = {
  "fixtureVersion": "isolated readme-personal-kb-20261012; graph-after-v10 + graph-map-v11",
  "counts": {
    "page": 19,
    "file": 2,
    "topic": 3,
    "memory": 9
  },
  "edgeCount": 80,
  "nativeMapNodeCount": 33,
  "sources": [
    "evidence/graph-after-v10.json",
    "evidence/graph-map-v11.json",
    "pages/**/*.md",
    "inputs/**/*.md",
    "data/memorydb/origin_memory.db (read-only)"
  ],
  "limitations": [
    "Two imported directory-source records are represented as file nodes, not memories.",
    "The native graph has no explicit edge list in graph-map-v11; edges come from graph-after-v10 page_links, memory_links and relations.",
    "Node positions are normalized from the captured native map."
  ]
} as const;
