import { profile, sections } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Mail } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line pt-20">
      <Marquee className="pb-10" duration={38}>
        <span
          aria-hidden="true"
          className="px-8 font-display text-[clamp(3rem,10vw,7rem)] leading-none font-extrabold uppercase text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-line-strong)" }}
        >
          Let&apos;s work together —
        </span>
      </Marquee>

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10">
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-accent-fill font-display text-sm font-bold text-accent-ink">
                {profile.initials}
              </span>
              <span className="font-display text-base font-bold">
                {profile.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
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
            <h2 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
              Sections
            </h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="link-underline text-sm text-muted transition-colors hover:text-text"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
              Elsewhere
            </h2>
            <ul className="mt-4 flex gap-2.5">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>Built with Next.js, Tailwind and too much coffee.</p>
        </div>
      </div>
    </footer>
  );
}
