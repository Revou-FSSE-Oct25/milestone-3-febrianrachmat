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
      <div className="auth-container">
        <h1>Edit Product</h1>

        {loadingProduct ? (
          <p className="empty-cart">Loading product...</p>
        ) : loadError ? (
          <>
            <p className="error">{loadError}</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.push("/admin")}
            >
              Back to Admin
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
