import Layout from "../../components/layout";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";
import { useToast } from "../../context/toastcontext";

export default function ProductDetail({ product }) {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Added to cart!");
  };

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
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { bootstrapProducts, getProductById } = await import(
    "../../lib/products-data"
  );

  await bootstrapProducts();

  const product = getProductById(params.id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
}
