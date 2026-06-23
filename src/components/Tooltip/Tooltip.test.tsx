import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows on focus and links the trigger via aria-describedby', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Copy to clipboard">
        <button type="button">Copy</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button', { name: 'Copy' });
    const tooltip = screen.getByRole('tooltip', { hidden: true });

    expect(trigger).not.toHaveAttribute('aria-describedby', tooltip.id);
    await user.tab();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    expect(tooltip).toHaveAttribute('data-open');
  });

  it('hides again on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Details">
        <button type="button">Hover</button>
      </Tooltip>
    );
    await user.tab();
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveAttribute('data-open');
    await user.tab();
    expect(screen.getByRole('tooltip', { hidden: true })).not.toHaveAttribute('data-open');
  });
});
