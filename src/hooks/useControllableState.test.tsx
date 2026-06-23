import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('owns state in uncontrolled mode and reports changes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }));

    expect(result.current[0]).toBe(0);
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(2);
  });

  it('does not own state in controlled mode', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useControllableState({ value, onChange }),
      { initialProps: { value: 10 } }
    );

    expect(result.current[0]).toBe(10);
    act(() => result.current[1](20));
    // value stays controlled by the prop; only onChange fires
    expect(result.current[0]).toBe(10);
    expect(onChange).toHaveBeenCalledWith(20);

    rerender({ value: 20 });
    expect(result.current[0]).toBe(20);
  });
});
