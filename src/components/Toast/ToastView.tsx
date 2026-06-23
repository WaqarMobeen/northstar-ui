import { useEffect, useRef } from 'react';
import styles from './Toast.module.css';
import { IconButton } from '../IconButton/IconButton';
import type { ToastRecord } from './toastContext';

interface ToastViewProps {
  record: ToastRecord;
  defaultDuration: number;
  onDismiss: (id: string) => void;
}

/** A single toast. Pauses its dismiss timer on hover/focus to stay readable. */
export function ToastView({ record, defaultDuration, onDismiss }: ToastViewProps) {
  const { id, title, description, status = 'info', action } = record;
  const duration = record.duration === undefined ? defaultDuration : record.duration;
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (duration === null) return;
    timer.current = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer.current);
  }, [duration, id, onDismiss]);

  const pause = () => clearTimeout(timer.current);
  const resume = () => {
    if (duration === null) return;
    timer.current = setTimeout(() => onDismiss(id), duration);
  };

  // danger/warning are assertive so they interrupt; others are polite.
  const assertive = status === 'danger' || status === 'warning';

  return (
    <div
      className={styles.toast}
      data-status={status}
      role={assertive ? 'alert' : 'status'}
      aria-live={assertive ? 'assertive' : 'polite'}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <span className={styles.accent} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        {action && (
          <button
            type="button"
            className={styles.action}
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
          >
            {action.label}
          </button>
        )}
      </div>
      <IconButton
        aria-label="Dismiss notification"
        size="sm"
        variant="ghost"
        className={styles.close}
        onClick={() => onDismiss(id)}
        icon={
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        }
      />
    </div>
  );
}
