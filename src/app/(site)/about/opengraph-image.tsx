import { renderOgImage } from "@/lib/og";

export const alt = "About Laith Assaf: CS (AI/ML) at Michigan State, class of 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("about");
}
