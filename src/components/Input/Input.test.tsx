import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { FormField } from '../FormField/FormField';

describe('Input', () => {
  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Email" />);
    const input = screen.getByLabelText('Email');
    await user.type(input, 'hi@example.com');
    expect(input).toHaveValue('hi@example.com');
  });

  it('marks itself invalid via aria-invalid', () => {
    render(<Input aria-label="Token" isInvalid />);
    expect(screen.getByLabelText('Token')).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects disabled and readOnly', () => {
    const { rerender } = render(<Input aria-label="X" disabled />);
    expect(screen.getByLabelText('X')).toBeDisabled();
    rerender(<Input aria-label="X" readOnly />);
    expect(screen.getByLabelText('X')).toHaveAttribute('readonly');
  });

  it('inherits id, description, and invalid state from FormField', () => {
    render(
      <FormField label="Workspace" error="Required" hint="Used in URLs">
        <Input />
      </FormField>
    );
    const input = screen.getByLabelText('Workspace');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Required');
  });
});
