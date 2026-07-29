import { ImageFrame } from "@/components/ui/image-frame";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Hairline } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { VALUES, IMAGES } from "@/lib/brand";

export function Philosophy() {
  return (
    <section className="bg-ink text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60vh] lg:min-h-[88vh]">
          <ImageFrame
            src={IMAGES.craftDetail}
            alt="The craft behind a Rasmati painting"
            ratio="auto"
            className="absolute inset-0 h-full"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex items-center px-6 py-20 lg:px-16 lg:py-0">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow className="mb-6 text-ivory/60">Why Rasmati</Eyebrow>
              <h2 className="font-display text-ivory text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-balance">
                Original work, made slowly, meant to last.
              </h2>
            </Reveal>

            <div className="mt-12 flex flex-col gap-8">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-ivory/40">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl text-ivory">{v.title}</h3>
                    </div>
                    <p className="mt-2 pl-9 text-sm leading-relaxed text-ivory/65">
                      {v.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <Hairline className="my-10 bg-ivory/15" />
              <ButtonLink
                href="/about"
                variant="outline"
                className="border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
              >
                Discover Our Craft
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
