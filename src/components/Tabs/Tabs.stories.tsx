import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';
import { Text } from '../Text/Text';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList aria-label="Account sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="usage">Usage</Tab>
        <Tab value="billing">Billing</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanel value="overview"><Text>Summary of recent account activity.</Text></TabPanel>
      <TabPanel value="usage"><Text>API calls, storage, and seat usage this period.</Text></TabPanel>
      <TabPanel value="billing"><Text>Invoices, payment method, and plan details.</Text></TabPanel>
    </Tabs>
  ),
};

export const ManualActivation: Story = {
  render: () => (
    <Tabs defaultValue="a" activation="manual">
      <TabList aria-label="Manual tabs">
        <Tab value="a">First</Tab>
        <Tab value="b">Second</Tab>
        <Tab value="c">Third</Tab>
      </TabList>
      <TabPanel value="a"><Text>Arrow keys move focus; press Enter or Space to activate.</Text></TabPanel>
      <TabPanel value="b"><Text>Second panel.</Text></TabPanel>
      <TabPanel value="c"><Text>Third panel.</Text></TabPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical">
      <TabList aria-label="Settings">
        <Tab value="general">General</Tab>
        <Tab value="members">Members</Tab>
        <Tab value="security">Security</Tab>
      </TabList>
      <TabPanel value="general"><Text>General workspace settings.</Text></TabPanel>
      <TabPanel value="members"><Text>Invite and manage members.</Text></TabPanel>
      <TabPanel value="security"><Text>SSO, MFA, and session policy.</Text></TabPanel>
    </Tabs>
  ),
};
