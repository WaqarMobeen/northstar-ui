import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './RadioGroup';

function Billing({ onValueChange }: { onValueChange?: (v: string) => void }) {
  return (
    <RadioGroup defaultValue="monthly" onValueChange={onValueChange} aria-label="Billing period">
      <Radio value="monthly">Monthly</Radio>
      <Radio value="annual">Annual</Radio>
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders a radiogroup with radios', () => {
    render(<Billing />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('honors the default value', () => {
    render(<Billing />);
    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked();
  });

  it('selects a new option and reports the change', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Billing onValueChange={onValueChange} />);
    await user.click(screen.getByRole('radio', { name: 'Annual' }));
    expect(screen.getByRole('radio', { name: 'Annual' })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('annual');
  });

  it('supports controlled usage', () => {
    const { rerender } = render(
      <RadioGroup value="a" onValueChange={() => {}} aria-label="x">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();
    rerender(
      <RadioGroup value="b" onValueChange={() => {}} aria-label="x">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });
});
