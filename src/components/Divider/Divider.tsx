import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Divider.module.css';
import { cn } from '../../utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Optional centered label, e.g. a section break. Horizontal only. */
  label?: string;
}

/**
 * A separator. Renders a semantic `<hr>`-equivalent with `role="separator"` and
 * the correct `aria-orientation`; decorative when used purely visually.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, ...rest }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(styles.labeled, className)}
          {...rest}
        >
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
          <span className={styles.line} aria-hidden="true" />
        </div>
      );
    }
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(styles.divider, className)}
        data-orientation={orientation}
        {...rest}
      />
    );
  }
);

Divider.displayName = 'Divider';
