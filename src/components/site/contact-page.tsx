// src/components/site/contact-page.tsx
// Waypoint 04 — the small bioluminescent moon, and the end of the route. No
// atmosphere, so the descent is short: orbit drops straight onto the finale.
import HudPage from "@/components/hud/HudPage";
import { Orbit, Section } from "@/components/hud/panels";
import CopyEmail from "@/components/site/copy-email";
import { PLANET } from "@/lib/planets";
import { PROFILE } from "@/data/profile";

const planet = PLANET.contact;

export default function ContactPage() {
  return (
    <HudPage planet={planet}>
      <Orbit
        planet={planet}
        title="Contact"
        intro="Hiring for AI/ML or software engineering? I'm free for full-time work from May 2027."
      />

      <Section zone="SURFACE" title="The fastest way to reach me" deck>
        <div className="hud-panel hud-finale">
          <CopyEmail email={PROFILE.email} />
        </div>

        <ul className="hud-channels">
          <li>
            <a
              className="hud-channel-link"
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hud-channel-value">Message me on LinkedIn</span>
              <span className="hud-label">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              className="hud-channel-link"
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hud-channel-value">github.com/Novapool</span>
              <span className="hud-label">GitHub</span>
            </a>
          </li>
          <li>
            <a
              className="hud-channel-link"
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hud-channel-value">The full record, as a PDF</span>
              <span className="hud-label">Résumé</span>
            </a>
          </li>
        </ul>
      </Section>

      {/* The comms form stays unmounted until M4 wires it to a real endpoint;
          a form that drops messages is worse than no form. */}
    </HudPage>
  );
}
