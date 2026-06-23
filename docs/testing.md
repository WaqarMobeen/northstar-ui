# Testing

Northstar UI is tested at two levels: behavioral unit/interaction tests (Vitest + React Testing
Library) and visual regression (Chromatic against Storybook).

## Philosophy

Test behavior and accessibility, not implementation. A test should resemble how a user — keyboard,
pointer, or screen reader — interacts with the component. We query by role and accessible name, assert
on ARIA state and focus, and avoid asserting on class names or internal structure that can change
without affecting users.

A "renders without crashing" test is not sufficient on its own. Each interactive component is tested
for the behavior that matters: state changes, callbacks, keyboard paths, disabled/loading handling,
and the controlled/uncontrolled contract.

## Tooling

- **Vitest** with the `jsdom` environment and globals enabled.
- **@testing-library/react** for rendering and role-based queries; **user-event** for realistic
  interaction.
- **@testing-library/jest-dom** matchers (`toBeChecked`, `toHaveAccessibleName`,
  `toHaveAccessibleDescription`, `toHaveFocus`, …).
- Setup in `src/test/setup.ts` (jest-dom registration, cleanup, a `matchMedia` stub). A
  `renderWithTheme` helper in `src/test/render.tsx` wraps components in `ThemeProvider` to mirror real
  usage.

## What we cover

The suite includes meaningful tests for Button, Input (incl. FormField wiring), Checkbox, RadioGroup,
Switch, Combobox, Dialog, Tabs, Tooltip, Toast, Table, ThemeProvider, the `useControllableState`
hook, and the `cn`/`composeRefs` utilities. Representative assertions:

- **Roles & names** — `getByRole('switch', { name: 'Email alerts' })`, `getByRole('dialog')` has
  `aria-modal` and an accessible name/description.
- **Keyboard** — Space toggles a Checkbox; arrow keys move Tab selection; Enter selects a Combobox
  option; Escape closes the Dialog.
- **State** — controlled vs uncontrolled RadioGroup; `useControllableState` ignoring local writes in
  controlled mode while still firing `onChange`.
- **States** — a loading Button is disabled, `aria-busy`, and does not fire `onClick`.
- **Focus** — opening a Dialog moves focus inside it.

## Running

```bash
npm run test            # once
npm run test:watch      # watch mode
npm run test:coverage   # with coverage thresholds (enforced in CI)
```

Coverage thresholds are configured in `vitest.config.ts`. They're set to a level that's meaningful but
achievable, and they exclude stories, type-only files, and barrels.

## Visual regression

Stories double as visual test cases. Chromatic snapshots them on every push/PR and flags pixel
differences across components, themes, and accents. See [release-process.md](release-process.md) and
the README's Chromatic section for setup. New components should land with stories that exercise their
variants and states so Chromatic has something meaningful to diff.
