import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Active' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] },
    variant: { control: 'inline-radio', options: ['soft', 'solid', 'outline'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <Inline>
      <Badge {...args} tone="neutral">Draft</Badge>
      <Badge {...args} tone="success">Paid</Badge>
      <Badge {...args} tone="warning">Past due</Badge>
      <Badge {...args} tone="danger">Canceled</Badge>
      <Badge {...args} tone="info">Trialing</Badge>
      <Badge {...args} tone="accent">New</Badge>
    </Inline>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap={3} align="start">
      <Inline>
        <Badge variant="soft" tone="success">Soft</Badge>
        <Badge variant="solid" tone="success">Solid</Badge>
        <Badge variant="outline" tone="success">Outline</Badge>
      </Inline>
    </Stack>
  ),
};

export const BillingStatuses: Story = {
  render: () => (
    <Inline>
      <Badge tone="success" dot>Paid</Badge>
      <Badge tone="warning" dot>Past due</Badge>
      <Badge tone="neutral" dot>Refunded</Badge>
    </Inline>
  ),
};
