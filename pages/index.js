import Layout from "../components/layout";
import ProductCard from "../components/productcard";

export default function Home({ products }) {
  return (
    <Layout>
      <h1>RevoShop Products</h1>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
