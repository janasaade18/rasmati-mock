import Link from "next/link";
import { BRAND, FOOTER_NAV } from "@/lib/brand";
import { Monogram } from "@/components/ui/logo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow mb-6 text-paper/50">{title}</h3>
      <ul className="flex flex-col gap-3.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="link-underline text-[0.82rem] text-paper/80 transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-shadow text-paper">
      <div className="container-luxe grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
        <div className="lg:col-span-1">
          <Monogram className="text-4xl" />
          <p className="mt-6 max-w-xs text-[0.86rem] leading-relaxed text-paper/55">
            {BRAND.tagline}
          </p>
          <p className="label-art mt-7 text-[0.95rem] text-paper/40">
            {BRAND.location}
          </p>
        </div>
        <FooterColumn title="Shop" links={FOOTER_NAV.shop} />
        <FooterColumn title="Studio" links={FOOTER_NAV.house} />
        <div>
          <h3 className="eyebrow mb-6 text-paper/50">Connect</h3>
          <ul className="flex flex-col gap-3.5">
            {BRAND.social.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-[0.82rem] text-paper/80 transition-colors hover:text-paper"
                >
                  {s.platform}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="link-underline text-[0.82rem] text-paper/80 transition-colors hover:text-paper"
              >
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-7 text-[0.68rem] text-paper/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
