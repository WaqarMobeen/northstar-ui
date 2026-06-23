import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';
import { Inline } from '../Inline/Inline';
import { Grid } from '../Grid/Grid';

const meta = {
  title: 'Data display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composed: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <Inline justify="between">
          <CardTitle>Pro plan</CardTitle>
          <Badge tone="accent">Current</Badge>
        </Inline>
        <CardDescription>Billed annually · renews Jan 1, 2027</CardDescription>
      </CardHeader>
      <CardBody>
        <Text tone="muted" size="sm">
          Includes unlimited projects, advanced analytics, and priority support for up to 20 seats.
        </Text>
      </CardBody>
      <CardFooter>
        <Button size="sm">Manage plan</Button>
        <Button size="sm" variant="ghost">View invoices</Button>
      </CardFooter>
    </Card>
  ),
};

export const MetricCards: Story = {
  render: () => (
    <Grid minColumnWidth="200px">
      {[
        { label: 'MRR', value: '$48.2k', delta: '+12%' },
        { label: 'Active users', value: '3,914', delta: '+4.1%' },
        { label: 'Churn', value: '1.8%', delta: '-0.3%' },
      ].map((m) => (
        <Card key={m.label}>
          <CardBody>
            <Text size="sm" tone="muted">{m.label}</Text>
            <Heading level={3} size="xl" style={{ marginTop: 4 }}>{m.value}</Heading>
            <Text size="xs" tone="success" style={{ marginTop: 4 }}>{m.delta} vs last month</Text>
          </CardBody>
        </Card>
      ))}
    </Grid>
  ),
};
