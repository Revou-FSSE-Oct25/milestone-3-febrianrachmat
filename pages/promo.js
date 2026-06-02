import Layout from "../components/layout";

export default function Promo() {
  return (
    <Layout>
      <div className="promo-page">
        <h1>Promotion</h1>
        <p className="promo-sub">
          Big Sale! Up to <span>50% OFF</span> all products!
        </p>

        <div className="promo-banner">
          🔥 Limited Time Offer 🔥
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
