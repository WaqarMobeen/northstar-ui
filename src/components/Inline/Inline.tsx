import { type CSSProperties, type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './Inline.module.css';
import { cn } from '../../utils/cn';
import type { Space } from '../../tokens/tokens';

type Align = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between';

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  gap?: Space;
  align?: Align;
  justify?: Justify;
  /** Allow items to wrap onto multiple lines (default: true). */
  wrap?: boolean;
}

/** Horizontal flex layout with token spacing; wraps by default. */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    { as: Component = 'div', gap = 3, align = 'center', justify, wrap = true, className, style, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(styles.inline, className)}
        data-align={align}
        data-justify={justify}
        data-wrap={wrap ? 'true' : 'false'}
        style={{ '--ns-inline-gap': `var(--ns-space-${gap})`, ...style } as CSSProperties}
        {...rest}
      />
    );
  }
);

Inline.displayName = 'Inline';
