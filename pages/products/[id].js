import Link from "next/link";
import Layout from "../../components/layout";
import ProductImage from "../../components/productimage";
import { useCart } from "../../context/cartcontext";
import { useToast } from "../../context/toastcontext";

export default function ProductDetailPage({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Added to cart!");
  };

  return (
    <Layout>
      <div className="grid items-start gap-16 md:grid-cols-[420px_1fr]">
        <div>
          <div className="relative h-[420px] w-full">
            <ProductImage
              src={product.image}
              alt={product.title}
              productId={product.id}
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="mb-4 text-[28px] font-bold">{product.title}</h1>
          <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>
          <div className="mb-6 text-2xl font-bold">${product.price}</div>

          <button
            type="button"
            className="cursor-pointer bg-black px-7 py-3.5 text-sm font-semibold text-white transition active:scale-95"
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
  const { fetchProductForDetail } = await import("../../lib/fetch-product");
  const product = await fetchProductForDetail(params.id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
}
