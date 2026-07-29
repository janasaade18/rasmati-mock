"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/lib/brand";
import { Monogram } from "@/components/ui/logo";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[80] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-shadow/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <nav
        className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <Monogram className="text-xl" />
          <button onClick={onClose} aria-label="Close menu" className="p-1">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 py-8">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-line-soft py-4 font-display text-2xl"
                  style={{
                    animation: open
                      ? `fade-up 0.6s var(--ease-luxe) ${0.05 * i + 0.1}s both`
                      : undefined,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-10 text-sm">
            <Link href="/wishlist" onClick={onClose} className="link-underline label-art w-fit text-base">
              Wishlist
            </Link>
            <Link href="/cart" onClick={onClose} className="link-underline label-art w-fit text-base">
              Cart
            </Link>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline label-art mt-6 w-fit text-base text-muted"
            >
              Instagram
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
