import { type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './VisuallyHidden.module.css';
import { cn } from '../../utils/cn';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `span`. */
  as?: ElementType;
}

/**
 * Hide content visually while keeping it available to assistive technology.
 * Use for labels, status announcements, and skip links — never `display: none`,
 * which removes content from the accessibility tree.
 */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: Component = 'span', className, ...rest }, ref) => {
    return <Component ref={ref} className={cn(styles.visuallyHidden, className)} {...rest} />;
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';
