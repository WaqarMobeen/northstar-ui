# Northstar UI

A modern, accessible, themeable React + TypeScript design system for SaaS dashboards, internal
tools, and complex web applications.

Northstar UI is the shared component layer for product teams that want consistent, accessible
interfaces without rebuilding spacing, color, focus behavior, and keyboard interactions on every
screen. It ships tokens, theming, ~40 components, and the hooks and primitives they're built on.

## Why this exists

Most teams accumulate three or four slightly different button components, a handful of modal
implementations with subtly broken focus handling, and color values copy-pasted until no two screens
match. Northstar UI is the opinionated baseline that prevents that drift:

- One controlled/uncontrolled contract across every stateful component.
- Accessibility built in — correct roles, names, states, keyboard support, and focus management.
- A single token system so theming is a matter of two attributes, not a refactor.
- Components small enough to read in one sitting and compose rather than configure.

## Tech stack

React 18 · TypeScript (strict) · Vite (library build) · Vitest + React Testing Library · Storybook 8
· ESLint 9 (flat config) + Prettier · Changesets · GitHub Actions · Chromatic. Styling is plain CSS
Modules over CSS custom-property design tokens — no runtime styling library.

## Installation

```bash
npm install northstar-ui
```

Import the stylesheet once at your app root and wrap the tree in a `ThemeProvider`:

```tsx
import { ThemeProvider } from 'northstar-ui';
import 'northstar-ui/styles.css';

export function App() {
  return (
    <ThemeProvider theme="light" accent="blue">
      <Routes />
    </ThemeProvider>
  );
}
```

## Local development

```bash
npm install
npm run storybook      # component workshop at http://localhost:6006
npm run test:watch     # unit + interaction tests in watch mode
```

> Note: the project depends on the public npm registry. In network-restricted environments
> `npm install` will fail until the registry is reachable.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `storybook` | Start Storybook. |
| `npm run build` | Build the library (ESM + CJS + types + `northstar-ui.css`). |
| `npm run build-storybook` | Build the static Storybook for Chromatic/hosting. |
| `npm run test` | Run the test suite once. |
| `npm run test:watch` | Run tests in watch mode. |
| `npm run test:coverage` | Run tests with coverage thresholds. |
| `npm run typecheck` | `tsc --noEmit` across the project. |
| `npm run lint` | ESLint. |
| `npm run format` / `format:check` | Prettier write / check. |
| `npm run chromatic` | Publish a Chromatic build (needs a token). |
| `npm run changeset` | Record a changeset for a release. |
| `npm run release` | Build and publish (used by CI). |

## Components

- **Foundations:** Box, VisuallyHidden, Portal
- **Typography:** Text, Heading, Code, Kbd
- **Layout:** Stack, Inline, Grid, Container, Divider
- **Feedback:** Alert, Badge, Toast, Progress, Spinner, Skeleton
- **Inputs:** Button, IconButton, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox, FormField, Fieldset
- **Overlays:** Dialog, Drawer, Popover, Tooltip, DropdownMenu
- **Navigation:** Tabs, Breadcrumbs, Pagination
- **Data display:** Avatar, Card, Table, EmptyState
- **Disclosure:** Accordion
- **Hooks & utils:** `useControllableState`, `useId`, `useOutsideClick`, `useEscapeKey`, `useLockBodyScroll`, `useFocusTrap`, `useReducedMotion`, `composeRefs`, `cn`

## Theming

Themes are driven by `data-theme` (`light` | `dark`) and `data-accent` (`blue` | `violet` |
`emerald`), which `ThemeProvider` applies. The token CSS resolves the rest.

```tsx
// Controlled
<ThemeProvider theme="dark" accent="violet">…</ThemeProvider>

// Uncontrolled + toggle from anywhere
const { theme, toggleTheme, setAccent } = useTheme();
```

Override or extend a token by redefining the custom property in your own CSS:

