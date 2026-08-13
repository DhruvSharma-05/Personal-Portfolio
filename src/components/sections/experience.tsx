import { achievements, experiences } from "@/content/experience";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        index="02"
        title="Where I’ve"
        accent="worked"
        lede="Three roles, one thread: take something manual and make it repeatable."
      />

      <ol className="relative space-y-4">
        {/* The rail runs behind the entries and stops at the last marker. */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 hidden w-px bg-line md:block"
        />

        {experiences.map((exp, i) => (
          <Reveal as="li" key={exp.id} direction="up" delay={i * 0.06}>
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
                        <span className="max-w-[68ch] leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </ul>
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
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
