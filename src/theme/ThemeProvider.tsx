import { type ReactNode, useEffect, useMemo } from 'react';
import { useControllableState } from '../hooks/useControllableState';
import {
  type Accent,
  ThemeContext,
  type ThemeContextValue,
  type ThemeMode,
} from './themeContext';

export interface ThemeProviderProps {
  children: ReactNode;
  /** Controlled color mode. Omit to let the provider own it via `defaultTheme`. */
  theme?: ThemeMode;
  defaultTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
  /** Controlled accent palette. Omit to use `defaultAccent`. */
  accent?: Accent;
  defaultAccent?: Accent;
  onAccentChange?: (accent: Accent) => void;
  /**
   * Render without a wrapper element and apply the theme attributes to
   * `document.documentElement` instead. Use this once at the app root when you
   * want tokens available globally (e.g. for portaled overlays).
   */
  applyToDocument?: boolean;
}

/**
 * Applies theme + accent as `data-theme` / `data-accent` attributes that the
 * token CSS keys off. Works controlled (pass `theme`/`accent`) or uncontrolled
 * (pass `defaultTheme`/`defaultAccent` and use the context setters). All overlay
 * components portal into a node that carries these attributes, so themes apply
 * consistently regardless of where content renders in the DOM.
 */
export function ThemeProvider({
  children,
  theme,
  defaultTheme = 'light',
  onThemeChange,
  accent,
  defaultAccent = 'blue',
  onAccentChange,
  applyToDocument = false,
}: ThemeProviderProps) {
  const [currentTheme, setTheme] = useControllableState<ThemeMode>({
    value: theme,
    defaultValue: defaultTheme,
    onChange: onThemeChange,
  });
  const [currentAccent, setAccent] = useControllableState<Accent>({
    value: accent,
    defaultValue: defaultAccent,
    onChange: onAccentChange,
  });

  useEffect(() => {
    if (!applyToDocument || typeof document === 'undefined') return;
    const root = document.documentElement;
    const prevTheme = root.getAttribute('data-theme');
    const prevAccent = root.getAttribute('data-accent');
    root.setAttribute('data-theme', currentTheme);
    root.setAttribute('data-accent', currentAccent);
    return () => {
      if (prevTheme) root.setAttribute('data-theme', prevTheme);
      else root.removeAttribute('data-theme');
      if (prevAccent) root.setAttribute('data-accent', prevAccent);
      else root.removeAttribute('data-accent');
    };
  }, [applyToDocument, currentTheme, currentAccent]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: currentTheme,
      accent: currentAccent,
      setTheme,
      setAccent,
      toggleTheme: () => setTheme(currentTheme === 'light' ? 'dark' : 'light'),
    }),
    [currentTheme, currentAccent, setTheme, setAccent]
  );

  return (
    <ThemeContext.Provider value={value}>
      {applyToDocument ? (
        children
      ) : (
        <div data-ns-root="" data-theme={currentTheme} data-accent={currentAccent}>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
}
