import { ArrowRight } from "lucide-react";
import { sections } from "@/content/profile";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Freelance offer.
 *
 * Returns `null` while `content/services.ts` is empty, which it ships as. The
 * section, its nav entry and its plate number all appear together the moment
 * real services are added — see the derived `sections` list in `profile.ts`.
 * Same fallback contract as `Project.metrics`: absent beats invented.
 */
export function Services() {
  // `sections` only carries a services entry once the array below is non-empty,
  // so this one lookup guards the section and supplies its plate number — the
  // number can never drift out of step with the nav or the left rail.
  const meta = sections.find((section) => section.id === "services");
  if (!meta || services.length === 0) return null;

  return (
    <Section id="services">
      <SectionHeader
        id="services"
        title="What I take"
        accent="on"
        lede="Freelance work, scoped and priced up front. If none of these is quite what you need, the enquiry form takes free text."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.id} direction="up" delay={(i % 2) * 0.06}>
            <Panel as="article" className="flex h-full flex-col">
              <PanelHead
                label={service.title}
                trailing={service.leadTime ?? "Lead time on request"}
              />

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <p className="max-w-[52ch] leading-relaxed text-muted">
                    {service.summary}
                  </p>
                </div>

                <h3 className="type-label mt-6 text-muted">Deliverables</h3>
                <ul className="mt-3 space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 bg-accent-fill"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                  {/* An absent rate reads as "on request" rather than as a
                      number nobody has committed to. */}
                  <p
                    data-readout
                    className="type-panel text-lg text-accent"
                  >
                    {service.rateBand ?? "Rate on request"}
                  </p>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-sharp border border-line-strong px-4 py-2.5 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    Enquire
                    <span className="sr-only"> about {service.title}</span>
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" delay={0.1}>
        <ul className="mt-6 flex flex-wrap gap-2">
          <Tag>Remote</Tag>
          <Tag>IST · UTC+5:30</Tag>
          <Tag>Fixed scope or retainer</Tag>
        </ul>
      </Reveal>
    </Section>
  );
}
