import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-24 px-6 py-24 sm:px-10 md:py-36 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  index,
  title,
  accent,
  lede,
}: {
  id: string;
  index: string;
  title: string;
  /** Rendered in the accent colour on its own line. */
  accent?: string;
  lede?: string;
}) {
  return (
    <header className="mb-16 md:mb-24">
      <Reveal direction="up">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">
            {index}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.06}>
        <h2
          id={`${id}-heading`}
          className="text-[length:var(--text-display-sm)] uppercase"
        >
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-accent">{accent}</span>
            </>
          ) : null}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal direction="up" delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
