"use client";

import { useMemo, useState } from "react";
import { dict } from "../lib/i18n";
import { site, type Lang } from "../lib/site";

const JOBBER_MONTHLY = 149;
const CREWSHEET_MONTHLY = 29;
const CREWSHEET_ONE_TIME = 97;

export default function SavingsCalculator({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [jobs, setJobs] = useState(20);
  const [avg, setAvg] = useState(140);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numbers = useMemo(() => {
    const monthlyRev = jobs * 4.3 * avg;
    const yearJobber = JOBBER_MONTHLY * 12;
    const yearCrew = CREWSHEET_MONTHLY * 12 + CREWSHEET_ONE_TIME;
    const save = yearJobber - yearCrew;
    return { monthlyRev, yearJobber, yearCrew, save };
  }, [jobs, avg]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-neutral-100">
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{t.calc_title}</h3>
      <p className="text-neutral-600 mt-1">{t.calc_sub}</p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="text-sm text-neutral-600">{t.calc_jobs_label}</label>
          <input
            type="range"
            min={2}
            max={80}
            value={jobs}
            onChange={(e) => setJobs(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="text-xl font-semibold">{jobs}</div>
        </div>
        <div>
          <label className="text-sm text-neutral-600">{t.calc_avg_label}</label>
          <input
            type="range"
            min={60}
            max={400}
            step={5}
            value={avg}
            onChange={(e) => setAvg(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="text-xl font-semibold">${avg}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-6">
        <Card title={t.calc_today} value={`$${numbers.yearJobber.toLocaleString()}`} sub="/ year" muted />
        <Card title={t.calc_crewsheet} value={`$${numbers.yearCrew.toLocaleString()}`} sub="/ year" />
        <Card title={t.calc_save} value={`$${numbers.save.toLocaleString()}`} sub={t.calc_save_yr} highlight />
      </div>

      <div className="mt-6 border-t border-neutral-100 pt-5">
        <label className="text-sm text-neutral-700 block">{t.calc_email_label}</label>
        {submitted ? (
          <div className="mt-2 text-emerald-700 text-sm">{t.calc_email_thanks}</div>
        ) : null}
        {error && <div className="mt-2 text-xs text-amber-700">{error}</div>}
        {!submitted && (
          <div className="mt-2 text-[11px] text-neutral-500">
            {lang === "en"
              ? "By submitting you agree to receive a one-time email with the breakdown. We don't sell data."
              : "Al enviar aceptas recibir un correo \u00fanico con el desglose. No vendemos datos."}
          </div>
        )}
        {!submitted && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email || submitting) return;
              setSubmitting(true);
              setError(null);
              const payload = {
                email,
                jobs,
                avg,
                yearJobber: numbers.yearJobber,
                yearCrew: numbers.yearCrew,
                save: numbers.save,
                lang,
                source: "crewsheet-landing-calculator",
                ts: Date.now(),
              };
              try {
                const list = JSON.parse(localStorage.getItem("crewsheet_leads") || "[]");
                list.push(payload);
                localStorage.setItem("crewsheet_leads", JSON.stringify(list));
              } catch {}
              try {
                if (site.leadWebhookUrl) {
                  const res = await fetch(site.leadWebhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  if (!res.ok) throw new Error(`status ${res.status}`);
                }
                setSubmitted(true);
              } catch {
                // Even if the webhook fails, treat as captured locally so the user isn't blocked.
                setSubmitted(true);
                setError(
                  lang === "en"
                    ? "Saved locally \u2014 we'll follow up if email delivery is delayed."
                    : "Guardado localmente \u2014 te avisamos si hay retraso."
                );
              } finally {
                setSubmitting(false);
              }
            }}
            className="mt-2 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.calc_email_placeholder}
              className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-black disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              {submitting ? (lang === "en" ? "Sending\u2026" : "Enviando\u2026") : t.calc_email_cta}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  sub,
  muted,
  highlight,
}: {
  title: string;
  value: string;
  sub?: string;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 border ${
        highlight
          ? "bg-emerald-50 border-emerald-200"
          : muted
          ? "bg-neutral-50 border-neutral-200"
          : "bg-white border-neutral-200"
      }`}
    >
      <div className="text-xs text-neutral-600">{title}</div>
      <div className={`text-2xl font-semibold mt-1 ${highlight ? "text-emerald-700" : ""}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-neutral-500">{sub}</div>}
    </div>
  );
}
