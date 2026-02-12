import Layout from "../components/layout";
import ProductCard from "../components/productcard";
import { useEffect } from "react";

export default function Home({ products }) {
  useEffect(() => {
    // Hanya jalan di browser (bukan saat test / SSR)
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        window.location.href = "/login";
      }
    }
  }, []);

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
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: { products },
    revalidate: 60,
  };
}
