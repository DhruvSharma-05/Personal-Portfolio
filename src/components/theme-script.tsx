/**
 * Sets `data-theme` on <html> before first paint so the page never flashes the
 * wrong palette. Must stay inline and synchronous in <head> — moving it into a
 * component effect reintroduces the flash.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
