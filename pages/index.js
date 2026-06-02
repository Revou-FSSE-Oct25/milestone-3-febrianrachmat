import Layout from "../components/layout";
import ProductCard from "../components/productcard";

export default function Home({ products }) {
  return (
    <Layout>
      <h1>RevoShop Products</h1>

      <div className="grid">
        {products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="card skeleton" key={i}>
                <div className="skeleton-img"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text small"></div>
              </div>
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { bootstrapProducts, getProducts } = await import("../lib/products-data");

  await bootstrapProducts();

  return {
    props: { products: getProducts() },
    revalidate: 60,
  };
}
