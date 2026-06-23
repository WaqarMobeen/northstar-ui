# Changelog

All notable changes to this package are documented here. This file is maintained by
[Changesets](https://github.com/changesets/changesets); do not edit released entries by hand.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0

Initial release.

### Added

- Design token system as CSS custom properties (color, spacing, radius, typography, shadow, z-index,
  motion, control sizing) with typed structural tokens.
- `ThemeProvider` with light/dark themes and blue/violet/emerald accents, controlled and
  uncontrolled.
- Foundations: Box, VisuallyHidden, Portal.
- Typography: Text, Heading, Code, Kbd.
- Layout: Stack, Inline, Grid, Container, Divider.
- Feedback: Alert, Badge, Toast, Progress, Spinner, Skeleton.
- Inputs: Button, IconButton, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox,
  FormField, Fieldset.
- Overlays: Dialog, Drawer, Popover, Tooltip, DropdownMenu.
- Navigation: Tabs, Breadcrumbs, Pagination.
- Data display: Avatar, Card, Table, EmptyState.
- Disclosure: Accordion.
- Hooks: `useControllableState`, `useId`, `useOutsideClick`, `useEscapeKey`, `useLockBodyScroll`,
  `useFocusTrap`, `useReducedMotion`; utilities `cn` and `composeRefs`.
