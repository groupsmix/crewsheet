import Link from "next/link";
import { dict, legal } from "../../lib/i18n";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

export default function NotFound() {
  const t = dict.en;
  const L = legal.en;
  return (
    <>
      <Nav lang="en" t={t} home="/" altHome="/es/" />
      <main id="main" className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="text-emerald-700 text-sm font-mono">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">{L.not_found_title}</h1>
        <p className="mt-3 text-neutral-600">{L.not_found_sub}</p>
        <ul className="mt-6 flex flex-wrap gap-3 justify-center">
          {L.not_found_links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang="en" />
    </>
  );
}
