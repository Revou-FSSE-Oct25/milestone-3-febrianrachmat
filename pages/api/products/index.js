import {
  bootstrapProducts,
  getProducts,
  setProducts,
} from "../../../lib/products-data";
import { requireAdmin } from "../../../lib/require-admin";
import { validateProductInput } from "../../../lib/validate-product";

async function revalidateHome(res) {
  try {
    await res.revalidate("/");
  } catch {
    // ISR revalidation is best-effort in local dev
  }
}

export default async function handler(req, res) {
  await bootstrapProducts();

  if (req.method === "GET") {
    return res.status(200).json(getProducts());
  }

  if (req.method === "POST") {
    if (!requireAdmin(req, res)) return;

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
    await revalidateHome(res);

    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
