import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';
import { cn } from '../../utils/cn';
import { useFormField } from '../FormField/FormFieldContext';
import type { Size } from '../../types/common';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: Size;
  /** Mark the field invalid. Inherited from a surrounding FormField error. */
  isInvalid?: boolean;
  /** Content rendered before the input (icon, currency symbol, etc.). */
  prefix?: ReactNode;
  /** Content rendered after the input (unit, clear button, etc.). */
  suffix?: ReactNode;
}

/** Single-line text input. Integrates with FormField for labels and errors. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', isInvalid, prefix, suffix, id, disabled, required, className, ...rest }, ref) => {
    const field = useFormField();
    const invalid = isInvalid ?? field?.isInvalid ?? false;

    return (
      <span
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-invalid={invalid || undefined}
        data-disabled={(disabled ?? field?.isDisabled) || undefined}
      >
        {prefix && (
          <span className={styles.affix} aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={id ?? field?.controlId}
          className={styles.input}
          disabled={disabled ?? field?.isDisabled}
          required={required ?? field?.isRequired}
          aria-invalid={invalid || undefined}
          aria-describedby={field?.describedBy}
          {...rest}
        />
        {suffix && (
          <span className={styles.affix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </span>
    );
  }
);

Input.displayName = 'Input';
