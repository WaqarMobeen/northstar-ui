import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './EmptyState.module.css';
import { cn } from '../../utils/cn';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Decorative illustration or icon. */
  icon?: ReactNode;
  /** Primary call-to-action area. */
  action?: ReactNode;
}

/**
 * Placeholder for empty lists, search results, or first-run states. Pairs a
 * concise title with optional supporting copy and an action.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {icon && (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        )}
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
