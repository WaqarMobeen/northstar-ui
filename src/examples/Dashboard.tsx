import { useMemo, useState } from 'react';
import styles from './Dashboard.module.css';
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Combobox,
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  EmptyState,
  FormField,
  Heading,
  IconButton,
  Inline,
  Input,
  Pagination,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  ToastProvider,
  Tooltip,
  useTheme,
  useToast,
} from '..';

type Status = 'Active' | 'Past due' | 'Canceled';

interface Account {
  id: string;
  name: string;
  owner: string;
  plan: string;
  status: Status;
  mrr: number;
}

const ACCOUNTS: Account[] = [
  { id: '1', name: 'Northwind Traders', owner: 'Priya Nair', plan: 'Enterprise', status: 'Active', mrr: 4200 },
  { id: '2', name: 'Acme Corp', owner: 'Sam Cole', plan: 'Pro', status: 'Active', mrr: 980 },
  { id: '3', name: 'Globex', owner: 'Diego Ruiz', plan: 'Pro', status: 'Past due', mrr: 980 },
  { id: '4', name: 'Initech', owner: 'Mei Lin', plan: 'Free', status: 'Canceled', mrr: 0 },
  { id: '5', name: 'Umbrella Co', owner: 'Jonas Berg', plan: 'Enterprise', status: 'Active', mrr: 5100 },
];

const statusTone: Record<Status, 'success' | 'warning' | 'neutral'> = {
  Active: 'success',
  'Past due': 'warning',
  Canceled: 'neutral',
};

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M16 12.3A6.5 6.5 0 117.7 4a5.2 5.2 0 008.3 8.3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Tooltip label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
      <IconButton
        aria-label="Toggle color theme"
        variant="secondary"
        onClick={toggleTheme}
        icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      />
    </Tooltip>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card>
      <CardBody>
        <Text size="sm" tone="muted">{label}</Text>
        <Heading level={3} size="xl" style={{ marginTop: 4 }}>{value}</Heading>
        <Text size="xs" tone="success" style={{ marginTop: 4 }}>{delta} vs last month</Text>
      </CardBody>
    </Card>
  );
}

function DashboardInner() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ACCOUNTS.filter((a) => {
      const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = !statusFilter || a.status === statusFilter;
      const matchesPlan = !planFilter || a.plan === planFilter;
      return matchesQuery && matchesStatus && matchesPlan;
    });
  }, [query, statusFilter, planFilter]);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true" />
          <Text weight="semibold">Northstar</Text>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          {['Overview', 'Accounts', 'Billing', 'Settings'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={styles.navItem}
              aria-current={i === 1 ? 'page' : undefined}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '#' }, { label: 'Accounts' }]} />
            <Heading level={1} size="xl" style={{ marginTop: 8 }}>Accounts</Heading>
          </div>
          <Inline gap={2}>
            <ThemeToggle />
            <Button onClick={() => setInviteOpen(true)}>Invite teammate</Button>
            <DropdownMenu
              align="end"
              trigger={<Avatar name="Priya Nair" size="sm" style={{ cursor: 'pointer' }} />}
            >
              <DropdownMenuItem onSelect={() => {}}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => {}}>Sign out</DropdownMenuItem>
            </DropdownMenu>
          </Inline>
        </header>

        <section className={styles.metrics} aria-label="Key metrics">
          <Metric label="Monthly recurring revenue" value={currency.format(48200)} delta="+12%" />
          <Metric label="Active accounts" value="3,914" delta="+4.1%" />
          <Metric label="Net revenue retention" value="112%" delta="+2pts" />
        </section>

        <Card>
          <CardBody>
            <Inline justify="between" gap={3} style={{ marginBottom: 'var(--ns-space-4)' }}>
              <div style={{ maxWidth: 280, width: '100%' }}>
                <Input
                  aria-label="Search accounts"
                  placeholder="Search accounts"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
                Filters
              </Button>
            </Inline>

            {filtered.length === 0 ? (
              <EmptyState
                title="No accounts match your filters"
                description="Try clearing the search or adjusting the filters."
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setQuery('');
                      setStatusFilter(null);
                      setPlanFilter('');
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <Table caption="Accounts" hideCaption hoverable>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Account</TableHeaderCell>
                    <TableHeaderCell>Plan</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell align="end">MRR</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <Inline gap={3}>
                          <Avatar name={a.name} size="sm" />
                          <span>
                            <Text size="sm" weight="medium" as="div">{a.name}</Text>
                            <Text size="xs" tone="subtle" as="div">{a.owner}</Text>
                          </span>
                        </Inline>
                      </TableCell>
                      <TableCell>{a.plan}</TableCell>
                      <TableCell>
                        <Badge tone={statusTone[a.status]} dot>{a.status}</Badge>
                      </TableCell>
                      <TableCell align="end">{currency.format(a.mrr)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Inline justify="between" style={{ marginTop: 'var(--ns-space-4)' }}>
              <Text size="sm" tone="subtle">{filtered.length} of {ACCOUNTS.length} accounts</Text>
              <Pagination page={page} totalPages={6} onPageChange={setPage} />
            </Inline>
          </CardBody>
        </Card>
      </main>

      <Drawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        title="Filter accounts"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setStatusFilter(null);
                setPlanFilter('');
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Apply</Button>
          </>
        }
      >
        <Stack gap={4}>
          <FormField label="Status">
            <Combobox
              items={[
                { value: 'Active', label: 'Active' },
                { value: 'Past due', label: 'Past due' },
                { value: 'Canceled', label: 'Canceled' },
              ]}
              value={statusFilter}
              onValueChange={setStatusFilter}
              placeholder="Any status"
            />
          </FormField>
          <FormField label="Plan">
            <Select placeholder="Any plan" value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </Select>
          </FormField>
          <Switch defaultChecked>Only show accounts I own</Switch>
        </Stack>
      </Drawer>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} onInvited={(email) =>
        toast({ title: 'Invitation sent', description: `We emailed an invite to ${email}.`, status: 'success' })
      } />
    </div>
  );
}

function InviteDialog({
  open,
  onOpenChange,
  onInvited,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvited: (email: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);
    onInvited(email);
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Invite a teammate"
      description="They'll get an email with a link to join your workspace."
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit}>Send invite</Button>
        </>
      }
    >
      <FormField label="Email address" error={error}>
        <Input
          type="email"
          placeholder="teammate@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
    </Dialog>
  );
}

/** End-to-end example wiring many components into a realistic dashboard screen. */
export function Dashboard() {
  return (
    <ToastProvider>
      <DashboardInner />
    </ToastProvider>
  );
}
