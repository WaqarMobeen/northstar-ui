import { type MutableRefObject, type Ref, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}

/**
 * Merge multiple refs (callback or object) into a single callback ref. Useful
 * when a component both forwards a ref and needs an internal handle to the node.
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      assignRef(ref, node as T);
    }
  };
}

/** Hook variant that memoizes the composed ref against the provided refs. */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
}
