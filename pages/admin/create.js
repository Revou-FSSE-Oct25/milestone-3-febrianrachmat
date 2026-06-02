import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !price) {
      setError("All fields required");
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
          title,
          price: Number(price),
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
      <div className="auth-container">
        <h1>Create Product</h1>

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
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
