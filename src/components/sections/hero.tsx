"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile, stats } from "@/content/profile";
import { Marquee } from "@/components/ui/marquee";
import { CountUp } from "@/components/ui/count-up";
import { GridField, Panel, PanelHead } from "@/components/ui/panel";

const TICKER = [
  "Power BI",
  "Python",
  "SQL",
  "Machine Learning",
  "Figma",
  "Streamlit",
  "Pandas",
  "Scikit-learn",
  "Data Storytelling",
  "n8n",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Registration marks at the corners of the working area. */
function Corners() {
  const shared = "absolute size-4 border-line-strong";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${shared} top-0 left-0 border-t border-l`} />
      <span className={`${shared} top-0 right-0 border-t border-r`} />
      <span className={`${shared} bottom-0 left-0 border-b border-l`} />
      <span className={`${shared} right-0 bottom-0 border-r border-b`} />
    </div>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    // Fixed height reserves the line so the copy below never reflows.
    // The outgoing and incoming roles are absolutely positioned so they overlap
    // — with `mode="wait"` the line goes empty between every swap.
    <span className="relative block h-[1.3em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0 whitespace-nowrap text-accent"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    /* `isolate` matters: it makes this section its own stacking context, so the
       `-z-10` decoration below paints behind the content but still in front of
       the page background rather than vanishing beneath it. */
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden"
    >
      <GridField cell="2.75rem" />

      {/* Oscilloscope sweep. One 1px line, transform-animated, on a 9s cycle. */}
      {reduced ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <span
            className="absolute inset-x-0 top-0 block h-px bg-gradient-to-r from-transparent via-trace to-transparent opacity-40"
            style={{ animation: "sweep 9s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
          />
        </div>
      )}

      {/* flex-1 + justify-center centres the plate in whatever height is left
          over once the telemetry strip has taken its share at the bottom. */}
      <div className="flex flex-1 flex-col justify-center px-6 pt-28 pb-10 sm:px-10">
      <div className="relative mx-auto w-full max-w-6xl">
        <Corners />

        <div className="px-4 py-10 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="type-label inline-flex items-center gap-2.5 rounded-sharp border border-line bg-surface px-3 py-2 text-muted"
          >
            <span
              className="size-1.5 shrink-0 bg-accent-fill"
              style={{
                animation: reduced ? "none" : "pulse-dot 2s ease-in-out infinite",
              }}
            />
            Available for opportunities
          </motion.p>

          <h1 id="hero-heading" className="mt-8">
            <span className="sr-only">
              {profile.name} — {profile.roles.join(", ")}
            </span>

            {[profile.firstName, profile.lastName].map((word, i) => (
              <motion.span
                key={word}
                aria-hidden="true"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.09, ease: EASE }}
                className="type-wide block text-[length:var(--text-display-lg)] leading-[0.85] uppercase"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-8 flex items-center gap-4"
          >
            {/* Below sm the label fills the row, leaving the rule a useless
                stub — so the rule only appears where it has room to measure. */}
            <span
              aria-hidden="true"
              className="tick-rule hidden h-1.5 flex-1 opacity-60 sm:block"
            />
            <span className="type-label text-muted">{profile.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start"
          >
            <Panel className="flex flex-col">
              <PanelHead label="Currently" trailing="Role" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p
                  className="type-panel text-2xl uppercase sm:text-3xl"
                  aria-hidden="true"
                >
                  <RotatingRole />
                </p>
                {/* 58ch holds the measure inside the readable band. */}
                <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
                  {profile.summary}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2.5 rounded-sharp bg-accent-fill px-6 py-3.5 font-semibold text-accent-ink transition-opacity duration-150 hover:opacity-90"
                  >
                    See the work
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-sharp border border-line-strong px-6 py-3.5 font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </Panel>

            <Panel>
              <PanelHead label="Index" trailing="Count" />
              <dl className="px-5 py-2 sm:px-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline gap-3 border-b border-line py-3.5 last:border-b-0"
                  >
                    {/* `dt` must precede its `dd` in the DOM; `order` puts the
                        figure on the left where a readout expects it. */}
                    <dt className="type-label order-3 shrink-0 text-muted">
                      {stat.label}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="order-2 min-w-4 flex-1 translate-y-[-0.15em] border-b border-dotted border-line-strong"
                    />
                    <dd
                      data-readout
                      className="type-panel order-1 shrink-0 text-3xl text-accent"
                    >
                      <CountUp to={stat.value} suffix={stat.suffix} pad={2} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-8"
      >
        <a
          href="#about"
          className="type-label inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
        >
          <ArrowDown
            className="size-3.5 motion-safe:animate-bounce"
            aria-hidden="true"
          />
          Scroll
        </a>
      </motion.div>
      </div>

      {/* Telemetry strip, pinned to the foot of the hero as the chassis edge.
          Only a top rule — the next section's own top border closes it. */}
      <Marquee
        className="border-t border-line bg-surface py-3"
        duration={50}
        aria-label="Technologies I work with"
      >
        {TICKER.map((item) => (
          <span
            key={item}
            className="type-label flex items-center gap-6 px-6 whitespace-nowrap text-muted"
          >
            {item}
            <span className="size-1 bg-accent-fill" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
