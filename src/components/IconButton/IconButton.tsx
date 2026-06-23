import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import styles from './IconButton.module.css';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import type { ButtonVariant } from '../Button/Button';
import type { Size } from '../../types/common';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Required for accessibility — there is no visible text label. */
  'aria-label': string;
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  isLoading?: boolean;
}

/**
 * A square, icon-only button. The `aria-label` prop is required by the type so a
 * control can never ship without an accessible name.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, variant = 'ghost', size = 'md', isLoading = false, type = 'button', disabled, className, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.iconButton, className)}
        data-variant={variant}
        data-size={size}
        data-ns-focus-ring=""
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        <span className={styles.icon} aria-hidden="true">
          {isLoading ? <Spinner size="sm" decorative /> : icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
