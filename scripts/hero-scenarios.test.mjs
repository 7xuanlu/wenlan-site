import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { retryPolicySourceExcerpts } from "../src/lib/llm-wiki-source-fixture.ts";
import { extraScenarios, extraAnswerHighlights } from "../src/components/home/hero-scenario-extras.ts";

const componentPath = path.join(process.cwd(), "src/components/home/hero-scenarios.tsx");
const source = fs.readFileSync(componentPath, "utf8");

test("source text renders identically when server and browser word segmentation differ", () => {
  const start = source.search(/const (?:cjkWordSegmenter|sourceReadingUnits) =/);
  assert.ok(start >= 0);
  const excerpt = source.slice(start, source.indexOf("function revealSource"));
  const { outputText } = ts.transpileModule(`${excerpt}\nexport { SourceExcerpt };`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const renderWith = (segments, locale) => {
    const context = {
      exports: {},
      require: (name) => { assert.equal(name, "react/jsx-runtime"); return jsxRuntime; },
      Intl: { Segmenter: class { segment() {
        return segments.map((segment, index) => ({ segment, index, isWordLike: true }));
      } } },
    };
    vm.runInNewContext(outputText, context);
    return renderToStaticMarkup(createElement(context.exports.SourceExcerpt, {
      text: "Trip.com 的混合辦公研究與资料。", locale,
    }));
  };
  for (const locale of ["zh-TW", "zh-CN"]) {
    const server = renderWith(["Trip.com", " 的混合辦公研究與资料。"], locale);
    const browser = renderWith(["Trip", ".", "com", " 的混合辦公研究與资料。"], locale);
    assert.equal(server, browser, `${locale} hydration must not depend on ICU token boundaries`);
    assert.equal(server.replace(/<[^>]*>/g, ""), "Trip.com 的混合辦公研究與资料。");
    assert.match(server, />Trip\.com<\/span>/);
  }
});

function localeBlock(locale) {
  const marker = locale === "en" ? "  en: {" : `  \"${locale}\": {`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `missing ${locale} copy block`);
  const nextLocale = source.slice(start + marker.length).search(/\n  (?:\"zh-TW\"|\"zh-CN\"): \{/);
  return source.slice(start, nextLocale === -1 ? source.length : start + marker.length + nextLocale);
}

test("hero scenarios preserve the original three scenes in every locale", () => {
  assert.match(source, /const copy: Record<Locale, HeroScenariosCopy>/);

  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    const block = localeBlock(locale);
    const ids = [...block.matchAll(/\n        id: "(engineering|client|learning)"/g)].map((match) => match[1]);
    assert.deepEqual(ids, ["engineering", "client", "learning"], `${locale} scene order`);
    assert.match(block, /Illustrative workflow|流程示意/);
  }
});

test("additional scenarios have localized, inspectable evidence for every sentence", () => {
  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    const scenes = extraScenarios[locale];
    assert.deepEqual(scenes.map((scene) => scene.id), ["writing", "meetings", "product"]);
    for (const scene of scenes) {
      const sentences = scene.nextStep.split(/(?<=[.!?。！？])\s*/u).filter(Boolean);
      assert.equal(sentences.length, 2, `${locale}/${scene.id} stays compact`);
      assert.equal(scene.sentenceSources.length, sentences.length);
      assert.equal(new Set(scene.sources.map((entry) => entry.id)).size, scene.sources.length);
      for (const refs of [...scene.sentenceSources, ...scene.knowledgeSummary.facts.map((fact) => fact.sources)]) {
        assert.ok(refs.length > 0);
        for (const number of refs) {
          const evidence = scene.sources[number - 1];
          assert.ok(evidence?.excerpt?.length > 0, `${locale}/${scene.id} source ${number} exists`);
          assert.match(evidence.excerptLabel, /Example record|示意紀錄|示例记录/);
          assert.ok(scene.sentenceSources.flat().includes(number), "fact citations must have an answer citation number");
        }
      }
      for (const phrase of extraAnswerHighlights[locale][scene.id]) assert.ok(scene.nextStep.includes(phrase));
    }
  }
});

test("engineering scene keeps the approved retry rule and unresolved timeout boundary", () => {
  const engineering = localeBlock("en").slice(0, localeBlock("en").indexOf('id: "client"'));
  assert.match(engineering, /Retry failed GET requests up to 3 times/);
  assert.match(engineering, /never retry POST automatically/);
  assert.match(engineering, /timeout boundary is still unspecified/);
  assert.match(retryPolicySourceExcerpts.en.runbook, /timeout has not been decided/);
  assert.match(engineering, /excerpt: retryPolicySourceExcerpts\.en\.runbook/);
  assert.doesNotMatch(engineering, /timeout (?:is|of) \d|\d+\s*ms|\d+\s*seconds/i);
  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    assert.doesNotMatch(
      retryPolicySourceExcerpts[locale].runbook,
      /timeout (?:is|of) \d|\d+\s*ms|\d+\s*seconds/i,
    );
    assert.doesNotMatch(retryPolicySourceExcerpts[locale].runbook, /\d+\s*(?:秒|毫秒)/);
    assert.doesNotMatch(retryPolicySourceExcerpts[locale].runbook, /[零一二三四五六七八九十]+\s*(?:秒|毫秒)/);
  }
});

