import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { getCoreContent } from "../src/i18n/content/index.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const homeSource = fs.readFileSync(path.join(repoRoot, "src/app/_pages/home.tsx"), "utf8");
const demoSource = fs.readFileSync(path.join(repoRoot, "src/app/demo-video.tsx"), "utf8");
const capabilitySource = fs.readFileSync(path.join(repoRoot, "src/components/home/capability-artifacts.tsx"), "utf8");
const proofSource = fs.existsSync(path.join(repoRoot, "src/components/home/task-proof.tsx"))
  ? fs.readFileSync(path.join(repoRoot, "src/components/home/task-proof.tsx"), "utf8")
  : "";
const comparisonSource = fs.readFileSync(path.join(repoRoot, "src/components/learn/workflow-comparison.tsx"), "utf8");
const workflowGuideSource = fs.existsSync(path.join(repoRoot, "src/components/learn/workflow-comparison-guide.tsx"))
  ? fs.readFileSync(path.join(repoRoot, "src/components/learn/workflow-comparison-guide.tsx"), "utf8")
  : "";
const pipelineSource = fs.readFileSync(path.join(repoRoot, "src/components/home/pipeline.tsx"), "utf8");
const downloadSource = fs.readFileSync(path.join(repoRoot, "src/components/home/download.tsx"), "utf8");

test("homepage restores core demonstrations without presenting synthetic live proof", () => {
  assert.match(homeSource, /function MetricBar/);
  assert.match(homeSource, /redesign\.metrics\.bars\.map/);
  assert.match(homeSource, /168 \/ 4505 \* 100/);
  assert.doesNotMatch(homeSource, /HeroLivingPage/);
  assert.doesNotMatch(homeSource, /UseCasesSection/);
  assert.doesNotMatch(homeSource, /<PipelineSection\b/);
  assert.match(homeSource, /<BentoSection\b/);
  assert.doesNotMatch(homeSource, /<StorageSection\b/);
  assert.match(homeSource, /<HeroScenarios\b/);
  assert.match(homeSource, /href="\/docs\/evaluation"/);
});

test("homepage keeps shared brand icons without preview or assurance chrome", () => {
  assert.doesNotMatch(homeSource, /^(<<<<<<<|=======|>>>>>>>)/m);
  assert.match(homeSource, /ArrowRightIcon/);
  assert.match(homeSource, /GitHubLogoIcon/);
  for (const icon of [
    "ClaudeBrandIcon",
    "CursorBrandIcon",
    "ObsidianBrandIcon",
    "OpenAiBrandIcon",
    "VSCodeBrandIcon",
  ]) {
    assert.match(capabilitySource, new RegExp(icon));
  }
  assert.doesNotMatch(homeSource, /previewBadge|hero\.assurances|assuranceAccents/);
  assert.match(homeSource, /<HeroScenarios\b/);
});

test("homepage links to the download page without duplicating the platform section", () => {
  const demoIndex = homeSource.indexOf('<DemoVideo');

  assert.doesNotMatch(homeSource, /DownloadSection/);
  assert.notEqual(demoIndex, -1, "video entry remains in the hero");
  assert.match(demoSource, /id="demo"/);
  assert.match(homeSource.slice(demoIndex, homeSource.indexOf('id="knowledge-workflows"')), /primaryAction=\{<HomeCta link=\{content\.hero\.primaryCta\}/);
  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    const content = getCoreContent(locale).home.content;
    assert.equal(content.hero.primaryCta.href, "/download");
    assert.equal(content.sections.openSourceCta.primaryCta.href, "/download");
  }
});

test("homepage shows capabilities and retrieval evidence directly while disclosing examples", () => {
  const order = ['<DemoVideo', '<HomeCta link={content.hero.primaryCta}', 'id="knowledge-workflows"', '<ProductMedia locale={locale} slot="wiki"', '<KnowledgeConnections', 'id="ai-recall"', '<ProductMedia locale={locale} slot="ai"', '<HeroScenarios', '<KnowledgeUpdates', 'id="capabilities"', '<BentoSection', 'id="integrations"', 'id="retrieval-evidence"', 'placement="home-footer"'];
  const positions = order.map((marker) => homeSource.indexOf(marker));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.doesNotMatch(homeSource, /<KnowledgeWorkflow/);
  assert.doesNotMatch(homeSource, /<details\s+data-home-features/);
});

