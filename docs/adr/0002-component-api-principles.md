# ADR 0002: Component API principles

- Status: Accepted
- Date: 2026-06-03

## Context

A design system lives or dies by the consistency of its component APIs. Without a shared contract,
each component invents its own state handling, naming, and extension points, and consumers pay the
cost in surprises. We need conventions that make components predictable to learn and safe to compose.

## Decision

Adopt the following API principles across all components:

1. **Composition over configuration.** When a component needs structural flexibility, expose
   subcomponents (`Card.*`, `Tabs.*`, `Table.*`, `Accordion.*`) rather than growing a prop list or
   accepting render-prop soup. Prop APIs stay small and focused.
2. **One controlled/uncontrolled contract.** Any owned value uses `useControllableState`, giving every
   stateful component the same `value` / `defaultValue` / `on*Change` semantics, with the mode locked
   on first render.
3. **Consistent naming.** Boolean props are `is*` (`isLoading`, `isInvalid`, `isDisabled`); change
   callbacks are `on<Thing>Change`; size/variant use the shared `Size` scale and component-specific
   `variant` unions.
4. **Predictable extension points.** Every component accepts `className` (appended last) and forwards
   `ref` to the most relevant DOM node. Variants surface as `data-*` attributes for styling and test
   selection.
5. **Exported types.** Every component exports its props type so consumers can extend and wrap it.
6. **Strict typing.** No `any` without a documented reason; polymorphic `as` is typed so native props
   and refs are preserved.

## Rationale

These rules let a developer who has used one component predict the next one. The controlled/
uncontrolled contract in particular eliminates a whole category of bugs and inconsistent behavior.
`data-*`-driven variants keep the class surface minimal and make state visible in the DOM and tests.

## Consequences

- Some components are split into several exports, which is more files but far more flexible than a
  monolith with many boolean toggles.
- `useControllableState` is load-bearing and is itself well tested.
- Reviewers enforce naming and the `className`/`ref` contract in PRs; deviations need justification.
