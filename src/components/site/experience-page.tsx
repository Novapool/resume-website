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
          intro="Mission log. LLM agents and endpoint support at Delta Dental, three years of IT at the MSU College of Osteopathic Medicine, and 8+ AI Club workshops delivered to 500+ attendees."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section label="// CURRENT POSTING" title="Delta Dental · PC Technician Intern">
          <div className="hud-grid2">
            <LabeledPanel label="// ONSITE SUPPORT TEAM · OKEMOS, MI" meta={<span className="hud-label">MAY 2026 – PRESENT</span>}>
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
              </div>
            </LabeledPanel>
            <LabeledPanel label="// MSU AI CLUB · WORKSHOP COORDINATOR" meta={<span className="hud-label">JAN 2025 – PRESENT</span>}>
              <div className="hud-body">
                <ul>
                  <li>
                    Delivered 8+ technical workshops on local LLM deployment
                    (Ollama, LM Studio), AI ethics, and ML fundamentals
                    (PyTorch) to 500+ attendees across 15 sessions, recording
                    90% retention and a 4.8/5 satisfaction score
                  </li>
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
