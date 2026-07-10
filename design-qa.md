# Design QA - Use Cases Section

## Target

Intent: replace the text-heavy wiki row artifact with a compact scenario visual. The user should recognize their use case from the object itself: codebase map, client/proposal board, or research/citation trail.

## Final Captures

- Desktop dev: `.codex/qa/use-cases/desktop-context-lens-dev-final-1440x900.png`
- Desktop product: `.codex/qa/use-cases/desktop-context-lens-product-final-1440x900.png`
- Desktop research: `.codex/qa/use-cases/desktop-context-lens-research-final-1440x900.png`
- Mobile dev viewport: `.codex/qa/use-cases/mobile-context-lens-dev-final-390x844.png`
- Mobile dev artifact: `.codex/qa/use-cases/mobile-context-lens-dev-final-390x844-artifact.png`
- Traditional Chinese mobile artifact: `.codex/qa/use-cases/mobile-zh-tw-context-lens-dev-final-390x844-artifact.png`

## Result

PASS. The right side is now a static context-lens visual, not another selector or text table. Each scenario keeps the same product model, but the drawn artifact changes: dev shows source files feeding a codebase map, product shows customer/proposal materials, and research shows papers/docs flowing into a cited page.

## Checks

- Desktop and mobile tab count is `3`; selected tab count is `1`.
- Right artifact has `0` buttons, `0` tabs, and `0` `aria-pressed` controls.
- Each scenario exposes one signature visual: `dev-codebase`, `product-customers`, or `research-writing`.
- Every active scenario renders `4` compact evidence tiles.
- Desktop artifacts fit within the first viewport: dev `952x713`, product `952x687`, research `952x687`.
- Mobile artifact is compact enough for inspection: English `342x517`, Traditional Chinese `342x494`.
- Mobile and desktop document widths match the viewport, with no horizontal overflow.
- Traditional Chinese mobile labels fit without overlap: `架構地圖`, `操作手冊`, `Migration 計畫`, `整合筆記`.

## Verification

- `./node_modules/.bin/tsc --noEmit --incremental false`
- `node --import tsx --test scripts/i18n-contract.test.mjs`
- `NEXT_TELEMETRY_DISABLED=1 WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan ./node_modules/.bin/next build`
- Playwright against `http://localhost:3000/` and `/zh-TW`, with screenshots and DOM metrics above.
