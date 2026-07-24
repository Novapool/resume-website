// src/components/site/contact-form.tsx
// Comms console on the contact moon. Submission is still simulated — see M4 in
// MILESTONES.md for wiring it to a real endpoint.
"use client";

import { useState } from "react";
import { LabeledPanel } from "@/components/hud/panels";

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
    try {
      // Placeholder for the real transmit call.
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      label="// TRANSMIT"
      meta={
        <span className="hud-label" style={{ color: "var(--planet)" }}>
          ◉ CHANNEL OPEN
        </span>
      }
    >
      {status === "success" ? (
        <div className="hud-body" style={{ padding: "18px 0" }}>
          <div className="hud-h3" style={{ color: "var(--planet)" }}>
            {"// MESSAGE RECEIVED"}
          </div>
          <p style={{ marginTop: 8 }}>
            Thanks for reaching out — I&apos;ll get back to you soon.
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
            {isSubmitting ? "TRANSMITTING…" : "SEND TRANSMISSION ▸"}
          </button>

          {status === "error" && (
            <p className="hud-body" style={{ color: "#ff9a8c" }}>
              {"// TRANSMISSION FAILED — please try again."}
            </p>
          )}
        </form>
      )}
    </LabeledPanel>
  );
}
