import { profile, sections } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Mail } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <span
        aria-hidden="true"
        className="tick-rule absolute inset-x-0 top-0 h-1.5 opacity-40"
      />

      <Marquee className="border-b border-line py-8" duration={44}>
        <span
          aria-hidden="true"
          className="type-wide px-8 text-[clamp(2.5rem,9vw,6rem)] leading-none uppercase text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-line-strong)" }}
        >
          Let’s work together —
        </span>
      </Marquee>

      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-12 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-sharp bg-accent-fill font-mono text-xs font-medium tracking-wider text-accent-ink">
                {profile.initials}
              </span>
              <span className="type-panel text-base">{profile.name}</span>
            </a>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
              {profile.headline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-5 inline-block font-mono text-sm text-accent"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="type-label text-muted">Sections</h2>
            <ul className="mt-5 space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 text-sm text-muted transition-colors hover:text-text"
                  >
                    {/* Recessive by size and face, not by contrast — at
                        `--line-strong` this measured 1.9:1 against the page. */}
                    <span className="font-mono text-[0.65rem] transition-colors group-hover:text-accent">
                      {section.index}
                    </span>
                    <span className="link-underline">{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-label text-muted">Elsewhere</h2>
            <ul className="mt-5 flex gap-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    className="grid size-11 place-items-center rounded-sharp border border-line text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    {social.icon === "github" ? (
                      <GitHubIcon className="size-4.5" />
                    ) : social.icon === "linkedin" ? (
                      <LinkedInIcon className="size-4.5" />
                    ) : (
                      <Mail className="size-4.5" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
              {profile.locationNote}
            </p>
          </div>
        </div>

        <div className="type-label mt-12 flex flex-col gap-3 border-t border-line pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>Built with Next.js and Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
