import { forwardRef, type HTMLAttributes, type Ref } from 'react';
import styles from './Code.module.css';
import { cn } from '../../utils/cn';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Render as a multi-line block instead of inline. */
  block?: boolean;
}

/** Inline or block monospace text for code, identifiers, and config values. */
export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ block = false, className, children, ...rest }, ref) => {
    if (block) {
      return (
        <pre ref={ref as Ref<HTMLPreElement>} className={cn(styles.block, className)} {...rest}>
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code ref={ref} className={cn(styles.inline, className)} {...rest}>
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
