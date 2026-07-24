// src/components/hud/PlanetBody.tsx
// Renders a world from its `src/lib/planets.ts` definition. Used by the
// landing scene (perspective-scaled, one per waypoint) and by section pages
// (as a small inline "you are here" body), so both always agree.

import type { CSSProperties } from "react";
import type { Planet } from "@/lib/planets";
import "./hud.css";

/** Fill + texture bands, clipped to the sphere. */
function SphereLayers({
  planet,
  animate = true,
}: {
  planet: Planet;
  animate?: boolean;
}) {
  const { sphere } = planet;
  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        overflow: "hidden",
        background: sphere.fill,
        boxShadow: sphere.boxShadow,
      }}
    >
      {sphere.bands.map((band, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            inset: "-30%",
            background: band.background,
            animation: animate ? band.animation : undefined,
            mixBlendMode: band.blend,
            opacity: band.opacity,
          }}
        />
      ))}
    </span>
  );
}

const absolute = (style: CSSProperties): CSSProperties => ({
  position: "absolute",
  pointerEvents: "none",
  ...style,
});

export default function PlanetBody({
  planet,
  animate = true,
  backdrop = true,
}: {
  planet: Planet;
  /** Set false to freeze surface rotation (reduced motion, static previews). */
  animate?: boolean;
  /**
   * Layers that spill outside the sphere (Experience's accretion disk). Off for
   * inline chips, where they would run into neighbouring text.
   */
  backdrop?: boolean;
}) {
  const { sphere } = planet;
  return (
    <>
      {backdrop &&
        sphere.backdrop?.map((layer, i) => (
          <span key={`b${i}`} style={absolute(layer)} />
        ))}
      <span
        style={{
          position: "absolute",
          inset: sphere.haloInset,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${sphere.halo},.5), rgba(${sphere.halo},0) 70%)`,
          filter: "blur(4px)",
          pointerEvents: "none",
        }}
      />
      <SphereLayers planet={planet} animate={animate} />
      {sphere.overlay?.map((layer, i) => (
        <span key={`o${i}`} style={absolute(layer)} />
      ))}
    </>
  );
}
