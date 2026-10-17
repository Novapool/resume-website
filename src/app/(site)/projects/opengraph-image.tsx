import { renderOgImage } from "@/lib/og";

export const alt = "Laith Assaf's projects: an RL Pokémon agent, a 10-agent dev pipeline, a hackathon-winning audio classifier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("projects");
}
