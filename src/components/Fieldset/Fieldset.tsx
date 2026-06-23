import { type FieldsetHTMLAttributes, forwardRef, type ReactNode } from 'react';
import styles from './Fieldset.module.css';
import { cn } from '../../utils/cn';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
  /** Supporting copy describing the group. */
  description?: ReactNode;
}

/**
 * Groups related form controls under a shared legend — the correct semantic
 * container for a set of radios, checkboxes, or related inputs.
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, description, className, children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} className={cn(styles.fieldset, className)} {...rest}>
        <legend className={styles.legend}>{legend}</legend>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.body}>{children}</div>
      </fieldset>
    );
  }
);

Fieldset.displayName = 'Fieldset';
