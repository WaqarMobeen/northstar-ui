import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastProvider';
import { useToast } from './toastContext';
import { Button } from '../Button/Button';
import { Inline } from '../Inline/Inline';

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
    <Inline>
      <Button variant="secondary" onClick={() => toast({ title: 'Saved', description: 'Your changes are live.', status: 'success' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Heads up', description: 'Trial ends in 3 days.', status: 'warning' })}>
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Upload failed',
            description: 'report.csv could not be processed.',
            status: 'danger',
            action: { label: 'Retry', onClick: () => {} },
            duration: null,
          })
        }
      >
        With action
      </Button>
    </Inline>
  );
}

export const Playground: Story = {
  render: () => (
    <ToastProvider placement="bottom-end">
      <Demo />
    </ToastProvider>
  ),
};
