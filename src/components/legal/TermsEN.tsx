import { site } from "../../lib/site";

export default function TermsEN() {
  return (
    <>
      <p>
        These Terms are a plain-English template. <strong>Replace them with terms
        reviewed by your own counsel for your jurisdiction before launch.</strong>
      </p>

      <h2>1. The product</h2>
      <p>
        {site.name} is a Google Sheet template, optional setup service, and optional
        monthly add-on (Pro). It is not a SaaS replacement for accounting, legal, or tax
        advice. Your data lives in your Google account.
      </p>

      <h2>2. Your account</h2>
      <p>
        You're responsible for the accuracy of the information you provide and for the
        security of the Google account where the Sheet lives. We never log into your
        Google account on your behalf except during a supervised setup call (DFY tier).
      </p>

      <h2>3. License</h2>
      <p>
        On purchase you receive a perpetual, worldwide, non-exclusive, non-transferable
        license to use, copy, and modify the Sheet template for your own cleaning
        business, including any business you own or operate. You may not resell or
        re-package the template as your own product.
      </p>

      <h2>4. SMS / A2P 10DLC (Pro tier only)</h2>
      <p>
        US automated business SMS requires A2P 10DLC registration. By using our SMS add-on
        you authorize us to send messages on your behalf within the volume your tier
        permits, and you agree to the terms of our upstream provider (Twilio).
      </p>

      <h2>5. Acceptable use</h2>
      <p>You will not use {site.name} to send unsolicited messages, harass customers, or violate any law in your jurisdiction.</p>

      <h2>6. Refunds</h2>
      <p>See our <a href="/refund/">Refund Policy</a>.</p>

      <h2>7. Warranty disclaimer</h2>
      <p>
        The product is provided "as is." We do everything we reasonably can to keep it
        working, but we don't warrant it will be error-free or fit for a specific
        purpose. We are not liable for indirect, consequential, or incidental damages.
      </p>

      <h2>8. Limit of liability</h2>
      <p>
        To the maximum extent allowed by law, our total liability is capped at the amount
        you paid us in the prior 12 months.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction where the operator of
        {" "}{site.name} is registered. Update this clause to your actual jurisdiction
        before launch.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions: <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a>.
      </p>
    </>
  );
}
