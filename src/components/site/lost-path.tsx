// src/components/site/lost-path.tsx
// The 404's readout and recovery: the address the visitor actually asked for,
// so a typo in a forwarded link is visible at a glance, and, when that address
// is a near miss for one of the four worlds (/project, /experiance,
// /about/me), a direct way to that world ahead of the defaults.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLANETS, type Planet } from "@/lib/planets";
import { PROFILE } from "@/data/profile";
import { NewTab } from "@/components/hud/panels";

/** Edit distance, for one short path segment against a world's slug. */
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const keep = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = keep;
    }
  }
  return row[b.length];
}

/** The world a mistyped or stale path most likely meant, if any. */
function nearMiss(path: string): Planet | undefined {
  const head = path.split("/").filter(Boolean)[0]?.toLowerCase();
  if (!head) return undefined;
  let best: Planet | undefined;
  let bestD = Infinity;
  for (const p of PLANETS) {
    const slug = p.href.replace(/^\//, "");
    // a prefix either way (/project, /about-me) or a small typo (/experiance)
    const d = head.startsWith(slug) || slug.startsWith(head) ? 0 : distance(head, slug);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return bestD <= 2 && head.length >= 3 ? best : undefined;
}

/** A stale link to the résumé (/resume, /cv, /resume.pdf): the artefact that
 * gets forwarded inside companies, so the likeliest real 404. */
const wantsResume = (path: string) =>
  /^\/(resume|cv|documents)\b/i.test(path);

export default function LostPath() {
  const path = usePathname() ?? "";
  const resume = wantsResume(path);
  const meant = resume ? undefined : nearMiss(path);

  return (
    <>
      {path && (
        <p className="hud-label hud-lost-path">
          No chart for <span className="hud-lost-path-url">{path}</span>
        </p>
      )}
      {/* Home is already in the bar, so the body offers the place a stale
          link most likely meant, then the two broad ways back in */}
      <div className="hud-hero-actions">
        {resume && (
          <a
            className="hud-btn hud-btn-solid"
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            RÉSUMÉ
            <NewTab />
          </a>
        )}
        {meant && (
          <Link href={meant.href} className="hud-btn hud-btn-solid">
            OPEN {meant.name}
          </Link>
        )}
        {meant?.href !== "/projects" && (
          <Link
            href="/projects"
            className={`hud-btn${meant || resume ? "" : " hud-btn-solid"}`}
          >
            SEE THE PROJECTS
          </Link>
        )}
        <Link href="/overview" className="hud-btn">
          EVERY SECTION ON ONE PAGE
        </Link>
      </div>
    </>
  );
}
