import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Switch.module.css';
import { cn } from '../../utils/cn';
import { useFormField } from '../FormField/FormFieldContext';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  children?: ReactNode;
  size?: 'sm' | 'md';
  /** Place the label before the control instead of after. */
  labelPosition?: 'start' | 'end';
}

/**
 * On/off toggle. Implemented as a native checkbox with `role="switch"`, so it is
 * keyboard-operable (Space) and participates in forms, while reading as a switch
 * to assistive technology.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, size = 'md', labelPosition = 'end', id, disabled, className, ...rest }, ref) => {
    const field = useFormField();

    return (
      <label
        className={cn(styles.root, className)}
        data-size={size}
        data-label-position={labelPosition}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id ?? (children ? undefined : field?.controlId)}
          className={styles.input}
          disabled={disabled ?? field?.isDisabled}
          aria-describedby={field?.describedBy}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
