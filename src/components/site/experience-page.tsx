// src/components/site/experience-page.tsx
// Waypoint 03 — bare rust world, lit by the black hole burning off its shoulder.
// Descend past the role plates (hard rust plates) into the strata of the
// mission log, newest layer on top. The log's lines never retell a plate.
import HudPage from "@/components/hud/HudPage";
import { Chevron, LabeledPanel, Orbit, Section, NewTab } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { MISSION_LOG, ROLES } from "@/data/timeline";
import { PROFILE } from "@/data/profile";

const planet = PLANET.experience;

export default function ExperiencePage() {
  return (
    <HudPage planet={planet}>
      <Orbit
        planet={planet}
        title="Experience"
        intro="Agents and endpoints at Delta Dental, three years of IT at MSU."
        proof={[
          { value: "$11K", label: "saved a year by one workflow" },
          { value: "500+", label: "workshop attendees" },
          { value: "100+", label: "endpoints imaged" },
        ]}
      />

      <Section zone="DUST LINE" title="Where I've worked" deck>
        <div className="hud-plates">
          {ROLES.map((role) => (
            <LabeledPanel
              key={role.label}
              label={role.label}
              meta={<span className="hud-label">{role.dates}</span>}
            >
              {role.sub && <div className="hud-panel-sub">{role.sub}</div>}
              <div className="hud-body">
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {role.more && (
                  <details className="hud-debrief">
                    <summary className="hud-label">
                      <Chevron className="hud-chevron-turn" />
                      More from this role
                    </summary>
                    <ul>
                      {role.more.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </LabeledPanel>
          ))}
        </div>
      </Section>

      <Section zone="STRATA" title="The route so far">
          <ol className="hud-strata">
            {MISSION_LOG.map((entry) => (
              <li key={entry.date + entry.title} className="hud-stratum">
                <div className="hud-stratum-date">{entry.date}</div>
                <div className="hud-stratum-body">
                  <h3 className="hud-h3">{entry.title}</h3>
                  {entry.role && (
                    <div className="hud-label" style={{ marginTop: 6 }}>
                      {entry.role}
                    </div>
                  )}
                  <div className="hud-body" style={{ marginTop: 10 }}>
                    <ul>
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* outline, not solid: the touchdown below is the page's ending,
              and the bar's amber Résumé is always on screen */}
          <div className="hud-actions">
            <a
              className="hud-btn"
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              RÉSUMÉ
              <NewTab />
            </a>
          </div>
      </Section>
    </HudPage>
  );
}
