import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");

let modulesPromise;

async function loadI18nModules() {
  modulesPromise ??= Promise.all([
    import("../src/i18n/locales.ts"),
    import("../src/i18n/routing-config.ts"),
    import("../src/i18n/routing.ts"),
    import("../src/i18n/navigation.tsx"),
    import("../src/i18n/hash.ts"),
    import("../src/i18n/protected-tokens.ts"),
    import("../src/i18n/content/index.ts"),
  ]).then(
    ([
      locales,
      routingConfig,
      routing,
      navigation,
      hash,
      protectedTokens,
      content,
    ]) => ({
      locales,
      routingConfig,
      routing,
      navigation,
      hash,
      protectedTokens,
      content,
    }),
  );

  return modulesPromise;
}

function contentShape(value) {
  if (typeof value === "string") return "string";
  if (Array.isArray(value)) return value.map(contentShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, contentShape(value[key])]),
    );
  }
  return typeof value;
}

function contentShapesByKey(dictionary) {
  return Object.fromEntries(
    Object.keys(dictionary)
      .sort()
      .map((key) => [key, contentShape(dictionary[key].content)]),
  );
}

function leafCountsByKey(dictionary, flattenLeafStrings) {
  return Object.fromEntries(
    Object.keys(dictionary)
      .sort()
      .map((key) => [key, flattenLeafStrings(dictionary[key].content).length]),
  );
}

function hasNonProtectedText(value, protectedTokens) {
  const unprotected = protectedTokens
    .extractProtectedTokens(value)
    .reduce((remaining, token) => remaining.replaceAll(token, ""), value);

  return /[A-Za-z0-9]/.test(unprotected);
}

test("locale model exposes only the supported app locales and metadata", async () => {
  const { locales } = await loadI18nModules();

  assert.equal(locales.DEFAULT_LOCALE, "en");
  assert.deepEqual(locales.SUPPORTED_LOCALES, ["en", "zh-TW", "zh-CN"]);
  assert.deepEqual(locales.TRANSLATED_LOCALES, ["zh-TW", "zh-CN"]);
  assert.deepEqual(locales.htmlLangByLocale, {
    en: "en",
    "zh-TW": "zh-Hant",
    "zh-CN": "zh-Hans",
  });
  assert.deepEqual(locales.hreflangByLocale, {
    en: "en-US",
    "zh-TW": "zh-TW",
    "zh-CN": "zh-CN",
  });
  assert.deepEqual(locales.openGraphLocaleByLocale, {
    en: "en_US",
    "zh-TW": "zh_TW",
    "zh-CN": "zh_CN",
  });
  assert.equal(locales.isSupportedLocale("zh-TW"), true);
  assert.equal(locales.isSupportedLocale("zh-Hant"), false);
});

test("next-intl routing uses as-needed prefixes without locale detection", async () => {
  const { locales, routingConfig } = await loadI18nModules();

  assert.deepEqual(routingConfig.routing.locales, locales.SUPPORTED_LOCALES);
  assert.equal(routingConfig.routing.defaultLocale, "en");
  assert.deepEqual(routingConfig.routing.localePrefix, {
    mode: "as-needed",
    prefixes: {
      "zh-TW": "/zh-TW",
      "zh-CN": "/zh-CN",
    },
  });
  assert.equal(routingConfig.routing.localeDetection, false);
});

