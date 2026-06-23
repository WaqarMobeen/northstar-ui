import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';
import styles from './RadioGroup.module.css';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import { useId } from '../../hooks/useId';
import { useFormField } from '../FormField/FormFieldContext';

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onSelect: (value: string) => void;
  isDisabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Shared input name. Defaults to a generated id. */
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
}

/**
 * Group of mutually exclusive options. Native radios share a `name`, so arrow-key
 * roving and single-selection come for free; the group adds `role="radiogroup"`
 * and a controlled/uncontrolled value API.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onValueChange,
      isDisabled = false,
      orientation = 'vertical',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const field = useFormField();
    const generatedName = useId(name);
    const [selected, setSelected] = useControllableState<string | undefined>({
      value,
      defaultValue,
      onChange: onValueChange as (v: string | undefined) => void,
    });

    const context = useMemo<RadioGroupContextValue>(
      () => ({
        name: generatedName,
        value: selected,
        onSelect: setSelected,
        isDisabled: isDisabled || (field?.isDisabled ?? false),
      }),
      [generatedName, selected, setSelected, isDisabled, field?.isDisabled]
    );

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        aria-describedby={field?.describedBy}
        aria-invalid={field?.isInvalid || undefined}
        className={cn(styles.group, className)}
        data-orientation={orientation}
        {...rest}
      >
        <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'value' | 'onChange'> {
  value: string;
  children?: ReactNode;
}

/** A single option within a RadioGroup. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, children, disabled, className, ...rest }, ref) => {
    const group = useContext(RadioGroupContext);
    if (!group) {
      throw new Error('Radio must be used within a <RadioGroup>.');
    }
    const isDisabled = disabled || group.isDisabled;

    return (
      <label className={cn(styles.radio, className)} data-disabled={isDisabled || undefined}>
        <span className={styles.control}>
          <input
            ref={ref}
            type="radio"
            name={group.name}
            value={value}
            checked={group.value === value}
            disabled={isDisabled}
            onChange={() => group.onSelect(value)}
            className={styles.input}
            {...rest}
          />
          <span className={styles.dot} aria-hidden="true" />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
