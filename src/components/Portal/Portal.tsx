import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  /** Existing node to render into. Defaults to `document.body`. */
  container?: Element | null;
}

/**
 * Render children into a different part of the DOM tree. Renders nothing during
 * SSR (no `document`); on the client it mounts synchronously so refs inside the
 * portal are attached in the same commit — overlays rely on this for focus
 * management on open.
 */
export function Portal({ children, container }: PortalProps) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, container ?? document.body);
}
