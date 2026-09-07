"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * `data-theme` on <html> is the source of truth — it's written by the inline
 * script in <head> before paint. Reading it through `useSyncExternalStore`
 * (rather than mirroring it into state from an effect) keeps React and the DOM
 * from disagreeing, gives hydration a stable server snapshot, and avoids React
 * 19's `react-hooks/set-state-in-effect` rule.
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

export function ThemeToggle({ className = "" }: { className?: string }) {
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
