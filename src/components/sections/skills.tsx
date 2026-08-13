import { ArrowUpRight } from "lucide-react";
import { certifications, skillGroups } from "@/content/skills";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        id="skills"
        index="05"
        title="The"
        accent="toolkit"
        lede="What I reach for, and where I’ve actually used it."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} direction="up" delay={(i % 2) * 0.06}>
            <Panel as="article" className="h-full">
              <PanelHead
                label={group.title}
                trailing={String(group.skills.length).padStart(2, "0")}
              />
              <div className="flex items-start gap-4 p-5 sm:p-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
                  <Icon name={group.icon} className="size-4.5" />
                </span>

                <ul className="min-w-0 flex-1 divide-y divide-line">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="font-medium">{skill.name}</span>
                      {/* `note` only exists where real work backs it up. */}
                      {skill.note ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="hidden min-w-6 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong sm:block"
                          />
                          <span className="font-mono text-xs text-muted">
                            {skill.note}
                          </span>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal direction="up">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="type-label text-accent">Certifications</h3>
            <span
              aria-hidden="true"
              className="tick-rule h-1.5 flex-1 opacity-60"
            />
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} direction="up" delay={(i % 2) * 0.06}>
              <Panel as="article" className="h-full">
                <PanelHead label={cert.issuer} trailing={cert.date} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="type-panel text-lg leading-snug">
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

                  <ul className="mt-5 flex flex-wrap gap-2">
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
