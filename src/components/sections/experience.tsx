import { Trophy } from "lucide-react";
import { achievements, experiences } from "@/content/experience";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeader
        id="experience"
        index="02"
        title="Where I've"
        accent="worked"
        lede="Three roles, one thread: take something manual and make it repeatable."
      />

      <ol className="relative space-y-4">
        {/* The rail sits behind the cards and stops at the last marker. */}
        <span
          aria-hidden="true"
          className="absolute top-8 bottom-8 left-[1.4rem] hidden w-px bg-line md:block"
        />

        {experiences.map((exp, i) => (
          <Reveal as="li" key={exp.id} direction="up" delay={i * 0.08}>
            <div className="relative md:pl-20">
              <span
                aria-hidden="true"
                className="absolute top-8 left-0 hidden size-12 place-items-center rounded-full border border-line bg-surface-2 text-accent md:grid"
              >
                <Icon name={exp.icon} className="size-5" />
              </span>

              <article className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/50 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="mb-3 inline-block rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
                      {exp.kind}
                    </span>
                    <h3 className="font-display text-2xl font-bold sm:text-3xl">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-accent">{exp.company}</p>
                    <p className="mt-0.5 text-sm text-muted">{exp.location}</p>
                  </div>
                  <p className="font-mono text-xs whitespace-nowrap text-muted">
                    {exp.duration}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {exp.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-fill"
                      />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20">
        <Reveal direction="up">
          <h3 className="mb-8 flex items-center gap-3 font-display text-xl font-bold uppercase tracking-tight">
            <Trophy className="size-5 text-accent" aria-hidden="true" />
            Recognition
          </h3>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.id} direction="up" delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:p-8">
                <p className="font-mono text-xs tracking-[0.15em] text-accent uppercase">
                  {item.award} · {item.date}
                </p>
                <h4 className="mt-3 font-display text-2xl font-bold">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-muted">{item.organization}</p>
                <p className="mt-4 leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
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
