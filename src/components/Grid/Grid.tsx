import { type CSSProperties, type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './Grid.module.css';
import { cn } from '../../utils/cn';
import type { Space } from '../../tokens/tokens';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  /** Number of equal columns, or a custom `grid-template-columns` value. */
  columns?: number | string;
  gap?: Space;
  /** Minimum column width for an auto-fitting responsive grid. */
  minColumnWidth?: string;
}

/**
 * CSS grid layout. Pass `columns` for a fixed track count, or `minColumnWidth`
 * for a responsive auto-fit grid that reflows without media queries.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ as: Component = 'div', columns = 12, gap = 4, minColumnWidth, className, style, ...rest }, ref) => {
    const template = minColumnWidth
      ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
      : typeof columns === 'number'
        ? `repeat(${columns}, minmax(0, 1fr))`
        : columns;

    return (
      <Component
        ref={ref}
        className={cn(styles.grid, className)}
        style={
          {
            '--ns-grid-gap': `var(--ns-space-${gap})`,
            '--ns-grid-template': template,
            ...style,
          } as CSSProperties
        }
        {...rest}
      />
    );
  }
);

Grid.displayName = 'Grid';
