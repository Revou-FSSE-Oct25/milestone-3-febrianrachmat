import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setPrice(data.price);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
      }),
    });

    router.push("/admin");
  };

  return (
    <Layout>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <button type="submit">Update</button>
      </form>
    </Layout>
  );
}
