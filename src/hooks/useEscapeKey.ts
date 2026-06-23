import { useEffect, useRef } from 'react';

/**
 * Call `handler` when Escape is pressed. Registered on `keydown` so overlays can
 * decide whether to stop propagation for nesting (innermost closes first).
 */
export function useEscapeKey(handler: (event: KeyboardEvent) => void, enabled = true): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current(event);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
