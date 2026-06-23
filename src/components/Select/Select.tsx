import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';
import { cn } from '../../utils/cn';
import { useFormField } from '../FormField/FormFieldContext';
import type { Size } from '../../types/common';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: Size;
  isInvalid?: boolean;
  /** Non-selectable leading option shown when no value is set. */
  placeholder?: string;
  children: ReactNode;
}

/**
 * Styled native `<select>`. Native is the right call here: it gives correct
 * keyboard handling, typeahead, and the platform option list (especially on
 * mobile) for free. Use Combobox when you need filtering or custom option
 * rendering.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', isInvalid, placeholder, id, disabled, required, className, children, ...rest }, ref) => {
    const field = useFormField();
    const invalid = isInvalid ?? field?.isInvalid ?? false;

    return (
      <span
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-invalid={invalid || undefined}
        data-disabled={(disabled ?? field?.isDisabled) || undefined}
      >
        <select
          ref={ref}
          id={id ?? field?.controlId}
          className={styles.select}
          disabled={disabled ?? field?.isDisabled}
          required={required ?? field?.isRequired}
          aria-invalid={invalid || undefined}
          aria-describedby={field?.describedBy}
          defaultValue={placeholder && rest.value === undefined && rest.defaultValue === undefined ? '' : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  }
);

Select.displayName = 'Select';
