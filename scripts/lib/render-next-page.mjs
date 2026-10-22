import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import NextLink from 'next/link';
import { FrameworkProvider } from 'fumadocs-core/framework';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime.js';
import {
  PathnameContext,
  PathParamsContext,
  SearchParamsContext,
} from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js';

const router = {
  back() {},
  forward() {},
  refresh() {},
  push() {},
  replace() {},
  prefetch() {},
};

/** Render an App Router page with Next's route contexts, including async server components. */
export function renderNextPage(element, { pathname = '/', params = {} } = {}) {
  const wrapped = React.createElement(
    FrameworkProvider,
    {
      useRouter: () => router,
      usePathname: () => pathname,
      useParams: () => params,
      Link: NextLink,
    },
    React.createElement(
    AppRouterContext.Provider,
    { value: router },
    React.createElement(
      PathnameContext.Provider,
      { value: pathname },
      React.createElement(
        PathParamsContext.Provider,
        { value: params },
        React.createElement(
          SearchParamsContext.Provider,
          { value: new URLSearchParams() },
          element,
        ),
      ),
    ),
    ),
  );

  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks = [];
    let renderError;
    let stream;
    const timeout = setTimeout(() => {
      stream?.abort();
      reject(new Error('Timed out while rendering a Next App Router page'));
    }, 20_000);

    output.on('data', chunk => chunks.push(chunk));
    output.on('end', () => {
      clearTimeout(timeout);
      if (renderError) reject(renderError);
      else resolve(Buffer.concat(chunks).toString('utf8'));
    });
    output.on('error', error => {
      clearTimeout(timeout);
      reject(error);
    });

    stream = renderToPipeableStream(wrapped, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError(error) {
        clearTimeout(timeout);
        reject(error);
      },
      onError(error) {
        renderError ??= error;
      },
    });
  });
}
