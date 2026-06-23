import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';
export type Accent = 'blue' | 'violet' | 'emerald';

export interface ThemeContextValue {
  theme: ThemeMode;
  accent: Accent;
  setTheme: (theme: ThemeMode) => void;
  setAccent: (accent: Accent) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Read and update the active theme. Throws if used outside a ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return context;
}

/** Like `useTheme` but returns null instead of throwing when no provider exists. */
export function useThemeOptional(): ThemeContextValue | null {
  return useContext(ThemeContext);
}
