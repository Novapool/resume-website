// src/components/site/projects-page.tsx
// Waypoint 02 — the crystalline world. Descend from the headline numbers to
// the three featured builds at the cloud deck, then to the full index below.
import type { CSSProperties } from "react";
import HudPage from "@/components/hud/HudPage";
import { Chevron, Orbit, Section, Tags } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import {
  FEATURED_PROJECTS,
  HACKATHONS,
  PROJECTS,
  type Project,
} from "@/data/projects";

const planet = PLANET.projects;

const rest = (list: Project[]) => list.filter((p) => !p.featured);



/** A project's own colour, confined to its facet edge and headline number. */
const accentOf = (project: Project) =>
  ({ "--accent-rgb": project.accent }) as CSSProperties;

export default function ProjectsPage() {
  return (
    <HudPage planet={planet}>
      <Orbit
        planet={planet}
        title="Projects"
        intro="Things I built that actually run."
        proof={[
          // outcomes from the debriefs that no card or row shows as its
          // headline number, so nothing is told twice on the page
          { value: "5,000", label: "eval battles gate each CI push" },
          { value: "95%", label: "audio classifier accuracy" },
          { value: "4", label: "live games on one server" },
        ]}
      />

      <Section zone="CLOUD DECK" title="Featured builds" deck>
        <div className="hud-featured">
          {/* the RL agent opens the deck at full width (data order) */}
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedProject key={project.code} project={project} />
          ))}
        </div>
      </Section>

      <Section zone="SURFACE INDEX" title="Everything else built so far">
        <IndexList projects={rest(PROJECTS)} />
      </Section>

      <Section zone="IMPACT SITES" title="Built against the clock">
        <IndexList projects={rest(HACKATHONS)} />
      </Section>
    </HudPage>
  );
}

function SourceLink({ project }: { project: Project }) {
  return project.github ? (
    <a
      className="hud-btn"
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View source: ${project.title}`}
    >
      VIEW SOURCE
    </a>
  ) : (
    <span className="hud-private">Private repository</span>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="hud-panel hud-feature" style={accentOf(project)}>
      <h3 className="hud-h3">{project.title}</h3>
      <div className="hud-label hud-kind">{project.kind}</div>
      {project.stat && (
        <div className="hud-project-stat">
          <span className="hud-project-stat-value">{project.stat.value}</span>
          <span className="hud-label">{project.stat.label}</span>
        </div>
      )}
      <p className="hud-project-pitch">{project.tagline}</p>
      <details className="hud-debrief">
        <summary className="hud-label">
          <Chevron className="hud-chevron-turn" />
          How it works
        </summary>
        <p className="hud-body">{project.description}</p>
      </details>
      <div className="hud-feature-foot">
        <Tags items={project.tags} />
        <SourceLink project={project} />
      </div>
    </article>
  );
}

/** The compact record: one row per build, the write-up one click away. */
function IndexList({ projects }: { projects: Project[] }) {
  return (
    <ol className="hud-index">
      {projects.map((project) => (
        <li key={project.code} className="hud-index-row" style={accentOf(project)}>
          <details>
            <summary>
              <span className="hud-index-mark" aria-hidden />
              <span className="hud-index-main">
                <span className="hud-index-title">{project.title}</span>
                <span className="hud-index-tagline">{project.tagline}</span>
              </span>
              {project.stat ? (
                <span className="hud-index-stat">
                  <b>{project.stat.value}</b> {project.stat.label}
                </span>
              ) : (
                <span className="hud-index-stat" />
              )}
              <Chevron className="hud-chevron-turn" />
            </summary>
            <div className="hud-index-detail">
              <div className="hud-label hud-kind">{project.kind}</div>
              <p className="hud-body">{project.description}</p>
              <div className="hud-feature-foot">
                <Tags items={project.tags} />
                <SourceLink project={project} />
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
