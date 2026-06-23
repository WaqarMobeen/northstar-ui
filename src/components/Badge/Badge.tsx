import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Badge.module.css';
import { cn } from '../../utils/cn';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'soft' | 'solid' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  /** Small leading marker, useful for status badges. */
  dot?: boolean;
  leftIcon?: ReactNode;
}

/** Compact status or category label, e.g. billing state or counts. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', variant = 'soft', size = 'md', dot = false, leftIcon, className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(styles.badge, className)}
        data-tone={tone}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {dot && <span className={styles.dot} aria-hidden="true" />}
        {leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
