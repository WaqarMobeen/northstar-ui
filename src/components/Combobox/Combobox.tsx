import {
  forwardRef,
  type KeyboardEvent,
  useId as useReactId,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Combobox.module.css';
import { cn } from '../../utils/cn';
import { composeRefs } from '../../utils/composeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useFormField } from '../FormField/FormFieldContext';

export interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  /** Message shown when the filter matches nothing. */
  emptyMessage?: string;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

function defaultFilter(items: ComboboxItem[], query: string): ComboboxItem[] {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter((item) => item.label.toLowerCase().includes(q));
}

/**
 * Single-select autocomplete following the WAI-ARIA combobox pattern with a
 * listbox popup: `aria-expanded`, `aria-controls`, and `aria-activedescendant`
 * track the highlighted option, and Arrow/Enter/Escape/Home/End are handled.
 * Selection state is controllable; the visible text mirrors the active query.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      placeholder,
      isInvalid,
      isDisabled,
      emptyMessage = 'No matches',
      id,
      className,
      'aria-label': ariaLabel,
    },
    forwardedRef
  ) => {
    const field = useFormField();
    const reactId = useReactId();
    const inputId = id ?? field?.controlId ?? `${reactId}-input`;
    const listId = `${reactId}-listbox`;

    const [selected, setSelected] = useControllableState<string | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange: onValueChange,
    });

    const selectedItem = items.find((item) => item.value === selected) ?? null;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(selectedItem?.label ?? '');
    const [activeIndex, setActiveIndex] = useState(-1);

    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = useMemo(() => defaultFilter(items, open ? query : ''), [items, query, open]);
    const invalid = isInvalid ?? field?.isInvalid ?? false;
    const disabled = isDisabled ?? field?.isDisabled ?? false;

    useOutsideClick(rootRef, () => closeAndSync(), open);

    function closeAndSync() {
      setOpen(false);
      setActiveIndex(-1);
      setQuery(selectedItem?.label ?? '');
    }

    function commit(item: ComboboxItem) {
      if (item.disabled) return;
      setSelected(item.value);
      setQuery(item.label);
      setOpen(false);
      setActiveIndex(-1);
    }

    function openList() {
      if (disabled) return;
      setOpen(true);
      const current = filtered.findIndex((i) => i.value === selected);
      setActiveIndex(current);
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!open) return openList();
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!open) return openList();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Home':
          if (open) {
            event.preventDefault();
            setActiveIndex(0);
          }
          break;
        case 'End':
          if (open) {
            event.preventDefault();
            setActiveIndex(filtered.length - 1);
          }
          break;
        case 'Enter': {
          if (open && activeIndex >= 0) {
            event.preventDefault();
            const item = filtered[activeIndex];
            if (item) commit(item);
          }
          break;
        }
        case 'Escape':
          if (open) {
            event.preventDefault();
            closeAndSync();
          }
          break;
        default:
          break;
      }
    }

    const activeId = activeIndex >= 0 && filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined;

    return (
      <div ref={rootRef} className={cn(styles.root, className)}>
        <div
          className={styles.control}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
        >
          <input
            ref={composeRefs(inputRef, forwardedRef)}
            id={inputId}
            type="text"
            role="combobox"
            className={styles.input}
            aria-label={ariaLabel}
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            aria-invalid={invalid || undefined}
            aria-describedby={field?.describedBy}
            autoComplete="off"
            disabled={disabled}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onFocus={openList}
            onKeyDown={onKeyDown}
          />
          <span className={styles.chevron} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {open && (
          <ul id={listId} role="listbox" className={styles.listbox}>
            {filtered.length === 0 ? (
              <li className={styles.empty} role="presentation">
                {emptyMessage}
              </li>
            ) : (
              filtered.map((item, index) => (
                // Options aren't focusable in the combobox pattern; keyboard selection is
                // handled on the input via aria-activedescendant (see onKeyDown above).
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  key={item.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={item.value === selected}
                  aria-disabled={item.disabled || undefined}
                  className={styles.option}
                  data-active={index === activeIndex || undefined}
                  // Prevent the input from blurring before the click registers.
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commit(item)}
                >
                  {item.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
