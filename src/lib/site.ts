export const site = {
  name: "CrewSheet",
  domain: "crewsheet.app",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://crewsheet.app",
  emailContact: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@crewsheet.app",
  emailAffiliates:
    process.env.NEXT_PUBLIC_AFFILIATES_EMAIL || "affiliates@crewsheet.app",
  founderName: process.env.NEXT_PUBLIC_FOUNDER_NAME || "The CrewSheet team",
  founderTitle: process.env.NEXT_PUBLIC_FOUNDER_TITLE || "Founder",
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  // Checkout URLs — paste real Stripe / Gumroad / Stan Store / Lemon Squeezy URLs
  checkout: {
    diy: process.env.NEXT_PUBLIC_CHECKOUT_DIY || "",
    dfy: process.env.NEXT_PUBLIC_CHECKOUT_DFY || "",
    pro: process.env.NEXT_PUBLIC_CHECKOUT_PRO || "",
  },
  // Demo booking URL (Cal.com / Savvycal / Calendly)
  demoBookingUrl: process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "",
  // Lead capture webhook (ConvertKit form-submit URL, Resend Edge function, Apps Script /exec, etc.)
  leadWebhookUrl: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "",
  // Cloudflare Turnstile site key. Empty → form falls back to a honeypot only.
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  // Feature flag: set to "1" only after Twilio A2P 10DLC brand + campaign are
  // approved AND we have automated subscription billing wired. Until then, the
  // Pro tier renders as a "join waitlist" card instead of a paid CTA. Selling
  // automated US business SMS without A2P 10DLC registration is a
  // carrier-fineable / Twilio-account-suspension offense.
  enablePro: process.env.NEXT_PUBLIC_ENABLE_PRO === "1",
  analytics: {
    ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  },
  // Pricing values used in JSON-LD Offer schema
  pricing: {
    diy: { price: "97", currency: "USD" },
    dfy: { price: "497", currency: "USD" },
    pro: { price: "29", currency: "USD" },
  },
  // ISO date the site was last reviewed for legal copy
  legalUpdated: process.env.NEXT_PUBLIC_LEGAL_UPDATED || "2026-04-27",
} as const;

export type Lang = "en" | "es";

export const localeUrl = (lang: Lang, path = "") => {
  const base = lang === "en" ? site.url : `${site.url}/es`;
  if (!path) return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};
