import { dict } from "../lib/i18n";
import { site, localeUrl, type Lang } from "../lib/site";

export default function JsonLd({ lang, type }: { lang: Lang; type: "home" | "legal" }) {
  const t = dict[lang];
  const url = localeUrl(lang);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    sameAs: [site.twitter, site.github].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: site.emailContact,
        contactType: "customer support",
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: ["en", "es"],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Web",
    description: t.hero_sub,
    offers: [
      {
        "@type": "Offer",
        name: t.pricing_diy.h,
        price: site.pricing.diy.price,
        priceCurrency: site.pricing.diy.currency,
        url: site.checkout.diy || `${url}#pricing`,
        availability: site.checkout.diy
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      },
      {
        "@type": "Offer",
        name: t.pricing_dfy.h,
        price: site.pricing.dfy.price,
        priceCurrency: site.pricing.dfy.currency,
        url: site.checkout.dfy || `${url}#pricing`,
        availability: site.checkout.dfy
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      },
      {
        "@type": "Offer",
        name: t.pricing_pro.h,
        price: site.pricing.pro.price,
        priceCurrency: site.pricing.pro.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: site.pricing.pro.price,
          priceCurrency: site.pricing.pro.currency,
          billingIncrement: 1,
          unitText: "MONTH",
        },
        url: site.checkout.pro || `${url}#pricing`,
        availability:
          site.enablePro && site.checkout.pro
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const blocks = type === "home" ? [organization, website, software, faq] : [organization, website];
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}
