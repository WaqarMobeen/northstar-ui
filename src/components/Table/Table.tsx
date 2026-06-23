import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import styles from './Table.module.css';
import { cn } from '../../utils/cn';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Accessible caption describing the table contents. */
  caption?: ReactNode;
  /** Visually hide the caption while keeping it for screen readers. */
  hideCaption?: boolean;
  density?: 'comfortable' | 'compact';
  /** Highlight rows on hover. */
  hoverable?: boolean;
}

/**
 * Data table. Renders a real `<table>` with semantic sections and wraps it in a
 * horizontally scrollable region (`role="region"`, keyboard-focusable) so wide
 * tables remain reachable on small screens. Compose with the cell subcomponents.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { caption, hideCaption = false, density = 'comfortable', hoverable = false, className, children, ...rest },
    ref
  ) => {
    return (
      <div
        className={styles.scroll}
        role="region"
        aria-label={typeof caption === 'string' ? caption : undefined}
        // A horizontally scrollable region must be keyboard-focusable (WCAG 2.1.1).
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <table
          ref={ref}
          className={cn(styles.table, className)}
          data-density={density}
          data-hoverable={hoverable || undefined}
          {...rest}
        >
          {caption && (
            <caption className={cn(styles.caption, hideCaption && styles.hiddenCaption)}>
              {caption}
            </caption>
          )}
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = 'Table';

export function TableHead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn(styles.head, className)} {...rest} />;
}

export function TableBody({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...rest} />;
}

export function TableRow({ className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(styles.row, className)} {...rest} />;
}

export interface TableHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  align?: 'start' | 'center' | 'end';
  /** Current sort direction for a sortable column header. */
  sort?: 'ascending' | 'descending' | 'none';
}

export function TableHeaderCell({ align = 'start', sort, className, ...rest }: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      className={cn(styles.headerCell, className)}
      data-align={align}
      aria-sort={sort}
      {...rest}
    />
  );
}

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  align?: 'start' | 'center' | 'end';
}

export function TableCell({ align = 'start', className, ...rest }: TableCellProps) {
  return <td className={cn(styles.cell, className)} data-align={align} {...rest} />;
}
