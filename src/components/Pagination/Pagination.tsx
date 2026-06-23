import styles from './Pagination.module.css';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  className?: string;
  'aria-label'?: string;
}

type PageToken = number | 'ellipsis-start' | 'ellipsis-end';

function buildRange(page: number, total: number, siblings: number): PageToken[] {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;
  const range: PageToken[] = [1];

  if (showLeftEllipsis) range.push('ellipsis-start');
  for (let i = showLeftEllipsis ? left : 2; i <= (showRightEllipsis ? right : total - 1); i += 1) {
    range.push(i);
  }
  if (showRightEllipsis) range.push('ellipsis-end');
  range.push(total);

  return range;
}

/**
 * Page navigation. Renders a labeled `nav` of page buttons with truncation, with
 * the active page marked `aria-current="page"` and disabled prev/next at the
 * bounds.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const tokens = buildRange(page, totalPages, siblingCount);

  return (
    <nav aria-label={ariaLabel} className={cn(styles.nav, className)}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <Chevron direction="left" />
      </button>
      <ul className={styles.list}>
        {tokens.map((token, i) =>
          typeof token === 'number' ? (
            <li key={token}>
              <button
                type="button"
                className={styles.page}
                data-active={token === page || undefined}
                aria-current={token === page ? 'page' : undefined}
                aria-label={`Page ${token}`}
                onClick={() => onPageChange(token)}
              >
                {token}
              </button>
            </li>
          ) : (
            <li key={`${token}-${i}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <Chevron direction="right" />
      </button>
    </nav>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M10 3l-5 5 5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
