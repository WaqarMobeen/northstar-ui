import { forwardRef, type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';
import { cn } from '../../utils/cn';
import { useFormField } from '../FormField/FormFieldContext';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  /** Vertical resize behavior. Defaults to vertical-only. */
  resize?: 'none' | 'vertical' | 'both';
}

/** Multi-line text input. Integrates with FormField like Input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ isInvalid, resize = 'vertical', id, rows = 4, disabled, required, className, ...rest }, ref) => {
    const field = useFormField();
    const invalid = isInvalid ?? field?.isInvalid ?? false;

    return (
      <textarea
        ref={ref}
        id={id ?? field?.controlId}
        rows={rows}
        className={cn(styles.textarea, className)}
        data-invalid={invalid || undefined}
        data-resize={resize}
        disabled={disabled ?? field?.isDisabled}
        required={required ?? field?.isRequired}
        aria-invalid={invalid || undefined}
        aria-describedby={field?.describedBy}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
