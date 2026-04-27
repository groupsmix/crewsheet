import type { Metadata } from "next";
import LegalPage from "../../../components/LegalPage";
import RefundEN from "../../../components/legal/RefundEN";
import { localeUrl, site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `${site.name} refund policy — 14-day refunds on the DIY template, fair terms on DFY and Pro.`,
  alternates: {
    canonical: `${localeUrl("en")}refund/`,
    languages: {
      "en-US": `${localeUrl("en")}refund/`,
      es: `${localeUrl("es")}refund/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="en" kind="refund">
      <RefundEN />
    </LegalPage>
  );
}
