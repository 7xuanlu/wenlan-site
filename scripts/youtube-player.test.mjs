import assert from 'node:assert/strict';
import test from 'node:test';
import { mountDemoPlayer } from '../src/lib/youtube-player.ts';

function fixture({ cold = false } = {}) {
  const oldWindow = globalThis.window;
  const oldDocument = globalThis.document;
  const timers = new Map();
  const events = [];
  const delays = new Map();
  const errors = [];
  let nextTimer = 0;
  let options;
  let frame;
  let constructs = 0;
  let destroys = 0;
  const player = { playVideo() { events.push('play'); }, destroy() { destroys++; } };
  globalThis.window = {
    location: { origin: 'http://localhost:3214' },
    setTimeout(fn, delay) { const id = ++nextTimer; timers.set(id, fn); delays.set(id, delay); return id; },
    clearTimeout(id) { timers.delete(id); delays.delete(id); },
    YT: { Player: class { constructor(_element, config) { constructs++; options = config; return player; } } },
  };
  const api = globalThis.window.YT;
  if (cold) globalThis.window.YT = undefined;
  globalThis.document = {
    head: { append() {} },
    createElement() { return { focus() { events.push('focus'); } }; },
  };
  const host = { contains() { return false; }, append(element) { frame = element; }, replaceChildren() { frame = undefined; } };
  const dispose = mountDemoPlayer(host, 'https://www.youtube-nocookie.com/embed/example?autoplay=1', 'Demo', {
    onReady() { events.push('ready'); },
    onError(reason) { events.push('error'); errors.push(reason); },
  });
  return {
    events, timers, delays, errors, dispose,
    loadApi() { globalThis.window.YT = api; globalThis.window.onYouTubeIframeAPIReady(); },
    get options() { return options; }, get frame() { return frame; },
    get constructs() { return constructs; }, get destroys() { return destroys; },
    player,
    restore() { dispose(); globalThis.window = oldWindow; globalThis.document = oldDocument; },
  };
}

const flush = () => new Promise(resolve => setImmediate(resolve));

test('keep the poster until the player reports ready, then focus without scrolling', async () => {
  const f = fixture();
  try {
    await flush();
    assert.deepEqual(f.events, []);
    assert.equal(f.frame.tabIndex, -1);
    assert.equal(new URL(f.frame.src).searchParams.get('origin'), 'http://localhost:3214');
    f.options.events.onReady({ target: f.player });
    assert.deepEqual(f.events, ['ready', 'focus', 'play']);
    assert.equal(f.frame.tabIndex, 0);
    assert.equal(f.timers.size, 0);
  } finally { f.restore(); }
});

test('an unresponsive player times out and late readiness cannot start hidden playback', async () => {
  const f = fixture();
  try {
    await flush();
    [...f.timers.values()][0]();
    assert.deepEqual(f.events, ['error']);
    assert.equal(f.frame, undefined);
    f.options.events.onReady({ target: f.player });
    assert.deepEqual(f.events, ['error']);
    f.dispose();
    assert.equal(f.destroys, 1);
  } finally { f.restore(); }
});

test('provider errors remove the player and notify once', async () => {
  const f = fixture();
  try {
    await flush();
    f.options.events.onError({ data: 153 });
    f.options.events.onError({ data: 153 });
    assert.deepEqual(f.events, ['error']);
    assert.deepEqual(f.errors, ['youtube-153']);
    assert.equal(f.destroys, 1);
    assert.equal(f.timers.size, 0);
  } finally { f.restore(); }
});

test('leaving before the API resolves cannot create an orphan player', async () => {
  const f = fixture();
  try {
    f.dispose();
    await flush();
    assert.equal(f.constructs, 0);
    assert.deepEqual(f.events, []);
    assert.equal(f.timers.size, 0);
  } finally { f.restore(); }
});

test('late readiness does not steal focus from another control', async () => {
  const f = fixture();
  try {
    globalThis.document.activeElement = { tagName: 'INPUT' };
    await flush();
    f.options.events.onReady({ target: f.player });
    assert.deepEqual(f.events, ['ready', 'play']);
  } finally { f.restore(); }
});

// The API can consume most of its own timeout before a player can even exist.
test('cold API loading does not consume the player readiness deadline', async () => {
  const f = fixture({ cold: true });
  try {
    assert.deepEqual([...f.delays.values()], [10000]);
    assert.equal(f.constructs, 0);
    assert.equal(f.frame, undefined);
    f.loadApi();
    await flush();
    assert.equal(f.constructs, 1);
    assert.deepEqual([...f.delays.values()], [12000]);
    f.options.events.onReady({ target: f.player });
    assert.equal(f.timers.size, 0);
    assert.deepEqual(f.events, ['ready', 'focus', 'play']);
  } finally { f.restore(); }
});
