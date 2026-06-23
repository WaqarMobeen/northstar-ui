import { forwardRef, type InputHTMLAttributes, type ReactNode, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';
import { cn } from '../../utils/cn';
import { composeRefs } from '../../utils/composeRefs';
import { useFormField } from '../FormField/FormFieldContext';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered next to the control. */
  children?: ReactNode;
  /** Render the third, mixed state (e.g. a "select all" header). */
  indeterminate?: boolean;
  isInvalid?: boolean;
}

/**
 * A checkbox built on a native `<input type="checkbox">` for full keyboard and
 * form semantics, with the visible box drawn via CSS. Supports the indeterminate
 * state, which can only be set imperatively on the DOM node.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, indeterminate = false, isInvalid, id, disabled, className, ...rest }, forwardedRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const field = useFormField();
    const invalid = isInvalid ?? field?.isInvalid ?? false;

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label className={cn(styles.root, className)} data-disabled={disabled || undefined}>
        <span className={styles.control}>
          <input
            ref={composeRefs(innerRef, forwardedRef)}
            type="checkbox"
            id={id ?? (children ? undefined : field?.controlId)}
            className={styles.input}
            disabled={disabled ?? field?.isDisabled}
            aria-invalid={invalid || undefined}
            aria-describedby={field?.describedBy}
            {...rest}
          />
          <span className={styles.box} data-invalid={invalid || undefined} aria-hidden="true">
            <svg className={styles.check} viewBox="0 0 16 16" fill="none">
              <path
                className={styles.checkPath}
                d="M3.5 8.2l3 3 6-6.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.dashPath}
                d="M4 8h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
