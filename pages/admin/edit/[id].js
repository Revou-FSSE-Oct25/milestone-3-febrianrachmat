import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import ProductForm, { productToFormValues } from "../../../components/productform";
import { validateProductInput } from "../../../lib/validate-product";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          setLoadError(data.message || "Product not found");
          return;
        }

        setInitialValues(productToFormValues(data));
      })
      .catch(() => {
        setLoadError("Failed to load product. Please try again.");
      })
      .finally(() => {
        setLoadingProduct(false);
      });
  }, [id]);

  const handleSubmit = async (values) => {
    setError(null);

    const validationError = validateProductInput({
      ...values,
      price: Number(values.price),
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: Number(values.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update product");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg">
        <Link
          href="/admin"
          className="link-editorial mb-6 inline-block text-xs tracking-[0.16em] uppercase no-underline"
        >
          Back to dashboard
        </Link>

        <div className="luxury-surface app-panel p-6 md:p-8">
          <p className="page-eyebrow">Catalog</p>
          <h1 className="page-title mt-2">Edit Product</h1>

          {loadingProduct ? (
            <p className="mt-6 text-sm app-text-muted">Loading product...</p>
          ) : loadError ? (
            <div className="mt-6">
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {loadError}
              </p>
              <button type="button" className="btn-luxury-muted mt-4" onClick={() => router.push("/admin")}>
                Back to Admin
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <ProductForm
                initialValues={initialValues}
                submitLabel="Update Product"
                loadingLabel="Updating..."
                loading={loading}
                error={error}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
