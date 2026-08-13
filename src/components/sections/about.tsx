import { profile } from "@/content/profile";
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
        index="01"
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
              I’m a Computer Science student at{" "}
              <span className="text-text">{profile.university}</span>, working at
              the seam between data and design. As a{" "}
              <span className="text-text">Web Analyst at Accosoft India</span> I
              built the Power BI dashboards management actually opened on Monday
              mornings, and wrote the Python scrapers that stopped anyone having
              to assemble them by hand.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p>
              The part I care about is the last mile — a model with a good score
              is worth nothing if the person who needs it can’t read the output.
              That’s why I keep one foot in UI/UX: same problem, different end of
              the pipe.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p>
              Right now I’m in my final year, looking for a role where I can own
              an analytics surface end to end — from the query to the thing
              someone makes a call on.
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
    </Section>
  );
}
