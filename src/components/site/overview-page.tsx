// src/components/site/overview-page.tsx
// The flat, no-flight view of the system: everything the four worlds hold,
// on one page, for visitors who'd rather read than fly. Uses the shared HUD
// chrome with the neutral cyan accent instead of landing on a planet.
import Link from "next/link";
import HudPage from "@/components/hud/HudPage";
import PlanetBody from "@/components/hud/PlanetBody";
import { LabeledPanel, Panel, Section, Tags } from "@/components/hud/panels";
import { PLANETS, waypointNo } from "@/lib/planets";
import { FEATURED_PROJECTS } from "@/data/projects";
import { PROFILE, SKILLS, SPECIALIZATIONS } from "@/data/profile";

export default function OverviewPage() {
  return (
    <HudPage>
      <header className="hud-hero hud-reveal">
        <div className="hud-eyebrow">
          <span className="hud-dot" />
          SYSTEM OVERVIEW · 04 WORLDS CHARTED
        </div>
        <h1 className="hud-hero-title">{PROFILE.name}</h1>
        <div className="hud-hero-teaser">
          {PROFILE.tagline}. I build real-time AI systems and high-performance
          backends — currently the open-source Ember framework and the Bonfire
          party-game platform.
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/" className="hud-btn hud-btn-solid">
            ENGAGE FLIGHT ▸
          </Link>
          <a
            className="hud-btn"
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOSSIER ▸
          </a>
        </div>
      </header>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section label="// CHART" title="The four worlds">
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
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".16s" }}>
        <Section label="// SPECIALIZATION" title="What I build">
          <div className="hud-grid3">
            {SPECIALIZATIONS.map((entry) => (
              <LabeledPanel
                key={entry.title}
                label={`// ${entry.title.toUpperCase()}`}
              >
                <p className="hud-body">{entry.body}</p>
              </LabeledPanel>
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".24s" }}>
        <Section label="// FEATURED" title="Selected work">
          <div className="hud-grid2">
            {FEATURED_PROJECTS.map((project) => (
              <LabeledPanel key={project.code} label={`// ${project.code}`}>
                <h3 className="hud-h3">{project.title}</h3>
                <div className="hud-label" style={{ marginTop: 6 }}>
                  {project.kind}
                </div>
                <p className="hud-body" style={{ marginTop: 12 }}>
                  {project.description}
                </p>
                <div style={{ marginTop: 16 }}>
                  <Link href="/projects" className="hud-btn">
                    FULL CATALOGUE ▸
                  </Link>
                </div>
              </LabeledPanel>
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".32s" }}>
        <Section label="// LOADOUT" title="Technical skills">
          <div className="hud-grid2">
            {SKILLS.map((group) => (
              <LabeledPanel
                key={group.category}
                label={`// ${group.category.toUpperCase()}`}
              >
                <Tags items={group.skills} />
              </LabeledPanel>
            ))}
          </div>
        </Section>
      </div>
    </HudPage>
  );
}
