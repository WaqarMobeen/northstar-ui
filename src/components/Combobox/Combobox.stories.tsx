import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';
import { FormField } from '../FormField/FormField';

const meta = {
  title: 'Inputs/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof Combobox>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: { items: countries, placeholder: 'Search countries', 'aria-label': 'Country' },
};

export const InFormField: Story = {
  render: () => (
    <FormField label="Billing country" hint="Start typing to filter.">
      <Combobox items={countries} placeholder="Search countries" />
    </FormField>
  ),
};
