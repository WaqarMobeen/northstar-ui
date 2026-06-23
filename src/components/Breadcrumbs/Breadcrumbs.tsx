import { Fragment, type ReactNode } from 'react';
import styles from './Breadcrumbs.module.css';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Custom separator between items. */
  separator?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Breadcrumb trail. Renders a labeled `nav > ol`; the final item is marked
 * `aria-current="page"` and is not a link. Separators are decorative.
 */
export function Breadcrumbs({
  items,
  separator = '/',
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbsProps) {
  return (
    <nav aria-label={ariaLabel} className={cn(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={index}>
              <li className={styles.item}>
                {isLast || !item.href ? (
                  <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <a className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li className={styles.separator} aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
