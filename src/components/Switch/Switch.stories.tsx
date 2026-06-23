import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: 'Enable notifications' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Stack gap={3} align="start">
      <Switch>Off by default</Switch>
      <Switch defaultChecked>On by default</Switch>
      <Switch size="sm">Small</Switch>
      <Switch disabled>Disabled</Switch>
      <Switch labelPosition="start">Label on the left</Switch>
    </Stack>
  ),
};