test("localized route helpers keep English canonical and prefix translated core routes", async () => {
  const { routing } = await loadI18nModules();

  assert.equal(routing.SITE_URL, "https://useorigin.app");
  assert.deepEqual(routing.CORE_TRANSLATED_PATHS, [
    "/",
    "/about",
    "/docs",
    "/docs/get-started",
  ]);
  assert.equal(routing.localizePath("en", "/docs/get-started"), "/docs/get-started");
  assert.equal(routing.localizePath("zh-TW", "/"), "/zh-TW");
  assert.equal(
    routing.localizePath("zh-TW", "/docs/get-started"),
    "/zh-TW/docs/get-started",
  );
  assert.equal(routing.localizePath("zh-CN", "/about"), "/zh-CN/about");
  assert.equal(routing.localizePath("zh-TW", "/learn"), "/learn");
  assert.deepEqual(routing.stripLocalePrefix("/zh-TW/docs/get-started"), {
    locale: "zh-TW",
    pathname: "/docs/get-started",
  });
  assert.deepEqual(routing.stripLocalePrefix("/docs/get-started"), {
    locale: "en",
    pathname: "/docs/get-started",
  });
  assert.equal(
    routing.canonicalUrl("zh-TW", "/docs/get-started"),
    "https://useorigin.app/zh-TW/docs/get-started",
  );
  assert.equal(routing.canonicalUrl("en", "/"), "https://useorigin.app");
  assert.equal(routing.isTranslatedPath("zh-TW", "/docs/get-started"), true);
  assert.equal(routing.isTranslatedPath("zh-CN", "/about"), true);
  assert.equal(routing.isTranslatedPath("zh-TW", "/learn"), false);
  assert.equal(
    routing.isTranslatedPath("zh-TW", "/learn/wenlan-vs-basic-memory"),
    false,
  );
  assert.equal(routing.isTranslatedPath("zh-CN", "/docs/daily-workflow"), false);
});

test("localized navigation helper localizes translated internal hrefs only", async () => {
  const { navigation } = await loadI18nModules();

  assert.equal(navigation.localizedHrefForLocale("zh-TW", "/about"), "/zh-TW/about");
  assert.equal(
    navigation.localizedHrefForLocale("zh-CN", "/docs/get-started?from=nav#install"),
    "/zh-CN/docs/get-started?from=nav#install",
  );
  assert.equal(navigation.localizedHrefForLocale("zh-TW", "/learn"), "/learn");
  assert.equal(
    navigation.localizedHrefForLocale("zh-TW", "https://useorigin.app/docs"),
    "https://useorigin.app/docs",
  );
});

test("alternate URLs are reciprocal and include x-default for core translated paths", async () => {
  const { locales, routing } = await loadI18nModules();

  for (const pathname of routing.CORE_TRANSLATED_PATHS) {
    const alternates = routing.alternateUrls(pathname);

    assert.deepEqual(Object.keys(alternates).sort(), [
      "en-US",
      "x-default",
      "zh-CN",
      "zh-TW",
    ]);
    assert.equal(alternates["x-default"], routing.canonicalUrl("en", pathname));
    assert.equal(alternates["en-US"], routing.canonicalUrl("en", pathname));
    assert.equal(alternates["zh-TW"], routing.canonicalUrl("zh-TW", pathname));
    assert.equal(alternates["zh-CN"], routing.canonicalUrl("zh-CN", pathname));

    for (const locale of locales.SUPPORTED_LOCALES) {
      assert.deepEqual(
        routing.alternateUrls(routing.localizePath(locale, pathname)),
        alternates,
        `${locale} ${pathname}`,
      );
    }
  }
});

test("content dictionaries keep exact core keys, content shapes, and leaf counts", async () => {
  const { content, hash } = await loadI18nModules();
  const expectedKeys = ["about", "docs", "footer", "getStarted", "home", "notFound"];

  assert.deepEqual(Object.keys(content.enContent).sort(), expectedKeys);
  assert.deepEqual(Object.keys(content.zhTWContent).sort(), expectedKeys);
  assert.deepEqual(Object.keys(content.zhCNContent).sort(), expectedKeys);
  assert.deepEqual(content.localizedContentByLocale.en, content.enContent);
  assert.deepEqual(content.localizedContentByLocale["zh-TW"], content.zhTWContent);
  assert.deepEqual(content.localizedContentByLocale["zh-CN"], content.zhCNContent);

  assert.deepEqual(contentShapesByKey(content.zhTWContent), contentShapesByKey(content.enContent));
  assert.deepEqual(contentShapesByKey(content.zhCNContent), contentShapesByKey(content.enContent));
  assert.deepEqual(
    leafCountsByKey(content.zhTWContent, hash.flattenLeafStrings),
    leafCountsByKey(content.enContent, hash.flattenLeafStrings),
  );
  assert.deepEqual(
    leafCountsByKey(content.zhCNContent, hash.flattenLeafStrings),
    leafCountsByKey(content.enContent, hash.flattenLeafStrings),
  );
});

