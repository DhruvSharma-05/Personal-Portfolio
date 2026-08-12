"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projectFilters, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";

const VISIBLE_FEATURES = 3;

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = project.features.slice(VISIBLE_FEATURES);
  const panelId = `${project.id}-features`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/50 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-accent-fill opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.13]"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
          <Icon name={project.icon} className="size-5" />
        </span>
        {project.status === "discontinued" ? (
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] tracking-wider text-muted uppercase">
            Archived
          </span>
        ) : null}
      </div>

      <p className="mt-6 font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
        {project.category.replace("-", " ")}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

      {project.metrics.length > 0 ? (
        <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-line bg-surface-2 p-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="font-mono text-[0.6rem] tracking-wider text-muted uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 truncate font-display text-base font-bold text-accent">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6">
        <h4 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
          What it does
        </h4>
        <ul className="mt-3 space-y-2">
          {project.features.slice(0, VISIBLE_FEATURES).map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-muted">
              <span
                aria-hidden="true"
                className="mt-2 size-1 shrink-0 rounded-full bg-accent-fill"
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
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2 overflow-hidden"
                >
                  {hidden.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 pt-2 text-sm text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent-fill"
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
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-70"
            >
              {expanded ? "Show less" : `+${hidden.length} more`}
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
        <p className="mt-6 rounded-xl border border-line bg-surface-2 p-4 text-sm text-muted">
          {project.note}
        </p>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* mt-auto pins the actions to the bottom so cards in a row line up. */}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Live demo
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        ) : null}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <GitHubIcon className="size-4" />
          <span>
            View code
            <span className="sr-only"> for {project.title} on GitHub</span>
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <Section id="work" className="border-t border-line">
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
        className="mb-10 flex flex-wrap gap-2"
      >
        {projectFilters.map((option) => {
          const isActive = filter === option.value;
          const count =
            option.value === "all"
              ? projects.length
              : projects.filter((p) => p.category === option.value).length;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={isActive}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                isActive
                  ? "border-accent text-accent-ink"
                  : "border-line text-muted hover:border-line-strong hover:text-text"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-fill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              {option.label}
              <span className="ml-2 font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
