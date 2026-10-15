// src/components/site/projects-page.tsx
// Waypoint 02 — the crystalline world. Everything here was constructed.
import type { CSSProperties } from "react";
import HudPage from "@/components/hud/HudPage";
import { LandingHeader, Panel, Section, Tags } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { HACKATHONS, PROJECTS, type Project } from "@/data/projects";

const planet = PLANET.projects;

export default function ProjectsPage() {
  return (
    <HudPage planet={planet}>
      <div className="hud-reveal">
        <LandingHeader
          planet={planet}
          title="Projects"
          intro="Constructed worlds. Reinforcement learning, LLM agents, real-time systems, and the hackathon builds along the way."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section
          label={`// CATALOGUE · ${PROJECTS.length} ENTRIES`}
          title="Everything built so far"
        >
          <div className="hud-catalogue">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.code} project={project} />
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".14s" }}>
        <Section
          label={`// HACKATHONS · ${HACKATHONS.length} ENTRIES`}
          title="Built against the clock"
        >
          <div className="hud-catalogue">
            {HACKATHONS.map((project) => (
              <ProjectCard key={project.code} project={project} />
            ))}
          </div>
        </Section>
      </div>
    </HudPage>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Each card wears its project's own colour: the HUD panel, tags and button
  // all read --planet, so overriding it here re-tints the whole card.
  const accent = {
    "--planet": `rgb(${project.accent})`,
    "--planet-rgb": project.accent,
  } as CSSProperties;

  return (
    <Panel className="hud-project" style={accent}>
      <div className="hud-panel-head">
        <span className="hud-label">{project.code}</span>
        {project.featured && (
          <span className="hud-label" style={{ color: "var(--planet)" }}>
            ◆ FEATURED
          </span>
        )}
      </div>
      <h3 className="hud-h3">{project.title}</h3>
      <div
        className="hud-label"
        style={{ marginTop: 6, letterSpacing: ".14em" }}
      >
        {project.kind}
      </div>
      <p className="hud-project-pitch">{project.tagline}</p>
      {project.stat && (
        <div className="hud-project-stat">
          <span className="hud-project-stat-value">{project.stat.value}</span>
          <span className="hud-label">{project.stat.label}</span>
        </div>
      )}
      <details className="hud-debrief">
        <summary className="hud-label">Full debrief</summary>
        <p className="hud-body">{project.description}</p>
      </details>
      <div style={{ marginTop: 16 }}>
        <Tags items={project.tags} />
      </div>
      {/* margin-top:auto in .hud-project keeps these aligned */}
      <div>
        {project.github ? (
          <a
            className="hud-btn"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW SOURCE ▸
          </a>
        ) : (
          <button className="hud-btn" disabled>
            PRIVATE REPOSITORY
          </button>
        )}
      </div>
    </Panel>
  );
}
