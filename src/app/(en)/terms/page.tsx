import type { Metadata } from "next";
import LegalPage from "../../../components/LegalPage";
import TermsEN from "../../../components/legal/TermsEN";
import { localeUrl, site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${site.name} Terms of Service — short, plain-English.`,
  alternates: {
    canonical: `${localeUrl("en")}terms/`,
    languages: {
      "en-US": `${localeUrl("en")}terms/`,
      es: `${localeUrl("es")}terms/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="en" kind="terms">
      <TermsEN />
    </LegalPage>
  );
}
