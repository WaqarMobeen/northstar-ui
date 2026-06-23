import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';
import { useThemeOptional } from '../../theme/themeContext';
import { ToastView } from './ToastView';
import {
  ToastContext,
  type ToastContextValue,
  type ToastOptions,
  type ToastPlacement,
  type ToastRecord,
} from './toastContext';
import type { Status } from '../../types/common';
import styles from './Toast.module.css';

export interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  /** Default auto-dismiss delay applied when a toast omits `duration`. */
  defaultDuration?: number;
  /** Cap on simultaneously visible toasts; older ones are dropped. */
  max?: number;
}

/**
 * Hosts the toast queue and renders a single live region. Wrap the app once;
 * trigger toasts from anywhere with `useToast()`. The region is `aria-live` so
 * messages are announced without moving focus.
 */
export function ToastProvider({
  children,
  placement = 'bottom-end',
  defaultDuration = 5000,
  max = 4,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const counter = useRef(0);
  const theme = useThemeOptional();

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const toast = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((prev) => {
        const next = [...prev, { id, status: 'info' as Status, ...options }];
        return next.slice(-max);
      });
      return id;
    },
    [max]
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <div
          data-ns-root=""
          data-theme={theme?.theme}
          data-accent={theme?.accent}
          className={styles.region}
          data-placement={placement}
          role="region"
          aria-label="Notifications"
        >
          {toasts.map((record) => (
            <ToastView
              key={record.id}
              record={record}
              defaultDuration={defaultDuration}
              onDismiss={dismiss}
            />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}
