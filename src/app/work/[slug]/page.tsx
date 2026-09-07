import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { GridField, Panel, PanelHead, Tag } from "@/components/ui/panel";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteFooter } from "@/components/site-footer";

type Params = { slug: string };

/**
 * All five case studies are known at build time, and `dynamicParams = false`
 * makes any other slug a static 404 rather than an on-demand render — which
 * also keeps the route compatible with `output: "export"` if the site ever
 * moves back to GitHub Pages.
 */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      url: `/work/${project.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  const project = projects[index];
  if (!project) notFound();

  // Wraps at both ends, so every case study has somewhere to go next.
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];

  const category = project.category.replace("-", " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies,
    author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
    url: `${profile.siteUrl}/work/${project.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#main"
        className="sr-only rounded-sharp bg-accent-fill px-5 py-3 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>

      {/* A case study has no sections to spy on, so this is a plain bar rather
          than the home page's scroll-tracking nav. */}
      <header
        data-print-hide
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-10"
        >
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${profile.name} — back to the home page`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-sharp bg-accent-fill font-mono text-xs font-medium tracking-wider text-accent-ink">
              {profile.initials}
            </span>
            <span className="type-panel hidden text-base sm:block">
              {profile.firstName}{" "}
              <span className="text-muted">{profile.lastName}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/#work"
              className="group type-label inline-flex items-center gap-2 rounded-sharp border border-line px-4 py-3 text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <ArrowLeft
                className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All work
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main">
        {/* `isolate` so the -z-10 grid paints behind the content but in front
            of the page background — see HANDOFF §10. */}
        <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:px-10 md:pt-44">
          <GridField cell="2.75rem" fade="ellipse 75% 80% at 50% 30%" />

          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center gap-4">
              <span className="type-label rounded-sharp border border-accent/40 px-2 py-1 text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="tick-rule h-1.5 flex-1 opacity-60"
              />
              <span className="type-label whitespace-nowrap text-muted">
                {category}
              </span>
            </div>

            {/* Stacks below sm: a long title beside the icon overruns a 390px
                viewport, and the section clips it rather than scrolling — so
                the title gets the full width and the smaller step there. */}
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row">
              <span className="grid size-14 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
                <Icon name={project.icon} className="size-6" />
              </span>
              <h1 className="type-wide text-[length:var(--text-display-sm)] uppercase sm:text-[length:var(--text-display)]">
                {project.title}
              </h1>
            </div>

            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-sharp bg-accent-fill px-6 py-3.5 font-semibold text-accent-ink transition-opacity duration-150 hover:opacity-90"
                >
                  Live demo
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sharp border border-line-strong px-6 py-3.5 font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <GitHubIcon className="size-4" />
                <span>
                  View code
                  <span className="sr-only"> for {project.title} on GitHub</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-6 py-16 sm:px-10 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <Panel>
              <PanelHead
                label="What it does"
                trailing={String(project.features.length).padStart(2, "0")}
              />
              <ul className="space-y-3 p-5 sm:p-7">
                {/* The full list here — the home card truncates to three. */}
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 bg-accent-fill"
                    />
                    <span className="max-w-[68ch] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>

            <div className="flex flex-col gap-4">
              {/* Renders nothing when `metrics` is empty — the intended
                  fallback for a project with no reproducible figures. */}
              {project.metrics.length > 0 ? (
                <Panel>
                  <PanelHead label="Measured" trailing="Result" />
                  <dl className="px-5 py-2 sm:px-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-baseline gap-3 border-b border-line py-3.5 last:border-b-0"
                      >
                        <dt className="type-label order-3 shrink-0 text-muted">
                          {metric.label}
                        </dt>
                        <span
                          aria-hidden="true"
                          className="order-2 min-w-4 flex-1 translate-y-[-0.15em] border-b border-dotted border-line-strong"
                        />
                        <dd
                          data-readout
                          className="type-panel order-1 shrink-0 text-2xl text-accent"
                        >
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Panel>
              ) : null}

              <Panel>
                <PanelHead
                  label="Stack"
                  trailing={
                    project.status === "discontinued" ? "Archived" : "Shipped"
                  }
                />
                <ul className="flex flex-wrap gap-2 p-5">
                  {project.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </ul>
              </Panel>

              {project.note ? (
                <Panel>
                  <PanelHead label="Status note" />
                  <p className="p-5 text-sm leading-relaxed text-muted">
                    {project.note}
                  </p>
                </Panel>
              ) : null}
            </div>
          </div>
        </section>

        <nav
          aria-label="More case studies"
          className="border-t border-line px-6 py-12 sm:px-10"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-2">
            <Link
              href={`/work/${previous.id}`}
              className="ticks group rounded-sharp border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-strong"
            >
              <span className="type-label flex items-center gap-2 text-muted">
                <ArrowLeft
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Previous
              </span>
              <span className="type-panel mt-2 block text-lg">
                {previous.title}
              </span>
            </Link>
            <Link
              href={`/work/${next.id}`}
              className="ticks group rounded-sharp border border-line bg-surface p-5 text-right transition-colors duration-150 hover:border-line-strong"
            >
              <span className="type-label flex items-center justify-end gap-2 text-muted">
                Next
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="type-panel mt-2 block text-lg">{next.title}</span>
            </Link>
          </div>
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}
