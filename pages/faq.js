import Layout from "../components/layout";

export default function FAQ() {
  return (
    <Layout>
      <div className="faq-page">
        <h1>FAQ</h1>

        <div className="faq-item">
          <h3>How to order?</h3>
          <p>Select product → Add to cart → Checkout.</p>
        </div>

        <div className="faq-item">
          <h3>How to pay?</h3>
          <p>We accept credit card and bank transfer.</p>
        </div>

        <div className="faq-item">
          <h3>How to track shipment?</h3>
          <p>You will receive tracking info via email.</p>
        </div>
      </div>
    </Layout>
  );
}
