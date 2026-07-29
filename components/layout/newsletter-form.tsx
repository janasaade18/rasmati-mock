"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const dark = variant === "dark";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className={cn("text-sm", dark ? "text-ivory/80" : "text-muted", className)}>
        Thank you — welcome to Rasmati. Look out for the first note in your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "flex items-center gap-3 border-b pb-2",
        dark ? "border-ivory/30" : "border-ink/30",
        className
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={cn(
          "w-full bg-transparent py-1 text-sm outline-none",
          dark ? "text-ivory placeholder:text-ivory/40" : "text-ink placeholder:text-muted"
        )}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="shrink-0 transition-transform duration-500 hover:translate-x-1"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
