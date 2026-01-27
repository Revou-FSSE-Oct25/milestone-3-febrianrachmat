import Layout from "../components/layout";


export default function Promo({ promoText }) {
return (
<Layout>
<h1>Promotion</h1>
<p>{promoText}</p>
</Layout>
);
}


export async function getStaticProps() {
return {
props: {
promoText: "Big Sale! Up to 50% off all products!",
},
};
}