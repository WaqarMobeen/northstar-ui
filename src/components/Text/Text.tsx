import { type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './Text.module.css';
import { cn } from '../../utils/cn';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'success' | 'warning' | 'danger';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  as?: ElementType;
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  align?: 'start' | 'center' | 'end';
  /** Clamp to a single line with an ellipsis. */
  truncate?: boolean;
}

/** Body text primitive. All sizing, color, and weight resolve to tokens. */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    { as: Component = 'span', size = 'md', tone = 'default', weight = 'regular', align, truncate, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(styles.text, truncate && styles.truncate, className)}
        data-size={size}
        data-tone={tone}
        data-weight={weight}
        data-align={align}
        {...rest}
      />
    );
  }
);

Text.displayName = 'Text';
