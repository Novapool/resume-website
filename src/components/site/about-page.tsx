// src/components/site/about-page.tsx
// Waypoint 01 — the lush origin world.
"use client";

import { useState } from "react";
import Image from "next/image";
import HudPage from "@/components/hud/HudPage";
import {
  LabeledPanel,
  LandingHeader,
  Panel,
  Section,
} from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import { BEYOND_TECH, BIO, PROFILE, WORKING_STYLE } from "@/data/profile";

const planet = PLANET.about;

export default function AboutPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <HudPage planet={planet}>
      <div className="hud-reveal">
        <LandingHeader
          planet={planet}
          title="About"
          intro="Origin world. Computer Science at Michigan State with an Economics minor, an IT desk at Delta Dental, and a long-running habit of building things that run in real time."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section label="// IDENTITY" title="Who's flying this thing">
          <div className="hud-identity">
            <Panel>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(var(--planet-rgb),.4)",
                }}
              >
                <Image
                  src={PROFILE.photo}
                  alt="Laith Assaf"
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="hud-label" style={{ marginTop: 12 }}>
                CREW · 01
              </div>
              <div className="hud-h3" style={{ marginTop: 4 }}>
                {PROFILE.name}
              </div>
            </Panel>

            <LabeledPanel label="// PERSONNEL FILE">
              <div className="hud-body">
                {BIO.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <div
                style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}
              >
                <a
                  className="hud-btn"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB ▸
                </a>
                <a
                  className="hud-btn"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINKEDIN ▸
                </a>
                <a className="hud-btn" href={`mailto:${PROFILE.email}`}>
                  EMAIL ▸
                </a>
              </div>
            </LabeledPanel>
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".16s" }}>
        <Section label="// PROFILE" title="How I work">
          <div className="hud-grid2">
            {WORKING_STYLE.map((entry) => (
              <LabeledPanel key={entry.label} label={`// ${entry.label}`}>
                <p className="hud-body">{entry.body}</p>
              </LabeledPanel>
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".24s" }}>
        <Section label="// SURFACE SURVEY" title="Beyond tech">
          <div className="hud-grid3">
            {BEYOND_TECH.map((entry) => (
              <LabeledPanel key={entry.label} label={`// ${entry.label}`}>
                <p className="hud-body">{entry.body}</p>
              </LabeledPanel>
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".32s" }}>
        <Section label="// DOSSIER" title="Resume">
          <Panel>
            <div className="hud-panel-head">
              <span className="hud-label">RESUME.PDF · FULL RECORD</span>
              <button
                className="hud-btn"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? "COLLAPSE ▴" : "EXPAND ▾"}
              </button>
            </div>
            <iframe
              src={PROFILE.resume}
              title="Resume preview"
              style={{
                width: "100%",
                height: expanded ? "min(1100px, 140vh)" : 460,
                border: "1px solid rgba(var(--planet-rgb),.24)",
                borderRadius: 2,
                background: "rgba(4,6,12,.6)",
                transition: "height .3s ease",
              }}
            />
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
          </Panel>
        </Section>
      </div>
    </HudPage>
  );
}