test("each locale uses concrete workflow inputs rather than placeholder research copy", () => {
  const requiredCopy = {
    en: [
      'title: "API retry policy"',
      'title: "Client delivery scope"',
      'title: "Remote-work research"',
      "Phase one covers sign-in and payments; data export is a separate discussion.",
      "Two studies and a reading note, brought together for a report.",
      "remote-work-2015",
      "research-notes",
    ],
    "zh-TW": [
      'title: "API 重試規則"',
      'title: "專案交付範圍"',
      'title: "遠端工作研究"',
      "第一期只做登入與付款，資料匯出另議。",
      "把兩篇研究與一則閱讀筆記，整理成寫報告時可用的依據。",
      "remote-work-2015",
      "research-notes",
    ],
    "zh-CN": [
      'title: "API 重试规则"',
      'title: "项目交付范围"',
      'title: "远程办公研究"',
      "第一期只做登录和付款，数据导出另议。",
      "把两篇研究与一则阅读笔记，整理成写报告时可用的依据。",
      "remote-work-2015",
      "research-notes",
    ],
  };

  for (const [locale, expected] of Object.entries(requiredCopy)) {
    const block = localeBlock(locale);
    for (const value of expected) {
      assert.ok(block.includes(value), `${locale} should include ${value}`);
    }
  }
  assert.doesNotMatch(source, /Passage retained for comparison|保留供比對的段落|保留供比对的段落/);
});

test("citations resolve to readable supplied source excerpts", () => {
  assert.equal((source.match(/sentenceSources: \[\[1, 2, 3\], \[1, 2\]\]/g) ?? []).length, 3);
  assert.match(source, /<sup[\s\S]*?scene\.sentenceSources\[sentenceIndex\]\.map[\s\S]*?home-scenario-citation/);
  assert.match(source, /<p[^>]*>[\s\S]*?<ScenarioAnswer scene=\{scene\} locale=\{locale\} idPrefix=\{idPrefix\}/);
  assert.equal((source.match(/sentenceSources: \[\[1, 2\], \[3\]\]/g) ?? []).length, 6);
  assert.doesNotMatch(source, /<span[^>]*>\{scene\.capturedLabel\}<\/span>|\{strings\.questionLabel\}/);
  assert.match(source, /href=\{`#\$\{sourceAnchorId\(idPrefix, scene\.id, source\.id\)\}`\}/);
  assert.match(source, /const anchorId = sourceAnchorId\(idPrefix, scene\.id, source\.id\)/);
  assert.match(source, /<details[\s\S]*?id=\{anchorId\}/);
  assert.match(source, /<summary[\s\S]*?source\.label/);
  assert.doesNotMatch(source, /<details[^>]*\bopen(?:\s|=|>)/);
  assert.match(source, /<blockquote[\s\S]*?<SourceExcerpt text=\{source\.excerpt\} locale=\{locale\}/);
  assert.match(source, /sourcesInCitationOrder\(scene\)\.map\(\(source, sourceIndex\)/);
  assert.match(source, /\{sourceIndex \+ 1\}/);
});

test("reference numbers and source rows follow first citation appearance without changing evidence IDs", () => {
  assert.match(source, /new Set\(scene\.sentenceSources\.flat\(\)\)/);
  assert.match(source, /scene\.sources\[sourceNumber - 1\]/);
  assert.match(source, /orderedSources\.findIndex\(\(item\) => item\.id === source\.id\) \+ 1/);
  assert.match(source, /data-source-number=\{number\}/);
});

test("compact superscript references attach to the claim before terminal punctuation", () => {
  assert.match(source, /const body = sentence\.replace/);
  assert.match(source, /const punctuation = sentence\.slice\(body\.length\)/);
  assert.match(source, /body\.split\(matcher\)/);
  assert.match(source, /<sup className="relative -top-\[0\.3em\][^"]*align-baseline/);
  assert.match(source, /<\/sup>\s*\{characters\(punctuation\)\}/);
  assert.doesNotMatch(source, /<sup className="[^"]*ml-/);
});

test("tabs are manual, keyboard-accessible, SSR-render all panels, and respect reduced motion", () => {
  assert.match(source, /useId\(\)/);
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /aria-selected=\{selected\}/);
  assert.match(source, /aria-controls=\{panelId\}/);
  assert.match(source, /case "ArrowRight"/);
  assert.match(source, /case "ArrowLeft"/);
  assert.match(source, /case "Home"/);
  assert.match(source, /case "End"/);
  assert.match(source, /motion-reduce:/);
  assert.match(source, /strings\.scenes\.map\(\(scene, index\)/);
  assert.doesNotMatch(source, /setInterval|setTimeout|addEventListener|onScroll|requestAnimationFrame/);
});

test("illustrations do not claim live customer or product evidence", () => {
  assert.match(source, /Illustrative workflow · not live product output/);
  assert.match(source, /流程示意，非即時產品輸出/);
  assert.match(source, /流程示意，非实时产品输出/);
  assert.doesNotMatch(source, /customer testimonial|real customer output|measured customer|production result/i);
});

test("question-led scenario hierarchy keeps source interactions native and touch friendly", () => {
  assert.match(source, /<h2[^>]*>[\s\S]*?<SourceExcerpt text=\{scene\.question\}/);
  assert.match(source, /home-scenario-tab-indicator/);
  assert.match(source, /name=\{`\$\{idPrefix\}-\$\{scene\.id\}-sources`\}/);
  // Inline prose links use the inline-target exception; the equivalent source
  // disclosure remains a full-width 44px touch target below the answer.
  assert.doesNotMatch(source, /home-scenario-citation[^\"]*min-[hw]-11/);
  assert.match(source, /data-source-number=\{number\}/);
  assert.match(source, /<summary[^\"]*className="[^"]*min-h-11/);
  assert.match(source, /event\.preventDefault\(\)/);
  const styles = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.match(styles, /prefers-reduced-motion: reduce[\s\S]*?home-scenario-tab-indicator/);
  assert.match(styles, /:has\(\.home-scenario-source:nth-child\(1\)\[open\]\)/);
});
