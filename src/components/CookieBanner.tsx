"use client";

import { useEffect, useState } from "react";
import { site, type Lang } from "../lib/site";

const KEY = "crewsheet_consent_v1";

const COPY = {
  en: {
    body: "We use a privacy-friendly analytics cookie to understand which sections of this page work. No ads. No selling data.",
    accept: "Accept",
    decline: "No thanks",
    learn: "Privacy policy",
  },
  es: {
    body: "Usamos una cookie de analítica respetuosa con la privacidad para entender qué secciones funcionan. Sin anuncios. No vendemos datos.",
    accept: "Aceptar",
    decline: "No gracias",
    learn: "Política de privacidad",
  },
} as const;

export default function CookieBanner({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false);
  const t = COPY[lang];
  const hasAnalytics = !!(site.analytics.ga4 || site.analytics.plausibleDomain);

  useEffect(() => {
    if (!hasAnalytics) return;
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, [hasAnalytics]);

  if (!hasAnalytics || !show) return null;

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    if (granted && typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    setShow(false);
  };

  const privacyHref = lang === "en" ? "/privacy/" : "/es/privacy/";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={lang === "en" ? "Cookie preferences" : "Preferencias de cookies"}
      className="fixed inset-x-3 bottom-3 md:bottom-5 md:right-5 md:left-auto md:max-w-sm z-50 bg-white border border-neutral-200 rounded-2xl shadow-lg p-4 text-sm text-neutral-700"
    >
      <p>{t.body}</p>
      <div className="mt-3 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => decide(true)}
          className="rounded-full bg-neutral-900 text-white px-4 py-1.5 text-sm hover:bg-black"
        >
          {t.accept}
        </button>
        <button
          onClick={() => decide(false)}
          className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm hover:bg-neutral-50"
        >
          {t.decline}
        </button>
        <a href={privacyHref} className="text-xs text-neutral-500 underline underline-offset-2">
          {t.learn}
        </a>
      </div>
    </div>
  );
}
