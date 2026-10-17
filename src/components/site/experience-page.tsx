// src/components/site/experience-page.tsx
// Waypoint 03 — bare rust world, lit by the black hole burning off its shoulder.
// Descend past the current postings (hard rust plates) into the strata of the
// mission log, newest layer on top. The log's lines never retell a plate.
import HudPage from "@/components/hud/HudPage";
import { Chevron, LabeledPanel, Orbit, Section } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { MISSION_LOG } from "@/data/timeline";
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

      <Section zone="DUST LINE" title="Current postings" deck>
        <div className="hud-plates">
          <LabeledPanel label="Delta Dental · PC Technician Intern" meta={<span className="hud-label">MAY 2026 – NOW</span>}>
              <div className="hud-panel-sub">Onsite support team · Okemos, MI</div>
              <div className="hud-body">
                <ul>
                  <li>
                    Built LLM agents in Copilot Studio and AI Builder across 3
                    Power Automate workflows, converting natural-language
                    requests into structured records using live Ivanti asset
                    and user data retrieved via API
                  </li>
                  <li>
                    Shipped an asset management workflow saving 5 minutes per
                    run and $11K annually, and am piloting an agent that parses
                    incoming emails to update tickets, coordinating both
                    rollouts across multiple IT teams
                  </li>
                  <li>
                    Imaged and configured 100+ endpoints through Ivanti,
                    enrolling each device in Active Directory and Intune so it
                    reached its user with policy applied, and backing up and
                    wiping each drive at the end of the device lifecycle
                  </li>
                </ul>
                <details className="hud-debrief">
                  <summary className="hud-label">
                    <Chevron className="hud-chevron-turn" />
                    More from this role
                  </summary>
                  <ul>
                    <li>
                      Resolved 100+ tickets spanning laptop upgrades and hardware
                      faults, restoring locked-out users through Azure BitLocker
                      recovery and CyberArk credential access, and tracing
                      network port issues with Cisco DDI
                    </li>
                    <li>
                      Set up 400+ workstations (desks, monitors, docking
                      stations, and peripherals) after a corporate office
                      renovation
                    </li>
                  </ul>
                </details>
              </div>
            </LabeledPanel>
            <LabeledPanel label="MSU AI Club · Workshop Coordinator" meta={<span className="hud-label">JAN 2025 – NOW</span>}>
              <div className="hud-body">
                <ul>
                  <li>
                    Delivered 8+ technical workshops on local LLM deployment
                    (Ollama, LM Studio), AI ethics, and ML fundamentals
                    (PyTorch) to 500+ attendees across 15 sessions, recording
                    90% retention and a 4.8/5 satisfaction score
                  </li>
                </ul>
                <details className="hud-debrief">
                  <summary className="hud-label">
                    <Chevron className="hud-chevron-turn" />
                    More from this role
                  </summary>
                  <ul>
                    <li>
                      Built and taught a multi-agent orchestrator demo
                      coordinating Scope, Architecture, Builder, and Reviewer
                      agents to plan and generate a web application from a
                      one-line idea, used as live workshop material
                    </li>
                    <li>
                      As Project Lead (Jan to May 2025), led a 4-student team
                      building an Academic Performance Predictor on the GPT-4
                      API, shipping course-level predictions across 50+ courses
                    </li>
                  </ul>
                </details>
              </div>
            </LabeledPanel>
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

          <div className="hud-actions">
            <a
              className="hud-btn hud-btn-solid"
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              RÉSUMÉ
            </a>
          </div>
      </Section>
    </HudPage>
  );
}
