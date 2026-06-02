import { useEffect, useState } from "react";
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

    setLoadingProduct(true);
    setLoadError(null);

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
      <div className="mx-auto my-20 max-w-lg">
        <h1 className="mb-8 text-[32px] font-bold">Edit Product</h1>

        {loadingProduct ? (
          <p className="text-lg text-gray-500">Loading product...</p>
        ) : loadError ? (
          <>
            <p className="mb-4 text-sm text-red-600">{loadError}</p>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-gray-500 px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
              onClick={() => router.push("/admin")}
            >
              Back to Admin
            </button>
          </>
        ) : (
          <ProductForm
            initialValues={initialValues}
            submitLabel="Update"
            loadingLabel="Updating..."
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Layout>
  );
}
