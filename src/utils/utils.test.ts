import { describe, expect, it } from 'vitest';
import { cn } from './cn';
import { composeRefs } from './composeRefs';

describe('cn', () => {
  it('joins truthy values and skips falsy ones', () => {
    expect(cn('a', false, 'b', null, undefined, 'c')).toBe('a b c');
  });

  it('flattens nested arrays', () => {
    expect(cn('a', ['b', ['c', false], 'd'])).toBe('a b c d');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});

describe('composeRefs', () => {
  it('assigns the node to callback and object refs', () => {
    let fromCallback: HTMLDivElement | null = null;
    const objectRef = { current: null as HTMLDivElement | null };
    const node = document.createElement('div');

    const ref = composeRefs<HTMLDivElement>((el) => (fromCallback = el), objectRef);
    ref(node);

    expect(fromCallback).toBe(node);
    expect(objectRef.current).toBe(node);
  });

  it('ignores nullish refs', () => {
    const node = document.createElement('div');
    expect(() => composeRefs<HTMLDivElement>(undefined, null as never)(node)).not.toThrow();
  });
});
