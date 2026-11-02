// src/components/site/project-evaluation.tsx
// A project's real evaluation, drawn as small multiples: one panel per
// scripted opponent, one bar per training stage, every bar labelled with its
// value and sample size. Static (no motion), one hue (the project's own), and
// the full numbers with their source lines sit one click away as a table.
import { useId } from "react";
import { Chevron } from "@/components/hud/panels";
import type { Evaluation, WinRate } from "@/data/projects";

const OPPONENTS = [
  { key: "random", label: "vs RandomPlayerAI", short: "vs Random" },
  { key: "damageFirst", label: "vs DamageFirstAI", short: "vs DamageFirst" },
] as const;

const fmtPct = (r: WinRate) => `${r.pct.toFixed(1)}%`;
const fmtN = (n: number) => n.toLocaleString("en-US");

export default function ProjectEvaluation({ evaluation }: { evaluation: Evaluation }) {
  const { title, repo, commit, stages, caveats } = evaluation;
  // unique per figure, so a second evaluation never duplicates the id
  const titleId = useId();
  // ?plain=1 keeps GitHub's line anchors working on Markdown files too
  const sourceUrl = (r: WinRate) => {
    const [path, line] = r.source.split("#");
    return `${repo}/blob/${commit}/${path}?plain=1${line ? `#${line}` : ""}`;
  };

  return (
    <figure className="hud-eval" aria-labelledby={titleId}>
      <figcaption className="hud-eval-head">
        <span id={titleId} className="hud-eval-title">
          {title}
        </span>
        <span className="hud-label">Gen 1 random battles · n per bar</span>
      </figcaption>

      <div className="hud-eval-groups">
        {OPPONENTS.map((opp) => (
          <div key={opp.key} className="hud-eval-group">
            <div className="hud-label hud-eval-opp">{opp.label}</div>
            <ul className="hud-eval-rows">
              {stages.map((stage) => {
                const r = stage[opp.key];
                return (
                  <li key={stage.label} className="hud-eval-row">
                    <span className="hud-eval-stage">{stage.label}</span>
                    <span className="hud-eval-track" aria-hidden>
                      <span className="hud-eval-bar" style={{ width: `${r.pct}%` }} />
                    </span>
                    <span className="hud-eval-value">
                      <b>{fmtPct(r)}</b>
                      <span className="hud-eval-n">n={fmtN(r.n)}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="hud-eval-scale" aria-hidden>
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        ))}
      </div>

      <details className="hud-debrief hud-eval-sources">
        <summary className="hud-label">
          <Chevron className="hud-chevron-turn" />
          Sources and caveats
        </summary>
        <ul className="hud-eval-caveats">
          {caveats.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="hud-eval-table-wrap">
          <table className="hud-eval-table">
            <caption className="hud-label">
              Win rate by stage, linked to the log line it comes from
            </caption>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                {OPPONENTS.map((o) => (
                  <th key={o.key} scope="col">
                    {o.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr key={stage.label}>
                  <th scope="row">
                    {stage.label}
                    <span className="hud-eval-note">{stage.note}</span>
                  </th>
                  {OPPONENTS.map((o) => {
                    const r = stage[o.key];
                    return (
                      <td key={o.key}>
                        <a href={sourceUrl(r)} target="_blank" rel="noopener noreferrer">
                          {fmtPct(r)}
                        </a>
                        <span className="hud-eval-note">
                          {r.wins !== undefined
                            ? `${fmtN(r.wins)} / ${fmtN(r.n)}`
                            : `n=${fmtN(r.n)}`}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
