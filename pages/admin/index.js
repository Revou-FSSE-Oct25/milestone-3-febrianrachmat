import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useProducts from "../../hooks/useproduct";

export default function AdminPage() {
  const router = useRouter();
  const products = useProducts();

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    router.reload();
  };

  return (
    <Layout>
      <h1>Admin Dashboard</h1>

      <button onClick={() => router.push("/admin/create")}>
        + Add Product
      </button>

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
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
