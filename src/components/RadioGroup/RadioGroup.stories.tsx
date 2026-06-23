import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="annual" aria-label="Billing period">
      <Radio value="monthly">Monthly — $20/mo</Radio>
      <Radio value="annual">Annual — $16/mo (save 20%)</Radio>
      <Radio value="enterprise">Enterprise — contact sales</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="md" orientation="horizontal" aria-label="Density">
      <Radio value="sm">Compact</Radio>
      <Radio value="md">Cozy</Radio>
      <Radio value="lg">Comfortable</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" isDisabled aria-label="Disabled group">
      <Radio value="a">First</Radio>
      <Radio value="b">Second</Radio>
    </RadioGroup>
  ),
};
