import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

const cards = [
  {
    icon: GraduationCap,
    label: "Education",
    title: profile.degree,
    body: profile.university,
    meta: profile.degreeDuration,
  },
  {
    icon: MapPin,
    label: "Based in",
    title: profile.location,
    body: profile.locationNote,
    meta: "IST · UTC+5:30",
  },
  {
    icon: Sparkles,
    label: "Focus",
    title: "Analytics, ML & Design",
    body: "Dashboards, predictive models and the interfaces that make them usable.",
    meta: "Currently: final year",
  },
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

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <Reveal direction="up">
            <p>
              I&apos;m a Computer Science student at{" "}
              <span className="text-text">{profile.university}</span>, working
              at the seam between data and design. As a{" "}
              <span className="text-text">Web Analyst at Accosoft India</span> I
              built the Power BI dashboards management actually opened on Monday
              mornings, and wrote the Python scrapers that stopped anyone having
              to assemble them by hand.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p>
              The part I care about is the last mile — a model with a good score
              is worth nothing if the person who needs it can&apos;t read the
              output. That&apos;s why I keep one foot in UI/UX: same problem,
              different end of the pipe.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p>
              Right now I&apos;m in my final year, looking for a role where I can
              own an analytics surface end to end — from the query to the thing
              someone makes a call on.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4">
          {cards.map((card, i) => (
            <Reveal key={card.label} direction="left" delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/50">
                <div
                  className="absolute inset-0 -z-10 bg-accent-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                    <card.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
                      {card.label}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-bold">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{card.body}</p>
                    <p className="mt-3 font-mono text-xs text-accent">
                      {card.meta}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
