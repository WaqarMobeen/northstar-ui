import {
  cloneElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useId,
  useRef,
} from 'react';
import styles from './Popover.module.css';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export type PopoverSide = 'top' | 'bottom';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
  /** Clickable trigger element; receives `aria-expanded`/`aria-controls`. */
  trigger: ReactElement;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: PopoverSide;
  align?: PopoverAlign;
  className?: string;
}

/**
 * Non-modal popover anchored to a trigger. Toggles on trigger click, closes on
 * outside click or Escape, and exposes `aria-expanded`/`aria-controls`. Focus is
 * left to the consumer (non-modal), matching the disclosure pattern.
 */
export function Popover({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  className,
}: PopoverProps) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const contentId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => setOpen(false), isOpen);
  useEscapeKey(() => setOpen(false), isOpen);

  const child = trigger as ReactElement<{
    onClick?: (e: MouseEvent) => void;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-haspopup'?: boolean | 'dialog';
  }>;

  const triggerEl = cloneElement(child, {
    'aria-expanded': isOpen,
    'aria-controls': contentId,
    'aria-haspopup': 'dialog',
    onClick: (e: MouseEvent) => {
      child.props.onClick?.(e);
      setOpen(!isOpen);
    },
  });

  return (
    <div ref={rootRef} className={styles.root}>
      {triggerEl}
      {isOpen && (
        <div
          id={contentId}
          role="dialog"
          className={cn(styles.content, className)}
          data-side={side}
          data-align={align}
        >
          {children}
        </div>
      )}
    </div>
  );
}
