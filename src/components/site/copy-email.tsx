// src/components/site/copy-email.tsx
// The contact finale: the address itself, large, as a mailto link, with a
// copy control beside it. If the Clipboard API is unavailable (insecure
// context, denied permission) it says so and the link still works.
"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const reset = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(reset.current), []);

  const copy = async () => {
    // a new click always starts from a clean slate, so an earlier timer
    // never cuts this one's message short
    window.clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      reset.current = window.setTimeout(() => setState("idle"), 2400);
    } catch {
      // the recovery hint stays until the next click: it has to be read
      // and acted on, not just glimpsed
      setState("failed");
    }
  };

  return (
    <div className="hud-email">
      <a className="hud-email-address" href={`mailto:${email}`}>
        {email}
      </a>
      <div className="hud-actions">
        <a className="hud-btn hud-btn-solid" href={`mailto:${email}`}>
          EMAIL ME
        </a>
        <button type="button" className="hud-btn" onClick={copy}>
          {state === "copied" ? "COPIED" : "COPY ADDRESS"}
        </button>
        <span className="hud-email-status" role="status" aria-live="polite">
          {state === "copied" && "Address copied to your clipboard."}
          {state === "failed" && "Couldn't copy here. Select the address above instead."}
        </span>
      </div>
    </div>
  );
}
