# ADR 0003: Accessibility baseline

- Status: Accepted
- Date: 2026-06-05

## Context

Accessibility retrofitted after the fact is expensive and usually incomplete. We want it to be a
property of the system rather than a per-screen effort by application teams, and we need a clear,
enforceable baseline so "accessible" isn't a matter of opinion in code review.

## Decision

Accessibility is part of the definition of done for every component. The baseline:

- **Native elements first.** Use the platform element with the right semantics; add ARIA only to fill
  genuine gaps. No `div`-as-button patterns.
- **WAI-ARIA APG for composite widgets.** Tabs, DropdownMenu (menu button), Combobox, Accordion, and
  Dialog follow the Authoring Practices for roles, states, and keyboard interaction.
- **Keyboard parity.** Every pointer interaction has a keyboard equivalent, including roving focus
  where applicable.
- **Focus management for modals.** Dialog/Drawer trap focus, restore it on close, and lock body
  scroll (reference-counted for stacking).
- **Visible focus.** A consistent `:focus-visible` ring driven by `--ns-color-focus-ring`.
- **Forms.** `FormField` auto-wires `id`, `aria-describedby`, `aria-invalid`, and required/disabled
  state; errors use `role="alert"`. `IconButton` requires `aria-label` at the type level.
- **Preferences and contrast.** `prefers-reduced-motion` is honored globally; color tokens meet WCAG
  2.1 AA in both themes and all accents.

Enforcement: behavioral tests assert roles, names, keyboard paths, and focus; the Storybook a11y addon
runs axe (including color-contrast) on stories.

## Rationale

Putting the baseline in the components means application teams inherit correct behavior for free, and
the system stays accessible as it grows. Encoding requirements as tests and automated checks keeps the
bar objective rather than reliant on individual reviewer knowledge.

## Consequences

- Components do more work internally (focus traps, ARIA wiring, scroll locks), which is the point —
  that complexity lives in one tested place instead of every app.
- Some APIs are intentionally constrained (e.g. required `aria-label` on `IconButton`) to make the
  inaccessible path impossible.
- Automated checks catch regressions but don't replace manual keyboard and screen-reader verification,
  which remains part of the PR expectation.
