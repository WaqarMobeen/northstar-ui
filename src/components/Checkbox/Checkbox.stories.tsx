import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Email me product updates' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Stack gap={3} align="start">
      <Checkbox>Default</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
    </Stack>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [items, setItems] = useState([true, false, true]);
    const allChecked = items.every(Boolean);
    const someChecked = items.some(Boolean) && !allChecked;
    return (
      <Stack gap={2} align="start">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => setItems(items.map(() => e.target.checked))}
        >
          Select all
        </Checkbox>
        <Stack gap={2} align="start" style={{ paddingLeft: 24 }}>
          {items.map((checked, i) => (
            <Checkbox
              key={i}
              checked={checked}
              onChange={(e) => setItems(items.map((v, j) => (j === i ? e.target.checked : v)))}
            >
              Permission {i + 1}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    );
  },
};
