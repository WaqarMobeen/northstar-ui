import { useId as useReactId } from 'react';

/**
 * Stable, SSR-safe id with an optional caller-provided override. Wraps React's
 * `useId` so a component can accept an explicit `id` prop while always having a
 * deterministic fallback for wiring up `aria-*` relationships.
 */
export function useId(providedId?: string): string {
  const generated = useReactId();
  return providedId ?? generated;
}
