import Layout from "../components/layout";


export default function FAQ({ faqs }) {
return (
<Layout>
<h1>FAQ</h1>
<ul>
{faqs.map((faq, i) => (
<li key={i}>{faq}</li>
))}
</ul>
</Layout>
);
}


export async function getStaticProps() {
return {
props: {
faqs: [
"How to order?",
"How to pay?",
"How to track shipment?",
],
},
};
}