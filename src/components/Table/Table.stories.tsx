import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './Table';
import { Badge } from '../Badge/Badge';
import { Avatar } from '../Avatar/Avatar';
import { Inline } from '../Inline/Inline';
import { Text } from '../Text/Text';

const meta = {
  title: 'Data display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const members = [
  { name: 'Priya Nair', email: 'priya@acme.com', role: 'Admin', status: 'Active' },
  { name: 'Sam Cole', email: 'sam@acme.com', role: 'Member', status: 'Active' },
  { name: 'Diego Ruiz', email: 'diego@acme.com', role: 'Member', status: 'Invited' },
];

export const UserTable: Story = {
  render: () => (
    <Table caption="Workspace members" hoverable>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Member</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((m) => (
          <TableRow key={m.email}>
            <TableCell>
              <Inline gap={3}>
                <Avatar name={m.name} size="sm" />
                <span>
                  <Text size="sm" weight="medium" as="div">{m.name}</Text>
                  <Text size="xs" tone="subtle" as="div">{m.email}</Text>
                </span>
              </Inline>
            </TableCell>
            <TableCell>{m.role}</TableCell>
            <TableCell>
              <Badge tone={m.status === 'Active' ? 'success' : 'neutral'} dot>{m.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table caption="Invoices" density="compact">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Invoice</TableHeaderCell>
          <TableHeaderCell align="end">Amount</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>INV-2041</TableCell>
          <TableCell align="end">$1,200.00</TableCell>
          <TableCell><Badge tone="success">Paid</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-2042</TableCell>
          <TableCell align="end">$980.00</TableCell>
          <TableCell><Badge tone="warning">Past due</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
