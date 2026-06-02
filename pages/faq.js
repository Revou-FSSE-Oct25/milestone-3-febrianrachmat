import Layout from "../components/layout";

const faqItems = [
  {
    question: "How do I place an order?",
    answer: "Browse the collection, add pieces to your bag, and proceed to checkout with your shipping details.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit card and bank transfer at checkout.",
  },
  {
    question: "How can I track my shipment?",
    answer: "Tracking details will be sent to your email once your order has been dispatched.",
  },
  {
    question: "What is your return policy?",
    answer: "Unworn items may be returned within 14 days in original packaging. Contact client care for assistance.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <header className="mb-10 max-w-2xl">
        <p className="page-eyebrow">Atelier</p>
        <h1 className="page-title mt-2">Frequently Asked Questions</h1>
        <p className="app-text-muted mt-4 text-sm">
          Guidance for ordering, payment, and delivery — composed with the same clarity as our
          collection.
        </p>
      </header>

      <div className="max-w-2xl space-y-4">
        {faqItems.map((item) => (
          <article
            key={item.question}
            className="luxury-surface app-panel p-6 transition duration-300 hover:shadow-[0_16px_32px_rgba(17,24,39,0.08)]"
          >
            <h3 className="font-serif text-xl">{item.question}</h3>
            <p className="app-text-muted mt-3 text-sm leading-relaxed">{item.answer}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
