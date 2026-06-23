import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './themeContext';

function ThemeReadout() {
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  return (
    <div>
      <span data-testid="readout">
        {theme}/{accent}
      </span>
      <button type="button" onClick={toggleTheme}>
        Toggle
      </button>
      <button type="button" onClick={() => setAccent('violet')}>
        Violet
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('applies theme and accent as data attributes', () => {
    const { container } = render(
      <ThemeProvider theme="dark" accent="emerald">
        <span>content</span>
      </ThemeProvider>
    );
    const root = container.querySelector('[data-ns-root]');
    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(root).toHaveAttribute('data-accent', 'emerald');
  });

  it('toggles and updates the theme when uncontrolled', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" defaultAccent="blue">
        <ThemeReadout />
      </ThemeProvider>
    );
    expect(screen.getByTestId('readout')).toHaveTextContent('light/blue');
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByTestId('readout')).toHaveTextContent('dark/blue');
    await user.click(screen.getByRole('button', { name: 'Violet' }));
    expect(screen.getByTestId('readout')).toHaveTextContent('dark/violet');
  });

  it('throws when useTheme is called without a provider', () => {
    function Orphan() {
      useTheme();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow(/ThemeProvider/);
    spy.mockRestore();
  });
});
