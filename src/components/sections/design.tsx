import { ArrowUpRight } from "lucide-react";
import { designProjects } from "@/content/design";
import { DriveIcon, FigmaIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function Design() {
  return (
    <Section id="design" className="border-t border-line">
      <SectionHeader
        id="design"
        index="04"
        title="Design"
        accent="work"
        lede="Interface and identity work — the other half of making data land."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {designProjects.map((project, i) => (
          <Reveal key={project.id} direction="up" delay={(i % 3) * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-accent/50">
              {/* Type-led cover instead of the old empty <img> placeholders. */}
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-b border-line bg-surface-2 p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.07] transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-accent">
                    <Icon name={project.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {project.year}
                  </span>
                </div>
                <p className="relative font-display text-xl font-bold uppercase leading-tight">
                  {project.type}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent-fill"
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tool}
                    </li>
                  ))}
                  {project.tools.length > 3 ? (
                    <li className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                      +{project.tools.length - 3}
                    </li>
                  ) : null}
                </ul>

                <div className="mt-auto pt-6">
                  {/* Only renders when a real URL exists — no dead "#" links. */}
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-accent"
                    >
                      {project.linkKind === "drive" ? (
                        <DriveIcon className="size-4" />
                      ) : (
                        <FigmaIcon className="size-4" />
                      )}
                      <span>
                        {project.linkLabel}
                        <span className="sr-only"> — {project.title}</span>
                      </span>
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="font-mono text-xs text-muted">
                      Case study available on request
                    </p>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
