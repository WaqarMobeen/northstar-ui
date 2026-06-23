import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from './DropdownMenu';
import { Button } from '../Button/Button';

const meta = {
  title: 'Overlays/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="secondary">Actions</Button>}>
      <DropdownMenuItem onSelect={() => {}}>Rename</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => {}}>Duplicate</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => {}} disabled>Move to…</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive onSelect={() => {}}>Delete</DropdownMenuItem>
    </DropdownMenu>
  ),
};
