# Changesets

This folder holds [changesets](https://github.com/changesets/changesets) — small markdown
files that describe the intent and semver impact of a change. They drive versioning and the
generated changelog.

Add one whenever you make a user-facing change:

```bash
npm run changeset
```

Pick the affected package, choose a bump type (`patch`, `minor`, `major`), and write a short,
consumer-focused summary. The CI release workflow consumes accumulated changesets to open a
"Version Packages" PR and publish on merge.