test("Chinese core content cannot hide English fallback copies", async () => {
  const { content, hash, protectedTokens } = await loadI18nModules();
  assert.ok(content.coreContentByLocale, "coreContentByLocale export");

  const englishDictionary = content.coreContentByLocale.en;

  for (const locale of ["zh-TW", "zh-CN"]) {
    const dictionary = content.coreContentByLocale[locale];

    for (const key of Object.keys(englishDictionary)) {
      const englishUnit = englishDictionary[key];
      const translatedUnit = dictionary[key];
      const englishLeaves = hash.flattenLeafStrings(englishUnit.content);
      const translatedLeaves = hash.flattenLeafStrings(translatedUnit.content);
      const translatedLeavesByPath = new Map(
        translatedLeaves.map(({ path, value }) => [path, value]),
      );
      const hasChangedNonProtectedLeaf = englishLeaves.some(
        ({ path, value }) =>
          hasNonProtectedText(value, protectedTokens) &&
          translatedLeavesByPath.get(path) !== value,
      );

      assert.equal(translatedUnit.status, "translated", `${locale}.${key}.status`);
      assert.notDeepEqual(
        translatedLeaves,
        englishLeaves,
        `${locale}.${key}.content`,
      );
      assert.equal(
        hasChangedNonProtectedLeaf,
        true,
        `${locale}.${key}.content`,
      );
    }
  }
});

test("English core content records the current SEO title and description subset", async () => {
  const { content } = await loadI18nModules();

  assert.equal(
    content.enContent.home.content.seo.title,
    "Wenlan | Living Personal Knowledge Library for AI Work",
  );
  assert.equal(
    content.enContent.home.content.seo.description,
    "Wenlan is a living personal knowledge library for AI work: agents capture what they learn, you add sources you trust, and the daemon keeps source-cited pages current.",
  );
  assert.equal(
    content.enContent.about.content.seo.title,
    "About Wenlan | Living Personal Knowledge Library",
  );
  assert.equal(
    content.enContent.docs.content.seo.title,
    "Wenlan Docs | Product Manual",
  );
  assert.equal(
    content.enContent.getStarted.content.seo.title,
    "Get Started with Wenlan | Local AI Work Memory",
  );
});

test("hashing normalizes whitespace, sorts leaves, and detects English content drift", async () => {
  const { hash } = await loadI18nModules();

  assert.equal(hash.normalizeForHash("  A\r\n  B\t\tC  "), "A B C");
  assert.deepEqual(hash.flattenLeafStrings({ b: "two", a: { z: "last", a: "first" } }), [
    { path: "a.a", value: "first" },
    { path: "a.z", value: "last" },
    { path: "b", value: "two" },
  ]);

  const baseHash = hash.hashEnglishContentUnit({
    seo: {
      description: "A living\r\npersonal   library.",
      title: "Wenlan",
    },
  });
  const reorderedSameHash = hash.hashEnglishContentUnit({
    seo: {
      title: "Wenlan",
      description: " A living personal library. ",
    },
  });
  const changedHash = hash.hashEnglishContentUnit({
    seo: {
      description: "A living personal library!",
      title: "Wenlan",
    },
  });

  assert.equal(baseHash, reorderedSameHash);
  assert.notEqual(baseHash, changedHash);
});

