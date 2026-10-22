import test from 'node:test';
import assert from 'node:assert/strict';
import { copyTextSafely } from '../src/lib/copy-text.ts';
test('copy preserves the exact authored bytes and handles permission denial', async () => {
  const text = '  中文 /path\n<literal>& "quoted"\n';
  let copied;
  assert.equal(await copyTextSafely(text, async value => {copied = value;}), true);
  assert.equal(copied, text);
  assert.equal(await copyTextSafely(text, async () => {throw new Error('NotAllowedError');}), false);
  assert.equal(await copyTextSafely(text, () => {throw new TypeError('Clipboard unavailable');}), false);
});
