import Layout from "../components/layout";
import ProductCard from "../components/productcard";

function ProductSkeleton() {
  return (
    <div className="animate-pulse border border-gray-200 p-5">
      <div className="mb-4 h-[260px] w-full bg-gray-200" />
      <div className="mb-2.5 h-4 bg-gray-200" />
      <div className="h-4 w-3/5 bg-gray-200" />
    </div>
  );
}

export default function Home({ products }) {
  return (
    <Layout>
      <h1 className="mb-8 text-[32px] font-bold">RevoShop Products</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
        {products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
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
