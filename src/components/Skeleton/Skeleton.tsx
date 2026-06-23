import { type CSSProperties, forwardRef, type HTMLAttributes } from 'react';
import styles from './Skeleton.module.css';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  /** Number of stacked lines (text variant only). */
  lines?: number;
}

function toCss(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Loading placeholder. Marked `aria-hidden` and exposed as `role="presentation"`
 * so screen readers skip it — announce the loading state on the surrounding
 * region instead (e.g. `aria-busy`).
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = 'text', width, height, lines = 1, className, style, ...rest }, ref) => {
    if (variant === 'text' && lines > 1) {
      return (
        <span ref={ref} className={styles.group} role="presentation" aria-hidden="true" {...rest}>
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              className={cn(styles.skeleton, className)}
              data-variant="text"
              style={{ width: i === lines - 1 ? '70%' : '100%' }}
            />
          ))}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(styles.skeleton, className)}
        data-variant={variant}
        role="presentation"
        aria-hidden="true"
        style={{ width: toCss(width), height: toCss(height), ...style } as CSSProperties}
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
