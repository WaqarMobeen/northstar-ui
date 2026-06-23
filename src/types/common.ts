import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

/** Shared control size scale used by inputs, buttons, and selects. */
export type Size = 'sm' | 'md' | 'lg';

/** Semantic status used by feedback components. */
export type Status = 'info' | 'success' | 'warning' | 'danger';

/**
 * Helpers for `as`-polymorphic components. These keep the `as` prop type-safe
 * while preserving the underlying element's native props and ref.
 */
export type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicProps<C extends ElementType, Props = object> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicPropsWithRef<C extends ElementType, Props = object> = PolymorphicProps<
  C,
  Props
> & { ref?: ComponentPropsWithRef<C>['ref'] };
