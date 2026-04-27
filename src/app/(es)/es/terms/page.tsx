import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";
import TermsES from "../../../../components/legal/TermsES";
import { localeUrl, site } from "../../../../lib/site";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: `Términos de Servicio de ${site.name}.`,
  alternates: {
    canonical: `${localeUrl("es")}terms/`,
    languages: {
      "en-US": `${localeUrl("en")}terms/`,
      es: `${localeUrl("es")}terms/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="es" kind="terms">
      <TermsES />
    </LegalPage>
  );
}
