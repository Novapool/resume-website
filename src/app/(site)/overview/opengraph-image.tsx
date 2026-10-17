import { renderOgImage } from "@/lib/og";

export const alt = "Laith Assaf's portfolio on one page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("overview");
}
