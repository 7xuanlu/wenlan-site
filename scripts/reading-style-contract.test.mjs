import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import postcss from "postcss";

const root = process.cwd();
const readingCssPaths = walk(path.join(root, "src/components/reading"), file => file.endsWith(".css"));
const sourcePaths = [
  ...walk(path.join(root, "src/components/reading"), file => /\.tsx?$/.test(file)),
  ...walk(path.join(root, "src/components/learn"), file => /\.tsx?$/.test(file)),
  "src/app/(en)/learn/page.tsx",
  "src/app/(en)/learn/[slug]/page.tsx",
  "src/app/(en)/docs/[slug]/page.tsx",
  "src/app/[locale]/learn/[slug]/page.tsx",
  "src/app/_pages/docs-index.tsx",
  "src/app/_pages/get-started.tsx",
  "src/app/_pages/localized-learn-index.tsx",
].map(file => path.isAbsolute(file) ? file : path.join(root, file));

function walk(directory, include) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file, include) : include(file) ? [file] : [];
  });
}

function stripVariants(token) {
  let depth = 0;
  let lastColon = -1;
  for (let index = 0; index < token.length; index += 1) {
    if (token[index] === "[") depth += 1;
    else if (token[index] === "]") depth = Math.max(0, depth - 1);
    else if (token[index] === ":" && depth === 0) lastColon = index;
  }
  return token.slice(lastColon + 1);
}

function isZeroUtility(value) {
  return /(?:^|-)0(?:$|\/|\[0(?:px|rem|em)?\]$)/.test(value) || /-\[0(?:px|rem|em)?\]$/.test(value);
}

function isHorizontalDivider(token) {
  const utility = stripVariants(token);
  if (/^border-[tb](?:$|-)/.test(utility)) return !isZeroUtility(utility);
  if (/^divide-y(?:$|-)/.test(utility)) return !isZeroUtility(utility) && !utility.endsWith("divide-y-reverse");
  return false;
}

function warmToneToken(token) {
  const utility = stripVariants(token);
  if (/^bg-(?:orange|amber|wenlan-warm)(?:-|$)/i.test(utility)) return true;
  if (/^border-(?:orange|amber|wenlan-warm)(?:-|$)/i.test(utility)) return true;
  if (/^(?:bg|border)-\[[^\]]*(?:--o-warm|wenlan-warm|glow-warm|orange|amber)[^\]]*\]/i.test(utility)) return true;
  return false;
}

function classIssues(classText, interactive, file, line) {
  const issues = [];
  for (const token of classText.split(/\s+/).filter(Boolean)) {
    if (isHorizontalDivider(token)) issues.push({ file, line, rule: "horizontal-divider", token });
    if (!interactive && warmToneToken(token)) issues.push({ file, line, rule: "warm-panel-tone", token });
  }
  return issues;
}

function jsxTagName(name) {
  return ts.isIdentifier(name) ? name.text : name.getText();
}

function classStrings(node, variables, seen = new Set()) {
  if (!node) return [];
  if (ts.isStringLiteralLike(node)) return [node.text];
  if (ts.isIdentifier(node) && variables.has(node.text) && !seen.has(node.text)) {
    const nextSeen = new Set(seen).add(node.text);
    return classStrings(variables.get(node.text), variables, nextSeen);
  }
  if (ts.isJsxExpression(node)) return classStrings(node.expression, variables, seen);
  if (ts.isTemplateExpression(node)) return [node.head.text, ...node.templateSpans.flatMap(span => [...classStrings(span.expression, variables, seen), span.literal.text])];
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return [...classStrings(node.left, variables, seen), ...classStrings(node.right, variables, seen)];
  }
  const strings = [];
  function visit(child) {
    if (ts.isStringLiteralLike(child)) strings.push(child.text);
    else if (ts.isNoSubstitutionTemplateLiteral(child)) strings.push(child.text);
    else if (ts.isIdentifier(child) && variables.has(child.text) && !seen.has(child.text)) {
      strings.push(...classStrings(child, variables, seen));
    } else if (ts.isTemplateExpression(child)) {
      strings.push(...classStrings(child, variables, seen));
    } else ts.forEachChild(child, visit);
  }
  visit(node);
  return strings;
}

function inspectTsx(source, file = "fixture.tsx") {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const variables = new Map();
  function indexVariables(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && /class/i.test(node.name.text) && node.initializer) {
      variables.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, indexVariables);
  }
  indexVariables(tree);
  const issues = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = jsxTagName(node.tagName).toLowerCase();
      const line = tree.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      if (tag === "hr") issues.push({ file, line, rule: "horizontal-divider-element", token: "<hr>" });
      const classAttr = node.attributes.properties.find(property => ts.isJsxAttribute(property) && /^(?:className|class|classNames)$/.test(property.name.getText()));
      if (classAttr?.initializer) {
        const interactive = /^(?:a|button|input|select|textarea|summary)$/.test(tag) || /(?:Link|Button|button)$/.test(jsxTagName(node.tagName)) || node.attributes.properties.some(property => ts.isJsxAttribute(property) && property.name.getText() === "role" && /button|link|menuitem/.test(property.initializer?.getText() ?? ""));
        for (const value of classStrings(classAttr.initializer, variables)) issues.push(...classIssues(value, interactive, file, line));
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return issues;
}

