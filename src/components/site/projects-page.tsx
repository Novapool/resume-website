// src/components/site/projects-page.tsx
// Waypoint 02 — the crystalline world. Everything here was constructed.
import HudPage from "@/components/hud/HudPage";
import { LandingHeader, Panel, Section, Tags } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { PROJECTS } from "@/data/projects";

const planet = PLANET.projects;

export default function ProjectsPage() {
  return (
    <HudPage planet={planet}>
      <div className="hud-reveal">
        <LandingHeader
          planet={planet}
          title="Projects"
          intro="Constructed worlds. Real-time AI systems, backend infrastructure, and machine learning — award-winning hackathon builds alongside production-shaped tooling."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section
          label={`// CATALOGUE · ${PROJECTS.length} ENTRIES`}
          title="Everything built so far"
        >
          <div className="hud-catalogue">
            {PROJECTS.map((project) => (
              <Panel key={project.code} className="hud-project">
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
                <p className="hud-body" style={{ marginTop: 12 }}>
                  {project.description}
                </p>
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
            ))}
          </div>
        </Section>
      </div>
    </HudPage>
  );
}
