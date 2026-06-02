import {
  bootstrapProducts,
  getProductById,
  getProducts,
  setProducts,
} from "../../../lib/products-data";
import { requireAdmin } from "../../../lib/require-admin";
import {
  normalizeProductFields,
  validateProductInput,
} from "../../../lib/validate-product";

async function revalidateHome(res) {
  try {
    await res.revalidate("/");
  } catch {
    // ISR revalidation is best-effort in local dev
  }
}

export default async function handler(req, res) {
  await bootstrapProducts();

  const { id } = req.query;
  const productId = Number(id);

  if (req.method === "GET") {
    const product = getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    if (!requireAdmin(req, res)) return;

    const product = getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const validationError = validateProductInput(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const products = getProducts();
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, ...normalizeProductFields(req.body) } : p
    );

    setProducts(updatedProducts);
    await revalidateHome(res);

    return res.status(200).json({ message: "Product updated" });
  }

  if (req.method === "DELETE") {
    if (!requireAdmin(req, res)) return;

    const product = getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const filteredProducts = getProducts().filter((p) => p.id !== productId);

    setProducts(filteredProducts);
    await revalidateHome(res);

    return res.status(200).json({ message: "Product deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
