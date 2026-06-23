/**
 * Design token reference.
 *
 * The runtime source of truth for tokens is CSS custom properties (see
 * `src/styles/tokens.css`). This module mirrors the *structural* tokens — the
 * ones that do not change between themes — as typed JavaScript so they can be
 * consumed in non-CSS contexts (charts, canvas, documentation, tests) and so
 * editors can autocomplete token names via `cssVar()`.
 *
 * Color tokens intentionally live only in CSS because they are theme-dependent;
 * read them through the `--ns-color-*` custom properties or the `useTheme` hook.
 */

export const space = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const radius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.5',
  relaxed: '1.65',
} as const;

export const fontFamily = {
  sans: "'Inter var', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
} as const;

export const shadow = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.06)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1)',
  md: '0 4px 12px -2px rgba(15, 23, 42, 0.12), 0 2px 4px -2px rgba(15, 23, 42, 0.08)',
  lg: '0 12px 28px -8px rgba(15, 23, 42, 0.18), 0 4px 8px -4px rgba(15, 23, 42, 0.1)',
} as const;

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  sticky: 100,
  overlay: 1000,
  modal: 1100,
  popover: 1200,
  toast: 1300,
  tooltip: 1400,
} as const;

export const duration = {
  instant: '80ms',
  fast: '140ms',
  normal: '200ms',
  slow: '320ms',
} as const;

export const easing = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

/** Control heights shared by buttons, inputs, and selects to keep rows aligned. */
export const controlSize = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
} as const;

export const tokens = {
  space,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  shadow,
  zIndex,
  duration,
  easing,
  controlSize,
} as const;

export type Space = keyof typeof space;
export type Radius = keyof typeof radius;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type Shadow = keyof typeof shadow;
export type ZIndex = keyof typeof zIndex;
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type ControlSize = keyof typeof controlSize;

/** Build a `var(--ns-*)` reference for a known token, e.g. `cssVar('space-4')`. */
export function cssVar(name: string, fallback?: string): string {
  return fallback ? `var(--ns-${name}, ${fallback})` : `var(--ns-${name})`;
}
