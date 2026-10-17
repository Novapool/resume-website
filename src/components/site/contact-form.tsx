// src/components/site/contact-form.tsx
// Comms console on the contact moon. NOT MOUNTED until M4 (see MILESTONES.md)
// gives it a real endpoint: it posts to /api/contact, which doesn't exist yet,
// so it can only ever report a failure — never a send that didn't happen.
"use client";

import { useState } from "react";
import { LabeledPanel } from "@/components/hud/panels";
import { PROFILE } from "@/data/profile";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LabeledPanel
      label="Send a message"
      meta={
        <span className="hud-label" style={{ color: "var(--planet)" }}>
          ◉ CHANNEL OPEN
        </span>
      }
    >
      {status === "success" ? (
        <div
          className="hud-body"
          style={{ padding: "18px 0" }}
          role="status"
          aria-live="polite"
        >
          <div className="hud-h3" style={{ color: "var(--planet)" }}>
            Message received
          </div>
          <p style={{ marginTop: 8 }}>
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="hud-form">
          <div className="hud-form-row">
            <label className="hud-form-field">
              <span className="hud-label">NAME</span>
              <input
                className="hud-field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="hud-form-field">
              <span className="hud-label">RETURN ADDRESS</span>
              <input
                className="hud-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="hud-form-field">
            <span className="hud-label">SUBJECT</span>
            <input
              className="hud-field"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>

          <label className="hud-form-field">
            <span className="hud-label">MESSAGE</span>
            <textarea
              className="hud-field"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </label>

          <button
            type="submit"
            className="hud-btn hud-btn-solid"
            disabled={isSubmitting}
            style={{ justifyContent: "center" }}
          >
            {isSubmitting ? "TRANSMITTING…" : "SEND TRANSMISSION"}
          </button>

          <p
            className="hud-body"
            style={{ color: "#ff9a8c" }}
            role="alert"
            aria-live="assertive"
          >
            {status === "error" && (
              <>
                Your message didn&apos;t send. Email me directly at{" "}
                <a className="hud-link" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>{" "}
                instead.
              </>
            )}
          </p>
        </form>
      )}
    </LabeledPanel>
  );
}
