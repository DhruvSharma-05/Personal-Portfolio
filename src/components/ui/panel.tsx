import type { ElementType, ReactNode } from "react";

/**
 * The panel is the only container on the site: a hairline box with square
 * corners that prints registration marks at two corners on hover.
 *
 * It deliberately has no shadow, no blur and no background gradient. Depth
 * comes from the surface step (`--surface` sitting on `--ink`) and from the
 * rule weight, the way a milled panel reads against its chassis.
 */
export function Panel({
  as: Component = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Component
      className={`ticks rounded-sharp border border-line bg-surface transition-colors duration-300 hover:border-line-strong ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * A panel's caption bar — mono metadata separated from the body by a rule.
 * `trailing` is right-aligned, which is where an instrument puts its value.
 */
export function PanelHead({
  label,
  trailing,
  className = "",
}: {
  label: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-line px-5 py-3 ${className}`}
    >
      <span className="type-label text-muted">{label}</span>
      {trailing ? (
        <span className="type-label shrink-0 text-accent">{trailing}</span>
      ) : null}
    </div>
  );
}

/**
 * Specification row: label on the left, value on the right, dotted leader
 * across the gap. Reading a value back to its label along a leader is faster
 * than reading it across empty space — the whole reason spec sheets use them.
 */
export function SpecRow({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
      <span className="type-label shrink-0 text-muted">{label}</span>
      {/* The leader is hidden below sm, where the value wraps to its own line
          and there is no gap left for it to bridge. */}
      <span
        aria-hidden="true"
        className="hidden min-w-6 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong sm:block"
      />
      <span className="text-sm sm:shrink-0 sm:text-right">{value}</span>
    </div>
  );
}

/** Square, hairline chip. Replaces the rounded pill used everywhere before. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-sharp border border-line px-2.5 py-1 font-mono text-[0.7rem] tracking-wider text-muted">
      {children}
    </li>
  );
}

/**
 * Decorative drafting grid, faded out at the edges so it never competes with
 * the text sitting on top of it. Static — one paint, no animation.
 */
export function GridField({
  className = "",
  cell = "2.5rem",
  fade = "ellipse 80% 70% at 50% 35%",
}: {
  className?: string;
  cell?: string;
  fade?: string;
}) {
  const mask = `radial-gradient(${fade}, #000 30%, transparent 100%)`;

  return (
    <div
      aria-hidden="true"
      className={`grid-field pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{
        ["--cell" as string]: cell,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
