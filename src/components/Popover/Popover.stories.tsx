import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button variant="secondary">Share</Button>}>
      <Stack gap={2}>
        <Heading level={4} size="sm">Share this report</Heading>
        <Text size="sm" tone="muted">Anyone with the link can view.</Text>
        <Button size="sm">Copy link</Button>
      </Stack>
    </Popover>
  ),
};
