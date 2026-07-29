import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { Eyebrow, Hairline } from "@/components/ui/primitives";
import { ContactForm } from "@/components/editorial/contact-form";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Rasmati studio — questions, custom commissions, and orders.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Get in Touch"
        title="Contact the Studio"
        intro="Questions about a piece, shipping, or a custom commission — we read every message."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <section className="container-luxe pb-24 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow className="mb-6">Send a Message</Eyebrow>
            <ContactForm />
          </div>
          <div>
            <Eyebrow className="mb-6">Direct</Eyebrow>
            <div className="flex flex-col gap-5 text-sm">
              <div>
                <span className="label-art block text-[1rem] text-muted">Email</span>
                <a href={`mailto:${BRAND.email}`} className="link-underline mt-1 inline-block">
                  {BRAND.email}
                </a>
              </div>
              <div>
                <span className="label-art block text-[1rem] text-muted">Phone / WhatsApp</span>
                <a href={`tel:${BRAND.phone}`} className="link-underline mt-1 inline-block">
                  {BRAND.phone}
                </a>
              </div>
              <div>
                <span className="label-art block text-[1rem] text-muted">Studio</span>
                <span className="mt-1 block text-ink">{BRAND.location}</span>
              </div>
            </div>
            <Hairline className="my-8" />
            <p className="text-[0.85rem] leading-relaxed text-muted">
              Custom commissions typically take 2–4 weeks depending on size
              and detail. Get in touch with your space in mind and we&apos;ll
              walk you through the process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
