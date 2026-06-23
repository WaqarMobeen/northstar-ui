import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

const meta = {
  title: 'Examples/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A realistic SaaS account dashboard composed from Northstar UI: app shell with navigation, ' +
          'metric cards, a searchable/filterable accounts table, a filters drawer, an invite dialog ' +
          'with validation, toasts, a dropdown menu, and a dark-mode toggle. Use the toolbar to flip ' +
          'theme and accent.',
      },
    },
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
