// src/components/site/overview-page.tsx
// The flat, no-flight view of the system: everything the four worlds hold,
// on one page, for visitors who'd rather read than fly. Uses the shared HUD
// chrome with the neutral cyan accent instead of landing on a planet.
import Link from "next/link";
import HudPage from "@/components/hud/HudPage";
import PlanetBody from "@/components/hud/PlanetBody";
import { LabeledPanel, Panel, Section, Tags } from "@/components/hud/panels";
import { PLANETS, waypointNo } from "@/lib/planets";
import { FEATURED_PROJECTS, HACKATHONS, PROJECTS } from "@/data/projects";
import { PROFILE, SKILLS, SPECIALIZATIONS } from "@/data/profile";
import { MISSION_LOG } from "@/data/timeline";

// every role on the record, newest first, with its outcome in one line
const ROLES = MISSION_LOG.filter((entry) => entry.role && entry.summary);

export default function OverviewPage() {
  return (
    <HudPage>
      <header className="hud-hero">
        <h1 className="hud-hero-title">{PROFILE.name}</h1>
        <div className="hud-hero-teaser">
          <p>{PROFILE.pitch}</p>
          <p className="hud-label" style={{ marginTop: 10 }}>
            {PROFILE.tagline}
          </p>
        </div>
        <dl className="hud-proof">
          {PROFILE.proof.map((p) => (
            <div key={p.label}>
              <dt className="hud-label">{p.label}</dt>
              <dd className="hud-proof-value">{p.value}</dd>
            </div>
          ))}
        </dl>
        <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          {/* the bar already carries Home and Résumé; these are the two
              things a reader of the flat view came to do */}
          <Link href="/projects" className="hud-btn hud-btn-solid">
            SEE THE PROJECTS
          </Link>
          <a className="hud-btn" href={`mailto:${PROFILE.email}`}>
            EMAIL ME
          </a>
        </div>
      </header>

        <Section title="The four worlds">
          <div className="hud-grid2">
            {PLANETS.map((planet) => (
              <Link
                key={planet.id}
                href={planet.href}
                style={{ textDecoration: "none", display: "block" }}
              >
                <Panel className="hud-channel">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{ position: "relative", width: 64, height: 64, flex: "none" }}
                      aria-hidden
                    >
                      <PlanetBody planet={planet} backdrop={false} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span
                        className="hud-label"
                        style={{ color: planet.color }}
                      >
                        {`WAYPOINT ${waypointNo(planet)} · ${planet.worldClass}`}
                      </span>
                      <div className="hud-h3" style={{ marginTop: 6 }}>
                        {planet.label}
                      </div>
                    </div>
                  </div>
                  <p className="hud-body" style={{ marginTop: 14 }}>
                    {planet.teaser}
                  </p>
                </Panel>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="What I build">
          <div className="hud-grid3">
            {SPECIALIZATIONS.map((entry) => (
              <LabeledPanel
                key={entry.title}
                label={entry.title}
              >
                <p className="hud-body">{entry.body}</p>
              </LabeledPanel>
            ))}
          </div>
        </Section>

        <Section title="Selected work">
          <div className="hud-grid3">
            {FEATURED_PROJECTS.map((project) => (
              <LabeledPanel key={project.code} label={project.title}>
                <div className="hud-label" style={{ marginTop: 6 }}>
                  {project.kind}
                </div>
                {project.stat && (
                  <div className="hud-project-stat">
                    <span className="hud-project-stat-value">{project.stat.value}</span>
                    <span className="hud-label">{project.stat.label}</span>
                  </div>
                )}
                <p className="hud-project-pitch">{project.tagline}</p>
              </LabeledPanel>
            ))}
          </div>
          <div className="hud-actions">
            <Link href="/projects" className="hud-btn">
              {`ALL ${PROJECTS.length + HACKATHONS.length} BUILDS`}
            </Link>
          </div>
        </Section>

        <Section title="Where I've worked">
          <ol className="hud-strata">
            {ROLES.map((entry) => (
              <li key={entry.date} className="hud-stratum">
                <div className="hud-stratum-date">{entry.date}</div>
                <div className="hud-stratum-body">
                  <h3 className="hud-h3">{entry.role}</h3>
                  <p className="hud-body" style={{ marginTop: 6 }}>
                    {entry.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="hud-actions">
            <Link href="/experience" className="hud-btn">
              THE FULL RECORD
            </Link>
          </div>
        </Section>

        <Section title="Technical skills">
          <div className="hud-grid2">
            {SKILLS.map((group) => (
              <LabeledPanel
                key={group.category}
                label={group.category}
              >
                <Tags items={group.skills} />
              </LabeledPanel>
            ))}
          </div>
        </Section>
    </HudPage>
  );
}
