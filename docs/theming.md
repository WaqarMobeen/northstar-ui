# Theming

Northstar UI themes through CSS custom properties. There is no theme object to import or runtime style
recalculation — switching themes is changing two attributes, and the cascade does the rest.

## How it works

`ThemeProvider` renders a wrapper (or `document.documentElement`, with `applyToDocument`) carrying
`data-theme` and `data-accent`:

```html
<div data-ns-root data-theme="dark" data-accent="violet"> … </div>
```

`src/styles/tokens.css` defines structural tokens and the light-theme color tokens on `:root`.
`src/styles/themes.css` overrides color tokens under `[data-theme='dark']` and swaps the accent group
under each `[data-accent='…']`. Components only ever read `var(--ns-*)`, so re-skinning is global and
instant.

## Token groups

| Prefix | Purpose | Theme-dependent? |
| --- | --- | --- |
| `--ns-space-*` | Spacing scale (4px base) | No |
| `--ns-radius-*` | Corner radii | No |
| `--ns-font-*`, `--ns-line-height-*` | Type family, size, weight, line height | No |
| `--ns-shadow-*` | Elevation | No |
| `--ns-z-*` | Stacking order | No |
| `--ns-duration-*`, `--ns-ease-*` | Motion | No |
| `--ns-control-height-*` | Shared control heights | No |
| `--ns-color-bg-*` | Surfaces and canvas | Yes |
| `--ns-color-fg-*` | Text and icon foregrounds | Yes |
| `--ns-color-border-*` | Borders | Yes |
| `--ns-color-{success,warning,danger,info}-*` | Status colors (`solid`/`soft`/`fg`/`border`) | Yes |
| `--ns-color-accent-*` | Accent (`solid`/`soft`/`fg`/`border`/`ring`) | Yes (theme + accent) |

Structural tokens are also available as typed values from `northstar-ui` (`import { tokens, space,
cssVar } from 'northstar-ui'`) for charts, canvas, or computed styles.

## Usage

```tsx
// Controlled — you own the values
<ThemeProvider theme="dark" accent="emerald">{children}</ThemeProvider>

// Uncontrolled — provider owns them; drive via context
<ThemeProvider defaultTheme="light" defaultAccent="blue">{children}</ThemeProvider>

function Toggle() {
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  // …
}
```

Apply tokens at the document root (so portaled overlays inherit even without re-tagging) with
`applyToDocument`:

```tsx
<ThemeProvider applyToDocument theme="dark">{app}</ThemeProvider>
```

(Overlay components also re-apply the attributes on their portal, so theming is correct either way.)

## Overriding tokens

Redefine any custom property in your own stylesheet, loaded after `northstar-ui/styles.css`:

```css
/* Tighten radii and brand the accent globally */
:root {
  --ns-radius-md: 0.375rem;
}
[data-accent='blue'] {
  --ns-color-accent-solid: #2f5bd6;
  --ns-color-accent-solid-hover: #284fbe;
  --ns-color-accent-fg: #284fbe;
}
```

Scope overrides to a subtree by setting the variables on a wrapping element instead of `:root`.

## Adding an accent

Add a block in `src/styles/themes.css` for `[data-accent='your-accent']` defining the
`--ns-color-accent-*` group (and a dark-mode adjustment block), then extend the `Accent` union in
`src/theme/ThemeProvider.tsx`. No component changes are required.
