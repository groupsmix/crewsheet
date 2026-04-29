# Lead-webhook receiver — reference implementation

The savings calculator on the marketing site `POST`s a JSON payload to whatever
URL is configured in `NEXT_PUBLIC_LEAD_WEBHOOK_URL`. Because the site is a
**static export**, we cannot keep a signing secret in the browser without
exposing it. So we put the security boundary at the **receiver**.

## Payload shape

```json
{
  "email": "you@cleaningbiz.com",
  "jobs": 20,
  "avg": 140,
  "yearJobber": 1788,
  "yearCrew": 445,
  "save": 1343,
  "lang": "en",
  "source": "crewsheet-landing-calculator",
  "ts": 1761638400000,
  "turnstileToken": "<cloudflare-turnstile-token-or-omitted>"
}
```

## Recommended receiver: Cloudflare Worker

```js
// wrangler secrets:
//   TURNSTILE_SECRET   - from Cloudflare Turnstile dashboard
//   RESEND_API_KEY     - from resend.com
//   FORWARD_TO         - hello@crewsheet.app
//   ALLOWED_ORIGIN     - https://crewsheet.app

export default {
  async fetch(req, env) {
    if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
    const origin = req.headers.get("origin") || "";
    if (origin !== env.ALLOWED_ORIGIN) return new Response("forbidden", { status: 403 });

    let body;
    try { body = await req.json(); } catch { return new Response("bad json", { status: 400 }); }

    // Basic shape check
    if (!body?.email || !/.+@.+\..+/.test(body.email)) {
      return new Response("bad email", { status: 400 });
    }
    if (Math.abs(Date.now() - Number(body.ts || 0)) > 5 * 60 * 1000) {
      return new Response("stale", { status: 400 });
    }

    // Verify Turnstile if a token was sent.
    if (env.TURNSTILE_SECRET) {
      if (!body.turnstileToken) return new Response("missing turnstile", { status: 400 });
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET,
            response: body.turnstileToken,
            remoteip: req.headers.get("cf-connecting-ip") || "",
          }),
        },
      ).then((r) => r.json());
      if (!verify.success) return new Response("turnstile failed", { status: 403 });
    }

    // Send the founder a notification.
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "leads@crewsheet.app",
        to: env.FORWARD_TO,
        subject: `New CrewSheet lead — saves $${body.save}/yr`,
        text:
          `Email: ${body.email}\n` +
          `Jobs/wk: ${body.jobs}\nAvg ticket: $${body.avg}\n` +
          `Yr Jobber: $${body.yearJobber}\nYr CrewSheet: $${body.yearCrew}\n` +
          `Lang: ${body.lang}\nSource: ${body.source}\n`,
      }),
    });

    return new Response("ok", {
      status: 200,
      headers: {
        "access-control-allow-origin": env.ALLOWED_ORIGIN,
        "access-control-allow-methods": "POST",
        "access-control-allow-headers": "content-type",
      },
    });
  },
};
```

## Why no HMAC from the browser

The site ships as a static `out/` folder. Anything we put in
`NEXT_PUBLIC_*` is visible in the bundle, so any "shared secret" would be
public. Defense-in-depth instead lives at the receiver:

1. CORS-pin to the production origin.
2. Honeypot field on the form (`company_website`) — bots fill it, humans don't.
3. Cloudflare Turnstile token, verified server-side at `siteverify`.
4. 5-minute timestamp window to reject replays.
5. Rate-limit the Worker route (Cloudflare Free dashboard → WAF → Rate Limiting Rules).

This is enough to keep the lead inbox clean without leaking secrets.
