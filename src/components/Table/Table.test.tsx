import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';

function UsersTable() {
  return (
    <Table caption="Team members">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell sort="ascending">Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Priya Nair</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Cole</TableCell>
          <TableCell>Member</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table', () => {
  it('renders an accessible table with a caption', () => {
    render(<UsersTable />);
    const table = screen.getByRole('table', { name: 'Team members' });
    expect(table).toBeInTheDocument();
  });

  it('renders column headers with scope', () => {
    render(<UsersTable />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveAttribute('scope', 'col');
  });

  it('reflects sort direction via aria-sort', () => {
    render(<UsersTable />);
    expect(screen.getByRole('columnheader', { name: 'Role' })).toHaveAttribute(
      'aria-sort',
      'ascending'
    );
  });

  it('renders all data rows', () => {
    render(<UsersTable />);
    const rows = screen.getAllByRole('row');
    // header row + 2 body rows
    expect(rows).toHaveLength(3);
    expect(within(rows[1]!).getByText('Priya Nair')).toBeInTheDocument();
  });
});
