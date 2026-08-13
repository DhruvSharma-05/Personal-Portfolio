"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { projectFilters, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { PanelHead, Tag } from "@/components/ui/panel";
import { Section, SectionHeader } from "@/components/ui/section";

const VISIBLE_FEATURES = 3;

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = project.features.slice(VISIBLE_FEATURES);
  const panelId = `${project.id}-features`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="ticks flex flex-col rounded-sharp border border-line bg-surface transition-colors duration-300 hover:border-line-strong"
    >
      <PanelHead
        label={project.category.replace("-", " ")}
        trailing={project.status === "discontinued" ? "Archived" : undefined}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
            <Icon name={project.icon} className="size-5" />
          </span>
          <h3 className="type-wide-md text-2xl sm:text-3xl">{project.title}</h3>
        </div>

        <p className="mt-5 max-w-[62ch] leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Renders nothing when `metrics` is empty — that is the intended
            fallback for a project with no reproducible figures, not a gap. */}
        {project.metrics.length > 0 ? (
          <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-sharp border border-line bg-surface-2">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 px-3 py-3.5">
                <dt className="type-label truncate text-muted">
                  {metric.label}
                </dt>
                <dd
                  data-readout
                  className="type-panel mt-1.5 truncate text-base text-accent"
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-6">
          <h4 className="type-label text-muted">What it does</h4>
          <ul className="mt-3 space-y-2">
            {project.features.slice(0, VISIBLE_FEATURES).map((feature) => (
              <li key={feature} className="flex gap-3 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1 shrink-0 bg-accent-fill"
                />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {hidden.length > 0 ? (
            <>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.ul
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2 overflow-hidden"
                  >
                    {hidden.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 pt-2 text-sm text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 bg-accent-fill"
                        />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls={panelId}
                className="type-label mt-4 inline-flex items-center gap-1.5 text-accent transition-opacity duration-150 hover:opacity-70"
              >
                {expanded ? "Show less" : `${hidden.length} more`}
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </>
          ) : null}
        </div>

        {project.note ? (
          <p className="mt-6 rounded-sharp border-l-2 border-line-strong bg-surface-2 px-4 py-3 text-sm text-muted">
            {project.note}
          </p>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </ul>

        {/* mt-auto pins the actions to the bottom so cards in a row line up. */}
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 rounded-sharp bg-accent-fill px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity duration-150 hover:opacity-90"
            >
              Live demo
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sharp border border-line-strong px-5 py-2.5 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <GitHubIcon className="size-4" />
            <span>
              View code
              <span className="sr-only"> for {project.title} on GitHub</span>
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="work">
      <SectionHeader
        id="work"
        index="03"
        title="Selected"
        accent="work"
        lede="Data pipelines, models and dashboards — each one shipped, each one on GitHub."
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {projectFilters.map((option) => {
          const isActive = filter === option.value;
          const count =
            option.value === "all"
              ? projects.length
              : projects.filter((p) => p.category === option.value).length;

          // `isolate` keeps the sliding `-z-10` fill inside the button's own
          // stacking context. Without it the fill drops behind the page and the
          // near-black label is left invisible against the dark ground.
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={isActive}
              className={`type-label relative isolate rounded-sharp border px-3.5 py-2.5 transition-colors duration-150 ${
                isActive
                  ? "border-accent-fill text-accent-ink"
                  : "border-line text-muted hover:border-line-strong hover:text-text"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-mark"
                  className="absolute inset-0 -z-10 bg-accent-fill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              {option.label}
              <span className="ml-2 opacity-60">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
