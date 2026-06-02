import Layout from "../components/layout";

export default function Promo() {
  return (
    <Layout>
      <div className="py-10">
        <h1 className="mb-5 text-4xl font-bold">Promotion</h1>
        <p className="mb-8 text-xl">
          Big Sale! Up to <span className="font-bold text-rose-600">50% OFF</span> all products!
        </p>

        <div className="rounded-xl bg-gradient-to-r from-black to-gray-600 px-8 py-8 text-center text-[22px] font-bold text-white">
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
