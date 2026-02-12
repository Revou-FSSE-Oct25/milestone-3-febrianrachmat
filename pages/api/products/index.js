import { getProducts, setProducts } from "./data";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(getProducts());
  }

  if (req.method === "POST") {
    const newProduct = {
      id: Date.now(),
      ...req.body,
    };

    const products = getProducts();
    setProducts([...products, newProduct]);

    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
