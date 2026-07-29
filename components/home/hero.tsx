import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IMAGES } from "@/lib/brand";

export function Hero({
  image,
  alt,
  title,
  eyebrow,
}: {
  image?: string | null;
  alt?: string;
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-shadow">
      <Image
        src={image || IMAGES.heroPortrait}
        alt={alt || "An original Rasmati painting displayed in a sunlit studio"}
        fill
        priority
        sizes="100vw"
        className="animate-kenburns !left-auto !w-[55%] object-cover object-[center_40%] brightness-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-shadow/90 via-shadow/55 to-shadow/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-shadow/45 via-transparent to-shadow/10" />

      <div className="container-luxe relative flex h-full flex-col justify-end pb-40 lg:pb-52">
        <div className="max-w-2xl text-paper">
          <span className="eyebrow text-paper/70">{eyebrow || "Original paintings"}</span>
          <h1 className="mt-7 font-display text-[clamp(2.8rem,8vw,6.5rem)] font-normal leading-[0.96] text-balance text-paper">
            {title || (
              <>
                Straight from the
                <br />
                studio.
              </>
            )}
          </h1>
          <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-5">
            <ButtonLink href="/shop" variant="solid">
              Shop the Collection
            </ButtonLink>
            <Link
              href="/about"
              className="label-art group inline-flex items-center gap-2 text-[1.05rem] text-paper/90 transition-colors hover:text-paper"
            >
              Discover the Studio
              <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/55 lg:flex">
        <span className="label-art text-[0.9rem]">Scroll</span>
        <span className="h-9 w-px bg-paper/35" />
      </div>
    </section>
  );
}
