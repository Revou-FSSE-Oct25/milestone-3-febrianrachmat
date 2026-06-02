import {
  bootstrapProducts,
  getProductById,
  updateProduct,
  removeProduct,
} from "../../../lib/products-data";
import { fetchProductFromApi } from "../../../lib/fetch-product";
import { requireAdmin } from "../../../lib/require-admin";
import {
  normalizeProductFields,
  validateProductInput,
} from "../../../lib/validate-product";
import { revalidateCatalogPages } from "../../../lib/revalidate-pages";

export default async function handler(req, res) {
  await bootstrapProducts();

  const { id } = req.query;
  const productId = Number(id);

  if (req.method === "GET") {
    let product = getProductById(productId);

    if (!product) {
      product = await fetchProductFromApi(productId);
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    if (!(await requireAdmin(req, res))) return;

    const product = getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const validationError = validateProductInput(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    updateProduct(productId, normalizeProductFields(req.body));
    await revalidateCatalogPages(res, productId);

    return res.status(200).json({ message: "Product updated" });
  }

  if (req.method === "DELETE") {
    if (!(await requireAdmin(req, res))) return;

    const product = getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    removeProduct(productId);
    await revalidateCatalogPages(res, productId);

    return res.status(200).json({ message: "Product deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
