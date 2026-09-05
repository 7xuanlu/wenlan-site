# PR Proof

Every pull request proves its own change. Code and words stay minimal and
make space for the proof; a reviewer should not have to render the branch
or rerun the pipeline to see what changed.

## Visual PRs

Attach before/after screenshots of every changed surface in the PR body.
One `pnpm dev` run is enough: capture each route or component state the
diff touches, at desktop width, in the repo's default (dark) theme unless
the change is theme-specific.

## Non-visual PRs

Server actions, scripts, SEO pipeline, and config changes cannot be
screenshotted. Paste a dry-run or live smoke-test narrated in your own
words instead, showing real behavior the automated suites do not capture
(unit, integration, e2e, smoke). Quote the decisive observed output, not
a summary of it.
