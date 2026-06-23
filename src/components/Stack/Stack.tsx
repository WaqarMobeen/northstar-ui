import { type CSSProperties, type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './Stack.module.css';
import { cn } from '../../utils/cn';
import type { Space } from '../../tokens/tokens';

type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  /** Gap between children, in spacing-scale steps. */
  gap?: Space;
  align?: Align;
  justify?: Justify;
}

/** Vertical flex layout with token-based spacing between children. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ as: Component = 'div', gap = 4, align, justify, className, style, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(styles.stack, className)}
        data-align={align}
        data-justify={justify}
        style={{ '--ns-stack-gap': `var(--ns-space-${gap})`, ...style } as CSSProperties}
        {...rest}
      />
    );
  }
);

Stack.displayName = 'Stack';
