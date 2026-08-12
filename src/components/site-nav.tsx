"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
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
      className={`grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {theme === "light" ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

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
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2;
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

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-accent-fill px-5 py-3 font-medium text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <header
        data-print-hide
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-10"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid size-9 place-items-center rounded-full bg-accent-fill font-display text-sm font-bold text-accent-ink transition-transform duration-500 group-hover:rotate-[20deg]">
              {profile.initials}
            </span>
            <span className="hidden font-display text-base font-bold tracking-tight sm:block">
              {profile.firstName}
              <span className="text-muted">{profile.lastName}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === section.id
                      ? "text-text"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {active === section.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-accent-fill px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03] sm:flex"
            >
              Hire me
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              className="grid size-10 place-items-center rounded-full border border-line text-text transition-colors hover:border-accent lg:hidden"
            >
              {open ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
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
            <ul className="flex flex-col gap-2">
              {sections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: reduced ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={close}
                    className="flex items-baseline gap-4 py-3"
                  >
                    <span className="font-mono text-xs text-accent">
                      {section.index}
                    </span>
                    <span className="font-display text-4xl font-bold uppercase tracking-tight">
                      {section.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm text-muted"
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
