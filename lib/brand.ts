/**
 * Rasmati brand content.
 *
 * The storefront's identity is bespoke (not driven by backend settings).
 * This module is the single source of editorial copy, navigation, and
 * curated imagery — so the experience is complete and on-brand even before
 * every image has been uploaded to the backend CMS.
 *
 * Rasmati (رسمتي — "my painting") is a single-artist studio selling original
 * paintings. All `image` values are tasteful, neutral placeholders meant to
 * be swapped for real photography of the actual paintings via the backend's
 * website-data collections (hero-banner, paintings, etc.).
 */

export const BRAND = {
  name: "Rasmati",
  monogram: "ر",
  tagline: "Original paintings, straight from the studio.",
  shortPitch:
    "A curated collection of original paintings — each piece photographed true to color, shipped ready to hang.",
  email: "janasaadesaade18@gmail.com",
  phone: "+961 3 792 522",
  whatsApp: "+9613792522",
  location: "Beirut, Lebanon",
  instagram: "https://instagram.com",
  social: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Pinterest", url: "https://pinterest.com" },
    { platform: "TikTok", url: "https://tiktok.com" },
  ],
} as const;

/* ---------- Navigation ---------- */
export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Sold Gallery", href: "/previously-sold" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = {
  shop: [
    { label: "All Paintings", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Featured", href: "/shop?highlight=featured" },
    { label: "Previously Sold", href: "/previously-sold" },
  ],
  house: [
    { label: "Our Story", href: "/about" },
    { label: "Care & Framing", href: "/about#craft" },
    { label: "Contact", href: "/contact" },
  ],
  client: [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ],
} as const;

/* ---------- Announcement bar ---------- */
export const ANNOUNCEMENTS = [
  "Free insured shipping on every order",
  "Certificate of authenticity with every piece",
  "Original, one-of-one works — never prints",
  "Custom commissions available",
] as const;

/* ---------- Curated imagery (placeholders — swap for real photography via the CMS) ---------- */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroPortrait: U("1579783902614-a3fb3927b6a5", 1800), // oil still life (flowers)
  heroStill: U("1541961017774-22349e4a1262", 1800), // abstract acrylic painting
  storyEditorial: U("1513364776144-60967b0f800f", 1600), // paintbrush + fresh paint
  craftDetail: U("1460661419201-fd4cecdf8a8b", 1400), // paintbrushes close-up
  materialFlatlay: U("1615184697985-c9bde1b07da7", 1400), // finished cubist-style painting
  campaignWide: U("1578301978018-3005759f48f7", 2000), // landscape painting
  lookbook1: U("1578301978018-3005759f48f7", 1200), // landscape -> "Landscapes"
  lookbook2: U("1615184697985-c9bde1b07da7", 1200), // figures -> "Portraits"
  lookbook3: U("1541961017774-22349e4a1262", 1200), // abstract -> "Abstracts"
  lookbook4: U("1579783902614-a3fb3927b6a5", 1200), // still life -> "Still Life"
  pillarWork: U("1579783902614-a3fb3927b6a5", 1200), // oil
  pillarTravel: U("1541961017774-22349e4a1262", 1200), // acrylic
  pillarMotherhood: U("1578301978018-3005759f48f7", 1200), // watercolor
  pillarWellness: U("1615184697985-c9bde1b07da7", 1200), // mixed media
  aboutHero: U("1513364776144-60967b0f800f", 2000), // paintbrush + fresh paint
  contactHero: U("1460661419201-fd4cecdf8a8b", 1600), // paintbrushes close-up
} as const;

/* ---------- By medium ---------- */
export const LIFESTYLE_PILLARS = [
  {
    key: "oil",
    title: "Oil",
    copy: "Rich, layered color built up slowly — for pieces that reward a long look.",
    image: IMAGES.pillarWork,
  },
  {
    key: "acrylic",
    title: "Acrylic",
    copy: "Bold, immediate, and full of texture — quick-drying color with real presence.",
    image: IMAGES.pillarTravel,
  },
  {
    key: "watercolor",
    title: "Watercolor",
    copy: "Light, translucent washes — quiet studies that let the paper breathe.",
    image: IMAGES.pillarMotherhood,
  },
  {
    key: "mixed",
    title: "Mixed Media",
    copy: "Paint, paper, and texture layered together into something harder to name.",
    image: IMAGES.pillarWellness,
  },
] as const;

/* ---------- Brand values / philosophy ---------- */
export const VALUES = [
  {
    title: "Original Work",
    copy: "Every painting is one-of-one. What you see is the piece that exists — never a print, never an edition.",
  },
  {
    title: "True to Color",
    copy: "Photographed in natural light and checked against the original, so what arrives matches what you saw.",
  },
  {
    title: "Made Slowly",
    copy: "Each piece takes the time it takes. Nothing is rushed to meet a drop date.",
  },
  {
    title: "Ready to Hang",
    copy: "Every painting ships prepared for the wall — no framing errands required.",
  },
] as const;

/* ---------- Story sections (About page) ---------- */
export const STORY = {
  heading: "One artist, one studio, one painting at a time",
  intro:
    "Rasmati began as a personal practice — painting as a way of paying attention. It grew into a small studio selling original work directly, without galleries or middlemen, so each piece can go straight from easel to your wall.",
  body: [
    "Every painting sold here is made by hand, start to finish, in the same studio. Nothing is outsourced and nothing is reproduced — once a piece sells, that composition doesn't exist again.",
    "The goal isn't to flood a feed with content. It's to make work worth living with — pieces chosen for how they hold up on a wall you'll see every day, not just in a photo.",
  ],
  craftHeading: "Materials & Care",
  craftBody:
    "Paintings are made with quality, lightfast pigments on canvas or archival paper, and are varnished or sealed where appropriate for longevity. Each piece ships with care instructions and, on request, guidance for framing.",
} as const;

/* ---------- Fallback "collections" for the shop when there's nothing curated yet ---------- */
export const FALLBACK_COLLECTIONS = [
  {
    name: "Landscapes",
    slug: "landscapes",
    description: "Quiet horizons, fields, and coastlines.",
    image: IMAGES.lookbook1,
  },
  {
    name: "Portraits",
    slug: "portraits",
    description: "Studies of faces and figures.",
    image: IMAGES.lookbook2,
  },
  {
    name: "Abstracts",
    slug: "abstracts",
    description: "Color and form, unmoored from subject.",
    image: IMAGES.lookbook3,
  },
  {
    name: "Still Life",
    slug: "still-life",
    description: "Small, considered arrangements.",
    image: IMAGES.lookbook4,
  },
] as const;

/* ---------- Trust / service promises ---------- */
export const SERVICE_PROMISES = [
  { title: "Free Insured Shipping", copy: "On every order, carefully packaged." },
  { title: "Certificate of Authenticity", copy: "Included with every original piece." },
  { title: "7-Day Returns", copy: "Effortless and unhurried." },
  { title: "Custom Commissions", copy: "Personal service, made to your space." },
] as const;
