"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, stats } from "@/content/profile";
import { Marquee } from "@/components/ui/marquee";
import { CountUp } from "@/components/ui/count-up";

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
    <span className="relative block h-[1.15em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 pt-28 pb-12 sm:px-10"
    >
      {/* Ambient colour. Purely decorative, and cheap: two blurred divs, no canvas. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-32 size-[38rem] rounded-full bg-accent-fill opacity-[0.18] blur-[120px]"
          style={{ animation: reduced ? "none" : "blob-drift 22s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-violet opacity-25 blur-[130px]"
          style={{
            animation: reduced ? "none" : "blob-drift 28s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-xs tracking-wider text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-fill opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-fill" />
          </span>
          AVAILABLE FOR OPPORTUNITIES
        </motion.p>

        <h1 id="hero-heading" className="mb-8">
          <span className="sr-only">
            {profile.name} — {profile.roles.join(", ")}
          </span>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[length:var(--text-display-lg)] leading-[0.82] font-extrabold uppercase"
          >
            {profile.firstName}
          </motion.span>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[length:var(--text-display-lg)] leading-[0.82] font-extrabold uppercase text-transparent"
            style={{
              WebkitTextStroke: "1.5px var(--color-text)",
            }}
          >
            {profile.lastName}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end"
        >
          <div>
            <p
              className="font-display text-2xl leading-tight font-semibold sm:text-3xl"
              aria-hidden="true"
            >
              <RotatingRole />
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {profile.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-fill px-7 py-3.5 font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                See the work
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:gap-x-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-bold tabular-nums sm:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-6xl">
        <a
          href="#about"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          <ArrowDown
            className="size-3.5 motion-safe:animate-bounce"
            aria-hidden="true"
          />
          SCROLL
        </a>
      </div>

      <Marquee
        className="mt-12 border-y border-line py-4"
        duration={45}
        aria-label="Technologies I work with"
      >
        {TICKER.map((item) => (
          <span
            key={item}
            className="flex items-center gap-8 px-8 font-display text-xl font-semibold whitespace-nowrap text-muted uppercase"
          >
            {item}
            <span className="size-1.5 rounded-full bg-accent-fill" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
