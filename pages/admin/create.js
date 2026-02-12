import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert("All fields required");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        title,
        price: Number(price),
      }),
    });

    router.push("/admin");
  };

  return (
    <Layout>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </Layout>
  );
}
