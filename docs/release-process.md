# Release process

Releases use [Changesets](https://github.com/changesets/changesets) for versioning and changelog
generation, driven by GitHub Actions.

## Day-to-day: add a changeset

Any PR with a consumer-facing change includes a changeset:

```bash
npm run changeset
```

Pick the bump type and write a short, user-focused summary:

- **patch** — bug fixes, internal changes with no API impact.
- **minor** — new components, new props, backward-compatible additions.
- **major** — breaking changes (removed/renamed props, changed defaults or behavior).

This writes a markdown file under `.changeset/`. Commit it with your change. PRs without a changeset
are fine for docs/tooling-only work.

## Automated flow

On merge to `main`, the `release` workflow runs the Changesets action:

1. If unreleased changesets exist, it opens (or updates) a **"Version Packages"** PR that bumps the
   version, updates `CHANGELOG.md`, and removes the consumed changeset files.
2. When that PR is merged, the workflow publishes to npm.

Publishing only runs when an `NPM_TOKEN` repository secret is configured, so the workflow is safe on a
public portfolio repo or a fork — it simply skips publishing without one. `npm run release` builds the
library before `changeset publish`.

## Manual release (maintainers)

```bash
npm run changeset        # if not already added
npm run version          # apply versions + update changelog
git commit -am "chore: version packages"
npm run release          # build + publish (requires npm auth)
```

## Publishing notes

- The package publishes only the `dist/` directory (`files` in `package.json`).
- `exports` maps `.` to ESM/CJS/types and `./styles.css` to the bundled stylesheet; consumers import
  `northstar-ui/styles.css` once.
- React/ReactDOM are peer dependencies and are not bundled.
- `publishConfig.access` is `public`.
- Bundle size is kept in check by externalizing React, shipping tree-shakeable named exports
  (`sideEffects` limited to CSS), and avoiding heavy runtime dependencies.

## Versioning policy

The project follows semantic versioning. Pre-1.0, minor versions may include breaking changes, but
each is called out in the changeset summary and changelog.
