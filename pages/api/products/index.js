import { getProducts, setProducts } from "../../../lib/products-data";
import { validateProductInput } from "../../../lib/validate-product";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(getProducts());
  }

  if (req.method === "POST") {
    const { title, price } = req.body;
    const validationError = validateProductInput({ title, price });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newProduct = {
      ...req.body,
      id: Date.now(),
      title: title.trim(),
      price: Number(price),
    };

    const products = getProducts();
    setProducts([...products, newProduct]);

    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
