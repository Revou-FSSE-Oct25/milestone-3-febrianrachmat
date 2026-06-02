import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
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

        setTitle(data.title);
        setPrice(String(data.price));
      })
      .catch(() => {
        setLoadError("Failed to load product. Please try again.");
      })
      .finally(() => {
        setLoadingProduct(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !price) {
      setError("All fields required");
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
          title,
          price: Number(price),
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
      <div className="mx-auto my-20 max-w-md">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-3"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className="rounded-md border border-gray-300 px-3 py-3"
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-md bg-black px-3 py-3 text-white disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
