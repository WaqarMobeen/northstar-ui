import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Inline } from '../Inline/Inline';

const meta = {
  title: 'Data display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Priya Nair' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </Inline>
  ),
};

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/96?img=12', name: 'Sam Cole' },
};

export const BrokenImageFallsBack: Story = {
  args: { src: 'https://example.com/does-not-exist.png', name: 'Diego Ruiz' },
};
