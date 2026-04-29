# CrewSheet — Launch Plan

Living doc. Source of truth for "are we ready?"

## Phases

| # | Phase | Owner | Status |
|---|---|---|---|
| 1 | Website hardening (this repo) | Eng | **In progress (this PR)** |
| 2 | Build the actual product (Sheet + Glide + Apps Script) | Eng | Not started |
| 3 | Commerce plumbing (Stripe → Resend delivery Worker) | Eng + Founder | Not started |
| 4 | Twilio A2P 10DLC registration | Founder | **Not started — start day 1, blocks Pro for ~3 weeks** |
| 5 | Legal review (Terms / Privacy / Refund / DPA) | Founder + counsel | Not started |
| 6 | Deploy to Cloudflare Pages, DNS cutover | Eng + Founder | Not started |
| 7 | Soft launch — DIY + DFY only, ~30 hand-picked cleaners | Founder | Not started |
| 8 | Public launch (Pro on, affiliate program live) | Founder | Not started |

## Phase 1 — Website hardening (this PR)

- [x] Remove fabricated testimonials in `src/lib/i18n.ts` (replaced with empty arrays + a comment explaining the FTC/UCPD risk).
- [x] Add `NEXT_PUBLIC_ENABLE_PRO` feature flag. Default behavior: Pro card renders as "Coming soon — Join waitlist" and the JSON-LD `Offer` is `PreOrder`, not `InStock`.
- [x] Tighten the Pro tier copy: "500 SMS credits/mo (delivered via Twilio once your A2P 10DLC use case is approved — we handle the registration)" instead of the prior "A2P 10DLC included" claim.
- [x] Add a honeypot field + Cloudflare Turnstile mount to the savings-calculator form.
- [x] Document the receiver-side validation pattern in `docs/webhook-receiver.md`.
- [x] Add GitHub Actions CI: `lint` + `build` + Playwright smoke tests on every PR and push to `main`.
- [x] Add Playwright smoke tests for: EN/ES landing renders with correct `<html lang>`, all legal pages return 200, sitemap/robots are present and not noindex, no fabricated testimonials leak into the rendered HTML, Pro card shows the waitlist when the flag is unset.
- [x] Add `LICENSE` clarifying that the marketing site is source-available (not OSS) and that the deliverables are licensed separately under the customer's purchase terms.
- [x] Document the long-pole blockers and credentials needed in this file.

## Phase 2 — Build the actual product

Lives in a separate repo (`crewsheet-template`) so the Sheet/clasp project has its own CI and licensing path.

- [ ] **6-tab Sheet schema** as `template/*.csv` plus a master `template-spec.md`. Tabs: Customers, Jobs, Quotes, Supplies, Payments, Settings. Includes named ranges, validation, and sample data.
- [ ] **Apps Script project** (`clasp` repo). Triggers: time-based (Sunday summary), on-edit (timestamp check-ins, recompute totals), on-form-submit (quote → Stripe link). Library: `MailApp`, `UrlFetchApp` (Twilio + Stripe), `SpreadsheetApp`.
- [ ] **Setup runbook** (`docs/setup-checklist.md`) — every step a buyer takes, in order, with screenshots. Target: a non-technical solo cleaner finishes in ≤ 60 min.
- [ ] **Glide / AppSheet runbook** — we cannot redistribute Glide projects programmatically, so document the "make a copy" flow and ship a screen-by-screen recipe. If/when AppSheet exposes a portable export, ship that too.
- [ ] **Loom script** (15 min) — covers Sheet first-run, app installation, first quote, first SMS, first Stripe link.
- [ ] **Customer-license file** (`LICENSE-CUSTOMER.md`) — perpetual, worldwide, non-exclusive, non-transferable license to use+modify the Sheet template for the buyer's own business; no resale, no repackaging.

## Phase 3 — Commerce plumbing

