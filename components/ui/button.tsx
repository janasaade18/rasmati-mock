import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

// No rectangles: every button is an asymmetric "paint-daub" shape (see
// `.paint-shape` in global.css) run through the shared #roughen SVG filter
// so its edges wobble like something cut or painted by hand, not a
// vector-perfect box. Labels use the hand-lettered accent font instead of
// tracked uppercase small caps.
const base =
  "paint-shape inline-flex items-center justify-center gap-2 font-accent font-semibold " +
  "text-[1rem] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-ivory border-2 border-ink hover:bg-clay hover:border-clay",
  outline:
    "bg-transparent text-ink border-2 border-ink/50 hover:border-clay hover:text-clay",
  ghost: "bg-transparent text-ink border-2 border-transparent hover:text-clay",
  light: "bg-ivory text-ink border-2 border-ivory hover:bg-porcelain",
};

const sizes: Record<Size, string> = {
  sm: "px-6 py-2.5",
  md: "px-8 py-3.5",
  lg: "px-10 py-4",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
