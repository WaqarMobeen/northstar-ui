import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Inline>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="tertiary">Tertiary</Button>
      <Button {...args} variant="danger">Delete</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </Inline>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Inline>
      <Button {...args} rightIcon={<ArrowRight />}>Continue</Button>
      <Button {...args} variant="secondary" leftIcon={<ArrowRight />}>Back</Button>
    </Inline>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap={3} align="start">
      <Inline>
        <Button {...args}>Default</Button>
        <Button {...args} disabled>Disabled</Button>
      </Inline>
      <Inline>
        <Button {...args} isLoading loadingText="Saving">Save</Button>
        <Button {...args} variant="secondary" isLoading>Refresh</Button>
      </Inline>
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Create workspace' },
  parameters: { layout: 'padded' },
};
