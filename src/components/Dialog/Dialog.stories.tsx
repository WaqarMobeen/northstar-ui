import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { Input } from '../Input/Input';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal dialog. Focus is trapped and restored, body scroll is locked, and Escape or a ' +
          'backdrop click closes it. Title and description are wired to aria-labelledby/describedby.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const AccountSettings: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit profile</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Edit profile"
          description="Update how your name appears across the workspace."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <Stack gap={4}>
            <FormField label="Full name">
              <Input defaultValue="Priya Nair" />
            </FormField>
            <FormField label="Email" hint="We use this for account notifications.">
              <Input defaultValue="priya@acme.com" />
            </FormField>
          </Stack>
        </Dialog>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete project</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          size="sm"
          title="Delete project?"
          description="This permanently removes the project and all of its data. This cannot be undone."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        />
      </>
    );
  },
};
