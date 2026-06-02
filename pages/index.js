import Layout from "../components/layout";
import ProductCatalog from "../components/productcatalog";

export default function Home({ products, usedFallback }) {
  return (
    <Layout>
      <h1 className="mb-8 text-[32px] font-bold">RevoShop Products</h1>
      <ProductCatalog products={products} usedFallback={usedFallback} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { bootstrapProducts, getProducts, getUsedFallback } = await import(
    "../lib/products-data"
  );

  await bootstrapProducts();

  return {
    props: {
      products: getProducts(),
      usedFallback: getUsedFallback(),
    },
    revalidate: 60,
  };
}
