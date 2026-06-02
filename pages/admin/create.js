import { useState } from "react";
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
      <div className="mx-auto my-20 max-w-lg">
        <h1 className="mb-8 text-[32px] font-bold">Create Product</h1>

        <ProductForm
          submitLabel="Create"
          loadingLabel="Creating..."
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
