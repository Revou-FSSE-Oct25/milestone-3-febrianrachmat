import { useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useProducts from "../../hooks/useproduct";

function AdminTableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="animate-pulse border-b border-gray-200">
      <td className="px-4 py-3">
        <div className="h-4 w-8 bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-48 bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-8 w-32 bg-gray-200" />
      </td>
    </tr>
  ));
}

export default function AdminPage() {
  const router = useRouter();
  const { products, refetch, loading } = useProducts();
  const [deleteError, setDeleteError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

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
      <h1 className="mb-6 text-[32px] font-bold">Admin Dashboard</h1>

      <button
        type="button"
        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
        onClick={() => router.push("/admin/create")}
      >
        + Add Product
      </button>

      {deleteError && <p className="mt-4 text-sm text-red-600">{deleteError}</p>}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 font-semibold">ID</th>
              <th className="border border-gray-200 px-4 py-3 font-semibold">Title</th>
              <th className="border border-gray-200 px-4 py-3 font-semibold">Price</th>
              <th className="border border-gray-200 px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <AdminTableSkeleton />
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="border border-gray-200 px-4 py-3">{product.id}</td>
                  <td className="border border-gray-200 px-4 py-3">{product.title}</td>
                  <td className="border border-gray-200 px-4 py-3">${product.price}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                      onClick={() => router.push(`/admin/edit/${product.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="ml-2.5 rounded-md bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                      onClick={() => handleDelete(product.id, product.title)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
