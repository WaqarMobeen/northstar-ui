import { type RefObject, useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0
  );
}

export interface UseFocusTrapOptions {
  enabled?: boolean;
  /** Element to focus on activation. Defaults to the first focusable child. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Restore focus to the previously focused element on deactivation. */
  restoreFocus?: boolean;
}

/**
 * Constrain Tab/Shift+Tab focus to within `containerRef` while enabled. On
 * activation it moves focus inside the trap; on teardown it returns focus to the
 * element that was focused before the trap engaged. Used by Dialog and Drawer.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  { enabled = true, initialFocusRef, restoreFocus = true }: UseFocusTrapOptions = {}
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? getFocusable(container)[0] ?? container;
      target.focus();
    };
    focusInitial();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (restoreFocus && previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, enabled, initialFocusRef, restoreFocus]);
}
