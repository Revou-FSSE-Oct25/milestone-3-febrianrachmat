import Layout from "../../components/layout";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";

export default function ProductDetail({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Layout>
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-desc">{product.description}</p>
          <div className="product-price">${product.price}</div>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

// 🔥 Generate semua product paths saat build
export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // Generate page jika belum ada
  };
}

// 🔥 ISR untuk setiap product
export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const product = await res.json();

  return {
    props: { product },
    revalidate: 60, // regenerate setiap 60 detik
  };
}
