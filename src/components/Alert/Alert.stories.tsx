import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    status: 'info',
    title: 'Scheduled maintenance',
    children: 'Northstar will be read-only on Sunday from 02:00–03:00 UTC.',
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Statuses: Story = {
  render: () => (
    <Stack gap={3}>
      <Alert status="info" title="Heads up">A new dashboard layout is available in settings.</Alert>
      <Alert status="success" title="Payment received">Your invoice for May has been paid.</Alert>
      <Alert status="warning" title="Usage limit approaching">You have used 90% of your API quota.</Alert>
      <Alert status="danger" title="Card declined">Update your payment method to avoid interruption.</Alert>
    </Stack>
  ),
};

export const Dismissible: Story = {
  args: { onDismiss: () => {} },
};
