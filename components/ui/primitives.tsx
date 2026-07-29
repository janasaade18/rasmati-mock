import { cn } from "@/lib/utils";

/** Editorial section eyebrow: small uppercase tracked label. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("eyebrow block", className)}>{children}</span>;
}

/** Thin divider line. */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline", className)} role="separator" />;
}

/** Section heading with optional eyebrow and centered option. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.08] text-balance">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-muted text-[0.95rem] leading-relaxed text-pretty">
          {intro}
        </p>
      )}
    </div>
  );
}

/** Loading shimmer block. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-greige/70", className)} />;
}

/** Minimal spinner. */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-[1.5px] border-current border-t-transparent",
        className
      )}
      aria-label="Loading"
    />
  );
}

/** Star rating display. */
export function Stars({
  rating = 0,
  className,
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-[2px] text-espresso", className)}
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          className={i <= Math.round(rating) ? "fill-current" : "fill-current opacity-25"}
          aria-hidden
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
