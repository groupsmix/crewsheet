import type { MetadataRoute } from "next";
import { site } from "../lib/site";

const paths = ["", "privacy/", "terms/", "refund/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const p of paths) {
    const enUrl = `${site.url}/${p}`;
    const esUrl = `${site.url}/es/${p}`;
    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: p === "" ? "weekly" : "monthly",
      priority: p === "" ? 1 : 0.6,
      alternates: { languages: { "en-US": enUrl, es: esUrl, "x-default": enUrl } },
    });
    entries.push({
      url: esUrl,
      lastModified: now,
      changeFrequency: p === "" ? "weekly" : "monthly",
      priority: p === "" ? 0.9 : 0.5,
      alternates: { languages: { "en-US": enUrl, es: esUrl, "x-default": enUrl } },
    });
  }
  return entries;
}
