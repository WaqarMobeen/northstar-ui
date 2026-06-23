import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, type ComboboxItem } from './Combobox';

const items: ComboboxItem[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
];

describe('Combobox', () => {
  it('opens the listbox on focus and exposes combobox semantics', async () => {
    const user = userEvent.setup();
    render(<Combobox items={items} aria-label="Country" />);
    const input = screen.getByRole('combobox', { name: 'Country' });
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters options by typed query', async () => {
    const user = userEvent.setup();
    render(<Combobox items={items} aria-label="Country" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'can');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Canada');
  });

  it('selects an option with keyboard navigation', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox items={items} aria-label="Country" onValueChange={onValueChange} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('ca');
    expect(input).toHaveValue('Canada');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Combobox items={items} aria-label="Country" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
