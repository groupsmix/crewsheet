import PhoneDemo from "./PhoneDemo";
import SavingsCalculator from "./SavingsCalculator";
import { dict } from "../lib/i18n";
import type { Lang } from "../lib/site";
import { site } from "../lib/site";
import Footer from "./Footer";
import Nav from "./Nav";

const SHOW_TESTIMONIALS = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "1";

export default function Landing({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const home = lang === "en" ? "/" : "/es/";
  const altHome = lang === "en" ? "/es/" : "/";

  // Resolve checkout / demo URLs at render time. If env var isn't set, fall back to #pricing.
  const checkout = (key: keyof typeof site.checkout) =>
    site.checkout[key] || `${home}#pricing`;
  const demoHref = site.demoBookingUrl || `${home}#pricing`;

  return (
    <>
      <Nav lang={lang} t={t} home={home} altHome={altHome} />

      <main id="main" className="text-neutral-900">
        {/* HERO */}
        <section id="top" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="max-w-6xl mx-auto px-5 pt-12 md:pt-20 pb-12 grid md:grid-cols-12 gap-10 relative">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <Dot /> {t.hero_eyebrow}
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                {t.hero_title_1}
                <br />
                <span className="text-emerald-700">{t.hero_title_2}</span>
              </h1>
              <p className="mt-5 text-lg text-neutral-700 max-w-xl">{t.hero_sub}</p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {t.hero_bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <Check /> <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={checkout("diy")}
                  className="inline-flex justify-center items-center rounded-full bg-neutral-900 text-white px-6 py-3.5 text-sm font-semibold hover:bg-black focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  {t.cta_buy}
                </a>
                <a
                  href={demoHref}
                  className="inline-flex justify-center items-center rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-semibold hover:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  {t.cta_demo}
                </a>
              </div>
              <div className="mt-4 text-xs text-neutral-500">{t.hero_trust}</div>
            </div>

            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-200/60 to-transparent blur-2xl rounded-full" />
                <div className="relative">
                  <PhoneDemo lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-neutral-200/70 bg-white/60">
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
            <span>{lang === "en" ? "Built on tools you already trust:" : "Construido sobre herramientas que ya usas:"}</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-neutral-700">
              <span>Google Sheets</span>
              <span aria-hidden>·</span>
              <span>Glide / AppSheet</span>
              <span aria-hidden>·</span>
              <span>Apps Script</span>
              <span aria-hidden>·</span>
              <span>Twilio</span>
              <span aria-hidden>·</span>
              <span>Stripe</span>
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            {t.pain_title}
          </h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">{t.pain_sub}</p>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {t.pain_items.map((it, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{it.h}</div>
                    <div className="text-sm text-neutral-600 mt-1">{it.p}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" className="bg-white border-y border-neutral-200/70">
          <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.demo_title}</h2>
              <p className="mt-3 text-neutral-600 max-w-md">{t.demo_sub}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                <DemoFeature emoji="🗺️" label={lang === "en" ? "Today's route" : "Ruta del día"} />
                <DemoFeature emoji="📒" label={lang === "en" ? "Customer book" : "Clientes"} />
                <DemoFeature emoji="✉️" label={lang === "en" ? "Quotes → Stripe" : "Cotizaciones → Stripe"} />
                <DemoFeature emoji="💵" label={lang === "en" ? "Money + CSV export" : "Dinero + CSV"} />
              </div>
              <p className="mt-6 text-xs text-neutral-500 max-w-md">{t.demo_caption}</p>
            </div>
            <div className="md:col-span-6 flex justify-center">
              <PhoneDemo lang={lang} />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.how_title}</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {t.how_steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft">
                <div className="text-emerald-700 text-sm font-mono">step {s.n}</div>
                <div className="text-xl font-semibold mt-2">{s.h}</div>
                <div className="text-sm text-neutral-600 mt-2">{s.p}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-3xl border border-neutral-100 shadow-soft overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-5 border-b md:border-b-0 md:border-r border-neutral-100">
                <div className="text-xs text-neutral-500 mb-2">customers · Google Sheet</div>
                <SheetMock />
              </div>
              <div className="p-5 flex items-center justify-center bg-neutral-50">
                <PhoneDemo lang={lang} />
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="bg-neutral-950 text-white scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.pricing_title}</h2>
              <p className="mt-3 text-neutral-400">{t.pricing_sub}</p>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <PriceCard
                tag={t.pricing_diy.tag}
                h={t.pricing_diy.h}
                price={t.pricing_diy.price}
                sub={t.pricing_diy.sub}
                bullets={[...t.pricing_diy.bullets]}
                cta={t.pricing_diy.cta}
                href={checkout("diy")}
                featured
              />
              <PriceCard
                tag={t.pricing_dfy.tag}
                h={t.pricing_dfy.h}
                price={t.pricing_dfy.price}
                sub={t.pricing_dfy.sub}
                bullets={[...t.pricing_dfy.bullets]}
                cta={t.pricing_dfy.cta}
                href={checkout("dfy")}
              />
              <PriceCard
                tag={site.enablePro ? t.pricing_pro.tag : (lang === "en" ? "Coming soon" : "Próximamente")}
                h={t.pricing_pro.h}
                price={site.enablePro ? t.pricing_pro.price : (lang === "en" ? "Soon" : "Pronto")}
                sub={site.enablePro ? t.pricing_pro.sub : ""}
                bullets={[...t.pricing_pro.bullets]}
                cta={site.enablePro ? t.pricing_pro.cta : (lang === "en" ? "Join waitlist" : "Lista de espera")}
                href={
                  site.enablePro
                    ? checkout("pro")
                    : `mailto:${site.emailContact}?subject=${encodeURIComponent("Pro waitlist")}`
                }
              />
            </div>
            <p className="mt-6 text-xs text-neutral-500 max-w-2xl">{t.pricing_disclaimer}</p>
          </div>
        </section>

        {/* COMPARE */}
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.compare_title}</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  {t.compare_cols.map((c, i) => (
                    <th key={i} scope="col" className={`text-left p-4 font-medium ${i === 1 ? "text-emerald-700" : ""}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare_rows.map((r, i) => (
                  <tr key={i} className="border-t border-neutral-100">
                    {r.map((cell, j) => (
                      <td
                        key={j}
                        className={`p-4 ${j === 0 ? "font-medium text-neutral-700" : ""} ${
                          j === 1 ? "text-emerald-700 font-medium" : "text-neutral-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="max-w-6xl mx-auto px-5 pb-16 md:pb-24">
          <SavingsCalculator lang={lang} />
        </section>

        {/* SOCIAL PROOF */}
        <section id="proof" className="bg-white border-y border-neutral-200/70">
          <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.proof_title}</h2>
              {SHOW_TESTIMONIALS && (
                <p className="text-xs text-neutral-500 max-w-md">{t.proof_disclaimer}</p>
              )}
            </div>
            {SHOW_TESTIMONIALS ? (
              <div className="mt-10 grid md:grid-cols-3 gap-4">
                {t.proof_items.map((p, i) => (
                  <figure key={i} className="rounded-2xl border border-neutral-100 p-6 shadow-soft bg-white">
                    <div className="text-2xl font-semibold text-emerald-700">{p.stat}</div>
                    <blockquote className="mt-3 text-sm text-neutral-700">“{p.quote}”</blockquote>
                    <figcaption className="mt-4">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-neutral-500">{p.biz}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 p-6 md:p-8 text-sm text-neutral-600 max-w-2xl">
                <p>{t.proof_empty}</p>
                <a
                  href={checkout("diy")}
                  className="inline-flex mt-4 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  {t.proof_empty_cta}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-5 py-16 md:py-24 scroll-mt-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{t.faq_title}</h2>
          <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
            {t.faq.map((f, i) => (
              <details key={i} className="group py-4">
                <summary className="flex justify-between items-center text-left cursor-pointer list-none">
                  <span className="font-medium pr-6">{f.q}</span>
                  <span aria-hidden className="text-neutral-400 group-open:rotate-45 transition-transform text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FOUNDER */}
        <section className="bg-neutral-50 border-y border-neutral-200/70">
          <div className="max-w-3xl mx-auto px-5 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.founder_title}</h2>
            <p className="mt-4 text-neutral-700">{t.founder_p1}</p>
            <p className="mt-3 text-neutral-700">{t.founder_p2}</p>
            <div className="mt-5 text-sm text-neutral-500">{t.founder_sign}</div>
          </div>
        </section>

        {/* AFFILIATE */}
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <div className="bg-emerald-600 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{t.aff_title}</h3>
              <p className="mt-2 text-emerald-50 max-w-xl">{t.aff_sub}</p>
            </div>
            <a
              href={`mailto:${site.emailAffiliates}`}
              className="inline-flex items-center justify-center rounded-full bg-white text-emerald-700 px-6 py-3 font-semibold hover:bg-emerald-50 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600 focus-visible:outline-none"
            >
              {t.aff_cta}
            </a>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-5 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {lang === "en"
                ? "Stop running your business in your head."
                : "Deja de llevar tu negocio en la cabeza."}
            </h2>
            <p className="mt-4 text-neutral-400">
              {lang === "en"
                ? "40 minutes from now, your customers, jobs and money are in one place — and your phone."
                : "En 40 minutos, tus clientes, trabajos y dinero están en un solo lugar — y en tu teléfono."}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={checkout("diy")}
                className="inline-flex justify-center items-center rounded-full bg-emerald-500 text-neutral-950 px-6 py-3.5 text-sm font-semibold hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {t.cta_buy}
              </a>
              <a
                href={demoHref}
                className="inline-flex justify-center items-center rounded-full border border-neutral-700 text-white px-6 py-3.5 text-sm font-semibold hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {t.cta_demo}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" aria-hidden />;
}

function DemoFeature({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-neutral-50 border border-neutral-200 px-3 py-2.5 text-sm">
      <span aria-hidden>{emoji}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function PriceCard({
  tag,
  h,
  price,
  sub,
  bullets,
  cta,
  href,
  featured,
}: {
  tag: string;
  h: string;
  price: string;
  sub: string;
  bullets: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-7 border ${
        featured
          ? "bg-emerald-500 text-neutral-950 border-emerald-400"
          : "bg-neutral-900 text-white border-neutral-800"
      }`}
    >
      <div className={`text-xs font-medium ${featured ? "text-emerald-900" : "text-neutral-400"}`}>{tag}</div>
      <div className={`text-xl font-semibold mt-1 ${featured ? "" : "text-white"}`}>{h}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{price}</span>
        <span className={`text-sm ${featured ? "text-emerald-900" : "text-neutral-400"}`}>{sub}</span>
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span aria-hidden className={`mt-0.5 ${featured ? "text-emerald-900" : "text-emerald-400"}`}>✓</span>
            <span className={featured ? "text-neutral-900" : "text-neutral-200"}>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        className={`mt-6 inline-flex w-full justify-center items-center rounded-full py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          featured
            ? "bg-neutral-950 text-white hover:bg-black"
            : "bg-white text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

function SheetMock() {
  const rows = [
    ["Maria Alvarez", "weekly", "$120", "Tue 9:00", "Key under mat"],
    ["Jen Park", "biweekly", "$145", "Tue 11:30", "Cat allergy"],
    ["Airbnb #2118", "weekly", "$95", "Tue 2:30", "Same-day turn"],
    ["Tom Heller", "monthly", "$220", "Wed 10:00", "Deep clean"],
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white text-xs font-mono">
      <table className="w-full">
        <thead className="bg-neutral-50 text-neutral-500">
          <tr>
            {["name", "freq", "rate", "next", "note"].map((c) => (
              <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-neutral-100">
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2 text-neutral-700 whitespace-nowrap">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
