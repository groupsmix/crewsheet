import type { Metadata } from "next";
import LegalPage from "../../../components/LegalPage";
import PrivacyEN from "../../../components/legal/PrivacyEN";
import { localeUrl, site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles your data — what we collect, what we don't, and your rights.`,
  alternates: {
    canonical: `${localeUrl("en")}privacy/`,
    languages: {
      "en-US": `${localeUrl("en")}privacy/`,
      es: `${localeUrl("es")}privacy/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="en" kind="privacy">
      <PrivacyEN />
    </LegalPage>
  );
}
