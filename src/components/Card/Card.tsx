import { type ElementType, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  /** Add hover elevation; use for clickable cards (also set a role/tabindex). */
  interactive?: boolean;
  /** Remove the default body padding (e.g. when embedding a Table). */
  flush?: boolean;
}

/**
 * Surface container with subtle elevation. Compose with the Card subcomponents
 * (Header/Title/Body/Footer) or drop arbitrary content inside.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', interactive = false, flush = false, className, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(styles.card, className)}
        data-interactive={interactive || undefined}
        data-flush={flush || undefined}
        {...rest}
      />
    );
  }
);
Card.displayName = 'Card';

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.header, className)} {...rest} />;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4';
}
export function CardTitle({ as: Tag = 'h3', className, ...rest }: CardTitleProps) {
  return <Tag className={cn(styles.title, className)} {...rest} />;
}

export function CardDescription({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(styles.description, className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.body, className)} {...rest} />;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export function CardFooter({ className, ...rest }: CardFooterProps) {
  return <div className={cn(styles.footer, className)} {...rest} />;
}
