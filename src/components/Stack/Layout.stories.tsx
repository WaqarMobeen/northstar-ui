import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Inline } from '../Inline/Inline';
import { Grid } from '../Grid/Grid';
import { Divider } from '../Divider/Divider';
import { Card, CardBody } from '../Card/Card';
import { Text } from '../Text/Text';

const meta = {
  title: 'Layout/Overview',
  component: Stack,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: ReactNode }) => (
  <Card>
    <CardBody>
      <Text size="sm">{children}</Text>
    </CardBody>
  </Card>
);

export const StackAndInline: Story = {
  render: () => (
    <Stack gap={4}>
      <Inline gap={3}>
        <Box>Inline A</Box>
        <Box>Inline B</Box>
        <Box>Inline C</Box>
      </Inline>
      <Divider label="then stacked" />
      <Stack gap={2}>
        <Box>Stack 1</Box>
        <Box>Stack 2</Box>
      </Stack>
    </Stack>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid minColumnWidth="180px" gap={4}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i}>Cell {i + 1}</Box>
      ))}
    </Grid>
  ),
};
