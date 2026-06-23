import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Spinner.module.css';
import { cn } from '../../utils/cn';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. */
  label?: string;
  /** Hide from assistive tech when an ancestor already conveys the busy state. */
  decorative?: boolean;
}

/** Indeterminate loading indicator. Respects reduced-motion via CSS. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading', decorative = false, className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(styles.spinner, className)}
        data-size={size}
        role={decorative ? undefined : 'status'}
        aria-hidden={decorative ? true : undefined}
        {...rest}
      >
        <span className={styles.ring} aria-hidden="true" />
        {!decorative && <VisuallyHidden>{label}</VisuallyHidden>}
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
