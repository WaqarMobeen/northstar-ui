import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { Spinner } from '../Spinner/Spinner';
import { Skeleton } from '../Skeleton/Skeleton';
import { Stack } from '../Stack/Stack';
import { Inline } from '../Inline/Inline';
import { Text } from '../Text/Text';

const meta = {
  title: 'Feedback/Progress & loaders',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const ProgressBars: Story = {
  render: () => (
    <Stack gap={4}>
      <Progress label="Storage used" value={72} />
      <Progress label="Seats used" value={9} max={10} tone="warning" />
      <Progress label="Importing" />
    </Stack>
  ),
};

export const Spinners: Story = {
  render: () => (
    <Inline gap={4}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Inline>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <Inline gap={4} align="start">
      <Skeleton variant="circle" width={48} height={48} />
      <Stack gap={2} style={{ flex: 1 }}>
        <Skeleton variant="text" lines={3} />
      </Stack>
    </Inline>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <Stack gap={2} aria-busy="true">
      <Skeleton variant="rect" height={120} />
      <Skeleton variant="text" width="60%" />
      <Text size="xs" tone="subtle">aria-busy is set on the container; skeletons are hidden from screen readers.</Text>
    </Stack>
  ),
};
