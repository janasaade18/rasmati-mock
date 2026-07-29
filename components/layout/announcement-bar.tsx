"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/brand";

/**
 * A single, quiet, centred message that fades between announcements —
 * the restrained luxury treatment (no marquee, no marketing clutter).
 * Inherits its colour from the header chrome (ivory over hero, ink when solid).
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 600);
      return () => clearTimeout(swap);
    }, 5200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="flex h-9 items-center justify-center overflow-hidden px-4 text-center">
      <span
        aria-live="polite"
        className="label-art text-[0.95rem] transition-opacity duration-500"
        style={{ opacity: visible ? 0.85 : 0 }}
      >
        {ANNOUNCEMENTS[index]}
      </span>
    </div>
  );
}
