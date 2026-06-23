import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { IconButton } from '../IconButton/IconButton';
import { Inline } from '../Inline/Inline';

const Info = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 7.2v3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.8" fill="currentColor" />
  </svg>
);

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    label: 'Resync data from the source',
    children: <IconButton aria-label="Info" icon={<Info />} variant="secondary" />,
  },
};

export const Sides: Story = {
  render: () => (
    <Inline gap={6}>
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Tooltip key={side} label={`Side: ${side}`} side={side}>
          <IconButton aria-label={side} icon={<Info />} variant="secondary" />
        </Tooltip>
      ))}
    </Inline>
  ),
};
