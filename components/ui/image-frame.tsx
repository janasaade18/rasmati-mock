"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial image holder. If the src is missing or fails to load, it falls
 * back to a tasteful greige field with the Rasmati monogram — so a broken or
 * not-yet-uploaded image still reads as intentional, never as an error.
 */
export function ImageFrame({
  src,
  alt,
  className,
  imgClassName,
  ratio = "portrait",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  zoom = false,
  fit = "cover",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: "portrait" | "square" | "landscape" | "tall" | "wide" | "auto";
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  /** "contain" shows the whole canvas, letterboxed on the frame's own
   *  background, instead of cropping it to fill the frame. */
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  const ratios: Record<string, string> = {
    portrait: "aspect-[4/5]",
    square: "aspect-square",
    landscape: "aspect-[3/2]",
    tall: "aspect-[3/4]",
    wide: "aspect-[16/9]",
    auto: "",
  };

  const showImage = src && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-greige", ratios[ratio], className)}>
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn(
            fit === "contain" ? "object-contain" : "object-cover",
            zoom && "img-zoom",
            imgClassName
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-greige to-greige-deep">
          <span
            className="font-display text-espresso/30 leading-none"
            style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
            aria-hidden
          >
            ر
          </span>
        </div>
      )}
    </div>
  );
}
