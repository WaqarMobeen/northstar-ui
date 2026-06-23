import { type ReactNode, useId, useRef } from 'react';
import styles from './Drawer.module.css';
import { Portal } from '../Portal/Portal';
import { IconButton } from '../IconButton/IconButton';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useThemeOptional } from '../../theme/themeContext';
import { cn } from '../../utils/cn';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: 'left' | 'right';
  /** Panel width. Accepts any CSS length. */
  width?: string;
  closeOnOverlayClick?: boolean;
  className?: string;
}

/**
 * Edge-anchored panel for secondary flows (filters, details, settings). Shares
 * the Dialog accessibility model — modal, focus-trapped, scroll-locked, and
 * Escape/backdrop dismissible — but slides in from the side.
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = 'right',
  width = '22rem',
  closeOnOverlayClick = true,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const theme = useThemeOptional();

  useEscapeKey(() => onOpenChange(false), open);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, { enabled: open, restoreFocus: true });

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
            data-side={side}
            style={{ width }}
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
              <IconButton
                aria-label="Close drawer"
                size="sm"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                icon={
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                }
              />
            </header>
            {children && <div className={styles.content}>{children}</div>}
            {footer && <footer className={styles.footer}>{footer}</footer>}
          </div>
        </div>
      </div>
    </Portal>
  );
}
