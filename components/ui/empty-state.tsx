import { ButtonLink } from "./button";
import { Monogram } from "./logo";
import { cn } from "@/lib/utils";

/**
 * Editorial empty / unavailable state. Reads as intentional, never broken —
 * used when the backend has no products yet, a page has no matches, etc.
 */
export function EmptyState({
  eyebrow,
  title,
  body,
  cta,
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-24 text-center lg:py-32",
        className
      )}
    >
      <Monogram className="mb-8 text-4xl text-espresso/30" />
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="max-w-xl font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight text-balance">
        {title}
      </h2>
      {body && (
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted text-pretty">
          {body}
        </p>
      )}
      {cta && (
        <div className="mt-9">
          <ButtonLink href={cta.href} variant="outline">
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