test("Chinese dictionaries store fixed source hashes equal to current English content", async () => {
  const { content, hash } = await loadI18nModules();

  for (const [locale, dictionary] of [
    ["zh-TW", content.zhTWContent],
    ["zh-CN", content.zhCNContent],
  ]) {
    for (const key of Object.keys(content.enContent)) {
      assert.match(
        dictionary[key].sourceHash,
        /^[a-f0-9]{64}$/,
        `${locale}.${key}.sourceHash`,
      );
      assert.equal(
        dictionary[key].sourceHash,
        hash.hashEnglishContentUnit(content.enContent[key].content),
        `${locale}.${key}.sourceHash`,
      );
    }
  }

  for (const path of ["src/i18n/content/zh-TW.ts", "src/i18n/content/zh-CN.ts"]) {
    const source = await readFile(resolve(repoRoot, path), "utf8");
    assert.doesNotMatch(source, /enContent|hashEnglishContentUnit|node:crypto/, path);
  }
});

test("translated content dictionaries preserve protected tokens from English content", async () => {
  const { content, protectedTokens } = await loadI18nModules();

  for (const locale of ["zh-TW", "zh-CN"]) {
    const dictionary = content.localizedContentByLocale[locale];

    for (const key of Object.keys(content.enContent)) {
      assert.doesNotThrow(
        () =>
          protectedTokens.assertProtectedTokensPreserved(
            content.enContent[key].content,
            dictionary[key].content,
            `${locale}.${key}`,
          ),
        `${locale}.${key}`,
      );
    }
  }
});

test("protected token extraction preserves commands, URLs, packages, env vars, metrics, license, and names", async () => {
  const { protectedTokens } = await loadI18nModules();
  const source = [
    "`/plugin marketplace add 7xuanlu/claude-plugins`",
    "`/plugin install wenlan@7xuanlu`",
    "`/init`",
    "`npx -y wenlan setup`",
    "`~/.wenlan/bin/wenlan mcp add codex`",
    "See https://github.com/7xuanlu/wenlan and @7xuanlu/wenlan.",
    "Set WENLAN_RERANKER_ENABLED before reading LME_Oracle at 93.6% / 0.857.",
    "Apache-2.0, Qi-Xuan Lu, and 7xuanlu stay exact.",
  ].join("\n");
  const translated = [
    "執行 `/plugin marketplace add 7xuanlu/claude-plugins`。",
    "再執行 `/plugin install wenlan@7xuanlu` 與 `/init`。",
    "也可以執行 `npx -y wenlan setup`。",
    "MCP 指令是 `~/.wenlan/bin/wenlan mcp add codex`。",
    "參考 https://github.com/7xuanlu/wenlan 和 @7xuanlu/wenlan。",
    "先設定 WENLAN_RERANKER_ENABLED，再閱讀 LME_Oracle 的 93.6% / 0.857。",
    "Apache-2.0、Qi-Xuan Lu、7xuanlu 必須保留。",
  ].join("\n");

  const extractedTokens = protectedTokens.extractProtectedTokens(source);
  for (const token of [
    "/plugin marketplace add 7xuanlu/claude-plugins",
    "/plugin install wenlan@7xuanlu",
    "/init",
    "npx -y wenlan setup",
    "~/.wenlan/bin/wenlan mcp add codex",
    "https://github.com/7xuanlu/wenlan",
    "@7xuanlu/wenlan",
    "WENLAN_RERANKER_ENABLED",
    "LME_Oracle",
    "93.6%",
    "0.857",
    "Apache-2.0",
    "Qi-Xuan Lu",
    "7xuanlu",
  ]) {
    assert.ok(extractedTokens.includes(token), token);
  }
  assert.doesNotThrow(() =>
    protectedTokens.assertProtectedTokensPreserved(source, translated, "protected sample"),
  );
  assert.throws(
    () =>
      protectedTokens.assertProtectedTokensPreserved(
        source,
        translated.replace("0.857", "0.856"),
        "protected sample",
      ),
    /protected sample.*0\.857/s,
  );
});
