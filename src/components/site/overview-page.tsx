// src/components/site/overview-page.tsx
// The flat, no-flight view of the system: everything the four worlds hold,
// on one page, for visitors who'd rather read than fly. Uses the shared HUD
// chrome with the neutral cyan accent instead of landing on a planet.
import Link from "next/link";
import HudPage from "@/components/hud/HudPage";
import PlanetBody from "@/components/hud/PlanetBody";
import { LabeledPanel, Panel, Section, Tags, NewTab } from "@/components/hud/panels";
import { PLANETS, waypointNo } from "@/lib/planets";
import { FEATURED_PROJECTS, HACKATHONS, PROJECTS } from "@/data/projects";
import { PROFILE, SKILLS } from "@/data/profile";
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
        <div className="hud-hero-actions">
          {/* the bar already carries Home and Résumé; these are the two
              things a reader of the flat view came to do */}
          <Link href="/projects" className="hud-btn hud-btn-solid">
            SEE THE PROJECTS
          </Link>
          <a className="hud-btn" href={`mailto:${PROFILE.email}`}>
            EMAIL ME
          </a>
          {/* the address itself, for machines with no mail handler */}
          <span className="hud-hero-email">{PROFILE.email}</span>
        </div>
      </header>

        <Section title="Selected work">
          <div className="hud-grid3">
            {/* the figures already lead this page's proof row, so each card
                is the way into its build instead of a second telling */}
            {FEATURED_PROJECTS.map((project) => (
              <Link
                key={project.code}
                href={`/projects#${project.code.toLowerCase()}`}
                className="hud-card-link"
              >
                <Panel className="hud-channel">
                  <h3 className="hud-h3">{project.title}</h3>
                  <div className="hud-label" style={{ marginTop: 6 }}>
                    {project.kind}
                  </div>
                  <p className="hud-project-pitch">{project.tagline}</p>
                </Panel>
              </Link>
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
        <Section title="Fly the four worlds">
          <div className="hud-grid2">
            {PLANETS.map((planet) => (
              <Link
                key={planet.id}
                href={planet.href}
                className="hud-card-link"
                // the card's text is a teaser; the link's name is its action
                aria-label={`Open ${planet.label}`}
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

        {/* the reader's page closes on its actions, not on a tag cloud */}
        <div className="hud-actions hud-overview-close">
          <a className="hud-btn hud-btn-solid" href={`mailto:${PROFILE.email}`}>
            EMAIL ME
          </a>
          <a
            className="hud-btn"
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            RÉSUMÉ
            <NewTab />
          </a>
          <a
            className="hud-btn"
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
            <NewTab />
          </a>
          <a
            className="hud-btn"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
            <NewTab />
          </a>
        </div>
    </HudPage>
  );
}
