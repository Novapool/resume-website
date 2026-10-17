import { renderOgImage } from "@/lib/og";

export const alt = "Laith Assaf's experience: LLM agents at Delta Dental, AI Club workshops, IT at MSU";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("experience");
}
