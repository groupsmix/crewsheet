# CEO Launch Readiness Memo — CrewSheet

**Author:** Acting CEO (engineering review)
**Repo:** `groupsmix/crewsheet`
**Branch reviewed:** `devin/1777301989-initial-launch-ready-site` (latest `main`)
**Date:** 2026-04-30

---

## TL;DR — Verdict

> **The marketing site is ready to ship. The business is not ready to sell.**
>
> **Do NOT launch yet.** We can flip the marketing site to production behind
> our domain in a day. We **cannot** legitimately accept a single customer
> dollar today, because the product the marketing site sells does not exist
> as a deliverable yet, the commerce path is unwired, and the legal copy is
> still a template.
>
> Realistic public-launch ETA: **30–45 days** assuming the founder works the
> non-engineering blockers in parallel. Soft-launch (10 hand-picked DIY
> buyers) is achievable in **~14 days** if the founder hard-prioritises the
> entity, Stripe, and the deliverable Sheet template this week.

This memo is the single source of truth for "are we ready?" — superseding the
status fields in `docs/LAUNCH-PLAN.md` where they conflict.

---

## What I reviewed

| Surface | Verdict |
|---|---|
| Code architecture (Next.js 14 static export, App Router, route groups for EN / ES) | **Strong.** Clean separation, single source of truth for site config (`src/lib/site.ts`) and copy (`src/lib/i18n.ts`). |
| SEO (canonical, hreflang, sitemap, robots, JSON-LD `Organization` / `WebSite` / `SoftwareApplication` / `FAQPage`, dynamic OG images) | **Production-grade.** No gaps for a v1 marketing site. |
| Accessibility (skip-link, semantic landmarks, focus-visible polish) | **Good baseline.** No blockers. Recommend a Lighthouse audit pass post-deploy. |
| Bilingual (EN + ES) | **Real localisation**, not machine-translated stubs. Reciprocal `hreflang`, true `<html lang>` per route. |
| Build / lint / typecheck | **Pass.** `npm run lint` clean, `npm run build` produces a 16-page static export with all 6 legal routes, sitemap, robots, manifest, OG images. |
| Smoke tests (Playwright, 6 specs) | **All pass.** Cover EN/ES rendering, legal pages, sitemap/robots, and importantly two **anti-regression guards**: no fabricated testimonials reappear, and Pro/SMS marketing copy never reaches rendered HTML. |
| CI (`.github/workflows/ci.yml`) | Lint → build → smoke on every PR + push to `main`. Static export uploaded as an artifact. |
| Lead capture security posture (calculator form) | Static site → no server secret. Hardened correctly: honeypot field, optional Cloudflare Turnstile mount, 5-minute timestamp, receiver-side CORS pin + Turnstile verify. Reference Worker documented in `docs/webhook-receiver.md`. **Sound design.** |
| Pricing surface | DIY $97 + DFY $497, two cards centered. Pro / SMS tier completely removed (correct call — see "Risks I'm taking off the table" below). |
| Honesty | No fabricated testimonials. Pro tier removed instead of shipping behind a flag the founder could accidentally flip. Founder section explicitly labels itself "The CrewSheet team, Founder" until a real name is wired via env. **This is exactly the right posture for a small team without legal cover.** |

### Code-quality findings (all minor)

