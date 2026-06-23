import { createContext, useContext } from 'react';

export interface FormFieldContextValue {
  /** id to apply to the control. */
  controlId: string;
  /** ids the control should reference via aria-describedby. */
  describedBy?: string;
  /** Mark the control invalid for aria-invalid. */
  isInvalid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Read the surrounding FormField, if any. Controls call this to inherit id and
 * aria wiring so consumers don't have to thread those props by hand. Returns
 * null when used outside a FormField, in which case the control falls back to
 * its own props.
 */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
