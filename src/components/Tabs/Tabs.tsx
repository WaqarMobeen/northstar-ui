import {
  createContext,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useId,
  useMemo,
  useRef,
} from 'react';
import styles from './Tabs.module.css';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';

type Orientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  baseId: string;
  value: string | undefined;
  setValue: (value: string) => void;
  orientation: Orientation;
  /** automatic: arrow keys select; manual: arrow keys move focus only. */
  activation: 'automatic' | 'manual';
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>.`);
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: Orientation;
  activation?: 'automatic' | 'manual';
  children: ReactNode;
}

/** Tabs root. Provides selection state and ARIA wiring to its subcomponents. */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  activation = 'automatic',
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as (v: string | undefined) => void,
  });

  const ctx = useMemo<TabsContextValue>(
    () => ({ baseId, value: selected, setValue: setSelected, orientation, activation }),
    [baseId, selected, setSelected, orientation, activation]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn(styles.tabs, className)} data-orientation={orientation} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  'aria-label': string;
  children: ReactNode;
}

/** Container for Tab triggers; handles arrow-key roving focus. */
export function TabList({ className, children, ...rest }: TabListProps) {
  const { orientation, activation } = useTabsContext('TabList');
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = ref.current
      ? Array.from(ref.current.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'))
      : [];
    if (tabs.length === 0) return;
    const current = tabs.indexOf(document.activeElement as HTMLElement);
    const next = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prev = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    let target: HTMLElement | undefined;
    if (e.key === next) target = tabs[(current + 1) % tabs.length];
    else if (e.key === prev) target = tabs[(current - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') target = tabs[0];
    else if (e.key === 'End') target = tabs[tabs.length - 1];

    if (target) {
      e.preventDefault();
      target.focus();
      if (activation === 'automatic') target.click();
    }
  };

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      // Focusable for the role; real focus lives on the active tab via roving tabindex.
      tabIndex={-1}
      className={cn(styles.list, className)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

/** A single tab trigger. */
export function Tab({ value, disabled, className, children, ...rest }: TabProps) {
  const { baseId, value: selected, setValue } = useTabsContext('Tab');
  const isSelected = selected === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn(styles.tab, className)}
      data-selected={isSelected || undefined}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

/** Content region tied to a Tab by value. */
export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const { baseId, value: selected } = useTabsContext('TabPanel');
  if (selected !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(styles.panel, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
