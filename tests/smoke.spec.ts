import { test, expect, request } from "@playwright/test";

// These tests run against the static export served on port 4173 by the
// "smoke" npm script. They verify the launch-critical surface still works.

const BASE = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";

test("EN landing renders with correct lang and title", async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page).toHaveTitle(/CrewSheet/);
  const html = await page.locator("html").getAttribute("lang");
  expect(html).toBe("en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("ES landing renders with correct lang", async ({ page }) => {
  await page.goto(`${BASE}/es/`);
  const html = await page.locator("html").getAttribute("lang");
  expect(html).toBe("es");
});

test("legal pages return 200 in EN and ES", async () => {
  const ctx = await request.newContext();
  for (const path of [
    "/privacy/",
    "/terms/",
    "/refund/",
    "/es/privacy/",
    "/es/terms/",
    "/es/refund/",
  ]) {
    const res = await ctx.get(`${BASE}${path}`);
    expect(res.status(), `${path} should be 200`).toBe(200);
  }
});

test("sitemap and robots are present and not noindex", async () => {
  const ctx = await request.newContext();
  const sitemap = await ctx.get(`${BASE}/sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("<urlset");

  const robots = await ctx.get(`${BASE}/robots.txt`);
  expect(robots.status()).toBe(200);
  const robotsBody = await robots.text();
  expect(robotsBody.toLowerCase()).not.toContain("disallow: /");

  const home = await ctx.get(`${BASE}/`);
  const xRobots = home.headers()["x-robots-tag"];
  expect(xRobots ?? "").not.toContain("noindex");
});

test("no fabricated testimonials are rendered when SHOW_TESTIMONIALS is unset", async ({
  page,
}) => {
  await page.goto(`${BASE}/`);
  const body = (await page.content()).toLowerCase();
  // Names from the placeholder testimonials we removed. If any of these reappear
  // in the rendered HTML it means someone re-introduced fabricated proof.
  for (const ghost of ["maria s.", "daniel o.", "yelena p.", "sparkle house"]) {
    expect(body, `placeholder testimonial leaked: ${ghost}`).not.toContain(ghost);
  }
});

test("Pro tier is fully removed from v1 (no SMS claims, no third pricing card)", async ({
  page,
}) => {
  await page.goto(`${BASE}/#pricing`);
  const html = (await page.content()).toLowerCase();
  // v1 ships with 2 paid tiers (DIY + DFY) only. The Pro / SMS add-on is
  // descoped until Twilio A2P 10DLC registration completes. This test guards
  // against anyone reintroducing a Pro CTA, a $29/mo subscription price, or
  // marketing copy that claims we send SMS.
  const forbidden = [
    "add pro",
    "pro updates + sms",
    "500 sms credits",
    "$29/mo",
    "/mo\"",
    "a2p 10dlc",
    "join waitlist",
    // Demo / UI claims that we *send* SMS. v1 sends email only.
    "sms sent",
    "sms enviado",
  ];
  for (const needle of forbidden) {
    expect(html, `forbidden marketing string leaked: ${needle}`).not.toContain(needle);
  }
  // Both legitimate tiers are present.
  expect(html).toContain("diy template");
  expect(html).toContain("done-for-you");
});
