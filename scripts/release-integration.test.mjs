import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WENLAN_RELEASE } from '../src/lib/releases.ts';
import { DownloadPage } from '../src/app/_pages/download.tsx';
import { AboutPage } from '../src/app/_pages/about.tsx';
import { GetStartedPage } from '../src/app/_pages/get-started.tsx';
import { HomePage } from '../src/app/_pages/home.tsx';
import { DownloadSection } from '../src/components/home/download.tsx';
import { softwareApplicationSchema } from '../src/app/structured-data.ts';
import { getCoreContent } from '../src/i18n/content/index.ts';

test('all release pages render the supplied release and exactly one matching SoftwareApplication schema', () => {
  const release = {...WENLAN_RELEASE, version:'0.99.1', tag:'v0.99.1',
    releaseUrl: WENLAN_RELEASE.releaseUrl.replace(WENLAN_RELEASE.version,'0.99.1'),
    setupGuideUrl: WENLAN_RELEASE.setupGuideUrl.replace(WENLAN_RELEASE.version,'0.99.1'),
    assets: WENLAN_RELEASE.assets.map(a=>({...a, href:a.href.replaceAll(WENLAN_RELEASE.version,'0.99.1'),
      ...('guideHref' in a ? {guideHref:a.guideHref.replaceAll(WENLAN_RELEASE.version,'0.99.1')} : {}), size:'123.4 MiB'}))};
  for(const locale of ['en','zh-TW','zh-CN']) {
    const productHomeHtml=renderToStaticMarkup(React.createElement(HomePage,{locale,release}));
    const html=renderToStaticMarkup(React.createElement(DownloadPage,{locale,release}));
    for(const asset of release.assets) assert.ok(html.includes(asset.href), `${locale}:${asset.id}`);
    assert.ok(html.includes('v0.99.1'));
    assert.ok(html.includes('123.4 MiB'));
    assert.ok(!html.includes(`/releases/download/${WENLAN_RELEASE.tag}/`));
    assert.equal(softwareApplicationSchema(locale,release).softwareVersion,release.version);
    assert.equal(softwareApplicationSchema(locale,release).downloadUrl,release.releaseUrl);
    for (const [label, pageHtml] of [
      ['home', productHomeHtml],
      ['download', html],
      ['get-started', renderToStaticMarkup(React.createElement(GetStartedPage,{locale,release}))],
      ['about', renderToStaticMarkup(React.createElement(AboutPage,{locale,release}))],
    ]) {
      const schemas = [...pageHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map(([, json]) => JSON.parse(json))
        .filter((schema) => schema['@type'] === 'SoftwareApplication');
      assert.equal(schemas.length, 1, `${locale}:${label} has one SoftwareApplication schema`);
      assert.equal(schemas[0].softwareVersion, release.version, `${locale}:${label} version`);
      assert.equal(schemas[0].downloadUrl, release.releaseUrl, `${locale}:${label} URL`);
    }
    const section=DownloadSection({locale,copy:getCoreContent(locale).home.content.download,release});
    const homeHtml=renderToStaticMarkup(section);
    assert.ok(homeHtml.includes(release.tag));
    assert.ok(!homeHtml.includes(WENLAN_RELEASE.tag));
    const setupHtml=renderToStaticMarkup(React.createElement(GetStartedPage,{locale,release}));
    const visibleSetupHtml = setupHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.ok(setupHtml.includes(release.releaseUrl));
    assert.ok(!visibleSetupHtml.includes(WENLAN_RELEASE.tag), 'visible install copy uses the supplied release');
    assert.ok(!setupHtml.includes(`/releases/download/${WENLAN_RELEASE.tag}/`));
    const howToSchema = [...setupHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(([, json]) => JSON.parse(json))
      .find((schema) => schema['@type'] === 'HowTo');
    assert.ok(howToSchema, 'Get Started emits HowTo schema');
    assert.ok(!JSON.stringify(howToSchema).includes(WENLAN_RELEASE.tag), 'install copy and HowTo schema use the supplied release');
    assert.ok(setupHtml.includes(`All ${release.tag} downloads`) || setupHtml.includes(`全部 ${release.tag}`));
    const aboutHtml=renderToStaticMarkup(React.createElement(AboutPage,{locale,release}));
    const visibleAboutHtml = aboutHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.ok(aboutHtml.includes(release.tag), `${locale}: About shows the resolved release`);
    assert.ok(!aboutHtml.includes('{release}'));
    assert.ok(!visibleAboutHtml.includes(WENLAN_RELEASE.tag), `${locale}: About visible copy uses the supplied release`);
    const recommendation=section.props.children.props.children[1];
    assert.deepEqual(recommendation.props.platforms.map(a=>a.href),release.assets.map(a=>a.href));
  }
});

test('release route wrappers retry after 300 seconds and root document has no release dependency',async()=>{
  for(const file of ['(en)/page.tsx','[locale]/page.tsx','(en)/about/page.tsx','[locale]/about/page.tsx','(en)/download/page.tsx','[locale]/download/page.tsx','(en)/docs/get-started/page.tsx','[locale]/docs/get-started/page.tsx']) {
    const source=await readFile(new URL(`../src/app/${file}`,import.meta.url),'utf8');
    assert.match(source,/await getLatestRelease\(\)/,file);
    assert.match(source,/export const revalidate = 300/,file);
  }
  for(const file of ['(en)/layout.tsx','[locale]/layout.tsx']) {
    assert.doesNotMatch(await readFile(new URL(`../src/app/${file}`,import.meta.url),'utf8'),/revalidate/);
  }
  const root = await readFile(new URL('../src/app/root-document.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(root,/getLatestRelease|softwareApplicationSchema|release-server/);
});
