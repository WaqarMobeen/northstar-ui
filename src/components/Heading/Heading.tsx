import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Heading.module.css';
import { cn } from '../../utils/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level (renders h1–h6). */
  level?: HeadingLevel;
  /** Visual size, decoupled from level so document outline stays correct. */
  size?: HeadingSize;
  truncate?: boolean;
}

const sizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'sm',
};

/**
 * Heading with visual size decoupled from semantic level. Choose `level` for the
 * document outline and `size` for appearance, so a visually small heading can
 * still be an `h2` where the structure calls for it.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, truncate, className, ...rest }, ref) => {
    const Tag = `h${level}` as const;
    const resolvedSize = size ?? sizeForLevel[level];
    return (
      <Tag
        ref={ref}
        className={cn(styles.heading, truncate && styles.truncate, className)}
        data-size={resolvedSize}
        {...rest}
      />
    );
  }
);

Heading.displayName = 'Heading';
