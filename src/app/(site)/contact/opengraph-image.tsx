import { PROFILE } from "@/data/profile";
import { renderOgImage } from "@/lib/og";

export const alt = `Contact Laith Assaf at ${PROFILE.email}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("contact");
}
