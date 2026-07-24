// src/components/site/contact-page.tsx
// Waypoint 04 — the small bioluminescent moon. Low stakes: open a channel.
import HudPage from "@/components/hud/HudPage";
import { LandingHeader, Panel, Section } from "@/components/hud/panels";
import ContactForm from "@/components/site/contact-form";
import { PLANET } from "@/lib/planets";
import { PROFILE } from "@/data/profile";

const planet = PLANET.contact;

const CHANNELS = [
  {
    label: "EMAIL",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    note: "Fastest route.",
  },
  {
    label: "LINKEDIN",
    value: "laith-assaf-",
    href: PROFILE.linkedin,
    note: "Professional channel.",
  },
  {
    label: "GITHUB",
    value: "Novapool",
    href: PROFILE.github,
    note: "The source of everything above.",
  },
];

export default function ContactPage() {
  return (
    <HudPage planet={planet}>
      <div className="hud-reveal">
        <LandingHeader
          planet={planet}
          title="Contact"
          intro="A small, quiet moon at the end of the route. Say hello about software, systems, or shipping something together — no formality required."
        />
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".08s" }}>
        <Section label="// CHANNELS" title="Where to reach me">
          <div className="hud-grid3">
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{ textDecoration: "none", display: "block" }}
              >
                <Panel className="hud-channel">
                  <span className="hud-label">{channel.label}</span>
                  <div
                    className="hud-h3"
                    style={{ marginTop: 8, wordBreak: "break-word" }}
                  >
                    {channel.value}
                  </div>
                  <p className="hud-body" style={{ marginTop: 8 }}>
                    {channel.note}
                  </p>
                  <div
                    style={{
                      marginTop: 14,
                      color: "var(--planet)",
                      fontSize: 10,
                      letterSpacing: ".22em",
                    }}
                  >
                    OPEN ▸
                  </div>
                </Panel>
              </a>
            ))}
          </div>
        </Section>
      </div>

      <div className="hud-reveal" style={{ animationDelay: ".16s" }}>
        <Section label="// COMMS" title="Send a message">
          <ContactForm />
        </Section>
      </div>
    </HudPage>
  );
}
