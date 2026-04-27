# CrewSheet — Landing Page

Run your cleaning business from one Google Sheet. Marketing site for the CrewSheet template + setup.

Bilingual (EN + ES), static export, fully SEO-ready.

## Stack

- Next.js 14 (App Router) + TypeScript, static export (`output: "export"`)
- Tailwind CSS
- Multi-root layout for true `<html lang>` per route + reciprocal `hreflang`
- Dynamic Open Graph images (`/opengraph-image`, `/es/opengraph-image`)
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication` + `Offer`, `FAQPage`
- Auto-generated `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
- Privacy / Terms / Refund pages in both languages
- Skip-to-content link, focus-visible polish, semantic landmarks
- GA4 + Plausible analytics behind env vars, with Consent-Mode-v2-friendly cookie banner

## Routes

| Path | Description |
| --- | --- |
| `/` | English landing page |
| `/es/` | Spanish landing page |
| `/privacy/`, `/terms/`, `/refund/` | English legal pages |
| `/es/privacy/`, `/es/terms/`, `/es/refund/` | Spanish legal pages |
| `/sitemap.xml` | Auto-generated sitemap with hreflang |
| `/robots.txt` | Auto-generated robots policy |
| `/manifest.webmanifest` | PWA manifest |
| `/opengraph-image`, `/es/opengraph-image` | 1200×630 dynamic OG images |

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy

`out/` after `npm run build` is fully static. Drop it on Vercel, Netlify,
Cloudflare Pages, or any S3 bucket. Make sure your host **does not** add an
`x-robots-tag: noindex` header.

## Configuration (`.env.local`)

All real-world wiring is driven by env vars. Copy `.env.example` to `.env.local`
and fill in what applies. The site builds and works without any of them — it
just falls back to safe defaults.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL (default `https://crewsheet.app`). Used in canonical, sitemap, OG, JSON-LD. |
| `NEXT_PUBLIC_FOUNDER_NAME` | Real founder name shown in the founder section (default: "The CrewSheet team"). |
| `NEXT_PUBLIC_FOUNDER_TITLE` | Founder title (default "Founder"). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Support inbox (default `hello@crewsheet.app`). |
| `NEXT_PUBLIC_AFFILIATES_EMAIL` | Affiliate inbox (default `affiliates@crewsheet.app`). |
| `NEXT_PUBLIC_TWITTER_HANDLE` | `@yourhandle` for Twitter Card meta + `Organization.sameAs`. |
| `NEXT_PUBLIC_GITHUB_URL` | Optional GitHub / company URL for `Organization.sameAs`. |
| `NEXT_PUBLIC_CHECKOUT_DIY` | Stripe / Gumroad / Stan / Lemon Squeezy URL for the $97 DIY tier. |
| `NEXT_PUBLIC_CHECKOUT_DFY` | Checkout URL for the $497 Done-For-You tier. |
| `NEXT_PUBLIC_CHECKOUT_PRO` | Checkout URL for the $29/mo Pro tier. |
| `NEXT_PUBLIC_DEMO_BOOKING_URL` | Cal.com / Savvycal / Calendly URL for "Book a 15-min demo". |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | Webhook the savings-calculator email form POSTs JSON to (ConvertKit, Resend Edge Function, Apps Script `/exec`, etc.). |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (e.g. `G-XXXX`). Empty → no GA. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain (e.g. `crewsheet.app`). Empty → no Plausible. |
| `NEXT_PUBLIC_SHOW_TESTIMONIALS` | Set to `1` once you have real, attributable testimonials. Otherwise the section shows an honest "case studies coming" placeholder. |
| `NEXT_PUBLIC_LEGAL_UPDATED` | ISO date shown on legal pages (default `2026-04-27`). Update when you edit the legal copy. |

## Pre-launch checklist

1. Buy `crewsheet.app`, point DNS at your host, force HTTPS, force one canonical host (apex or `www`, 301 the other).
2. Verify `curl -I https://crewsheet.app` does **not** return `x-robots-tag: noindex`.
3. Set every `NEXT_PUBLIC_*` env var that applies. At minimum: `NEXT_PUBLIC_SITE_URL`, the three `CHECKOUT_*` URLs, `LEAD_WEBHOOK_URL`, `FOUNDER_NAME`, `CONTACT_EMAIL`, `AFFILIATES_EMAIL`.
4. Replace the legal copy in `src/components/legal/*.tsx` with text reviewed by your counsel for your jurisdiction.
5. Set up the support + affiliate inboxes referenced by your env vars.
6. Submit the sitemap (`https://crewsheet.app/sitemap.xml`) in Google Search Console and Bing Webmaster Tools.
7. If using SMS / Pro tier: complete A2P 10DLC registration with Twilio before selling Pro.
8. Once you have 3 real testimonials, set `NEXT_PUBLIC_SHOW_TESTIMONIALS=1` and edit `src/lib/i18n.ts`'s `proof_items` arrays.

## Key files

- `src/lib/site.ts` — single source of truth for site config / env wiring
- `src/lib/i18n.ts` — full EN / ES copy + legal-page strings
- `src/components/Landing.tsx` — main landing page (server component)
- `src/components/Nav.tsx`, `Footer.tsx` — shared chrome
- `src/components/PhoneDemo.tsx` — interactive 4-tab phone (used 3× on the page)
- `src/components/SavingsCalculator.tsx` — savings calc + lead capture (POSTs to your webhook)
- `src/components/JsonLd.tsx` — structured data
- `src/components/Analytics.tsx`, `CookieBanner.tsx` — env-gated analytics
- `src/components/legal/*` — Privacy / Terms / Refund body copy (EN + ES)
- `src/app/(en)/`, `src/app/(es)/` — route groups, one per language
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` — global metadata routes
