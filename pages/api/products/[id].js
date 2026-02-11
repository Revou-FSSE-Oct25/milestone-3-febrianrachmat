export default function handler(req, res) {
  const { id } = req.query;

  // GET PRODUCT BY ID
  if (req.method === "GET") {
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }

  // UPDATE PRODUCT
  if (req.method === "PUT") {
    const { title, price } = req.body;

    products = products.map((p) =>
      p.id === Number(id)
        ? { ...p, title, price }
        : p
    );

    return res.status(200).json({
      message: "Product updated",
      product: { id: Number(id), title, price },
    });
  }

  // DELETE PRODUCT
  if (req.method === "DELETE") {
    products = products.filter((p) => p.id !== Number(id));

    return res.status(200).json({
      message: "Product deleted",
    });
  }

  // METHOD NOT ALLOWED
  res.status(405).json({ message: "Method not allowed" });
}
