import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderActiveControl, validateActiveControl, fingerprintInputs, canReuseControl, CONTRACT_BLOCKS } from './seo-goal-control.mjs';
const root = new URL('../', import.meta.url);
const plan = await readFile(new URL('SEO-CAMPAIGN.md', root), 'utf8');
const active = await readFile(new URL('docs/seo-active-control.md', root), 'utf8');

test('short guide excludes history while the verifier still protects every full contract', () => {
  const view = renderActiveControl(plan);
  assert.equal(active, view);
  assert.ok(Buffer.byteLength(view) <= 6000);
  assert.ok(!view.includes('## Frozen Goal Contract'));
  assert.ok(!view.includes('### Current experiment'));
  for (const marker of CONTRACT_BLOCKS) {
    assert.throws(() => renderActiveControl(plan.replace(`<!-- ${marker}:END -->`, 'removed')));
    const altered = plan.replace(`<!-- ${marker}:START -->`, `<!-- ${marker}:START -->\nUnauthorized policy change.`);
    assert.ok(validateActiveControl(altered, renderActiveControl(altered)).some(e => e.includes('Protected contract')));
  }
  assert.deepEqual(validateActiveControl(plan, active), []);
  assert.ok(validateActiveControl(plan, active.replace('20 page', '1 page')).length);
  assert.ok(validateActiveControl(plan, '').length);
  assert.throws(() => renderActiveControl(plan + '\n<!-- CONTENT-EXPANSION-CORRECTION:START -->'));
  const oversized = plan.replace('### Always read', 'x'.repeat(6001) + '\n### Always read');
  assert.throws(() => renderActiveControl(oversized), /exceeds 6000 bytes/);
  assert.ok(validateActiveControl(plan.replace('native blocked audit', 'keep polling forever'), active).length);
  // Historical narration may grow/change without returning it to model context.
  const history = plan + '\n## Old readout\n' + 'old results '.repeat(5000);
  assert.equal(renderActiveControl(history), view);
  assert.notEqual(fingerprintInputs([['SEO-CAMPAIGN.md', plan]]), fingerprintInputs([['SEO-CAMPAIGN.md', history]]));
  const checkpoint = plan.replace('<!-- ACTIVE-CONTROL-STATE:START -->', '<!-- ACTIVE-CONTROL-STATE:START -->\nNew observation.');
  assert.equal(renderActiveControl(checkpoint), view);
  assert.deepEqual(validateActiveControl(checkpoint, view), []);
});

test('choosing work requires the current successor deadline and stop conditions', () => {
  const row = active.split('\n').find(line => line.startsWith('| Resume / choose next work |'));
  assert.ok(row?.includes('(../SEO-CAMPAIGN.md#successor-goal-contract)'), 'a PASS alone does not enforce the wall-clock deadline');
});

test('task bookmarks resolve to real files and named sections', async () => {
  const links = [...active.matchAll(/\]\(([^)]+)\)/g)].map(m => m[1]);
  assert.ok(links.length >= 15, 'guide must retain task-specific source bookmarks');
  for (const link of links) {
    const [file, anchor] = link.split('#');
    const source = await readFile(new URL(file, new URL('docs/', root)), 'utf8');
    if (anchor) {
      const headings = [...source.matchAll(/^#{1,6} (.+)$/gm)].map(m => m[1].toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-'));
      assert.ok(headings.includes(anchor), `Missing bookmark: ${link}`);
    }
  }
});

test('reuse requires successful verification and a previously read matching fingerprint', () => {
  const a = fingerprintInputs([['SEO-CAMPAIGN.md',plan],['EXPERIMENTS.md','state A']]);
  const b = fingerprintInputs([['SEO-CAMPAIGN.md',plan],['EXPERIMENTS.md','state B']]);
  assert.equal(a, fingerprintInputs([['EXPERIMENTS.md','state A'],['SEO-CAMPAIGN.md',plan]]));
  assert.notEqual(a,b);
  assert.equal(canReuseControl(a,a,true),true);
  assert.equal(canReuseControl(undefined,a,true),false);
  assert.equal(canReuseControl(a,b,true),false);
  assert.equal(canReuseControl(a,a,false),false);
});

test('legacy PLAN path points to the sole campaign source without duplicating history', async () => {
  const pointer = await readFile(new URL('PLAN.md', root), 'utf8');
  assert.ok(Buffer.byteLength(pointer) < 500);
  assert.ok(pointer.includes('[SEO-CAMPAIGN.md](SEO-CAMPAIGN.md)'));
  assert.ok(pointer.includes('[short reading guide](docs/seo-active-control.md)'));
  assert.ok(!pointer.includes('FROZEN-GOAL-CONTRACT'));
});
