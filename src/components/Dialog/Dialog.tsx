import { type ReactNode, type RefObject, useId, useRef } from 'react';
import styles from './Dialog.module.css';
import { Portal } from '../Portal/Portal';
import { IconButton } from '../IconButton/IconButton';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useThemeOptional } from '../../theme/themeContext';
import { cn } from '../../utils/cn';

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  /** Optional supporting copy wired to `aria-describedby`. */
  description?: ReactNode;
  children?: ReactNode;
  /** Sticky footer area, typically action buttons. */
  footer?: ReactNode;
  size?: DialogSize;
  /** Element to focus when the dialog opens. Defaults to the first focusable. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Close when the backdrop is clicked. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** Hide the default close button in the header. */
  hideCloseButton?: boolean;
  className?: string;
}

/**
 * Modal dialog. Renders in a portal, traps focus, locks body scroll, restores
 * focus on close, and closes on Escape or backdrop click. `aria-modal`,
 * `aria-labelledby`, and `aria-describedby` are wired from `title`/`description`.
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  initialFocusRef,
  closeOnOverlayClick = true,
  hideCloseButton = false,
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const theme = useThemeOptional();

  useEscapeKey(() => onOpenChange(false), open);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, { enabled: open, initialFocusRef, restoreFocus: true });

  if (!open) return null;

  return (
    <Portal>
      <div data-ns-root="" data-theme={theme?.theme} data-accent={theme?.accent}>
        {/* Backdrop dismissal is an enhancement; keyboard users close via Escape or the close button. */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.overlay}
          onMouseDown={(e) => {
            if (closeOnOverlayClick && e.target === e.currentTarget) onOpenChange(false);
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            className={cn(styles.panel, className)}
            data-size={size}
          >
            <header className={styles.header}>
              <div className={styles.heading}>
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
                {description && (
                  <p id={descId} className={styles.description}>
                    {description}
                  </p>
                )}
              </div>
              {!hideCloseButton && (
                <IconButton
                  aria-label="Close dialog"
                  size="sm"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  icon={
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  }
                />
              )}
            </header>
            {children && <div className={styles.content}>{children}</div>}
            {footer && <footer className={styles.footer}>{footer}</footer>}
          </div>
        </div>
      </div>
    </Portal>
  );
}
