import { renderOgImage } from "@/lib/og";

export const alt = "Laith Assaf, AI/ML software engineer: 93% RL win rate, 44 repos on his agent pipeline, 3 Delta Dental workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("home");
}
