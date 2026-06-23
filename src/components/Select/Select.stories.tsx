import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { FormField } from '../FormField/FormField';

const meta = {
  title: 'Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const options = (
  <>
    <option value="utc">UTC</option>
    <option value="est">Eastern (ET)</option>
    <option value="pst">Pacific (PT)</option>
    <option value="cet">Central European (CET)</option>
  </>
);

export const Default: Story = {
  args: { 'aria-label': 'Timezone', placeholder: 'Select a timezone', children: options },
};

export const InFormField: Story = {
  render: () => (
    <FormField label="Default timezone" hint="Used for scheduled reports.">
      <Select placeholder="Select a timezone">{options}</Select>
    </FormField>
  ),
};

export const Invalid: Story = {
  args: { 'aria-label': 'Timezone', isInvalid: true, placeholder: 'Required', children: options },
};
