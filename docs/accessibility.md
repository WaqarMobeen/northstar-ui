# Accessibility

Accessibility is part of the definition of done for every component, not a later pass. This document
describes the standards we hold to and the specific behaviors each category guarantees.

## Principles

- **Semantic HTML first.** Use the element that already has the behavior — `<button>`, `<input>`,
  `<table>`, `<nav>`, `<fieldset>`. ARIA is a supplement for gaps the platform leaves, not a
  replacement for native semantics.
- **Names, roles, states.** Every interactive element exposes an accessible name, the correct role,
  and live state (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-invalid`, `aria-busy`).
- **Keyboard parity.** Anything operable by pointer is operable by keyboard, following the WAI-ARIA
  Authoring Practices for composite widgets.
- **Visible focus.** A consistent, accent-colored focus ring appears on keyboard focus
  (`:focus-visible`) and is never removed without a replacement.
- **Respect user preferences.** `prefers-reduced-motion` disables non-essential animation globally.

## Forms

`FormField` wires a label, control, hint, and error together and propagates `id`,
`aria-describedby`, `aria-invalid`, and required/disabled state to the nested control automatically.
Error messages render with `role="alert"` so they're announced. `VisuallyHidden` and `hideLabel`
support icon-only or visually-compact controls without dropping the accessible name. `IconButton`
makes `aria-label` a required prop at the type level, so an icon-only control can't ship unnamed.

## Overlays

Dialog and Drawer are modal: `role="dialog"` + `aria-modal`, focus moved inside on open and restored
to the trigger on close, a focus trap on Tab/Shift+Tab, body scroll locked (reference-counted for
stacked overlays), and dismissal via Escape or backdrop click. Titles and descriptions are linked
through `aria-labelledby`/`aria-describedby`. Tooltip and Popover are non-modal; Tooltip links its
text to the trigger via `aria-describedby` and closes on Escape and blur.

## Composite widgets

- **Tabs** — `tablist`/`tab`/`tabpanel` with roving `tabindex`, arrow-key navigation (orientation
  aware), and automatic or manual activation.
- **DropdownMenu** — menu-button pattern: `aria-haspopup="menu"`, `aria-expanded`, roving focus over
  `menuitem`s, arrow/Home/End/Escape handling.
- **Combobox** — `role="combobox"` with `aria-expanded`, `aria-controls`, and `aria-activedescendant`
  tracking the highlighted `option` in the `listbox`; full keyboard selection.
- **Accordion** — header buttons with `aria-expanded`/`aria-controls`; panels are labeled regions.
- **RadioGroup** — `role="radiogroup"` over native radios, so single-selection and arrow roving come
  from the platform.

## Color and contrast

All color comes from semantic tokens tuned so text and interactive states meet WCAG 2.1 AA contrast
in both light and dark themes. Accent palettes adjust their soft fills and foregrounds per theme so
contrast holds across blue, violet, and emerald. The Storybook a11y addon runs axe-core (including
the color-contrast rule) against stories.

## Loading and status

`Spinner` exposes `role="status"` with a visually hidden label; `Skeleton` is `aria-hidden`/
`role="presentation"` so screen readers skip it — announce loading on the surrounding region with
`aria-busy` instead. `Progress` uses `role="progressbar"` with proper `aria-valuemin/max/now`, and
omits them when indeterminate. Toasts use `role="status"` (polite) or `role="alert"` (assertive for
warning/danger) and never steal focus.

## Testing accessibility

Behavioral tests assert roles, accessible names/descriptions, keyboard interaction, and focus
movement (see [testing.md](testing.md)). Visual and automated a11y checks run in Storybook. When
adding a component, verify it with keyboard only and with a screen reader before opening a PR.
