import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Filters: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open filters</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="Filters"
          description="Narrow down the results."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Reset</Button>
              <Button onClick={() => setOpen(false)}>Apply</Button>
            </>
          }
        >
          <Stack gap={4}>
            <FormField label="Status">
              <Select placeholder="Any">
                <option>Active</option>
                <option>Past due</option>
                <option>Canceled</option>
              </Select>
            </FormField>
            <FormField label="Plan">
              <Select placeholder="Any">
                <option>Free</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </Select>
            </FormField>
          </Stack>
        </Drawer>
      </>
    );
  },
};
