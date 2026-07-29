import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./primitives";

/**
 * Standard inner-page header. Sits directly below the sticky site header.
 * Use on shop, cart, checkout, legal and editorial pages for consistent rhythm.
 */
export function PageIntro({
  eyebrow,
  title,
  intro,
  breadcrumb,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumb?: { label: string; href: string }[];
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "container-luxe pt-16 pb-12 lg:pt-24 lg:pb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {breadcrumb && breadcrumb.length > 0 && (
        <nav
          className={cn(
            "label-art mb-6 flex items-center gap-2 text-[0.95rem] text-muted",
            align === "center" && "justify-center"
          )}
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              <Link href={b.href} className="transition-colors hover:text-ink">
                {b.label}
              </Link>
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <Eyebrow className={cn("mb-5", align === "center" && "mx-auto")}>{eyebrow}</Eyebrow>
      )}
      <h1 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] text-balance">
        {title}
      </h1>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[0.92rem] leading-relaxed text-muted text-pretty",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
