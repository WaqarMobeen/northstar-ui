# Architecture

This document explains how Northstar UI is organized and why, so contributors can extend it without
re-deriving the conventions.

## Layering

The library is layered from the bottom up, and dependencies only point downward:

1. **Tokens** (`src/styles/*.css`, `src/tokens/`) — the visual contract. CSS custom properties are
   the runtime source of truth; `src/tokens/tokens.ts` mirrors the structural (theme-independent)
   tokens as typed values for non-CSS consumers.
2. **Theme** (`src/theme/`) — `ThemeProvider` sets `data-theme`/`data-accent`, which the token CSS
   keys off. Nothing below this layer imports from above it.
3. **Hooks & utils** (`src/hooks/`, `src/utils/`) — framework-level building blocks (controllable
   state, focus trap, scroll lock, ref composition) with no component dependencies.
4. **Components** (`src/components/`) — composed from the layers above. Components may depend on
   other components (e.g. `Alert` uses `IconButton`), but we keep that graph shallow and acyclic.

The public surface is `src/index.ts`, which re-exports components, hooks, theme, tokens, utils, and
shared types.

## Component anatomy

Each component is a self-contained folder:

```
Button/
├── Button.tsx          # implementation + exported prop types
├── Button.module.css   # token-based styles, scoped by CSS Modules
├── Button.stories.tsx  # Storybook stories
├── Button.test.tsx     # Vitest + RTL tests
└── index.ts            # barrel: export { Button }, export type { ButtonProps }
```

`src/components/index.ts` aggregates the barrels. Importing through barrels (not deep paths) keeps the
public API stable and avoids circular imports — a component never imports a sibling through the
top-level barrel, only through that sibling's own folder.

## Styling strategy

Styles are CSS Modules referencing design tokens via `var(--ns-*)`. We chose this over a CSS-in-JS or
utility framework for three reasons: zero runtime cost, trivial theming through custom properties, and
styles that are easy to read and override. Variants are expressed as `data-*` attributes
(`data-variant`, `data-size`, `data-invalid`) and styled with attribute selectors, which keeps the
class-name surface small and makes component state inspectable in the DOM and in tests.

The consumer-facing `className` prop is always appended last via the `cn` helper so application styles
can win without `!important`.

## State: the controlled/uncontrolled contract

Every value that can be owned by either the component or its consumer goes through
`useControllableState`. It locks the mode (controlled vs uncontrolled) on first render, always fires
`onChange`, and only mutates internal state when uncontrolled. This is why `value`/`defaultValue`/
`on*Change` behave identically across Tabs, RadioGroup, Accordion, Popover, Combobox, and
ThemeProvider.

## Overlays and portals

Modal surfaces (Dialog, Drawer) and transient surfaces (Toast) render through `Portal` into
`document.body` to escape overflow and stacking-context traps. Because the theme attributes live on
the provider's wrapper rather than the body, portaled content re-applies `data-theme`/`data-accent`
from `useThemeOptional()` so it stays themed wherever it mounts. Z-index ordering comes from the
`--ns-z-*` token scale rather than ad-hoc numbers.

## Build

`vite build` (library mode) emits ESM (`index.js`) and CJS (`index.cjs`) bundles plus a single
stylesheet (`northstar-ui.css`) aggregated from the component CSS Modules and the base layer.
`vite-plugin-dts` (driven by `tsconfig.build.json`) rolls types up into `index.d.ts`. React and
ReactDOM are externalized as peer dependencies so consumers dedupe on their own copy, and the package
declares `sideEffects: ["**/*.css"]` to keep JS tree-shakeable while preserving the stylesheet.

## Decisions

Longer-lived decisions are recorded as ADRs under [`docs/adr/`](adr/).
