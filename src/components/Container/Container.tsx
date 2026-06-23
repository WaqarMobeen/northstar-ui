import { type CSSProperties, type ElementType, forwardRef, type HTMLAttributes } from 'react';
import styles from './Container.module.css';
import { cn } from '../../utils/cn';

export type ContainerWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const maxWidths: Record<ContainerWidth, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  size?: ContainerWidth;
  /** Remove the default horizontal padding. */
  bleed?: boolean;
}

/** Centers content and caps its width at a readable line length. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', size = 'lg', bleed = false, className, style, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(styles.container, bleed && styles.bleed, className)}
        style={{ '--ns-container-width': maxWidths[size], ...style } as CSSProperties}
        {...rest}
      />
    );
  }
);

Container.displayName = 'Container';
