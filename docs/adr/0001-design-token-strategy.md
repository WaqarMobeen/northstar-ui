# ADR 0001: Design token strategy

- Status: Accepted
- Date: 2026-06-01

## Context

The system needs a single source of truth for visual values (color, spacing, type, radius, elevation,
motion, z-index) that supports multiple themes (light/dark) and accent palettes, is cheap at runtime,
is easy for application teams to override, and is inspectable. Options considered: a JS theme object
consumed via context/CSS-in-JS; a utility-class framework (e.g. Tailwind); and CSS custom properties.

## Decision

Use **CSS custom properties as the runtime source of truth** for tokens, defined in `tokens.css`
(structural + light) and `themes.css` (dark + accents). Themes are selected with `data-theme` and
`data-accent` attributes set by `ThemeProvider`. Structural tokens (spacing, radius, type, motion,
z-index) are also exported as typed JS from `src/tokens/tokens.ts` for non-CSS consumers.

## Rationale

- **Zero runtime cost.** Theme switching is an attribute change; the browser recomputes the cascade.
  No re-render of styled components, no serialization.
- **Trivial theming and overriding.** A consumer redefines a `--ns-*` property in their own CSS to
  retheme globally or per subtree, without forking components.
- **Inspectable and debuggable.** Tokens are visible in devtools; component variants are expressed as
  `data-*` attributes styled with attribute selectors.
- **Framework-agnostic.** The tokens work the same whether a component is authored in CSS Modules,
  plain CSS, or consumed outside React.

Only color tokens are theme-dependent; structural tokens stay constant, which keeps the override
surface small and predictable.

## Consequences

- Color values live in CSS, not TypeScript, so they aren't type-checked. We accept this trade for the
  runtime and theming benefits; the typed `tokens` object covers the structural values that benefit
  most from autocomplete.
- Consumers must load `northstar-ui/styles.css` once. This is documented and enforced by
  `sideEffects`.
- Adding an accent means adding a CSS block plus extending the `Accent` union — no component changes.
