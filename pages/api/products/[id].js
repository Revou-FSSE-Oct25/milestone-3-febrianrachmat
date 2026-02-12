import { getProducts, setProducts } from "./data";

export default function handler(req, res) {
  const { id } = req.query;
  const products = getProducts();

  if (req.method === "GET") {
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const { title, price } = req.body;

    const updatedProducts = products.map((p) =>
      p.id === Number(id)
        ? { ...p, title, price }
        : p
    );

    setProducts(updatedProducts);

    return res.status(200).json({ message: "Product updated" });
  }

  if (req.method === "DELETE") {
    const filteredProducts = products.filter(
      (p) => p.id !== Number(id)
    );

    setProducts(filteredProducts);

    return res.status(200).json({ message: "Product deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
