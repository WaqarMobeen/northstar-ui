import {
  cloneElement,
  createContext,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react';
import styles from './DropdownMenu.module.css';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface MenuContextValue {
  close: () => void;
}
const MenuContext = createContext<MenuContextValue | null>(null);

export interface DropdownMenuProps {
  trigger: ReactElement;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Actions menu following the WAI-ARIA menu-button pattern. The trigger gets
 * `aria-haspopup="menu"`/`aria-expanded`; the list uses `role="menu"` with roving
 * focus across `menuitem`s (Arrow keys, Home/End, Escape). Opens with Enter/Space
 * or Arrow keys and focuses the first item.
 */
export function DropdownMenu({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  align = 'start',
  className,
}: DropdownMenuProps) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => setOpen(false), isOpen);
  useEscapeKey(() => setOpen(false), isOpen);

  const items = () =>
    menuRef.current
      ? Array.from(menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'))
      : [];

  useEffect(() => {
    if (isOpen) {
      const first = items()[0];
      first?.focus();
    }
  }, [isOpen]);

  const child = trigger as ReactElement<{
    onClick?: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    'aria-haspopup'?: 'menu';
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
  }>;

  const triggerEl = cloneElement(child, {
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': menuId,
    onClick: (e: MouseEvent) => {
      child.props.onClick?.(e);
      setOpen(!isOpen);
    },
    onKeyDown: (e: KeyboardEvent) => {
      child.props.onKeyDown?.(e);
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
    },
  });

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const all = items();
    if (all.length === 0) return;
    const index = all.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      all[(index + 1) % all.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      all[(index - 1 + all.length) % all.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      all[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      all[all.length - 1]?.focus();
    }
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {triggerEl}
      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          // Focusable for the role; active focus moves to a menuitem on open.
          tabIndex={-1}
          className={cn(styles.menu, className)}
          data-align={align}
          onKeyDown={onMenuKeyDown}
        >
          <MenuContext.Provider value={{ close: () => setOpen(false) }}>{children}</MenuContext.Provider>
        </div>
      )}
    </div>
  );
}

export interface DropdownMenuItemProps {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  /** Style as a destructive action. */
  destructive?: boolean;
  icon?: ReactNode;
}

/** A selectable menu action. Closes the menu after selection. */
export function DropdownMenuItem({
  children,
  onSelect,
  disabled = false,
  destructive = false,
  icon,
}: DropdownMenuItemProps) {
  const menu = useContext(MenuContext);

  const handle = () => {
    if (disabled) return;
    onSelect?.();
    menu?.close();
  };

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      className={styles.item}
      data-destructive={destructive || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handle();
        }
      }}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div role="separator" className={styles.separator} />;
}
