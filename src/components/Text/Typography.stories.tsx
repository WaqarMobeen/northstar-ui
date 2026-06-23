import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Heading } from '../Heading/Heading';
import { Code } from '../Code/Code';
import { Kbd } from '../Kbd/Kbd';
import { Stack } from '../Stack/Stack';
import { Inline } from '../Inline/Inline';

const meta = {
  title: 'Typography/Overview',
  component: Text,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <Stack gap={3}>
      <Heading level={1}>Account overview</Heading>
      <Heading level={2}>Billing</Heading>
      <Heading level={3}>Payment method</Heading>
      <Heading level={4}>Invoices</Heading>
    </Stack>
  ),
};

export const BodyText: Story = {
  render: () => (
    <Stack gap={2}>
      <Text size="lg">Large — section intro copy.</Text>
      <Text>Medium — default body text used across the product.</Text>
      <Text size="sm" tone="muted">Small muted — secondary metadata.</Text>
      <Text size="xs" tone="subtle">Extra small subtle — timestamps and captions.</Text>
    </Stack>
  ),
};

export const Tones: Story = {
  render: () => (
    <Inline gap={4}>
      <Text tone="default">Default</Text>
      <Text tone="muted">Muted</Text>
      <Text tone="accent">Accent</Text>
      <Text tone="success">Success</Text>
      <Text tone="danger">Danger</Text>
    </Inline>
  ),
};

export const CodeAndKbd: Story = {
  render: () => (
    <Stack gap={3}>
      <Text>
        Install with <Code>npm i northstar-ui</Code>, then press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
      </Text>
      <Code block>{`import { Button } from 'northstar-ui';\n\n<Button variant="primary">Save</Button>`}</Code>
    </Stack>
  ),
};
