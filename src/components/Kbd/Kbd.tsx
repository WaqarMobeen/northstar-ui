import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Kbd.module.css';
import { cn } from '../../utils/cn';

export type KbdProps = HTMLAttributes<HTMLElement>;

/** Represents a keyboard key or shortcut, e.g. <Kbd>⌘</Kbd> <Kbd>K</Kbd>. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(({ className, ...rest }, ref) => {
  return <kbd ref={ref} className={cn(styles.kbd, className)} {...rest} />;
});

Kbd.displayName = 'Kbd';
