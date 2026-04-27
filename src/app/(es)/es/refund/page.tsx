import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";
import RefundES from "../../../../components/legal/RefundES";
import { localeUrl, site } from "../../../../lib/site";

export const metadata: Metadata = {
  title: "Política de Reembolso",
  description: `Política de reembolso de ${site.name} — 14 días en la plantilla DIY.`,
  alternates: {
    canonical: `${localeUrl("es")}refund/`,
    languages: {
      "en-US": `${localeUrl("en")}refund/`,
      es: `${localeUrl("es")}refund/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="es" kind="refund">
      <RefundES />
    </LegalPage>
  );
}
