import type { Locale } from "@/i18n/locales";

// Authored teaching sources, not generated or captured product output.
export const retryPolicySourceText = {
  api: "GET /reports: after a failed first attempt, allow up to 3 retries.\nPOST /payments: do not retry automatically.",
  decision: "Use the API's GET retry cap of 3 to limit repeated requests.\nAutomatic POST retries are disabled because duplicate payments are unsafe.",
  runbook: "Record the endpoint, attempt number, and final failure in the local test log.\nThe request timeout has not been decided.",
} as const;

export const retryPolicySourceExcerpts: Record<Locale, Record<keyof typeof retryPolicySourceText, string>> = {
  en: retryPolicySourceText,
  "zh-TW": {
    api: "GET /reports：第一次嘗試失敗後，最多再重試 3 次。POST /payments：不要自動重試。",
    decision: "採用 API 的 GET 重試上限 3 次，限制重複請求。POST 不自動重試，因為重複付款有風險。",
    runbook: "在本地測試紀錄中寫下端點、嘗試次數與最後的失敗。請求的逾時時間尚未決定。",
  },
  "zh-CN": {
    api: "GET /reports：第一次尝试失败后，最多再重试 3 次。POST /payments：不要自动重试。",
    decision: "采用 API 的 GET 重试上限 3 次，限制重复请求。POST 不自动重试，因为重复付款有风险。",
    runbook: "在本地测试记录中写下端点、尝试次数与最后的失败。请求的超时时间尚未决定。",
  },
};
