// src/components/site/experience-page.tsx
// Waypoint 03 — bare rust world, lit by the black hole burning off its shoulder.
"use client";

import { useState } from "react";
import HudPage from "@/components/hud/HudPage";
import { LabeledPanel, LandingHeader, Section } from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { MISSION_LOG } from "@/data/timeline";
import { PROFILE } from "@/data/profile";

const planet = PLANET.experience;

/** How many log entries show before the visitor asks for the full record. */
const PREVIEW = 3;

export default function ExperiencePage() {
  const [full, setFull] = useState(false);
  const entries = full ? MISSION_LOG : MISSION_LOG.slice(0, PREVIEW);

  return (
    <HudPage planet={planet}>
      <div className="hud-reveal">
        <LandingHeader
          planet={planet}
          title="Experience"
          intro="Mission log. Enterprise IT at Delta Dental, an earlier post at the MSU College of Osteopathic Medicine, and 8+ AI Club workshops delivered to 500+ attendees."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section label="// CURRENT POSTING" title="Delta Dental — PC Technician Intern">
          <div className="hud-grid2">
            <LabeledPanel label="// ONSITE SUPPORT TEAM" meta={<span className="hud-label">2026 — PRESENT</span>}>
              <div className="hud-body">
                <ul>
                  <li>
                    Deployed and configured 150+ workstations across a new
                    corporate office buildout
                  </li>
                  <li>
                    Building an automated ticket-creation workflow in Power
                    Automate to streamline IT operations
                  </li>
                  <li>
                    Day-to-day endpoint support across Active Directory and
                    Intune
                  </li>
                </ul>
              </div>
            </LabeledPanel>
            <LabeledPanel label="// MSU AI CLUB" meta={<span className="hud-label">2025 — PRESENT</span>}>
              <div className="hud-body">
                <ul>
                  <li>Workshop Coordinator on the club board</li>
                  <li>8+ workshops delivered to a combined 500+ attendees</li>
                  <li>
                    Won MHacks 2025 with SoundSense against 300+ participants
                  </li>
                </ul>
              </div>
            </LabeledPanel>
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".16s" }}>
        <Section label="// MISSION LOG" title="The route so far">
          <ol className="hud-log">
            {entries.map((entry) => (
              <li key={entry.date + entry.title} className="hud-log-entry">
                <div className="hud-log-marker" aria-hidden />
                <div className="hud-log-date hud-label">{entry.date}</div>
                <div className="hud-panel hud-log-panel">
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

          <div style={{ marginTop: 22 }}>
            <button
              className="hud-btn"
              onClick={() => setFull((v) => !v)}
              aria-expanded={full}
            >
              {full
                ? "COLLAPSE LOG ▴"
                : `LOAD FULL LOG · ${MISSION_LOG.length - PREVIEW} MORE ▾`}
            </button>
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".24s" }}>
        <Section label="// RECORD" title="Full service record">
          <LabeledPanel label="// RESUME.PDF">
            <p className="hud-body">
              Every posting, project, and credential in one file.
            </p>
            <div style={{ marginTop: 16 }}>
              <a
                className="hud-btn hud-btn-solid"
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD DOSSIER ▸
              </a>
            </div>
          </LabeledPanel>
        </Section>
      </div>
    </HudPage>
  );
}
