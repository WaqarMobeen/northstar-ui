import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('exposes the switch role', () => {
    render(<Switch>Email alerts</Switch>);
    expect(screen.getByRole('switch', { name: 'Email alerts' })).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch onChange={onChange}>Notifications</Switch>);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
    expect(onChange).toHaveBeenCalled();
  });

  it('supports a controlled checked state', () => {
    const { rerender } = render(
      <Switch checked={false} onChange={() => {}}>
        S
      </Switch>
    );
    expect(screen.getByRole('switch')).not.toBeChecked();
    rerender(
      <Switch checked onChange={() => {}}>
        S
      </Switch>
    );
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('cannot be toggled when disabled', async () => {
    const user = userEvent.setup();
    render(<Switch disabled>Off</Switch>);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});
