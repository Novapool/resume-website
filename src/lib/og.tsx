// src/lib/og.tsx
// The 1200×630 link-preview card, drawn as the nav-computer: the top-bar
// ident, the page's headline, and the route's world rising as a limb in the
// corner. World routes take their planet's colour; home and /overview stay
// cyan, matching the "cyan only off-world" rule.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PAGES, type PageKey } from "@/data/pages";
import { PROFILE } from "@/data/profile";
import { PLANET, waypointNo, type PlanetId } from "@/lib/planets";
import { SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

const CYAN = { color: "#57e6c4", rgb: "87,230,196" };
const TEXT = "#f2f5fc";
const MUTED = "#b9c3d2";
const LABEL = "#9aa8ba";

// Fixed star field, so every render is identical. Kept to the margins and the
// right-hand sky so no star lands on the text column.
const STARS = [
  [140, 24, 1.5], [312, 604, 2], [560, 30, 2], [618, 600, 1], [700, 44, 1.5],
  [838, 48, 2], [880, 300, 1], [904, 210, 1.5], [980, 90, 1], [1050, 170, 2],
  [1130, 60, 1.5], [1160, 250, 1], [1010, 40, 1], [940, 380, 1], [24, 590, 1],
] as const;

function fonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  return Promise.all([
    readFile(join(dir, "space-grotesk-latin-400-normal.woff")),
    readFile(join(dir, "space-grotesk-latin-600-normal.woff")),
    readFile(join(dir, "ibm-plex-mono-latin-500-normal.woff")),
  ]);
}

export async function renderOgImage(key: PageKey) {
  const page = PAGES[key];
  const planet = key in PLANET ? PLANET[key as PlanetId] : null;
  const tint = planet ? { color: planet.color, rgb: planet.colorRgb } : CYAN;
  const sub = planet
    ? `${waypointNo(planet)} · ${planet.worldClass}`
    : key === "home"
      ? "NAV-COMPUTER"
      : "OVERVIEW · ALL SECTIONS";
  const [grotesk400, grotesk600, plexMono] = await fonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#06070e",
          fontFamily: "Space Grotesk",
          color: TEXT,
        }}
      >
        {STARS.map(([x, y, r]) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              background: "rgba(242,245,252,0.7)",
            }}
          />
        ))}

        {/* The world, rising in the lower right */}
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 300,
            width: 820,
            height: 820,
            borderRadius: "50%",
            backgroundImage: `radial-gradient(circle at 32% 26%, rgba(${tint.rgb},0.55), rgba(${tint.rgb},0.16) 46%, rgba(6,7,14,0.95) 78%)`,
            boxShadow: `0 0 90px rgba(${tint.rgb},0.35), inset 0 0 0 2px rgba(${tint.rgb},0.55)`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          {/* Top-bar ident */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 22,
                height: 22,
                background: tint.color,
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: "0.14em",
                }}
              >
                {PROFILE.name.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "IBM Plex Mono",
                  fontSize: 17,
                  letterSpacing: "0.12em",
                  color: LABEL,
                }}
              >
                {sub}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: page.ogHeadline.length > 16 ? 72 : 96,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {page.ogHeadline}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                lineHeight: 1.35,
                color: MUTED,
                maxWidth: 760,
              }}
            >
              {page.ogLine}
            </div>
            {key === "home" && (
              <div style={{ display: "flex", gap: 48, marginTop: 40 }}>
                {PROFILE.proof.map((p) => (
                  <div
                    key={p.label}
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 52,
                        lineHeight: 1,
                        color: tint.color,
                      }}
                    >
                      {p.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "IBM Plex Mono",
                        fontSize: 15,
                        letterSpacing: "0.08em",
                        color: LABEL,
                        maxWidth: 210,
                      }}
                    >
                      {p.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 17,
              letterSpacing: "0.12em",
              color: LABEL,
            }}
          >
            {SITE_URL.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: grotesk400, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: grotesk600, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono, weight: 500, style: "normal" },
      ],
    },
  );
}
