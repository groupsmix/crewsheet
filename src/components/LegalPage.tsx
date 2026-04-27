import Link from "next/link";
import { dict, legal } from "../lib/i18n";
import Footer from "./Footer";
import Nav from "./Nav";
import { site, type Lang } from "../lib/site";

export default function LegalPage({
  lang,
  kind,
  children,
}: {
  lang: Lang;
  kind: "privacy" | "terms" | "refund";
  children: React.ReactNode;
}) {
  const t = dict[lang];
  const L = legal[lang];
  const home = lang === "en" ? "/" : "/es/";
  const altHome = lang === "en" ? "/es/" : "/";
  const title =
    kind === "privacy" ? L.privacy_title : kind === "terms" ? L.terms_title : L.refund_title;
  const intro =
    kind === "privacy" ? L.privacy_intro : kind === "terms" ? L.terms_intro : L.refund_intro;

  return (
    <>
      <Nav lang={lang} t={t} home={home} altHome={altHome} />
      <main id="main" className="max-w-3xl mx-auto px-5 py-16 md:py-24 text-neutral-800">
        <Link href={home} className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2">
          {L.back_home}
        </Link>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-neutral-600">{intro}</p>
        <p className="mt-1 text-xs text-neutral-500">{L.last_updated}: {site.legalUpdated}</p>
        <article className="prose prose-neutral max-w-none mt-8 text-[15px] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_a]:text-emerald-700 [&_a:hover]:underline">
          {children}
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
