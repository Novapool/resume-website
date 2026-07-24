// src/components/site/space-navigator/Starfield.tsx
"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import type { RefObject } from "react";
import { STAR_LAYERS } from "./constants";

interface Twinkle {
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface Layer {
  shadow: string;
  size: number;
  twinkles: Twinkle[];
}

export interface StarfieldHandle {
  /** Push the layers outward from the vanishing point (0 = at rest). */
  setWarp: (warp: number) => void;
}

interface StarfieldProps {
  ref?: RefObject<StarfieldHandle | null>;
  reduced: boolean;
}

function buildLayers(vw: number, vh: number, reduced: boolean): Layer[] {
  return STAR_LAYERS.map((spec) => {
    const dots: string[] = [];
    for (let i = 0; i < spec.count; i++) {
      const x = (Math.random() * vw).toFixed(0);
      const y = (Math.random() * vh).toFixed(0);
      const blur = (Math.random() * 0.6).toFixed(1);
      const alpha = (spec.opacity * (0.5 + Math.random() * 0.5)).toFixed(2);
      dots.push(`${x}px ${y}px 0 ${blur}px rgba(222,236,255,${alpha})`);
    }

    const twinkles: Twinkle[] = [];
    if (spec.twinkle && !reduced) {
      for (let i = 0; i < 16; i++) {
        twinkles.push({
          x: Math.random() * vw,
          y: Math.random() * vh,
          duration: 2.2 + Math.random() * 3,
          delay: Math.random() * 3,
        });
      }
    }

    return { shadow: dots.join(","), size: spec.size, twinkles };
  });
}

/**
 * Three parallax star layers. Stars are generated on the client (they're
 * random, so they can't be server-rendered without a hydration mismatch) and
 * painted as one element's multi-value box-shadow.
 */
export default function Starfield({ ref, reduced }: StarfieldProps) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const layerEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const regenerate = () =>
      setLayers(buildLayers(window.innerWidth, window.innerHeight, reduced));
    regenerate();
    window.addEventListener("resize", regenerate);
    return () => window.removeEventListener("resize", regenerate);
  }, [reduced]);

  useImperativeHandle(ref, () => ({
    setWarp: (warp: number) => {
      layerEls.current.forEach((el, i) => {
        if (!el) return;
        const rate = STAR_LAYERS[i].rate;
        el.style.transform = `scale(${(1 + warp * rate).toFixed(4)})`;
      });
    },
  }));

  return (
    <>
      {STAR_LAYERS.map((spec, i) => (
        <div
          key={i}
          ref={(el) => {
            layerEls.current[i] = el;
          }}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
            transformOrigin: "50% 45%",
          }}
        >
          {layers[i] && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: layers[i].size,
                  height: layers[i].size,
                  borderRadius: "50%",
                  background: "#dfeaff",
                  boxShadow: layers[i].shadow,
                }}
              />
              {layers[i].twinkles.map((t, ti) => (
                <div
                  key={ti}
                  style={{
                    position: "absolute",
                    left: t.x.toFixed(0) + "px",
                    top: t.y.toFixed(0) + "px",
                    width: 2.4,
                    height: 2.4,
                    borderRadius: "50%",
                    background: "#fff",
                    animation: `sn-twinkle ${t.duration.toFixed(1)}s ease-in-out ${t.delay.toFixed(1)}s infinite`,
                  }}
                />
              ))}
            </>
          )}
        </div>
      ))}
    </>
  );
}
