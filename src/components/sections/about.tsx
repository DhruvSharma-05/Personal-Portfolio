import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead, SpecRow } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

/** Facts, read straight off the profile — no claim here isn't already stated there. */
const spec = [
  { label: "Degree", value: profile.degree },
  { label: "Institution", value: profile.university },
  { label: "Term", value: profile.degreeDuration },
  { label: "Based in", value: profile.location },
  { label: "Timezone", value: "IST · UTC+5:30" },
  { label: "Availability", value: profile.locationNote },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        id="about"
        title="About"
        accent="me"
        lede={profile.headline}
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* max-w in ch, because the readable measure is a character count —
            a column width in rem drifts the moment the type scale changes. */}
        <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed text-muted">
          <Reveal direction="up">
            <p>
              I’m a final-year Computer Science student at{" "}
              <span className="text-text">{profile.university}</span>, currently
              an <span className="text-text">AI Engineer Intern at RevClerx</span>,
              where I work on web-scraping infrastructure, LLM-backed data
              pipelines and on-device inference.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p>
              Before that I was a{" "}
              <span className="text-text">Web Analyst at Accosoft India</span>,
              building the Power BI dashboards management actually opened on
              Monday mornings and the Python scrapers that stopped anyone having
              to assemble them by hand. That job is why I care about the last
              mile: a model with a good score is worth nothing if the person who
              needs it can’t read the output.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p>
              The through-line is the same at both ends of the pipe — get the
              data out, get it clean, and put it somewhere a decision can be made
              from it.
            </p>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.1}>
          <Panel>
            <PanelHead label="Specification" trailing={profile.initials} />
            <div className="divide-y divide-line px-5 py-2 sm:px-6">
              {spec.map((row) => (
                <SpecRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>

      {/* Toolkit, folded in from what used to be its own section. A tool list
          is supporting evidence for the prose above, not a headline act. */}
      <div className="mt-16">
        <Reveal direction="up">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="type-label text-accent">Toolkit</h3>
            <span
              aria-hidden="true"
              className="tick-rule h-1.5 flex-1 opacity-60"
            />
            <span className="type-label whitespace-nowrap text-muted">
              Where I’ve used it
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} direction="up" delay={(i % 2) * 0.06}>
              <Panel as="article" className="h-full">
                <PanelHead
                  label={group.title}
                  trailing={String(group.skills.length).padStart(2, "0")}
                />
                <div className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
                    <Icon name={group.icon} className="size-4.5" />
                  </span>

                  <ul className="min-w-0 flex-1 divide-y divide-line">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5 first:pt-0 last:pb-0"
                      >
                        <span className="text-sm font-medium">{skill.name}</span>
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
      </div>
    </Section>
  );
}
