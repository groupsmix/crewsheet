import Script from "next/script";
import { site } from "../lib/site";

export default function Analytics() {
  const ga4 = site.analytics.ga4;
  const plausible = site.analytics.plausibleDomain;
  if (!ga4 && !plausible) return null;
  return (
    <>
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
// Default consent: deny analytics until the user accepts (Consent Mode v2 friendly).
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('config', '${ga4}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {plausible && (
        <Script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
