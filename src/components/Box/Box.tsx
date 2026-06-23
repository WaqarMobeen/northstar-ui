import { type ElementType, forwardRef, type ReactElement, type Ref } from 'react';
import { cn } from '../../utils/cn';
import type { PolymorphicPropsWithRef } from '../../types/common';

export interface BoxOwnProps {
  className?: string;
}

export type BoxProps<C extends ElementType = 'div'> = PolymorphicPropsWithRef<C, BoxOwnProps>;

/**
 * The lowest-level primitive: a polymorphic element that renders `as` whatever
 * tag (or component) you pass and forwards everything else. Other layout
 * primitives build on top of it. Kept intentionally thin — styling lives in the
 * components that compose Box, not in Box itself.
 */
function BoxImpl<C extends ElementType = 'div'>(
  { as, className, ...rest }: BoxProps<C>,
  ref: Ref<Element>
) {
  const Component = (as ?? 'div') as ElementType;
  return <Component ref={ref} className={cn(className)} {...rest} />;
}

export const Box = forwardRef(BoxImpl) as <C extends ElementType = 'div'>(
  props: BoxProps<C>
) => ReactElement | null;
