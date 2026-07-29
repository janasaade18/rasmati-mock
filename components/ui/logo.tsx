import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Rasmati monogram — the Arabic "ر" (ra), the first letter of "رسمتي".
 * Two variants: plain wordmark, and the bordered-square lockup.
 */
export function Monogram({
  className,
  framed = false,
}: {
  className?: string;
  framed?: boolean;
}) {
  const mark = (
    <span
      className={cn("font-display leading-none tracking-tight inline-flex items-baseline", className)}
      aria-hidden
    >
      ر
    </span>
  );

  if (!framed) return mark;

  return (
    <span className="inline-flex aspect-square items-center justify-center border border-current p-[0.42em]">
      {mark}
    </span>
  );
}

export function Logo({
  className,
  framed = false,
  wordmark = false,
  size = "md",
}: {
  className?: string;
  framed?: boolean;
  wordmark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link
      href="/"
      aria-label="Rasmati — home"
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      <Monogram framed={framed} className={sizes[size]} />
      {wordmark && (
        <span className="label-art text-[1rem] tracking-[0.04em] pt-[0.15em]">
          Rasmati
        </span>
      )}
    </Link>
  );
}
