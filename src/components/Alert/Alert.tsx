import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Alert.module.css';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton/IconButton';
import type { Status } from '../../types/common';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: Status;
  title?: ReactNode;
  /** Custom leading icon. A status-appropriate glyph is used by default. */
  icon?: ReactNode;
  /** Show a close button and call this when dismissed. */
  onDismiss?: () => void;
}

const defaultIcons: Record<Status, ReactNode> = {
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <WarnIcon />,
  danger: <WarnIcon />,
};

/**
 * Contextual message banner. Uses `role="alert"` for danger/warning so changes
 * are announced promptly, and the quieter `role="status"` for info/success.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ status = 'info', title, icon, onDismiss, className, children, ...rest }, ref) => {
    const assertive = status === 'danger' || status === 'warning';
    return (
      <div
        ref={ref}
        className={cn(styles.alert, className)}
        data-status={status}
        role={assertive ? 'alert' : 'status'}
        {...rest}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon ?? defaultIcons[status]}
        </span>
        <div className={styles.content}>
          {title && <p className={styles.title}>{title}</p>}
          {children && <div className={styles.body}>{children}</div>}
        </div>
        {onDismiss && (
          <IconButton
            aria-label="Dismiss"
            size="sm"
            variant="ghost"
            className={styles.close}
            onClick={onDismiss}
            icon={<CloseIcon />}
          />
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.4" r="0.9" fill="currentColor" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 10.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5l8 14H2l8-14z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
