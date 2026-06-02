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
      <div className="grid items-start gap-16 md:grid-cols-[420px_1fr]">
        <div>
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
