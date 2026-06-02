import Layout from "../components/layout";

const faqItems = [
  {
    question: "How to order?",
    answer: "Select product → Add to cart → Checkout.",
  },
  {
    question: "How to pay?",
    answer: "We accept credit card and bank transfer.",
  },
  {
    question: "How to track shipment?",
    answer: "You will receive tracking info via email.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="max-w-[700px] py-10">
        <h1 className="mb-8 text-4xl font-bold">FAQ</h1>

        {faqItems.map((item) => (
          <div
            key={item.question}
            className="mb-5 rounded-[10px] bg-gray-100 p-5 transition hover:bg-[#ececec]"
          >
            <h3 className="mb-2.5 text-lg font-semibold">{item.question}</h3>
            <p>{item.answer}</p>
          </div>
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
