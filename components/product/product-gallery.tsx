"use client";

import { useState } from "react";
import { ImageFrame } from "@/components/ui/image-frame";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const list = images.length > 0 ? images : [undefined];
  const [active, setActive] = useState(0);

  return (
    <div>
      <ImageFrame
        src={list[active]}
        alt={name}
        ratio="auto"
        fit="cover"
        priority
        className="aspect-[5/4] rounded-2xl"
        sizes="(max-width:1024px) 100vw, 50vw"
      />
      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden rounded-xl border transition-colors",
                active === i ? "border-ink" : "border-transparent"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <ImageFrame
                src={img}
                alt={`${name} ${i + 1}`}
                ratio="square"
                fit="contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
