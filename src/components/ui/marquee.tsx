import type { ReactNode } from "react";

/**
 * Infinite horizontal ticker. The children are rendered twice and the track
 * translates -50%, so the seam lands exactly where the loop restarts.
 * The duplicate is `aria-hidden` — screen readers hear the list once.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      role={ariaLabel ? "group" : undefined}
      aria-label={ariaLabel}
      className={`group relative flex overflow-hidden ${className}`}
      // Fades the content into the page edges instead of cutting it off.
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
