"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { profile, sections } from "@/content/profile";

/**
 * `data-theme` on <html> is the source of truth — it's written by the inline
 * script in <head> before paint. Reading it through `useSyncExternalStore`
 * (rather than mirroring it into state from an effect) keeps React and the DOM
 * from disagreeing, and gives hydration a stable server snapshot.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    () => "dark" as const,
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`grid size-11 place-items-center rounded-sharp border border-line text-muted transition-colors duration-150 hover:border-accent hover:text-accent ${className}`}
    >
      {theme === "light" ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

/**
 * Position readout down the left margin — the instrument's own scale.
 *
 * Purely decorative: the same destinations are already in the primary nav, so
 * this is `aria-hidden` and unfocusable rather than a second set of links.
 * Only shown where there is real gutter to put it in (the content column is
 * 72rem, so 1440px is the first width with room to spare).
 */
function SectionRail({ active }: { active: string }) {
  return (
    <div
      aria-hidden="true"
      data-print-hide
      className="fixed top-1/2 left-8 z-40 hidden -translate-y-1/2 min-[1440px]:block"
    >
      <div className="relative flex flex-col gap-3 pl-4">
        <span className="absolute inset-y-1 left-0 w-px bg-line" />
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <span key={section.id} className="flex items-center gap-2">
              <span
                className={`h-px transition-all duration-300 ${
                  isActive ? "w-4 bg-accent-fill" : "w-2 bg-line-strong"
                }`}
              />
              <span
                // Full `--muted`, not a faded tint: the active step already
                // reads as active through colour and tick length, so dimming
                // the rest below AA buys nothing.
                className={`font-mono text-[0.65rem] tracking-widest transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {section.index}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // Drives the progress rule as a motion value, so scrolling never re-renders.
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    // `passive` keeps scrolling off the main-thread critical path.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Scroll spy.
   *
   * An IntersectionObserver comparing `intersectionRatio` gets this wrong:
   * ratio is relative to each target's own height, so a short section that is
   * fully visible always outranks a tall one you're actually reading, and jump
   * navigation can skip the observer band entirely.
   *
   * Instead: pick the last section whose top has passed a line 30% down the
   * viewport. Reads are batched into one rAF so scrolling stays cheap.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) current = section.id;
      }

      // Near the bottom the last section may never cross the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      // A no-op when unchanged — React bails out of the re-render.
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock the page behind the mobile panel and wire Escape to dismiss it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Move focus into the panel so keyboard users are not left behind it.
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const activeLabel =
    sections.find((section) => section.id === active)?.label ?? "Top";

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-sharp bg-accent-fill px-5 py-3 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <SectionRail active={active} />

      <header
        data-print-hide
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          // Solid, not blurred. Frosted glass was the one banned effect, and a
          // hairline over an opaque ground is truer to the panel language anyway.
          scrolled ? "border-b border-line bg-ink" : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-10"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-sharp bg-accent-fill font-mono text-xs font-medium tracking-wider text-accent-ink">
              {profile.initials}
            </span>
            <span className="type-panel hidden text-base sm:block">
              {profile.firstName}{" "}
              <span className="text-muted">{profile.lastName}</span>
            </span>
          </a>

          <ul className="hidden items-center lg:flex">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`type-label relative block px-3.5 py-6 transition-colors duration-150 ${
                      isActive ? "text-accent" : "text-muted hover:text-text"
                    }`}
                  >
                    {section.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-mark"
                        className="absolute inset-x-2 bottom-5 h-px bg-accent-fill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Live position readout — the header's own instrument face. */}
            <span
              aria-hidden="true"
              className="type-label mr-2 hidden text-muted xl:block"
            >
              {activeLabel}
            </span>
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-sharp bg-accent-fill px-5 py-3 text-sm font-semibold text-accent-ink transition-opacity duration-150 hover:opacity-90 sm:flex"
            >
              Hire me
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-sharp border border-line text-text transition-colors duration-150 hover:border-accent lg:hidden"
            >
              {open ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Read-position gauge. scaleX on a motion value: no re-render, no layout. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-fill"
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 pt-20 lg:hidden"
          >
            <ul className="flex flex-col">
              {sections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: reduced ? 0 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.05 + i * 0.04 }}
                  className="border-b border-line last:border-b-0"
                >
                  <a
                    href={`#${section.id}`}
                    onClick={close}
                    className="flex items-center gap-5 py-4"
                  >
                    <span className="font-mono text-xs text-accent">
                      {section.index}
                    </span>
                    <span className="type-wide-md text-3xl uppercase">
                      {section.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="type-label rounded-sharp border border-line px-4 py-3 text-muted"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
