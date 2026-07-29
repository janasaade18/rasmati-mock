import type { Metadata } from "next";
import { Fraunces, Literata, Caveat } from "next/font/google";
import "./global.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { HeaderSpacer } from "@/components/layout/header-spacer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SvgFilters } from "@/components/ui/svg-filters";
import { BRAND } from "@/lib/brand";

// Fraunces: a wonky, optical-size editorial serif with real character —
// used for headings/wordmark so the site reads as an artist's studio, not
// a fashion catalog.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Literata: a warm, readable literary serif for body copy — a gallery wall
// text feel rather than a clean corporate sans.
const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
  weight: ["400", "500"],
});

// Caveat: hand-lettered script used sparingly for eyebrows, labels, prices,
// and signature-style flourishes — the artist's own handwriting in the
// margins.
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rasmati.lb"),
  title: {
    default: "Rasmati — Original Paintings",
    template: "%s · Rasmati",
  },
  description:
    "Rasmati is an original painting studio — one-of-one works in oil, acrylic and watercolor, photographed true to color and shipped ready to hang.",
  keywords: [
    "Rasmati",
    "original paintings",
    "art for sale",
    "oil paintings",
    "acrylic paintings",
    "Lebanese artist",
  ],
  openGraph: {
    title: "Rasmati — Original Paintings",
    description: BRAND.shortPitch,
    type: "website",
    siteName: "Rasmati",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${literata.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen antialiased">
        <SvgFilters />
        <Providers>
          <SiteHeader />
          <main id="main">
            <HeaderSpacer />
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
