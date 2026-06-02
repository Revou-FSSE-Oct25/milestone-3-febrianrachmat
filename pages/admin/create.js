import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import ProductForm from "../../components/productform";
import { validateProductInput } from "../../lib/validate-product";

export default function CreateProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const res = await fetch("/api/products", {
        method: "POST",
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
        setError(data.message || "Failed to create product");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Failed to create product. Please try again.");
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
          <h1 className="page-title mt-2">Create Product</h1>
          <p className="mt-3 text-sm app-text-muted">
            Add a new piece to the collection with imagery and editorial details.
          </p>

          <div className="mt-8">
            <ProductForm
              submitLabel="Create Product"
              loadingLabel="Creating..."
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
