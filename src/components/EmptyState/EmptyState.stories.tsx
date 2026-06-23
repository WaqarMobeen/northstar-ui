import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const Inbox = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M6 26h10l3 5h10l3-5h10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Data display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Inbox />,
    title: 'No invoices yet',
    description: 'Invoices will appear here once you have an active subscription.',
    action: <Button size="sm">Start a plan</Button>,
  },
};
