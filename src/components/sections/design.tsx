import { ArrowRight } from "lucide-react";
import { designProjects } from "@/content/design";
import { DriveIcon, FigmaIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

export function Design() {
  return (
    <Section id="design">
      <SectionHeader
        id="design"
        index="04"
        title="Design"
        accent="work"
        lede="Interface and identity work — the other half of making data land."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {designProjects.map((project, i) => (
          <Reveal key={project.id} direction="up" delay={(i % 3) * 0.06}>
            <Panel as="article" className="flex h-full flex-col">
              {/* Type-led cover. The drafting grid stands in for the artwork —
                  honest about there being no screenshot, rather than an empty
                  <img> placeholder. */}
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-b border-line bg-surface-2 p-5">
                <div
                  aria-hidden="true"
                  className="grid-field absolute inset-0"
                  style={{ ["--cell" as string]: "1.5rem" }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-sharp border border-line bg-surface text-accent">
                    <Icon name={project.icon} className="size-4.5" />
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {project.year}
                  </span>
                </div>
                <p className="type-wide-md relative text-xl leading-tight uppercase">
                  {project.type}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="type-panel text-xl">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-sm text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 bg-accent-fill"
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                  {project.tools.length > 3 ? (
                    <Tag>+{project.tools.length - 3}</Tag>
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
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="type-label text-muted">
                      Case study on request
                    </p>
                  )}
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
