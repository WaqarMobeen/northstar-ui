import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

function ControlledDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Invite teammate"
        description="They will receive an email invitation."
      >
        <input aria-label="Email" />
      </Dialog>
    </>
  );
}

describe('Dialog', () => {
  it('is not rendered when closed', () => {
    render(<Dialog open={false} onOpenChange={() => {}} title="Hidden" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes modal semantics with a labelled title and description', () => {
    render(
      <Dialog open onOpenChange={() => {}} title="Settings" description="Manage your account">
        Body
      </Dialog>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Settings');
    expect(dialog).toHaveAccessibleDescription('Manage your account');
  });

  it('moves focus into the dialog when opened', async () => {
    const user = userEvent.setup();
    render(<ControlledDialog />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = await screen.findByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Dialog open onOpenChange={onOpenChange} title="Esc" />);
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes via the close button', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Dialog open onOpenChange={onOpenChange} title="X" />);
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
