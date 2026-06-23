import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button with an accessible name and default type', () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies variant and size as data attributes', () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveAttribute('data-variant', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('calls onClick when activated', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and busy while loading, and does not fire onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button isLoading loadingText="Saving" onClick={onClick}>
        Save
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveTextContent('Saving');
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards refs to the underlying button element', () => {
    let node: HTMLButtonElement | null = null;
    render(<Button ref={(el) => (node = el)}>Ref</Button>);
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });
});
