"use client";

import { useState } from "react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // No confirmed contact/leads endpoint on the backend yet — hand off to a
    // pre-filled mailto so the message is never lost.
    const subject = encodeURIComponent(`Rasmati — message from ${form.name || "the website"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-sm leading-relaxed text-muted">
        Your email client should have opened with your message ready to send.
        Prefer WhatsApp? Reach us at {BRAND.phone}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <input
        required
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
      />
      <Button type="submit" className="w-fit">
        Send Message
      </Button>
    </form>
  );
}
