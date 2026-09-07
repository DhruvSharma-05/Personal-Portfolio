import type { ReactNode } from "react";
import { sections } from "@/content/profile";
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
      className={`relative scroll-mt-24 border-t border-line px-6 py-20 sm:px-10 md:py-32 ${className}`}
    >
      {/* The section boundary reads as a measured edge rather than a plain rule. */}
      <span
        aria-hidden="true"
        className="tick-rule absolute inset-x-0 top-0 h-1.5 opacity-40"
      />
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * Plate header — the label a panel carries above the instrument it describes.
 *
 * `[04]` bracketed index, a ruled span, and the plate's position in the run on
 * the right. The title is set in expanded Archivo; `accent` is the one word
 * that takes the signal colour.
 */
export function SectionHeader({
  id,
  title,
  accent,
  lede,
}: {
  id: string;
  title: string;
  /** Rendered in the accent colour, on the same line. */
  accent?: string;
  lede?: string;
}) {
  // Derived, never passed in: cutting or reordering a section renumbers every
  // plate, the nav and the left rail from the one list in `profile.ts`.
  const index = sections.find((section) => section.id === id)?.index ?? "";

  return (
    <header className="mb-14 md:mb-20">
      <Reveal direction="up">
        <div className="flex items-center gap-4">
          <span className="type-label rounded-sharp border border-accent/40 px-2 py-1 text-accent">
            {index}
          </span>
          <span
            aria-hidden="true"
            className="tick-rule h-1.5 flex-1 opacity-60"
          />
          <span className="type-label whitespace-nowrap text-muted">
            Plate {index}/{String(sections.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.06}>
        <h2
          id={`${id}-heading`}
          className="type-wide mt-7 text-[length:var(--text-display-sm)] uppercase"
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
          {/* 65ch keeps the measure inside the readable 45–90 character band. */}
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
