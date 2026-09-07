import { ArrowUpRight } from "lucide-react";
import { achievements, experiences } from "@/content/experience";
import { certifications } from "@/content/skills";
import type { EntryLink } from "@/content/types";
import { DriveIcon, FigmaIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

/** Renders only when a real artefact exists behind the entry. */
function ArtefactLink({ link, context }: { link: EntryLink; context: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
    >
      {link.kind === "drive" ? (
        <DriveIcon className="size-4" />
      ) : link.kind === "figma" ? (
        <FigmaIcon className="size-4" />
      ) : null}
      <span>
        {link.label}
        <span className="sr-only"> — {context}</span>
      </span>
      <ArrowUpRight
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        title="Where I’ve"
        accent="worked"
        lede="Two industry roles and the campus work around them, with one thread throughout: take something manual and make it repeatable."
      />

      <ol className="relative space-y-4">
        {/* The rail runs behind the entries and stops at the last marker. */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 hidden w-px bg-line md:block"
        />

        {experiences.map((exp, i) => (
          <Reveal
            as="li"
            key={exp.id}
            direction="up"
            delay={Math.min(i, 3) * 0.06}
          >
            <div className="relative md:pl-20">
              {/* Position marker: entry number over the rail, icon beside it. */}
              <span
                aria-hidden="true"
                className="absolute top-5 left-0 hidden size-12 flex-col items-center justify-center gap-1 rounded-sharp border border-line bg-surface-2 md:flex"
              >
                <Icon name={exp.icon} className="size-4 text-accent" />
                <span className="font-mono text-[0.6rem] tracking-widest text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <Panel>
                <PanelHead label={exp.kind} trailing={exp.duration} />

                <div className="p-5 sm:p-7">
                  <h3 className="type-wide-md text-2xl sm:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-accent">{exp.company}</p>
                  <p className="mt-0.5 text-sm text-muted">{exp.location}</p>

                  <ul className="mt-6 space-y-3">
                    {exp.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 bg-accent-fill"
                        />
                        <span className="max-w-[72ch] leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Volunteer entries carry no stack — an empty list renders
                      nothing rather than leaving an orphaned gap. */}
                  {exp.technologies.length > 0 ? (
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </ul>
                  ) : null}

                  {exp.link ? (
                    <ArtefactLink link={exp.link} context={exp.title} />
                  ) : null}
                </div>
              </Panel>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16">
        <Reveal direction="up">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="type-label text-accent">Recognition</h3>
            <span
              aria-hidden="true"
              className="tick-rule h-1.5 flex-1 opacity-60"
            />
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.id} direction="up" delay={i * 0.06}>
              <Panel className="h-full border-accent/35 bg-accent-soft hover:border-accent/70">
                <PanelHead
                  label={item.award}
                  trailing={item.date}
                  className="border-accent/25"
                />
                <div className="p-5 sm:p-7">
                  <h4 className="type-wide-md text-2xl">{item.title}</h4>
                  <p className="mt-1.5 text-sm text-muted">
                    {item.organization}
                  </p>
                  <p className="mt-4 max-w-[62ch] leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </ul>
                  {item.link ? (
                    <ArtefactLink link={item.link} context={item.title} />
                  ) : null}
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certifications moved here from the old Skills section: credentials are
          part of the record of what someone has done, not part of a tool list. */}
      <div className="mt-16">
        <Reveal direction="up">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="type-label text-accent">Certifications</h3>
            <span
              aria-hidden="true"
              className="tick-rule h-1.5 flex-1 opacity-60"
            />
            <span className="type-label whitespace-nowrap text-muted">
              {String(certifications.length).padStart(2, "0")} total
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} direction="up" delay={(i % 3) * 0.06}>
              <Panel as="article" className="h-full">
                <PanelHead label={cert.issuer} trailing={cert.date} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="type-panel text-base leading-snug">
                      {cert.name}
                    </h4>
                    {/* Renders only with a real credential URL — a "Verified"
                        badge with nothing behind it is a claim, not a fact. */}
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="type-label inline-flex shrink-0 items-center gap-1 text-accent"
                      >
                        Verify
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                        <span className="sr-only"> {cert.name}</span>
                      </a>
                    ) : null}
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </ul>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
