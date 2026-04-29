# CrewSheet — Launch Plan

Living doc. Source of truth for "are we ready?"

## Phases

| # | Phase | Owner | Status |
|---|---|---|---|
| 1 | Website hardening | Eng | **Shipped (PR #1)** |
| 1b | Remove Pro tier from v1 marketing site | Eng | **In progress (this PR)** |
| 2 | Build the actual product (Sheet + Glide + Apps Script) | Eng | In progress — separate repo `crewsheet-template` |
| 3 | Commerce plumbing (Stripe → Resend delivery Worker) | Eng + Founder | In progress — `workers/stripe-webhook/` |
| 4 | Twilio A2P 10DLC registration | Founder | **Descoped from v1** — reintroduce as a separate product post-launch |
| 5 | Legal review (Terms / Privacy / Refund / DPA) | Founder + counsel | Brief drafted — `docs/legal-brief.md` |
| 6 | Deploy to Cloudflare Pages, DNS cutover | Eng + Founder | Runbook drafted — `docs/deploy-cloudflare-pages.md` |
| 7 | Soft launch — DIY + DFY only, ~30 hand-picked cleaners | Founder | Not started |
| 8 | Public launch (affiliate program live) | Founder | Not started |
| 9 | **Post-launch:** SMS add-on as a separate SKU once A2P 10DLC approved | Eng + Founder | Not started |

## Phase 1 — Website hardening (this PR)

- [x] Remove fabricated testimonials in `src/lib/i18n.ts` (replaced with empty arrays + a comment explaining the FTC/UCPD risk).
- [x] Add `NEXT_PUBLIC_ENABLE_PRO` feature flag. Default behavior: Pro card renders as "Coming soon — Join waitlist" and the JSON-LD `Offer` is `PreOrder`, not `InStock`. (**Superseded by Phase 1b — Pro is now fully removed from v1.**)
- [x] Tighten the Pro tier copy: "500 SMS credits/mo (delivered via Twilio once your A2P 10DLC use case is approved — we handle the registration)" instead of the prior "A2P 10DLC included" claim. (**Superseded by Phase 1b.**)
- [x] Add a honeypot field + Cloudflare Turnstile mount to the savings-calculator form.
- [x] Document the receiver-side validation pattern in `docs/webhook-receiver.md`.
- [x] Add GitHub Actions CI: `lint` + `build` + Playwright smoke tests on every PR and push to `main`.
- [x] Add Playwright smoke tests for: EN/ES landing renders with correct `<html lang>`, all legal pages return 200, sitemap/robots are present and not noindex, no fabricated testimonials leak into the rendered HTML. (Pro-card test replaced in Phase 1b with a guard that Pro + SMS marketing copy never ships.)
- [x] Add `LICENSE` clarifying that the marketing site is source-available (not OSS) and that the deliverables are licensed separately under the customer's purchase terms.
- [x] Document the long-pole blockers and credentials needed in this file.

## Phase 1b — Remove Pro tier from v1 (this PR)

CEO call: launching Pro with claims about Twilio A2P 10DLC SMS is a carrier-fineable / Twilio-account-suspension offense until registration completes (1–3 weeks). The right move is to ship DIY + DFY cleanly now and reintroduce SMS as a separate product (Phase 9) once A2P is approved — not hide it behind a flag that anyone can flip.

- [x] Remove `pricing_pro` blocks (EN + ES) from `src/lib/i18n.ts`.
- [x] Remove the 3rd pricing card from `src/components/Landing.tsx`; 2-tier grid centered.
- [x] Remove Pro `Offer` from `src/components/JsonLd.tsx`.
- [x] Remove `checkout.pro`, `pricing.pro`, `enablePro` from `src/lib/site.ts`.
- [x] Drop `NEXT_PUBLIC_CHECKOUT_PRO` and `NEXT_PUBLIC_ENABLE_PRO` from `.env.example` and the README table.
- [x] Remove Twilio from the trust strip (we don't claim it in v1).
- [x] Rewrite FAQ entries that referenced SMS / A2P / $29 Pro / cancelling subs in both languages.
- [x] Replace `calc_crewsheet` label with "DIY, one-time".
- [x] Update the compare table's "Monthly cost" row from "$0–$29" to "$0".
- [x] Replace the smoke test that expected a waitlist with a guard that forbidden SMS/Pro strings never reach rendered HTML.

## Phase 2 — Build the actual product

Lives in a separate repo (`crewsheet-template`) so the Sheet/clasp project has its own CI and licensing path.

- [ ] **6-tab Sheet schema** as `template/*.csv` plus a master `template-spec.md`. Tabs: Customers, Jobs, Quotes, Supplies, Payments, Settings. Includes named ranges, validation, and sample data.
- [ ] **Apps Script project** (`clasp` repo). Triggers: time-based (Sunday summary), on-edit (timestamp check-ins, recompute totals), on-form-submit (quote → Stripe link). Library: `MailApp`, `UrlFetchApp` (Stripe), `SpreadsheetApp`. **v1 uses `MailApp` only** — no Twilio until Phase 9.
- [ ] **Setup runbook** (`docs/setup-checklist.md`) — every step a buyer takes, in order, with screenshots. Target: a non-technical solo cleaner finishes in ≤ 60 min.
- [ ] **Glide / AppSheet runbook** — we cannot redistribute Glide projects programmatically, so document the "make a copy" flow and ship a screen-by-screen recipe. If/when AppSheet exposes a portable export, ship that too.
- [ ] **Loom script** (15 min) — covers Sheet first-run, app installation, first quote, first SMS, first Stripe link.
- [ ] **Customer-license file** (`LICENSE-CUSTOMER.md`) — perpetual, worldwide, non-exclusive, non-transferable license to use+modify the Sheet template for the buyer's own business; no resale, no repackaging.

## Phase 3 — Commerce plumbing

- [ ] Stripe Payment Link for **DIY** ($97 one-time, USD, Stripe Tax on).
- [ ] Stripe Payment Link for **DFY** ($497 one-time, USD, Stripe Tax on). Calendar (Cal.com) booking is the *thank-you* page, not the entry point.
- [ ] **Cloudflare Worker** (`workers/stripe-webhook/` in this repo): listens for `checkout.session.completed`, verifies the Stripe signature, calls Resend with the buyer's email and the deliverable links (Sheet template "Make a copy" URL, Loom, Glide/AppSheet setup guide). Stripe webhook signing secret, Resend API key, and per-SKU deliverable URLs stored as Worker secrets.
- [ ] Resend domain verification (`crewsheet.app` SPF/DKIM/DMARC).
- [ ] Test mode dry-run of every tier before flipping live.

## Phase 4 — Twilio A2P 10DLC (descoped from v1, see Phase 9)

Originally a launch blocker for Pro. CEO call: remove Pro from v1 entirely and treat A2P 10DLC as a post-launch product track. Keeping the notes below for Phase 9.

- [ ] Create Twilio account, buy a 10DLC long-code phone number.
- [ ] Submit Brand registration (requires legal entity name + EIN).
- [ ] Submit Campaign use case: "Account notification — appointment reminders and order confirmations to customers of CrewSheet end-users."
- [ ] Provide opt-in copy that the *cleaner's* quote form will display to *their* customers: "By providing your number you agree to receive SMS updates about your cleaning appointment from {Cleaner Business Name}. Reply STOP to opt out."
- [ ] Wait for The Campaign Registry approval. Do NOT ship the SMS add-on until approved.

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

- [ ] Stand up affiliate tracking (Rewardful or FirstPromoter). Do NOT promote affiliates until the tracking is live; we promised "30% commission, lifetime" and we need to honor that accurately.
- [ ] Go-wide: Product Hunt, Indie Hackers, one cleaning-industry guest post.

## Phase 9 — SMS add-on (post-launch)

Reintroduce SMS as a separate SKU once Twilio A2P 10DLC brand + campaign are approved. Ship it as its own product page / checkout — not a flag on the existing site — so we never have to question whether the main site is making claims we can't deliver.

- [ ] Twilio A2P 10DLC approved (see Phase 4 checklist).
- [ ] Separate Stripe subscription product.
- [ ] Separate Apps Script module that uses the buyer's own Twilio subaccount.
- [ ] Separate landing section / page with explicit opt-in and disclosure copy.
- [ ] Add back a 3rd pricing card only after all of the above.

## Founder action list (right now)

1. Stand up the business entity — Wyoming LLC via Northwest Registered Agent ($39 first year), EIN, then Mercury or Relay for banking.
2. Create Stripe, Resend, Cloudflare accounts once the EIN arrives.
3. Engage a SaaS lawyer with `docs/legal-brief.md` in hand (budget: $500–$1,500).
4. Stop the GoDaddy Website Builder placeholder serving from `crewsheet.app` — at minimum delete the parking site so the DNS is ready for Cloudflare Pages.
5. Replace `NEXT_PUBLIC_FOUNDER_NAME` with the company brand (e.g. "CrewSheet") once the LLC is filed, so the site isn't fronted by a personal name.
6. Twilio A2P 10DLC is **not** day-1 urgent anymore — deferred to post-launch. Start it whenever you want to unlock the SMS add-on.
