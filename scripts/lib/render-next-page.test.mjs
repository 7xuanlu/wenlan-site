import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderNextPage } from './render-next-page.mjs';

test('renderNextPage rejects when async server rendering reports an error', async () => {
  async function BrokenServerComponent() {
    throw new Error('async render failed');
  }

  const page = React.createElement(
    React.Suspense,
    { fallback: React.createElement('p', null, 'Loading') },
    React.createElement(BrokenServerComponent),
  );

  await assert.rejects(renderNextPage(page), /async render failed/);
});