test("the preserved worked example remains localized and source-linked", () => {
  assert.match(proofSource, /\/learn\/distilled-wiki-pages-ai-memory#worked-example/);
  for (const filename of ["api-v1.md", "decision-07.md", "runbook-v1.md"]) {
    assert.match(proofSource, new RegExp(filename.replace(".", "\\.")));
  }
  assert.match(proofSource, /Retry failed GET requests up to 3 times \[1\]\[2\]; never retry POST automatically \[1\]\[2\]/);
  assert.match(proofSource, /Timeout not specified\. \[3\]/);
  assert.match(proofSource, /en:/);
  assert.match(proofSource, /"zh-TW":/);
  assert.match(proofSource, /"zh-CN":/);
  assert.match(proofSource, /Authored illustrative reference|no real product output/i);
});

test("workflow chooser keeps all evidence server rendered without adding client state", () => {
  assert.doesNotMatch(comparisonSource, /["']use client["']/);
  assert.doesNotMatch(comparisonSource, /useEffect|useRef|useState|IntersectionObserver/);
  assert.doesNotMatch(comparisonSource, /generationEras|generationVerbs|superseded|gen 2 and beyond|>current<|line-through|transition-/);
  assert.match(comparisonSource, /copy\.generations/);
  assert.match(comparisonSource, /rows\.map/);
  assert.match(comparisonSource, /copy\.current/);
  assert.match(comparisonSource, /data-wenlan-featured/);
  assert.match(comparisonSource, /text-\[var\(--o-warm\)\]/);
  assert.doesNotMatch(comparisonSource, /<details\b/);
  assert.match(workflowGuideSource, /copy\.current\.highlights\.map/);
  assert.match(workflowGuideSource, /copy\.current\.body/);
});

test("workflow comparison uses native keyboard controls and matched table rows", () => {
  const choiceSource = fs.readFileSync(path.join(repoRoot, "src/components/home/workflow-choice.tsx"), "utf8");
  assert.match(comparisonSource, /data-workflow-comparison/);
  assert.match(comparisonSource, /<fieldset\b/);
  assert.match(comparisonSource, /<legend\b/);
  assert.match(choiceSource, /type="radio"/);
  assert.match(comparisonSource, /selected=\{index === 0\}/);
  assert.match(choiceSource, /defaultChecked=\{selected\}/);
  assert.match(comparisonSource, /htmlFor=\{choiceId\}/);
  assert.match(comparisonSource, /\{row\.tabLabel \?\? row\.name\}/);
  assert.match(choiceSource, /aria-controls="workflow-comparison-panel"/);
  assert.equal((comparisonSource.match(/<table\b/g) ?? []).length, 1, "one shared table preserves row geometry across choices");
  assert.match(comparisonSource, /<table\b/);
  assert.match(comparisonSource, /scope="col"/);
  assert.match(comparisonSource, /scope="row"/);
  assert.match(comparisonSource, /copy\.dimensions\.map/);
  assert.match(comparisonSource, /workflow-pair-summary/);
  assert.match(comparisonSource, /<p>\{row\.summary\}<\/p>/, "show the concrete paired difference, not only overlapping feature lists");
  assert.match(comparisonSource, /row\.wenlan\.profile\[index\]/);
  assert.match(comparisonSource, /label=\{row\.wenlan\.labels\[index\]\}/);
  assert.match(comparisonSource, /label=\{row\.profileLabels\[index\]\}/);
  assert.match(comparisonSource, /<strong>\{label\}<\/strong><p>\{detail\}<\/p>/);
  assert.match(comparisonSource, /row\.profile/);
  assert.match(comparisonSource, /<TrackedLocalizedLink/);
  assert.match(comparisonSource, /copy\.detailsLabel/);
  assert.match(comparisonSource, /#workflow-\$\{row\.id\}/);
  assert.match(comparisonSource, /focus-visible:/);
  assert.doesNotMatch(comparisonSource, /overflow-x-auto|table-fixed|aria-hidden="true"[^>]*>.*LLM Wiki/);
  const css = fs.readFileSync(path.join(repoRoot, "src/components/home/workflow-comparison.css"), "utf8");
  assert.match(css, /\.workflow-alternative\s*\{[^}]*grid-area:\s*1\s*\/\s*1[^}]*visibility:\s*hidden/s);
  assert.match(css, /:has\(#workflow-choice-llm-wiki-workflow:checked\)/);
  assert.match(css, /:has\(#workflow-choice-notebooklm:checked\)/);
  assert.doesNotMatch(css, /:checked\s*\+\s*\.workflow-option\s*\{[^}]*font-weight/s);
  assert.doesNotMatch(css, /thead \.workflow-wenlan\s*\{\s*font-size/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media/);
  assert.match(css, /\.workflow-comparison\s*\{[^}]*text-align:\s*center/s);
  assert.doesNotMatch(css, /vertical-align:\s*middle/);
  assert.match(css, /\.workflow-comparison tbody tr\s*\{[^}]*grid-template-rows:\s*auto auto/s);
  assert.match(css, /\.workflow-comparison tbody td,[\s\S]*?\.workflow-comparison tbody \.workflow-answer\s*\{[^}]*grid-template-rows:\s*subgrid/s);
  assert.match(css, /\.workflow-answer strong\s*\{[^}]*align-self:\s*start/s);
  assert.match(css, /\.workflow-option\s*\{[^}]*justify-content:\s*center[^}]*text-align:\s*center/s);
  assert.match(css, /\.workflow-comparison tbody td\s*\{[^}]*grid-row:\s*2\s*\/\s*span 2/s);
});

test("workflow comparison defaults to the first data row without positional identity coupling", () => {
  const rows = getCoreContent("en").home.content.redesign.pains.generations;
  assert.equal(rows[0]?.id, "wiki-graveyard", "the first data entry is the AI files workflow");
  assert.match(comparisonSource, /rows\.map\(\(row, index\) =>/);
  assert.match(comparisonSource, /selected=\{index === 0\}/);
  assert.doesNotMatch(comparisonSource, /defaultChecked=\{[^}]*wiki-graveyard/);
  assert.match(comparisonSource, /const choiceId = `workflow-choice-\$\{row\.id\}`/);
  assert.match(comparisonSource, /#workflow-\$\{row\.id\}/);
});

test("comparison identifies named projects with keyboard and touch accessible background", () => {
  assert.match(comparisonSource, /row\.eyebrow/);
  assert.match(comparisonSource, /copy\.current\.tagline/);
  assert.match(comparisonSource, /WorkflowHelp/);
  assert.match(comparisonSource, /copy\.accessNote/);
  const help = fs.readFileSync(path.join(repoRoot, "src/components/home/workflow-help.tsx"), "utf8");
  for (const contract of [/popover="auto"/, /onFocus=\{show\}/, /onClick=\{show\}/, /onPointerEnter=\{show\}/, /Escape/, /aria-describedby/, /role="tooltip"/]) assert.match(help, contract);
});

test("pipeline preserves semantic workflow and configured-processing boundaries", () => {
  assert.match(pipelineSource, /<ol\b/);
  assert.match(pipelineSource, /copy\.stages\.map/);
  assert.match(pipelineSource, /copy\.distillNote/);
  assert.match(pipelineSource, /copy\.arcLabel/);
  assert.match(pipelineSource, /solution\.note/);
});

test("homepage sends setup questions to docs instead of repeating the feature story", () => {
  assert.doesNotMatch(homeSource, /content\.faqs\.items\.map|content\.faqs\.title/);
  assert.doesNotMatch(homeSource, /id="home-reading"/);
  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    assert.ok(JSON.stringify(getCoreContent(locale).docs.content).includes("/docs/faq"));
  }
});

test("homepage removes redundant horizontal separators while retaining intentional boundaries", async () => {
  assert.doesNotMatch(homeSource, /<section\b[^>]*\b(?:border-b|border-t|border-y)\b/);
  assert.doesNotMatch(homeSource, /mt-16[^\n]*\bborder-t\b/);
  assert.doesNotMatch(homeSource, /<nav\b(?![^>]*fixed top-0)[^>]*\bborder-b\b/);
  const headerSource = fs.readFileSync(new URL("../src/components/site-header.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(headerSource, /<nav[^>]*\bborder-b\b/);
  assert.doesNotMatch(homeSource, /<details\b[^>]*\bborder-y\b/);
  assert.doesNotMatch(homeSource, /<details\b[^>]*\bborder-b\b/);

  assert.doesNotMatch(proofSource, /\bborder-t(?:-2)?\b/);
  assert.match(proofSource, /\bborder-l\b/);

  assert.doesNotMatch(comparisonSource, /<section\b[^>]*\b(?:border-b|border-t|border-y)\b/);
  assert.doesNotMatch(comparisonSource, /\bdivide-y\b[^\n]*\bborder-y\b/);
  assert.doesNotMatch(comparisonSource, /\bborder-t\b/);

  assert.doesNotMatch(pipelineSource, /<section\b[^>]*\b(?:border-b|border-t|border-y)\b/);
  assert.doesNotMatch(pipelineSource, /\bgrid\b[^\n]*\bborder-y\b/);
  assert.doesNotMatch(pipelineSource, /\bborder-t\b/);

  assert.doesNotMatch(downloadSource, /<section\b[^>]*\b(?:border-b|border-t|border-y)\b/);
});

test("sources and clients live in capabilities without treating Obsidian as an AI client", () => {
  const clients = capabilitySource.slice(capabilitySource.indexOf("const clients ="), capabilitySource.indexOf("function Spaces("));
  assert.doesNotMatch(clients, /Obsidian|ChatGPT|Gemini CLI/);
  for (const name of ["Claude Code", "Codex", "Cursor", "Claude Desktop", "VS Code", "Antigravity"]) assert.ok(clients.includes(name));
  assert.match(clients, /https:\/\/antigravity\.google\/docs\/mcp/);
  assert.match(capabilitySource, /<ObsidianBrandIcon/);
  assert.match(capabilitySource, /href="\/learn\/migrate-obsidian-vault-to-llm-wiki"/);
  assert.match(capabilitySource, /href="\/learn\/build-local-ai-knowledge-base-from-documents"/);
  assert.match(capabilitySource, /href="\/docs"/);
  assert.doesNotMatch(homeSource, /data-integration-sources|data-integration-clients/);
  assert.match(homeSource, /data-knowledge-ownership/);
  const icons = fs.readFileSync(path.join(repoRoot, "src/components/icons.tsx"), "utf8");
  assert.match(icons, /antigravity-icon-monochrome\.png/);
});

test("homepage exposes retrieval scope and links to the full evaluation", () => {
  assert.match(homeSource, /data-retrieval-bars/);
  assert.doesNotMatch(homeSource, /data-retrieval-details|data-home-technical/);
  assert.match(homeSource, /href="\/docs\/evaluation"/);
  assert.match(homeSource, /93\.6%/);
  assert.doesNotMatch(homeSource, /<table/);
  assert.match(homeSource, /integrations\.recallLimit/);
  assert.match(homeSource, /integrations\.contextScope/);
  const fitSource = fs.readFileSync(path.join(repoRoot, "src/components/home/pains.tsx"), "utf8");
  assert.match(fitSource, /<ProductShowcase locale=\{locale\}/);
  assert.doesNotMatch(homeSource, /<ProductShowcase/);
  const scenarios = fs.readFileSync(path.join(repoRoot, "src/components/home/hero-scenarios.tsx"), "utf8");
  assert.match(scenarios, /home-consulted-page[^\"]*rounded-lg/);
});

test("recorded product evidence remains a real, hashed asset with a native enlarged view", () => {
  const media = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs/homepage-media-provenance.json"), "utf8"));
  assert.equal(media.benchmarkDate.displayed, "2026-06-24");
  assert.equal(media.benchmarkDate.rerunPerformed, false);
  assert.equal(media.assets.length, 24);
  const scenarioMedia = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs/scenario-media-provenance.json"), "utf8"));
  // Actual Wenlan, Claude and Obsidian captures of the public Cedar packet; provenance is in
  // docs/seo-audits/2026-10-20-low-cost-practitioner-review.md.
  const learnCaptures = [
    {"name": "wenlan-cedar-add-source.jpg", "sha256": "a29453fadb99d5784a5bdce8fff09bda27d7e329bab73b56a7cdae721c0baf82"},
    {"name": "wenlan-cedar-three-sources.jpg", "sha256": "e4cde339127d718ead831530ff0e4fda8ee2a5ac58458cc9c8da80ce3823e916"},
    {"name": "wenlan-cedar-approved-source.jpg", "sha256": "4c094195a78dc95113047d871679c260a82b01107571bf5494ea8aee32661c0a"},
    {"name": "wenlan-cedar-connected.jpg", "sha256": "1012d16679213ec8ba1882e9d8d69adf451eebdd0707d88a0a97de76126ca2dc"},
    {"name": "wenlan-cedar-update-source.jpg", "sha256": "9f137d8f190fda80b4c981d5d87131495ee7e7f3e76782b39910dda6f71df1d0"},
    {"name": "claude-cedar-first-answer.jpg", "sha256": "deddabd05fa67fac21d9b860b83acc2a613e4ab484108e0e0010e49e3d94f057"},
    {"name": "claude-cedar-updated-answer.jpg", "sha256": "a6c844ee6caabec2e11a755a041c72caee81719e40cc459bd1df627f8dd8aca8"},
    { name: "obsidian-cedar-approved.jpg", sha256: "a73a37041dfaad2a4367e45086046f512854660ec51a4a123d160a09b34f39bb" },
    { name: "obsidian-cedar-update.jpg", sha256: "718df506b4d2888c594c5d8436c9d9f258f20ac1874e8283ecd8ab9d82a84704" },
  ];
  for (const asset of learnCaptures) {
    assert.equal(createHash("sha256").update(fs.readFileSync(path.join(repoRoot, "public/images/product-evidence", asset.name))).digest("hex"), asset.sha256);
  }
  assert.deepEqual(
    fs.readdirSync(path.join(repoRoot, "public/images/product-evidence")).sort(),
    // The existing Learn fixture has its own provenance/locale contract in i18n-contract.test.mjs.
    [...media.assets.map((asset) => path.basename(asset.path)), ...scenarioMedia.assets.map((asset) => path.basename(asset.path)), ...learnCaptures.map((asset) => asset.name), "wenlan-space-review-fixture.png"].sort(),
    "Only inventoried homepage, scenario and Learn captures may be publicly served",
  );
  assert.deepEqual(media.showcaseOrder, ["handoff", "knowledge-page-and-sources", "recall"]);
  assert.equal(media.secondaryView, "knowledge-graph");
  assert.deepEqual(media.revisionReviewAssets.map(({ locale, stage }) => [locale, stage]),
    ["en", "zh-TW", "zh-CN"].flatMap((locale) => [[locale, "review"], [locale, "updated"]]));
  for (const asset of media.assets) {
    assert.ok(fs.statSync(path.join(repoRoot, asset.path)).size > 10000);
    assert.match(asset.sha256, /^[a-f0-9]{64}$/);
    assert.equal(createHash("sha256").update(fs.readFileSync(path.join(repoRoot, asset.path))).digest("hex"), asset.sha256);
  }
  const product = fs.readFileSync(path.join(repoRoot, "src/components/home/product-showcase.tsx"), "utf8");
  assert.match(product, /<dialog/);
  assert.match(product, /showModal/);
  assert.match(product, /aria-controls/);
  assert.match(product, /Claude Code · \/recall · 虛構案例，實機截圖/);
  assert.ok(product.includes('wenlan-handoff-${stage}-${locale}.jpg'));
  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    const assets = media.activeShowcaseAssets.filter((asset) => asset.locale === locale);
    assert.deepEqual(assets.map((asset) => asset.stage), ["save", "page", "recall"]);
    for (const asset of assets) {
      assert.equal(path.basename(asset.path), `wenlan-handoff-${asset.stage}-${locale}.jpg`);
    }
  }
  assert.equal(new Set(media.activeShowcaseAssets.map((asset) => asset.sha256)).size, 9, "Each language and step needs its own actual capture");
  assert.doesNotMatch(product, /wenlan-recorded-(?:wiki-source-hover|page-review|claude-capture|ai-recall)|invoice number/i, "Rejected Tally examples must not return to the homepage");
  assert.doesNotMatch(product, /wenlan-mail-decision-recall\.jpg/, "A search screen must not stand in for an AI client retrieving saved knowledge");
  for (const asset of media.activeShowcaseAssets) {
    assert.equal(createHash("sha256").update(fs.readFileSync(path.join(repoRoot, asset.path))).digest("hex"), asset.sha256);
  }
  assert.match(product, /useState\(0\)/);
  assert.match(product, /motion-reduce:transition-none/);
  assert.doesNotMatch(product, /setInterval|setTimeout/);
  assert.match(product, /aria-pressed/);
  assert.match(product, /<figcaption/);
  assert.equal(media.assets[1].sourceSha256, "587fdd4a755e64cbc1090d1e42e821c91b90056b52948b6f1f002e4f91f02a69");
  assert.deepEqual(media.assets[1].dimensions, [3456, 1950]);
});

test("product evidence offers readable zoom, native panning and the original image", () => {
  const product = fs.readFileSync(path.join(repoRoot, "src/components/home/product-showcase.tsx"), "utf8");
  assert.match(product, /setEnlarged\(true\)/);
  assert.match(product, /width: enlarged \? 1600 : "auto"/);
  assert.match(product, /maxWidth: enlarged \? "none" : "100%"/);
  assert.match(product, /maxHeight: enlarged \? "none" : "68dvh"/);
  assert.match(product, /aria-pressed=\{enlarged === zoom\}/);
  assert.match(product, /role="region"[\s\S]*?tabIndex=\{0\}[\s\S]*?overflow-auto overscroll-contain/);
  assert.match(product, /viewport\.scrollTo\(\{/);
  assert.match(product, /1600 \* focus\.x - viewport\.clientWidth \/ 2/);
  assert.match(product, /<Image[\s\S]*?unoptimized/);
  assert.match(product, /href=\{stages\[dialogImage\]\.src\} target="_blank" rel="noopener noreferrer"/);
  assert.match(product, /<form method="dialog"><button autoFocus/);
  assert.match(product, /onClose=\{\(\) => setEnlarged\(false\)\}/);
});

test("homepage finishing keeps short CJK units intact and tool names consistent", () => {
  const readable = fs.readFileSync(path.join(repoRoot, "src/components/home/readable-text.tsx"), "utf8");
  const bentoSource = fs.readFileSync(path.join(repoRoot, "src/components/home/bento.tsx"), "utf8");
  for (const phrase of ["存取", "還原", "結果", "结果", "有什麼不同", "有什么不同"]) assert.ok(readable.includes(phrase));
  assert.match(readable, /children\.split\(keptPhrases\)/);
  assert.match(readable, /className="whitespace-nowrap"/);
  assert.match(bentoSource, /<HomeReadableText>\{body\}/);
  assert.match(pipelineSource, /<HomeReadableText>\{copy\.distillNote\}/);
  assert.doesNotMatch(bentoSource, /Gemini CLI/);
  assert.match(capabilitySource, /AntigravityBrandIcon/);
});

test("task proof stays compact without a rendered intro or step rail", () => {
  assert.doesNotMatch(proofSource, /\{task\.intro\}|\{task\.steps\.map/);
  assert.match(proofSource, /\{task\.authoredLabel\}/);
});

test("product screenshots remain uncropped and supplementary cards keep a responsive grid", () => {
  const product = fs.readFileSync(path.join(repoRoot, "src/components/home/product-showcase.tsx"), "utf8");
  const bento = fs.readFileSync(path.join(repoRoot, "src/components/home/bento.tsx"), "utf8");
  assert.doesNotMatch(product, /group-hover:scale/);
  assert.match(bento, /grid-cols-1 gap-4 md:grid-cols-2/);
  assert.match(bento, /data-capabilities-intro/);
  assert.doesNotMatch(bento, /onPointerMove|radial-gradient/);
});

test("task proof keeps citation groups together on narrow widths", () => {
  assert.match(proofSource, /task\.answer\.split/);
  assert.match(proofSource, /whitespace-nowrap/);
  assert.match(proofSource, /\\\[\\d\+\\\]/);
});

test("task proof uses body-sized answers and gives supporting copy its own rows", () => {
  assert.doesNotMatch(proofSource, /mt-3 font-serif text-xl/);
  assert.match(proofSource, /<p className="mt-3 text-sm leading-relaxed text-\[var\(--o-text\)\]">/);
  assert.match(proofSource, /<code className="block[^\"]*text-sm/);
  assert.match(proofSource, /<span className="mt-1 block text-xs leading-relaxed/);
  assert.doesNotMatch(proofSource, /sm:flex-row sm:items-baseline sm:justify-between/);
  assert.match(proofSource, /mt-5 space-y-3 pt-4 text-sm/);
});
