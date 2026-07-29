import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES } from "@/lib/brand";

export function Campaign({
  image,
  alt,
}: {
  image?: string | null;
  alt?: string | null;
}) {
  return (
    <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden bg-espresso-deep">
      <Image
        src={image || IMAGES.campaignWide}
        alt={alt || "Rasmati — original paintings, straight from the studio"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-shadow/40" />
      <div className="container-luxe relative flex h-full flex-col items-center justify-center text-center text-paper">
        <Reveal>
          <span className="eyebrow text-paper/75">Custom Commissions</span>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-balance text-paper">
            Have a space in mind? Let&apos;s paint it for you.
          </h2>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="solid">
              Start a Commission
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
