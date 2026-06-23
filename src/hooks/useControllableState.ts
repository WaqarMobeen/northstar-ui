import { useCallback, useRef, useState } from 'react';

export interface UseControllableStateParams<T> {
  /** Controlled value. When provided, the hook never owns the state. */
  value?: T;
  /** Initial value for the uncontrolled case. */
  defaultValue?: T;
  /** Called whenever a new value is committed, in both modes. */
  onChange?: (value: T) => void;
}

type SetState<T> = (next: T | ((prev: T) => T)) => void;

function isUpdater<T>(value: T | ((prev: T) => T)): value is (prev: T) => T {
  return typeof value === 'function';
}

/**
 * Single source of truth for the controlled/uncontrolled pattern used across the
 * library. If `value` is supplied the component is controlled and the setter only
 * notifies via `onChange`; otherwise the hook owns the state and still fires
 * `onChange`. The controlled/uncontrolled mode is locked on first render to avoid
 * the "switching between controlled and uncontrolled" class of bugs.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T, SetState<T>] {
  const isControlled = value !== undefined;
  const wasControlled = useRef(isControlled);
  const isDev =
    typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';
  if (isDev && wasControlled.current !== isControlled) {
    console.error(
      '[northstar-ui] A component changed between controlled and uncontrolled. ' +
        'Decide on one for the lifetime of the component.'
    );
  }

  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue as T);
  const current = isControlled ? (value as T) : uncontrolled;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setState = useCallback<SetState<T>>(
    (next) => {
      const resolved = isUpdater(next) ? next(current) : next;
      if (!isControlled) {
        setUncontrolled(resolved);
      }
      if (resolved !== current) {
        onChangeRef.current?.(resolved);
      }
    },
    [current, isControlled]
  );

  return [current, setState];
}
