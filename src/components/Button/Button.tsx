import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import styles from './Button.module.css';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import type { Size } from '../../types/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: Size;
  /** Show a spinner, disable interaction, and mark the control busy. */
  isLoading?: boolean;
  /** Replaces the label while loading; falls back to the existing children. */
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Stretch to fill the available inline space. */
  fullWidth?: boolean;
}

const spinnerSize: Record<Size, 'sm' | 'md'> = { sm: 'sm', md: 'sm', lg: 'md' };

/**
 * Primary interactive control. Always renders a real `<button>` for built-in
 * keyboard and focus semantics. While `isLoading` it sets `aria-busy`, disables
 * activation, and swaps the leading icon for a spinner without losing width.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      disabled,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        data-loading={isLoading || undefined}
        data-full-width={fullWidth || undefined}
        data-ns-focus-ring=""
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading ? (
          <span className={styles.icon} aria-hidden="true">
            <Spinner size={spinnerSize[size]} decorative />
          </span>
        ) : (
          leftIcon && (
            <span className={styles.icon} aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        <span className={styles.label}>{isLoading && loadingText ? loadingText : children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
