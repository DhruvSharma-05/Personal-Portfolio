import { ArrowUpRight } from "lucide-react";
import { certifications, skillGroups } from "@/content/skills";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function Skills() {
  return (
    <Section id="skills" className="border-t border-line">
      <SectionHeader
        id="skills"
        index="05"
        title="The"
        accent="toolkit"
        lede="What I reach for, and where I've actually used it."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} direction="up" delay={(i % 2) * 0.08}>
            <article className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Icon name={group.icon} className="size-4.5" />
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                  {group.title}
                </h3>
              </div>

              <ul className="mt-6 divide-y divide-line">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="font-medium">{skill.name}</span>
                    {skill.note ? (
                      <span className="font-mono text-xs text-muted">
                        {skill.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal direction="up">
          <h3 className="mb-8 font-display text-xl font-bold uppercase tracking-tight">
            Certifications
          </h3>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} direction="up" delay={(i % 2) * 0.08}>
              <article className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-lg font-bold leading-snug">
                      {cert.name}
                    </h4>
                    <p className="mt-1 text-sm text-muted">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  {/* Renders only with a real credential URL — see content/skills.ts */}
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-accent"
                    >
                      Verify
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                      <span className="sr-only"> {cert.name}</span>
                    </a>
                  ) : null}
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
