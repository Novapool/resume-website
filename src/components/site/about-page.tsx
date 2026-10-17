// src/components/site/about-page.tsx
// Waypoint 01 — the lush origin world. Orbit is who, led by the person
// rather than a figure row (every work number lives where it happened, on
// Projects and Experience); then how I work, the résumé, and life beyond tech.
"use client";

import { useState } from "react";
import Image from "next/image";
import HudPage from "@/components/hud/HudPage";
import {
  Chevron,
  LabeledPanel,
  Orbit,
  Panel,
  Section,
  sentence,
} from "@/components/hud/panels";
import { PLANET } from "@/lib/planets";
import {
  BEYOND_TECH,
  BIO,
  BOULDERING_CLIPS,
  GAMES,
  PROFILE,
  WORKING_STYLE,
} from "@/data/profile";

const planet = PLANET.about;

export default function AboutPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <HudPage planet={planet}>
      <Orbit
        planet={planet}
        title="About"
        intro="CS (AI/ML) senior at Michigan State. I build LLM agents and reinforcement learning systems."
      >
        <div className="hud-identity">
          <div className="hud-portrait">
            <Image
              src={PROFILE.photo}
              alt="Laith Assaf"
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div>
            <h2 className="hud-h2">Who&apos;s flying this thing</h2>
            <div className="hud-body" style={{ marginTop: 12 }}>
              {BIO.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="hud-actions">
              <a
                className="hud-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                className="hud-btn"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
              <a className="hud-btn" href={`mailto:${PROFILE.email}`}>
                EMAIL ME
              </a>
            </div>
          </div>
        </div>
      </Orbit>

      <Section zone="CANOPY" title="How I work" deck>
        <div className="hud-sheets">
          {WORKING_STYLE.map((entry) => (
            <LabeledPanel key={entry.label} label={sentence(entry.label)}>
              <p className="hud-body">{entry.body}</p>
            </LabeledPanel>
          ))}
        </div>
      </Section>

      <Section zone="UNDERSTORY" title="Résumé">
          <Panel>
            <iframe
              className="hud-resume-frame"
              // a preview only: keyboard users take the PDF link below, so
              // focus never gets lost inside the browser's PDF viewer
              tabIndex={-1}
              src={PROFILE.resume}
              title="Résumé preview"
              style={{
                width: "100%",
                height: expanded ? "min(1100px, 140vh)" : 460,
                border: "1px solid rgba(var(--planet-rgb),.24)",
                borderRadius: 2,
                background: "rgba(4,6,12,.6)",
                transition: "height .3s ease",
              }}
            />
            <div className="hud-actions">
              <a
                className="hud-btn hud-btn-solid"
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                RÉSUMÉ
              </a>
              <button
                className="hud-btn hud-resume-expand"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                <Chevron className={expanded ? "hud-chevron-up" : "hud-chevron-down"} />
                {expanded ? "SHOW LESS" : "SHOW THE WHOLE PAGE"}
              </button>
            </div>
          </Panel>
      </Section>
      <Section zone="CLEARING" title="Beyond tech">
          <div className="hud-sheets hud-sheets-3">
            {BEYOND_TECH.map((entry) => (
              <LabeledPanel key={entry.label} label={sentence(entry.label)}>
                <p className="hud-body">{entry.body}</p>
              </LabeledPanel>
            ))}
          </div>

          <h3 className="hud-h3 hud-subhead">Bouldering</h3>
          <div className="hud-videos">
            {/* one clip: the personal band stays a glimpse, not a gallery */}
            {BOULDERING_CLIPS.slice(0, 1).map((clip) => (
              <Panel key={clip.src}>
                <div className="hud-video-frame">
                  {clip.kind === "video" ? (
                    <video
                      aria-label={clip.caption}
                      src={clip.src}
                      poster={clip.poster}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={clip.src}
                      alt={clip.alt}
                      fill
                      sizes="350px"
                    />
                  )}
                </div>
                <p className="hud-body" style={{ marginTop: 12 }}>
                  {clip.caption}
                </p>
              </Panel>
            ))}
          </div>

          <h3 className="hud-h3 hud-subhead">What I&apos;m playing</h3>
          <div className="hud-games">
            {GAMES.filter((game) => game.line).map((game) => (
              <div key={game.title}>
                <div className="hud-game-cover">
                  <Image
                    src={game.cover}
                    alt={game.title}
                    fill
                    sizes="(max-width: 700px) 45vw, 200px"
                  />
                </div>
                <div className="hud-game-title">{game.title}</div>
                <p className="hud-body" style={{ marginTop: 4 }}>
                  {game.line}
                </p>
              </div>
            ))}
          </div>
      </Section>

    </HudPage>
  );
}
