import { getProducts, setProducts } from "../../../lib/products-data";
import { validateProductInput } from "../../../lib/validate-product";

export default function handler(req, res) {
  const { id } = req.query;
  const products = getProducts();
  const productId = Number(id);

  if (req.method === "GET") {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { title, price } = req.body;
    const validationError = validateProductInput({ title, price });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedProducts = products.map((p) =>
      p.id === productId
        ? { ...p, title: title.trim(), price: Number(price) }
        : p
    );

    setProducts(updatedProducts);

    return res.status(200).json({ message: "Product updated" });
  }

  if (req.method === "DELETE") {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const filteredProducts = products.filter((p) => p.id !== productId);

    setProducts(filteredProducts);

    return res.status(200).json({ message: "Product deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
