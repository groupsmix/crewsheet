import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";
import PrivacyES from "../../../../components/legal/PrivacyES";
import { localeUrl, site } from "../../../../lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${site.name} maneja tus datos.`,
  alternates: {
    canonical: `${localeUrl("es")}privacy/`,
    languages: {
      "en-US": `${localeUrl("en")}privacy/`,
      es: `${localeUrl("es")}privacy/`,
    },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage lang="es" kind="privacy">
      <PrivacyES />
    </LegalPage>
  );
}
