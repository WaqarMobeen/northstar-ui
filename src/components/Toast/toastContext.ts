import { createContext, type ReactNode, useContext } from 'react';
import type { Status } from '../../types/common';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  status?: Status;
  /** Auto-dismiss delay in ms. Pass `null` to keep it until dismissed. */
  duration?: number | null;
  action?: { label: string; onClick: () => void };
}

export interface ToastRecord extends ToastOptions {
  id: string;
}

export type ToastPlacement =
  | 'top'
  | 'top-end'
  | 'top-start'
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start';

export interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

/** Access the toast API. Must be called under a ToastProvider. */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return context;
}
