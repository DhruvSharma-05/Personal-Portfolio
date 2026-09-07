"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up once, when scrolled into view.
 *
 * The old implementation drove this with chained `setTimeout` calls, which drift
 * and keep firing off-screen. This uses rAF with an eased curve and stops the
 * moment it reaches the target.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
  pad = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  /** Zero-pad to this many digits, so a readout never changes width. */
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles gently on the number.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  // Reduced motion skips the ramp entirely and renders the final figure —
  // derived here rather than pushed through state from an effect.
  const display = reduced ? to : value;

  return (
    <span ref={ref}>
      {String(display).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
