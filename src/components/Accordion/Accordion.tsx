import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useMemo,
} from 'react';
import styles from './Accordion.module.css';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

const ItemContext = createContext<{ value: string; baseId: string } | null>(null);

export interface AccordionProps {
  /** single: one panel open at a time; multiple: independent panels. */
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  children: ReactNode;
}

/**
 * Vertically stacked, expandable sections. Each header is a native button with
 * `aria-expanded`/`aria-controls`; panels are regions labeled by their header.
 * Supports single- or multiple-open modes, controlled or uncontrolled.
 */
export function Accordion({
  type = 'single',
  value,
  defaultValue = [],
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const [open, setOpen] = useControllableState<string[]>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const ctx = useMemo<AccordionContextValue>(
    () => ({
      isOpen: (v) => open.includes(v),
      toggle: (v) => {
        if (open.includes(v)) {
          setOpen(open.filter((item) => item !== v));
        } else {
          setOpen(type === 'single' ? [v] : [...open, v]);
        }
      },
    }),
    [open, setOpen, type]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn(styles.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  const baseId = useId();
  return (
    <ItemContext.Provider value={{ value, baseId }}>
      <div className={styles.item}>{children}</div>
    </ItemContext.Provider>
  );
}

export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const accordion = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!accordion || !item) throw new Error('AccordionTrigger must be inside an AccordionItem.');
  const expanded = accordion.isOpen(item.value);

  return (
    <h3 className={styles.heading}>
      <button
        type="button"
        className={cn(styles.trigger, className)}
        id={`${item.baseId}-trigger`}
        aria-expanded={expanded}
        aria-controls={`${item.baseId}-panel`}
        data-open={expanded || undefined}
        onClick={() => accordion.toggle(item.value)}
      >
        <span>{children}</span>
        <svg className={styles.chevron} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </h3>
  );
}

export interface AccordionPanelProps {
  children: ReactNode;
  className?: string;
}

export function AccordionPanel({ children, className }: AccordionPanelProps) {
  const accordion = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!accordion || !item) throw new Error('AccordionPanel must be inside an AccordionItem.');
  const expanded = accordion.isOpen(item.value);

  return (
    <div
      role="region"
      id={`${item.baseId}-panel`}
      aria-labelledby={`${item.baseId}-trigger`}
      hidden={!expanded}
      className={cn(styles.panel, className)}
    >
      <div className={styles.panelInner}>{children}</div>
    </div>
  );
}