- [ ] Stripe Payment Link for **DIY** ($97 one-time, USD, Stripe Tax on).
- [ ] Stripe Payment Link for **DFY** ($497 one-time, USD, Stripe Tax on). Calendar (Cal.com) booking is the *thank-you* page, not the entry point.
- [ ] Stripe Subscription Product for **Pro** ($29/mo, monthly, USD). Hidden behind `NEXT_PUBLIC_ENABLE_PRO` until A2P approved.
- [ ] **Cloudflare Worker** (`workers/stripe-webhook.js` in this repo): listens for `checkout.session.completed`, calls Resend with the buyer's email and the deliverable links. Stripe webhook signing secret stored as Worker secret.
- [ ] Resend domain verification (`crewsheet.app` SPF/DKIM/DMARC).
- [ ] Test mode dry-run of every tier before flipping live.

## Phase 4 — Twilio A2P 10DLC

**Start the day Phase 1 ships. Blocks Pro for ~3 weeks regardless of code progress.**

- [ ] Create Twilio account, buy a 10DLC long-code phone number.
- [ ] Submit Brand registration (requires legal entity name + EIN).
- [ ] Submit Campaign use case: "Account notification — appointment reminders and order confirmations to customers of CrewSheet end-users."
- [ ] Provide opt-in copy that the *cleaner's* quote form will display to *their* customers: "By providing your number you agree to receive SMS updates about your cleaning appointment from {Cleaner Business Name}. Reply STOP to opt out."
- [ ] Wait for The Campaign Registry approval. Do NOT enable Pro until approved.

## Phase 5 — Legal review

- [ ] Engage a SaaS-fluent solo lawyer (budget: $500–$1,500). Brief them with `docs/legal-brief.md` (next phase deliverable).
- [ ] Replace template Terms / Privacy / Refund copy in `src/components/legal/*EN.tsx` and `*ES.tsx` with counsel-edited copy.
- [ ] Add a DPA (`/legal/dpa/`).
- [ ] Decide on a legal entity. Recommendation: Wyoming or Delaware LLC (~$300, ~1 week with a registered agent) before a single dollar is collected.

## Phase 6 — Deploy

- [ ] Connect repo to Cloudflare Pages. Build command: `npm ci && npm run build`. Output: `out`.
- [ ] Set every `NEXT_PUBLIC_*` env var in the Pages dashboard (production + preview).
- [ ] Cut DNS at the registrar (currently GoDaddy parking) over to Cloudflare. Force HTTPS, force apex (`crewsheet.app`) canonical, 301 `www`.
- [ ] Verify `curl -I https://crewsheet.app` returns no `x-robots-tag: noindex`.
- [ ] Submit `https://crewsheet.app/sitemap.xml` to Google Search Console + Bing Webmaster.

## Phase 7 — Soft launch

- [ ] Hand-picked outreach list (target 30): Twitter cleaning founders, Reddit r/cleaningbusiness, Facebook cleaning groups, Chris Mondragon / Angela Brown audience members.
- [ ] DIY and DFY are sellable. Pro stays "Coming soon."
- [ ] Goal: 10 paying DIY + 2 DFY by day 45. Refund rate < 15%.
- [ ] Collect attributable testimonials with signed consent. Flip `NEXT_PUBLIC_SHOW_TESTIMONIALS=1` only after 3+ real ones are loaded into `src/lib/i18n.ts`.

## Phase 8 — Public launch

- [ ] Flip `NEXT_PUBLIC_ENABLE_PRO=1` once Twilio A2P is approved and Worker is in production.
- [ ] Stand up affiliate tracking (Rewardful or FirstPromoter). Do NOT promote affiliates until the tracking is live; we promised "30% commission, lifetime" and we need to honor that accurately.
- [ ] Go-wide: Product Hunt, Indie Hackers, one cleaning-industry guest post.

## Founder action list (right now)

1. Create a Twilio account today. Start A2P 10DLC. (Long-pole, ~3 weeks.)
2. Create Stripe, Resend, Cloudflare accounts.
3. Decide entity (LLC) and engage a SaaS lawyer.
4. Stop the GoDaddy Website Builder placeholder serving from `crewsheet.app` — at minimum delete the parking site so the DNS is ready for Cloudflare Pages.
5. Replace `NEXT_PUBLIC_FOUNDER_NAME` with your real name (or the company brand) once the entity is decided.
