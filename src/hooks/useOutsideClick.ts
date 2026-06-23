import { type RefObject, useEffect, useRef } from 'react';

/**
 * Invoke `handler` when a pointer interaction starts outside every referenced
 * element. Listens on `pointerdown` (capture) so it fires before click handlers
 * and works for both mouse and touch. Pass `enabled: false` to detach.
 */
export function useOutsideClick(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: PointerEvent) => void,
  enabled = true
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const list = Array.isArray(refs) ? refs : [refs];

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const isInside = list.some((ref) => ref.current?.contains(target));
      if (!isInside) handlerRef.current(event);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [refs, enabled]);
}
