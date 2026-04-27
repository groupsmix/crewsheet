import type { Metadata, Viewport } from "next";
import "../globals.css";
import Analytics from "../../components/Analytics";
import CookieBanner from "../../components/CookieBanner";
import JsonLd from "../../components/JsonLd";
import { dict, type Lang } from "../../lib/i18n";
import { site, localeUrl } from "../../lib/site";

const lang: Lang = "es";

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

const t = dict[lang];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Lleva tu negocio de limpieza desde un Google Sheet`,
    template: `%s · ${site.name}`,
  },
  description: t.hero_sub,
  applicationName: site.name,
  alternates: {
    canonical: localeUrl("es"),
    languages: {
      "en-US": localeUrl("en"),
      es: localeUrl("es"),
      "x-default": localeUrl("en"),
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: localeUrl("es"),
    siteName: site.name,
    title: `${site.name} — Lleva tu negocio de limpieza desde un Google Sheet`,
    description: t.hero_sub,
    images: [
      {
        url: "/es/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — plantilla para negocios de limpieza`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Lleva tu negocio de limpieza desde un Google Sheet`,
    description: t.hero_sub,
    images: ["/es/opengraph-image"],
    site: site.twitter || undefined,
    creator: site.twitter || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, telephone: false, address: false },
  authors: [{ name: site.founderName }],
  category: "business software",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <JsonLd lang={lang} type="home" />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-neutral-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          Saltar al contenido
        </a>
        {children}
        <Analytics />
        <CookieBanner lang={lang} />
      </body>
    </html>
  );
}
