import {
  cloneElement,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Tooltip.module.css';
import { cn } from '../../utils/cn';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text. Kept short — tooltips are not for rich content. */
  label: ReactNode;
  /** Single focusable trigger element. */
  children: ReactElement;
  side?: TooltipSide;
  /** Delay before showing on hover, in ms. */
  openDelay?: number;
  className?: string;
}

/**
 * Text tooltip shown on hover and keyboard focus. The trigger is linked to the
 * tip via `aria-describedby`, and Escape dismisses it. Positioning is CSS-only
 * (no portal) so it inherits theme tokens without extra wiring; place triggers
 * with enough surrounding space for the chosen side.
 */
export function Tooltip({ label, children, side = 'top', openDelay = 150, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  const child = children as ReactElement<{
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    'aria-describedby'?: string;
  }>;

  const trigger = cloneElement(child, {
    'aria-describedby': open ? tooltipId : child.props['aria-describedby'],
    onMouseEnter: (e: MouseEvent) => {
      child.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: MouseEvent) => {
      child.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: FocusEvent) => {
      child.props.onFocus?.(e);
      setOpen(true);
    },
    onBlur: (e: FocusEvent) => {
      child.props.onBlur?.(e);
      hide();
    },
    onKeyDown: (e: KeyboardEvent) => {
      child.props.onKeyDown?.(e);
      if (e.key === 'Escape') hide();
    },
  });

  return (
    <span className={styles.root}>
      {trigger}
      <span
        role="tooltip"
        id={tooltipId}
        className={cn(styles.tooltip, className)}
        data-side={side}
        data-open={open || undefined}
        aria-hidden={!open}
      >
        {label}
      </span>
    </span>
  );
}
