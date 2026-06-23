import { forwardRef, type HTMLAttributes, useState } from 'react';
import styles from './Avatar.module.css';
import { cn } from '../../utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials, then a neutral placeholder. */
  src?: string;
  /** Name used for the alt text and initials fallback. */
  name: string;
  size?: AvatarSize;
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/**
 * User or entity avatar. Shows the image when it loads, then initials derived
 * from `name`. Decorative by default (the name is conveyed by adjacent text);
 * pass a `title`/surrounding label where the avatar stands alone.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name, size = 'md', className, ...rest }, ref) => {
    const [failed, setFailed] = useState(false);
    const showImage = src && !failed;

    return (
      <span ref={ref} className={cn(styles.avatar, className)} data-size={size} {...rest}>
        {showImage ? (
          <img className={styles.image} src={src} alt={name} onError={() => setFailed(true)} />
        ) : (
          <span className={styles.initials} aria-hidden="true">
            {initialsFrom(name)}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