- **`npm audit` reports 5 vulnerabilities** (1 moderate, 4 high), all transitive. Three are Next.js advisories (image optimiser DoS, RSC HTTP smuggling, request smuggling in rewrites) — **none of which apply at runtime to a static export** with `output: "export"` and `images.unoptimized: true`. The other two are in `glob` (dev-only, via `eslint-config-next`). **No production exposure.** Suggested action: track Next.js 14.2.x patches; do not move to 15.x mid-launch (breaking changes don't earn anything for a static site).
- **`legalUpdated` defaults to `2026-04-27`** in `src/lib/site.ts`. This must be flipped to the date the *lawyer* signs off — not today, not when we deploy. Leave as-is until counsel review (Phase 5).
- **No `engines` field in `package.json`.** Cloudflare Pages will pick a Node version arbitrarily. Pin to Node 20 in the Pages dashboard *and* add `"engines": { "node": ">=20" }` to `package.json` before the DNS cutover. (Low effort, low risk; deferred to the deploy PR rather than this review.)

---

## Launch readiness scorecard

Scale: **0** = not started, **5** = ship-ready.

| # | Phase | Status | Score | Owner | On critical path? |
|---|---|---|---|---|---|
| 1 | Marketing site hardening (this repo) | Shipped | **5 / 5** | Eng | — |
| 2 | Product itself: 6-tab Sheet + Apps Script + Glide/AppSheet recipe (separate `crewsheet-template` repo) | Not started | **1 / 5** | Eng | **YES — this is the gating item.** |
| 3 | Stripe Payment Links (DIY $97, DFY $497) + Cloudflare Worker for `checkout.session.completed` → Resend delivery email | Not started | **0 / 5** | Eng + Founder | **YES** |
| 4 | Twilio A2P 10DLC SMS | **Descoped from v1.** Reintroduce post-launch as a separate SKU. | n/a | Founder | No |
| 5 | Legal review (Privacy / Terms / Refund / DPA) by SaaS-fluent counsel | Brief drafted, copy still template | **1 / 5** | Founder + counsel | **YES** |
| 6 | Cloudflare Pages deploy + DNS cutover from GoDaddy parking | Runbook drafted, not executed | **2 / 5** | Eng + Founder | **YES** |
| 7 | Soft launch — 30 hand-picked cleaners, DIY + DFY only | Not started | **0 / 5** | Founder | YES (soft) |
| 8 | Public launch — affiliate tracking live (Rewardful / FirstPromoter) | Not started | **0 / 5** | Founder | YES (public) |
| 9 | SMS add-on as separate SKU once A2P 10DLC approved | Not started | **0 / 5** | Eng + Founder | No (post-v1) |

---

## What's blocking the sale

### P0 — cannot accept money without these (~14 days)

1. **Legal entity.** Wyoming LLC via Northwest Registered Agent (~$39 first year) → EIN → Mercury / Relay banking. Without an entity Stripe can't onboard us, the LLC shield is absent, and the ToS / Privacy enforceability is shaky. **Founder action.** Budget: ~$300 + 1 week to EIN.
2. **Counsel-reviewed legal copy.** Engage a SaaS-fluent solo lawyer with `docs/legal-brief.md` (still to be drafted as part of Phase 5). Replace `src/components/legal/{Privacy,Terms,Refund}{EN,ES}.tsx` with their edits. Bump `NEXT_PUBLIC_LEGAL_UPDATED`. **Budget: $500–$1,500. Do not skip this — refund disputes and EU/CCPA complaints are the realistic downside risk.**
3. **The actual product.** No deliverable = no sale. The `crewsheet-template` repo needs:
   - 6-tab Google Sheet template (Customers / Jobs / Quotes / Supplies / Payments / Settings) with named ranges, validation, sample data, and a `template-spec.md`.
   - Apps Script project (`clasp`) with on-edit, time-based, and on-form-submit triggers using `MailApp` + `UrlFetchApp` + `SpreadsheetApp`. **No Twilio in v1.**
   - Glide or AppSheet "make a copy" runbook with screenshots.
   - 15-minute Loom walkthrough.
   - `LICENSE-CUSTOMER.md` — perpetual, worldwide, non-exclusive, non-transferable, no resale.
4. **Commerce plumbing.**
   - Stripe Payment Links for DIY ($97) and DFY ($497), Stripe Tax on, USD.
   - Cloudflare Worker (`workers/stripe-webhook/`) listening for `checkout.session.completed`, Stripe signature verified, Resend API call to email the buyer the deliverable links.
   - Resend domain verified (`crewsheet.app` SPF/DKIM/DMARC).
   - Test-mode dry-run of every SKU before flipping live keys.
5. **Domain + hosting.** Stop the GoDaddy Website Builder placeholder serving from `crewsheet.app`. Connect this repo to Cloudflare Pages (build: `npm ci && npm run build`, output: `out`). Set every `NEXT_PUBLIC_*` env var in the Pages dashboard for production *and* preview. Force HTTPS, force apex canonical, 301 `www`. Verify `curl -I https://crewsheet.app` returns no `x-robots-tag: noindex`.

### P1 — needed for the public launch (15–45 days)

6. **Lead-webhook receiver.** Stand up the Cloudflare Worker described in `docs/webhook-receiver.md` (Turnstile + Resend) and set `NEXT_PUBLIC_LEAD_WEBHOOK_URL` in Pages. Until this is live, the savings calculator is decorative.
7. **Founder identity.** Replace `NEXT_PUBLIC_FOUNDER_NAME` ("The CrewSheet team") with the real founder name once the LLC is filed. The "Why I'm the one building this" section is a real conversion driver and we leave too much on the table by hiding behind a generic name.
8. **Real testimonials.** Soft-launch 30 hand-picked cleaners → collect 3+ attributable testimonials with signed consent → flip `NEXT_PUBLIC_SHOW_TESTIMONIALS=1` and load them into `src/lib/i18n.ts`. **Do not seed fake ones — the smoke test will refuse to ship them and we'd be one TikTok screenshot away from an FTC referral.**
9. **Affiliate tracking.** Rewardful or FirstPromoter live before we run the affiliate landing CTA. We promise "30% commission, lifetime" — that's a contractual claim we have to actually be able to honour.

### P2 — fast follows

10. Submit the sitemap to Google Search Console + Bing Webmaster.
11. Lighthouse / axe audit on the deployed origin and fix any P1 a11y issues.
12. Pin Node version in `package.json` (`"engines": { "node": ">=20" }`) and in the Cloudflare Pages dashboard.
13. Add a CSP header at the Cloudflare Pages edge (`Content-Security-Policy`, `Permissions-Policy`, `X-Content-Type-Options: nosniff`). The static export ships none today.

### Post-v1 (Phase 9)

14. SMS add-on as a **separate SKU** once Twilio Brand + Campaign are approved (1–3 weeks of TCR review). Do not retrofit it onto the existing landing page — ship its own page / checkout / opt-in copy so we never have to argue we "didn't really mean" the SMS marketing on the main site.

---

## Risks I'm taking off the table

1. **Pro / SMS tier removed from v1 entirely.** Prior version of this repo shipped a third pricing card claiming "A2P 10DLC included" and "500 SMS credits / mo via Twilio". That's a Twilio-account-suspension and FCC/CTIA-fineable claim until our brand + campaign are approved. The current code (`src/components/Landing.tsx`, `src/lib/i18n.ts`, `src/components/JsonLd.tsx`) has no Pro card, no Twilio in the trust strip, and the smoke test (`tests/smoke.spec.ts`) actively forbids those strings reappearing in rendered HTML. **Hold the line.**
2. **No fabricated testimonials.** The earlier "Maria S. / Daniel O. / Yelena P. / Sparkle House" placeholder testimonials are gone, and the smoke test fails the build if any of those names reappear. FTC §5 / EU UCPD risk neutralised. **Hold the line.**
3. **Refund policy is currently a template.** The Refund page shipping today literally says "Replace it with policy language reviewed by your own counsel before launch." That's honest *to a developer reading the source*, but it appears in the rendered HTML. Counsel review (P0 #2) closes this.
4. **Lead form has no server-side trust without the Worker live.** The honeypot + Turnstile mount is correct architecture, but until the receiver Worker is deployed and `NEXT_PUBLIC_LEAD_WEBHOOK_URL` is set, every form submission goes nowhere. Ship the Worker before pointing humans at the calculator.

---

## What I'm endorsing as CEO

- The **two-tier pricing** ($97 DIY / $497 DFY) and the decision to keep Pro / SMS out of v1.
- The **static-export + Cloudflare-Pages** deployment model. Right tradeoff for a marketing site at our stage: zero runtime, zero bill, instant cache, no server CVEs.
- The **honesty posture** in copy: no fake reviews, no Pro card with vapor SMS, founder section labelled honestly until a real name is wired.
- The **smoke-test guardrails**. Two of the six Playwright specs exist *only* to refuse the build if marketing copy regresses on the FTC / Twilio promises. Do not weaken them.
- **Soft launch first.** Target: 10 paying DIY + 2 DFY by day 45 with refund rate < 15%. Public launch (Product Hunt / Indie Hackers / one cleaning-industry guest post) only after we have ≥3 attributable testimonials.

## What I'm declining

- **Launching today.** No.
- **Pre-orders / a wait-list.** No — collecting card details for a product that does not exist yet introduces refund and chargeback risk for zero upside. Build the product first.
- **Re-introducing the Pro / SMS card behind a flag.** No — it's the founder's flag to flip and one accidental flip turns into a Twilio / TCR violation. Phase 9 ships SMS as its own SKU on its own page or it does not ship.
- **A2P 10DLC on the critical path.** No — TCR review can take 1–3 weeks and is outside our control. Decoupled from launch.

---

## Recommended sequence (next 14 days)

| Day | Owner | Action |
|---|---|---|
| 1 | Founder | File Wyoming LLC (Northwest Registered Agent) + apply for EIN. |
| 1 | Eng | Open `crewsheet-template` repo. Stub 6-tab Sheet + `template-spec.md`. |
| 1 | Founder | Email three SaaS-fluent solo lawyers with `docs/legal-brief.md` (drafted day 1). |
| 2–4 | Eng | Apps Script project: on-edit, time-based, on-form-submit triggers. `MailApp` only. |
| 3 | Eng | Glide / AppSheet "make a copy" runbook with screenshots. |
| 5 | Eng | 15-min Loom walkthrough. |
| 5–6 | Eng + Founder | Stripe Payment Links (test mode) + Cloudflare Worker for `checkout.session.completed`. Resend domain verified. |
| 7 | Founder | EIN arrives → Stripe + Resend + Cloudflare accounts onboarded under the LLC. |
| 7 | Eng | Lead-webhook Worker live. `NEXT_PUBLIC_LEAD_WEBHOOK_URL` set in Pages. |
| 8 | Eng + Founder | Cloudflare Pages connected to this repo. DNS cutover from GoDaddy. |
| 8 | Eng | Test-mode dry-run every SKU end-to-end (checkout → Worker → Resend → buyer inbox). |
| 9–10 | Counsel | Privacy / Terms / Refund / DPA delivered. Eng wires the copy and bumps `NEXT_PUBLIC_LEGAL_UPDATED`. |
| 10 | Eng | Flip Stripe to live mode. Deploy. |
| 11–14 | Founder | Soft-launch outreach: 30 hand-picked cleaners (Twitter cleaning founders, r/cleaningbusiness, Facebook groups, Mondragon / Brown audiences). |
| 14 | — | First paying DIY customer. |

---

## Numbers (sanity-check)

- DIY: $97 one-time. Stripe fee: 2.9% + 30¢ ≈ **$3.11 per sale**. Refund window per the (template) refund page: 30 days.
- DFY: $497 one-time. Stripe fee ≈ **$14.71**. Includes founder time (Cal.com 1:1 setup) — price floor needs to cover ≥ 90 minutes of founder time + the DIY deliverables. At 90 min we're netting ~$320/hr equivalent on DFY before refunds. Healthy.
- Soft-launch goal: 10 DIY + 2 DFY by day 45 = **$1,964 GMV**, ~$1,860 net of Stripe fees, before refunds and any DFY follow-up time. Won't pay rent. **Right size for a learning round.** The point of soft-launch is the testimonials and the refund-rate signal, not revenue.
- Refund-rate kill switch: > 15% in the first 45 days = stop selling, fix the deliverable, do not scale to public launch. > 25% = pull the product and refund proactively.

---

## Open questions for the founder (non-blocking on engineering)

1. Is the legal entity going to operate under a brand name distinct from `CrewSheet` (e.g. for trademark reasons), or is the LLC just `CrewSheet LLC`? Affects `NEXT_PUBLIC_FOUNDER_NAME` and the legal pages.
2. Are we *certain* about the 30-day refund window on a digital download? Counsel call. Some jurisdictions (EU consumer rights) treat "digital content delivered with consent" specifically — the refund page needs that language.
3. Affiliate program: 30% lifetime commission on a $97 one-time + $497 one-time = $29.10 / $149.10 per sale. Confirm we want lifetime (vs. first sale only) — lifetime makes sense only if we eventually have recurring revenue (the SMS add-on, post-A2P).
4. After v1 traction, are we recurring (SMS add-on monthly), or do we stay one-time and add a $97 "annual update" SKU? Affects unit economics, retention assumptions, and whether MRR-style financial reporting is worth standing up.

---

*This memo lives at `docs/CEO-LAUNCH-READINESS.md` and is the v1 launch verdict. Subsequent revisions should be appended below this line, dated, and signed.*
