import Layout from "../../components/layout";
import Image from "next/image";
import { useCart } from "../../context/cartcontext";
import { useToast } from "../../context/toastcontext";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Added to cart!");
  };

  return (
    <Layout>
      <div className="product-detail">
        <div className="product-image">
          <div className="relative h-[420px] w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-desc">{product.description}</p>
          <div className="product-price">${product.price}</div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { bootstrapProducts, getProductById } = await import("../../lib/products-data");

  await bootstrapProducts();

  const product = getProductById(params.id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
}
