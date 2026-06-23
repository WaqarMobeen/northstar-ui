# Contributing to Northstar UI

Thanks for helping improve Northstar UI. This guide covers the workflow and the bar a change needs to
clear before it merges.

## Getting set up

```bash
npm install
npm run storybook
```

## Workflow

1. Branch off `main`.
2. Make the change. Most work lives in `src/components/<Name>/`, which holds the implementation, its
   CSS Module, stories, tests, and a barrel `index.ts`.
3. Add or update tests and at least one story that demonstrates realistic usage.
4. Run the checks locally:

   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   npm run test
   ```

5. Add a changeset describing the consumer-facing impact:

   ```bash
   npm run changeset
   ```

6. Open a PR. CI runs typecheck, lint, format, tests, the library build, and the Storybook build.
   Chromatic posts a visual diff.

## Adding a component

A new component should include:

- `Component.tsx` — implementation with exported prop types and a `displayName`.
- `Component.module.css` — styles using design tokens only (no hardcoded colors or spacing).
- `Component.stories.tsx` — Default plus variants/sizes/states as relevant.
- `Component.test.tsx` — behavior and accessibility coverage.
- `index.ts` — barrel export, re-exported from `src/components/index.ts`.

### Quality bar

- Render the correct semantic element; reach for ARIA only when the platform can't express the
  semantics natively. Never build a `div`-as-button.
- Support `className` and forward `ref` where a DOM node is the natural target.
- Provide accessible names, states, and full keyboard interaction for anything interactive.
- Follow the boolean naming convention: `isLoading`, `isInvalid`, `isDisabled`.
- Use `useControllableState` for any value that can be controlled or uncontrolled.
- Prefer composition (subcomponents) over a growing prop list.

## Commit and PR conventions

Keep PRs focused. Reference any related issue. Describe accessibility and keyboard behavior for
interactive changes. The PR template's checklist is the minimum, not the ceiling.

## Code of conduct

Be respectful and constructive. Assume good intent and give specific, actionable feedback.
