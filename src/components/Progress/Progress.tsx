import { type CSSProperties, forwardRef, type HTMLAttributes } from 'react';
import styles from './Progress.module.css';
import { cn } from '../../utils/cn';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Current value. Omit for an indeterminate bar. */
  value?: number;
  max?: number;
  size?: 'sm' | 'md';
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  /** Accessible label for the progress bar. */
  label: string;
}

/** Determinate or indeterminate progress bar with proper ARIA range semantics. */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = 'md', tone = 'accent', label, className, ...rest }, ref) => {
    const isIndeterminate = value === undefined;
    const clamped = isIndeterminate ? 0 : Math.min(Math.max(value, 0), max);
    const pct = isIndeterminate ? 0 : (clamped / max) * 100;

    return (
      <div
        ref={ref}
        className={cn(styles.track, className)}
        data-size={size}
        data-tone={tone}
        data-indeterminate={isIndeterminate || undefined}
        role="progressbar"
        aria-label={label}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : max}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        {...rest}
      >
        <div className={styles.indicator} style={{ '--ns-progress-pct': `${pct}%` } as CSSProperties} />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
