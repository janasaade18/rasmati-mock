import { Reveal } from "@/components/ui/reveal";
import { SERVICE_PROMISES } from "@/lib/brand";

export function ServicePromises() {
  return (
    <section className="border-t border-line bg-porcelain">
      <div className="container-luxe section-sm grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {SERVICE_PROMISES.map((p, i) => (
          <Reveal key={p.title} delay={i * 70}>
            <div className="px-4 text-center">
              <h3 className="font-display text-lg">{p.title}</h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-[0.8rem] leading-relaxed text-muted">
                {p.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
