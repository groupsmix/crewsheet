import { site } from "../../lib/site";

export default function RefundEN() {
  return (
    <>
      <p>This is a plain-English template. <strong>Adjust to your actual policy before launch.</strong></p>

      <h2>DIY Template — $97</h2>
      <p>
        14 days, no questions. If the template isn't what you expected, email{" "}
        <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a> and we'll refund
        you in full. We may ask one question to learn what missed the mark — your refund
        is not contingent on the answer.
      </p>

      <h2>Done-For-You Setup — $497</h2>
      <ul>
        <li><strong>100% refund</strong> before the setup call begins.</li>
        <li><strong>50% refund</strong> within 7 days after the setup call if you decide CrewSheet isn't for you.</li>
        <li>After 7 days the setup is non-refundable, but the underlying DIY template license remains yours forever.</li>
      </ul>

      <h2>Subscriptions</h2>
      <p>
        None. {site.name} is sold as one-time purchases only. We don&apos;t auto-bill
        you for anything.
      </p>

      <h2>Disputes / chargebacks</h2>
      <p>
        Please email us first — we're tiny and we will refund quickly. Filing a
        chargeback before contacting us takes 60–90 days to resolve and benefits
        no one.
      </p>
    </>
  );
}
