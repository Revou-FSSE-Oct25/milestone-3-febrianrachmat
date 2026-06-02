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
    showToast("Added to cart");
  };

  return (
    <Layout>
      <nav className="app-text-muted mb-8 flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="link-editorial no-underline hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/#shop-collection" className="link-editorial no-underline hover:no-underline">
          Collection
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="luxury-surface app-panel overflow-hidden p-4 md:p-6">
          <div className="app-chip relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-square">
            <ProductImage
              src={product.image}
              alt={product.title}
              productId={product.id}
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          {product.category && (
            <p className="page-eyebrow">{product.category}</p>
          )}
          <h1 className="page-title mt-3">{product.title}</h1>

          <p className="mt-6 text-3xl font-semibold tracking-tight">
            ${product.price}
          </p>

          {product.description && (
            <p className="app-text-muted mt-6 max-w-lg text-base leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="soft-divider my-8" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" className="btn-luxury" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link
              href="/cart"
              className="btn-luxury-outline inline-flex items-center justify-center no-underline hover:no-underline"
            >
              View Cart
            </Link>
          </div>

          <p className="app-text-muted mt-8 text-xs leading-relaxed tracking-wide">
            Complimentary packaging on all orders. Estimated delivery 3–5 business days within
            Indonesia.
          </p>
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
