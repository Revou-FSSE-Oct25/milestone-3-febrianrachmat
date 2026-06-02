import { useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useProducts from "../../hooks/useproduct";

function AdminTableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-4 py-4">
        <div className="h-4 w-8 rounded bg-black/8" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-48 rounded bg-black/8" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-16 rounded bg-black/8" />
      </td>
      <td className="px-4 py-4">
        <div className="h-8 w-36 rounded bg-black/8" />
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
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-eyebrow">Back Office</p>
          <h1 className="page-title mt-2">Admin Dashboard</h1>
          <p className="app-text-muted mt-3 text-sm">
            Manage the collection — add, edit, or remove products from the catalog.
          </p>
        </div>
        <button type="button" className="btn-luxury shrink-0" onClick={() => router.push("/admin/create")}>
          Add Product
        </button>
      </header>

      {deleteError && (
        <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {deleteError}
        </p>
      )}

      <div className="luxury-surface app-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <AdminTableSkeleton />
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="app-text-muted px-4 py-10 text-center">
                    No products found.{" "}
                    <Link href="/admin/create" className="link-editorial no-underline">
                      Add your first product
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="app-text-muted">{product.id}</td>
                    <td className="font-medium">{product.title}</td>
                    <td className="font-semibold">${product.price}</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn-luxury-muted"
                          onClick={() => router.push(`/admin/edit/${product.id}`)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => handleDelete(product.id, product.title)}
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-center">
        <Link href="/" className="link-editorial text-xs tracking-[0.16em] uppercase no-underline">
          Return to storefront
        </Link>
      </p>
    </Layout>
  );
}
