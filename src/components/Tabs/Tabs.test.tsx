import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="Account sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="usage">Usage</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="usage">Usage content</TabPanel>
      <TabPanel value="billing">Billing content</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders tabs with the correct roles and selection', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Account sections' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
  });

  it('only renders the active panel', () => {
    render(<Example />);
    expect(screen.queryByText('Usage content')).not.toBeInTheDocument();
  });

  it('activates a tab on click', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Billing content');
  });

  it('moves between tabs with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('aria-selected', 'true');
  });

  it('roves tabindex to the selected tab', () => {
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('tabindex', '-1');
  });
});
