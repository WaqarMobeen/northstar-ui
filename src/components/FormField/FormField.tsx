import { forwardRef, type HTMLAttributes, type ReactNode, useMemo } from 'react';
import styles from './FormField.module.css';
import { cn } from '../../utils/cn';
import { useId } from '../../hooks/useId';
import { FormFieldContext, type FormFieldContextValue } from './FormFieldContext';

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  label: ReactNode;
  /** Helper text shown below the control when there is no error. */
  hint?: ReactNode;
  /** Error message. When set, the field is treated as invalid. */
  error?: ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  /** Visually hide the label while keeping it accessible. */
  hideLabel?: boolean;
  /** Override the generated control id. */
  id?: string;
  children: ReactNode;
}

/**
 * Pairs a label, control, and help/error text and wires the ARIA relationships
 * automatically. Nested controls (Input, Textarea, Select, Switch, etc.) read
 * the field context to pick up `id`, `aria-describedby`, `aria-invalid`, and the
 * required/disabled state, so the common case needs no manual wiring.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { label, hint, error, isRequired = false, isDisabled = false, hideLabel = false, id, className, children, ...rest },
    ref
  ) => {
    const controlId = useId(id);
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const isInvalid = Boolean(error);

    const describedBy = [hint ? hintId : null, isInvalid ? errorId : null].filter(Boolean).join(' ');

    const context = useMemo<FormFieldContextValue>(
      () => ({
        controlId,
        describedBy: describedBy || undefined,
        isInvalid,
        isRequired,
        isDisabled,
      }),
      [controlId, describedBy, isInvalid, isRequired, isDisabled]
    );

    return (
      <div ref={ref} className={cn(styles.field, className)} {...rest}>
        <label htmlFor={controlId} className={cn(styles.label, hideLabel && styles.hiddenLabel)}>
          {label}
          {isRequired && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
        <FormFieldContext.Provider value={context}>{children}</FormFieldContext.Provider>
        {hint && !isInvalid && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {isInvalid && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
