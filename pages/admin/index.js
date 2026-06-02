import { useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useProducts from "../../hooks/useproduct";

export default function AdminPage() {
  const router = useRouter();
  const { products, refetch } = useProducts();
  const [deleteError, setDeleteError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteError(null);
    setDeletingId(id);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setDeleteError(data.message || "Failed to delete product");
        return;
      }

      await refetch();
    } catch {
      setDeleteError("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout>
      <h1>Admin Dashboard</h1>

      <button onClick={() => router.push("/admin/create")}>
        + Add Product
      </button>

      {deleteError && <p className="error">{deleteError}</p>}

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => router.push(`/admin/edit/${product.id}`)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: "10px" }}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
