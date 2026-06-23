import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Stack/Stack';

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'jane@acme.com' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    isInvalid: { control: 'boolean' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { 'aria-label': 'Email' } };

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Input {...args} aria-label="Small" size="sm" />
      <Input {...args} aria-label="Medium" size="md" />
      <Input {...args} aria-label="Large" size="lg" />
    </Stack>
  ),
};

export const WithAffixes: Story = {
  args: { 'aria-label': 'Search', prefix: <SearchIcon />, placeholder: 'Search invoices' },
};

export const States: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Input {...args} aria-label="Disabled" disabled value="read-only value" readOnly />
      <Input {...args} aria-label="Invalid" isInvalid defaultValue="not-an-email" />
    </Stack>
  ),
};

export const InFormField: Story = {
  render: () => (
    <Stack gap={4}>
      <FormField label="Workspace name" hint="Used in your dashboard URL." isRequired>
        <Input placeholder="acme-inc" />
      </FormField>
      <FormField label="Billing email" error="Enter a valid email address.">
        <Input defaultValue="invalid" />
      </FormField>
    </Stack>
  ),
};