function isZeroCss(value) {
  const parts = value.trim().split(/\s+/);
  return parts.length > 0 && parts.every(part => /^(?:0(?:px|rem|em|%)?|none|hidden|solid)$/i.test(part));
}

function positiveWidth(value) {
  const match = value.trim().match(/^([\d.]+)(px|rem|em)?/i);
  return !match || Number(match[1]) > 0;
}

function chevronException(rule) {
  if (rule.selector.trim() !== ".reading-groups summary::after") return false;
  const declarations = new Map();
  rule.walkDecls(decl => declarations.set(decl.prop.toLowerCase(), decl.value.trim()));
  return declarations.has("border-right")
    && declarations.has("border-bottom")
    && positiveWidth(declarations.get("border-right"))
    && positiveWidth(declarations.get("border-bottom"))
    && Number.parseFloat(declarations.get("width")) <= 6
    && Number.parseFloat(declarations.get("height")) <= 6
    && /rotate\(/i.test(declarations.get("transform") ?? "");
}

function isWarmCss(value) {
  return /(?:orange|amber|--o-warm|wenlan-warm|glow-warm)/i.test(value);
}

function inspectReadingCss(css, file = "reading.css") {
  const issues = [];
  const ast = postcss.parse(css, { from: file });
  ast.walkRules(rule => {
    const isChevron = chevronException(rule);
    rule.walkDecls(decl => {
      const prop = decl.prop.toLowerCase();
      if (/^border-(?:top|bottom|block(?:-(?:start|end))?)(?:-width)?$/.test(prop) && !isZeroCss(decl.value) && !(isChevron && prop === "border-bottom")) {
        issues.push({ file, line: decl.source?.start?.line ?? 1, rule: "horizontal-divider-css", token: `${prop}: ${decl.value}` });
      }
      const isTone = /^(?:background|background-color|border|border-color|border-(?:top|right|bottom|left|block(?:-start|-end)?)(?:-color)?)$/.test(prop);
      if (isTone && isWarmCss(decl.value)) {
        issues.push({ file, line: decl.source?.start?.line ?? 1, rule: "warm-panel-tone-css", token: `${prop}: ${decl.value}` });
      }
    });
  });
  return issues;
}

function inspectRepo() {
  const issues = [];
  for (const file of sourcePaths) {
    if (!file.endsWith(".tsx")) continue;
    issues.push(...inspectTsx(readFileSync(file, "utf8"), path.relative(root, file)));
  }
  for (const cssPath of readingCssPaths) {
    issues.push(...inspectReadingCss(readFileSync(cssPath, "utf8"), path.relative(root, cssPath)));
  }
  return issues;
}

function formatIssues(issues) {
  return issues.map(issue => `${issue.file}:${issue.line} ${issue.rule} ${issue.token}`).join("\n");
}

test("reading-style inspection allows neutral frames, warm text, focus outlines, and the small chevron", () => {
  const tsx = `<div className="rounded-lg border border-[var(--o-border)] text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-[var(--o-warm)]" />`;
  const css = `.reading-groups summary::after { width: 6px; height: 6px; border-right: 1px solid var(--o-text-muted); border-bottom: 1px solid var(--o-text-muted); transform: rotate(45deg); }\n.card { border: 1px solid var(--o-border); background: var(--o-bg); }\n.card:focus-visible { outline: 2px solid var(--o-warm); }\n.card { border: 0; border-top: 0; border-bottom: none; }`;
  assert.deepEqual(inspectTsx(tsx), []);
  assert.deepEqual(inspectReadingCss(css), []);
});

test("reading-style inspection blocks divider lines and warm non-interactive panels", () => {
  const tsx = `const selectedClassName = selected ? \`border-b \${panelToneClass}\` : "bg-amber-100";\nconst panelToneClass = "border-orange-400";\nconst conditionalClassName = enabled ? "divide-y-2" : "border-b-0";\n<><div className="border-t divide-y-2 bg-orange-100" /><section className={"border-b border-amber-300 bg-[var(--o-warm)]/[0.08]"} /><div className="bg-amber-200 border-orange-400" /><div className={\`${"${selectedClassName}"} p-4\`} /><div className={conditionalClassName} /><hr /></>`;
  const css = `.panel { border-top: 1px solid var(--o-border); border-block-end: 1px solid var(--o-border); border-bottom-width: 2px; border-block-start-width: 1px; background-color: var(--o-glow-warm-bg); border-color: var(--o-warm); border: 1px solid var(--o-warm); }`;
  assert.deepEqual(inspectTsx(tsx).map(issue => issue.rule), ["horizontal-divider", "horizontal-divider", "warm-panel-tone", "horizontal-divider", "warm-panel-tone", "warm-panel-tone", "warm-panel-tone", "warm-panel-tone", "horizontal-divider", "warm-panel-tone", "warm-panel-tone", "horizontal-divider", "horizontal-divider-element"]);
  assert.deepEqual(inspectReadingCss(css).map(issue => issue.rule), ["horizontal-divider-css", "horizontal-divider-css", "horizontal-divider-css", "horizontal-divider-css", "warm-panel-tone-css", "warm-panel-tone-css", "warm-panel-tone-css"]);
});

test("reading-style contract has no horizontal dividers or warm panel fills and borders", () => {
  const issues = inspectRepo();
  assert.equal(issues.length, 0, `Found ${issues.length} reading-style contract violation(s):\n${formatIssues(issues)}`);
});
