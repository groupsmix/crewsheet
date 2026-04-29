import { site } from "../../lib/site";

export default function PrivacyEN() {
  return (
    <>
      <p>
        This Privacy Policy is a plain-English template. <strong>Replace it with policy
        language reviewed by your own counsel before launch.</strong> The structure below
        covers what most jurisdictions (US, EU/GDPR, California/CPRA, UK) expect to see.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {site.name} is operated at <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>.
        Email us at <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a> for any
        privacy question, data subject request, or correction.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Account / purchase data</strong> — name, email, billing address, transaction ID. Provided by you and processed by our payment processor (Stripe).</li>
        <li><strong>Lead data</strong> — email address and the inputs you enter into the savings calculator if you submit the form.</li>
        <li><strong>Usage data</strong> — privacy-friendly analytics (page, country, device, referrer) via Google Analytics 4 and/or Plausible. We do not collect IP addresses for advertising.</li>
        <li><strong>Support correspondence</strong> — emails you send us.</li>
      </ul>

      <h2>3. What we do not collect</h2>
      <ul>
        <li>We never see the contents of your Google Sheet — it lives in your Google account.</li>
        <li>We do not sell or rent your personal data to anyone.</li>
        <li>We do not run third-party advertising or remarketing pixels.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We use the minimum cookies required to keep the site working and to measure
        anonymous usage. The cookie banner you see on first visit lets you decline
        analytics. You can change your choice at any time by clearing site data in your
        browser.
      </p>

      <h2>5. Legal bases (EU / UK)</h2>
      <p>
        Where GDPR applies, we process personal data on the bases of (a) contract
        performance — to deliver the product you bought; (b) legitimate interest —
        improving the product and preventing abuse; and (c) consent — for analytics and
        marketing emails, where you can withdraw consent at any time.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You can request access to, correction of, deletion of, or a portable copy of any
        personal data we hold about you. Email us at{" "}
        <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a> and we will respond
        within 30 days. Residents of California (CCPA/CPRA) may exercise the same rights,
        plus the right to opt out of any sale or sharing of personal information — which
        we don't do.
      </p>

      <h2>7. Sub-processors</h2>
      <ul>
        <li>Stripe (payments) — <a href="https://stripe.com/privacy">stripe.com/privacy</a></li>
        <li>Google (Workspace email + Analytics) — <a href="https://policies.google.com/privacy">policies.google.com/privacy</a></li>
        <li>Hosting / CDN provider — see your deployment target.</li>
      </ul>

      <h2>8. Data retention</h2>
      <p>
        Purchase records: 7 years (tax compliance). Lead emails: until you unsubscribe or
        request deletion, whichever comes first. Analytics data: 14 months.
      </p>

      <h2>9. Children</h2>
      <p>{site.name} is not directed to children under 16 and we do not knowingly collect their data.</p>

      <h2>10. Changes</h2>
      <p>
        Material changes to this policy will be announced on this page and (if you have an
        account) by email at least 14 days before they take effect.
      </p>
    </>
  );
}
