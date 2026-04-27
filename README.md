# CrewSheet — Landing Page

Run your cleaning business from one Google Sheet. Marketing site for the CrewSheet template + setup.

**Live:** https://out-vlxagnjv.devinapps.com

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Static export (`output: "export"`) — deploys anywhere as a static site

## Sections
1. Sticky nav with EN / ES toggle
2. Hero with interactive 4-screen phone demo
3. Pain section (4 specific scenarios)
4. Live demo block (second phone interaction, 4 features)
5. How it works (3 steps + Google Sheet ↔ phone visualization)
6. Pricing — 3 tiers (DIY $97 / DFY $497 / Pro $29/mo)
7. Comparison table vs Jobber / Housecall Pro / ZenMaid
8. Savings calculator + email capture
9. Social proof (3 case studies)
10. FAQ (6 questions)
11. Founder story
12. Affiliate program CTA (30% commission)
13. Final CTA + footer

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy
The `out/` folder after `npm run build` is fully static. Drop it on Vercel, Netlify, Cloudflare Pages, or any S3 bucket.

## What to wire up before launch
- Replace pricing CTA buttons with real Stripe / Gumroad / Stan checkout links
- Replace `affiliates@crewsheet.app` and `hello@crewsheet.app` with real inbox
- Hook the calculator email capture to ConvertKit / Resend / Beehiiv (it currently stores in `localStorage`)
- Swap testimonials for real ones once you have them
- Add OG image at `/public/og.png` for sharable previews
- Add real Privacy / Terms / Refund pages

## Files of interest
- `src/app/page.tsx` — full landing page
- `src/components/PhoneDemo.tsx` — interactive 4-tab phone (used 3× on the page)
- `src/components/SavingsCalculator.tsx` — savings calc + lead capture
- `src/lib/i18n.ts` — full EN / ES copy
