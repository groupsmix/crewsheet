import Link from "next/link";
import { dict } from "../lib/i18n";
import { site, type Lang } from "../lib/site";

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const base = lang === "en" ? "" : "/es";
  const altLang = lang === "en" ? "es" : "en";
  const altLabel = lang === "en" ? "Español" : "English";
  const altHref = lang === "en" ? "/es/" : "/";
  return (
    <footer className="border-t border-neutral-200/70 bg-[#fafaf7]">
      <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-6 text-sm text-neutral-600">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-bold">CS</span>
            <span className="font-semibold text-neutral-800">CrewSheet</span>
          </div>
          <p className="max-w-xs text-xs">{t.foot_made}</p>
          <Link href={altHref} hrefLang={altLang} className="text-xs underline underline-offset-2 hover:text-neutral-900 mt-1">
            {altLabel}
          </Link>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{lang === "en" ? "Product" : "Producto"}</div>
          <ul className="space-y-1.5">
            <li><a href={`${base || "/"}#pricing`} className="hover:text-neutral-900">{t.nav_pricing}</a></li>
            <li><a href={`${base || "/"}#how`} className="hover:text-neutral-900">{t.nav_features}</a></li>
            <li><a href={`${base || "/"}#faq`} className="hover:text-neutral-900">{t.nav_faq}</a></li>
            <li><a href={`mailto:${site.emailAffiliates}`} className="hover:text-neutral-900">{lang === "en" ? "Affiliates" : "Afiliados"}</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{lang === "en" ? "Company" : "Empresa"}</div>
          <ul className="space-y-1.5">
            <li><Link href={`${base}/privacy/`} className="hover:text-neutral-900">{t.foot_privacy}</Link></li>
            <li><Link href={`${base}/terms/`} className="hover:text-neutral-900">{t.foot_terms}</Link></li>
            <li><Link href={`${base}/refund/`} className="hover:text-neutral-900">{t.foot_refund}</Link></li>
            <li><a href={`mailto:${site.emailContact}`} className="hover:text-neutral-900">{t.foot_contact}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-5 py-4 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {site.name}.</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </footer>
  );
}