```css
:root {
  --ns-radius-md: 0.375rem; /* tighter corners across all components */
}
```

See [docs/theming.md](docs/theming.md) for the full token catalog and override patterns.

## Example usage

```tsx
import { Button, Card, CardBody, FormField, Input, Stack } from 'northstar-ui';

function SignInCard() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardBody>
        <Stack gap={4}>
          <FormField label="Email">
            <Input type="email" placeholder="you@company.com" />
          </FormField>
          <FormField label="Password">
            <Input type="password" />
          </FormField>
          <Button fullWidth>Sign in</Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
```

A full, realistic composition (app shell, navigation, metric cards, searchable table, filters drawer,
invite dialog with validation, toasts, dark-mode toggle) lives in
[`src/examples/Dashboard.tsx`](src/examples/Dashboard.tsx) and renders under **Examples → Dashboard**
in Storybook.

## Testing strategy

Tests use Vitest and React Testing Library and assert behavior and accessibility — roles, names,
keyboard interactions, controlled/uncontrolled state, focus — rather than DOM internals. Coverage
thresholds are enforced in CI. See [docs/testing.md](docs/testing.md).

## Accessibility

Accessibility is a requirement, not a checklist item: semantic HTML first, ARIA only where the
platform falls short, visible focus rings, full keyboard support, focus trapping and scroll locking
for modals, reduced-motion handling, and screen-reader-only utilities. The Storybook a11y addon runs
axe against stories. See [docs/accessibility.md](docs/accessibility.md).

## Storybook

`npm run storybook` opens the workshop. Every major component has stories covering variants, sizes,
states, composition, and theming. The toolbar switches theme and accent so you can review light/dark
and all accents without code changes.

## Chromatic

Visual regression runs through Chromatic against the built Storybook.

1. Create a project at [chromatic.com](https://www.chromatic.com) and copy its project token.
2. Add it as a `CHROMATIC_PROJECT_TOKEN` repository secret (and/or set `projectId` in
   `chromatic.config.json`).
3. Locally: `CHROMATIC_PROJECT_TOKEN=… npm run chromatic`.

The Chromatic workflow is a no-op when the secret is absent, so forks and local clones never fail for
a missing token.

## Release process

Releases are managed with Changesets. Add a changeset with every consumer-facing change; on merge to
`main`, CI opens a "Version Packages" PR, and merging that PR publishes to npm (when an `NPM_TOKEN`
secret is configured). See [docs/release-process.md](docs/release-process.md).

## Repository structure

```
.
├── .changeset/            # Changesets config
├── .github/               # CI, Chromatic, release workflows; PR/issue templates
├── .storybook/            # Storybook config (main, preview)
├── docs/                  # Architecture, a11y, testing, theming, release, ADRs
├── src/
│   ├── components/        # One folder per component (impl, css, stories, tests, index)
│   ├── hooks/             # Reusable hooks
│   ├── theme/             # ThemeProvider + useTheme
│   ├── tokens/            # Typed structural tokens + cssVar()
│   ├── styles/            # tokens.css, themes.css, global.css
│   ├── types/             # Shared types (Size, Status, polymorphic helpers)
│   ├── utils/             # cn, composeRefs
│   ├── examples/          # End-to-end dashboard example
│   └── index.ts           # Public entry point
├── vite.config.ts         # Library build (ESM/CJS + dts + single CSS file)
└── vitest.config.ts
```

## Engineering principles

- Strict TypeScript, no `any` without a documented reason, exported prop types for every component.
- Boolean props are named consistently (`isLoading`, `isInvalid`, `isDisabled`).
- Composition over wide prop APIs; small, focused files.
- Tokens for all color and spacing — no hardcoded values inside components.
- Tree-shakeable named exports; React is a peer dependency.
- Comments explain non-obvious decisions, not the obvious.

## License

MIT — see [LICENSE](LICENSE).
