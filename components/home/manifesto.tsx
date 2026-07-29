import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/primitives";

export function Manifesto() {
  return (
    <section className="bg-ivory">
      <div className="container-narrow section text-center">
        <Reveal>
          <Eyebrow className="mb-8">The Rasmati Philosophy</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <p className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.28] text-balance">
            A painting is rarely just decoration. It is the quiet companion to a
            room — the thing your eye returns to, holding color and mood with
            the same effortless presence, morning after morning.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-10 max-w-xl text-[0.92rem] leading-relaxed text-muted text-pretty">
            Every piece is made by hand, one at a time, in a single studio —
            never a print, never an edition. Chosen for how it holds up on a
            wall you&apos;ll see every day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
