import Link from "next/link";
import type { Lang } from "../lib/site";
import type { Dict } from "../lib/i18n";

export default function Nav({
  lang,
  t,
  home,
  altHome,
}: {
  lang: Lang;
  t: Dict;
  home: string;
  altHome: string;
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#fafaf7]/80 border-b border-neutral-200/70">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href={home} className="flex items-center gap-2 font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none rounded">
          <Logo />
          <span>CrewSheet</span>
        </Link>
        <nav aria-label={lang === "en" ? "Primary" : "Principal"} className="hidden md:flex items-center gap-7 text-sm text-neutral-600">
          <a href={`${home}#demo`} className="hover:text-neutral-900">{t.nav_demo}</a>
          <a href={`${home}#how`} className="hover:text-neutral-900">{t.nav_features}</a>
          <a href={`${home}#pricing`} className="hover:text-neutral-900">{t.nav_pricing}</a>
          <a href={`${home}#faq`} className="hover:text-neutral-900">{t.nav_faq}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} altHome={altHome} home={home} />
          <a
            href={`${home}#pricing`}
            className="hidden sm:inline-flex bg-neutral-900 text-white text-sm rounded-full px-4 py-2 font-medium hover:bg-black focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            {t.cta_buy}
          </a>
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, altHome, home }: { lang: Lang; altHome: string; home: string }) {
  return (
    <div className="inline-flex rounded-full bg-white border border-neutral-200 text-xs overflow-hidden" role="group" aria-label="Language">
      <Link
        href={lang === "en" ? home : altHome}
        hrefLang="en"
        aria-current={lang === "en" ? "page" : undefined}
        className={`px-3 py-1.5 ${lang === "en" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"}`}
      >
        EN
      </Link>
      <Link
        href={lang === "es" ? home : altHome}
        hrefLang="es"
        aria-current={lang === "es" ? "page" : undefined}
        className={`px-3 py-1.5 ${lang === "es" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"}`}
      >
        ES
      </Link>
    </div>
  );
}

function Logo() {
  return (
    <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-bold">
      CS
    </span>
  );
}
