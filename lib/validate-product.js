export function validateProductInput({ title, price }) {
  if (!title || typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    return "Price must be greater than 0";
  }

  return null;
}
