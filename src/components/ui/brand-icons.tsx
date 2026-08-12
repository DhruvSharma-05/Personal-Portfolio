/**
 * Brand marks as inline SVG. Lucide removed brand icons in v1, and the previous
 * site pulled the whole Font Awesome stylesheet from a CDN just to draw these
 * four glyphs. Inlining costs a few hundred bytes and zero network requests.
 */

type Props = { className?: string };

const base = "currentColor";

export function GitHubIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill={base} className={className} aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill={base} className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function FigmaIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill={base} className={className} aria-hidden="true">
      <path d="M8.5 24a3.75 3.75 0 0 0 3.75-3.75V16.5H8.5a3.75 3.75 0 1 0 0 7.5Zm-3.75-11.25A3.75 3.75 0 0 1 8.5 9h3.75v7.5H8.5a3.75 3.75 0 0 1-3.75-3.75ZM8.5 1.5h3.75V9H8.5a3.75 3.75 0 1 1 0-7.5Zm7.5 0a3.75 3.75 0 0 1 0 7.5h-2.25V1.5H16Zm3.75 11.25A3.75 3.75 0 1 1 16 9a3.75 3.75 0 0 1 3.75 3.75Z" />
    </svg>
  );
}

export function DriveIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill={base} className={className} aria-hidden="true">
      <path d="M8.02 1.5 0 15.36l3.98 6.87 8.02-13.86L8.02 1.5Zm7.96 0H8.04l8.02 13.86h7.94L15.98 1.5ZM4.72 22.5h14.56L23.26 15.6H8.7L4.72 22.5Z" />
    </svg>
  );
}
