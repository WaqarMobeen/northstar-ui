type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Minimal class-name joiner. Accepts strings, falsy values (skipped), and nested
 * arrays. Deliberately dependency-free and order-preserving — we don't merge or
 * dedupe Tailwind-style, because components own their CSS Module class names and
 * only append a consumer `className` last.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}
