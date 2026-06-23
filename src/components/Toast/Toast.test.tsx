import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './ToastProvider';
import { useToast } from './toastContext';

function Trigger() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({ title: 'Invitation sent', description: 'We emailed alex@acme.com', duration: null })
      }
    >
      Invite
    </button>
  );
}

describe('Toast', () => {
  it('renders a notification region', () => {
    render(
      <ToastProvider>
        <span>app</span>
      </ToastProvider>
    );
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('shows a toast when triggered and dismisses it', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Invite' }));
    expect(screen.getByText('Invitation sent')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByText('Invitation sent')).not.toBeInTheDocument();
  });

  it('throws if useToast is used outside a provider', () => {
    function Orphan() {
      useToast();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
