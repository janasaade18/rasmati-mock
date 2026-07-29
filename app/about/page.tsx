import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Hairline, SectionHeading } from "@/components/ui/primitives";
import { BRAND, STORY, VALUES, SERVICE_PROMISES, IMAGES } from "@/lib/brand";
import { getSiteSettings } from "@/lib/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Story",
  description: STORY.intro,
};

export default async function AboutPage() {
  const about = (await getSiteSettings())?.staticPages?.about;
  const coreValues = about?.coreValues?.filter((value) => value.title) ?? [];

  return (
    <>
      {/* — Full-bleed hero — */}
      <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden bg-espresso-deep">
        <Image
          src={about?.heroBackgroundImage || IMAGES.aboutHero}
          alt={about?.heroTitle || "The world of Rasmati"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow/80 via-shadow/30 to-shadow/40" />
        <div className="container-luxe relative flex h-full flex-col items-center justify-end pb-20 text-center text-paper lg:pb-28">
          <Reveal>
            <Eyebrow className="text-paper/75">{about?.storyTitle || "Our Story"}</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-normal leading-[1.04] text-balance text-paper">
              {about?.heroTitle || STORY.heading}
            </h1>
            <p className="mx-auto mt-7 max-w-md text-[0.92rem] leading-relaxed text-paper/80 text-pretty">
              {about?.heroSubtitle || BRAND.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* — Intro lede — */}
      <section className="bg-ivory">
        <div className="container-narrow section text-center">
          <Reveal>
            <Eyebrow className="mb-8">{about?.storyTitle || "The Rasmati Beginning"}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-luxe">
              <p className="lede text-balance">{about?.storyContent || STORY.intro}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* — Editorial split — */}
      <section className="bg-porcelain">
        <div className="container-luxe section">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <ImageFrame
                src={IMAGES.storyEditorial}
                alt="Rasmati — considered by design"
                ratio="portrait"
                zoom
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <Eyebrow className="mb-6">Vision &amp; Mission</Eyebrow>
                <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.12] text-balance">
                  {about?.visionTitle || "Our Vision"}
                </h2>
                <div className="mt-8 space-y-6">
                  <p className="text-[0.95rem] leading-relaxed text-muted text-pretty">
                    {about?.visionContent || STORY.body[0]}
                  </p>
                  <div>
                    <h3 className="font-display text-xl">{about?.missionTitle || "Our Mission"}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                      {about?.missionContent || STORY.body[1]}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Craft — */}
      <section id="craft" className="scroll-mt-28 bg-ivory">
        <div className="container-luxe section">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="lg:order-2">
              <ImageFrame
                src={IMAGES.craftDetail}
                alt="Pigments and brushes, prepared by hand"
                ratio="landscape"
                zoom
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal delay={120} className="lg:order-1">
              <div>
                <Eyebrow className="mb-6">Materials &amp; Care</Eyebrow>
                <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.12] text-balance">
                  {about?.promiseTitle || STORY.craftHeading}
                </h2>
                <p className="mt-8 text-[0.95rem] leading-relaxed text-muted text-pretty">
                  {about?.promiseContent || STORY.craftBody}
                </p>
                <div className="mt-10">
                  <ImageFrame
                    src={IMAGES.materialFlatlay}
                    alt="A study of materials and tools"
                    ratio="wide"
                    zoom
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Values grid — */}
      <section className="bg-greige">
        <div className="container-luxe section">
          <Reveal>
            <SectionHeading
              eyebrow="What We Hold To"
              title="The values behind every piece"
            />
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {(coreValues.length > 0 ? coreValues : VALUES).map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div>
                  <span className="font-display text-sm text-espresso/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Hairline className="mt-4 bg-line" />
                  <h3 className="mt-6 font-display text-xl leading-snug">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-muted text-pretty">
                    {"copy" in value ? value.copy : value.content || value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Service promises — */}
      <section className="bg-ivory">
        <div className="container-luxe section-sm">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {SERVICE_PROMISES.map((promise, i) => (
              <Reveal key={promise.title} delay={i * 80}>
                <div className="text-center">
                  <h3 className="font-display text-lg leading-snug">
                    {promise.title}
                  </h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-muted text-pretty">
                    {promise.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Closing CTA band — */}
      <section className="relative w-full overflow-hidden bg-ink">
        <div className="container-luxe section text-center text-ivory">
          <Reveal>
            <Eyebrow className="text-ivory/70">Begin</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.08] text-balance text-ivory">
              Find the piece that moves with you.
            </h2>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/shop" variant="light">
                Explore the Collection
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
